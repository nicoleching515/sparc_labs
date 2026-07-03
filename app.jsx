/* global React, ReactDOM, HeroCanvas, TweaksPanel, useTweaks, TweakSection, TweakColor, TweakRadio, TweakSelect */

/* ╔════════════════════════════════════════════════════════════════════╗
   ║  SPARC SITE  —  CONTENT EDIT GUIDE                                   ║
   ║                                                                      ║
   ║  Everything you'll want to change lives in the labelled blocks       ║
   ║  below. Scroll to the ✎ banner you want, then edit the text inside   ║
   ║  the quotes. Add or delete an entry by copying / removing one {...}  ║
   ║  object in the list.                                                 ║
   ║                                                                      ║
   ║    ✎ OFFICERS / LEADERSHIP ........  const TEAM                      ║
   ║    ✎ RESEARCH AREAS / PROJECTS ....  const AREAS                     ║
   ║    ✎ PARTNERS (labs & industry) ...  const PARTNERS + PARTNERS_MARQUEE
   ║    ✎ PUBLICATIONS .................  const PUBS                      ║
   ║    ✎ EVENTS / SPEAKERS ............  const EVENTS                    ║
   ║    ✎ GOVERNANCE / CONSTITUTION ....  transparency.jsx (page 2)        ║
   ║    ✎ MISSION OBJECTIVES ...........  const OBJECTIVES                ║
   ║    ✎ TOP TICKER ..................   const TICKER_ITEMS              ║
   ║                                                                      ║
   ║  Fonts, colors & dark/light live in the Tweaks panel (toolbar).      ║
   ╚════════════════════════════════════════════════════════════════════╝ */

const { useState, useEffect, useRef } = React;

/* ─── ✎ TOP TICKER — the scrolling orange bar at the very top ─────────── */
const TICKER_ITEMS = [
"Now meeting · weekly · Pasadena",
"14 active projects · 6 research areas",
"Spring speaker series · in progress",
"SPARC Labs · est. 2024 · Caltech",
"Pasadena, CA · 91125"];


/* ─── ✎ MISSION OBJECTIVES — the four cards under "Mission" ───────────── */
const OBJECTIVES = [
{
  n: "01",
  h: "Original Research",
  p: "Members pursue novel investigations across machine learning — from foundation model behavior to interpretability, theory, and applied work —and apply them to other disciplines.",
  tag: "Year-long teams"
},
{
  n: "02",
  h: "Lab & Industry Partnerships",
  p: "Bi-weekly events featuring talks in collaboration with Caltech labs and industry research groups, with formal mentorship throughout the year.",
  tag: "Mentored"
},
{
  n: "03",
  h: "Conferences & Workshops",
  p: "High-quality research with the intent of attending and presenting work at the field's top venues — ICML, ICLR, ICRA, and NeurIPS, etc.",
  tag: "ICML · ICLR · ICRA · NeurIPS"
}];


/* ─── ✎ RESEARCH AREAS / PROJECTS — the grid under "Research" ──────────
   id:    a code shown top-left (any string)
   size:  "feature" = big card, "wide" = medium, "std" = small
   count: e.g. "3 teams"
   h:     heading. Wrap a word in <em>…</em> to tint it the accent color.
   p:     one-line description
   pull:  (feature card only) a pull-quote
   kw:    list of keyword chips
   ───────────────────────────────────────────────────────────────────── */
const AREAS = [
{
  id: "AREA-01", size: "feature", count: "4 teams",
  h: <>Language Models <em>&amp;</em> Alignment</>,
  p: "Behavior, evaluation, and alignment of large language models. From red-teaming to training-time interventions.",
  pull: "\u201CHow does an LLM decide what it doesn't know — and can we make it tell us?\u201D",
  kw: ["LLMs", "Evals", "RLHF", "Agents", "Safety"]
},
{
  id: "AREA-02", size: "std", count: "2 teams",
  h: "Mechanistic Interpretability",
  p: "Reverse-engineering learned circuits inside transformers and vision models.",
  kw: ["SAEs", "Circuits", "Probing"]
},
{
  id: "AREA-03", size: "std", count: "3 teams",
  h: "Reinforcement Learning",
  p: "Policy learning, offline RL, and decision-making under uncertainty.",
  kw: ["Offline RL", "Exploration"]
},
{
  id: "AREA-04", size: "wide", count: "2 teams",
  h: <>ML for the <em>Natural Sciences</em></>,
  p: "Neural surrogates, simulation, and inference for physics, chemistry and biology — with campus labs.",
  kw: ["Physics", "PDE Solvers", "Structures"]
},
{
  id: "AREA-05", size: "wide", count: "1 team",
  h: "Vision & Multimodal",
  p: "Representation learning across vision, video, and language — generative and discriminative.",
  kw: ["VLMs", "Video", "Diffusion"]
},
{
  id: "AREA-06", size: "wide", count: "2 teams",
  h: "Theory & Foundations",
  p: "Learning theory, generalization, and the mathematical structure of modern deep networks.",
  kw: ["Scaling Laws", "Geometry", "Optimization"]
}];


