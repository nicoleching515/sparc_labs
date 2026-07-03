/* global React, ReactDOM, TweaksPanel, useTweaks, TweakSection, TweakColor, TweakRadio, TweakSelect */

/* ╔════════════════════════════════════════════════════════════════════╗
   ║  SPARC SITE — PAGE 2 · TRANSPARENCY                                  ║
   ║                                                                      ║
   ║    ✎ CONSTITUTION / GOVERNANCE ....  const CHARTER  (below)          ║
   ║    ✎ Advisor & traditional events .  in the Transparency component   ║
   ║                                                                      ║
   ║  Fonts, colors & dark/light are shared with the home page (the       ║
   ║  Tweaks panel writes to the same storage), so the look stays in      ║
   ║  sync across both pages.                                             ║
   ╚════════════════════════════════════════════════════════════════════╝ */

const { useEffect } = React;

/* ─── ✎ CONSTITUTION / GOVERNANCE — the articles on this page ──────────
   Each article has a roman numeral (n), heading (h), and EITHER a
   paragraph (p) OR a list of [term, definition] rows.
   ───────────────────────────────────────────────────────────────────── */
const CHARTER = [
{
  n: "I", h: "Name",
  p: "The organization's official name is SPARC Labs."
},
{
  n: "II", h: "Purpose",
  p: "A student-led academic research group at Caltech, dedicated to fostering interest in machine learning and AI. Members collaborate with both industry partners and academic laboratories across a broad range of subfields — producing meaningful research, supporting students at every experience level, and connecting members to the wider AI research community. The club operates in alignment with the Caltech Honor Code and Institute policy."
},
{
  n: "III", h: "Membership",
  p: "Open to all — there is no application.",
  list: [
  ["Student Members", "Any enrolled undergraduate or graduate student may join and hold office."],
  ["Affiliates", "Staff, faculty, student spouses, and JPL staff may take part but not hold leadership; a 60/40 student-to-affiliate ratio is maintained."],
  ["Research & General", "Research Members contribute to active projects; General Members join events and the community. Movement between the two is fluid."],
  ["Non-discrimination", "Membership decisions never discriminate on any status protected by law or Institute policy."]]
},
{
  n: "IV", h: "Meetings & Events",
  p: "Regular meetings are held on campus weekly during the academic year. Events are registered and run in accordance with Caltech's event, safety, travel, and speaker policies."
},
{
  n: "V", h: "Officers & Elections",
  p: "Officers are elected once each academic year by enrolled student members through open nominations and a majority confirmation vote. Only currently enrolled students may be nominated, hold office, or vote. Vacancies are filled by board appointment; officers may be removed by a majority board vote in consultation with the advisor.",
  list: [
  ["Co-Directors", "Set focus & direction, run weekly meetings, oversee officers, and liaise with the advisor (up to two serve jointly)."],
  ["Head of Research", "Reviews proposals, tracks project scope & timeline, coordinates funding, and writes grants."],
  ["Head of Events", "Outreach to speakers, industry partners & labs; member communications; maintains the website."],
  ["Treasurer", "Manages the budget, Bursar's account, reimbursements, and financial records."],
  ["Secretary", "Records and distributes meeting minutes and internal records."]]
},
{
  n: "VI", h: "Club Funds",
  p: "Funds are held in a Bursar's Club Account and used only for club purposes. The Treasurer requests purchases and reimbursements and keeps transparent records; significant spending requires board approval. Outside fundraising is cleared with the Office of Student & Family Engagement first."
},
{
  n: "VII", h: "Club Advisor",
  p: "A full-time Caltech faculty member, staff member, or postdoc advises the club, meeting once per term or as needed. The advisor guides and supports but does not run day-to-day operations — that rests with the student leaders."
},
{
  n: "VIII", h: "Conduct & Compliance",
  p: "The club and its members follow the Caltech Honor Code, Institute policy, and applicable law. Hazing, discrimination, harassment, and retaliation have no place here."
},
{
  n: "IX", h: "Research Conflicts of Interest",
  p: "Members act in good faith and with transparency. Authorship, credit, and intellectual-property expectations are discussed early and revisited as contributions evolve, and are settled by standard academic norms. Unresolved disputes go to the board, then the advisor, and — where needed — the Office of Student & Family Engagement."
},
{
  n: "X", h: "Records & Transition",
  p: "The club keeps accurate records of its constitution, membership, officers, finances, and major events. Outgoing officers support a reasonable transition for those who follow."
},
{
  n: "XI", h: "Dissolution",
  p: "If the club dissolves or loses recognition, remaining funds and property are handled under Caltech policy and are never distributed to individual members."
},
{
  n: "XII", h: "Amendments",
  p: "Any member may propose an amendment. Amendments require a 90% agreement of the board and take effect after review by the advisor and the Office of Student & Family Engagement. Caltech policy always takes precedence."
}];

