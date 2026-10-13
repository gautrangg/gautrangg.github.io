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
  // status: "live" | "done" | "building"
  projects: [
    {
      title: "Full-stack app on Azure Kubernetes",
      context: "MindX internship project",
      year: "2025 — 2026",
      status: "done",
      summary: "A React and Express application taken from local setup to a production deployment on Azure, with real sign-in and monitoring.",
      flow: ["Users", "HTTPS · cert-manager", "Nginx Ingress", "React / Express API", "OpenID Connect"],
      highlights: [
        "Built a React + Vite frontend and an Express + TypeScript API, with sign-in through the MindX OpenID Connect identity provider.",
        "Containerised both services with Docker and deployed them to Azure Kubernetes Service behind an Nginx Ingress, with HTTPS from Let's Encrypt.",
        "Added production monitoring: Azure Application Insights on frontend and backend, Google Analytics 4 events, and 4 alert rules."
      ],
      stack: ["TypeScript", "React", "Express", "Docker", "Kubernetes (AKS)", "OpenID Connect", "App Insights"],
      links: [{ label: "Source on GitHub", href: "https://github.com/gautrangg/fullstack-mindx" }]
    },
    {
      title: "This portfolio",
      context: "Personal project",
      year: "2026",
      status: "live",
      summary: "A hand-built, framework-free personal site. All content lives in one config file, so adding a project is a one-line change.",
      flow: ["config.js", "Static HTML · CSS · JS", "GitHub Pages"],
      highlights: [
        "Designed and built from scratch with no framework: responsive layout, light and dark themes, and a sticky profile column.",
        "Content is separated from layout in a single config file, which also powers three alternative templates.",
        "Deployed on GitHub Pages with link previews for LinkedIn, Facebook and Zalo."
      ],
      stack: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
      links: [
        { label: "Live site", href: "https://gautrangg.github.io" },
        { label: "Source on GitHub", href: "https://github.com/gautrangg/gautrangg.github.io" }
      ]
    }
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
    { group: "Backend", items: ["Node.js", "TypeScript", "Express", "REST APIs", "OpenID Connect / JWT"] },
    { group: "Cloud & DevOps", items: ["Docker", "Kubernetes (AKS)", "Azure", "Nginx Ingress", "Git"] },
    { group: "Also", items: ["React", "PostgreSQL", "SQL Server", "C# / .NET"] }
  ],
  offKeyboard: "Gym and martial arts most days of the week. Same approach to code: small reps, every day."
};

/* Small helpers shared by every version */
window.PF = {
  esc: (s) => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])),
  initials: (n) => { const p = n.split(/\s+/).filter(Boolean); return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : "")).toUpperCase(); },
  stateLabel: { live: "Live", done: "Completed", building: "Building", reserved: "Open slot" },
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