/* ─── ✎ PUBLICATIONS — the list under "Publications" ──────────────────── */
/* ─── ✎ PUBLICATIONS — the list under "Publications" ────────────────────
   ✎ LINK: set `url` to the paper / arXiv / PDF page for each entry.
      Leave it as "#" to keep the row as a non-clickable placeholder.   */
const PUBS = [
{ year: "2026", title: <>BEACON: Belief-Aware Replanning for Safe Online Motion Planning</>, authors: "Ishita Banerjee, Maggie Yufei Bai, Soptorshi Ghosh, Rhea Senan, Ayushi Mehrotra", venue: "IEEE ICRA 2026 Workshop Xplore", tag: "ICRA Workshop Poster", url: "https://openreview.net/forum?id=zxinuYvMp2" /* ✓ paper link */ },
{ year: "2026", title: <>Count Me If You Can: Geometric Failure Modes in Language Model Counting</>, authors: "Nicholas Bai, Ayushi Mehrotra", venue: "ICML 2026 Workshop CompLearn", tag: "ICML Workshop Poster", url: "https://openreview.net/forum?id=8PAXj6x6zn" /* ✓ paper link */ },
{ year: "2026", title: <>Sparse Autoencoders Find Causal, Lineage-Specific Context Features in Chromatin Foundation Models</>, authors: "Nicole Ching, Ayushi Mehrotra", venue: "ICML 2026 Workshop CompLearn and Mech Interp", tag: "ICML Workshop Poster", url: "#" /* ✎ paste paper link here */ },
{ year: "2026", title: <>What Does a Chromatin Foundation Model Know About a Petri Dish? Sparse Autoencoders Reveal In Vitro vs. In Vivo Context in EPIBERT</>, authors: "Nicole Ching, Ayushi Mehrotra", venue: "ICML 2026 Workshop GenBio", tag: "ICML Workshop Poster", url: "#" /* ✎ paste paper link here */ },
{ year: "2026", title: <>Auditing a Multi-Modal Chromatin Foundation Model with Sparse Autoencoders</>, authors: "Nicole Ching, Ayushi Mehrotra", venue: "ICML 2026 Workshop FM4LS", tag: "ICML Workshop Poster", url: "#" /* ✎ paste paper link here */ }];


/* ─── ✎ PARTNERS — two places to edit ─────────────────────────────────
   PARTNERS_MARQUEE  = the big scrolling names (text only)
   PARTNERS          = the grid of cards. Set placeholder:true to show a
                       dashed "to-be-added" chip instead of a real name.
   ───────────────────────────────────────────────────────────────────── */
const PARTNERS_MARQUEE = [
"Anandkumar Group",
"Yue Lab",
"Anthropic",
"Google DeepMind",
"JPL",
"[Lab — placeholder]",
"[Industry partner — placeholder]",
"AI4Science"];


const PARTNERS = [
{ k: "Caltech lab", placeholder: false, n: <>Anandkumar <em>Group</em></> },
{ k: "Caltech lab", placeholder: false, n: <>Yue <em>Lab</em></> },
{ k: "Caltech lab", placeholder: true, n: "Lab — placeholder" },
{ k: "Caltech lab", placeholder: true, n: "Lab — placeholder" },
{ k: "Caltech lab", placeholder: true, n: "Lab — placeholder" },
{ k: "Caltech lab", placeholder: true, n: "Lab — placeholder" },
{ k: "Industry", placeholder: false, n: <>Anthropic</> },
{ k: "Industry", placeholder: false, n: <>Google <em>DeepMind</em></> },
{ k: "Industry", placeholder: true, n: "Partner — placeholder" },
{ k: "Industry", placeholder: true, n: "Partner — placeholder" },
{ k: "Affiliated", placeholder: false, n: <>JPL / <em>NASA</em></> },
{ k: "Affiliated", placeholder: true, n: "Affiliate — placeholder" }];


