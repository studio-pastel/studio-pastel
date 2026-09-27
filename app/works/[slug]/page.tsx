import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllWorkSlugs, getWorkBySlug } from '@/lib/works';

export async function generateStaticParams() {
  return getAllWorkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const work = await getWorkBySlug(slug);
    return { title: work.title };
  } catch {
    return {};
  }
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let work;
  try {
    work = await getWorkBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <div className="page-works-single">
      <article>
        <div className="wrapper">
          <h1 className="ti">{work.title}</h1>
          {work.roles.length > 0 && (
            <ul>
              {work.roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          )}
          <div className="co" dangerouslySetInnerHTML={{ __html: work.contentHtml }} />
          <div className="credit" style={{ whiteSpace: 'pre-line' }}>
            {work.credit}
          </div>
        </div>
      </article>
    </div>
  );
}
