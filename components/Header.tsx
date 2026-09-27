'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isAbout = pathname.startsWith('/about');
  const isWorks = pathname.startsWith('/works');
  const isContact = pathname.startsWith('/contact');

  return (
    <header>
      <h1>
        <Link href="/">
          <img src="/images/common/logo.svg" alt="Design Studio PASTEL Inc." />
        </Link>
      </h1>
      <nav>
        <ul>
          <li className={isAbout ? 'active' : undefined}>
            <Link href="/about/">about</Link>
          </li>
          <li className={isWorks ? 'active' : undefined}>
            <Link href="/works/">works</Link>
          </li>
          <li className={isContact ? 'active' : undefined}>
            <Link href="/contact/">contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