/* ─── ✎ OFFICERS / LEADERSHIP — the cards under "Leadership" ───────────
   role:    job title shown at the top of the card
   name:    full name
   school:  e.g. "Caltech · CMS"
   bio:     shown when you hover the card
   focus:   short focus line
   email:   used for the mailto link
   mono:    initials shown on the placeholder photo
   size:    "lead" = big card (co-directors), "std" = standard card
   poi:     true = also appears as a "point of contact" in the Contact section
   To add an officer: copy one {...} block. To remove: delete one.
   ───────────────────────────────────────────────────────────────────── */
const TEAM = [
{
  role: "Co-Director",
  name: "Ayushi Mehrotra",
  school: "Caltech · ACM",
  bio: "Co-leads SPARC's focus and direction, runs weekly meetings, and liaises with the advisor. Working on language model evaluation methodology.",
  focus: "LLM evaluation",
  email: "amehrotra@caltech.edu",
  mono: "AM",
  size: "lead",
  photoId: "AM-001",
  poi: false
},
{
  role: "Co-Director",
  name: "Nicholas Bai",
  school: "Caltech · CS",
  bio: "Co-leads SPARC's focus and direction and oversees project review. Working on mechanistic interpretability of transformer attention heads.",
  focus: "Interpretability",
  email: "nbai@caltech.edu",
  mono: "NB",
  size: "lead",
  photoId: "NB-002",
  poi: false
},
{
  role: "Outreach Coordinator",
  name: "Nicole Ching",
  school: "Caltech · MechE",
  bio: "Runs the speaker series and outreach to partners and labs. First point of contact for visiting researchers.",
  focus: "Speaker series",
  email: "nching@caltech.edu",
  mono: "NC",
  size: "std",
  photoId: "NC-003"
},
{
  role: "Outreach Coordinator",
  name: "Ishita Banerjee",
  school: "Caltech · EE",
  bio: "Handles member communications and onboarding, and oversees project matching at the start of each year.",
  focus: "Partnerships",
  email: "ibanerjee@caltech.edu",
  mono: "IB",
  size: "std",
  photoId: "IB-004"
},
{
  role: "Treasurer",
  name: "Susanna Cao",
  school: "Caltech · MechE",
  bio: "Manages the budget, Bursar's account, reimbursements, and travel grants for members presenting at conferences.",
  focus: "Operations",
  email: "scao@caltech.edu",
  mono: "SC",
  size: "std",
  photoId: "SC-005"
},
{
  // NEW OFFICER — edit role / surname / details as needed
  role: "Head of Research",
  name: "Ari Horikawa-Strakovsky",
  school: "Caltech · CS",
  bio: "Reviews research proposals, tracks project scope and timelines, and coordinates funding and grant-writing with the treasurer.",
  focus: "Research review",
  email: "ari@caltech.edu",
  mono: "A",
  size: "std",
  photoId: "AR-006"
}];


/* ─── ✎ EVENTS / SPEAKERS — the list under "Speaker series" ────────────
   upcoming:true shows it at full strength; false dims it as a past talk.
   ───────────────────────────────────────────────────────────────────── */
const EVENTS = [
{ date: "DATE", title: "Title - placeholder", speaker: "[Visiting researcher — placeholder]", venue: "Venue - placeholder", upcoming: true },
{ date: "DATE", title: "Title - placeholder", speaker: "[Visiting researcher — placeholder]", venue: "Venue - placeholder", upcoming: true },
{ date: "DATE", title: "Title - placeholder", speaker: "[Visiting researcher — placeholder]", venue: "Venue - placeholder", upcoming: true },
{ date: "DATE", title: "Title - placeholder", speaker: "[Visiting researcher — placeholder]", venue: "Venue - placeholder", upcoming: true },
{ date: "DATE", title: "Title - placeholder", speaker: "[Visiting researcher — placeholder]", venue: "Venue - placeholder", upcoming: true },
{ date: "DATE", title: "Title - placeholder", speaker: "[Visiting researcher — placeholder]", venue: "Venue - placeholder", upcoming: true }];


/* ─── ✎ GOVERNANCE / CONSTITUTION lives on the second page (Transparency.html)
   Edit that content in transparency.jsx → const CHARTER
   ───────────────────────────────────────────────────────────────────── */


const POIS = TEAM.filter((m) => m.poi);

