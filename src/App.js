import { useState, useEffect, useRef } from "react";

/* ── GOOGLE FONTS ── */
const FontLink = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=JetBrains+Mono:wght@300;400;600&family=Outfit:wght@300;400;600;800&display=swap');`}</style>
);

/* ── DATA ── */
const TYPED_ROLES = [
  "Java Full Stack Developer",
  "Spring Boot Architect",
  "React.js Engineer",
  "Microservices Builder",
  "GenAI Explorer",
];

const NAV = ["INIT", "EXPERIENCE", "SKILLS", "GEN_AI", "AWARDS", "CONTACT"];

const EXPERIENCE = [
  {
    id: "EY",
    company: "Ernst & Young",
    role: "Full-Stack Engineer",
    client: "Client: American Express · GCF",
    period: "03/2025 – Present",
    status: "ACTIVE",
    color: "#00ffe7",
    glyph: "◈",
    impact: [
      { val: "45d → 3h", desc: "Onboarding Time" },
      { val: "80%+", desc: "Backend Coverage" },
      { val: "100%", desc: "Frontend Coverage" },
      { val: "3×", desc: "MVP Awards" },
    ],
    bullets: [
      "Designed FaaS-based onboarding platform for enterprise credit cards — KYC, hierarchical accounts, BCA generation",
      "CompletableFuture + Executors async processing slashed onboarding from 45 days to 3 hours",
      "Built RAG-based GenAI POC using embeddings & vector search for internal compliance knowledge retrieval",
      "Production observability via Splunk, Jaeger, ELF — significantly reduced MTTR",
      "80%+ backend (JUnit/Mockito) + 100% frontend (Jest/RTL) test coverage maintained",
    ],
    stack: ["Java", "Spring Boot", "React.js", "PostgreSQL", "Jenkins", "Splunk", "Jaeger", "RAG", "Docker"],
  },
  {
    id: "LTIM",
    company: "LTIMindtree",
    role: "Full-Stack Engineer",
    client: "Enterprise Platform Engineering",
    period: "11/2021 – 03/2025",
    status: "COMPLETED",
    color: "#bf80ff",
    glyph: "◇",
    impact: [
      { val: "40%", desc: "Access Efficiency" },
      { val: "50%", desc: "Faster Project Init" },
      { val: "45%", desc: "Response Time" },
      { val: "30%", desc: "Msg Routing" },
    ],
    bullets: [
      "Implemented RBAC with Keycloak — secure OAuth2/JWT API auth across enterprise systems",
      "Built Apache ActiveMQ Artemis Message Router, improving processing efficiency by 30%",
      "Designed Utilization Dashboard for real-time ticket monitoring and alert operations",
      "Automated Maven archetypes reducing project setup time by 50%",
      "Mentored juniors in TDD & pair programming — 10% team productivity boost",
    ],
    stack: ["Java", "Spring Boot", "React.js", "Vue.js", "Keycloak", "ActiveMQ", "ArangoDB", "MySQL"],
  },
  {
    id: "LTI",
    company: "LTI",
    role: "Software Dev Engineer",
    client: "Alert Monitoring & Spring Cloud",
    period: "07/2021 – 11/2021",
    status: "COMPLETED",
    color: "#ffb347",
    glyph: "◉",
    impact: [
      { val: "90%", desc: "Monitoring Accuracy" },
      { val: "50%", desc: "Scalability Gain" },
      { val: "20%", desc: "Query Optimization" },
      { val: "15%", desc: "Sprint Velocity" },
    ],
    bullets: [
      "Alert Monitoring System in Spring Boot + React.js — 90% accuracy improvement",
      "Spring Cloud setup: Eureka, Zipkin, Gateway, Config Server, Actuator",
      "PostgreSQL query optimization — 20% load time reduction",
    ],
    stack: ["Spring Boot", "Spring Cloud", "React.js", "PostgreSQL", "Eureka", "Zipkin"],
  },
];

