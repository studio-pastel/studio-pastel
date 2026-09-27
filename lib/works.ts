import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const WORKS_DIR = path.join(process.cwd(), 'content', 'works');

export type WorkFrontmatter = {
  title: string;
  order: number;
  roles: string[];
  thumbnail: string;
  credit: string;
};

export type Work = WorkFrontmatter & {
  slug: string;
  contentHtml: string;
};

function isDraft(slug: string): boolean {
  const raw = fs.readFileSync(path.join(WORKS_DIR, `${slug}.md`), 'utf8');
  const { data } = matter(raw);
  return data.draft === true;
}

function readSlugs(): string[] {
  return fs
    .readdirSync(WORKS_DIR)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map((f) => f.replace(/\.md$/, ''))
    .filter((slug) => !isDraft(slug));
}

async function readWork(slug: string): Promise<Work> {
  const raw = fs.readFileSync(path.join(WORKS_DIR, `${slug}.md`), 'utf8');
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkHtml).process(content);
  return {
    slug,
    title: data.title,
    order: data.order ?? 999,
    roles: data.roles ?? [],
    thumbnail: data.thumbnail,
    credit: data.credit ?? '',
    contentHtml: processed.toString(),
  };
}

export async function getAllWorks(): Promise<Work[]> {
  const slugs = readSlugs();
  const works = await Promise.all(slugs.map(readWork));
  return works.sort((a, b) => a.order - b.order);
}

export function getAllWorkSlugs(): string[] {
  return readSlugs();
}

export async function getWorkBySlug(slug: string): Promise<Work> {
  return readWork(slug);
}