/* ═════════════════════════════════════════════════════════════════════
   Below here is layout & behavior — you usually won't need to touch it.
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

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {items.map((it, i) =>
        <span key={i}><span className="dot"></span>{it}</span>
        )}
      </div>
    </div>);

}

function TopBar() {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <a className="logomark" href="#top">
          <span className="glyph" aria-hidden="true"></span>
          <span>SPARC</span>
          <span className="brand-labs">Labs</span>
        </a>
        <nav className="nav" aria-label="Primary">
          <a href="#mission">Mission</a>
          <a href="#publications">Publications</a>
          <a href="#events">Events</a>
          <a href="Transparency.html">Transparency</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="topbar-meta"></div>
      </div>
    </header>);

}

function Hero({ accent, bg, fg }) {
  return (
    <section className="hero" id="top">
      <div className="hero-canvas-wrap" aria-hidden="true">
        <HeroCanvas accent={accent} bg={bg} fg={fg} />
      </div>
      <div className="container hero-inner">
        <div className="hero-toplinks" style={{ marginBottom: 36 }}>
          <span className="eyebrow">A student research group · Caltech · Pasadena</span>
          <a className="hero-page-link" href="Transparency.html">Transparency <span className="arrow">→</span></a>
        </div>
        <h1 className="display hero-title">
           <span className="accent-word">SPARC</span> <span className="brand-labs">Labs</span>,<br />
          cultivated<br />
          on campus.
        </h1>
        <div className="hero-sub-row">
          <p>
            <em>SPARC</em> <span className="brand-labs">Labs</span> is a student-led academic research group at Caltech — fostering original work in machine learning and AI with applications intersecting across scientific fields through industry & lab partnerships, public speaker series, and a community that takes the questions seriously.
          </p>
        </div>

        <div className="hero-cta">
          <a className="btn lg" href="#contact">Get in touch <span className="arrow">→</span></a>
          <a className="btn ghost lg" href="#publications">Browse research</a>
        </div>
      </div>
    </section>);


}

function MissionMarquee() {
  const segs =
  <>
      <span>Original research</span>
      <span className="dot"></span>
      <span className="acc">Mentored</span>
      <span className="dot"></span>
      <span>Published</span>
      <span className="dot"></span>
      <span className="acc">Open to all</span>
      <span className="dot"></span>
    </>;

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {Array.from({ length: 8 }).map((_, i) =>
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 56 }}>{segs}</span>
        )}
      </div>
    </div>);

}

/* ─── ✎ LINKS — paste your real URLs here ──────────────────────────────
   Everything the site links out to lives in this one block. Replace each
   placeholder string with your real link, then redeploy.

     PROPOSAL_FORM_URL ...... "Submit project proposal" button (Publications)
     PROJECT_APP_FORM_URL ... "Project application form" button (Current Research)
     INSTAGRAM_URL .......... Instagram profile (Contact · "Say hi")
     LINKEDIN_URL ........... LinkedIn page (Contact · "Say hi")
     MAILING_LIST_URL ....... "Mailing list" signup (footer)

   • Paper links live per-row on each PUBS entry above (the `url:` field —
     rows still set to "#" render as non-clickable placeholders).
   • Leave any link as "#" to keep its button/row inert until you have a URL.
   ──────────────────────────────────────────────────────────────── */
const PROPOSAL_FORM_URL = "#";     /* ✎ "Submit project proposal" Google Form (https://forms.gle/…) */
const PROJECT_APP_FORM_URL = "#";  /* ✎ "Project application" Google Form (https://forms.gle/…) */
const INSTAGRAM_URL = "#";         /* ✎ Instagram profile (https://instagram.com/…) */
const LINKEDIN_URL = "#";          /* ✎ LinkedIn page (https://linkedin.com/company/…) */
const MAILING_LIST_URL = "#";      /* ✎ Mailing-list signup link */

/* ─── ✎ CURRENT RESEARCH — auto-populated from a Google Sheet ───────────
   The section reads the “Current Projects” sheet live and shows only rows
   whose “Active?” column says Yes. To point it at a different sheet, swap
   the ID in SHEET_ID (the sheet must be shared “anyone with the link”).
   Columns used: Project Description · Active? · Subjects · Members ·
   Intended Conferences?  — SHEET_FALLBACK shows if the fetch is blocked.
   ─────────────────────────────────────────────────────────────────────── */