const SKILL_GROUPS = [
  {
    label: "BACKEND",
    color: "#00ffe7",
    skills: [
      { name: "Java / Spring Boot", pct: 95 },
      { name: "Spring Security", pct: 88 },
      { name: "Microservices", pct: 92 },
      { name: "REST APIs", pct: 94 },
      { name: "Kafka / ActiveMQ", pct: 80 },
    ],
  },
  {
    label: "FRONTEND",
    color: "#bf80ff",
    skills: [
      { name: "React.js / Redux", pct: 88 },
      { name: "JavaScript (ES6+)", pct: 90 },
      { name: "Formik / Jest / RTL", pct: 82 },
      { name: "Vue.js", pct: 72 },
    ],
  },
  {
    label: "DATA & INFRA",
    color: "#ffb347",
    skills: [
      { name: "PostgreSQL / MySQL", pct: 85 },
      { name: "ArangoDB", pct: 70 },
      { name: "Docker / Jenkins", pct: 82 },
      { name: "Splunk / Jaeger", pct: 78 },
    ],
  },
  {
    label: "AI / GEN_AI",
    color: "#ff6ec7",
    skills: [
      { name: "RAG (POC built)", pct: 55 },
      { name: "Embeddings / Vector DB", pct: 40 },
      { name: "LLM Concepts", pct: 45 },
      { name: "Agentic AI (learning)", pct: 20 },
    ],
  },
];

const AI_JOURNEY = [
  {
    phase: "PHASE_01",
    title: "RAG POC — SHIPPED",
    status: "done",
    color: "#00ffe7",
    desc: "Built a Retrieval-Augmented Generation POC at EY/AmEx for internal knowledge retrieval — compliance FAQs, onboarding guidelines. Used embeddings + vector search to surface relevant docs to LLM context.",
    tags: ["RAG", "Embeddings", "Vector Search", "LLM Context", "Prompt Engineering"],
    badge: "PRODUCTION POC",
  },
  {
    phase: "PHASE_02",
    title: "LLM FUNDAMENTALS",
    status: "active",
    color: "#bf80ff",
    desc: "Deepening understanding of how large language models work — tokenization, attention mechanisms, fine-tuning vs prompting, context windows. Exploring OpenAI, Anthropic, and open-source models.",
    tags: ["Transformers", "Tokenization", "Prompt Engineering", "Fine-tuning", "LangChain"],
    badge: "IN PROGRESS",
  },
  {
    phase: "PHASE_03",
    title: "AGENTIC AI",
    status: "learning",
    color: "#ffb347",
    desc: "Exploring AI agents — systems where LLMs autonomously plan, use tools, and complete multi-step tasks. Studying ReAct patterns, tool use, memory, and orchestration frameworks like LangGraph and AutoGen.",
    tags: ["LangGraph", "AutoGen", "ReAct", "Tool Use", "Agent Orchestration", "Multi-Agent"],
    badge: "EXPLORING",
  },
  {
    phase: "PHASE_04",
    title: "AI-NATIVE FULL STACK",
    status: "planned",
    color: "#ff6ec7",
    desc: "Goal: build production-grade AI-native apps that combine my Spring Boot / React expertise with LLM backends, streaming responses, semantic search, and agentic workflows.",
    tags: ["AI APIs", "Streaming", "Semantic Search", "Spring AI", "React + LLM"],
    badge: "NEXT TARGET",
  },
];

const AWARDS = [
  { icon: "◆", title: "3× MVP Award", org: "Ernst & Young", desc: "BCA profile management, frontend API optimization, and product-driven enhancements", color: "#ffb347" },
  { icon: "★", title: "Spotlight Award", org: "LTIMindtree", desc: "Owned and delivered key modules in JORITZ 4.0 release — successful production rollout", color: "#00ffe7" },
  { icon: "◉", title: "Tech Leadership", org: "LTIMindtree", desc: "Recognized for mentoring junior developers, accelerating team onboarding & productivity", color: "#bf80ff" },
  { icon: "▲", title: "Dashboard Impact", org: "LTIMindtree", desc: "Data-driven Utilization Dashboard enabling real-time operational insights", color: "#ff6ec7" },
];

