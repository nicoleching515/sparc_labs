/* global React */
/* ╔══════════════════════════════════════════════════════════════════╗
   ║  SHARED DATA — used by the homepage (app.jsx) AND the full-list   ║
   ║  archive pages (archive.jsx). Edit publications here; the         ║
   ║  homepage shows the first 5 and the archive page shows them all.  ║
   ╚══════════════════════════════════════════════════════════════════╝ */

const { useState, useEffect } = React;

/* How many rows each section shows on the homepage before "View all". */
const HOME_LIMIT = 5;

/* ─── ✎ PUBLICATIONS ────────────────────────────────────────────────────
   ✎ LINK: set `url` to the paper / arXiv / PDF page for each entry.
      Leave it as "#" to keep the row as a non-clickable placeholder.
   Newest first — the homepage shows the top 5.                          */
const PUBS = [
{ year: "2026", title: <>BEACON: Belief-Aware Replanning for Safe Online Motion Planning</>, authors: "Ishita Banerjee, Maggie Yufei Bai, Soptorshi Ghosh, Rhea Senan, Ayushi Mehrotra", venue: "IEEE ICRA 2026 Workshop Xplore", tag: "ICRA Workshop Poster", url: "https://openreview.net/forum?id=zxinuYvMp2" /* ✓ paper link */ },
{ year: "2026", title: <>Count Me If You Can: Geometric Failure Modes in Language Model Counting</>, authors: "Nicholas Bai, Ayushi Mehrotra", venue: "ICML 2026 Workshop CompLearn", tag: "ICML Workshop Poster", url: "https://openreview.net/forum?id=8PAXj6x6zn" /* ✓ paper link */ },
{ year: "2026", title: <>Sparse Autoencoders Find Causal, Lineage-Specific Context Features in Chromatin Foundation Models</>, authors: "Nicole Ching, Ayushi Mehrotra", venue: "ICML 2026 Workshop CompLearn and Mech Interp", tag: "ICML Workshop Poster", url: "#" /* ✎ paste paper link here */ },
{ year: "2026", title: <>What Does a Chromatin Foundation Model Know About a Petri Dish? Sparse Autoencoders Reveal In Vitro vs. In Vivo Context in EPIBERT</>, authors: "Nicole Ching, Ayushi Mehrotra", venue: "ICML 2026 Workshop GenBio", tag: "ICML Workshop Poster", url: "#" /* ✎ paste paper link here */ },
{ year: "2026", title: <>Auditing a Multi-Modal Chromatin Foundation Model with Sparse Autoencoders</>, authors: "Nicole Ching, Ayushi Mehrotra", venue: "ICML 2026 Workshop FM4LS", tag: "ICML Workshop Poster", url: "#" /* ✎ paste paper link here */ }];


/* ─── ✎ SPEAKER SERIES — auto-populated from a Google Sheet ─────────────
   Shows only rows whose "Confirmed?" column says Yes. Columns used:
   Date · Title · Speaker · Affiliation · Confirmed?                    */
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
      (r.c || []).map((c) => c && c.v != null ? typeof c.v === "string" ? c.v.trim() : c.v : ""));
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

/* ─── Row renderers, shared so the homepage and archive look identical ── */

function PubRow({ p }) {
  const hasLink = p.url && p.url !== "#";
  return (
    <a className={`pub ${hasLink ? "" : "nolink"}`}
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

}

function EventRow({ e }) {
  return (
    <a className="event" href="#">
      <span className="date">{e.date}</span>
      <span className="title">{e.title}</span>
      <span className="speaker">{e.speaker}</span>
      <span className="venue">{e.venue}</span>
      <span className="arrow">→</span>
    </a>);

}

Object.assign(window, { PUBS, HOME_LIMIT, EVENTS_SHEET_ID, useSheetEvents, PubRow, EventRow });