/* ═════════════════════════════════════════════════════════════════════
   Layout & behavior
   ═════════════════════════════════════════════════════════════════════ */

function useReveal() {
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
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
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
        <nav className="nav" aria-label="Primary">
          <a href="index.html#mission">Mission</a>
          <a href="index.html#publications">Publications</a>
          <a href="index.html#events">Events</a>
          <a href="Transparency.html" aria-current="page">Transparency</a>
          <a href="index.html#contact">Contact</a>
        </nav>
        <div className="topbar-meta"></div>
      </div>
    </header>);
}

function SectionHead({ kicker, meta, children }) {
  return (
    <div className="section-head reveal">
      <div className="label">
        <span className="eyebrow">{kicker}</span>
        {meta && <div className="meta">{meta}</div>}
      </div>
      <h2>{children}</h2>
    </div>);
}

function EditNote({ children }) {
  return <div className="placeholder-note">{children}</div>;
}

function PageHead() {
  return (
    <section className="page-head" id="top">
      <div className="container">
        <div className="hero-toplinks reveal" style={{ marginBottom: 28 }}>
          <span className="eyebrow">Page 02 · Governance &amp; records</span>
          <a className="hero-page-link" href="index.html"><span className="arrow" style={{ transform: "rotate(180deg)" }}>→</span> Home</a>
        </div>
        <h1 className="display page-head-title reveal">
          <span className="accent-word">Transparency</span>
        </h1>
        <p className="page-head-sub reveal">
          How SPARC Labs operates, written down — name, purpose, membership,
          officer roles, funds, and how credit on shared work is settled. This is
          the club's constitution, adopted July 2026. The summary below tracks the
          official document; read the full text from the side.
        </p>
      </div>
    </section>);
}

