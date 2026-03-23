import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<null | 'sending' | 'sent' | 'error'>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-elem',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 min-h-screen w-full text-center flex flex-col justify-center" ref={sectionRef}>
      <div className="contact-elem inline-block self-center mb-4 rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
        What's Next?
      </div>
      <h2 className="contact-elem text-2xl md:text-3xl lg:text-4xl font-black tracking-tight mb-6 text-gray-50">
        Get In Touch
      </h2>
      <p className="contact-elem text-lg text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed">
        Currently looking for new opportunities, my inbox is always open.
        Whether you have a question or just want to say hi, I'll try my best to get back to you!
      </p>

      {status === 'sent' ? (
        <div className="contact-elem glass p-8 rounded-2xl flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto border-green-500/30">
          <i className="fa-solid fa-circle-check text-5xl text-green-500 mb-2" />
          <h3 className="text-2xl font-bold text-gray-50">Message Sent!</h3>
          <p className="text-gray-400">Thanks for reaching out. I'll get back to you soon.</p>
          <button
            type="button"
            onClick={() => setStatus(null)}
            className="rounded-xl border border-green-500/50 px-5 py-2.5 text-sm font-semibold text-green-400 transition-colors hover:bg-green-500/10"
          >
            Submit another response
          </button>
        </div>
      ) : (
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="contact-elem w-full max-w-2xl mx-auto space-y-6 text-left"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>
              Don't fill this out if you're human: <input name="bot-field" />
            </label>
          </p>
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full glass bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-gray-100 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
              placeholder="Nandana"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full glass bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-gray-100 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
              placeholder="nandana@example.com"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full glass bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-gray-100 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors resize-none"
              placeholder="Hi Abhijith, I really like your portfolio! I'd love to connect and discuss potential opportunities."
            />
          </div>
          {status === 'error' && (
            <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
          )}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full group flex justify-center items-center gap-2 rounded-xl bg-green-500 hover:bg-green-400 text-black px-6 py-4 font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed text-lg hover:-translate-y-1 active:translate-y-0"
          >
            {status === 'sending' ? (
              <span className="animate-pulse">Sending...</span>
            ) : (
              <>
                Say Hello
                <i className="fa-solid fa-paper-plane text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      )}
    </section>
  );
}
