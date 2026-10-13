/* Shared content for every portfolio version. Edit here once. */
window.CONFIG = {
  name: "Lê Thành Công",
  role: "Backend developer · Node.js & TypeScript",
  avatar: "avatar.jpg",
  city: "Vietnam",
  timeZone: "Asia/Ho_Chi_Minh",
  status: "Open to fresher / junior roles",
  intro: "Final-year IT student and backend-leaning developer working in Node.js and TypeScript. I ship small products in public, one at a time, and care about things people actually use.",
  email: "congthanh160105@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/gautrangg" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/c%C3%B4ng-l%C3%AA-14580129a/" }
  ],
  // status: "live" | "building" | "reserved"
  projects: [
    { title: "Product 01", desc: "In development. Shipping in public, follow the build log.", stack: ["Node.js", "TypeScript", "PostgreSQL"], status: "building", year: "2026", href: "" },
    { title: "Next product", desc: "This slot is waiting for a real product with real users.", stack: [], status: "reserved", year: "—", href: "" },
    { title: "Next product", desc: "This slot is waiting for a real product with real users.", stack: [], status: "reserved", year: "—", href: "" }
  ],
  experience: [
    {
      when: "Jan 2026 — May 2026",
      role: "Node.js Intern",
      org: "MindX",
      points: [
        "Supported a production Node.js system, tracing user issues through the business flow end to end.",
        "Learned the company's core architecture: services, data flow and how incidents are handled in production.",
        "Worked with the engineering team on helpdesk tickets and reproduced bugs for developers."
      ]
    }
  ],
  stack: [
    { group: "Backend", items: ["Node.js", "TypeScript", "Express", "REST APIs", "JWT"] },
    { group: "Data", items: ["PostgreSQL", "SQL Server", "Database design"] },
    { group: "Also", items: ["C# / .NET", "Git", "Docker basics", "AI-assisted workflow"] }
  ],
  offKeyboard: "Gym and martial arts most days of the week. Same approach to code: small reps, every day.",
  log: [
    { hash: "a1f3c9e", date: "2026-10-13", msg: "init: portfolio shell, slots reserved for real products" }
  ]
};

/* Small helpers shared by every version */
window.PF = {
  esc: (s) => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])),
  initials: (n) => { const p = n.split(/\s+/).filter(Boolean); return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : "")).toUpperCase(); },
  stateLabel: { live: "Live", building: "Building", reserved: "Open slot" },
  clock: (el, tz) => {
    const tick = () => { try { el.textContent = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(new Date()); } catch (e) {} };
    tick(); setInterval(tick, 20000);
  },
  copy: (btn, text, label) => {
    btn.addEventListener("click", () => {
      const done = () => { btn.textContent = "Copied"; setTimeout(() => btn.textContent = label, 1600); };
      try { navigator.clipboard.writeText(text).then(done, () => btn.textContent = "Select and copy"); } catch (e) { btn.textContent = "Select and copy"; }
    });
  },
  theme: (btn, key) => {
    const root = document.documentElement;
    const cur = () => root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const sync = () => { btn.textContent = cur() === "dark" ? "Light" : "Dark"; btn.setAttribute("aria-label", "Switch to " + btn.textContent.toLowerCase() + " theme"); };
    try { const s = localStorage.getItem(key); if (s) root.dataset.theme = s; } catch (e) {}
    sync();
    btn.addEventListener("click", () => {
      root.dataset.theme = cur() === "dark" ? "light" : "dark";
      try { localStorage.setItem(key, root.dataset.theme); } catch (e) {}
      sync();
    });
  }
};
