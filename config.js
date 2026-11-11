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
      // Optional richer diagram for flow-graph.js; `flow` above stays for the simpler templates.
      graph: {
        nodes: [
          { id: "users", label: "Users", icon: "user", col: 0, row: 0 },
          { id: "ingress", label: "Nginx Ingress", sub: "TLS", icon: "route", col: 1, row: 0 },
          { id: "web", label: "React", sub: "Vite", icon: "browser", col: 2, row: 0 },
          { id: "api", label: "Express API", sub: "TypeScript", icon: "server", col: 2, row: 1 },
          { id: "insights", label: "App Insights", sub: "4 alerts", icon: "chart", col: 3, row: 0 },
          { id: "oidc", label: "MindX OIDC", sub: "sign-in", icon: "shield", col: 3, row: 1 }
        ],
        edges: [
          { from: "users", to: "ingress", label: "HTTPS" },
          { from: "ingress", to: "web", label: "/" },
          { from: "ingress", to: "api", label: "/api" },
          { from: "web", to: "insights", dashed: true },
          { from: "api", to: "oidc", dashed: true, twoWay: true, label: "OIDC" }
        ]
      },
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
      graph: {
        nodes: [
          { id: "cfg", label: "config.js", sub: "all content", icon: "file", col: 0, row: 0 },
          { id: "site", label: "Static site", sub: "HTML · CSS · JS", icon: "code", col: 1, row: 0 },
          { id: "pages", label: "GitHub Pages", sub: "gautrangg.github.io", icon: "globe", col: 2, row: 0 }
        ],
        edges: [
          { from: "cfg", to: "site", label: "render" },
          { from: "site", to: "pages", label: "git push" }
        ]
      },
      highlights: [
        "Designed and built from scratch with no framework: responsive layout, light and dark themes, a sticky profile column and an English/Vietnamese switch.",
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

/* Vietnamese translation. Same shape as CONFIG; only list what changes. Arrays merge by position,
   so to skip an item use an empty object {} in its place. */
window.CONFIG_VI = {
  role: "Lập trình viên backend · Node.js & TypeScript",
  city: "Việt Nam",
  status: "Đang tìm vị trí fresher / junior",
  intro: "Sinh viên CNTT năm cuối, thiên về backend, làm việc với Node.js và TypeScript. Tôi làm từng sản phẩm nhỏ, công khai quá trình, và quan tâm đến những thứ người dùng thật sự dùng.",
  projects: [
    {
      title: "Ứng dụng full-stack trên Azure Kubernetes",
      context: "Dự án thực tập tại MindX",
      summary: "Ứng dụng React và Express được đưa từ môi trường local lên production trên Azure, có đăng nhập thật và giám sát.",
      flow: ["Người dùng"],
      graph: {
        nodes: [
          { label: "Người dùng" },
          {},
          {},
          {},
          { sub: "4 cảnh báo" },
          { sub: "đăng nhập" }
        ]
      },
      highlights: [
        "Xây dựng frontend React + Vite và API Express + TypeScript, đăng nhập qua nhà cung cấp định danh OpenID Connect của MindX.",
        "Đóng gói cả hai service bằng Docker và triển khai lên Azure Kubernetes Service phía sau Nginx Ingress, HTTPS từ Let's Encrypt.",
        "Thêm giám sát production: Azure Application Insights cho cả frontend lẫn backend, sự kiện Google Analytics 4 và 4 quy tắc cảnh báo."
      ],
      links: [{ label: "Mã nguồn trên GitHub" }]
    },
    {
      title: "Portfolio này",
      context: "Dự án cá nhân",
      summary: "Trang cá nhân viết tay, không dùng framework. Toàn bộ nội dung nằm trong một file config, nên thêm một dự án chỉ cần sửa đúng một chỗ.",
      graph: {
        nodes: [
          { sub: "toàn bộ nội dung" },
          { label: "Trang tĩnh" },
          {}
        ]
      },
      highlights: [
        "Tự thiết kế và xây dựng từ đầu, không framework: bố cục responsive, giao diện sáng/tối, cột hồ sơ cố định khi cuộn và chuyển đổi Việt/Anh.",
        "Nội dung tách khỏi bố cục trong một file config duy nhất, dùng chung cho cả ba template khác.",
        "Triển khai trên GitHub Pages, có ảnh xem trước khi chia sẻ link lên LinkedIn, Facebook và Zalo."
      ],
      links: [{ label: "Trang đang chạy" }, { label: "Mã nguồn trên GitHub" }]
    }
  ],
  experience: [
    {
      when: "01/2026 — 05/2026",
      role: "Thực tập sinh Node.js",
      points: [
        "Hỗ trợ một hệ thống Node.js đang chạy production, truy vết sự cố của người dùng xuyên suốt luồng nghiệp vụ.",
        "Tìm hiểu kiến trúc cốt lõi của công ty: các service, luồng dữ liệu và cách xử lý sự cố trên production.",
        "Phối hợp với đội kỹ thuật xử lý ticket helpdesk và tái hiện lỗi cho developer."
      ]
    }
  ],
  stack: [{}, {}, { group: "Khác" }],
  offKeyboard: "Tập gym và võ gần như mỗi ngày trong tuần. Viết code cũng vậy: tập từng chút, đều đặn mỗi ngày."
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
  // `label` may be a string or a function returning { label, done, fail } (for translated UIs).
  copy: (btn, text, label) => {
    const L = () => typeof label === "function" ? label() : { label, done: "Copied", fail: "Select and copy" };
    btn.addEventListener("click", () => {
      const done = () => { btn.textContent = L().done; setTimeout(() => btn.textContent = L().label, 1600); };
      try { navigator.clipboard.writeText(text).then(done, () => btn.textContent = L().fail); } catch (e) { btn.textContent = L().fail; }
    });
  },
  // `labels` (optional) returns { light, dark, aria(name) }. Returns sync() so the caller can relabel after a language switch.
  theme: (btn, key, labels) => {
    const root = document.documentElement;
    const L = () => labels ? labels() : { light: "Light", dark: "Dark", aria: (n) => "Switch to " + n.toLowerCase() + " theme" };
    const cur = () => root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const sync = () => { const l = L(); btn.textContent = cur() === "dark" ? l.light : l.dark; btn.setAttribute("aria-label", l.aria(btn.textContent)); };
    try { const s = localStorage.getItem(key); if (s) root.dataset.theme = s; } catch (e) {}
    sync();
    btn.addEventListener("click", () => {
      root.dataset.theme = cur() === "dark" ? "light" : "dark";
      try { localStorage.setItem(key, root.dataset.theme); } catch (e) {}
      sync();
    });
    return sync;
  },
  // Deep-merge a translation over the base content: objects by key, arrays by index, anything else replaced.
  localize: (base, over) => {
    if (over === undefined) return base;
    if (Array.isArray(base)) return base.map((b, i) => PF.localize(b, Array.isArray(over) ? over[i] : undefined));
    if (base && typeof base === "object") {
      const out = {};
      for (const k in base) out[k] = PF.localize(base[k], over && over[k]);
      return out;
    }
    return over;
  }
};
