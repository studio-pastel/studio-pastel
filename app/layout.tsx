import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Design Studio PASTEL Inc.',
    template: '%s｜Design Studio PASTEL Inc.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-MQHM11CJV2" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MQHM11CJV2');
          `}
        </Script>
        <Script src="//webfonts.xserver.jp/js/xserver.js" strategy="afterInteractive" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Script
          src="//typesquare.com/3/tsst/script/ja/typesquare.js?60a74a45fb9c45df950d2024e90393a3"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