const SHEET_ID = "1TbF_dmU6EGUw3hmAbtsmduEbtp0IxBYM-oEiepR5mvg";
const SHEET_FALLBACK = [
{ title: "Motion planning in partially known environments", subjects: "EAS", members: "0 – 5", venue: "IROS Workshop" }];

function useSheetProjects() {
  const [projects, setProjects] = useState(SHEET_FALLBACK);
  useEffect(() => {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
    fetch(url).
    then((r) => r.text()).
    then((txt) => {
      const data = JSON.parse(txt.slice(txt.indexOf("{"), txt.lastIndexOf("}") + 1));
      let cols = (data.table.cols || []).map((c) => (c.label || "").toLowerCase());
      let rows = (data.table.rows || []).map((r) =>
      (r.c || []).map((c) => c && c.v != null ? String(c.v).trim() : ""));
      // If the sheet has no frozen header, gviz leaves labels blank and puts
      // the header text in row 0 — use that row as the header instead.
      if (!cols.some((l) => l)) {
        cols = (rows[0] || []).map((s) => s.toLowerCase());
        rows = rows.slice(1);
      }
      const at = (needle) => cols.findIndex((l) => l.includes(needle));
      const iDesc = at("description"), iActive = at("active"),
      iSub = at("subject"), iMem = at("member"), iConf = at("conference");
      const active = rows.
      filter((c) => c[iDesc] && /^y/i.test(c[iActive] || "")).
      map((c) => ({ title: c[iDesc], subjects: c[iSub], members: c[iMem], venue: c[iConf] }));
      setProjects(active);
    }).
    catch(() => {});
  }, []);
  return projects;
}

/* ─── ✎ SPEAKER SERIES — auto-populated from a Google Sheet ─────────────
   Reads the speaker schedule live and shows only rows whose “Confirmed?”
   column says Yes. Columns used: Date · Title · Speaker · Affiliation ·
   Confirmed?  — swap EVENTS_SHEET_ID to point at a different sheet (must
   be shared “anyone with the link”). If no rows are confirmed, the section
   shows a “Schedule to be confirmed!” placeholder.
   ─────────────────────────────────────────────────────────────────────── */
const EVENTS_SHEET_ID = "1EDeMs8gkjnET_oGnKwQ_bRXfOg-FQrBqGvfghsrMNR8";

