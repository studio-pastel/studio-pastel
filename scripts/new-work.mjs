// Interactive scaffold for adding a new Works entry.
// Usage: npm run new-work
import fs from 'node:fs/promises';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const ROOT = process.cwd();
const WORKS_DIR = path.join(ROOT, 'content', 'works');
const IMAGES_ROOT = path.join(ROOT, 'public', 'images', 'works');

const ROLES = ['ED', 'CD', 'PL', 'CM', 'CW', 'WR', 'GD', 'WD', 'OT'];

function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function nextOrder() {
  const files = await fs.readdir(WORKS_DIR).catch(() => []);
  let max = 0;
  for (const f of files) {
    if (!f.endsWith('.md')) continue;
    const raw = await fs.readFile(path.join(WORKS_DIR, f), 'utf8');
    const m = raw.match(/^order:\s*(\d+)/m);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  return max + 1;
}

function yamlEscape(s) {
  return `"${String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

const rl = readline.createInterface({ input: stdin, output: stdout });

console.log('新しいWorksを追加します。\n');

const title = await rl.question('作品名（タイトル）: ');
let slug = await rl.question(`URLに使うslug（英数字とハイフン、空Enterで自動生成）: `);
if (!slug.trim()) slug = slugify(title);
slug = slugify(slug);

console.log(`\n役割コード: ${ROLES.join(' / ')}`);
const rolesInput = await rl.question('該当する役割コードをカンマ区切りで（例: ED,CW）: ');
const roles = rolesInput
  .split(',')
  .map((r) => r.trim().toUpperCase())
  .filter(Boolean);

console.log('\nクレジット情報を1行ずつ入力してください（空行で終了）。例: 2024／ポスター');
const creditLines = [];
for (;;) {
  const line = await rl.question('  > ');
  if (!line.trim()) break;
  creditLines.push(line);
}

const bodyText = await rl.question('\n本文（説明文）を1段落だけ入力（あとでファイルを直接編集して追加できます）: ');

rl.close();

const order = await nextOrder();
const imagesDir = path.join(IMAGES_ROOT, slug);
await fs.mkdir(imagesDir, { recursive: true });

const frontmatter = [
  '---',
  `title: ${yamlEscape(title)}`,
  `order: ${order}`,
  `roles: [${roles.map((r) => yamlEscape(r)).join(', ')}]`,
  `thumbnail: ${yamlEscape(`/images/works/${slug}/thumbnail.jpg`)}`,
  'credit: |-',
  ...creditLines.map((l) => `  ${l}`),
  '---',
  '',
].join('\n');

const body = `![](/images/works/${slug}/thumbnail.jpg)\n\n${bodyText}\n`;

const mdPath = path.join(WORKS_DIR, `${slug}.md`);
await fs.writeFile(mdPath, frontmatter + body, 'utf8');

console.log(`\n✅ 作成しました: content/works/${slug}.md`);
console.log(`📁 画像フォルダ: public/images/works/${slug}/`);
console.log(`\n次のステップ:`);
console.log(`  1. public/images/works/${slug}/ に画像を追加してください（サムネイルは thumbnail.jpg という名前推奨）`);
console.log(`  2. content/works/${slug}.md を開いて本文・画像パスを調整してください`);
console.log(`  3. git add . && git commit -m "add work: ${title}" && git push`);
console.log(`     → プッシュすると自動的にサイトが更新されます。`);
