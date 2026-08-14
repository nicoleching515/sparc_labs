/* global React, ReactDOM, PUBS, useSheetEvents, PubRow, EventRow */
/* ╔══════════════════════════════════════════════════════════════════╗
   ║  ARCHIVE PAGE — the full Publications or Speaker Series list.     ║
   ║  One file serves both pages; which one it renders comes from      ║
   ║  <body data-archive="publications"> or "events" in the HTML.      ║
   ╚══════════════════════════════════════════════════════════════════╝ */

const { useEffect } = React;

function useReveal(dep) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "-10% 0px -10% 0px", threshold: 0 }
    );
    const attach = () => document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    attach();
    const raf = requestAnimationFrame(attach);
    /* Safety net: this page is essentially one long list, so if the observer
       never fires (odd viewport, embedded frame) reveal everything rather
       than leaving the page looking empty. */
    const failsafe = setTimeout(() => {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => el.classList.add("in"));
    }, 1200);
    return () => { cancelAnimationFrame(raf); clearTimeout(failsafe); io.disconnect(); };
  }, [dep]);
}

function TopBar() {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <a className="logomark" href="index.html">
          <span className="glyph" aria-hidden="true"></span>
          <span>SPARC</span>
          <span className="brand-labs">Labs</span>
        </a>
        <nav className="topnav">
          <a href="index.html#mission">Mission</a>
          <a href="publications.html">Publications</a>
          <a href="events.html">Events</a>
          <a href="Transparency.html">Transparency</a>
          <a href="index.html#contact">Contact</a>
        </nav>
        <div className="topbar-meta"></div>
      </div>
    </header>);

}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="col">
            <h4>Index</h4>
            <a href="index.html#mission">Mission</a>
            <a href="index.html#current-research">Current research</a>
            <a href="publications.html">Publications</a>
            <a href="events.html">Speaker series</a>
            <a href="index.html#moments">Moments</a>
            <a href="Transparency.html">Transparency</a>
          </div>
          <div className="col">
            <h4>Engage</h4>
            <a href="index.html#contact">Contact</a>
            <a href="mailto:sparc@caltech.edu?subject=Add%20me%20to%20the%20SPARC%20Labs%20mailing%20list">Mailing list</a>
          </div>
        </div>
        <div className="footer-mark-row">
          <img className="footer-torch" src="footer-torch.png" alt="" aria-hidden="true" />
          <div className="footer-mark" aria-hidden="true">SPARC<span className="brand-labs">Labs</span></div>
        </div>
        <div className="footer-bottom">
          <span>© Caltech ASCIT-affiliated Student Organization</span>
        </div>
      </div>
    </footer>);

}

function PublicationsArchive() {
  return (
    <>
      <div className="hero-toplinks reveal" style={{ marginBottom: 28 }}>
        <span className="eyebrow">Full list · Publications</span>
        <a className="hero-page-link" href="index.html"><span className="arrow" style={{ transform: "rotate(180deg)" }}>→</span> Home</a>
      </div>
      <h1 className="display page-head-title reveal">
        <span className="accent-word">Publications</span>
      </h1>
      <p className="page-head-sub reveal">
        Every paper, poster, and preprint from SPARC Labs — {PUBS.length} in total,
        newest first. Rows with a link open the paper.
      </p>
      <div className="pubs reveal" style={{ marginTop: 48 }}>
        {PUBS.map((p, i) => <PubRow key={i} p={p} />)}
      </div>
    </>);

}

function EventsArchive({ events }) {
  const list = events || [];
  return (
    <>
      <div className="hero-toplinks reveal" style={{ marginBottom: 28 }}>
        <span className="eyebrow">Full list · Speaker series</span>
        <a className="hero-page-link" href="index.html"><span className="arrow" style={{ transform: "rotate(180deg)" }}>→</span> Home</a>
      </div>
      <h1 className="display page-head-title reveal">
        <span className="accent-word">Speaker series</span>
      </h1>
      <p className="page-head-sub reveal">
        Every confirmed talk, pulled live from our schedule. Bi-weekly sessions on
        recent papers and open problems.
      </p>
      {list.length > 0 ?
      <div className="events-list reveal" style={{ marginTop: 48 }}>
          {list.map((e, i) => <EventRow key={i} e={e} />)}
        </div> :
      <div className="list-empty reveal" style={{ marginTop: 48 }}>Schedule to be confirmed!</div>}
    </>);

}

function App() {
  const which = document.body.dataset.archive;
  const events = which === "events" ? useSheetEvents() : null;
  useReveal(events ? events.length : "pubs");
  return (
    <>
      <TopBar />
      <section className="page-head">
        <div className="container">
          {which === "events" ? <EventsArchive events={events} /> : <PublicationsArchive />}
        </div>
      </section>
      <Footer />
    </>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
