'use strict';

// Test-only baseline loading: the checked-out source is never overwritten.
const path = require('node:path');
const Module = require('node:module');
const { execFileSync } = require('node:child_process');
const remake = path.resolve(__dirname, '../../../..');
const filename = path.join(remake, 'tests/desktop/portVision.cjs');
const source = execFileSync(
  'git',
  ['show', 'c80192c9e15196c8fc0d6ca8a11668548f9a4a29:remake/tests/desktop/portVision.cjs'],
  { cwd: path.dirname(remake), encoding: 'utf8' },
);
const baseline = new Module(filename);
baseline.filename = filename;
baseline.paths = Module._nodeModulePaths(path.dirname(filename));
baseline._compile(source, filename);
baseline.loaded = true;
require.cache[filename] = baseline;