function Transparency() {
  return (
    <section className="section" id="governance">
      <div className="container">
        <SectionHead kicker="§ — Constitution" meta="Adopted 3 July 2026 · AY 25–26">
          The <em>articles</em> — name, purpose, membership, officers, funds, and how credit is settled.
        </SectionHead>
        <div className="charter reveal">
          {CHARTER.map((a) =>
          <article className="art" key={a.n}>
              <div className="n">
                Article {a.n}
                <span className="art-h">{a.h}</span>
              </div>
              <div className="art-body">
                {a.p && <p>{a.p}</p>}
                {a.list &&
              <dl>
                    {a.list.map(([term, def]) =>
                <div className="charter-row" key={term}>
                        <dt>{term}</dt>
                        <dd>{def}</dd>
                      </div>
                )}
                  </dl>
              }
              </div>
            </article>
          )}
        </div>
        <div className="charter-advisor reveal">
          <div><span className="k">Faculty advisor</span><span className="v"><em>Tony Yu</em></span></div>
          <div><span className="k">Traditional events</span><span className="v">ICML · ICLR · ICRA · NeurIPS</span></div>
          <div><span className="k">Amendments</span><span className="v">90% board agreement</span></div>
        </div>
        <EditNote>✎ Edit in transparency.jsx → CHARTER[] · advisor &amp; events in the Transparency component</EditNote>
      </div>
    </section>);
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="brand">
            <h3>A student-led AI research group <em>at Caltech.</em></h3>
            <p>
              Dedicated to fostering interest in machine learning and artificial
              intelligence — and to cultivating a strong AI research community on
              campus.
            </p>
          </div>
          <div className="col">
            <h4>Index</h4>
            <a href="index.html#mission">Mission</a>
            <a href="index.html#publications">Publications</a>
            <a href="index.html#current-research">Current research</a>
            <a href="Transparency.html">Transparency</a>
            <a href="Constitution.html" target="_blank" rel="noopener">Full constitution</a>
          </div>
          <div className="col">
            <h4>Engage</h4>
            <a href="index.html#contact">Contact</a>
            <a href="index.html#events">Speaker series</a>
            <a href="#">Mailing list</a>
            <a href="#">For partners</a>
          </div>
          <div className="col">
            <h4>Reach</h4>
            <span>sparc@caltech.edu</span>
            <span>ayushi@caltech.edu</span>
            <span>nbai@caltech.edu</span>
          </div>
        </div>
        <div className="footer-mark-row">
          <img className="footer-torch" src="footer-torch.png" alt="" aria-hidden="true" />
          <div className="footer-mark" aria-hidden="true">SPARC<span className="brand-labs">Labs</span></div>
        </div>
        <div className="footer-bottom">
          <span>© MMXXVI — Caltech ASCIT-affiliated student org</span>
        </div>
      </div>
    </footer>);
}

/* ═════════════════════════════════════════════════════════════════════
   APP  +  Tweaks (shared with home page via storage)
   ═════════════════════════════════════════════════════════════════════ */

const FONTS = [
{ value: "plex", label: "Plex" },
{ value: "geist", label: "Geist" },
{ value: "hanken", label: "Hanken" },
{ value: "space", label: "Space" },
{ value: "bricolage", label: "Bricolage" }];

const ACCENTS = [
"#ff6c0c", "#f5a623", "#ff3b30", "#ff4d8d",
"#7c5cff", "#2f6bff", "#00b4d8", "#00c46a"];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mode": "dark",
  "font": "plex",
  "accent": "#ff6c0c"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useReveal();

  useEffect(() => {
    document.documentElement.dataset.mode = t.mode;
    document.documentElement.dataset.font = t.font;
    document.documentElement.style.setProperty("--accent", t.accent);
    document.documentElement.style.setProperty("--accent-ink", isLight(t.accent) ? "#0a0f1f" : "#f3eee0");
  }, [t.mode, t.font, t.accent]);

  return (
    <>
      <TopBar />
      <PageHead />
      <Transparency />
      <Footer />

      <a className="const-rail" href="Constitution.html" target="_blank" rel="noopener"
         aria-label="Read the full SPARC Labs constitution">
        Full constitution <span className="arrow">→</span>
      </a>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Mode" />
        <TweakRadio
          label="Theme"
          value={t.mode}
          onChange={(v) => setTweak("mode", v)}
          options={[{ value: "dark", label: "Dark" }, { value: "light", label: "Light" }]} />
        <TweakSection label="Typeface" />
        <TweakSelect
          label="Font pairing"
          value={t.font}
          onChange={(v) => setTweak("font", v)}
          options={FONTS} />
        <TweakSection label="Accent color" />
        <TweakColor
          label="Color"
          value={t.accent}
          onChange={(v) => setTweak("accent", v)}
          options={ACCENTS} />
      </TweaksPanel>
    </>);
}

function isLight(hex) {
  const m = hex.replace("#", "");
  const n = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const i = parseInt(n, 16);
  const r = i >> 16 & 255, g = i >> 8 & 255, b = i & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