function useSheetEvents() {
  const [events, setEvents] = useState(null); // null = loading, [] = none confirmed
  useEffect(() => {
    const url = `https://docs.google.com/spreadsheets/d/${EVENTS_SHEET_ID}/gviz/tq?tqx=out:json`;
    fetch(url).
    then((r) => r.text()).
    then((txt) => {
      const data = JSON.parse(txt.slice(txt.indexOf("{"), txt.lastIndexOf("}") + 1));
      let cols = (data.table.cols || []).map((c) => (c.label || "").toLowerCase());
      const fmt = (v) => {
        const m = typeof v === "string" && v.match(/^Date\((\d+),(\d+),(\d+)/);
        if (m) {
          const d = new Date(+m[1], +m[2], +m[3]);
          return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        }
        return v;
      };
      let rows = (data.table.rows || []).map((r) =>
      (r.c || []).map((c) => c && c.v != null ? (typeof c.v === "string" ? c.v.trim() : c.v) : ""));
      // No frozen header → gviz leaves labels blank and the header text lands
      // in row 0. Use that row as the header instead.
      if (!cols.some((l) => l)) {
        cols = (rows[0] || []).map((s) => String(s).toLowerCase());
        rows = rows.slice(1);
      }
      const at = (needle) => cols.findIndex((l) => l.includes(needle));
      const iDate = at("date"), iTitle = at("title"),
      iSpk = at("speaker"), iAff = at("affil"), iConf = at("confirm");
      const confirmed = rows.
      filter((c) => (c[iTitle] || c[iDate]) && /^y/i.test(String(c[iConf] || ""))).
      map((c) => ({ date: fmt(c[iDate]), title: c[iTitle], speaker: c[iSpk], venue: c[iAff] }));
      setEvents(confirmed);
    }).
    catch(() => setEvents([]));
  }, []);
  return events;
}

function SectionHead({ kicker, meta, cta, children }) {
  return (
    <div className="section-head reveal">
      <div className="label">
        <span className="eyebrow">{kicker}</span>
        {meta && <div className="meta">{meta}</div>}
      </div>
      <div className={cta ? "section-head-main with-cta" : "section-head-main"}>
        <h2>{children}</h2>
        {cta &&
        <div className={cta.center ? "section-head-cta centered" : "section-head-cta"}>
          <span className="cta-caption">{cta.caption}</span>
          {(() => {
            const pending = !cta.href || cta.href === "#";
            return (
              <a className={pending ? "btn btn-pending" : "btn"}
                 href={pending ? undefined : cta.href}
                 target={cta.external && !pending ? "_blank" : undefined}
                 rel={cta.external && !pending ? "noopener noreferrer" : undefined}
                 title={pending ? "Link coming soon" : undefined}>
                {cta.label} <span className="arrow">→</span>
              </a>);
          })()}
        </div>
        }
      </div>
    </div>);

}

function EditNote({ children }) {
  return null;
}

function Objectives() {
  return (
    <section className="section" id="mission">
      <div className="container">
        <SectionHead kicker="§ 01 — Mission" meta="">
          We are an <em> AI + X research group</em>, not a club — organized around original work, partnership, public exchange, and community.
        </SectionHead>
        <div className="objectives reveal">
          {OBJECTIVES.map((o) =>
          <article className="obj" key={o.n}>
              <span className="num">[{o.n}]</span>
              <h3>{o.h}</h3>
              <p>{o.p}</p>
              <span className="tag">{o.tag}</span>
            </article>
          )}
        </div>
      </div>
    </section>);

}

function Research() {
  return (
    <section className="section" id="research">
      <div className="container">
        <SectionHead kicker="§ 02 — Research" meta="14 projects · AY 25–26">
          Active investigations span <em>across disciplines</em> — from foundation model behavior to learned solvers for physical systems.
        </SectionHead>
        <div className="research reveal">
          {AREAS.map((a) =>
          <article key={a.id} className={`area ${a.size}`}>
              <div className="head">
                <span className="id">{a.id}</span>
                <span className="count">{a.count}</span>
              </div>
              <h3>{a.h}</h3>
              <p>{a.p}</p>
              {a.pull && <p className="pull">{a.pull}</p>}
              <div className="keywords">
                {a.kw.map((k) => <span className="kw" key={k}>{k}</span>)}
              </div>
            </article>
          )}
        </div>
        <EditNote>✎ Edit projects in app.jsx → AREAS[]</EditNote>
      </div>
    </section>);

}

function Publications() {
  return (
    <section className="section" id="publications">
      <div className="container">
        <SectionHead kicker="§ 02 — Publications" meta=""
          cta={{ caption: "Have a topic in mind?", label: "Submit project proposal", href: PROPOSAL_FORM_URL, external: true }}>
          What we've <em>published</em>.
        </SectionHead>
        <div className="pubs reveal">
          {PUBS.map((p, i) => {
            const hasLink = p.url && p.url !== "#";
            return (
            <a key={i} className={`pub ${hasLink ? "" : "nolink"}`}
               href={hasLink ? p.url : undefined}
               target={hasLink ? "_blank" : undefined}
               rel={hasLink ? "noopener noreferrer" : undefined}>
              <span className="year">{p.year}</span>
              <span className="title">
                {p.title}
                {p.tag && <span className={`pub-tag ${p.tag === "preprint" ? "preprint" : ""}`} style={{ borderColor: "rgb(255, 108, 12)" }}>{p.tag}</span>}
              </span>
              <span className="authors">{p.authors}</span>
              <span className="venue">{p.venue}</span>
              <span className="arrow">{hasLink ? "→" : ""}</span>
            </a>);
          })}
        </div>
        <EditNote>✎ Edit in app.jsx → PUBS[] · add each paper's link in the `url` field</EditNote>
      </div>
    </section>);

}

function CurrentResearch() {
  const projects = useSheetProjects();
  return (
    <section className="section" id="current-research">
      <div className="container">
        <SectionHead kicker="§ 03 — Current Research" meta=""
          cta={{ caption: "Interested in working on research with us?", label: "Project application form", href: PROJECT_APP_FORM_URL, external: true, center: true }}>
          Teams currently <em>in flight</em> — the work happening now.
        </SectionHead>
        {projects.length > 0 ?
        <div className="pubs reveal">
          {projects.map((p, i) =>
          <div key={i} className="pub nolink">
              <span className="year">{p.subjects || "—"}</span>
              <span className="title">
                {p.title}
                <span className="pub-tag" style={{ borderColor: "rgb(255, 108, 12)" }}>Active</span>
              </span>
              <span className="authors">{p.members ? `${p.members} members` : ""}</span>
              <span className="venue">{p.venue || ""}</span>
              <span className="arrow"></span>
            </div>
          )}
        </div> :
        <div className="list-empty reveal">More coming soon!</div>}
        <EditNote>✎ Auto-populated from the “Current Projects” Google Sheet · shows rows marked Active</EditNote>
      </div>
    </section>);

}

function Partners() {
  const items = [...PARTNERS_MARQUEE, ...PARTNERS_MARQUEE];
  return (
    <section className="section" id="partners" style={{ paddingTop: 0 }}>
      <div className="partners-bar" aria-hidden="true">
        <div className="marquee-track">
          {items.map((it, i) => {
            const isPh = it.startsWith("[");
            return (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 40 }}>
                {isPh ? <span className="ph">{it}</span> : <span>{it}</span>}
                <span className="sep"></span>
              </span>);

          })}
        </div>
      </div>
      <div className="container">
        <SectionHead kicker="§ 04 — Partners" meta="Caltech labs · industry · affiliated">
          Projects are scoped <em>with</em> faculty labs and research engineers — not in isolation.
        </SectionHead>
        <div className="partners-grid reveal">
          {PARTNERS.map((p, i) =>
          <div className={`partner ${p.placeholder ? "placeholder" : ""}`} key={i}>
              <span className="kind">{p.k}</span>
              <span className="name">{p.n}</span>
            </div>
          )}
        </div>
        <EditNote>✎ Edit partners in app.jsx → PARTNERS[] and PARTNERS_MARQUEE[]</EditNote>
      </div>
    </section>);

}

