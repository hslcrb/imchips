// Copyright 2026 Rheehose
// SPDX-License-Identifier: Apache-2.0
import { readFile, access, readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const root = new URL('../', import.meta.url);
const required = [
  'index.html','style.css','app.js','sw.js','manifest.webmanifest','icon.svg','_headers',
  'LICENSE','NOTICE','THIRD_PARTY_NOTICES.md','licenses/JSZip-MIT.txt',
  'README.md','CONTRIBUTING.md','CODE_OF_CONDUCT.md','SECURITY.md','GOVERNANCE.md',
  'CHANGELOG.md','docs/DEVELOPMENT_HISTORY.md','docs/ARCHITECTURE.md',
  'docs/DEPLOYMENT.md','docs/TESTING.md','docs/ROADMAP.md'
];
const read = name => readFile(new URL(name, root), 'utf8');
const errors = [];
for (const name of required) {
  try { await access(new URL(name, root)); }
  catch { errors.push('Missing required file: ' + name); }
}
const html = await read('index.html');
for (const ref of ['/style.css','/app.js','/manifest.webmanifest','/icon.svg']) {
  if (!html.includes(ref)) errors.push('HTML missing asset reference: ' + ref);
}
const manifest = JSON.parse(await read('manifest.webmanifest'));
for (const field of ['name','short_name','start_url','display','icons']) {
  if (!manifest[field]) errors.push('Manifest missing key: ' + field);
}
if (!manifest.icons.some(item => item.src === '/icon.svg')) errors.push('PWA icon must reference icon.svg');
const app = await read('app.js');
if (!app.includes('serviceWorker') || !app.includes("'/sw.js'")) errors.push('Service worker is not registered');
for (const path of ['app.js','sw.js','scripts/check.mjs']) {
  try { execFileSync(process.execPath, ['--check', new URL(path, root).pathname], { stdio: 'pipe' }); }
  catch { errors.push('JavaScript syntax failed: ' + path); }
}
const license = await read('LICENSE');
if (!license.includes('Apache License') || !license.includes('Version 2.0') || !license.includes('END OF TERMS AND CONDITIONS')) errors.push('Apache-2.0 license is missing or incomplete');
const notice = await read('NOTICE');
if (!notice.includes('Copyright 2026 Rheehose')) errors.push('Project copyright notice missing');
const thirdParty = await read('THIRD_PARTY_NOTICES.md');
if (!thirdParty.includes('JSZip') || !thirdParty.includes('MIT')) errors.push('JSZip notice missing');
const thirdPartyLicense = await read('licenses/JSZip-MIT.txt');
if (!thirdPartyLicense.includes('MIT License')) errors.push('JSZip MIT text missing');
const readme = await read('README.md');
if (!readme.includes('Apache-2.0') || !readme.includes('Rheehose')) errors.push('README attribution missing');
try {
  const workflows = new URL('.github/workflows/', root);
  const items = await readdir(workflows);
  if (items.length) errors.push('GitHub Actions workflows must not be added');
} catch (error) {
  if (error?.code !== 'ENOENT') errors.push('Cannot inspect workflow directory: ' + error.message);
}
if (errors.length) {
  console.error('imchips checks failed:\n' + errors.map(e => '- ' + e).join('\n'));
  process.exitCode = 1;
} else {
  console.log('imchips checks passed: required files, references, manifest, syntax, Apache notices, and no GitHub Actions');
}