const ALL_TAGS = ["Java","Spring Boot","Spring Security","JUnit","Mockito","React.js","Redux","Jest","JavaScript","Formik","PostgreSQL","MySQL","ArangoDB","Kafka","Docker","Jenkins","Git","Keycloak","OAuth2/JWT","Splunk","Jaeger","Microservices","REST APIs","CompletableFuture","Apache ActiveMQ","Spring Cloud","Eureka","Zipkin","RAG","Embeddings","Vector Search","LangChain","GenAI","SonarQube","Agile/Scrum","Vue.js","Spring AI"];

/* ── PARTICLE CANVAS ── */
function StarField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2, speed: Math.random() * 0.15 + 0.05,
      opacity: Math.random() * 0.6 + 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.y += s.speed;
        if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,231,${s.opacity})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

/* ── TYPED TEXT ── */
function TypedText({ phrases }) {
  const [display, setDisplay] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const phrase = phrases[phraseIdx];
    const delay = deleting ? 40 : charIdx === phrase.length ? 1800 : 70;
    const t = setTimeout(() => {
      if (!deleting && charIdx < phrase.length) {
        setDisplay(phrase.slice(0, charIdx + 1)); setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === phrase.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setDisplay(phrase.slice(0, charIdx - 1)); setCharIdx(c => c - 1);
      } else {
        setDeleting(false); setPhraseIdx(i => (i + 1) % phrases.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, phraseIdx, phrases]);
  return (
    <span style={{ color: "#00ffe7", fontFamily: "'JetBrains Mono', monospace" }}>
      {display}<span style={{ animation: "blink 1s infinite", borderRight: "2px solid #00ffe7", marginLeft: 2 }} />
    </span>
  );
}

/* ── SKILL BAR ── */
function SkillBar({ name, pct, color, i }) {
  const [w, setW] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTimeout(() => setW(pct), i * 80); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct, i]);
  return (
    <div ref={ref} style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 11, color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}>{name}</span>
        <span style={{ fontSize: 11, color, fontFamily: "'JetBrains Mono', monospace" }}>{pct}%</span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 2, height: 3, overflow: "hidden", border: `1px solid ${color}22` }}>
        <div style={{ width: `${w}%`, height: "100%", background: `linear-gradient(90deg, ${color}88, ${color})`, borderRadius: 2, transition: "width 1s cubic-bezier(.4,0,.2,1)", boxShadow: `0 0 6px ${color}` }} />
      </div>
    </div>
  );
}

/* ── GLASS CARD ── */
function Glass({ children, style = {}, glow = "#00ffe7", onClick, hoverable = false }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => hoverable && setHov(true)}
      onMouseLeave={() => hoverable && setHov(false)}
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${hov ? glow + "66" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 16,
        transition: "all 0.3s",
        boxShadow: hov ? `0 0 32px ${glow}22, inset 0 0 20px ${glow}08` : "none",
        ...style,
      }}>{children}</div>
  );
}

/* ── SECTION HEADING ── */
function SectionHead({ num, label, color = "#00ffe7" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 56 }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", color, fontSize: 12, opacity: 0.6 }}>{num}</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${color}44, transparent)` }} />
      <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(20px,3vw,28px)", fontWeight: 900, color: "#f1f5f9", margin: 0, letterSpacing: 3 }}>{label}</h2>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, boxShadow: `0 0 12px ${color}` }} />
    </div>
  );
}

