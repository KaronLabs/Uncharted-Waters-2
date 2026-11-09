import fs from 'fs';
import os from 'os';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const {
  buildEvidenceManifest,
  validateCandidateEvidence,
} = require('./verify-remediation-candidate.cjs');

describe('verify-remediation-candidate (R-F7)', () => {
  const exeSha256 =
    '10249cec70b34dda3e25a70230213e038c9ff0005a82f4751c734cd51d940315';
  const sourceCommit = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
  const toolCommit = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
  const releaseTag = 'four-protagonists-candidate-20261110-aaaaaaa-r1';

  const createFixtureDir = () => {
    const tmpDir = fs.mkdtempSync(
      path.join(os.tmpdir(), 'uw2-remediation-f7-test-'),
    );
    const runDir = path.join(
      tmpDir,
      'evidence',
      'run-20261110-r1',
      'desktop-verification',
    );
    fs.mkdirSync(runDir, { recursive: true });
    fs.writeFileSync(path.join(tmpDir, 'completion-report.md'), '# Report\n');
    fs.writeFileSync(
      path.join(runDir, 'summary.json'),
      JSON.stringify(
        {
          exeSha256,
          exeBytes: 109944872,
          isolation: { realUserSlotsAccessed: false },
          gates: { D1: { status: 'PASS' } },
        },
        null,
        2,
      ),
    );
    const manifest = buildEvidenceManifest(tmpDir, {
      sourceCommit,
      toolCommit,
      releaseTag,
      exeBytes: 109944872,
      exeSha256,
    });
    fs.writeFileSync(
      path.join(tmpDir, 'evidence-manifest.json'),
      JSON.stringify(manifest, null, 2),
    );
    const receipt = {
      releaseTag,
      sourceCommit,
      toolCommit,
      isPrerelease: true,
      isDraft: false,
      isLatest: false,
      latestReleasePreserved: 'v0.3.1',
      assets: [
        {
          name: 'UW2-Korean-Four-Captains.exe',
          localBytes: 109944872,
          downloadedBytes: 109944872,
          localSha256: exeSha256,
          downloadedSha256: exeSha256,
          verifiedMatch: true,
        },
      ],
    };
    fs.writeFileSync(
      path.join(tmpDir, 'publication-receipt.json'),
      JSON.stringify(receipt, null, 2),
    );
    return tmpDir;
  };

  test('passes when manifest, payload files, and external receipt match the single candidate', () => {
    const dir = createFixtureDir();
    try {
      const res = validateCandidateEvidence({
        remediationDir: dir,
        receiptPath: path.join(dir, 'publication-receipt.json'),
        expectedExeSha256: exeSha256,
        expectedSourceCommit: sourceCommit,
        expectedToolCommit: toolCommit,
        expectedReleaseTag: releaseTag,
      });
      expect(res.ok).toBe(true);
      expect(res.errors).toEqual([]);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  test('fails when a previous candidate receipt or mismatched EXE hash is supplied', () => {
    const dir = createFixtureDir();
    try {
      fs.writeFileSync(
        path.join(dir, 'publication-receipt.json'),
        JSON.stringify(
          {
            releaseTag: 'four-protagonists-candidate-20261109-6a5dcca',
            sourceCommit: '6a5dcca9aac115e919248c8b0c86e7cff2294eec',
            toolCommit: '6a5dcca9aac115e919248c8b0c86e7cff2294eec',
            isPrerelease: true,
            isDraft: false,
            isLatest: false,
            assets: [
              {
                name: 'UW2-Korean-Four-Captains.exe',
                localBytes: 109939955,
                downloadedBytes: 109939955,
                localSha256:
                  '6b29d82d00000000000000000000000000000000000000000000000000000000',
                downloadedSha256:
                  '6b29d82d00000000000000000000000000000000000000000000000000000000',
                verifiedMatch: true,
              },
            ],
          },
          null,
          2,
        ),
      );
      const res = validateCandidateEvidence({
        remediationDir: dir,
        receiptPath: path.join(dir, 'publication-receipt.json'),
        expectedExeSha256: exeSha256,
        expectedSourceCommit: sourceCommit,
        expectedToolCommit: toolCommit,
        expectedReleaseTag: releaseTag,
      });
      expect(res.ok).toBe(false);
      expect(res.errors.join('\n')).toContain('Receipt releaseTag mismatch');
      expect(res.errors.join('\n')).toContain('Receipt sourceCommit mismatch');
      expect(res.errors.join('\n')).toContain(
        'Receipt EXE asset hash mismatch',
      );
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  test('fails when a file is missing, replaced by a Git LFS pointer, or summary has wrong EXE hash', () => {
    const dir = createFixtureDir();
    try {
      const reportPath = path.join(dir, 'completion-report.md');
      fs.writeFileSync(
        reportPath,
        'version https://git-lfs.github.com/spec/v1\noid sha256:abc\nsize 123\n',
      );
      const summaryPath = path.join(
        dir,
        'evidence',
        'run-20261110-r1',
        'desktop-verification',
        'summary.json',
      );
      fs.unlinkSync(summaryPath);

      const res = validateCandidateEvidence({
        remediationDir: dir,
        receiptPath: path.join(dir, 'publication-receipt.json'),
        expectedExeSha256: exeSha256,
        expectedSourceCommit: sourceCommit,
        expectedToolCommit: toolCommit,
        expectedReleaseTag: releaseTag,
      });
      expect(res.ok).toBe(false);
      expect(res.errors.join('\n')).toContain('Git LFS pointer');
      expect(res.errors.join('\n')).toContain('Missing evidence file on disk');
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});
