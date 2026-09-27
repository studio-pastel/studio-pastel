import type { Metadata } from 'next';
import { Fragment } from 'react';
import Link from 'next/link';
import { getAllWorks } from '@/lib/works';
import { ROLE_LABELS, ROLE_ORDER } from '@/lib/roles';

export const metadata: Metadata = {
  title: 'works',
};

export default async function WorksArchivePage() {
  const works = await getAllWorks();

  return (
    <div className="page-works-archive">
      <article>
        <div className="wrapper">
          <dl>
            {ROLE_ORDER.map((code) => (
              <Fragment key={code}>
                <dt>{code}</dt>
                <dd>{ROLE_LABELS[code]}</dd>
              </Fragment>
            ))}
          </dl>

          <div className="works_wrap">
            {works.map((work) => (
              <div key={work.slug}>
                <Link href={`/works/${work.slug}/`}>
                  <img src={work.thumbnail} alt="" />
                </Link>
                <span className="ti">{work.title}　</span>
                <ul className="credit">
                  {work.roles.map((role) => (
                    <li key={role}>{role}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
