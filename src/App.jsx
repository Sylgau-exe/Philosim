import { useState, useRef, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════════
// BIZSIMHUB DESIGN SYSTEM (exact match)
// ═══════════════════════════════════════════════════════
const C = {
  bgPrimary: "#05050a",
  bgSecondary: "#0d0d14",
  bgCard: "#141420",
  bgCardHover: "#1a1a28",
  bgInput: "#0d0d14",
  textPrimary: "#ffffff",
  textSecondary: "#9ca3af",
  textMuted: "#6b7280",
  accentPrimary: "#6366f1",
  accentSecondary: "#8b5cf6",
  accentTertiary: "#06b6d4",
  accentSuccess: "#10b981",
  accentWarning: "#f59e0b",
  accentError: "#ef4444",
  accentGradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
  borderSubtle: "rgba(255, 255, 255, 0.06)",
  borderAccent: "rgba(99, 102, 241, 0.3)",
  borderInput: "rgba(255, 255, 255, 0.1)",
  glowPrimary: "rgba(99, 102, 241, 0.4)",
  glowSecondary: "rgba(139, 92, 246, 0.3)",
  shadowLg: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
};

const FONT_DISPLAY = "'Space Grotesk', sans-serif";
const FONT_BODY = "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif";

// Socrates accent — warm olive/gold within the system
const SOCRATES = {
  gold: "#d4a853",
  goldDim: "#b8923e",
  bg: "rgba(212,168,83,0.06)",
  border: "rgba(212,168,83,0.22)",
  glow: "rgba(212,168,83,0.15)",
};

// ═══════════════════════════════════════════════════════
// SCENARIOS
// ═══════════════════════════════════════════════════════
const SCENARIOS = [
  {
    id: "ethical_dilemma",
    icon: "⚖️",
    title: "The Ethical Dilemma",
    subtitle: "Your company wants to cut corners on quality to meet quarterly targets",
    category: "Ethics",
    difficulty: "Beginner",
    diffColor: C.accentSuccess,
    duration: "12–18 min",
    skills: ["Ethical reasoning", "Questioning assumptions", "Virtue vs. profit"],
    situation: "You're a Product Director at a mid-size tech company. The CEO has asked you to ship a product you know has unresolved bugs to meet the quarterly revenue target. The sales team has already promised delivery to 3 major clients. Your engineering lead says it needs 3 more weeks. The board meeting is in 5 days.",
    stakeholders: ["CEO (pushing to ship)", "Engineering Lead (wants delay)", "Sales VP (promised clients)", "You (must decide)"],
    philosophicalTheme: "Virtue Ethics — What does the virtuous person do when pressured to compromise quality?",
    socratesOpener: "Ah, a most interesting predicament. Tell me — when you say the product has 'unresolved bugs,' what precisely do you mean? Are these minor imperfections, or do they touch the very essence of what the product promises to deliver? Before we decide what to do, let us first understand what we truly know.",
  },
  {
    id: "leadership_conflict",
    icon: "🏛️",
    title: "The Leadership Question",
    subtitle: "Two qualified candidates for promotion — only one slot. One is your friend.",
    category: "Justice",
    difficulty: "Intermediate",
    diffColor: C.accentWarning,
    duration: "15–20 min",
    skills: ["Justice & fairness", "Self-examination", "Bias awareness"],
    situation: "You manage a department of 25 people. There's one Senior Director position opening up. Two candidates stand out: Alex, who has been your close friend for 8 years and has solid performance, and Jordan, who joined 2 years ago but has delivered exceptional results including a project that saved the company $2M. HR says both are qualified. Your recommendation will be decisive.",
    stakeholders: ["Alex (your friend, solid performer)", "Jordan (newer, exceptional results)", "HR Director (wants fairness)", "Your team (watching closely)"],
    philosophicalTheme: "Justice — Can you truly separate personal loyalty from professional judgment? Do you even know your own biases?",
    socratesOpener: "How fascinating. You say both are 'qualified,' yet you must choose one. Tell me this — when you think of the word 'fairness,' what image comes to your mind? Is it giving each person what they deserve? Or is it something else entirely? And how can you know what each person deserves if you have not first examined what clouds your own judgment?",
  },
  {
    id: "innovation_risk",
    icon: "🔥",
    title: "The Innovation Paradox",
    subtitle: "A bold pivot could save the company — or destroy it. Nobody agrees.",
    category: "Knowledge",
    difficulty: "Advanced",
    diffColor: C.accentError,
    duration: "18–25 min",
    skills: ["Epistemic humility", "Dialectical reasoning", "Decision under uncertainty"],
    situation: "Your company's core product is declining 15% year-over-year. You've identified an AI-powered pivot that could leapfrog competitors, but it requires $4M investment and 18 months. The CFO says the company has 24 months of runway. The CTO is excited but admits the technology is unproven. The board is split 50/50. Three competitors are already exploring similar pivots.",
    stakeholders: ["CFO (risk-averse, runway concerns)", "CTO (excited but honest about unknowns)", "Board (divided)", "Employees (anxious about change)"],
    philosophicalTheme: "Epistemology — How do you make decisions when you cannot know the outcome? What is the relationship between knowledge, belief, and wise action?",
    socratesOpener: "So you stand at a crossroads where all paths are shrouded in fog. Before we discuss what you should do, I must ask you something that may seem strange: What do you actually know? Not what you believe, not what you hope, not what the data suggests — what do you truly know with certainty? Let us begin there, and see what remains.",
  },
  {
    id: "team_purpose",
    icon: "🧭",
    title: "The Meaning Crisis",
    subtitle: "Your best people are leaving. Salaries are competitive. Something deeper is wrong.",
    category: "Purpose",
    difficulty: "Intermediate",
    diffColor: C.accentWarning,
    duration: "15–20 min",
    skills: ["Examined life", "Purpose & meaning", "Authentic leadership"],
    situation: "In the past 6 months, 4 of your top 10 performers have resigned. Exit interviews mention 'lack of growth,' 'no clear mission,' and 'feeling like a cog.' Your company pays above market rate. Benefits are strong. Your engagement survey scores dropped from 78 to 61. The CEO wants a retention plan by Friday. You suspect the problem is deeper than perks.",
    stakeholders: ["Departing employees (seeking meaning)", "CEO (wants quick fix)", "HR (proposing more perks)", "Remaining team (morale dropping)"],
    philosophicalTheme: "The Examined Life — Socrates said the unexamined life is not worth living. Does the same apply to the unexamined workplace?",
    socratesOpener: "They leave despite generous compensation. How curious — and yet, how predictable. Tell me, when you yourself wake each morning and prepare for work, what is it that pulls you forward? Is it the salary? Or is it something else? If you cannot answer this question for yourself, how can you hope to answer it for those who have chosen to leave?",
  },
];

// ═══════════════════════════════════════════════════════
// MENTOR PROFILES (expandable concept)
// ═══════════════════════════════════════════════════════
const MENTORS = {
  socrates: {
    name: "Socrates",
    title: "Philosopher of Athens",
    era: "470–399 BC",
    emoji: "🏛️",
    method: "The Socratic Method — Teaching through questioning",
    tagline: "The unexamined life is not worth living.",
    color: SOCRATES.gold,
    principles: [
      "I know that I know nothing — epistemic humility",
      "Question everything — especially your own assumptions",
      "Virtue is knowledge — understanding leads to right action",
      "The dialectic — truth emerges through dialogue, not lecture",
      "Know thyself — self-examination is the foundation of wisdom",
    ],
  },
};

// ═══════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════
export default function PhiloSim() {
  const [view, setView] = useState("welcome"); // welcome, scenarios, play, report
  const [playerName, setPlayerName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [scenario, setScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [exchangeCount, setExchangeCount] = useState(0);
  const [phase, setPhase] = useState("dialogue"); // dialogue, reflection, complete
  const [decisions, setDecisions] = useState([]);
  const [sessionReport, setSessionReport] = useState(null);
  const [allReports, setAllReports] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [lang, setLang] = useState("en");
  const chatRef = useRef(null);
  const inputRef = useRef(null);

  const MAX_EXCHANGES = 12;

  // ── Translations ──
  const T = {
    en: {
      brand: "PhiloSim",
      tagline: "Approach your work like",
      mentorName: "Socrates",
      welcome: "Welcome",
      scenarios: "Scenarios",
      activeSession: "Active Session",
      report: "Report",
      history: "History",
      settings: "Settings",
      startJourney: "Begin Your Apprenticeship",
      enterName: "Enter your name to begin...",
      start: "Start",
      selectScenario: "Choose Your Challenge",
      selectScenarioSub: "Each scenario presents a real workplace dilemma. Socrates will guide you through philosophical inquiry to find wisdom.",
      begin: "Begin Dialogue",
      difficulty: "Difficulty",
      duration: "Duration",
      skills: "Skills explored",
      theme: "Philosophical theme",
      situation: "The Situation",
      stakeholders: "Key Stakeholders",
      typeResponse: "Share your thoughts with Socrates...",
      send: "Send",
      exchange: "Exchange",
      requestReflection: "🪞 Ask for Reflection",
      endSession: "📜 End & Get Wisdom",
      socratesThinking: "Socrates is contemplating...",
      reportTitle: "Philosophical Report",
      sessionWith: "Session with Socrates",
      noReports: "No sessions completed yet. Begin a dialogue to receive your first philosophical report.",
      backToScenarios: "← New Dialogue",
      comingSoon: "Coming Soon",
      futureTitle: "The Mentorship Collection",
      futureSub: "Same powerful framework. Different legendary minds.",
      principles: "Core Principles",
      method: "Method",
    },
    fr: {
      brand: "PhiloSim",
      tagline: "Abordez votre travail comme",
      mentorName: "Socrate",
      welcome: "Bienvenue",
      scenarios: "Scénarios",
      activeSession: "Session Active",
      report: "Rapport",
      history: "Historique",
      settings: "Paramètres",
      startJourney: "Commencez Votre Apprentissage",
      enterName: "Entrez votre nom pour commencer...",
      start: "Commencer",
      selectScenario: "Choisissez Votre Défi",
      selectScenarioSub: "Chaque scénario présente un dilemme professionnel réel. Socrate vous guidera à travers l'enquête philosophique.",
      begin: "Commencer le Dialogue",
      difficulty: "Difficulté",
      duration: "Durée",
      skills: "Compétences explorées",
      theme: "Thème philosophique",
      situation: "La Situation",
      stakeholders: "Parties Prenantes",
      typeResponse: "Partagez vos réflexions avec Socrate...",
      send: "Envoyer",
      exchange: "Échange",
      requestReflection: "🪞 Demander une Réflexion",
      endSession: "📜 Terminer & Sagesse",
      socratesThinking: "Socrate réfléchit...",
      reportTitle: "Rapport Philosophique",
      sessionWith: "Session avec Socrate",
      noReports: "Aucune session complétée. Commencez un dialogue pour recevoir votre premier rapport philosophique.",
      backToScenarios: "← Nouveau Dialogue",
      comingSoon: "Bientôt Disponible",
      futureTitle: "La Collection de Mentorat",
      futureSub: "Même cadre puissant. Des esprits légendaires différents.",
      principles: "Principes Fondamentaux",
      method: "Méthode",
    },
  };
  const t = T[lang];

  // ── Scroll ──
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, loading]);

  // ── API Call to Socrates ──
  const callSocrates = useCallback(async (msgs, systemOverride) => {
    const systemPrompt = systemOverride || `You are Socrates, the philosopher of Athens (470-399 BC), serving as a philosophical advisor in a modern workplace simulation called PhiloSim.

YOUR METHOD:
- Use the Socratic Method exclusively: teach through QUESTIONS, not answers
- Never give direct advice. Instead, ask probing questions that lead the person to discover wisdom themselves
- Challenge assumptions, expose contradictions, and guide toward deeper understanding
- Be warm but intellectually rigorous — you genuinely care but won't let lazy thinking slide
- Reference your core principles naturally: epistemic humility, virtue as knowledge, the examined life
- Occasionally reference ancient Greek examples or metaphors, but keep them relevant to the modern situation
- Keep responses 3-5 sentences. End with a penetrating question.

SCENARIO CONTEXT:
Title: ${scenario?.title}
Situation: ${scenario?.situation}
Philosophical Theme: ${scenario?.philosophicalTheme}
Stakeholders: ${scenario?.stakeholders?.join(", ")}

LANGUAGE: Respond in ${lang === "fr" ? "French" : "English"}.

The participant's name is ${playerName}. Address them directly. You are having a living dialogue.`;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: systemPrompt,
          messages: msgs.map((m) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      return data.text || "...";
    } catch (e) {
      return lang === "fr"
        ? "Pardonnez-moi, mes pensées se sont égarées. Pourriez-vous reformuler?"
        : "Forgive me, my thoughts have wandered. Could you rephrase?";
    }
  }, [scenario, playerName, lang]);

  // ── Send Message ──
  const sendMessage = async () => {
    if (!userInput.trim() || loading) return;
    const userMsg = { role: "user", text: userInput.trim() };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setUserInput("");
    setLoading(true);
    setExchangeCount((c) => c + 1);

    const reply = await callSocrates(newMsgs);
    setMessages([...newMsgs, { role: "socrates", text: reply }]);
    setLoading(false);
    setDecisions((d) => [...d, { question: userMsg.text, exchange: exchangeCount + 1 }]);
    inputRef.current?.focus();
  };

  // ── End Session & Generate Report ──
  const endSession = async () => {
    setLoading(true);
    setPhase("complete");
    const reportPrompt = `Based on our entire dialogue, generate a philosophical assessment report for ${playerName}.

FORMAT YOUR RESPONSE EXACTLY AS JSON (no markdown, no backticks):
{
  "overallWisdom": "A 2-sentence philosophical assessment of their reasoning quality",
  "socratesVerdict": "A 2-sentence verdict from Socrates about this person's philosophical growth",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "growthAreas": ["area 1", "area 2"],
  "philosophicalInsight": "The single deepest philosophical insight that emerged from this dialogue (1-2 sentences)",
  "scoreVirtue": 75,
  "scoreReasoning": 80,
  "scoreSelfAwareness": 70,
  "scoreEpistemicHumility": 65,
  "closingQuestion": "One final question for them to ponder after the session"
}

LANGUAGE: ${lang === "fr" ? "French" : "English"}. Scores are 0-100.`;

    const allMsgs = [...messages, { role: "user", text: reportPrompt }];
    const raw = await callSocrates(allMsgs, `You are a philosophical assessment engine for PhiloSim. Analyze the dialogue and produce a JSON report. Respond ONLY with valid JSON, no backticks, no markdown.`);

    try {
      const cleaned = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      const report = {
        ...parsed,
        scenarioTitle: scenario.title,
        scenarioId: scenario.id,
        exchanges: exchangeCount,
        date: new Date().toLocaleDateString(),
        playerName,
      };
      setSessionReport(report);
      setAllReports((prev) => [report, ...prev]);
    } catch {
      const fallback = {
        overallWisdom: lang === "fr" ? "Une session de réflexion profonde a été menée." : "A thoughtful session of philosophical inquiry was conducted.",
        socratesVerdict: lang === "fr" ? "Le dialogue a révélé un esprit curieux." : "The dialogue revealed a curious mind.",
        strengths: [lang === "fr" ? "Engagement actif" : "Active engagement", lang === "fr" ? "Pensée critique" : "Critical thinking"],
        growthAreas: [lang === "fr" ? "Approfondir le questionnement" : "Deeper questioning"],
        philosophicalInsight: lang === "fr" ? "La sagesse commence par reconnaître ce que l'on ne sait pas." : "Wisdom begins with acknowledging what you do not know.",
        scoreVirtue: 72, scoreReasoning: 68, scoreSelfAwareness: 65, scoreEpistemicHumility: 70,
        closingQuestion: lang === "fr" ? "Qu'allez-vous examiner demain que vous avez ignoré aujourd'hui?" : "What will you examine tomorrow that you ignored today?",
        scenarioTitle: scenario.title, scenarioId: scenario.id, exchanges: exchangeCount,
        date: new Date().toLocaleDateString(), playerName,
      };
      setSessionReport(fallback);
      setAllReports((prev) => [fallback, ...prev]);
    }
    setLoading(false);
  };

  // ── Request Reflection ──
  const requestReflection = async () => {
    if (loading) return;
    setLoading(true);
    const reflectionPrompt = `The participant is asking for a mid-dialogue reflection. Pause the scenario and offer a brief philosophical mirror — summarize what you've observed about their reasoning so far, name one assumption they haven't questioned, and ask a question that goes deeper. Keep it 3-4 sentences. ${lang === "fr" ? "Respond in French." : ""}`;
    const reflectionMsgs = [...messages, { role: "user", text: reflectionPrompt }];
    const reply = await callSocrates(reflectionMsgs);
    setMessages([...messages, { role: "socrates", text: `🪞 ${reply}` }]);
    setLoading(false);
  };

  // ── Start Scenario ──
  const startScenario = (sc) => {
    setScenario(sc);
    setMessages([{ role: "socrates", text: sc.socratesOpener }]);
    setExchangeCount(0);
    setDecisions([]);
    setSessionReport(null);
    setPhase("dialogue");
    setView("play");
  };

  // ── Score bar ──
  const ScoreBar = ({ label, score, color }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: C.textSecondary, fontFamily: FONT_BODY }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color, fontFamily: FONT_DISPLAY }}>{score}/100</span>
      </div>
      <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3 }}>
        <div style={{ width: `${score}%`, height: "100%", background: color, borderRadius: 3, transition: "width 1s ease" }} />
      </div>
    </div>
  );

  // ── Future Mentors ──
  const FUTURE_MENTORS = [
    { emoji: "🎬", name: "Quentin Tarantino", field: "Creative Direction", tagline: "Break every rule — with purpose" },
    { emoji: "🇺🇸", name: "Barack Obama", field: "Leadership", tagline: "Lead with calm, decide with conviction" },
    { emoji: "🎵", name: "Quincy Jones", field: "Collaboration", tagline: "Orchestrate greatness from diverse talent" },
    { emoji: "👗", name: "Coco Chanel", field: "Brand & Innovation", tagline: "Elegance is refusal" },
    { emoji: "🚀", name: "Elon Musk", field: "Disruption", tagline: "First principles over consensus" },
    { emoji: "📐", name: "Leonardo da Vinci", field: "Cross-Disciplinary", tagline: "Curiosity is the mother of invention" },
  ];

  // ═══════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════
  const pct = Math.round((exchangeCount / MAX_EXCHANGES) * 100);

  return (
    <div style={{ fontFamily: FONT_BODY, background: C.bgPrimary, color: C.textPrimary, height: "100vh", display: "flex", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        ::selection { background: ${SOCRATES.gold}44; color: white; }
      `}</style>

      {/* ═══ LEFT SIDEBAR ═══ */}
      <div style={{
        width: sidebarCollapsed ? 60 : 230,
        minWidth: sidebarCollapsed ? 60 : 230,
        background: C.bgSecondary,
        borderRight: `1px solid ${C.borderSubtle}`,
        display: "flex", flexDirection: "column",
        transition: "all 0.3s ease",
        overflow: "hidden",
      }}>
        {/* Brand */}
        <div style={{ padding: sidebarCollapsed ? "16px 8px" : "20px 18px", borderBottom: `1px solid ${C.borderSubtle}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: `linear-gradient(135deg, ${SOCRATES.gold}, ${SOCRATES.goldDim})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, flexShrink: 0,
            }}>🏛️</div>
            {!sidebarCollapsed && (
              <div>
                <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }}>{t.brand}</div>
                <div style={{ fontSize: 9, color: SOCRATES.gold, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  {t.tagline} {t.mentorName}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Language Toggle */}
        {!sidebarCollapsed && (
          <div style={{ padding: "10px 18px 0", display: "flex", gap: 4 }}>
            {["en", "fr"].map((l) => (
              <button key={l} onClick={() => setLang(l)} style={{
                flex: 1, padding: "4px 0", fontSize: 11, fontWeight: lang === l ? 700 : 400,
                background: lang === l ? "rgba(212,168,83,0.12)" : "transparent",
                color: lang === l ? SOCRATES.gold : C.textMuted,
                border: `1px solid ${lang === l ? SOCRATES.border : "transparent"}`,
                borderRadius: 6, cursor: "pointer", fontFamily: FONT_BODY,
                transition: "all 0.2s",
              }}>{l.toUpperCase()}</button>
            ))}
          </div>
        )}

        {/* Nav Items */}
        <nav style={{ padding: "12px 8px", flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {[
            { id: "welcome", icon: "🏠", label: t.welcome },
            { id: "scenarios", icon: "⚡", label: t.scenarios },
            ...(phase !== "complete" && view === "play" ? [{ id: "play", icon: "💬", label: t.activeSession }] : []),
            { id: "report", icon: "📜", label: t.report },
            { id: "history", icon: "📚", label: t.history },
          ].map((item) => (
            <button key={item.id} onClick={() => setView(item.id)} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: sidebarCollapsed ? "10px 0" : "10px 12px",
              justifyContent: sidebarCollapsed ? "center" : "flex-start",
              background: view === item.id ? "rgba(212,168,83,0.1)" : "transparent",
              color: view === item.id ? SOCRATES.gold : C.textSecondary,
              border: "none", borderRadius: 8, cursor: "pointer",
              fontFamily: FONT_BODY, fontSize: 13, fontWeight: view === item.id ? 600 : 400,
              transition: "all 0.2s", width: "100%", textAlign: "left",
            }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
              {!sidebarCollapsed && item.label}
            </button>
          ))}
        </nav>

        {/* Collapse Toggle */}
        <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} style={{
          padding: 12, background: "transparent", border: "none",
          borderTop: `1px solid ${C.borderSubtle}`, cursor: "pointer",
          color: C.textMuted, fontSize: 14, transition: "all 0.2s",
        }}>
          {sidebarCollapsed ? "→" : "← "}
          {!sidebarCollapsed && <span style={{ fontSize: 11, marginLeft: 4 }}>Collapse</span>}
        </button>
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>

        {/* ── WELCOME VIEW ── */}
        {view === "welcome" && (
          <div style={{ flex: 1, overflowY: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ maxWidth: 600, padding: 40, textAlign: "center", animation: "fadeUp 0.6s ease" }}>
              {/* Socrates Avatar */}
              <div style={{
                width: 100, height: 100, borderRadius: "50%", margin: "0 auto 24px",
                background: `linear-gradient(135deg, ${SOCRATES.gold}22, ${SOCRATES.goldDim}11)`,
                border: `2px solid ${SOCRATES.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 48, boxShadow: `0 0 40px ${SOCRATES.glow}`,
              }}>🏛️</div>

              <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 36, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.03em" }}>
                {t.brand}
              </h1>
              <div style={{
                fontSize: 14, fontWeight: 500, color: SOCRATES.gold, marginBottom: 24,
                letterSpacing: "0.08em", textTransform: "uppercase",
              }}>
                {t.tagline} {t.mentorName}
              </div>

              <p style={{ fontSize: 15, color: C.textSecondary, lineHeight: 1.7, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
                {lang === "fr"
                  ? "Faites face à de vrais dilemmes professionnels guidé par le plus grand questionnaire de l'histoire. Socrate ne vous donnera pas de réponses — il vous aidera à les découvrir."
                  : "Face real workplace dilemmas guided by history's greatest questioner. Socrates won't give you answers — he'll help you discover them."}
              </p>

              {/* Mentor Card */}
              <div style={{
                background: C.bgCard, border: `1px solid ${SOCRATES.border}`,
                borderRadius: 16, padding: 24, textAlign: "left", marginBottom: 32,
              }}>
                <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 16 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: `linear-gradient(135deg, ${SOCRATES.gold}, ${SOCRATES.goldDim})`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
                  }}>🏛️</div>
                  <div>
                    <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16 }}>{MENTORS.socrates.name}</div>
                    <div style={{ fontSize: 12, color: SOCRATES.gold }}>{MENTORS.socrates.era} · {MENTORS.socrates.title}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 10, fontWeight: 600 }}>{t.method}: {MENTORS.socrates.method}</div>
                <div style={{ fontSize: 13, color: C.textSecondary, fontStyle: "italic", marginBottom: 16 }}>"{MENTORS.socrates.tagline}"</div>
                <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 600, marginBottom: 8 }}>{t.principles}:</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {MENTORS.socrates.principles.map((p, i) => (
                    <div key={i} style={{ fontSize: 12, color: C.textSecondary, paddingLeft: 12, borderLeft: `2px solid ${SOCRATES.gold}33` }}>{p}</div>
                  ))}
                </div>
              </div>

              {/* Name Input */}
              {!playerName ? (
                <div style={{ display: "flex", gap: 8, maxWidth: 360, margin: "0 auto" }}>
                  <input
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && nameInput.trim() && (setPlayerName(nameInput.trim()), setView("scenarios"))}
                    placeholder={t.enterName}
                    style={{
                      flex: 1, padding: "12px 16px", fontSize: 14, fontFamily: FONT_BODY,
                      background: C.bgInput, color: C.textPrimary,
                      border: `1px solid ${C.borderInput}`, borderRadius: 10,
                      outline: "none",
                    }}
                  />
                  <button
                    onClick={() => nameInput.trim() && (setPlayerName(nameInput.trim()), setView("scenarios"))}
                    style={{
                      padding: "12px 24px", fontSize: 14, fontWeight: 600,
                      background: `linear-gradient(135deg, ${SOCRATES.gold}, ${SOCRATES.goldDim})`,
                      color: "#0a0a0a", border: "none", borderRadius: 10, cursor: "pointer",
                      fontFamily: FONT_DISPLAY,
                    }}
                  >{t.start}</button>
                </div>
              ) : (
                <button
                  onClick={() => setView("scenarios")}
                  style={{
                    padding: "14px 36px", fontSize: 15, fontWeight: 600,
                    background: `linear-gradient(135deg, ${SOCRATES.gold}, ${SOCRATES.goldDim})`,
                    color: "#0a0a0a", border: "none", borderRadius: 12, cursor: "pointer",
                    fontFamily: FONT_DISPLAY, boxShadow: `0 4px 20px ${SOCRATES.glow}`,
                  }}
                >{t.startJourney}</button>
              )}
            </div>
          </div>
        )}

        {/* ── SCENARIOS VIEW ── */}
        {view === "scenarios" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "32px 28px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 26, fontWeight: 700, marginBottom: 4, letterSpacing: "-0.02em" }}>{t.selectScenario}</h2>
              <p style={{ color: C.textSecondary, fontSize: 14, marginBottom: 28, lineHeight: 1.6 }}>{t.selectScenarioSub}</p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380, 1fr))", gap: 16 }}>
                {SCENARIOS.map((sc, i) => (
                  <div key={sc.id} style={{
                    background: C.bgCard, border: `1px solid ${C.borderSubtle}`,
                    borderRadius: 16, padding: 22, cursor: "pointer",
                    transition: "all 0.3s", animation: `fadeUp 0.4s ease ${i * 0.08}s both`,
                    position: "relative", overflow: "hidden",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = SOCRATES.border; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.borderSubtle; e.currentTarget.style.transform = "none"; }}
                  onClick={() => startScenario(sc)}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <span style={{ fontSize: 28 }}>{sc.icon}</span>
                        <div>
                          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16, marginBottom: 2 }}>{sc.title}</div>
                          <div style={{ fontSize: 11, color: C.textMuted }}>{sc.category} · {sc.duration}</div>
                        </div>
                      </div>
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6,
                        background: `${sc.diffColor}18`, color: sc.diffColor,
                      }}>{sc.difficulty}</span>
                    </div>

                    <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.55, marginBottom: 14 }}>{sc.subtitle}</p>

                    <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 8 }}>{t.skills}:</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                      {sc.skills.map((s) => (
                        <span key={s} style={{
                          fontSize: 10, padding: "3px 8px", borderRadius: 6,
                          background: "rgba(212,168,83,0.08)", color: SOCRATES.gold,
                          border: `1px solid ${SOCRATES.border}`,
                        }}>{s}</span>
                      ))}
                    </div>

                    <div style={{ fontSize: 11, color: SOCRATES.gold, fontStyle: "italic" }}>🏛️ {sc.philosophicalTheme}</div>
                  </div>
                ))}
              </div>

              {/* Future Mentors Section */}
              <div style={{ marginTop: 48 }}>
                <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{t.futureTitle}</h3>
                <p style={{ color: C.textSecondary, fontSize: 13, marginBottom: 20 }}>{t.futureSub}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
                  {FUTURE_MENTORS.map((m, i) => (
                    <div key={i} style={{
                      background: C.bgCard, border: `1px solid ${C.borderSubtle}`,
                      borderRadius: 12, padding: 16, opacity: 0.55, textAlign: "center",
                      animation: `fadeUp 0.4s ease ${0.3 + i * 0.06}s both`,
                    }}>
                      <div style={{ fontSize: 28, marginBottom: 8 }}>{m.emoji}</div>
                      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{m.name}</div>
                      <div style={{ fontSize: 10, color: C.accentPrimary, marginBottom: 6 }}>{m.field}</div>
                      <div style={{ fontSize: 10, color: C.textMuted, fontStyle: "italic" }}>{m.tagline}</div>
                      <div style={{
                        marginTop: 10, fontSize: 9, fontWeight: 700, color: C.textMuted,
                        textTransform: "uppercase", letterSpacing: "0.1em",
                      }}>{t.comingSoon}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── PLAY VIEW ── */}
        {view === "play" && scenario && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Header */}
            <div style={{
              padding: "12px 20px", borderBottom: `1px solid ${C.borderSubtle}`,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: C.bgSecondary,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 22 }}>{scenario.icon}</span>
                <div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 14 }}>{scenario.title}</div>
                  <div style={{ fontSize: 10, color: C.textMuted }}>{scenario.category} · {scenario.philosophicalTheme.split("—")[0]}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ textAlign: "right", fontSize: 10, color: C.textMuted }}>
                  {t.exchange} {exchangeCount}/{MAX_EXCHANGES}
                  <div style={{ width: 60, height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, marginTop: 2 }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: SOCRATES.gold, borderRadius: 2, transition: "width 0.5s" }} />
                  </div>
                </div>
                {phase === "dialogue" && (
                  <>
                    <button onClick={requestReflection} disabled={loading || exchangeCount < 2} style={{
                      padding: "5px 12px", fontSize: 10, fontWeight: 600,
                      background: `${SOCRATES.gold}11`, color: SOCRATES.gold,
                      border: `1px solid ${SOCRATES.border}`, borderRadius: 8,
                      cursor: exchangeCount < 2 ? "not-allowed" : "pointer", fontFamily: FONT_BODY,
                      opacity: exchangeCount < 2 ? 0.4 : 1,
                    }}>{t.requestReflection}</button>
                    <button onClick={endSession} disabled={loading || exchangeCount < 3} style={{
                      padding: "5px 12px", fontSize: 10, fontWeight: 600,
                      background: `${C.accentPrimary}11`, color: C.accentPrimary,
                      border: `1px solid ${C.borderAccent}`, borderRadius: 8,
                      cursor: exchangeCount < 3 ? "not-allowed" : "pointer", fontFamily: FONT_BODY,
                      opacity: exchangeCount < 3 ? 0.4 : 1,
                    }}>{t.endSession}</button>
                  </>
                )}
              </div>
            </div>

            {/* Context Panel */}
            {exchangeCount === 0 && (
              <div style={{
                padding: "14px 20px", background: `${SOCRATES.gold}08`,
                borderBottom: `1px solid ${SOCRATES.border}`,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: SOCRATES.gold, marginBottom: 6 }}>{t.situation}</div>
                <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6, marginBottom: 8 }}>{scenario.situation}</div>
                <div style={{ fontSize: 10, color: C.textMuted }}>
                  <strong style={{ color: C.textSecondary }}>{t.stakeholders}:</strong> {scenario.stakeholders.join(" · ")}
                </div>
              </div>
            )}

            {/* Chat Messages */}
            <div ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
              {messages.map((m, i) => {
                if (m.role === "user") return (
                  <div key={i} style={{ alignSelf: "flex-end", maxWidth: "75%", animation: "fadeUp 0.3s" }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: C.accentPrimary, textAlign: "right", marginBottom: 3 }}>{playerName}</div>
                    <div style={{
                      padding: "10px 14px",
                      background: "rgba(99,102,241,0.08)",
                      border: `1px solid ${C.borderAccent}`,
                      borderRadius: "14px 14px 4px 14px",
                      fontSize: 13, lineHeight: 1.55, whiteSpace: "pre-wrap",
                    }}>{m.text}</div>
                  </div>
                );
                return (
                  <div key={i} style={{ alignSelf: "flex-start", maxWidth: "80%", animation: "fadeUp 0.3s" }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: SOCRATES.gold, marginBottom: 3 }}>🏛️ Socrate{lang === "en" ? "s" : ""}</div>
                    <div style={{
                      padding: "12px 16px",
                      background: SOCRATES.bg,
                      border: `1px solid ${SOCRATES.border}`,
                      borderRadius: "14px 14px 14px 4px",
                      fontSize: 13, lineHeight: 1.65, whiteSpace: "pre-wrap",
                      color: C.textPrimary,
                    }}>{m.text}</div>
                  </div>
                );
              })}
              {loading && (
                <div style={{ alignSelf: "flex-start", animation: "fadeUp 0.3s" }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: SOCRATES.gold, marginBottom: 3 }}>🏛️ Socrate{lang === "en" ? "s" : ""}</div>
                  <div style={{
                    padding: "12px 16px", background: SOCRATES.bg, border: `1px solid ${SOCRATES.border}`,
                    borderRadius: "14px 14px 14px 4px", fontSize: 13, color: C.textMuted,
                  }}>
                    <span style={{ animation: "pulse 1.5s infinite" }}>{t.socratesThinking}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            {phase === "dialogue" && (
              <div style={{
                padding: "12px 20px", borderTop: `1px solid ${C.borderSubtle}`,
                background: C.bgSecondary, display: "flex", gap: 10,
              }}>
                <input
                  ref={inputRef}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder={t.typeResponse}
                  disabled={loading}
                  style={{
                    flex: 1, padding: "12px 16px", fontSize: 14, fontFamily: FONT_BODY,
                    background: C.bgInput, color: C.textPrimary,
                    border: `1px solid ${C.borderInput}`, borderRadius: 10,
                    outline: "none",
                  }}
                />
                <button onClick={sendMessage} disabled={loading || !userInput.trim()} style={{
                  padding: "12px 22px", fontSize: 14, fontWeight: 600,
                  background: `linear-gradient(135deg, ${SOCRATES.gold}, ${SOCRATES.goldDim})`,
                  color: "#0a0a0a", border: "none", borderRadius: 10,
                  cursor: loading || !userInput.trim() ? "not-allowed" : "pointer",
                  fontFamily: FONT_DISPLAY, opacity: loading || !userInput.trim() ? 0.5 : 1,
                }}>{t.send}</button>
              </div>
            )}

            {/* Report inline after session */}
            {phase === "complete" && sessionReport && (
              <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px" }}>
                {renderReport(sessionReport)}
                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <button onClick={() => { setView("scenarios"); setPhase("dialogue"); }} style={{
                    padding: "12px 28px", fontSize: 14, fontWeight: 600,
                    background: `linear-gradient(135deg, ${SOCRATES.gold}, ${SOCRATES.goldDim})`,
                    color: "#0a0a0a", border: "none", borderRadius: 10, cursor: "pointer",
                    fontFamily: FONT_DISPLAY,
                  }}>{t.backToScenarios}</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── REPORT VIEW ── */}
        {view === "report" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "32px 28px" }}>
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 24, fontWeight: 700, marginBottom: 24 }}>📜 {t.reportTitle}</h2>
              {sessionReport ? renderReport(sessionReport) : (
                <div style={{
                  background: C.bgCard, border: `1px solid ${C.borderSubtle}`,
                  borderRadius: 16, padding: 40, textAlign: "center",
                }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🏛️</div>
                  <p style={{ color: C.textSecondary, fontSize: 14, lineHeight: 1.6 }}>{t.noReports}</p>
                  <button onClick={() => setView("scenarios")} style={{
                    marginTop: 20, padding: "10px 24px", fontSize: 13, fontWeight: 600,
                    background: `linear-gradient(135deg, ${SOCRATES.gold}, ${SOCRATES.goldDim})`,
                    color: "#0a0a0a", border: "none", borderRadius: 10, cursor: "pointer",
                    fontFamily: FONT_DISPLAY,
                  }}>{t.startJourney}</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── HISTORY VIEW ── */}
        {view === "history" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "32px 28px" }}>
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 24, fontWeight: 700, marginBottom: 24 }}>📚 {t.history}</h2>
              {allReports.length === 0 ? (
                <div style={{
                  background: C.bgCard, border: `1px solid ${C.borderSubtle}`,
                  borderRadius: 16, padding: 40, textAlign: "center",
                }}>
                  <p style={{ color: C.textSecondary, fontSize: 14 }}>{t.noReports}</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {allReports.map((r, i) => (
                    <div key={i} onClick={() => { setSessionReport(r); setView("report"); }} style={{
                      background: C.bgCard, border: `1px solid ${C.borderSubtle}`,
                      borderRadius: 12, padding: 18, cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = SOCRATES.border}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = C.borderSubtle}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 14 }}>{r.scenarioTitle}</div>
                          <div style={{ fontSize: 11, color: C.textMuted }}>{r.date} · {r.exchanges} {t.exchange.toLowerCase()}s</div>
                        </div>
                        <div style={{ display: "flex", gap: 10 }}>
                          <ScoreBadge label={lang === "fr" ? "Vertu" : "Virtue"} score={r.scoreVirtue} />
                          <ScoreBadge label={lang === "fr" ? "Raisonnement" : "Reasoning"} score={r.scoreReasoning} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  function ScoreBadge({ label, score }) {
    const color = score >= 80 ? C.accentSuccess : score >= 60 ? SOCRATES.gold : C.accentError;
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 16, fontFamily: FONT_DISPLAY, fontWeight: 700, color }}>{score}</div>
        <div style={{ fontSize: 9, color: C.textMuted }}>{label}</div>
      </div>
    );
  }

  function renderReport(r) {
    return (
      <div style={{ animation: "fadeUp 0.5s ease" }}>
        {/* Header */}
        <div style={{
          background: C.bgCard, border: `1px solid ${SOCRATES.border}`,
          borderRadius: 16, padding: 24, marginBottom: 16, textAlign: "center",
        }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🏛️</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 20, marginBottom: 4 }}>{t.sessionWith}</div>
          <div style={{ fontSize: 13, color: SOCRATES.gold }}>{r.scenarioTitle}</div>
          <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>{r.date} · {r.playerName} · {r.exchanges} exchanges</div>
        </div>

        {/* Scores */}
        <div style={{ background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 14, marginBottom: 16, color: SOCRATES.gold }}>
            {lang === "fr" ? "Évaluation Philosophique" : "Philosophical Assessment"}
          </div>
          <ScoreBar label={lang === "fr" ? "Vertu & Éthique" : "Virtue & Ethics"} score={r.scoreVirtue} color={C.accentSuccess} />
          <ScoreBar label={lang === "fr" ? "Qualité du Raisonnement" : "Reasoning Quality"} score={r.scoreReasoning} color={C.accentPrimary} />
          <ScoreBar label={lang === "fr" ? "Conscience de Soi" : "Self-Awareness"} score={r.scoreSelfAwareness} color={C.accentSecondary} />
          <ScoreBar label={lang === "fr" ? "Humilité Épistémique" : "Epistemic Humility"} score={r.scoreEpistemicHumility} color={SOCRATES.gold} />
        </div>

        {/* Socrates' Verdict */}
        <div style={{
          background: SOCRATES.bg, border: `1px solid ${SOCRATES.border}`,
          borderRadius: 16, padding: 24, marginBottom: 16,
        }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 14, marginBottom: 10, color: SOCRATES.gold }}>
            🏛️ {lang === "fr" ? "Le Verdict de Socrate" : "Socrates' Verdict"}
          </div>
          <p style={{ fontSize: 14, color: C.textPrimary, lineHeight: 1.7, fontStyle: "italic" }}>{r.socratesVerdict}</p>
        </div>

        {/* Wisdom & Insight */}
        <div style={{ background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 14, marginBottom: 10, color: C.accentPrimary }}>
            {lang === "fr" ? "Évaluation Globale" : "Overall Wisdom"}
          </div>
          <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.65 }}>{r.overallWisdom}</p>
        </div>

        {/* Strengths & Growth */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div style={{ background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 16, padding: 20 }}>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 13, marginBottom: 10, color: C.accentSuccess }}>
              ✦ {lang === "fr" ? "Forces" : "Strengths"}
            </div>
            {r.strengths?.map((s, i) => (
              <div key={i} style={{ fontSize: 12, color: C.textSecondary, padding: "5px 0", borderBottom: i < r.strengths.length - 1 ? `1px solid ${C.borderSubtle}` : "none" }}>{s}</div>
            ))}
          </div>
          <div style={{ background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 16, padding: 20 }}>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 13, marginBottom: 10, color: C.accentWarning }}>
              ↗ {lang === "fr" ? "Croissance" : "Growth Areas"}
            </div>
            {r.growthAreas?.map((g, i) => (
              <div key={i} style={{ fontSize: 12, color: C.textSecondary, padding: "5px 0", borderBottom: i < r.growthAreas.length - 1 ? `1px solid ${C.borderSubtle}` : "none" }}>{g}</div>
            ))}
          </div>
        </div>

        {/* Deepest Insight */}
        <div style={{
          background: `linear-gradient(135deg, ${SOCRATES.gold}08, ${C.accentPrimary}08)`,
          border: `1px solid ${SOCRATES.border}`,
          borderRadius: 16, padding: 24, marginBottom: 16, textAlign: "center",
        }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 13, marginBottom: 10, color: SOCRATES.gold }}>
            💡 {lang === "fr" ? "Insight Philosophique" : "Philosophical Insight"}
          </div>
          <p style={{ fontSize: 14, color: C.textPrimary, lineHeight: 1.7, fontStyle: "italic", maxWidth: 500, margin: "0 auto" }}>{r.philosophicalInsight}</p>
        </div>

        {/* Closing Question */}
        <div style={{
          background: C.bgCard, border: `1px solid ${C.accentPrimary}33`,
          borderRadius: 16, padding: 24, textAlign: "center",
        }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 13, marginBottom: 10, color: C.accentTertiary }}>
            ❓ {lang === "fr" ? "Question à Méditer" : "Question to Ponder"}
          </div>
          <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.7, fontStyle: "italic" }}>{r.closingQuestion}</p>
        </div>
      </div>
    );
  }
}
