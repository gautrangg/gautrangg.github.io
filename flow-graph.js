/* Node-canvas diagram for a project's architecture, in the style of workflow editors.
   Input: project.graph = { nodes: [{ id, label, sub, icon, col, row }], edges: [{ from, to, label, dashed, twoWay, step }] }
   or the simpler project.flow = ["A", "B · detail", { label, sub, icon }] which becomes a straight line. */
window.FlowGraph = (() => {
  const NS = "http://www.w3.org/2000/svg";
  const TILE = 26;      // half the icon tile
  const BELOW = 44;     // tile bottom → under the label, where vertical wires leave
  const SLOT = 1.0, MOVE = 0.8, PAUSE = 1.2; // seconds

  const ICONS = {
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>',
    browser: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M6 6.5h.01M8.5 6.5h.01"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    server: '<rect x="4" y="4" width="16" height="7" rx="2"/><rect x="4" y="13" width="16" height="7" rx="2"/><path d="M8 7.5h.01M8 16.5h.01"/>',
    db: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3 3 7 3s7-1.3 7-3"/>',
    cloud: '<path d="M7 18h10a4 4 0 0 0 .5-8 6 6 0 0 0-11.5 1.5A3.5 3.5 0 0 0 7 18z"/>',
    code: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5"/>',
    file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/>',
    route: '<path d="M3 12h6M9 12l5-6h7M9 12l5 6h7"/>',
    chart: '<path d="M4 20V11M10 20V5M16 20v-6M3 20h18"/>'
  };

  const node = (f, i) => {
    const o = typeof f === "string" ? { label: f } : { ...f };
    const cut = o.label.indexOf(" · ");
    if (!o.sub && cut > 0) [o.label, o.sub] = [o.label.slice(0, cut), o.label.slice(cut + 3)];
    return { id: "n" + i, col: i, row: 0, ...o };
  };

  function normalize(p) {
    if (p.graph) return p.graph;
    const nodes = p.flow.map(node);
    return { nodes, edges: nodes.slice(1).map((n, i) => ({ from: nodes[i].id, to: n.id })) };
  }

  // Each edge gets a time window: by default the BFS depth of its source.
  function schedule(g) {
    const depth = {}, incoming = new Set(g.edges.map(e => e.to));
    const queue = g.nodes.filter(n => !incoming.has(n.id)).map(n => (depth[n.id] = 0, n.id));
    while (queue.length) {
      const id = queue.shift();
      g.edges.filter(e => e.from === id && depth[e.to] === undefined).forEach(e => { depth[e.to] = depth[id] + 1; queue.push(e.to); });
    }
    let end = 0;
    const wins = g.edges.map(e => {
      const s = (e.step ?? depth[e.from] ?? 0) * SLOT, t = s + MOVE * (e.twoWay ? 1.6 : 1);
      end = Math.max(end, t);
      return [s, t];
    });
    return { wins, period: end + PAUSE, roots: g.nodes.filter(n => !incoming.has(n.id)).map(n => n.id) };
  }

  function ports(a, b, vertical) {
    const across = (p, q) => {
      const d = q.row > p.row ? 1 : -1;
      return [{ x: p.x + TILE * d, y: p.y, dx: d, dy: 0 }, { x: q.x - TILE * d, y: q.y, dx: -d, dy: 0 }];
    };
    const down = (p, q, d) => [
      { x: p.x, y: d > 0 ? p.y + TILE + BELOW : p.y - TILE, dx: 0, dy: d },
      { x: q.x, y: d > 0 ? q.y - TILE : q.y + TILE + BELOW, dx: 0, dy: -d }
    ];
    const along = (p, q) => {
      const d = q.col > p.col ? 1 : -1;
      return [{ x: p.x + TILE * d, y: p.y, dx: d, dy: 0 }, { x: q.x - TILE * d, y: q.y, dx: -d, dy: 0 }];
    };
    if (a.col !== b.col) return vertical ? down(a, b, b.col > a.col ? 1 : -1) : along(a, b);
    return vertical ? across(a, b) : down(a, b, b.row > a.row ? 1 : -1);
  }

  // Returns a cleanup function: call it before removing or re-rendering `el`.
  function mount(el, project, opts = {}) {
    const g = normalize(project);
    const plan = schedule(g);
    const byId = Object.fromEntries(g.nodes.map(n => [n.id, n]));
    const cols = Math.max(...g.nodes.map(n => n.col)) + 1;
    const rows = Math.max(...g.nodes.map(n => n.row)) + 1;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    el.classList.add("fg");
    el.setAttribute("role", "img");
    el.setAttribute("aria-label", (opts.aria || "Architecture") + ": " + g.edges.map(e => byId[e.from].label + (e.twoWay ? " ↔ " : " → ") + byId[e.to].label).join(", "));

    const nodeEls = {};
    g.nodes.forEach(n => {
      const d = document.createElement("div");
      d.className = "fg-node";
      d.setAttribute("aria-hidden", "true");
      const icon = ICONS[n.icon]
        ? '<svg viewBox="0 0 24 24">' + ICONS[n.icon] + "</svg>"
        : '<b>' + PF.esc(n.label.slice(0, 2)) + "</b>";
      d.innerHTML = '<div class="fg-tile">' + icon + '</div><div class="fg-label">' + PF.esc(n.label) + "</div>" +
        (n.sub ? '<div class="fg-sub">' + PF.esc(n.sub) + "</div>" : "");
      el.appendChild(d);
      nodeEls[n.id] = d;
    });

    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("class", "fg-wires");
    svg.setAttribute("aria-hidden", "true");
    el.appendChild(svg);
    let wires = [];

    function layout() {
      const w = el.clientWidth;
      const vertical = w / cols < 118;
      const cell = 150;
      const lanes = vertical ? rows : cols;
      g.nodes.forEach(n => {
        const lane = vertical ? n.row : n.col, depth = vertical ? n.col : n.row;
        n.x = (w / lanes) * (lane + 0.5);
        n.y = 24 + TILE + depth * cell;
        Object.assign(nodeEls[n.id].style, { left: n.x + "px", top: n.y + "px" });
      });
      el.style.height = 24 + 2 * TILE + BELOW + ((vertical ? cols : rows) - 1) * cell + 18 + "px";

      svg.innerHTML = "";
      wires = g.edges.map((e, i) => {
        const [p, q] = ports(byId[e.from], byId[e.to], vertical);
        const k = Math.max(24, Math.hypot(q.x - p.x, q.y - p.y) * 0.45);
        const path = document.createElementNS(NS, "path");
        path.setAttribute("d", `M${p.x} ${p.y} C${p.x + p.dx * k} ${p.y + p.dy * k} ${q.x + q.dx * k} ${q.y + q.dy * k} ${q.x} ${q.y}`);
        path.setAttribute("class", "fg-wire" + (e.dashed ? " dashed" : ""));
        svg.appendChild(path);
        const len = path.getTotalLength();
        if (e.label) {
          // Above a horizontal wire, beside a vertical one.
          const mid = path.getPointAtLength(len / 2), t = document.createElementNS(NS, "text");
          const upright = p.dy !== 0;
          t.setAttribute("x", upright ? mid.x + 8 : mid.x);
          t.setAttribute("y", upright ? mid.y + 4 : mid.y - 7);
          t.setAttribute("class", "fg-elabel" + (upright ? " side" : ""));
          t.textContent = e.label;
          svg.appendChild(t);
        }
        [p, q].forEach(pt => {
          const c = document.createElementNS(NS, "circle");
          c.setAttribute("cx", pt.x); c.setAttribute("cy", pt.y); c.setAttribute("r", 3.5);
          c.setAttribute("class", "fg-port");
          svg.appendChild(c);
        });
        const dot = document.createElementNS(NS, "circle");
        dot.setAttribute("r", 3.5);
        dot.setAttribute("class", "fg-dot");
        dot.style.opacity = 0;
        svg.appendChild(dot);
        return { e, path, len, dot, win: plan.wins[i] };
      });
    }

    const ease = f => 0.5 - Math.cos(Math.PI * f) / 2;
    const t0 = performance.now();
    let raf = 0;
    function frame(now) {
      const t = ((now - t0) / 1000) % plan.period;
      const lit = new Set(t < 0.4 ? plan.roots : []);
      wires.forEach(({ e, path, len, dot, win: [s, end] }) => {
        if (t >= end && t < end + 0.45) lit.add(e.twoWay ? e.from : e.to);
        if (t < s || t > end) { dot.style.opacity = 0; return; }
        let f = (t - s) / (end - s);
        if (e.twoWay) { if (f > 0.45 && f < 0.6) lit.add(e.to); f = f < 0.5 ? f * 2 : (1 - f) * 2; }
        const pt = path.getPointAtLength(ease(f) * len);
        dot.setAttribute("cx", pt.x); dot.setAttribute("cy", pt.y);
        dot.style.opacity = 1;
      });
      for (const id in nodeEls) nodeEls[id].classList.toggle("on", lit.has(id));
      raf = requestAnimationFrame(frame);
    }

    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(el);
    let io = null;
    if (!reduce) {
      io = new IntersectionObserver(([en]) => {
        cancelAnimationFrame(raf);
        if (en.isIntersecting) raf = requestAnimationFrame(frame);
      });
      io.observe(el);
    }
    return () => { ro.disconnect(); if (io) io.disconnect(); cancelAnimationFrame(raf); };
  }

  return { mount };
})();
