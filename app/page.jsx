import RequirementForm from "../components/RequirementForm";

export default function Home() {
  return (
    <main className="page-shell">
      <header className="site-header" aria-label="Evently header">
        <a className="brand" href="#top" aria-label="Evently home">
          <span className="brand-mark">E</span>
          <span>Evently</span>
        </a>
        <span className="header-note">Event requirements, made simple</span>
      </header>

      <section id="top" className="hero" aria-labelledby="page-title">
        <p className="eyebrow">EVENT MANAGEMENT</p>
        <h1 id="page-title">Post Your Event Requirement</h1>
        <p className="hero-copy">
          Tell us what you need for your event and we&apos;ll help you find the right professionals.
        </p>
      </section>

      <RequirementForm />

      <footer className="site-footer">© {new Date().getFullYear()} Evently. Built for better events.</footer>
    </main>
  );
}