function Team() {
  return (
    <section className="section" id="team">
      <div className="container">
        <SectionHead kicker="§ 04 — Leadership 2025–26" meta="Hover any card for a bio">
          A <em>small team</em> keeps SPARC <span className="brand-labs">Labs</span> running. Membership rotates; everyone contributes to the research.
        </SectionHead>
        <div className="team reveal">
          {TEAM.map((m, i) =>
          <article key={i} className={`member ${m.size}`}>
              <div className="photo">
                <span className="ph-label">Photo · {m.photoId}</span>
                {m.mono}
              </div>
              <div className="meta-top">
                <span className="role">{m.role}</span>
                <span>{String(i + 1).padStart(2, "0")} / {String(TEAM.length).padStart(2, "0")}</span>
              </div>
              <div className="info">
                <h3>{m.name}</h3>
                <span className="school">{m.school}</span>
              </div>
              <div className="bio">
                <span className="focus">Focus · {m.focus}</span>
                <div className="name-line">{m.name}</div>
                {m.bio}
                <span className="email">{m.email}</span>
              </div>
            </article>
          )}
        </div>
        <EditNote>✎ Edit officers in app.jsx → TEAM[] · headshots replace the striped placeholder</EditNote>
      </div>
    </section>);

}

function Events() {
  const events = useSheetEvents();
  const list = events || [];
  return (
    <section className="section" id="events">
      <div className="container">
        <SectionHead kicker="§ 04 — Speaker Series" meta="">
          Bi-weekly talks. <em>Recent papers</em> and open problems.
        </SectionHead>
        {list.length > 0 ?
        <div className="events-list reveal">
          {list.map((e, i) =>
          <a key={i} className="event" href="#">
              <span className="date">{e.date}</span>
              <span className="title">{e.title}</span>
              <span className="speaker">{e.speaker}</span>
              <span className="venue">{e.venue}</span>
              <span className="arrow">→</span>
            </a>
          )}
        </div> :
        <div className="list-empty reveal">Schedule to be confirmed!</div>}
        <EditNote>✎ Auto-populated from the speaker-series Google Sheet · shows rows marked Confirmed</EditNote>
      </div>
    </section>);

}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container contact-inner">
        <h2 className="reveal">Curious? <em>Say hi.</em></h2>
        <div className="contact-sub reveal">
          <p>
            We're informal — there's no application and no deadline. If you're a
            Caltech undergrad who wants to join, or a researcher or lab who wants
            to collaborate, just <em>email us</em>. Either co-director is a
            good first point of contact.
          </p>
        </div>
        {POIS.length > 0 &&
        <div className="contact-pois reveal">
          {POIS.map((m, i) =>
          <a key={i} className="poi" href={`mailto:${m.email}`}>
              <span className="role">{m.role}</span>
              <span className="name">{m.name}</span>
              <span className="email">{m.email}</span>
              <span className="focus">Focus · {m.focus}</span>
            </a>
          )}
        </div>
        }
        <div className="contact-meta reveal">
          <div><span className="k">General</span><span className="v"><em>sparc@caltech.edu</em></span></div>
          <div><span className="k">Meets</span><span className="v">Weekly · Hameetman Center Club Rooms</span></div>
          <div><span className="k">Where</span><span className="v">California Institute of Technology · Pasadena</span></div>
        </div>
        {/* ✎ SOCIALS — set INSTAGRAM_URL / LINKEDIN_URL in the LINKS block up top */}
        <div className="contact-socials reveal">
          <span className="socials-label">Follow along</span>
          <div className="socials-row">
            {(() => {
              const igPending = !INSTAGRAM_URL || INSTAGRAM_URL === "#";
              const liPending = !LINKEDIN_URL || LINKEDIN_URL === "#";
              return (
                <>
                  <a className={igPending ? "social-link social-pending" : "social-link"}
                     href={igPending ? undefined : INSTAGRAM_URL}
                     target={igPending ? undefined : "_blank"}
                     rel={igPending ? undefined : "noopener noreferrer"}
                     title={igPending ? "Add INSTAGRAM_URL in app.jsx" : "Instagram"}>
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                    Instagram
                  </a>
                  <a className={liPending ? "social-link social-pending" : "social-link"}
                     href={liPending ? undefined : LINKEDIN_URL}
                     target={liPending ? undefined : "_blank"}
                     rel={liPending ? undefined : "noopener noreferrer"}
                     title={liPending ? "Add LINKEDIN_URL in app.jsx" : "LinkedIn"}>
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
                      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.35c0-1.28-.02-2.92-1.78-2.92-1.78 0-2.05 1.39-2.05 2.83V21H9z" />
                    </svg>
                    LinkedIn
                  </a>
                </>);
            })()}
          </div>
        </div>
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
            <a href="#mission">Mission</a>
            <a href="#publications">Publications</a>
            <a href="#current-research">Current research</a>
            <a href="Transparency.html">Transparency</a>
          </div>
          <div className="col">
            <h4>Engage</h4>
            <a href="#contact">Contact</a>
            <a href="#events">Speaker series</a>
            {(MAILING_LIST_URL && MAILING_LIST_URL !== "#") ?
            <a href={MAILING_LIST_URL} target="_blank" rel="noopener noreferrer">Mailing list</a> :
            <a href="mailto:sparc@caltech.edu?subject=Add%20me%20to%20the%20SPARC%20Labs%20mailing%20list">Mailing list</a>}
            <a href="#contact">For partners</a>
          </div>
          <div className="col">
            <h4>Reach</h4>
            <span>sparc@caltech.edu</span>
            <span>amehrotra@caltech.edu</span>
            <span>nbai@caltech.edu</span>
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

