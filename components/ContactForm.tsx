'use client';

import { useState, type FormEvent } from 'react';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [emailMismatch, setEmailMismatch] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    // honeypot: real users never fill this hidden field
    if (String(data.get('_gotcha') || '').length > 0) {
      return;
    }

    const email = String(data.get('email') || '');
    const emailConfirm = String(data.get('email_confirm') || '');
    if (email !== emailConfirm) {
      setEmailMismatch(true);
      return;
    }
    setEmailMismatch(false);

    if (!FORMSPREE_ID) {
      // Not configured yet: fall back to a mailto draft so the message is never lost.
      const subject = encodeURIComponent(`[studio-pastel.jp] お問い合わせ（${data.get('name')}）`);
      const body = encodeURIComponent(
        `お名前: ${data.get('name')}\n会社名: ${data.get('company')}\nメールアドレス: ${email}\n\n${data.get('message')}`
      );
      window.location.href = `mailto:info@studio-pastel.jp?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="contact">
      <div className="response" role="status" aria-live="polite">
        {status === 'sent' && 'お問い合わせありがとうございます。メッセージを送信しました。'}
        {status === 'error' && '送信に失敗しました。お手数ですが info@studio-pastel.jp までメールにてご連絡ください。'}
      </div>

      <form onSubmit={handleSubmit}>
        <input type="text" name="_gotcha" className="hp-field" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <dl>
          <dt>お名前</dt>
          <dd>
            <input type="text" name="name" required />
          </dd>

          <dt>会社名</dt>
          <dd>
            <input type="text" name="company" />
          </dd>

          <dt>メールアドレス</dt>
          <dd>
            <input type="email" name="email" required />
            <input
              type="email"
              name="email_confirm"
              placeholder="確認のためもう一度ご入力ください"
              required
              onChange={() => setEmailMismatch(false)}
            />
            {emailMismatch && <span className="field-error">確認用のメールアドレスが一致していません</span>}
          </dd>

          <dt>お問い合わせ内容</dt>
          <dd>
            <textarea name="message" required rows={8} />
          </dd>
        </dl>

        <div className="submit">
          <input type="submit" value="送 信" disabled={status === 'sending'} />
        </div>
      </form>
    </div>
  );
}
