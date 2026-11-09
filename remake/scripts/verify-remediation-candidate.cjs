'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const LFS_POINTER_PREFIX = 'version https://git-lfs.github.com/spec/v1';
const EXCLUDED_FILES = new Set([
  'evidence-manifest.json',
  'publication-receipt.json',
]);

function sha256Buffer(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function toPosixRelative(rootDir, targetPath) {
  return path.relative(rootDir, targetPath).split(path.sep).join('/');
}

function isLfsPointerBuffer(buf) {
  const head = buf.subarray(0, 64).toString('utf8');
  return head.startsWith(LFS_POINTER_PREFIX);
}

function collectPayloadFiles(rootDir, currentDir = rootDir, acc = []) {
  const entries = fs
    .readdirSync(currentDir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name));
  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name);
    const relPosix = toPosixRelative(rootDir, fullPath);
    if (entry.isDirectory()) {
      if (entry.name === 'profile') continue;
      collectPayloadFiles(rootDir, fullPath, acc);
    } else if (entry.isFile()) {
      if (EXCLUDED_FILES.has(relPosix) || EXCLUDED_FILES.has(entry.name)) {
        continue;
      }
      const buf = fs.readFileSync(fullPath);
      acc.push({
        path: relPosix,
        bytes: buf.length,
        sha256: sha256Buffer(buf),
      });
    }
  }
  return acc;
}

function buildEvidenceManifest(remediationDir, metadata) {
  const evidenceFiles = collectPayloadFiles(remediationDir);
  return {
    mission:
      metadata.mission || 'four-protagonists-original-core-remediation-r2',
    generatedAt: metadata.generatedAt || new Date().toISOString(),
    repository:
      metadata.repository ||
      'https://github.com/KaronLabs/Uncharted-Waters-2.git',
    branch: metadata.branch || 'codex/four-protagonists-original-core',
    comparisonBaseCommit:
      metadata.comparisonBaseCommit ||
      '512c7808d2fbf025102cb61005d00f1751b2d3ac',
    previousCandidateCommit:
      metadata.previousCandidateCommit ||
      'e5dedb1da30eb61179bf5acec0c84e5bdd95eebe',
    sourceCommit: metadata.sourceCommit,
    source7: metadata.sourceCommit.slice(0, 7),
    toolCommit: metadata.toolCommit,
    releaseTag: metadata.releaseTag,
    developmentStatus: metadata.developmentStatus || 'READY_FOR_CODEX_REVIEW',
    codexReviewStatus: metadata.codexReviewStatus || 'CODEX_REVIEW_PENDING',
    userAcceptanceStatus:
      metadata.userAcceptanceStatus || 'USER_FULL_PLAY_PENDING',
    packagedExecutable: {
      fileName: 'UW2-Korean-Four-Captains.exe',
      relativePath:
        metadata.exeRelativePath ||
        'dist-desktop-remediation-20261110-r1/UW2-Korean-Four-Captains.exe',
      bytes: metadata.exeBytes,
      sha256: metadata.exeSha256,
    },
    isolation: {
      realUserSlotsAccessed: false,
      excludedDirectories: [
        'evidence/run-20261110-r1/desktop-verification/profile',
        'evidence/run-20261110-r1/sprite-regression/profile',
      ],
    },
    evidenceFileCount: evidenceFiles.length,
    evidenceFiles,
  };
}

