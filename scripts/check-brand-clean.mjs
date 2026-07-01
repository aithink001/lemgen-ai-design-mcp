import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const legacy = 'mei' + 'gen';
const forbidden = [
  new RegExp(legacy, 'i'),
  new RegExp(`images\\.${legacy}\\.ai`, 'i'),
  new RegExp(`www\\.${legacy}\\.ai`, 'i'),
];
const allowed = new Set([
  path.join(root, 'scripts', 'check-brand-clean.mjs'),
]);
const ignoredDirs = new Set(['.git', 'node_modules', 'dist']);
const exts = new Set([
  '.ts',
  '.js',
  '.json',
  '.md',
  '.yml',
  '.yaml',
  '.html',
  '.css',
]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) walk(file);
      continue;
    }
    if (allowed.has(file) || !exts.has(path.extname(file))) continue;
    const text = fs.readFileSync(file, 'utf8');
    for (const pattern of forbidden) {
      if (pattern.test(text)) {
        console.error(`Forbidden legacy brand match in ${path.relative(root, file)}: ${pattern}`);
        process.exitCode = 1;
      }
    }
  }
}

walk(root);
if (process.exitCode) process.exit(1);
console.log('Brand scan passed.');