/* ── MAIN COMPONENT ── */
export default function App() {
  const [activeNav, setActiveNav] = useState("INIT");
  const [openExp, setOpenExp] = useState("EY");
  const [termLines, setTermLines] = useState([]);

  /* Terminal boot sequence */
  useEffect(() => {
    const lines = [
      "$ initializing portfolio.exe...",
      "$ loading shivaram_dasari.json",
      "> 5 years experience... [OK]",
      "> microservices_architect... [OK]",
      "> react_specialist... [OK]",
      "> genai_explorer... [LOADING]",
      "> agentic_ai... [LEARNING]",
      "$ system ready. welcome. ■",
    ];
    lines.forEach((l, i) => setTimeout(() => setTermLines(prev => [...prev, l]), 300 + i * 220));
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
  };

  return (
    <div style={{ background: "#020b18", minHeight: "100vh", color: "#e2e8f0", overflowX: "hidden", position: "relative" }}>
      <FontLink />
      <StarField />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 8px #00ffe744} 50%{box-shadow:0 0 24px #00ffe7aa} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        @keyframes tag-in { from{opacity:0;transform:scale(0.8)} to{opacity:1;transform:scale(1)} }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:#020b18} ::-webkit-scrollbar-thumb{background:#00ffe744;border-radius:2px}
        .nav-link:hover{color:#00ffe7!important;text-shadow:0 0 12px #00ffe7;}
        .exp-tag{transition:all 0.2s;} .exp-tag:hover{background:rgba(0,255,231,0.15)!important;border-color:#00ffe7!important;}
      `}</style>

      {/* SCANLINE EFFECT */}
      <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden", opacity: 0.03 }}>
        <div style={{ width: "100%", height: 2, background: "rgba(0,255,231,0.8)", animation: "scanline 8s linear infinite" }} />
      </div>

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "16px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(2,11,24,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,255,231,0.08)" }}>
        <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 14, fontWeight: 900, color: "#00ffe7", letterSpacing: 2, textShadow: "0 0 20px #00ffe7" }}>SD.EXE</div>
        <div style={{ display: "flex", gap: 28 }}>
          {NAV.map(n => (
            <button key={n} className="nav-link" onClick={() => scrollTo(n)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 2, color: activeNav === n ? "#00ffe7" : "#475569", transition: "all 0.2s", textShadow: activeNav === n ? "0 0 12px #00ffe7" : "none" }}>{n}</button>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="INIT" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 5% 60px", position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 60, width: "100%", maxWidth: 1200, margin: "0 auto", alignItems: "center" }}>
          <div>
            {/* Status badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,255,231,0.07)", border: "1px solid rgba(0,255,231,0.2)", borderRadius: 20, padding: "6px 16px", marginBottom: 28, animation: "pulse-glow 2s infinite" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ffe7", animation: "pulse-glow 1s infinite" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#00ffe7", letterSpacing: 2 }}>AVAILABLE FOR OPPORTUNITIES</span>
            </div>

            <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#475569", fontSize: 12, letterSpacing: 3, marginBottom: 12 }}>// FULL STACK DEVELOPER · 5 YRS EXP</p>

            <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(40px,6vw,80px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 16, letterSpacing: -1 }}>
              <span style={{ display: "block", color: "#f1f5f9" }}>SHIVARAM</span>
              <span style={{ display: "block", WebkitTextStroke: "1.5px #00ffe7", color: "transparent", textShadow: "none" }}>DASARI</span>
            </h1>

            <div style={{ fontSize: "clamp(14px,2vw,18px)", marginBottom: 32, height: 28 }}>
              <TypedText phrases={TYPED_ROLES} />
            </div>

            <p style={{ color: "#64748b", lineHeight: 1.8, maxWidth: 560, fontSize: 15, fontFamily: "'Outfit', sans-serif", marginBottom: 40 }}>
              Building enterprise-grade systems at scale — Spring Boot microservices to React.js frontends. Currently bridging into <span style={{ color: "#bf80ff" }}>GenAI & Agentic AI</span> to become an AI-native full stack engineer.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 56 }}>
              <a href="mailto:shivaramdasari369036@gmail.com" style={{ display: "inline-block", background: "linear-gradient(135deg, #00ffe7, #00b4d8)", color: "#020b18", padding: "12px 28px", borderRadius: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, textDecoration: "none", fontWeight: 700, letterSpacing: 2, transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 32px #00ffe744"; }}
                onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                CONTACT_ME.exe
              </a>
              <a href="https://linkedin.com/in/shivaramd" target="_blank" rel="noreferrer" style={{ display: "inline-block", border: "1px solid rgba(0,255,231,0.3)", color: "#00ffe7", padding: "12px 28px", borderRadius: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, textDecoration: "none", letterSpacing: 2, transition: "all 0.2s" }}
                onMouseOver={e => { e.currentTarget.style.background = "rgba(0,255,231,0.08)"; e.currentTarget.style.boxShadow = "0 0 20px #00ffe722"; }}
                onMouseOut={e => { e.currentTarget.style.background = ""; e.currentTarget.style.boxShadow = ""; }}>
                LINKEDIN ↗
              </a>
            </div>

            {/* Quick stats */}
            <div style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
              {[["5", "YEARS"], ["3+", "COMPANIES"], ["45d→3h", "KEY_WIN"], ["4", "AWARDS"]].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 28, fontWeight: 900, color: "#00ffe7", textShadow: "0 0 20px #00ffe766" }}>{v}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#334155", letterSpacing: 3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal */}
          <Glass glow="#00ffe7" style={{ padding: 24, fontFamily: "'JetBrains Mono', monospace", animation: "float 4s ease-in-out infinite" }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
              {["#ff5f57", "#febc2e", "#28c840"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
              <span style={{ color: "#334155", fontSize: 10, marginLeft: 8 }}>bash — shivaram@dev</span>
            </div>
            <div style={{ minHeight: 200 }}>
              {termLines.map((line, i) => (
                <div key={i} style={{ fontSize: 11, lineHeight: 1.9, color: line.startsWith("$") ? "#00ffe7" : line.includes("[OK]") ? "#34d399" : line.includes("[LOADING]") ? "#ffb347" : line.includes("[LEARNING]") ? "#bf80ff" : "#94a3b8" }}>
                  {line}
                </div>
              ))}
            </div>
          </Glass>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="EXPERIENCE" style={{ padding: "100px 5%", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHead num="02" label="EXPERIENCE.log" />
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 24 }}>
            {/* Tabs */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {EXPERIENCE.map(e => (
                <button key={e.id} onClick={() => setOpenExp(e.id)} style={{
                  background: openExp === e.id ? `${e.color}12` : "transparent",
                  border: `1px solid ${openExp === e.id ? e.color + "55" : "rgba(255,255,255,0.05)"}`,
                  borderRadius: 10, padding: "14px 16px", cursor: "pointer", textAlign: "left", transition: "all 0.25s"
                }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: e.color, letterSpacing: 1, marginBottom: 4 }}>{e.id}</div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600, color: "#f1f5f9" }}>{e.company}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#475569", marginTop: 4 }}>{e.period}</div>
                  <div style={{ display: "inline-block", marginTop: 8, background: e.status === "ACTIVE" ? "#00ffe712" : "rgba(255,255,255,0.04)", color: e.status === "ACTIVE" ? "#00ffe7" : "#475569", fontSize: 9, padding: "2px 8px", borderRadius: 4, fontFamily: "'JetBrains Mono', monospace" }}>{e.status}</div>
                </button>
              ))}
            </div>

            {/* Detail Panel */}
            {(() => {
              const e = EXPERIENCE.find(x => x.id === openExp);
              return (
                <Glass glow={e.color} style={{ padding: 32 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 22, fontWeight: 900, color: "#f1f5f9", marginBottom: 4 }}>{e.company}</div>
                      <div style={{ color: e.color, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{e.role}</div>
                      <div style={{ color: "#475569", fontSize: 12, marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>{e.client}</div>
                    </div>
                    <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 48, color: e.color, opacity: 0.15 }}>{e.glyph}</span>
                  </div>

                  {/* Impact stats */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 28 }}>
                    {e.impact.map(imp => (
                      <div key={imp.desc} style={{ background: `${e.color}0a`, border: `1px solid ${e.color}22`, borderRadius: 10, padding: "12px 8px", textAlign: "center" }}>
                        <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 14, fontWeight: 700, color: e.color }}>{imp.val}</div>
                        <div style={{ fontSize: 9, color: "#475569", fontFamily: "'JetBrains Mono', monospace", marginTop: 4 }}>{imp.desc}</div>
                      </div>
                    ))}
                  </div>

                  {/* Bullets */}
                  <div style={{ marginBottom: 24 }}>
                    {e.bullets.map((b, i) => (
                      <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
                        <span style={{ color: e.color, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, marginTop: 2, flexShrink: 0 }}>›</span>
                        <span style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7, fontFamily: "'Outfit', sans-serif" }}>{b}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stack tags */}
                  <div style={{ borderTop: `1px solid ${e.color}22`, paddingTop: 20 }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#334155", letterSpacing: 3, marginBottom: 10 }}>TECH_STACK</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {e.stack.map(t => (
                        <span key={t} className="exp-tag" style={{ background: `${e.color}0f`, color: e.color, border: `1px solid ${e.color}2a`, padding: "3px 10px", borderRadius: 4, fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </Glass>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="SKILLS" style={{ padding: "100px 5%", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHead num="03" label="SKILLS.matrix" color="#bf80ff" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, marginBottom: 48 }}>
            {SKILL_GROUPS.map(g => (
              <Glass key={g.label} glow={g.color} hoverable style={{ padding: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 3, height: 20, background: g.color, borderRadius: 2, boxShadow: `0 0 8px ${g.color}` }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: g.color, letterSpacing: 3 }}>{g.label}</span>
                  {g.label === "AI / GEN_AI" && <span style={{ background: "#ff6ec720", color: "#ff6ec7", fontSize: 9, padding: "2px 8px", borderRadius: 4, fontFamily: "'JetBrains Mono', monospace", border: "1px solid #ff6ec744" }}>EVOLVING</span>}
                </div>
                {g.skills.map((s, i) => <SkillBar key={s.name} name={s.name} pct={s.pct} color={g.color} i={i} />)}
              </Glass>
            ))}
          </div>

          {/* Tag cloud */}
          <Glass glow="#bf80ff" style={{ padding: 28 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#334155", letterSpacing: 3, marginBottom: 16 }}>FULL_ARSENAL</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {ALL_TAGS.map((t, i) => {
                const colors = ["#00ffe7", "#bf80ff", "#ffb347", "#ff6ec7", "#34d399", "#38bdf8"];
                const c = colors[i % colors.length];
                return (
                  <span key={t} style={{ background: `${c}0d`, color: c, border: `1px solid ${c}25`, padding: "5px 12px", borderRadius: 20, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", cursor: "default", transition: "all 0.2s", animation: `tag-in 0.4s ease ${i * 0.03}s both` }}
                    onMouseOver={e => { e.currentTarget.style.background = `${c}22`; e.currentTarget.style.boxShadow = `0 0 12px ${c}33`; }}
                    onMouseOut={e => { e.currentTarget.style.background = `${c}0d`; e.currentTarget.style.boxShadow = "none"; }}>
                    {t}
                  </span>
                );
              })}
            </div>
          </Glass>
        </div>
      </section>

      {/* ── GEN AI JOURNEY ── */}
      <section id="GEN_AI" style={{ padding: "100px 5%", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHead num="04" label="GEN_AI.journey" color="#ff6ec7" />

          {/* Intro callout */}
          <Glass glow="#ff6ec7" style={{ padding: 28, marginBottom: 40 }}>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>🤖</span>
              <div>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 14, color: "#ff6ec7", marginBottom: 8, letterSpacing: 2 }}>BRIDGING FULL STACK → AI NATIVE</div>
                <p style={{ color: "#94a3b8", lineHeight: 1.8, fontSize: 14, fontFamily: "'Outfit', sans-serif" }}>
                  I've already shipped a <span style={{ color: "#00ffe7", fontWeight: 600 }}>RAG-based POC in production</span> at EY/AmEx — using embeddings and vector search for intelligent document retrieval. Now I'm systematically expanding into LLM fundamentals, Agentic AI patterns, and building toward AI-native full stack applications with my Java + React foundation.
                </p>
              </div>
            </div>
          </Glass>

          {/* Journey timeline */}
          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <div style={{ position: "absolute", left: 28, top: 0, bottom: 0, width: 1, background: "linear-gradient(180deg, #00ffe744, #bf80ff44, #ffb34744, #ff6ec744)" }} />

            {AI_JOURNEY.map((phase, i) => (
              <div key={phase.phase} style={{ display: "flex", gap: 32, marginBottom: 32, position: "relative" }}>
                {/* Dot */}
                <div style={{ flexShrink: 0, width: 56, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", background: phase.color, boxShadow: `0 0 16px ${phase.color}`, border: `2px solid ${phase.color}`, zIndex: 1, marginTop: 20 }} />
                </div>

                <Glass glow={phase.color} hoverable style={{ flex: 1, padding: 28 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#334155", letterSpacing: 3, marginBottom: 6 }}>{phase.phase}</div>
                      <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 17, fontWeight: 700, color: "#f1f5f9" }}>{phase.title}</div>
                    </div>
                    <span style={{ background: `${phase.color}18`, color: phase.color, border: `1px solid ${phase.color}44`, padding: "4px 12px", borderRadius: 20, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>{phase.badge}</span>
                  </div>
                  <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.8, marginBottom: 16, fontFamily: "'Outfit', sans-serif" }}>{phase.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {phase.tags.map(t => (
                      <span key={t} style={{ background: `${phase.color}0d`, color: phase.color, border: `1px solid ${phase.color}25`, padding: "3px 10px", borderRadius: 4, fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
                    ))}
                  </div>
                </Glass>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AWARDS ── */}
      <section id="AWARDS" style={{ padding: "100px 5%", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHead num="05" label="AWARDS.db" color="#ffb347" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {AWARDS.map((a, i) => (
              <Glass key={i} glow={a.color} hoverable style={{ padding: 28 }}>
                <div style={{ fontSize: 32, color: a.color, marginBottom: 14, textShadow: `0 0 20px ${a.color}` }}>{a.icon}</div>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 16, fontWeight: 700, color: "#f1f5f9", marginBottom: 4 }}>{a.title}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: a.color, letterSpacing: 2, marginBottom: 12 }}>{a.org}</div>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7, fontFamily: "'Outfit', sans-serif" }}>{a.desc}</p>
              </Glass>
            ))}
          </div>

          {/* Education */}
          <Glass glow="#ffb347" style={{ marginTop: 24, padding: 28, display: "flex", gap: 20, alignItems: "center" }}>
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 32, color: "#ffb347", opacity: 0.3 }}>◎</div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#334155", letterSpacing: 3, marginBottom: 6 }}>EDUCATION</div>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 16, fontWeight: 700, color: "#f1f5f9" }}>B.Tech — Computer Science</div>
              <div style={{ color: "#64748b", fontSize: 13, marginTop: 4, fontFamily: "'Outfit', sans-serif" }}>Gokaraju Rangaraju Institute of Engineering & Technology, Hyderabad · 2017–2021</div>
            </div>
          </Glass>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="CONTACT" style={{ padding: "100px 5% 140px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#334155", fontSize: 11, letterSpacing: 4, marginBottom: 20 }}>// END OF FILE — LET'S CONNECT</div>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20 }}>
            <span style={{ color: "#f1f5f9" }}>READY TO</span><br />
            <span style={{ WebkitTextStroke: "1.5px #00ffe7", color: "transparent" }}>BUILD_TOGETHER?</span>
          </h2>
          <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.8, marginBottom: 40, fontFamily: "'Outfit', sans-serif" }}>
            Open to full-stack engineering roles where I can ship scalable systems,<br />contribute to GenAI/ML-powered platforms, and keep growing.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:shivaramdasari369036@gmail.com" style={{ display: "inline-block", background: "linear-gradient(135deg,#00ffe7,#00b4d8)", color: "#020b18", padding: "14px 36px", borderRadius: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, textDecoration: "none", fontWeight: 700, letterSpacing: 2, transition: "all 0.2s" }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px #00ffe755"; }}
              onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
              8367090570
            </a>
            <a href="https://linkedin.com/in/shivaramd" target="_blank" rel="noreferrer" style={{ display: "inline-block", border: "1px solid rgba(0,255,231,0.3)", color: "#00ffe7", padding: "14px 36px", borderRadius: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, textDecoration: "none", letterSpacing: 2, transition: "all 0.2s" }}
              onMouseOver={e => { e.currentTarget.style.background = "rgba(0,255,231,0.07)"; }}
              onMouseOut={e => { e.currentTarget.style.background = ""; }}>
              LINKEDIN ↗
            </a>
          </div>

          <div style={{ marginTop: 80, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#1e293b", letterSpacing: 2 }}>
            BUILT WITH REACT.JS · © 2025 SHIVARAM DASARI
          </div>
        </div>
      </section>
    </div>
  );
}