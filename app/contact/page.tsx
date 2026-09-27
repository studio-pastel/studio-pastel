import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'contact',
};

export default function ContactPage() {
  return (
    <div className="page-contact">
      <article>
        <div className="wrapper">
          <ContactForm />
        </div>
      </article>
    </div>
  );
}