/* ═════════════════════════════════════════════════════════════════════
   APP  +  Tweaks (fonts / colors / mode)
   ═════════════════════════════════════════════════════════════════════ */

const FONTS = [
{ value: "plex", label: "Plex" },
{ value: "geist", label: "Geist" },
{ value: "hanken", label: "Hanken" },
{ value: "space", label: "Space" },
{ value: "bricolage", label: "Bricolage" }];


const ACCENTS = [
"#ff6c0c", // Caltech orange (default)
"#f5a623", // amber
"#ff3b30", // red
"#ff4d8d", // pink
"#7c5cff", // violet
"#2f6bff", // blue
"#00b4d8", // cyan
"#00c46a" // green
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mode": "dark",
  "font": "plex",
  "accent": "#ff6c0c"
} /*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useReveal();

  useEffect(() => {
    document.documentElement.dataset.mode = t.mode;
    document.documentElement.dataset.font = t.font;
    document.documentElement.style.setProperty("--accent", t.accent);
    document.documentElement.style.setProperty("--accent-ink", isLight(t.accent) ? "#0a0f1f" : "#f3eee0");
  }, [t.mode, t.font, t.accent]);

  const bg = t.mode === "light" ? "#f3eee0" : "#0a0f1f";
  const fg = t.mode === "light" ? "#14110b" : "#eaf0fb";

  return (
    <>
      <TopBar />
      <Hero accent={t.accent} bg={bg} fg={fg} />
      <Objectives />
      <Publications />
      <CurrentResearch />
      <Events />
      <Contact />
      <Footer />

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
  const r = i >> 16 & 255,g = i >> 8 & 255,b = i & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
