/* global React */
// HeroCanvas — particle field representing latent space.
// 2000 particles flowing through a curl-noise vector field.
// Mouse acts as an attractor that reveals structure.
// Trail accumulation gives "long exposure" feel.

const { useEffect, useRef } = React;

function HeroCanvas({ accent = "#ff5b2e", bg = "#0c0b09", fg = "#f1ebda" }) {
  const ref = useRef(null);
  const mouse = useRef({ x: 0.65, y: 0.5, active: false, px: 0.65, py: 0.5 });
  const raf = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    let w = 0, h = 0;
    const resize = () => {
      const r = canvas.parentElement.getBoundingClientRect();
      w = Math.max(100, r.width); h = Math.max(100, r.height);
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Paint base
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.current.x = (e.clientX - r.left) / r.width;
      mouse.current.y = (e.clientY - r.top) / r.height;
      mouse.current.active = true;
    };
    const onLeave = () => { mouse.current.active = false; };
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);

    // ----- Particles -----
    const N = 2200;
    const px = new Float32Array(N);
    const py = new Float32Array(N);
    const vx = new Float32Array(N);
    const vy = new Float32Array(N);
    const life = new Float32Array(N);
    const seed = new Float32Array(N);

    const respawn = (i, fresh = false) => {
      // Spawn either anywhere, or biased toward "latent attractors"
      const r = Math.random();
      if (r < 0.55) {
        // anywhere
        px[i] = Math.random();
        py[i] = Math.random();
      } else if (r < 0.78) {
        // cluster a
        const a = Math.random() * Math.PI * 2;
        const rr = Math.random() * 0.12;
        px[i] = 0.30 + Math.cos(a) * rr;
        py[i] = 0.45 + Math.sin(a) * rr;
      } else {
        // cluster b
        const a = Math.random() * Math.PI * 2;
        const rr = Math.random() * 0.16;
        px[i] = 0.72 + Math.cos(a) * rr;
        py[i] = 0.58 + Math.sin(a) * rr;
      }
      vx[i] = 0;
      vy[i] = 0;
      life[i] = fresh ? Math.random() * 320 : 180 + Math.random() * 240;
      seed[i] = Math.random();
    };
    for (let i = 0; i < N; i++) respawn(i, true);

    // ----- Curl-noise-ish flow field via sin/cos lattice -----
    // Cheap deterministic field; works fine for visual flow.
    const flow = (x, y, t) => {
      const s1 = Math.sin(x * 2.3 + t * 0.18) + Math.cos(y * 3.1 - t * 0.12);
      const s2 = Math.cos(x * 1.7 - t * 0.14) + Math.sin(y * 2.5 + t * 0.10);
      // pseudo-curl
      const ang = (s1 + s2) * 0.9 + Math.sin((x + y) * 1.2 + t * 0.05) * 0.6;
      return ang;
    };

    let t0 = performance.now();
    let frame = 0;

    // Pre-parsed colors
    const accRgb = hexToRgb(accent);
    const fgRgb = hexToRgb(fg);
    const bgRgb = hexToRgb(bg);

    const draw = (now) => {
      const t = (now - t0) / 1000;
      frame++;

      // Smooth mouse
      mouse.current.px += (mouse.current.x - mouse.current.px) * 0.08;
      mouse.current.py += (mouse.current.y - mouse.current.py) * 0.08;
      const mx = mouse.current.px;
      const my = mouse.current.py;
      const mActive = mouse.current.active;

      // Fade prev frame (trail effect)
      ctx.fillStyle = `rgba(${bgRgb[0]},${bgRgb[1]},${bgRgb[2]},0.075)`;
      ctx.fillRect(0, 0, w, h);

      // Aspect ratio so x/y space is roughly square
      const aspect = w / h;

      for (let i = 0; i < N; i++) {
        // Flow field
        const fx = px[i] * 5.0 * aspect;
        const fy = py[i] * 5.0;
        const ang = flow(fx, fy, t);

        const speed = 0.0014 + seed[i] * 0.0008;
        let dvx = Math.cos(ang) * speed;
        let dvy = Math.sin(ang) * speed;

        // Mouse interaction — attract within radius
        const ddx = mx - px[i];
        const ddy = my - py[i];
        const dist = Math.sqrt(ddx * ddx + ddy * ddy);
        let nearAmt = 0;
        if (mActive && dist < 0.32) {
          nearAmt = 1 - dist / 0.32;
          const pull = nearAmt * 0.0032;
          dvx += (ddx / (dist + 0.001)) * pull;
          dvy += (ddy / (dist + 0.001)) * pull;
        }

        // Damping
        vx[i] = vx[i] * 0.92 + dvx;
        vy[i] = vy[i] * 0.92 + dvy;

        px[i] += vx[i];
        py[i] += vy[i];

        life[i] -= 1;

        // Out of bounds or dead -> respawn
        if (px[i] < -0.05 || px[i] > 1.05 || py[i] < -0.05 || py[i] > 1.05 || life[i] < 0) {
          respawn(i);
          continue;
        }

        // Color based on velocity + mouse proximity
        const v = Math.min(1, Math.sqrt(vx[i] * vx[i] + vy[i] * vy[i]) * 240);
        const heat = Math.min(1, nearAmt * 1.3 + v * 0.35 + seed[i] * 0.15);
        const r = Math.round(fgRgb[0] + (accRgb[0] - fgRgb[0]) * heat);
        const g = Math.round(fgRgb[1] + (accRgb[1] - fgRgb[1]) * heat);
        const b = Math.round(fgRgb[2] + (accRgb[2] - fgRgb[2]) * heat);
        const alpha = 0.22 + heat * 0.5 + (life[i] < 60 ? life[i] / 200 : 0.25);
        const size = 0.6 + heat * 1.6 + nearAmt * 1.2;

        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(0.9, alpha)})`;
        ctx.fillRect(px[i] * w - size * 0.5, py[i] * h - size * 0.5, size, size);
      }

      // Occasional accent flash at mouse
      if (mActive) {
        const grd = ctx.createRadialGradient(mx * w, my * h, 0, mx * w, my * h, 220);
        grd.addColorStop(0, `rgba(${accRgb[0]},${accRgb[1]},${accRgb[2]},0.14)`);
        grd.addColorStop(1, `rgba(${accRgb[0]},${accRgb[1]},${accRgb[2]},0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(mx * w, my * h, 220, 0, Math.PI * 2);
        ctx.fill();
      }

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [accent, bg, fg]);

  return <canvas ref={ref} />;
}

function hexToRgb(hex) {
  const m = hex.replace("#", "");
  const n = m.length === 3 ? m.split("").map(c => c + c).join("") : m;
  const i = parseInt(n, 16);
  return [(i >> 16) & 255, (i >> 8) & 255, i & 255];
}

window.HeroCanvas = HeroCanvas;
