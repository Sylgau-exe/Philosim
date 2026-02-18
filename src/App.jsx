import { useState, useRef, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════════
// BIZSIMHUB DESIGN SYSTEM
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

const SOCRATES = {
  gold: "#d4a853",
  goldDim: "#b8923e",
  bg: "rgba(212,168,83,0.06)",
  border: "rgba(212,168,83,0.22)",
  glow: "rgba(212,168,83,0.15)",
};

// ═══════════════════════════════════════════════════════
// PHASE 1 — THE PHILOSOPHY (Educational Content)
// ═══════════════════════════════════════════════════════
const PHILOSOPHY = {
  videoId: "6DGnwLTnoPY",
  pillars: [
    {
      icon: "🪞",
      title: { en: "Know Thyself", fr: "Connais-toi toi-même" },
      quote: { en: "The unexamined life is not worth living.", fr: "Une vie sans examen ne vaut pas la peine d'être vécue." },
      explanation: {
        en: "Before you can lead others or make good decisions, you must understand your own biases, motivations, and blind spots. Socrates believed self-knowledge is the foundation of all wisdom. He spent his life questioning Athenians who claimed expertise — generals about courage, politicians about justice, artists about beauty — and found that most people had never truly examined what they believed or why.",
        fr: "Avant de pouvoir diriger les autres ou prendre de bonnes décisions, vous devez comprendre vos propres préjugés, motivations et angles morts. Socrate croyait que la connaissance de soi est le fondement de toute sagesse. Il a passé sa vie à questionner les Athéniens qui se disaient experts — les généraux sur le courage, les politiciens sur la justice, les artistes sur la beauté — et a découvert que la plupart n'avaient jamais véritablement examiné ce qu'ils croyaient ni pourquoi.",
      },
      workplaceExample: {
        en: "When you feel strongly about a decision, pause and ask: Am I choosing this because it's right, or because it protects my ego? Am I promoting this idea because it serves the team, or because it was my idea?",
        fr: "Lorsque vous êtes convaincu d'une décision, faites une pause et demandez-vous : est-ce que je choisis cela parce que c'est juste, ou parce que ça protège mon ego? Est-ce que je défends cette idée parce qu'elle sert l'équipe, ou parce que c'est la mienne?",
      },
    },
    {
      icon: "❓",
      title: { en: "Question Everything", fr: "Questionnez tout" },
      quote: { en: "I know that I know nothing.", fr: "Je sais que je ne sais rien." },
      explanation: {
        en: "The Socratic Method is a form of dialogue where you ask probing questions rather than give answers. By questioning assumptions, you expose contradictions and reach deeper truths. True wisdom begins when you admit what you don't know. Socrates never claimed to be a teacher — he called himself a 'midwife of ideas,' helping others give birth to understanding they already carried within.",
        fr: "La méthode socratique est une forme de dialogue où l'on pose des questions incisives plutôt que de donner des réponses. En questionnant les hypothèses, on expose les contradictions et on atteint des vérités plus profondes. La vraie sagesse commence quand on admet ce qu'on ne sait pas. Socrate ne prétendait jamais être un enseignant — il se disait 'accoucheur d'idées', aidant les autres à donner naissance à la compréhension qu'ils portaient déjà en eux.",
      },
      workplaceExample: {
        en: "Instead of saying 'This strategy will work,' ask: 'What assumptions are we making? What would have to be true for this to fail? What are we not seeing?' The best meetings are driven by questions, not presentations.",
        fr: "Au lieu de dire 'Cette stratégie va fonctionner,' demandez : 'Quelles hypothèses faisons-nous? Que faudrait-il pour que cela échoue? Qu'est-ce que nous ne voyons pas?' Les meilleures réunions sont guidées par des questions, pas des présentations.",
      },
    },
    {
      icon: "⚖️",
      title: { en: "Virtue is Knowledge", fr: "La vertu est connaissance" },
      quote: { en: "No one does wrong willingly.", fr: "Nul ne fait le mal volontairement." },
      explanation: {
        en: "Socrates made a radical claim: if you truly understand what is good, you will do it. Bad decisions come from ignorance — not malice. A leader who cuts corners doesn't think 'I want to cause harm.' They simply haven't examined the full consequences of their choice. This means the path to better leadership isn't more rules or punishments — it's deeper understanding.",
        fr: "Socrate a fait une affirmation radicale : si vous comprenez véritablement ce qui est bien, vous le ferez. Les mauvaises décisions viennent de l'ignorance — pas de la malveillance. Un leader qui prend des raccourcis ne pense pas 'Je veux causer du tort.' Il n'a simplement pas examiné les conséquences complètes de son choix. Le chemin vers un meilleur leadership passe par une compréhension plus profonde, pas plus de règles.",
      },
      workplaceExample: {
        en: "When a team member makes a mistake, resist the urge to blame. Ask instead: What did they believe was true when they made this decision? What information were they missing? What pressure pushed them to act without thinking?",
        fr: "Quand un membre de l'équipe fait une erreur, résistez à l'envie de blâmer. Demandez plutôt : Que croyaient-ils être vrai quand ils ont pris cette décision? Quelle information leur manquait? Quelle pression les a poussés à agir sans réfléchir?",
      },
    },
    {
      icon: "🗣️",
      title: { en: "Dialectical Reasoning", fr: "Le raisonnement dialectique" },
      quote: { en: "The highest form of human excellence is to question oneself and others.", fr: "La plus haute forme d'excellence humaine est de se questionner soi-même et les autres." },
      explanation: {
        en: "Truth emerges through dialogue, not monologue. By engaging with opposing views honestly, you refine your thinking. Socrates never lectured — he conversed. He believed that when two people genuinely explore a disagreement, both end up wiser. The goal isn't to win the argument, but to find what's true. The best decisions come from the productive tension between different perspectives.",
        fr: "La vérité émerge du dialogue, pas du monologue. En s'engageant honnêtement avec des points de vue opposés, on affine sa pensée. Socrate ne donnait jamais de cours magistraux — il conversait. Il croyait que lorsque deux personnes explorent sincèrement un désaccord, les deux finissent plus sages. L'objectif n'est pas de gagner l'argument, mais de trouver ce qui est vrai.",
      },
      workplaceExample: {
        en: "In your next meeting, instead of defending your position, genuinely try to understand why someone disagrees. Ask: 'Help me understand your perspective — what am I missing?' Their objection might contain wisdom yours doesn't.",
        fr: "Dans votre prochaine réunion, au lieu de défendre votre position, essayez sincèrement de comprendre pourquoi quelqu'un n'est pas d'accord. Demandez : 'Aidez-moi à comprendre votre perspective — qu'est-ce que je ne vois pas?' Son objection pourrait contenir une sagesse que la vôtre n'a pas.",
      },
    },
    {
      icon: "🏛️",
      title: { en: "Epistemic Humility", fr: "L'humilité épistémique" },
      quote: { en: "Wisdom begins in wonder.", fr: "La sagesse commence dans l'émerveillement." },
      explanation: {
        en: "The Oracle at Delphi called Socrates the wisest man in Athens. His response? He was wise only because he knew the limits of his own knowledge, while others believed they knew more than they did. In the workplace, the most dangerous leader is the one who is certain. Certainty closes the mind. Humility opens it. The best leaders say 'I don't know yet' more often than 'I've got this figured out.'",
        fr: "L'Oracle de Delphes a déclaré Socrate l'homme le plus sage d'Athènes. Sa réponse? Il était sage uniquement parce qu'il connaissait les limites de ses propres connaissances, alors que d'autres croyaient en savoir plus qu'ils n'en savaient. Au travail, le leader le plus dangereux est celui qui est certain. La certitude ferme l'esprit. L'humilité l'ouvre. Les meilleurs leaders disent 'Je ne sais pas encore' plus souvent que 'J'ai compris.'",
      },
      workplaceExample: {
        en: "Before a major decision, list what you DON'T know. The size of that list tells you how much risk you're actually carrying. Then ask: who in this room knows what I don't?",
        fr: "Avant une décision majeure, listez ce que vous NE SAVEZ PAS. La taille de cette liste vous indique le niveau de risque réel que vous portez. Puis demandez : qui dans cette salle sait ce que je ne sais pas?",
      },
    },
  ],
};

// ═══════════════════════════════════════════════════════
// PHASE 2 — THE CHECK (Understanding Assessment)
// ═══════════════════════════════════════════════════════
const CHECK_QUESTIONS = {
  en: [
    {
      question: "A CEO tells you: 'I've been in this industry 30 years. I know exactly what will happen next.' What would Socrates say?",
      options: [
        { text: "He should trust his experience — 30 years is valuable.", score: 1 },
        { text: "Certainty is dangerous. 30 years could mean 30 years of unchallenged assumptions.", score: 3 },
        { text: "He should validate his instincts with more market research.", score: 2 },
        { text: "Experience doesn't matter in a world that changes every day.", score: 1 },
      ],
      insight: "Socrates would question the certainty itself. The wisest response applies Epistemic Humility — 30 years of experience can also mean 30 years of assumptions that have never been examined. The Socratic leader asks: 'What has changed that my experience hasn't accounted for?'",
      pillar: "Epistemic Humility",
    },
    {
      question: "Your team is split 50/50 on a major strategy. You're the tiebreaker. What's the Socratic approach?",
      options: [
        { text: "Go with your gut — someone has to decide.", score: 1 },
        { text: "Vote democratically and move on.", score: 1 },
        { text: "Ask each side: 'What would have to be true for the other side to be right?'", score: 3 },
        { text: "Bring in an external consultant for an unbiased opinion.", score: 2 },
      ],
      insight: "This is Dialectical Reasoning in action. Socrates believed truth often lives between opposing positions. By asking each side to genuinely consider the other's perspective, you create the conditions for a wiser decision to emerge from the tension — not from authority or majority.",
      pillar: "Dialectical Reasoning",
    },
    {
      question: "An employee makes a costly mistake that loses a major client. What would a Socratic leader do first?",
      options: [
        { text: "Document the error and issue a formal warning.", score: 1 },
        { text: "Ask: 'Walk me through your thinking when you made this decision.'", score: 3 },
        { text: "Reassure them that mistakes happen and move on.", score: 1 },
        { text: "Review the process to build safeguards against future errors.", score: 2 },
      ],
      insight: "This applies 'Virtue is Knowledge' — no one does wrong willingly. Socrates would explore their reasoning because mistakes come from flawed understanding, not bad intentions. By uncovering what they believed was true, you find the real gap: was it missing information? Wrong assumptions? Pressure to act without thinking?",
      pillar: "Virtue is Knowledge",
    },
    {
      question: "You're about to approve a deal that benefits the company significantly but will harm a smaller partner. What question would Socrates ask you?",
      options: [
        { text: "'Will this maximize shareholder value?'", score: 1 },
        { text: "'Is this legal and within company policy?'", score: 1 },
        { text: "'If you were the partner being harmed, would you still call this decision just?'", score: 3 },
        { text: "'Have you consulted all the relevant stakeholders?'", score: 2 },
      ],
      insight: "Socrates applied 'Know Thyself' to every ethical decision — by forcing you to examine the situation from the perspective of the one being harmed, he exposes whether your reasoning is truly just or merely self-serving. Legality is the floor, not the ceiling, of ethical leadership.",
      pillar: "Know Thyself",
    },
  ],
  fr: [
    {
      question: "Un PDG vous dit : 'Je suis dans cette industrie depuis 30 ans. Je sais exactement ce qui va se passer.' Que dirait Socrate?",
      options: [
        { text: "Il devrait faire confiance à son expérience — 30 ans, c'est précieux.", score: 1 },
        { text: "La certitude est dangereuse. 30 ans pourraient signifier 30 ans d'hypothèses jamais remises en question.", score: 3 },
        { text: "Il devrait valider ses instincts avec plus de recherche de marché.", score: 2 },
        { text: "L'expérience ne compte plus dans un monde qui change chaque jour.", score: 1 },
      ],
      insight: "Socrate questionnerait la certitude elle-même. Cela applique l'Humilité Épistémique — 30 ans d'expérience peuvent aussi signifier 30 ans d'hypothèses jamais examinées. Le leader socratique demande : 'Qu'est-ce qui a changé que mon expérience n'a pas pris en compte?'",
      pillar: "L'humilité épistémique",
    },
    {
      question: "Votre équipe est divisée 50/50 sur une stratégie majeure. Vous devez trancher. Quelle est l'approche socratique?",
      options: [
        { text: "Suivre votre instinct — quelqu'un doit décider.", score: 1 },
        { text: "Voter démocratiquement et avancer.", score: 1 },
        { text: "Demander à chaque camp : 'Que faudrait-il pour que l'autre côté ait raison?'", score: 3 },
        { text: "Faire appel à un consultant externe pour une opinion impartiale.", score: 2 },
      ],
      insight: "C'est le Raisonnement Dialectique en action. Socrate croyait que la vérité vit souvent entre les positions opposées. En demandant à chaque camp de considérer sincèrement l'autre perspective, vous créez les conditions pour qu'une décision plus sage émerge de la tension.",
      pillar: "Le raisonnement dialectique",
    },
    {
      question: "Un employé fait une erreur coûteuse qui fait perdre un client majeur. Que ferait un leader socratique en premier?",
      options: [
        { text: "Documenter l'erreur et émettre un avertissement formel.", score: 1 },
        { text: "Demander : 'Guidez-moi à travers votre raisonnement quand vous avez pris cette décision.'", score: 3 },
        { text: "Le rassurer que les erreurs arrivent et passer à autre chose.", score: 1 },
        { text: "Revoir le processus pour créer des garde-fous contre les erreurs futures.", score: 2 },
      ],
      insight: "Cela applique 'La Vertu est Connaissance' — nul ne fait le mal volontairement. Socrate explorerait leur raisonnement parce que les erreurs viennent d'une compréhension imparfaite, pas de mauvaises intentions.",
      pillar: "La vertu est connaissance",
    },
    {
      question: "Vous êtes sur le point d'approuver un accord très profitable pour l'entreprise mais qui nuira à un partenaire plus petit. Quelle question Socrate vous poserait-il?",
      options: [
        { text: "'Cela va-t-il maximiser la valeur pour les actionnaires?'", score: 1 },
        { text: "'Est-ce légal et conforme à la politique de l'entreprise?'", score: 1 },
        { text: "'Si vous étiez le partenaire lésé, appelleriez-vous toujours cette décision juste?'", score: 3 },
        { text: "'Avez-vous consulté toutes les parties prenantes concernées?'", score: 2 },
      ],
      insight: "Socrate appliquait 'Connais-toi toi-même' à chaque décision éthique — en vous forçant à examiner la situation du point de vue de celui qui est lésé, il expose si votre raisonnement est vraiment juste ou simplement intéressé.",
      pillar: "Connais-toi toi-même",
    },
  ],
};

// ═══════════════════════════════════════════════════════
// PHASE 3 — SCENARIOS (Apply the Philosophy)
// ═══════════════════════════════════════════════════════
const SCENARIOS = [
  {
    id: "ethical_dilemma", icon: "⚖️", title: "The Ethical Dilemma",
    subtitle: "Your company wants to cut corners on quality to meet quarterly targets",
    category: "Ethics", difficulty: "Beginner", diffColor: "#10b981", duration: "12–18 min",
    skills: ["Ethical reasoning", "Questioning assumptions", "Virtue vs. profit"],
    situation: "You're a Product Director at a mid-size tech company. The CEO has asked you to ship a product you know has unresolved bugs to meet the quarterly revenue target. The sales team has already promised delivery to 3 major clients. Your engineering lead says it needs 3 more weeks. The board meeting is in 5 days.",
    stakeholders: ["CEO (pushing to ship)", "Engineering Lead (wants delay)", "Sales VP (promised clients)", "You (must decide)"],
    philosophicalTheme: "Virtue Ethics — What does the virtuous person do when pressured to compromise quality?",
    pillarsUsed: ["Know Thyself", "Virtue is Knowledge"],
    socratesOpener: "Ah, a most interesting predicament. Tell me — when you say the product has 'unresolved bugs,' what precisely do you mean? Are these minor imperfections, or do they touch the very essence of what the product promises to deliver? Before we decide what to do, let us first understand what we truly know.",
  },
  {
    id: "leadership_conflict", icon: "🏛️", title: "The Leadership Question",
    subtitle: "Two qualified candidates for promotion — only one slot. One is your friend.",
    category: "Justice", difficulty: "Intermediate", diffColor: "#f59e0b", duration: "15–20 min",
    skills: ["Justice & fairness", "Self-examination", "Bias awareness"],
    situation: "You manage a department of 25 people. There's one Senior Director position opening up. Two candidates stand out: Alex, who has been your close friend for 8 years and has solid performance, and Jordan, who joined 2 years ago but has delivered exceptional results including a project that saved the company $2M. HR says both are qualified. Your recommendation will be decisive.",
    stakeholders: ["Alex (your friend, solid performer)", "Jordan (newer, exceptional results)", "HR Director (wants fairness)", "Your team (watching closely)"],
    philosophicalTheme: "Justice — Can you truly separate personal loyalty from professional judgment?",
    pillarsUsed: ["Know Thyself", "Dialectical Reasoning"],
    socratesOpener: "How fascinating. You say both are 'qualified,' yet you must choose one. Tell me this — when you think of the word 'fairness,' what image comes to your mind? Is it giving each person what they deserve? Or is it something else entirely? And how can you know what each person deserves if you have not first examined what clouds your own judgment?",
  },
  {
    id: "innovation_risk", icon: "🔥", title: "The Innovation Paradox",
    subtitle: "A bold pivot could save the company — or destroy it. Nobody agrees.",
    category: "Knowledge", difficulty: "Advanced", diffColor: "#ef4444", duration: "18–25 min",
    skills: ["Epistemic humility", "Dialectical reasoning", "Decision under uncertainty"],
    situation: "Your company's core product is declining 15% year-over-year. You've identified an AI-powered pivot that could leapfrog competitors, but it requires $4M investment and 18 months. The CFO says the company has 24 months of runway. The CTO is excited but admits the technology is unproven. The board is split 50/50.",
    stakeholders: ["CFO (risk-averse)", "CTO (excited but honest)", "Board (divided)", "Employees (anxious)"],
    philosophicalTheme: "Epistemology — How do you decide when you cannot know the outcome?",
    pillarsUsed: ["Epistemic Humility", "Question Everything"],
    socratesOpener: "So you stand at a crossroads where all paths are shrouded in fog. Before we discuss what you should do, I must ask you something that may seem strange: What do you actually know? Not what you believe, not what you hope, not what the data suggests — what do you truly know with certainty? Let us begin there, and see what remains.",
  },
  {
    id: "team_purpose", icon: "🧭", title: "The Meaning Crisis",
    subtitle: "Your best people are leaving. Salaries are competitive. Something deeper is wrong.",
    category: "Purpose", difficulty: "Intermediate", diffColor: "#f59e0b", duration: "15–20 min",
    skills: ["Examined life", "Purpose & meaning", "Authentic leadership"],
    situation: "In the past 6 months, 4 of your top 10 performers have resigned. Exit interviews mention 'lack of growth,' 'no clear mission,' and 'feeling like a cog.' Your company pays above market rate. Benefits are strong. Your engagement survey scores dropped from 78 to 61. The CEO wants a retention plan by Friday.",
    stakeholders: ["Departing employees (seeking meaning)", "CEO (wants quick fix)", "HR (proposing more perks)", "Remaining team (morale dropping)"],
    philosophicalTheme: "The Examined Life — Does the unexamined workplace drive people away?",
    pillarsUsed: ["Know Thyself", "Question Everything"],
    socratesOpener: "They leave despite generous compensation. How curious — and yet, how predictable. Tell me, when you yourself wake each morning and prepare for work, what is it that pulls you forward? Is it the salary? Or is it something else? If you cannot answer this question for yourself, how can you hope to answer it for those who have chosen to leave?",
  },
];

const FUTURE_MENTORS = [
  { emoji: "🎬", name: "Quentin Tarantino", field: "Creative Direction", tagline: "Break every rule — with purpose" },
  { emoji: "🇺🇸", name: "Barack Obama", field: "Leadership", tagline: "Lead with calm, decide with conviction" },
  { emoji: "🎵", name: "Quincy Jones", field: "Collaboration", tagline: "Orchestrate greatness from diverse talent" },
  { emoji: "👗", name: "Coco Chanel", field: "Brand & Innovation", tagline: "Elegance is refusal" },
  { emoji: "🚀", name: "Elon Musk", field: "Disruption", tagline: "First principles over consensus" },
  { emoji: "📐", name: "Leonardo da Vinci", field: "Cross-Disciplinary", tagline: "Curiosity is the mother of invention" },
];

// ═══════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════
export default function PhiloSim() {
  const [view, setView] = useState("welcome");
  const [playerName, setPlayerName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [scenario, setScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [exchangeCount, setExchangeCount] = useState(0);
  const [phase, setPhase] = useState("dialogue");
  const [decisions, setDecisions] = useState([]);
  const [sessionReport, setSessionReport] = useState(null);
  const [allReports, setAllReports] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [lang, setLang] = useState("en");
  const [learnStep, setLearnStep] = useState(0);
  const [checkStep, setCheckStep] = useState(0);
  const [checkAnswers, setCheckAnswers] = useState([]);
  const [checkComplete, setCheckComplete] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showInsight, setShowInsight] = useState(false);

  const chatRef = useRef(null);
  const inputRef = useRef(null);
  const MAX_EXCHANGES = 12;

  const T = {
    en: {
      brand: "PhiloSim", tagline: "Approach your work like", mentorName: "Socrates",
      welcome: "Welcome", learn: "The Philosophy", check: "Understanding", scenarios: "Apply It",
      activeSession: "Active Session", report: "Report", history: "History",
      startJourney: "Begin Your Journey", enterName: "Enter your name to begin...", start: "Start",
      p1: "PHASE 1", p2: "PHASE 2", p3: "PHASE 3",
      p1t: "The Philosophy", p1s: "Understand how Socrates thought",
      p2t: "Do You Get It?", p2s: "Test your understanding",
      p3t: "Now Apply It", p3s: "Face real dilemmas under pressure",
      watchVideo: "Watch: Who Was Socrates?",
      videoNote: "This 20-minute documentary sets the stage. Understand the man, his method, and why his ideas still matter 2,400 years later. Then explore the 5 pillars that define his philosophy.",
      nextPillar: "Next Pillar →", prevPillar: "← Previous", startCheck: "I'm Ready — Test My Understanding →",
      of: "of", workAt: "💼 At Work", thePhilosophy: "The Philosophy",
      confirmAnswer: "Confirm", nextQuestion: "Next Question →", seeResults: "See My Results →",
      yourScore: "Your Socratic Readiness",
      readyToApply: "Enter the Simulation →",
      scoreHigh: "Excellent! You grasp the Socratic mindset. Now let's see if you can apply it when it actually matters — under pressure, with real stakes.",
      scoreMid: "Good foundation — you understand the theory. The simulation will reveal the gap between knowing Socrates' philosophy and living it.",
      scoreLow: "You're thinking the way most people do — conventionally. That's exactly why Socrates will push you. The simulation will show you where your assumptions hide.",
      selectScenario: "Choose Your Challenge",
      selectScenarioSub: "Each scenario is a real workplace dilemma. You just learned how Socrates thinks. Now prove you can think like him when it counts.",
      begin: "Begin Dialogue", difficulty: "Difficulty", duration: "Duration",
      skills: "Skills explored", theme: "Philosophical theme", pillarsUsed: "Pillars in play",
      situation: "The Situation", stakeholders: "Key Stakeholders",
      typeResponse: "Share your thoughts with Socrates...", send: "Send", exchange: "Exchange",
      requestReflection: "🪞 Philosophical Mirror", endSession: "📜 End & Get Wisdom",
      socratesThinking: "Socrates is contemplating...",
      reportTitle: "Philosophical Report", sessionWith: "Session with Socrates",
      noReports: "No sessions completed yet. Complete the 3 phases to receive your first philosophical report.",
      backToScenarios: "← New Dialogue", comingSoon: "Coming Soon",
      futureTitle: "The Mentorship Collection", futureSub: "Same 3-phase framework. Different legendary minds.",
      socratesInsight: "Socrates' Insight", pillar: "Pillar", socratic: "✓ Socratic",
      questionLabel: "Question",
    },
    fr: {
      brand: "PhiloSim", tagline: "Abordez votre travail comme", mentorName: "Socrate",
      welcome: "Bienvenue", learn: "La Philosophie", check: "Compréhension", scenarios: "Appliquer",
      activeSession: "Session Active", report: "Rapport", history: "Historique",
      startJourney: "Commencez Votre Parcours", enterName: "Entrez votre nom...", start: "Commencer",
      p1: "PHASE 1", p2: "PHASE 2", p3: "PHASE 3",
      p1t: "La Philosophie", p1s: "Comprendre comment Socrate pensait",
      p2t: "Avez-vous compris?", p2s: "Testez votre compréhension",
      p3t: "Appliquez-la", p3s: "Faites face à de vrais dilemmes",
      watchVideo: "Regarder : Qui était Socrate?",
      videoNote: "Ce documentaire de 20 minutes pose les bases. Comprenez l'homme, sa méthode, et pourquoi ses idées comptent encore 2 400 ans plus tard. Ensuite explorez les 5 piliers de sa philosophie.",
      nextPillar: "Pilier suivant →", prevPillar: "← Précédent", startCheck: "Je suis prêt — Testez-moi →",
      of: "de", workAt: "💼 Au travail", thePhilosophy: "La Philosophie",
      confirmAnswer: "Confirmer", nextQuestion: "Question suivante →", seeResults: "Voir mes résultats →",
      yourScore: "Votre Préparation Socratique",
      readyToApply: "Entrer dans la Simulation →",
      scoreHigh: "Excellent! Vous saisissez l'esprit socratique. Voyons si vous pouvez l'appliquer quand ça compte — sous pression, avec de vrais enjeux.",
      scoreMid: "Bonne base — vous comprenez la théorie. La simulation révélera l'écart entre connaître la philosophie de Socrate et la vivre.",
      scoreLow: "Vous pensez comme la plupart des gens — de façon conventionnelle. C'est exactement pourquoi Socrate va vous pousser.",
      selectScenario: "Choisissez Votre Défi",
      selectScenarioSub: "Chaque scénario est un vrai dilemme professionnel. Vous venez d'apprendre comment Socrate pense. Prouvez que vous pouvez penser comme lui quand ça compte.",
      begin: "Commencer", difficulty: "Difficulté", duration: "Durée",
      skills: "Compétences", theme: "Thème philosophique", pillarsUsed: "Piliers en jeu",
      situation: "La Situation", stakeholders: "Parties Prenantes",
      typeResponse: "Partagez vos réflexions avec Socrate...", send: "Envoyer", exchange: "Échange",
      requestReflection: "🪞 Miroir Philosophique", endSession: "📜 Terminer & Sagesse",
      socratesThinking: "Socrate réfléchit...",
      reportTitle: "Rapport Philosophique", sessionWith: "Session avec Socrate",
      noReports: "Aucune session complétée.", backToScenarios: "← Nouveau Dialogue",
      comingSoon: "Bientôt", futureTitle: "La Collection de Mentorat", futureSub: "Même cadre en 3 phases. Des esprits légendaires différents.",
      socratesInsight: "Éclairage de Socrate", pillar: "Pilier", socratic: "✓ Socratique",
      questionLabel: "Question",
    },
  };
  const t = T[lang];

  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [messages, loading]);

  // ── API ──
  const callSocrates = useCallback(async (msgs, systemOverride) => {
    const systemPrompt = systemOverride || `You are Socrates, the philosopher of Athens (470-399 BC), serving as a philosophical advisor in PhiloSim.

CRITICAL CONTEXT: The participant ${playerName} has just completed a learning phase where they studied your 5 philosophical pillars (Know Thyself, Question Everything, Virtue is Knowledge, Dialectical Reasoning, Epistemic Humility) and passed an understanding check. They now claim to understand your philosophy. Your job is to test whether they can APPLY it under pressure.

YOUR METHOD: Use the Socratic Method exclusively. Teach through QUESTIONS, not answers. Never give direct advice. Challenge assumptions, expose contradictions, make them uncomfortable when they fall back on conventional thinking. When they give a good Socratic answer, acknowledge it briefly then push deeper. When they give a conventional answer, gently expose why it falls short of the philosophy they claim to understand.

REFERENCE THE PILLARS: When relevant, connect their answers back to the specific pillars they learned. E.g., "You speak of fairness, yet you have not applied 'Know Thyself' — have you examined your own bias here?"

Keep responses 3-5 sentences. Always end with a penetrating question.

SCENARIO: ${scenario?.title} | ${scenario?.situation} | Theme: ${scenario?.philosophicalTheme}
Stakeholders: ${scenario?.stakeholders?.join(", ")}
LANGUAGE: ${lang === "fr" ? "Respond in French." : "Respond in English."}`;

    try {
      const response = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: systemPrompt, messages: msgs.map((m) => ({ role: m.role === "user" ? "user" : "assistant", content: m.text })) }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      return data.text || "...";
    } catch (e) {
      return lang === "fr" ? "Pardonnez-moi, mes pensées se sont égarées. Pourriez-vous reformuler?" : "Forgive me, my thoughts have wandered. Could you rephrase?";
    }
  }, [scenario, playerName, lang]);

  const sendMessage = async () => {
    if (!userInput.trim() || loading) return;
    const userMsg = { role: "user", text: userInput.trim() };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs); setUserInput(""); setLoading(true); setExchangeCount((c) => c + 1);
    const reply = await callSocrates(newMsgs);
    setMessages([...newMsgs, { role: "socrates", text: reply }]); setLoading(false);
    setDecisions((d) => [...d, { question: userMsg.text, exchange: exchangeCount + 1 }]);
    inputRef.current?.focus();
  };

  const endSession = async () => {
    setLoading(true); setPhase("complete");
    const reportPrompt = `Based on our entire dialogue, generate a philosophical assessment report for ${playerName}. They studied 5 Socratic pillars before this simulation. Evaluate how well they APPLIED them.

FORMAT AS JSON (no markdown, no backticks):
{"overallWisdom":"2 sentences on their philosophical growth","socratesVerdict":"2 sentences as Socrates would say it","strengths":["s1","s2","s3"],"growthAreas":["g1","g2"],"philosophicalInsight":"1-2 sentences connecting their performance to the pillars they studied","scoreVirtue":75,"scoreReasoning":80,"scoreSelfAwareness":70,"scoreEpistemicHumility":65,"pillarGaps":["which pillars they struggled to apply"],"closingQuestion":"one final question for continued reflection"}
LANGUAGE: ${lang === "fr" ? "French" : "English"}. Scores 0-100.`;
    const allMsgs = [...messages, { role: "user", text: reportPrompt }];
    const raw = await callSocrates(allMsgs, "You are a philosophical assessment engine. Respond ONLY with valid JSON.");
    try {
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      const report = { ...parsed, scenarioTitle: scenario.title, scenarioId: scenario.id, exchanges: exchangeCount, date: new Date().toLocaleDateString(), playerName, checkScore: checkPct };
      setSessionReport(report); setAllReports((prev) => [report, ...prev]);
    } catch {
      const fb = { overallWisdom: "The dialogue revealed a mind in motion.", socratesVerdict: "You have begun the journey, though much remains unexamined.", strengths: ["Engagement", "Willingness to explore"], growthAreas: ["Deeper self-examination", "Challenging own assumptions"], philosophicalInsight: "Understanding philosophy and applying it under pressure are very different skills.", scoreVirtue: 68, scoreReasoning: 65, scoreSelfAwareness: 62, scoreEpistemicHumility: 60, pillarGaps: ["Epistemic Humility"], closingQuestion: "What will you examine tomorrow that you ignored today?", scenarioTitle: scenario.title, scenarioId: scenario.id, exchanges: exchangeCount, date: new Date().toLocaleDateString(), playerName, checkScore: checkPct };
      setSessionReport(fb); setAllReports((prev) => [fb, ...prev]);
    }
    setLoading(false);
  };

  const requestReflection = async () => {
    if (loading) return; setLoading(true);
    const reflectPrompt = `Pause and offer a philosophical mirror. Reference the specific pillars ${playerName} studied: (1) Know Thyself (2) Question Everything (3) Virtue is Knowledge (4) Dialectical Reasoning (5) Epistemic Humility. Which pillars are they applying well? Which are they ignoring? Name one assumption they haven't questioned. 3-4 sentences. ${lang === "fr" ? "En français." : ""}`;
    const reply = await callSocrates([...messages, { role: "user", text: reflectPrompt }]);
    setMessages([...messages, { role: "socrates", text: `🪞 ${reply}` }]); setLoading(false);
  };

  const startScenario = (sc) => {
    setScenario(sc); setMessages([{ role: "socrates", text: sc.socratesOpener }]);
    setExchangeCount(0); setDecisions([]); setSessionReport(null); setPhase("dialogue"); setView("play");
  };

  const confirmCheckAnswer = () => {
    if (selectedOption === null) return;
    const q = CHECK_QUESTIONS[lang][checkStep];
    setCheckAnswers([...checkAnswers, { questionIdx: checkStep, optionIdx: selectedOption, score: q.options[selectedOption].score }]);
    setShowInsight(true);
  };

  const nextCheckQuestion = () => {
    setSelectedOption(null); setShowInsight(false);
    if (checkStep < CHECK_QUESTIONS[lang].length - 1) setCheckStep(checkStep + 1);
    else setCheckComplete(true);
  };

  const totalCheckScore = checkAnswers.reduce((s, a) => s + a.score, 0);
  const maxCheckScore = CHECK_QUESTIONS[lang].length * 3;
  const checkPct = Math.round((totalCheckScore / maxCheckScore) * 100);
  const pct = Math.round((exchangeCount / MAX_EXCHANGES) * 100);

  const currentJourneyIdx = view === "learn" ? 0 : view === "check" ? 1 : (view === "scenarios" || view === "play") ? 2 : -1;
  const journeySteps = [
    { id: "learn", label: t.p1, title: t.p1t, icon: "📖" },
    { id: "check", label: t.p2, title: t.p2t, icon: "🧠" },
    { id: "scenarios", label: t.p3, title: t.p3t, icon: "⚡" },
  ];

  const ScoreBar = ({ label, score, color }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 15, color: C.textSecondary, fontFamily: FONT_BODY }}>{label}</span>
        <span style={{ fontSize: 15, fontWeight: 700, color, fontFamily: FONT_DISPLAY }}>{score}/100</span>
      </div>
      <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3 }}>
        <div style={{ width: `${score}%`, height: "100%", background: color, borderRadius: 3, transition: "width 1s ease" }} />
      </div>
    </div>
  );

  const renderReport = (r) => (
    <div style={{ animation: "fadeUp 0.5s ease" }}>
      <div style={{ background: C.bgCard, border: `1px solid ${SOCRATES.border}`, borderRadius: 16, padding: 24, marginBottom: 16, textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🏛️</div>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 24, marginBottom: 4 }}>{t.sessionWith}</div>
        <div style={{ fontSize: 16, color: SOCRATES.gold }}>{r.scenarioTitle}</div>
        <div style={{ fontSize: 14, color: C.textMuted, marginTop: 4 }}>{r.date} · {r.playerName} · {r.exchanges} exchanges</div>
        {r.checkScore && <div style={{ fontSize: 13, color: C.accentPrimary, marginTop: 4 }}>Phase 2 Score: {r.checkScore}%</div>}
      </div>
      <div style={{ background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 16, padding: 24, marginBottom: 16 }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 17, marginBottom: 16, color: SOCRATES.gold }}>{lang === "fr" ? "Évaluation" : "Assessment"}</div>
        <ScoreBar label={lang === "fr" ? "Vertu & Éthique" : "Virtue & Ethics"} score={r.scoreVirtue} color={C.accentSuccess} />
        <ScoreBar label={lang === "fr" ? "Raisonnement" : "Reasoning"} score={r.scoreReasoning} color={C.accentPrimary} />
        <ScoreBar label={lang === "fr" ? "Conscience de Soi" : "Self-Awareness"} score={r.scoreSelfAwareness} color={C.accentSecondary} />
        <ScoreBar label={lang === "fr" ? "Humilité Épistémique" : "Epistemic Humility"} score={r.scoreEpistemicHumility} color={SOCRATES.gold} />
      </div>
      <div style={{ background: SOCRATES.bg, border: `1px solid ${SOCRATES.border}`, borderRadius: 16, padding: 24, marginBottom: 16 }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 17, marginBottom: 10, color: SOCRATES.gold }}>🏛️ {lang === "fr" ? "Verdict de Socrate" : "Socrates' Verdict"}</div>
        <p style={{ fontSize: 17, color: C.textPrimary, lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>{r.socratesVerdict}</p>
      </div>
      <div style={{ background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 16, padding: 24, marginBottom: 16 }}>
        <p style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.65, margin: 0 }}>{r.overallWisdom}</p>
      </div>
      {r.pillarGaps && r.pillarGaps.length > 0 && (
        <div style={{ background: `${C.accentWarning}08`, border: `1px solid ${C.accentWarning}22`, borderRadius: 16, padding: 20, marginBottom: 16 }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 15, marginBottom: 8, color: C.accentWarning }}>📖 {lang === "fr" ? "Piliers à Revisiter" : "Pillars to Revisit"}</div>
          <div style={{ fontSize: 14, color: C.textSecondary }}>{r.pillarGaps.join(", ")}</div>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div style={{ background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 16, padding: 20 }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 15, marginBottom: 10, color: C.accentSuccess }}>✦ {lang === "fr" ? "Forces" : "Strengths"}</div>
          {r.strengths?.map((s, i) => (<div key={i} style={{ fontSize: 14, color: C.textSecondary, padding: "4px 0" }}>{s}</div>))}
        </div>
        <div style={{ background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 16, padding: 20 }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 15, marginBottom: 10, color: C.accentWarning }}>↗ {lang === "fr" ? "Croissance" : "Growth"}</div>
          {r.growthAreas?.map((g, i) => (<div key={i} style={{ fontSize: 14, color: C.textSecondary, padding: "4px 0" }}>{g}</div>))}
        </div>
      </div>
      <div style={{ background: `linear-gradient(135deg, ${SOCRATES.gold}08, ${C.accentPrimary}08)`, border: `1px solid ${SOCRATES.border}`, borderRadius: 16, padding: 24, marginBottom: 16, textAlign: "center" }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 15, marginBottom: 10, color: SOCRATES.gold }}>💡 Insight</div>
        <p style={{ fontSize: 16, color: C.textPrimary, lineHeight: 1.7, fontStyle: "italic", maxWidth: 500, margin: "0 auto" }}>{r.philosophicalInsight}</p>
      </div>
      <div style={{ background: C.bgCard, border: `1px solid ${C.accentPrimary}33`, borderRadius: 16, padding: 24, textAlign: "center" }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 15, marginBottom: 10, color: C.accentTertiary }}>❓ {lang === "fr" ? "Question à Méditer" : "Question to Ponder"}</div>
        <p style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>{r.closingQuestion}</p>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: FONT_BODY, background: C.bgPrimary, color: C.textPrimary, height: "100vh", display: "flex", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        ::selection { background: ${SOCRATES.gold}44; color: white; }
      `}</style>

      {/* ═══ SIDEBAR ═══ */}
      <div style={{ width: sidebarCollapsed ? 60 : 240, minWidth: sidebarCollapsed ? 60 : 240, background: C.bgSecondary, borderRight: `1px solid ${C.borderSubtle}`, display: "flex", flexDirection: "column", transition: "all 0.3s", overflow: "hidden" }}>
        <div style={{ padding: sidebarCollapsed ? "16px 8px" : "20px 18px", borderBottom: `1px solid ${C.borderSubtle}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${SOCRATES.gold}, ${SOCRATES.goldDim})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🏛️</div>
            {!sidebarCollapsed && <div>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 22, letterSpacing: "-0.02em" }}>{t.brand}</div>
              <div style={{ fontSize: 11, color: SOCRATES.gold, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>{t.tagline} {t.mentorName}</div>
            </div>}
          </div>
        </div>

        {!sidebarCollapsed && <div style={{ padding: "10px 18px 0", display: "flex", gap: 4 }}>
          {["en", "fr"].map((l) => (
            <button key={l} onClick={() => setLang(l)} style={{ flex: 1, padding: "5px 0", fontSize: 13, fontWeight: lang === l ? 700 : 400, background: lang === l ? "rgba(212,168,83,0.12)" : "transparent", color: lang === l ? SOCRATES.gold : C.textMuted, border: `1px solid ${lang === l ? SOCRATES.border : "transparent"}`, borderRadius: 6, cursor: "pointer", fontFamily: FONT_BODY }}>{l.toUpperCase()}</button>
          ))}
        </div>}

        <nav style={{ padding: "12px 8px", flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {[
            { id: "welcome", icon: "🏠", label: t.welcome },
            { id: "learn", icon: "📖", label: t.learn, badge: t.p1 },
            { id: "check", icon: "🧠", label: t.check, badge: t.p2 },
            { id: "scenarios", icon: "⚡", label: t.scenarios, badge: t.p3 },
            ...(phase !== "complete" && view === "play" ? [{ id: "play", icon: "💬", label: t.activeSession }] : []),
            { id: "report", icon: "📜", label: t.report },
            { id: "history", icon: "📚", label: t.history },
          ].map((item) => (
            <button key={item.id} onClick={() => setView(item.id)} style={{
              display: "flex", alignItems: "center", gap: 10, padding: sidebarCollapsed ? "10px 0" : "10px 12px",
              justifyContent: sidebarCollapsed ? "center" : "flex-start",
              background: view === item.id ? "rgba(212,168,83,0.1)" : "transparent",
              color: view === item.id ? SOCRATES.gold : C.textSecondary,
              border: "none", borderRadius: 8, cursor: "pointer", fontFamily: FONT_BODY, fontSize: 16, fontWeight: view === item.id ? 600 : 400, transition: "all 0.2s", width: "100%", textAlign: "left",
            }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
              {!sidebarCollapsed && <span>{item.label}</span>}
              {!sidebarCollapsed && item.badge && <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, color: C.textMuted, background: "rgba(255,255,255,0.05)", padding: "2px 6px", borderRadius: 4 }}>{item.badge}</span>}
            </button>
          ))}
        </nav>

        <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} style={{ padding: 12, background: "transparent", border: "none", borderTop: `1px solid ${C.borderSubtle}`, cursor: "pointer", color: C.textMuted, fontSize: 16 }}>
          {sidebarCollapsed ? "→" : "←"}{!sidebarCollapsed && <span style={{ fontSize: 13, marginLeft: 4 }}>Collapse</span>}
        </button>
      </div>

      {/* ═══ MAIN ═══ */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>

        {/* Journey Progress Bar */}
        {currentJourneyIdx >= 0 && (
          <div style={{ padding: "14px 28px", borderBottom: `1px solid ${C.borderSubtle}`, background: C.bgSecondary, display: "flex", gap: 0, alignItems: "center" }}>
            {journeySteps.map((step, i) => (
              <div key={step.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div onClick={() => setView(step.id)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", opacity: i <= currentJourneyIdx ? 1 : 0.35, transition: "all 0.3s" }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                    background: i === currentJourneyIdx ? `linear-gradient(135deg, ${SOCRATES.gold}, ${SOCRATES.goldDim})` : i < currentJourneyIdx ? C.accentSuccess + "22" : "rgba(255,255,255,0.05)",
                    color: i === currentJourneyIdx ? "#0a0a0a" : i < currentJourneyIdx ? C.accentSuccess : C.textMuted,
                    border: i < currentJourneyIdx ? `2px solid ${C.accentSuccess}` : "none", fontWeight: 700,
                  }}>{i < currentJourneyIdx ? "✓" : step.icon}</div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: i === currentJourneyIdx ? SOCRATES.gold : C.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{step.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: i === currentJourneyIdx ? C.textPrimary : C.textMuted }}>{step.title}</div>
                  </div>
                </div>
                {i < journeySteps.length - 1 && <div style={{ flex: 1, height: 2, background: i < currentJourneyIdx ? C.accentSuccess + "44" : "rgba(255,255,255,0.06)", margin: "0 16px", borderRadius: 1 }} />}
              </div>
            ))}
          </div>
        )}

        {/* ═══ WELCOME ═══ */}
        {view === "welcome" && (
          <div style={{ flex: 1, overflowY: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ maxWidth: 620, padding: 40, textAlign: "center", animation: "fadeUp 0.6s ease" }}>
              <div style={{ width: 100, height: 100, borderRadius: "50%", margin: "0 auto 24px", background: `linear-gradient(135deg, ${SOCRATES.gold}22, ${SOCRATES.goldDim}11)`, border: `2px solid ${SOCRATES.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, boxShadow: `0 0 40px ${SOCRATES.glow}` }}>🏛️</div>
              <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 48, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.03em" }}>{t.brand}</h1>
              <div style={{ fontSize: 19, fontWeight: 500, color: SOCRATES.gold, marginBottom: 16, letterSpacing: "0.06em", textTransform: "uppercase" }}>{t.tagline} {t.mentorName}</div>
              <p style={{ fontSize: 18, color: C.textSecondary, lineHeight: 1.7, maxWidth: 500, margin: "0 auto 8px" }}>
                {lang === "fr" ? "Ne vous contentez pas de connaître la philosophie." : "Don't just know the philosophy."}
              </p>
              <p style={{ fontSize: 22, color: C.textPrimary, lineHeight: 1.6, fontWeight: 700, fontFamily: FONT_DISPLAY, maxWidth: 500, margin: "0 auto 28px" }}>
                {lang === "fr" ? "Apprenez-la. Comprenez-la. Appliquez-la." : "Learn it. Understand it. Apply it."}
              </p>

              <div style={{ display: "flex", gap: 12, marginBottom: 36, justifyContent: "center" }}>
                {[
                  { icon: "📖", label: t.p1t, sub: lang === "fr" ? "Vidéo + 5 Piliers" : "Video + 5 Pillars", color: SOCRATES.gold },
                  { icon: "🧠", label: t.p2t, sub: lang === "fr" ? "4 Scénarios-quiz" : "4 Quiz Scenarios", color: C.accentPrimary },
                  { icon: "⚡", label: t.p3t, sub: lang === "fr" ? "Dialogue avec Socrate" : "Dialogue with Socrates", color: C.accentSuccess },
                ].map((p, i) => (
                  <div key={i} style={{ flex: 1, background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 12, padding: 18, textAlign: "center" }}>
                    <div style={{ fontSize: 30, marginBottom: 6 }}>{p.icon}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, fontFamily: FONT_DISPLAY, marginBottom: 2, color: p.color }}>{p.label}</div>
                    <div style={{ fontSize: 13, color: C.textMuted }}>{p.sub}</div>
                  </div>
                ))}
              </div>

              {!playerName ? (
                <div style={{ display: "flex", gap: 8, maxWidth: 400, margin: "0 auto" }}>
                  <input value={nameInput} onChange={(e) => setNameInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && nameInput.trim() && (setPlayerName(nameInput.trim()), setView("learn"))} placeholder={t.enterName} style={{ flex: 1, padding: "14px 20px", fontSize: 17, fontFamily: FONT_BODY, background: C.bgInput, color: C.textPrimary, border: `1px solid ${C.borderInput}`, borderRadius: 10, outline: "none" }} />
                  <button onClick={() => nameInput.trim() && (setPlayerName(nameInput.trim()), setView("learn"))} style={{ padding: "14px 28px", fontSize: 17, fontWeight: 600, background: `linear-gradient(135deg, ${SOCRATES.gold}, ${SOCRATES.goldDim})`, color: "#0a0a0a", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: FONT_DISPLAY }}>{t.start}</button>
                </div>
              ) : (
                <button onClick={() => setView("learn")} style={{ padding: "16px 40px", fontSize: 18, fontWeight: 600, background: `linear-gradient(135deg, ${SOCRATES.gold}, ${SOCRATES.goldDim})`, color: "#0a0a0a", border: "none", borderRadius: 12, cursor: "pointer", fontFamily: FONT_DISPLAY, boxShadow: `0 4px 20px ${SOCRATES.glow}` }}>{t.startJourney}</button>
              )}
            </div>
          </div>
        )}

        {/* ═══ PHASE 1: LEARN ═══ */}
        {view === "learn" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "28px" }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              {learnStep === 0 && (
                <div style={{ animation: "fadeUp 0.5s ease" }}>
                  <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 32, fontWeight: 700, marginBottom: 6 }}>{t.watchVideo}</h2>
                  <p style={{ color: C.textSecondary, fontSize: 17, marginBottom: 20, lineHeight: 1.7 }}>{t.videoNote}</p>
                  <div style={{ position: "relative", paddingBottom: "56.25%", borderRadius: 16, overflow: "hidden", marginBottom: 24, border: `1px solid ${C.borderSubtle}` }}>
                    <iframe src={`https://www.youtube.com/embed/${PHILOSOPHY.videoId}`} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="Socrates Documentary" />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <button onClick={() => setLearnStep(1)} style={{ padding: "14px 32px", fontSize: 17, fontWeight: 600, background: `linear-gradient(135deg, ${SOCRATES.gold}, ${SOCRATES.goldDim})`, color: "#0a0a0a", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: FONT_DISPLAY }}>
                      {lang === "fr" ? "Explorer les 5 Piliers →" : "Explore the 5 Pillars →"}
                    </button>
                  </div>
                </div>
              )}

              {learnStep >= 1 && learnStep <= 5 && (() => {
                const pillar = PHILOSOPHY.pillars[learnStep - 1];
                return (
                  <div style={{ animation: "fadeUp 0.4s ease" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                      <div style={{ fontSize: 14, color: C.textMuted, fontWeight: 600 }}>{t.pillar} {learnStep} {t.of} 5</div>
                      <div style={{ display: "flex", gap: 4 }}>
                        {[1,2,3,4,5].map(i => (
                          <div key={i} onClick={() => setLearnStep(i)} style={{ width: 32, height: 4, borderRadius: 2, cursor: "pointer", background: i === learnStep ? SOCRATES.gold : i < learnStep ? C.accentSuccess : "rgba(255,255,255,0.08)", transition: "all 0.2s" }} />
                        ))}
                      </div>
                    </div>

                    <div style={{ background: SOCRATES.bg, border: `1px solid ${SOCRATES.border}`, borderRadius: 16, padding: 28, marginBottom: 20 }}>
                      <div style={{ fontSize: 44, marginBottom: 12 }}>{pillar.icon}</div>
                      <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 30, fontWeight: 700, marginBottom: 10 }}>{pillar.title[lang]}</h2>
                      <div style={{ fontSize: 20, color: SOCRATES.gold, fontStyle: "italic", lineHeight: 1.5 }}>"{pillar.quote[lang]}"</div>
                    </div>

                    <div style={{ background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 16, padding: 24, marginBottom: 16 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.accentPrimary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>📖 {t.thePhilosophy}</div>
                      <p style={{ fontSize: 17, color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{pillar.explanation[lang]}</p>
                    </div>

                    <div style={{ background: C.bgCard, border: `1px solid ${C.accentSuccess}22`, borderRadius: 16, padding: 24, marginBottom: 28 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.accentSuccess, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>{t.workAt}</div>
                      <p style={{ fontSize: 17, color: C.textPrimary, lineHeight: 1.75, fontStyle: "italic", margin: 0 }}>{pillar.workplaceExample[lang]}</p>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <button onClick={() => setLearnStep(learnStep - 1)} style={{ padding: "12px 24px", fontSize: 15, fontWeight: 600, background: "transparent", color: C.textSecondary, border: `1px solid ${C.borderSubtle}`, borderRadius: 10, cursor: "pointer", fontFamily: FONT_BODY }}>
                        {learnStep === 1 ? (lang === "fr" ? "← Vidéo" : "← Video") : t.prevPillar}
                      </button>
                      {learnStep < 5 ? (
                        <button onClick={() => setLearnStep(learnStep + 1)} style={{ padding: "12px 28px", fontSize: 15, fontWeight: 600, background: `linear-gradient(135deg, ${SOCRATES.gold}, ${SOCRATES.goldDim})`, color: "#0a0a0a", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: FONT_DISPLAY }}>{t.nextPillar}</button>
                      ) : (
                        <button onClick={() => { setView("check"); setCheckStep(0); setCheckAnswers([]); setCheckComplete(false); setSelectedOption(null); setShowInsight(false); }} style={{ padding: "12px 28px", fontSize: 15, fontWeight: 600, background: `linear-gradient(135deg, ${C.accentPrimary}, ${C.accentSecondary})`, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: FONT_DISPLAY }}>{t.startCheck}</button>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* ═══ PHASE 2: CHECK ═══ */}
        {view === "check" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "28px" }}>
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              {!checkComplete ? (() => {
                const q = CHECK_QUESTIONS[lang][checkStep];
                return (
                  <div style={{ animation: "fadeUp 0.4s ease" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                      <div style={{ fontSize: 14, color: C.textMuted }}>{t.questionLabel} {checkStep + 1}/{CHECK_QUESTIONS[lang].length}</div>
                      <div style={{ display: "flex", gap: 4 }}>
                        {CHECK_QUESTIONS[lang].map((_, i) => (
                          <div key={i} style={{ width: 28, height: 4, borderRadius: 2, background: i === checkStep ? SOCRATES.gold : i < checkStep ? C.accentSuccess : "rgba(255,255,255,0.08)" }} />
                        ))}
                      </div>
                    </div>

                    <div style={{ background: SOCRATES.bg, border: `1px solid ${SOCRATES.border}`, borderRadius: 16, padding: 28, marginBottom: 20 }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                        <span style={{ fontSize: 20 }}>🏛️</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: SOCRATES.gold, padding: "3px 10px", background: `${SOCRATES.gold}12`, borderRadius: 6 }}>{q.pillar}</span>
                      </div>
                      <p style={{ fontSize: 20, color: C.textPrimary, lineHeight: 1.6, fontFamily: FONT_DISPLAY, fontWeight: 600, margin: 0 }}>{q.question}</p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                      {q.options.map((opt, i) => (
                        <button key={i} onClick={() => !showInsight && setSelectedOption(i)} disabled={showInsight} style={{
                          padding: "16px 20px", fontSize: 16, textAlign: "left", lineHeight: 1.55,
                          background: showInsight
                            ? (i === checkAnswers[checkAnswers.length-1]?.optionIdx ? (opt.score === 3 ? `${C.accentSuccess}15` : opt.score === 2 ? `${C.accentWarning}15` : `${C.accentError}10`) : (opt.score === 3 ? `${C.accentSuccess}08` : C.bgCard))
                            : (selectedOption === i ? `${SOCRATES.gold}15` : C.bgCard),
                          border: `1px solid ${showInsight
                            ? (i === checkAnswers[checkAnswers.length-1]?.optionIdx ? (opt.score === 3 ? C.accentSuccess + "44" : opt.score === 2 ? C.accentWarning + "44" : C.accentError + "33") : (opt.score === 3 ? C.accentSuccess + "33" : C.borderSubtle))
                            : (selectedOption === i ? SOCRATES.border : C.borderSubtle)}`,
                          borderRadius: 12, cursor: showInsight ? "default" : "pointer", fontFamily: FONT_BODY, color: C.textPrimary, transition: "all 0.2s",
                          opacity: showInsight && i !== checkAnswers[checkAnswers.length-1]?.optionIdx && opt.score !== 3 ? 0.4 : 1,
                        }}>
                          {opt.text}
                          {showInsight && opt.score === 3 && <span style={{ marginLeft: 8, fontSize: 13, color: C.accentSuccess }}>{t.socratic}</span>}
                        </button>
                      ))}
                    </div>

                    {!showInsight && selectedOption !== null && (
                      <div style={{ textAlign: "center" }}>
                        <button onClick={confirmCheckAnswer} style={{ padding: "12px 32px", fontSize: 16, fontWeight: 600, background: `linear-gradient(135deg, ${SOCRATES.gold}, ${SOCRATES.goldDim})`, color: "#0a0a0a", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: FONT_DISPLAY }}>{t.confirmAnswer}</button>
                      </div>
                    )}

                    {showInsight && (
                      <div style={{ animation: "fadeUp 0.4s ease" }}>
                        <div style={{ background: C.bgCard, border: `1px solid ${SOCRATES.border}`, borderRadius: 16, padding: 24, marginBottom: 20 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: SOCRATES.gold, textTransform: "uppercase", marginBottom: 10 }}>🏛️ {t.socratesInsight}</div>
                          <p style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.75, fontStyle: "italic", margin: 0 }}>{q.insight}</p>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <button onClick={nextCheckQuestion} style={{ padding: "12px 32px", fontSize: 16, fontWeight: 600, background: `linear-gradient(135deg, ${C.accentPrimary}, ${C.accentSecondary})`, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: FONT_DISPLAY }}>{checkStep < CHECK_QUESTIONS[lang].length - 1 ? t.nextQuestion : t.seeResults}</button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })() : (
                <div style={{ animation: "fadeUp 0.5s ease", textAlign: "center" }}>
                  <div style={{ fontSize: 56, marginBottom: 16 }}>🏛️</div>
                  <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 30, fontWeight: 700, marginBottom: 8 }}>{t.yourScore}</h2>
                  <div style={{ fontSize: 56, fontFamily: FONT_DISPLAY, fontWeight: 700, color: checkPct >= 75 ? C.accentSuccess : checkPct >= 50 ? SOCRATES.gold : C.accentWarning, marginBottom: 8 }}>{checkPct}%</div>
                  <div style={{ width: 200, height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 4, margin: "0 auto 24px" }}>
                    <div style={{ width: `${checkPct}%`, height: "100%", background: checkPct >= 75 ? C.accentSuccess : checkPct >= 50 ? SOCRATES.gold : C.accentWarning, borderRadius: 4, transition: "width 1s ease" }} />
                  </div>
                  <p style={{ fontSize: 18, color: C.textSecondary, lineHeight: 1.7, maxWidth: 520, margin: "0 auto 32px" }}>
                    {checkPct >= 75 ? t.scoreHigh : checkPct >= 50 ? t.scoreMid : t.scoreLow}
                  </p>
                  <button onClick={() => setView("scenarios")} style={{ padding: "16px 40px", fontSize: 18, fontWeight: 600, background: `linear-gradient(135deg, ${SOCRATES.gold}, ${SOCRATES.goldDim})`, color: "#0a0a0a", border: "none", borderRadius: 12, cursor: "pointer", fontFamily: FONT_DISPLAY, boxShadow: `0 4px 20px ${SOCRATES.glow}` }}>{t.readyToApply}</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══ PHASE 3: SCENARIOS ═══ */}
        {view === "scenarios" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "28px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 34, fontWeight: 700, marginBottom: 6 }}>{t.selectScenario}</h2>
              <p style={{ color: C.textSecondary, fontSize: 18, marginBottom: 24, lineHeight: 1.6 }}>{t.selectScenarioSub}</p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 16 }}>
                {SCENARIOS.map((sc, i) => (
                  <div key={sc.id} onClick={() => startScenario(sc)} style={{ background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 16, padding: 22, cursor: "pointer", transition: "all 0.3s", animation: `fadeUp 0.4s ease ${i * 0.08}s both` }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = SOCRATES.border; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.borderSubtle; e.currentTarget.style.transform = "none"; }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <span style={{ fontSize: 30 }}>{sc.icon}</span>
                        <div>
                          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 22, marginBottom: 2 }}>{sc.title}</div>
                          <div style={{ fontSize: 14, color: C.textMuted }}>{sc.category} · {sc.duration}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, padding: "4px 10px", borderRadius: 6, background: `${sc.diffColor}18`, color: sc.diffColor }}>{sc.difficulty}</span>
                    </div>
                    <p style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.55, marginBottom: 14, margin: "0 0 14px" }}>{sc.subtitle}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                      {sc.skills.map((s) => (<span key={s} style={{ fontSize: 13, padding: "4px 10px", borderRadius: 6, background: "rgba(212,168,83,0.08)", color: SOCRATES.gold, border: `1px solid ${SOCRATES.border}` }}>{s}</span>))}
                    </div>
                    {sc.pillarsUsed && <div style={{ fontSize: 13, color: C.accentPrimary, marginBottom: 6 }}>📖 {t.pillarsUsed}: {sc.pillarsUsed.join(", ")}</div>}
                    <div style={{ fontSize: 14, color: SOCRATES.gold, fontStyle: "italic" }}>🏛️ {sc.philosophicalTheme}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 48 }}>
                <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{t.futureTitle}</h3>
                <p style={{ color: C.textSecondary, fontSize: 16, marginBottom: 20 }}>{t.futureSub}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
                  {FUTURE_MENTORS.map((m, i) => (
                    <div key={i} style={{ background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 12, padding: 16, opacity: 0.55, textAlign: "center" }}>
                      <div style={{ fontSize: 28, marginBottom: 8 }}>{m.emoji}</div>
                      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 15 }}>{m.name}</div>
                      <div style={{ fontSize: 12, color: C.accentPrimary, marginBottom: 4 }}>{m.field}</div>
                      <div style={{ fontSize: 12, color: C.textMuted, fontStyle: "italic" }}>{m.tagline}</div>
                      <div style={{ marginTop: 8, fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase" }}>{t.comingSoon}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ PLAY (Chat) ═══ */}
        {view === "play" && scenario && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ padding: "12px 20px", borderBottom: `1px solid ${C.borderSubtle}`, display: "flex", alignItems: "center", justifyContent: "space-between", background: C.bgSecondary }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 24 }}>{scenario.icon}</span>
                <div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 18 }}>{scenario.title}</div>
                  <div style={{ fontSize: 13, color: C.textMuted }}>{scenario.philosophicalTheme.split("—")[0]}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ textAlign: "right", fontSize: 13, color: C.textMuted }}>
                  {t.exchange} {exchangeCount}/{MAX_EXCHANGES}
                  <div style={{ width: 60, height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, marginTop: 2 }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: SOCRATES.gold, borderRadius: 2, transition: "width 0.5s" }} />
                  </div>
                </div>
                {phase === "dialogue" && <>
                  <button onClick={requestReflection} disabled={loading || exchangeCount < 2} style={{ padding: "8px 14px", fontSize: 13, fontWeight: 600, background: `${SOCRATES.gold}11`, color: SOCRATES.gold, border: `1px solid ${SOCRATES.border}`, borderRadius: 8, cursor: exchangeCount < 2 ? "not-allowed" : "pointer", fontFamily: FONT_BODY, opacity: exchangeCount < 2 ? 0.4 : 1 }}>{t.requestReflection}</button>
                  <button onClick={endSession} disabled={loading || exchangeCount < 3} style={{ padding: "8px 14px", fontSize: 13, fontWeight: 600, background: `${C.accentPrimary}11`, color: C.accentPrimary, border: `1px solid ${C.borderAccent}`, borderRadius: 8, cursor: exchangeCount < 3 ? "not-allowed" : "pointer", fontFamily: FONT_BODY, opacity: exchangeCount < 3 ? 0.4 : 1 }}>{t.endSession}</button>
                </>}
              </div>
            </div>

            {exchangeCount === 0 && (
              <div style={{ padding: "14px 20px", background: `${SOCRATES.gold}08`, borderBottom: `1px solid ${SOCRATES.border}` }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: SOCRATES.gold, marginBottom: 6 }}>{t.situation}</div>
                <div style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.6, marginBottom: 6 }}>{scenario.situation}</div>
                <div style={{ fontSize: 14, color: C.textMuted }}><strong style={{ color: C.textSecondary }}>{t.stakeholders}:</strong> {scenario.stakeholders.join(" · ")}</div>
              </div>
            )}

            <div ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
              {messages.map((m, i) => m.role === "user" ? (
                <div key={i} style={{ alignSelf: "flex-end", maxWidth: "75%", animation: "fadeUp 0.3s" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.accentPrimary, textAlign: "right", marginBottom: 3 }}>{playerName}</div>
                  <div style={{ padding: "10px 14px", background: "rgba(99,102,241,0.08)", border: `1px solid ${C.borderAccent}`, borderRadius: "14px 14px 4px 14px", fontSize: 16, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{m.text}</div>
                </div>
              ) : (
                <div key={i} style={{ alignSelf: "flex-start", maxWidth: "80%", animation: "fadeUp 0.3s" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: SOCRATES.gold, marginBottom: 3 }}>🏛️ Socrate{lang === "en" ? "s" : ""}</div>
                  <div style={{ padding: "12px 16px", background: SOCRATES.bg, border: `1px solid ${SOCRATES.border}`, borderRadius: "14px 14px 14px 4px", fontSize: 16, lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{m.text}</div>
                </div>
              ))}
              {loading && (
                <div style={{ alignSelf: "flex-start", animation: "fadeUp 0.3s" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: SOCRATES.gold, marginBottom: 3 }}>🏛️ Socrate{lang === "en" ? "s" : ""}</div>
                  <div style={{ padding: "12px 16px", background: SOCRATES.bg, border: `1px solid ${SOCRATES.border}`, borderRadius: "14px 14px 14px 4px", fontSize: 16, color: C.textMuted }}><span style={{ animation: "pulse 1.5s infinite" }}>{t.socratesThinking}</span></div>
                </div>
              )}
            </div>

            {phase === "dialogue" && (
              <div style={{ padding: "12px 20px", borderTop: `1px solid ${C.borderSubtle}`, background: C.bgSecondary, display: "flex", gap: 10 }}>
                <input ref={inputRef} value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()} placeholder={t.typeResponse} disabled={loading} style={{ flex: 1, padding: "14px 20px", fontSize: 16, fontFamily: FONT_BODY, background: C.bgInput, color: C.textPrimary, border: `1px solid ${C.borderInput}`, borderRadius: 10, outline: "none" }} />
                <button onClick={sendMessage} disabled={loading || !userInput.trim()} style={{ padding: "14px 28px", fontSize: 16, fontWeight: 600, background: `linear-gradient(135deg, ${SOCRATES.gold}, ${SOCRATES.goldDim})`, color: "#0a0a0a", border: "none", borderRadius: 10, cursor: loading || !userInput.trim() ? "not-allowed" : "pointer", fontFamily: FONT_DISPLAY, opacity: loading || !userInput.trim() ? 0.5 : 1 }}>{t.send}</button>
              </div>
            )}

            {phase === "complete" && sessionReport && (
              <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px" }}>
                {renderReport(sessionReport)}
                <div style={{ textAlign: "center", marginTop: 20, paddingBottom: 20 }}>
                  <button onClick={() => { setView("scenarios"); setPhase("dialogue"); }} style={{ padding: "14px 32px", fontSize: 16, fontWeight: 600, background: `linear-gradient(135deg, ${SOCRATES.gold}, ${SOCRATES.goldDim})`, color: "#0a0a0a", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: FONT_DISPLAY }}>{t.backToScenarios}</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ REPORT ═══ */}
        {view === "report" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "32px 28px" }}>
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 30, fontWeight: 700, marginBottom: 24 }}>📜 {t.reportTitle}</h2>
              {sessionReport ? renderReport(sessionReport) : (
                <div style={{ background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 16, padding: 40, textAlign: "center" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🏛️</div>
                  <p style={{ color: C.textSecondary, fontSize: 16 }}>{t.noReports}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══ HISTORY ═══ */}
        {view === "history" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "32px 28px" }}>
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 30, fontWeight: 700, marginBottom: 24 }}>📚 {t.history}</h2>
              {allReports.length === 0 ? (
                <div style={{ background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 16, padding: 40, textAlign: "center" }}>
                  <p style={{ color: C.textSecondary, fontSize: 16 }}>{t.noReports}</p>
                </div>
              ) : allReports.map((r, i) => (
                <div key={i} onClick={() => { setSessionReport(r); setView("report"); }} style={{ background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 12, padding: 18, cursor: "pointer", marginBottom: 12, transition: "all 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = SOCRATES.border}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = C.borderSubtle}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 17 }}>{r.scenarioTitle}</div>
                      <div style={{ fontSize: 14, color: C.textMuted }}>{r.date} · {r.exchanges} {t.exchange.toLowerCase()}s</div>
                    </div>
                    <div style={{ fontSize: 22, fontFamily: FONT_DISPLAY, fontWeight: 700, color: r.scoreReasoning >= 80 ? C.accentSuccess : SOCRATES.gold }}>{r.scoreReasoning}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