function validateCandidateEvidence(options) {
  const {
    remediationDir,
    manifestPath = path.join(remediationDir, 'evidence-manifest.json'),
    receiptPath,
    expectedExeSha256,
    expectedSourceCommit,
    expectedToolCommit,
    expectedReleaseTag,
  } = options;

  const errors = [];
  if (!fs.existsSync(manifestPath)) {
    return {
      ok: false,
      errors: [`Missing manifest: ${manifestPath}`],
    };
  }

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (err) {
    return {
      ok: false,
      errors: [`Invalid JSON in manifest: ${err.message}`],
    };
  }

  if (
    expectedExeSha256 &&
    manifest.packagedExecutable?.sha256 !== expectedExeSha256
  ) {
    errors.push(
      `Manifest EXE sha256 mismatch: expected ${expectedExeSha256}, got ${manifest.packagedExecutable?.sha256}`,
    );
  }
  if (expectedSourceCommit && manifest.sourceCommit !== expectedSourceCommit) {
    errors.push(
      `Manifest sourceCommit mismatch: expected ${expectedSourceCommit}, got ${manifest.sourceCommit}`,
    );
  }
  if (expectedToolCommit && manifest.toolCommit !== expectedToolCommit) {
    errors.push(
      `Manifest toolCommit mismatch: expected ${expectedToolCommit}, got ${manifest.toolCommit}`,
    );
  }
  if (expectedReleaseTag && manifest.releaseTag !== expectedReleaseTag) {
    errors.push(
      `Manifest releaseTag mismatch: expected ${expectedReleaseTag}, got ${manifest.releaseTag}`,
    );
  }
  if ('userSlotPreservation' in manifest) {
    errors.push(
      'Manifest must not contain legacy userSlotPreservation claim (§11.5)',
    );
  }
  if (manifest.isolation?.realUserSlotsAccessed !== false) {
    errors.push('Manifest must declare isolation.realUserSlotsAccessed: false');
  }
  if (!Array.isArray(manifest.evidenceFiles)) {
    errors.push('Manifest evidenceFiles must be an array');
    return { ok: false, errors };
  }
  if (manifest.evidenceFileCount !== manifest.evidenceFiles.length) {
    errors.push(
      `Manifest evidenceFileCount (${manifest.evidenceFileCount}) !== evidenceFiles.length (${manifest.evidenceFiles.length})`,
    );
  }

  for (const item of manifest.evidenceFiles) {
    if (typeof item.path !== 'string' || item.path.includes('\\')) {
      errors.push(`Non-POSIX path in manifest: ${item.path}`);
      continue;
    }
    const baseName = path.posix.basename(item.path);
    if (EXCLUDED_FILES.has(item.path) || EXCLUDED_FILES.has(baseName)) {
      errors.push(
        `Excluded self/receipt file listed inside manifest: ${item.path}`,
      );
      continue;
    }
    const fullPath = path.join(remediationDir, ...item.path.split('/'));
    if (!fs.existsSync(fullPath)) {
      errors.push(`Missing evidence file on disk: ${item.path}`);
      continue;
    }
    const buf = fs.readFileSync(fullPath);
    if (isLfsPointerBuffer(buf)) {
      errors.push(`Evidence file is a Git LFS pointer: ${item.path}`);
    }
    if (buf.length !== item.bytes) {
      errors.push(
        `Byte size mismatch for ${item.path}: expected ${item.bytes}, got ${buf.length}`,
      );
    }
    const actualSha = sha256Buffer(buf);
    if (actualSha !== item.sha256) {
      errors.push(
        `SHA256 mismatch for ${item.path}: expected ${item.sha256}, got ${actualSha}`,
      );
    }
    if (baseName === 'summary.json' && item.path.startsWith('evidence/')) {
      const summary = JSON.parse(buf.toString('utf8'));
      if (expectedExeSha256 && summary.exeSha256 !== expectedExeSha256) {
        errors.push(
          `Evidence summary ${item.path} exeSha256 mismatch: expected ${expectedExeSha256}, got ${summary.exeSha256}`,
        );
      }
      if ('userSlotsUntouched' in summary) {
        errors.push(
          `Evidence summary ${item.path} contains legacy userSlotsUntouched field`,
        );
      }
      if (summary.isolation?.realUserSlotsAccessed !== false) {
        errors.push(
          `Evidence summary ${item.path} missing isolation.realUserSlotsAccessed === false`,
        );
      }
    }
  }

  if (receiptPath) {
    if (!fs.existsSync(receiptPath)) {
      errors.push(`Missing publication receipt: ${receiptPath}`);
    } else {
      const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
      if (expectedReleaseTag && receipt.releaseTag !== expectedReleaseTag) {
        errors.push(
          `Receipt releaseTag mismatch: expected ${expectedReleaseTag}, got ${receipt.releaseTag}`,
        );
      }
      if (
        expectedSourceCommit &&
        receipt.sourceCommit !== expectedSourceCommit
      ) {
        errors.push(
          `Receipt sourceCommit mismatch: expected ${expectedSourceCommit}, got ${receipt.sourceCommit}`,
        );
      }
      if (expectedToolCommit && receipt.toolCommit !== expectedToolCommit) {
        errors.push(
          `Receipt toolCommit mismatch: expected ${expectedToolCommit}, got ${receipt.toolCommit}`,
        );
      }
      if (
        receipt.isPrerelease !== true ||
        receipt.isDraft !== false ||
        receipt.isLatest !== false
      ) {
        errors.push(
          'Receipt must confirm prerelease=true, draft=false, isLatest=false',
        );
      }
      const exeAsset = Array.isArray(receipt.assets)
        ? receipt.assets.find((a) => a.name === 'UW2-Korean-Four-Captains.exe')
        : null;
      if (!exeAsset) {
        errors.push('Receipt missing UW2-Korean-Four-Captains.exe asset');
      } else if (
        expectedExeSha256 &&
        (exeAsset.downloadedSha256 !== expectedExeSha256 ||
          exeAsset.localSha256 !== expectedExeSha256 ||
          exeAsset.verifiedMatch !== true)
      ) {
        errors.push(
          `Receipt EXE asset hash mismatch: expected ${expectedExeSha256}, got downloaded=${exeAsset.downloadedSha256} local=${exeAsset.localSha256}`,
        );
      }
      for (const asset of receipt.assets || []) {
        if (
          !asset.verifiedMatch ||
          asset.downloadedSha256 !== asset.localSha256 ||
          asset.downloadedBytes !== asset.localBytes
        ) {
          errors.push(`Receipt asset verification failed for ${asset.name}`);
        }
      }
    }
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}

module.exports = {
  buildEvidenceManifest,
  validateCandidateEvidence,
  sha256Buffer,
  toPosixRelative,
  isLfsPointerBuffer,
};
