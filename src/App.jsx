import { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════════════════════
// DESIGN SYSTEM
// ═══════════════════════════════════════════════════════
const C = {
  bgPrimary: "#05050a", bgSecondary: "#0d0d14", bgCard: "#141420", bgCardHover: "#1a1a28", bgInput: "#0d0d14",
  textPrimary: "#ffffff", textSecondary: "#9ca3af", textMuted: "#6b7280",
  accentPrimary: "#6366f1", accentSecondary: "#8b5cf6", accentTertiary: "#06b6d4",
  accentSuccess: "#10b981", accentWarning: "#f59e0b", accentError: "#ef4444",
  borderSubtle: "rgba(255,255,255,0.06)", borderAccent: "rgba(99,102,241,0.3)", borderInput: "rgba(255,255,255,0.1)",
  glowPrimary: "rgba(99,102,241,0.4)", shadowLg: "0 25px 50px -12px rgba(0,0,0,0.5)",
};
const FD = "'Space Grotesk', sans-serif";
const FB = "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif";
const S = { gold: "#d4a853", goldDim: "#b8923e", bg: "rgba(212,168,83,0.06)", border: "rgba(212,168,83,0.22)", glow: "rgba(212,168,83,0.15)" };

// ═══════════════════════════════════════════════════════
// PHASE 1 — PHILOSOPHY PILLARS
// ═══════════════════════════════════════════════════════
const PHILOSOPHY = {
  videoId: "6DGnwLTnoPY",
  pillars: [
    { icon: "🪞", title: { en: "Know Thyself", fr: "Connais-toi toi-même" }, quote: { en: "The unexamined life is not worth living.", fr: "Une vie sans examen ne vaut pas la peine d'être vécue." },
      explanation: { en: "Before you can lead others or make good decisions, you must understand your own biases, motivations, and blind spots. Socrates spent his life questioning Athenians who claimed expertise — generals about courage, politicians about justice — and found most had never truly examined what they believed or why.", fr: "Avant de pouvoir diriger ou prendre de bonnes décisions, vous devez comprendre vos propres préjugés et angles morts. Socrate a passé sa vie à questionner ceux qui se disaient experts et a découvert que la plupart n'avaient jamais examiné ce qu'ils croyaient." },
      workplaceExample: { en: "When you feel strongly about a decision, pause and ask: Am I choosing this because it's right, or because it protects my ego?", fr: "Lorsque vous êtes convaincu d'une décision, demandez-vous : est-ce juste, ou est-ce que ça protège mon ego?" } },
    { icon: "❓", title: { en: "Question Everything", fr: "Questionnez tout" }, quote: { en: "I know that I know nothing.", fr: "Je sais que je ne sais rien." },
      explanation: { en: "The Socratic Method is dialogue through probing questions, not answers. By questioning assumptions, you expose contradictions and reach deeper truths. Socrates called himself a 'midwife of ideas,' helping others give birth to understanding they already carried within.", fr: "La méthode socratique est un dialogue par questions incisives. En questionnant les hypothèses, on expose les contradictions. Socrate se disait 'accoucheur d'idées', aidant les autres à donner naissance à la compréhension qu'ils portaient déjà." },
      workplaceExample: { en: "Instead of saying 'This strategy will work,' ask: 'What assumptions are we making? What would have to be true for this to fail?'", fr: "Au lieu de dire 'Ça va marcher,' demandez : 'Quelles hypothèses faisons-nous? Que faudrait-il pour que cela échoue?'" } },
    { icon: "⚖️", title: { en: "Virtue is Knowledge", fr: "La vertu est connaissance" }, quote: { en: "No one does wrong willingly.", fr: "Nul ne fait le mal volontairement." },
      explanation: { en: "Socrates believed if you truly understand what is good, you will do it. Bad decisions come from ignorance, not malice. A leader who cuts corners hasn't examined the full consequences. The path to better leadership is deeper understanding, not more rules.", fr: "Socrate croyait que si vous comprenez le bien, vous le ferez. Les mauvaises décisions viennent de l'ignorance, pas de la malveillance. Le chemin vers un meilleur leadership passe par la compréhension, pas les règles." },
      workplaceExample: { en: "When a team member makes a mistake, ask: What did they believe was true? What information were they missing?", fr: "Quand quelqu'un fait une erreur, demandez : Que croyaient-ils? Quelle information leur manquait?" } },
    { icon: "🗣️", title: { en: "Dialectical Reasoning", fr: "Le raisonnement dialectique" }, quote: { en: "The highest form of human excellence is to question oneself and others.", fr: "La plus haute forme d'excellence est de se questionner soi-même et les autres." },
      explanation: { en: "Truth emerges through dialogue, not monologue. Socrates never lectured — he conversed. He believed when two people genuinely explore a disagreement, both end up wiser. The goal isn't to win the argument but to find what's true.", fr: "La vérité émerge du dialogue. Socrate ne donnait jamais de cours — il conversait. L'objectif n'est pas de gagner l'argument mais de trouver ce qui est vrai." },
      workplaceExample: { en: "Instead of defending your position, ask: 'Help me understand your perspective — what am I missing?'", fr: "Au lieu de défendre votre position, demandez : 'Aidez-moi à comprendre — qu'est-ce que je ne vois pas?'" } },
    { icon: "🏛️", title: { en: "Epistemic Humility", fr: "L'humilité épistémique" }, quote: { en: "Wisdom begins in wonder.", fr: "La sagesse commence dans l'émerveillement." },
      explanation: { en: "The Oracle at Delphi called Socrates the wisest in Athens. Why? Because he knew the limits of his knowledge while others didn't. The most dangerous leader is the one who is certain. Certainty closes the mind. Humility opens it.", fr: "L'Oracle de Delphes a déclaré Socrate le plus sage d'Athènes. Pourquoi? Parce qu'il connaissait les limites de ses connaissances. Le leader le plus dangereux est celui qui est certain." },
      workplaceExample: { en: "Before a major decision, list what you DON'T know. Then ask: who in this room knows what I don't?", fr: "Avant une décision majeure, listez ce que vous NE SAVEZ PAS. Puis demandez : qui sait ce que je ne sais pas?" } },
  ],
};

// ═══════════════════════════════════════════════════════
// PHASE 2 — UNDERSTANDING CHECK
// ═══════════════════════════════════════════════════════
const CHECK_Q = {
  en: [
    { question: "A CEO says: 'I've been in this industry 30 years. I know exactly what will happen.' What would Socrates say?", pillar: "Epistemic Humility",
      options: [ { text: "Trust his experience — 30 years is valuable.", score: 1 }, { text: "Certainty is dangerous. 30 years could mean 30 years of unchallenged assumptions.", score: 3 }, { text: "He should validate with more market research.", score: 2 } ],
      insight: "Socrates would question the certainty itself. 30 years of experience can mean 30 years of assumptions never examined." },
    { question: "Your team is split 50/50 on strategy. You're the tiebreaker. What's the Socratic approach?", pillar: "Dialectical Reasoning",
      options: [ { text: "Go with your gut — someone has to decide.", score: 1 }, { text: "Ask each side: 'What would have to be true for the other side to be right?'", score: 3 }, { text: "Bring in an external consultant.", score: 2 } ],
      insight: "Socrates believed truth often lives between opposing positions. By making each side consider the other's perspective, a wiser decision emerges." },
    { question: "An employee makes a costly mistake. What would a Socratic leader do first?", pillar: "Virtue is Knowledge",
      options: [ { text: "Document the error and issue a warning.", score: 1 }, { text: "Ask: 'Walk me through your thinking when you made this decision.'", score: 3 }, { text: "Review the process to prevent future errors.", score: 2 } ],
      insight: "No one does wrong willingly. Mistakes come from flawed understanding. Explore their reasoning to find the real gap." },
    { question: "A deal benefits your company but harms a smaller partner. What question would Socrates ask?", pillar: "Know Thyself",
      options: [ { text: "'Will this maximize shareholder value?'", score: 1 }, { text: "'If you were the partner being harmed, would you still call this just?'", score: 3 }, { text: "'Have you consulted all stakeholders?'", score: 2 } ],
      insight: "Socrates forces you to examine the situation from the other's perspective, exposing whether your reasoning is just or merely self-serving." },
  ],
  fr: [
    { question: "Un PDG dit : 'Je suis dans cette industrie depuis 30 ans. Je sais exactement ce qui va se passer.' Que dirait Socrate?", pillar: "L'humilité épistémique",
      options: [ { text: "Faire confiance à son expérience — 30 ans, c'est précieux.", score: 1 }, { text: "La certitude est dangereuse. 30 ans pourraient signifier 30 ans d'hypothèses non questionnées.", score: 3 }, { text: "Valider avec plus de recherche de marché.", score: 2 } ],
      insight: "Socrate questionnerait la certitude elle-même. 30 ans d'expérience peuvent signifier 30 ans d'hypothèses jamais examinées." },
    { question: "Votre équipe est divisée 50/50 sur une stratégie. Vous devez trancher. L'approche socratique?", pillar: "Le raisonnement dialectique",
      options: [ { text: "Suivre votre instinct — quelqu'un doit décider.", score: 1 }, { text: "Demander à chaque camp : 'Que faudrait-il pour que l'autre ait raison?'", score: 3 }, { text: "Faire appel à un consultant externe.", score: 2 } ],
      insight: "La vérité vit souvent entre les positions opposées. En faisant considérer chaque camp l'autre perspective, une décision plus sage émerge." },
    { question: "Un employé fait une erreur coûteuse. Que ferait un leader socratique?", pillar: "La vertu est connaissance",
      options: [ { text: "Documenter l'erreur et émettre un avertissement.", score: 1 }, { text: "Demander : 'Guidez-moi à travers votre raisonnement.'", score: 3 }, { text: "Revoir le processus pour prévenir les erreurs.", score: 2 } ],
      insight: "Nul ne fait le mal volontairement. Les erreurs viennent d'une compréhension imparfaite. Explorez leur raisonnement." },
    { question: "Un accord profite à votre entreprise mais nuit à un partenaire. Question de Socrate?", pillar: "Connais-toi toi-même",
      options: [ { text: "'Cela maximise-t-il la valeur actionnariale?'", score: 1 }, { text: "'Si vous étiez le partenaire lésé, appelleriez-vous cela juste?'", score: 3 }, { text: "'Avez-vous consulté toutes les parties?'", score: 2 } ],
      insight: "Socrate vous force à examiner la situation du point de vue de l'autre, exposant si votre raisonnement est juste ou intéressé." },
  ],
};

// ═══════════════════════════════════════════════════════
// SCENARIOS + DECISION ROUNDS
// ═══════════════════════════════════════════════════════
const SCENARIOS = [
  {
    id: "ethical_dilemma", icon: "⚖️", title: { en: "The Ethical Dilemma", fr: "Le Dilemme Éthique" },
    subtitle: { en: "Ship a buggy product to meet targets, or delay and face consequences?", fr: "Livrer un produit défaillant pour atteindre les objectifs, ou retarder et en subir les conséquences?" },
    category: "Ethics", difficulty: { en: "Beginner", fr: "Débutant" }, diffColor: "#10b981", duration: "10–15 min",
    skills: { en: ["Ethical reasoning", "Questioning assumptions", "Virtue vs. profit"], fr: ["Raisonnement éthique", "Questionner les hypothèses", "Vertu vs. profit"] },
    situation: { en: "You're a Product Director at a mid-size tech company. The CEO wants you to ship a product with unresolved bugs to meet the quarterly revenue target. Sales has promised delivery to 3 major clients. Engineering says it needs 3 more weeks. Board meeting in 5 days.", fr: "Vous êtes Directeur Produit. Le PDG veut livrer un produit avec des bugs non résolus pour atteindre l'objectif trimestriel. Les ventes ont promis la livraison à 3 clients majeurs. L'ingénierie dit qu'il faut 3 semaines de plus. Réunion du CA dans 5 jours." },
    theme: { en: "Virtue Ethics — What does the virtuous person do under pressure?", fr: "Éthique de la vertu — Que fait la personne vertueuse sous pression?" },
    rounds: {
      en: [
        { context: "The CEO calls you into his office. 'We need to ship by Friday. The board is watching. What's your call?'",
          socratesAsk: "Before you answer the CEO — tell me, what do you actually know about these bugs? Are they inconveniences, or do they betray the promise you made to your clients?",
          pillar: "Know Thyself",
          options: [
            { text: "Ship it. The bugs are minor and we can patch them post-launch. Business comes first.", virtue: 30, reasoning: 40, selfAware: 25, epistemic: 30, reply: "You say 'minor' with great confidence. But have you asked the engineers what 'minor' means to the people who will use this product daily? Or does 'minor' simply mean 'minor to you'?" },
            { text: "I need to understand the full scope first. Let me talk to the engineering lead before I commit.", virtue: 70, reasoning: 80, selfAware: 75, epistemic: 85, reply: "Ah — you resist the pressure to decide before understanding. This is the beginning of wisdom. The unexamined decision, like the unexamined life, leads to suffering. Go, speak to your engineer. What questions will you ask?" },
            { text: "Tell the CEO we need a 3-week delay. Quality is non-negotiable.", virtue: 75, reasoning: 50, selfAware: 55, epistemic: 40, reply: "Noble! But consider — you've made a firm declaration without first examining what you don't know. Is every bug equally serious? Could some be fixed in 5 days? Certainty without examination is not virtue — it is rigidity." },
          ] },
        { context: "The engineering lead tells you: 8 of the 12 bugs are cosmetic. But 4 affect data accuracy in financial reports — the core feature clients are buying.",
          socratesAsk: "Now you have knowledge. Four bugs corrupt the very thing your clients are paying for. What does this knowledge demand of you?",
          pillar: "Virtue is Knowledge",
          options: [
            { text: "Ship with the cosmetic bugs, fix the 4 critical ones first — even if it takes an extra week.", virtue: 85, reasoning: 90, selfAware: 80, epistemic: 75, reply: "You separate the essential from the superficial. This is excellent reasoning. But tell me — how will you explain this week's delay to the CEO who sees only the deadline?" },
            { text: "Ship everything now. Add a disclaimer about 'known issues' in the release notes.", virtue: 20, reasoning: 35, selfAware: 30, epistemic: 25, reply: "A disclaimer. You would tell your clients 'we know this is broken, but we shipped it anyway.' Does a disclaimer transform a harmful act into a virtuous one? Or does it merely document your awareness of the harm?" },
            { text: "Delay the full 3 weeks to fix everything perfectly.", virtue: 65, reasoning: 45, selfAware: 50, epistemic: 40, reply: "Admirable caution, but you haven't weighed the cost of perfection. Three weeks could lose all three clients. Is absolute perfection virtuous if it destroys the company that employs 200 people? What is the wise middle path?" },
          ] },
        { context: "You choose to fix the critical bugs first. The CEO pushes back: 'The Sales VP already promised Friday delivery. If we miss it, we lose the clients AND the quarter.'",
          socratesAsk: "The CEO speaks of promises made by others on your behalf. Here is your test: when promises and truth collide, which do you serve?",
          pillar: "Dialectical Reasoning",
          options: [
            { text: "Let me talk to the clients directly. I'll explain the situation and offer a realistic timeline with guaranteed quality.", virtue: 90, reasoning: 85, selfAware: 80, epistemic: 80, reply: "Extraordinary. You propose dialogue over deception. You treat the clients as rational beings who deserve truth — precisely as I would. But what if they choose to leave? Are you prepared for that consequence?" },
            { text: "The Sales VP made the promise. It's his problem to manage expectations, not mine.", virtue: 35, reasoning: 40, selfAware: 25, epistemic: 35, reply: "You push responsibility onto another. But tell me — if the product fails in the client's hands, will they blame the Sales VP, or the Product Director whose name is on the release? Avoiding responsibility is not the same as not having it." },
            { text: "Can we ship a limited version — the features without the financial reporting — and deliver the rest in 2 weeks?", virtue: 75, reasoning: 90, selfAware: 70, epistemic: 75, reply: "A creative synthesis! You've found a path that neither fully capitulates nor fully delays. This is dialectical reasoning at work — holding the tension between opposing demands until a third option emerges. Well done." },
          ] },
        { context: "The CEO accepts a 1-week delay but demands you personally guarantee no further delays. The Sales VP is furious and sends an angry email to the leadership team calling you 'risk-averse and damaging to revenue.'",
          socratesAsk: "You are now attacked publicly. The Sales VP questions your character. Tell me — does his anger change what is true? And how do you respond to someone who fights with emotion while you fight with reason?",
          pillar: "Epistemic Humility",
          options: [
            { text: "Reply-all defending my decision with data: the bug list, risk analysis, and client impact projections.", virtue: 60, reasoning: 70, selfAware: 50, epistemic: 55, reply: "You defend with evidence — good. But a reply-all creates a public battle. You may win the argument and lose the relationship. Is being right worth more than being effective?" },
            { text: "Request a private meeting with the Sales VP. Understand his perspective — what pressure is he under that makes him react this way?", virtue: 85, reasoning: 80, selfAware: 90, epistemic: 85, reply: "Remarkable. When attacked, you seek to understand rather than to retaliate. You apply the very method we've discussed: before judging another's actions, understand what they believe to be true. This is wisdom in action." },
            { text: "Ignore the email. My work will speak for itself when the product launches clean.", virtue: 55, reasoning: 50, selfAware: 45, epistemic: 40, reply: "Silence can be dignity, but it can also be avoidance. The Sales VP's anger reveals something about the pressures within your organization. By ignoring it, you miss an opportunity to understand — and to teach." },
          ] },
        { context: "The product ships one week late with all critical bugs fixed. Two of three clients are satisfied. The third left for a competitor during the delay. The CEO says: 'We lost a client. Was it worth it?'",
          socratesAsk: "The final question — and the hardest. You lost something real. The CEO wants to know if your principles cost the company. How do you answer a man who measures wisdom in revenue?",
          pillar: "Know Thyself",
          options: [
            { text: "We saved two clients who now trust our quality. The one we lost would have left anyway after finding the data bugs. We chose long-term trust over short-term numbers.", virtue: 85, reasoning: 90, selfAware: 85, epistemic: 80, reply: "You reframe the loss as an investment in truth. But notice what you just did — you examined your own decision critically. You didn't claim perfection. You acknowledged the cost while defending the principle. This is the examined life in practice." },
            { text: "Honestly? I'm not sure. We made the best decision we could with what we knew. I'd want to examine what we could do differently next time.", virtue: 70, reasoning: 75, selfAware: 90, epistemic: 95, reply: "The most Socratic answer of all — 'I'm not sure.' You resist the temptation to claim certainty even about your own wisdom. You acknowledge that good decisions can still have painful outcomes. If I could give you only one gift, it would be the courage to live permanently in this uncertainty." },
            { text: "In hindsight, we should have found a way to ship partial functionality faster. The delay was too long.", virtue: 55, reasoning: 65, selfAware: 60, epistemic: 65, reply: "You examine your own decision and find it wanting — that takes courage. But be careful: hindsight makes everything look obvious. The question is not 'what should I have done?' but 'given what I knew then, did I reason well?' Don't confuse outcomes with wisdom." },
          ] },
      ],
      fr: [
        { context: "Le PDG vous appelle dans son bureau. 'Il faut livrer vendredi. Le CA nous observe. Qu'est-ce que vous en pensez?'",
          socratesAsk: "Avant de répondre au PDG — dites-moi, que savez-vous réellement de ces bugs? Sont-ils des inconvénients ou trahissent-ils la promesse faite à vos clients?",
          pillar: "Connais-toi toi-même",
          options: [
            { text: "Livrer. Les bugs sont mineurs, on peut les corriger après. Le business d'abord.", virtue: 30, reasoning: 40, selfAware: 25, epistemic: 30, reply: "Vous dites 'mineurs' avec assurance. Mais avez-vous demandé aux ingénieurs ce que 'mineur' signifie pour ceux qui utiliseront ce produit quotidiennement?" },
            { text: "Je dois comprendre la situation complète. Laissez-moi parler au responsable technique avant de m'engager.", virtue: 70, reasoning: 80, selfAware: 75, epistemic: 85, reply: "Vous résistez à la pression de décider avant de comprendre. C'est le début de la sagesse. La décision non examinée, comme la vie non examinée, mène à la souffrance." },
            { text: "Dire au PDG qu'on a besoin de 3 semaines. La qualité n'est pas négociable.", virtue: 75, reasoning: 50, selfAware: 55, epistemic: 40, reply: "Noble! Mais vous faites une déclaration ferme sans d'abord examiner ce que vous ne savez pas. Chaque bug est-il aussi grave? La certitude sans examen n'est pas vertu — c'est rigidité." },
          ] },
        { context: "Le responsable technique vous dit : 8 des 12 bugs sont cosmétiques. Mais 4 affectent la précision des données dans les rapports financiers — la fonctionnalité clé que les clients achètent.",
          socratesAsk: "Maintenant vous avez la connaissance. Quatre bugs corrompent ce pour quoi vos clients paient. Que cette connaissance exige-t-elle de vous?",
          pillar: "La vertu est connaissance",
          options: [
            { text: "Livrer avec les bugs cosmétiques, corriger d'abord les 4 critiques — même si ça prend une semaine de plus.", virtue: 85, reasoning: 90, selfAware: 80, epistemic: 75, reply: "Vous séparez l'essentiel du superficiel. Excellent raisonnement. Mais comment expliquerez-vous ce délai au PDG qui ne voit que l'échéance?" },
            { text: "Tout livrer maintenant. Ajouter une note sur les 'problèmes connus' dans les notes de version.", virtue: 20, reasoning: 35, selfAware: 30, epistemic: 25, reply: "Une note. Vous diriez à vos clients 'nous savons que c'est défaillant, mais on l'a livré quand même.' Un avertissement transforme-t-il un acte nuisible en acte vertueux?" },
            { text: "Retarder les 3 semaines complètes pour tout corriger parfaitement.", virtue: 65, reasoning: 45, selfAware: 50, epistemic: 40, reply: "Prudence admirable, mais vous n'avez pas pesé le coût de la perfection. Trois semaines pourraient perdre les trois clients. La perfection absolue est-elle vertueuse si elle détruit l'entreprise?" },
          ] },
        { context: "Vous choisissez de corriger les bugs critiques d'abord. Le PDG résiste : 'Le VP Ventes a déjà promis la livraison vendredi.'",
          socratesAsk: "Le PDG parle de promesses faites par d'autres en votre nom. Quand les promesses et la vérité s'affrontent, laquelle servez-vous?",
          pillar: "Le raisonnement dialectique",
          options: [
            { text: "Laissez-moi parler directement aux clients. J'expliquerai la situation et offrirai un calendrier réaliste avec qualité garantie.", virtue: 90, reasoning: 85, selfAware: 80, epistemic: 80, reply: "Extraordinaire. Vous proposez le dialogue plutôt que la tromperie. Vous traitez les clients comme des êtres rationnels qui méritent la vérité." },
            { text: "Le VP Ventes a fait la promesse. C'est à lui de gérer les attentes, pas à moi.", virtue: 35, reasoning: 40, selfAware: 25, epistemic: 35, reply: "Vous transférez la responsabilité. Mais si le produit échoue chez le client, qui sera blâmé — le VP Ventes ou le Directeur Produit dont le nom est sur la version?" },
            { text: "Peut-on livrer une version limitée — sans les rapports financiers — et compléter dans 2 semaines?", virtue: 75, reasoning: 90, selfAware: 70, epistemic: 75, reply: "Une synthèse créative! Vous avez trouvé un chemin qui ne capitule ni ne retarde complètement. C'est le raisonnement dialectique en action." },
          ] },
        { context: "Le PDG accepte un délai d'une semaine. Le VP Ventes envoie un courriel furieux à toute la direction vous qualifiant de 'frileux et nuisible aux revenus.'",
          socratesAsk: "Vous êtes attaqué publiquement. Sa colère change-t-elle ce qui est vrai? Comment répondez-vous à quelqu'un qui combat avec l'émotion?",
          pillar: "L'humilité épistémique",
          options: [
            { text: "Répondre à tous en défendant ma décision avec des données : liste des bugs, analyse de risque, impact client.", virtue: 60, reasoning: 70, selfAware: 50, epistemic: 55, reply: "Vous défendez avec des preuves — bien. Mais une réponse publique crée une bataille. Gagner l'argument vaut-il plus que maintenir la relation?" },
            { text: "Demander une réunion privée avec le VP Ventes. Comprendre sa perspective — quelle pression subit-il?", virtue: 85, reasoning: 80, selfAware: 90, epistemic: 85, reply: "Remarquable. Quand on vous attaque, vous cherchez à comprendre plutôt qu'à riposter. C'est la sagesse en action." },
            { text: "Ignorer le courriel. Mon travail parlera de lui-même quand le produit sera lancé proprement.", virtue: 55, reasoning: 50, selfAware: 45, epistemic: 40, reply: "Le silence peut être dignité, mais aussi évitement. La colère du VP révèle quelque chose sur les pressions dans votre organisation. En l'ignorant, vous manquez une opportunité de comprendre." },
          ] },
        { context: "Le produit est livré avec une semaine de retard, tous les bugs critiques corrigés. Deux clients sur trois sont satisfaits. Le troisième est parti chez un concurrent. Le PDG demande : 'On a perdu un client. Ça en valait la peine?'",
          socratesAsk: "La question finale. Vous avez perdu quelque chose de réel. Comment répondez-vous à un homme qui mesure la sagesse en revenus?",
          pillar: "Connais-toi toi-même",
          options: [
            { text: "On a sauvé deux clients qui font maintenant confiance à notre qualité. Celui qu'on a perdu serait parti en trouvant les bugs. On a choisi la confiance à long terme.", virtue: 85, reasoning: 90, selfAware: 85, epistemic: 80, reply: "Vous recadrez la perte comme un investissement dans la vérité. Vous avez examiné votre propre décision sans prétendre à la perfection. C'est la vie examinée en pratique." },
            { text: "Honnêtement? Je ne suis pas sûr. On a pris la meilleure décision possible avec ce qu'on savait. Je voudrais examiner ce qu'on pourrait faire différemment.", virtue: 70, reasoning: 75, selfAware: 90, epistemic: 95, reply: "La réponse la plus socratique — 'Je ne suis pas sûr.' Vous résistez à la tentation de revendiquer la certitude même sur votre propre sagesse. Si je pouvais vous donner un seul cadeau, ce serait le courage de vivre dans cette incertitude." },
            { text: "Avec le recul, on aurait dû trouver un moyen de livrer une version partielle plus vite. Le délai était trop long.", virtue: 55, reasoning: 65, selfAware: 60, epistemic: 65, reply: "Vous examinez votre propre décision et la trouvez insuffisante — cela demande du courage. Mais ne confondez pas les résultats avec la sagesse." },
          ] },
      ],
    },
  },
  {
    id: "leadership_conflict", icon: "🏛️", title: { en: "The Leadership Question", fr: "La Question du Leadership" },
    subtitle: { en: "Promote your friend or the top performer? Justice meets loyalty.", fr: "Promouvoir votre ami ou le meilleur performeur? La justice rencontre la loyauté." },
    category: "Justice", difficulty: { en: "Intermediate", fr: "Intermédiaire" }, diffColor: "#f59e0b", duration: "10–15 min",
    skills: { en: ["Justice & fairness", "Self-examination", "Bias awareness"], fr: ["Justice & équité", "Auto-examen", "Conscience des biais"] },
    situation: { en: "You manage a team of 25. One Senior Director position is opening. Alex, your close friend of 8 years, has solid performance. Jordan, who joined 2 years ago, delivered exceptional results including saving $2M. HR says both qualify. Your recommendation is decisive.", fr: "Vous gérez une équipe de 25. Un poste de Directeur Senior s'ouvre. Alex, votre ami proche depuis 8 ans, a de bonnes performances. Jordan, arrivé il y a 2 ans, a livré des résultats exceptionnels incluant une économie de 2M$. Les RH disent que les deux sont qualifiés." },
    theme: { en: "Justice — Can you separate loyalty from judgment?", fr: "Justice — Pouvez-vous séparer loyauté et jugement?" },
    rounds: {
      en: [
        { context: "HR asks for your recommendation by end of week. You catch yourself thinking 'Alex deserves it — he's been here longer and I trust him.'",
          socratesAsk: "Interesting. You said Alex 'deserves' it. Tell me — on what basis? Is tenure the same as merit? And notice the word 'trust.' Do you trust Alex because he's proven, or because he's familiar?",
          pillar: "Know Thyself", options: [
            { text: "I need to separate my personal feelings from the data. Let me review both candidates' performance records objectively.", virtue: 80, reasoning: 85, selfAware: 90, epistemic: 80, reply: "You recognize the bias and choose to examine it. This is the hardest form of self-knowledge — admitting that your judgment may be compromised by friendship. Well begun." },
            { text: "Alex has paid his dues. Loyalty and consistency matter. Sometimes the steady hand beats the flashy newcomer.", virtue: 45, reasoning: 40, selfAware: 25, epistemic: 30, reply: "'Paid his dues' — what an interesting phrase. Does time served equal value delivered? You may be confusing patience with excellence, and loyalty with justice." },
            { text: "Jordan's results speak for themselves. $2M saved in 2 years. The numbers don't lie.", virtue: 60, reasoning: 70, selfAware: 50, epistemic: 55, reply: "The numbers are compelling. But are you now overcorrecting — dismissing Alex entirely to prove you're not biased? True fairness isn't swinging from one extreme to another." },
          ] },
        { context: "You review the records. Alex: consistent 'Meets Expectations' ratings for 5 years, well-liked, zero complaints. Jordan: two 'Exceeds' ratings, one failed project early on, and some team friction from pushing too hard.",
          socratesAsk: "The picture grows more complex. Alex is safe and steady. Jordan is brilliant but imperfect. What does justice look like when both paths have merit?",
          pillar: "Dialectical Reasoning", options: [
            { text: "Schedule separate interviews with each. Ask them both: 'What's your vision for this role and how would you handle its biggest challenges?'", virtue: 80, reasoning: 90, selfAware: 75, epistemic: 85, reply: "You let them reveal themselves through dialogue — the Socratic way. Instead of judging from records alone, you create the conditions for truth to emerge." },
            { text: "Ask each candidate's direct reports for confidential feedback. The people they lead know best.", virtue: 75, reasoning: 80, selfAware: 70, epistemic: 80, reply: "Wise — you seek perspectives beyond your own. But consider: will Alex's team, who like him, and Jordan's team, who find her demanding, give you truth or comfort?" },
            { text: "The data is clear enough. Jordan has superior results. Recommend Jordan.", virtue: 55, reasoning: 60, selfAware: 40, epistemic: 35, reply: "Quick and decisive — but have you examined everything? Records capture what happened, not why. Alex's consistency in a boring role versus Jordan's brilliance in a high-profile one... are you comparing fairly?" },
          ] },
        { context: "In the interviews, Alex says: 'I'd maintain what works and keep the team happy.' Jordan says: 'I'd restructure the underperforming units and set aggressive new targets.' Both are honest.",
          socratesAsk: "Two visions: stability versus transformation. Neither is wrong. But which does this team NEED right now? And how do you separate what the team needs from what you personally prefer?",
          pillar: "Epistemic Humility", options: [
            { text: "Consult the data: is the team currently underperforming? If yes, they need Jordan's push. If stable, maybe Alex's continuity is right.", virtue: 75, reasoning: 85, selfAware: 70, epistemic: 80, reply: "Excellent — you let the situation dictate the answer rather than your preference. Context determines what virtue looks like." },
            { text: "I honestly don't know what the team needs most. Let me consult with the VP and HR to get perspectives I might be missing.", virtue: 70, reasoning: 70, selfAware: 85, epistemic: 95, reply: "The most courageous answer — 'I don't know.' You resist the pressure to be the all-knowing leader and instead seek the wisdom of others. This IS epistemic humility." },
            { text: "Jordan's approach will cause disruption but growth. The team needs to be challenged. Comfort breeds complacency.", virtue: 60, reasoning: 65, selfAware: 45, epistemic: 40, reply: "Perhaps. But notice your certainty — 'comfort breeds complacency.' Is that always true? Or is it a belief you haven't examined? Some teams thrive with stability." },
          ] },
        { context: "Alex finds out Jordan is being considered and comes to you privately: 'I thought our friendship meant something. After 8 years, you'd choose a newcomer over me?'",
          socratesAsk: "Now friendship itself stands before you, wounded and pleading. The hardest question: does love have a place in justice? And if so, what place?",
          pillar: "Virtue is Knowledge", options: [
            { text: "Be honest: 'Alex, our friendship is real, and that's exactly why I have to be more careful — not less. I owe you fairness, not favoritism.'", virtue: 90, reasoning: 85, selfAware: 90, epistemic: 80, reply: "The most painful truth spoken with love. You honor the friendship by refusing to corrupt it with false kindness. This is virtue — doing what is right precisely when it is hardest." },
            { text: "Reassure him: 'Nothing is decided yet. You're absolutely still in the running.'", virtue: 40, reasoning: 45, selfAware: 35, epistemic: 40, reply: "Kind words, but are they true? If you've already leaned toward Jordan, this is not compassion — it is deception dressed as comfort. Socrates was executed for insisting on truth over pleasant lies." },
            { text: "Tell him the truth but soften it: 'This decision has to be about the role, not our relationship. But I value you regardless of the outcome.'", virtue: 75, reasoning: 75, selfAware: 75, epistemic: 70, reply: "Truthful and compassionate. You separate the decision from the relationship. But the true test comes next: will you act on this principle, or will guilt pull you toward Alex?" },
          ] },
        { context: "Decision time. You must submit your recommendation to HR today. Everything you've learned points toward Jordan, but your gut says Alex. You know your friendship is influencing you.",
          socratesAsk: "You stand at the moment of truth. You know what is just, and you know what is comfortable. Every person faces this choice eventually. What do you choose — and more importantly, can you explain WHY to yourself without flinching?",
          pillar: "Know Thyself", options: [
            { text: "Recommend Jordan. I've examined my bias, the data supports it, and justice demands the best person for the role — not the closest friend.", virtue: 85, reasoning: 85, selfAware: 85, epistemic: 80, reply: "You choose justice over comfort. But notice — I'm less interested in WHAT you chose than in HOW you got here. You examined yourself, sought multiple perspectives, held the tension between loyalty and fairness. The decision may be right or wrong. The process was wise." },
            { text: "Recommend Alex. Consistency, trust, and team cohesion matter more than flashy results. And I've genuinely evaluated both — this isn't just friendship.", virtue: 50, reasoning: 55, selfAware: 35, epistemic: 30, reply: "Are you certain this isn't friendship? You've just told me something fascinating — you know friendship is influencing you, yet you claim it isn't. When a person knows their bias and denies it in the same breath... that is the examined life abandoned at the final moment." },
            { text: "Present both to HR with honest assessments and let them decide. Remove myself from a decision I can't make objectively.", virtue: 70, reasoning: 70, selfAware: 90, epistemic: 85, reply: "A surprising choice — and a deeply honest one. You recognize the limits of your own objectivity and surrender the decision rather than corrupt it. Some would call this weak. I call it the rarest form of self-knowledge." },
          ] },
      ],
      fr: [
        { context: "Les RH demandent votre recommandation d'ici vendredi. Vous vous surprenez à penser 'Alex le mérite — il est là depuis plus longtemps et je lui fais confiance.'",
          socratesAsk: "Vous avez dit qu'Alex le 'mérite'. Sur quelle base? L'ancienneté est-elle le mérite? Et le mot 'confiance' — faites-vous confiance à Alex parce qu'il a fait ses preuves, ou parce qu'il est familier?",
          pillar: "Connais-toi toi-même", options: [
            { text: "Je dois séparer mes sentiments personnels des données. Laissez-moi examiner les dossiers objectivement.", virtue: 80, reasoning: 85, selfAware: 90, epistemic: 80, reply: "Vous reconnaissez le biais et choisissez de l'examiner. C'est la forme la plus difficile de connaissance de soi." },
            { text: "Alex a fait ses preuves dans le temps. La loyauté compte.", virtue: 45, reasoning: 40, selfAware: 25, epistemic: 30, reply: "'Fait ses preuves' — confondez-vous la patience avec l'excellence, et la loyauté avec la justice?" },
            { text: "Les résultats de Jordan parlent d'eux-mêmes. 2M$ d'économies en 2 ans.", virtue: 60, reasoning: 70, selfAware: 50, epistemic: 55, reply: "Convaincant. Mais sur-corrigez-vous — rejetant Alex entièrement pour prouver votre impartialité?" },
          ] },
        { context: "Vous examinez les dossiers. Alex : évaluations 'Satisfait' constantes, bien aimé. Jordan : deux 'Dépasse les attentes', un projet échoué, et des frictions avec l'équipe.",
          socratesAsk: "Alex est sûr et stable. Jordan est brillant mais imparfait. À quoi ressemble la justice quand les deux voies ont du mérite?",
          pillar: "Le raisonnement dialectique", options: [
            { text: "Planifier des entretiens séparés. Demander à chacun : 'Quelle est votre vision pour ce poste?'", virtue: 80, reasoning: 90, selfAware: 75, epistemic: 85, reply: "Vous les laissez se révéler par le dialogue — la voie socratique." },
            { text: "Demander un retour confidentiel aux équipes de chacun.", virtue: 75, reasoning: 80, selfAware: 70, epistemic: 80, reply: "Sage — vous cherchez des perspectives au-delà de la vôtre." },
            { text: "Les données sont claires. Jordan a des résultats supérieurs. Recommander Jordan.", virtue: 55, reasoning: 60, selfAware: 40, epistemic: 35, reply: "Rapide — mais avez-vous tout examiné? Les dossiers capturent ce qui s'est passé, pas pourquoi." },
          ] },
        { context: "Alex dit : 'Je maintiendrais ce qui fonctionne.' Jordan dit : 'Je restructurerais les unités sous-performantes.'",
          socratesAsk: "Stabilité versus transformation. Ni l'un ni l'autre n'a tort. De quoi cette équipe a-t-elle BESOIN maintenant?",
          pillar: "L'humilité épistémique", options: [
            { text: "Consulter les données : l'équipe sous-performe-t-elle? Si oui, Jordan. Si stable, peut-être Alex.", virtue: 75, reasoning: 85, selfAware: 70, epistemic: 80, reply: "Vous laissez la situation dicter la réponse plutôt que votre préférence." },
            { text: "Honnêtement, je ne sais pas. Laissez-moi consulter le VP et les RH.", virtue: 70, reasoning: 70, selfAware: 85, epistemic: 95, reply: "La réponse la plus courageuse — 'Je ne sais pas.' C'est l'humilité épistémique incarnée." },
            { text: "L'approche de Jordan causera des remous mais de la croissance. Le confort engendre la complaisance.", virtue: 60, reasoning: 65, selfAware: 45, epistemic: 40, reply: "Remarquez votre certitude. 'Le confort engendre la complaisance' — est-ce toujours vrai?" },
          ] },
        { context: "Alex vient vous voir : 'Je pensais que notre amitié comptait. Après 8 ans, tu choisirais un nouveau venu?'",
          socratesAsk: "L'amitié elle-même se tient devant vous, blessée. L'amour a-t-il sa place dans la justice?",
          pillar: "La vertu est connaissance", options: [
            { text: "Être honnête : 'Alex, notre amitié est réelle, et c'est exactement pourquoi je dois être plus prudent — pas moins.'", virtue: 90, reasoning: 85, selfAware: 90, epistemic: 80, reply: "La vérité la plus douloureuse dite avec amour. Vous honorez l'amitié en refusant de la corrompre." },
            { text: "Le rassurer : 'Rien n'est décidé. Tu es absolument encore dans la course.'", virtue: 40, reasoning: 45, selfAware: 35, epistemic: 40, reply: "Des mots gentils, mais sont-ils vrais? Ce n'est pas de la compassion — c'est de la tromperie déguisée en réconfort." },
            { text: "Dire la vérité doucement : 'Cette décision doit être basée sur le poste, pas sur notre relation.'", virtue: 75, reasoning: 75, selfAware: 75, epistemic: 70, reply: "Vrai et compatissant. Vous séparez la décision de la relation." },
          ] },
        { context: "Jour de la décision. Tout pointe vers Jordan, mais votre instinct dit Alex. Vous savez que l'amitié vous influence.",
          socratesAsk: "Le moment de vérité. Vous savez ce qui est juste et ce qui est confortable. Que choisissez-vous — et pouvez-vous vous l'expliquer sans broncher?",
          pillar: "Connais-toi toi-même", options: [
            { text: "Recommander Jordan. J'ai examiné mon biais, les données le confirment, la justice exige le meilleur pour le poste.", virtue: 85, reasoning: 85, selfAware: 85, epistemic: 80, reply: "Vous choisissez la justice plutôt que le confort. Le processus qui vous a mené ici était sage." },
            { text: "Recommander Alex. La constance et la confiance comptent plus que des résultats éclatants.", virtue: 50, reasoning: 55, selfAware: 35, epistemic: 30, reply: "Êtes-vous certain que ce n'est pas l'amitié? Quand on connaît son biais et qu'on le nie... c'est la vie examinée abandonnée au dernier moment." },
            { text: "Présenter les deux aux RH et les laisser décider. Me retirer d'une décision que je ne peux pas faire objectivement.", virtue: 70, reasoning: 70, selfAware: 90, epistemic: 85, reply: "Un choix profondément honnête. Reconnaître les limites de votre objectivité est la forme la plus rare de connaissance de soi." },
          ] },
      ],
    },
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
  const [lang, setLang] = useState("en");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // Phase 1
  const [learnStep, setLearnStep] = useState(0);
  // Phase 2
  const [checkStep, setCheckStep] = useState(0);
  const [checkAnswers, setCheckAnswers] = useState([]);
  const [checkComplete, setCheckComplete] = useState(false);
  const [selectedCheck, setSelectedCheck] = useState(null);
  const [showCheckInsight, setShowCheckInsight] = useState(false);
  // Phase 3
  const [scenario, setScenario] = useState(null);
  const [round, setRound] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [decisions, setDecisions] = useState([]); // {roundIdx, optionIdx, scores}
  const [simComplete, setSimComplete] = useState(false);
  // Reports
  const [allReports, setAllReports] = useState([]);
  const [viewingReport, setViewingReport] = useState(null);

  const contentRef = useRef(null);
  useEffect(() => { if (contentRef.current) contentRef.current.scrollTop = 0; }, [view, round, learnStep, checkStep, showFeedback]);

  // Translations
  const T = {
    en: { brand: "PhiloSim", tagline: "Approach your work like", mentor: "Socrates", welcome: "Welcome", learn: "The Philosophy", check: "Understanding", scenarios: "Apply It", report: "Report", history: "History", p1: "PHASE 1", p2: "PHASE 2", p3: "PHASE 3", p1t: "The Philosophy", p2t: "Do You Get It?", p3t: "Now Apply It", enterName: "Enter your name to begin...", start: "Start", startJourney: "Begin Your Journey", watchVideo: "Watch: Who Was Socrates?", videoNote: "Understand the man, his method, and why his ideas still matter 2,400 years later.", nextPillar: "Next Pillar →", prevPillar: "← Previous", readyCheck: "Test My Understanding →", pillar: "Pillar", of: "of", thePhil: "The Philosophy", atWork: "💼 At Work", confirm: "Confirm My Choice", next: "Next →", seeResults: "See Results →", yourScore: "Your Socratic Readiness", enterSim: "Enter the Simulation →", scoreHigh: "Excellent! You grasp the Socratic mindset. Now let's see if you can apply it under real pressure.", scoreMid: "Good foundation. The simulation will reveal the gap between knowing and doing.", scoreLow: "You think conventionally — exactly why Socrates will push you. Let's begin.", selectScenario: "Choose Your Challenge", selectSub: "You learned the philosophy. You tested your understanding. Now prove you can think like Socrates when it counts.", begin: "Begin Simulation", difficulty: "Difficulty", duration: "Duration", decision: "Decision", socratesInsight: "Socrates' Insight", makeChoice: "Make your choice", nextDecision: "Next Decision →", viewReport: "View My Philosophical Report →", noReports: "No sessions completed yet.", backToScenarios: "← New Scenario", comingSoon: "Coming Soon", futureTitle: "The Mentorship Collection", futureSub: "Same 3-phase framework. Different legendary minds.", sessionWith: "Session with Socrates", virtue: "Virtue & Ethics", reasoning: "Reasoning", selfAware: "Self-Awareness", epistemic: "Epistemic Humility", strengths: "Strengths", growth: "Growth Areas", closingQ: "Question to Ponder", pillarsTested: "Pillars Tested", overallScore: "Overall Wisdom Score", yourDecisions: "Your Decisions", socratic: "✓ Socratic", question: "Question" },
    fr: { brand: "PhiloSim", tagline: "Abordez votre travail comme", mentor: "Socrate", welcome: "Bienvenue", learn: "La Philosophie", check: "Compréhension", scenarios: "Appliquer", report: "Rapport", history: "Historique", p1: "PHASE 1", p2: "PHASE 2", p3: "PHASE 3", p1t: "La Philosophie", p2t: "Compris?", p3t: "Appliquez", enterName: "Entrez votre nom...", start: "Commencer", startJourney: "Commencer", watchVideo: "Regarder : Qui était Socrate?", videoNote: "Comprenez l'homme, sa méthode, et pourquoi ses idées comptent encore.", nextPillar: "Suivant →", prevPillar: "← Précédent", readyCheck: "Testez-moi →", pillar: "Pilier", of: "de", thePhil: "La Philosophie", atWork: "💼 Au travail", confirm: "Confirmer", next: "Suivant →", seeResults: "Résultats →", yourScore: "Préparation Socratique", enterSim: "Entrer dans la Simulation →", scoreHigh: "Excellent! Voyons si vous pouvez l'appliquer sous pression.", scoreMid: "Bonne base. La simulation révélera l'écart entre savoir et faire.", scoreLow: "Vous pensez conventionnellement. Socrate va vous pousser.", selectScenario: "Choisissez Votre Défi", selectSub: "Prouvez que vous pouvez penser comme Socrate quand ça compte.", begin: "Commencer", difficulty: "Difficulté", duration: "Durée", decision: "Décision", socratesInsight: "Éclairage de Socrate", makeChoice: "Faites votre choix", nextDecision: "Décision suivante →", viewReport: "Voir mon Rapport →", noReports: "Aucune session.", backToScenarios: "← Nouveau Scénario", comingSoon: "Bientôt", futureTitle: "Collection de Mentorat", futureSub: "Même cadre. Esprits différents.", sessionWith: "Session avec Socrate", virtue: "Vertu & Éthique", reasoning: "Raisonnement", selfAware: "Conscience de Soi", epistemic: "Humilité Épistémique", strengths: "Forces", growth: "Croissance", closingQ: "Question à Méditer", pillarsTested: "Piliers Testés", overallScore: "Score de Sagesse", yourDecisions: "Vos Décisions", socratic: "✓ Socratique", question: "Question" },
  };
  const t = T[lang];

  const checkTotalScore = checkAnswers.reduce((s, a) => s + a, 0);
  const checkMaxScore = CHECK_Q[lang].length * 3;
  const checkPct = Math.round((checkTotalScore / checkMaxScore) * 100);

  const currentJourneyIdx = view === "learn" ? 0 : view === "check" ? 1 : (view === "scenarios" || view === "play") ? 2 : -1;

  const startScenario = (sc) => { setScenario(sc); setRound(0); setDecisions([]); setSelectedOption(null); setShowFeedback(false); setSimComplete(false); setView("play"); };

  const confirmDecision = () => {
    if (selectedOption === null) return;
    const r = scenario.rounds[lang][round];
    const opt = r.options[selectedOption];
    setDecisions([...decisions, { roundIdx: round, optionIdx: selectedOption, scores: { virtue: opt.virtue, reasoning: opt.reasoning, selfAware: opt.selfAware, epistemic: opt.epistemic }, pillar: r.pillar, reply: opt.reply }]);
    setShowFeedback(true);
  };

  const nextRound = () => {
    if (round < scenario.rounds[lang].length - 1) { setRound(round + 1); setSelectedOption(null); setShowFeedback(false); }
    else { generateReport(); }
  };

  const generateReport = () => {
    const avg = (key) => Math.round(decisions.reduce((s, d) => s + d.scores[key], 0) / decisions.length);
    const scores = { virtue: avg("virtue"), reasoning: avg("reasoning"), selfAware: avg("selfAware"), epistemic: avg("epistemic") };
    const overall = Math.round((scores.virtue + scores.reasoning + scores.selfAware + scores.epistemic) / 4);
    const pillarsUsed = [...new Set(decisions.map(d => d.pillar))];
    const weakest = Object.entries(scores).sort((a, b) => a[1] - b[1])[0];
    const strongest = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];

    const pillarNames = { virtue: t.virtue, reasoning: t.reasoning, selfAware: t.selfAware, epistemic: t.epistemic };

    const report = {
      scenarioTitle: scenario.title[lang], date: new Date().toLocaleDateString(), playerName, decisions: decisions.length, checkScore: checkPct,
      ...scores, overall, pillarsUsed,
      strongest: pillarNames[strongest[0]], weakest: pillarNames[weakest[0]],
      verdict: overall >= 80 ? (lang === "fr" ? "Vous avez démontré une pensée véritablement socratique. Vous questionnez avant de juger, vous examinez vos biais, et vous embrassez l'incertitude." : "You demonstrated genuinely Socratic thinking. You questioned before judging, examined your biases, and embraced uncertainty.") : overall >= 60 ? (lang === "fr" ? "Vous montrez des instincts prometteurs mais retombez dans la pensée conventionnelle sous pression. La sagesse demande de la pratique." : "You show promising instincts but fall back into conventional thinking under pressure. Wisdom requires practice.") : (lang === "fr" ? "Vous avez privilégié le confort à l'examen. Socrate vous dirait : la vie facile n'est pas la vie sage." : "You chose comfort over examination. Socrates would say: the easy life is not the wise life."),
      closingQuestion: overall >= 80 ? (lang === "fr" ? "Maintenant que vous savez questionner les autres — êtes-vous aussi rigoureux pour questionner vos propres victoires?" : "Now that you know how to question others — are you equally rigorous in questioning your own victories?") : overall >= 60 ? (lang === "fr" ? "Quand avez-vous pour la dernière fois changé d'avis sur quelque chose d'important, non pas parce que vous y étiez forcé, mais parce que vous avez examiné honnêtement?" : "When did you last change your mind about something important — not because you were forced to, but because you examined honestly?") : (lang === "fr" ? "Si vous ne pouvez pas expliquer POURQUOI vous avez fait chaque choix aujourd'hui, avez-vous vraiment choisi du tout?" : "If you can't explain WHY you made each choice today, did you truly choose at all?"),
    };
    setAllReports(prev => [report, ...prev]);
    setViewingReport(report);
    setSimComplete(true);
  };

  const ScoreBar = ({ label, score, color }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 15, color: C.textSecondary, fontFamily: FB }}>{label}</span>
        <span style={{ fontSize: 15, fontWeight: 700, color, fontFamily: FD }}>{score}/100</span>
      </div>
      <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3 }}>
        <div style={{ width: `${score}%`, height: "100%", background: color, borderRadius: 3, transition: "width 1s ease" }} />
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════
  return (
    <div style={{ fontFamily: FB, background: C.bgPrimary, color: C.textPrimary, height: "100vh", display: "flex", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        ::selection { background: ${S.gold}44; }
      `}</style>

      {/* SIDEBAR */}
      <div style={{ width: sidebarCollapsed ? 60 : 240, minWidth: sidebarCollapsed ? 60 : 240, background: C.bgSecondary, borderRight: `1px solid ${C.borderSubtle}`, display: "flex", flexDirection: "column", transition: "all 0.3s", overflow: "hidden" }}>
        <div style={{ padding: sidebarCollapsed ? "16px 8px" : "20px 18px", borderBottom: `1px solid ${C.borderSubtle}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, overflow: "hidden", border: `2px solid ${S.gold}`, flexShrink: 0 }}><img src="/socrates.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} /></div>
            {!sidebarCollapsed && <div><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 22 }}>{t.brand}</div><div style={{ fontSize: 11, color: S.gold, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.tagline} {t.mentor}</div></div>}
          </div>
        </div>
        {!sidebarCollapsed && <div style={{ padding: "10px 18px 0", display: "flex", gap: 4 }}>
          {["en", "fr"].map(l => <button key={l} onClick={() => setLang(l)} style={{ flex: 1, padding: "5px 0", fontSize: 13, fontWeight: lang === l ? 700 : 400, background: lang === l ? "rgba(212,168,83,0.12)" : "transparent", color: lang === l ? S.gold : C.textMuted, border: `1px solid ${lang === l ? S.border : "transparent"}`, borderRadius: 6, cursor: "pointer", fontFamily: FB }}>{l.toUpperCase()}</button>)}
        </div>}
        <nav style={{ padding: "12px 8px", flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {[{ id: "welcome", icon: "🏠", label: t.welcome }, { id: "learn", icon: "📖", label: t.learn, badge: t.p1 }, { id: "check", icon: "🧠", label: t.check, badge: t.p2 }, { id: "scenarios", icon: "⚡", label: t.scenarios, badge: t.p3 }, ...(view === "play" && !simComplete ? [{ id: "play", icon: "🎯", label: `${t.decision} ${round + 1}/5` }] : []), { id: "report", icon: "📜", label: t.report }, { id: "history", icon: "📚", label: t.history }].map(item => (
            <button key={item.id} onClick={() => setView(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: sidebarCollapsed ? "10px 0" : "10px 12px", justifyContent: sidebarCollapsed ? "center" : "flex-start", background: view === item.id ? "rgba(212,168,83,0.1)" : "transparent", color: view === item.id ? S.gold : C.textSecondary, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: FB, fontSize: 16, fontWeight: view === item.id ? 600 : 400, width: "100%", textAlign: "left", transition: "all 0.2s" }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
              {!sidebarCollapsed && <span>{item.label}</span>}
              {!sidebarCollapsed && item.badge && <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, color: C.textMuted, background: "rgba(255,255,255,0.05)", padding: "2px 6px", borderRadius: 4 }}>{item.badge}</span>}
            </button>
          ))}
        </nav>
        <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} style={{ padding: 12, background: "transparent", border: "none", borderTop: `1px solid ${C.borderSubtle}`, cursor: "pointer", color: C.textMuted, fontSize: 16 }}>{sidebarCollapsed ? "→" : "←"}</button>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* Journey Bar */}
        {currentJourneyIdx >= 0 && (
          <div style={{ padding: "14px 28px", borderBottom: `1px solid ${C.borderSubtle}`, background: C.bgSecondary, display: "flex", alignItems: "center" }}>
            {[{ id: "learn", label: t.p1, title: t.p1t, icon: "📖" }, { id: "check", label: t.p2, title: t.p2t, icon: "🧠" }, { id: "scenarios", label: t.p3, title: t.p3t, icon: "⚡" }].map((step, i) => (
              <div key={step.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div onClick={() => setView(step.id)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", opacity: i <= currentJourneyIdx ? 1 : 0.35 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, background: i === currentJourneyIdx ? `linear-gradient(135deg, ${S.gold}, ${S.goldDim})` : i < currentJourneyIdx ? C.accentSuccess + "22" : "rgba(255,255,255,0.05)", color: i === currentJourneyIdx ? "#0a0a0a" : i < currentJourneyIdx ? C.accentSuccess : C.textMuted, border: i < currentJourneyIdx ? `2px solid ${C.accentSuccess}` : "none", fontWeight: 700 }}>{i < currentJourneyIdx ? "✓" : step.icon}</div>
                  <div><div style={{ fontSize: 10, fontWeight: 700, color: i === currentJourneyIdx ? S.gold : C.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{step.label}</div><div style={{ fontSize: 14, fontWeight: 600, color: i === currentJourneyIdx ? C.textPrimary : C.textMuted }}>{step.title}</div></div>
                </div>
                {i < 2 && <div style={{ flex: 1, height: 2, background: i < currentJourneyIdx ? C.accentSuccess + "44" : "rgba(255,255,255,0.06)", margin: "0 16px" }} />}
              </div>
            ))}
          </div>
        )}

        <div ref={contentRef} style={{ flex: 1, overflowY: "auto" }}>

        {/* ═══ WELCOME ═══ */}
        {view === "welcome" && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100%", padding: 40 }}>
            <div style={{ maxWidth: 620, textAlign: "center", animation: "fadeUp 0.6s ease" }}>
              <div style={{ width: 140, height: 140, borderRadius: "50%", margin: "0 auto 24px", border: `3px solid ${S.gold}`, overflow: "hidden", boxShadow: `0 0 60px ${S.glow}` }}><img src="/socrates.png" alt="Socrates" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} /></div>
              <h1 style={{ fontFamily: FD, fontSize: 48, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.03em" }}>{t.brand}</h1>
              <div style={{ fontSize: 19, fontWeight: 500, color: S.gold, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>{t.tagline} {t.mentor}</div>
              <p style={{ fontSize: 22, fontFamily: FD, fontWeight: 700, margin: "0 0 8px" }}>{lang === "fr" ? "Apprenez. Comprenez. Appliquez." : "Learn it. Understand it. Apply it."}</p>
              <p style={{ fontSize: 17, color: C.textSecondary, lineHeight: 1.7, margin: "0 0 28px" }}>{lang === "fr" ? "Un parcours en 3 phases avec 5 décisions par scénario." : "A 3-phase journey with 5 decisions per scenario."}</p>
              <div style={{ display: "flex", gap: 12, marginBottom: 36, justifyContent: "center" }}>
                {[{ icon: "📖", label: t.p1t, sub: lang === "fr" ? "Vidéo + 5 Piliers" : "Video + 5 Pillars", color: S.gold }, { icon: "🧠", label: t.p2t, sub: lang === "fr" ? "4 Questions-quiz" : "4 Quiz Questions", color: C.accentPrimary }, { icon: "⚡", label: t.p3t, sub: lang === "fr" ? "5 Décisions × Scénario" : "5 Decisions × Scenario", color: C.accentSuccess }].map((p, i) => (
                  <div key={i} style={{ flex: 1, background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 12, padding: 18, textAlign: "center" }}>
                    <div style={{ fontSize: 30, marginBottom: 6 }}>{p.icon}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, fontFamily: FD, color: p.color, marginBottom: 2 }}>{p.label}</div>
                    <div style={{ fontSize: 13, color: C.textMuted }}>{p.sub}</div>
                  </div>
                ))}
              </div>
              {!playerName ? (
                <div style={{ display: "flex", gap: 8, maxWidth: 400, margin: "0 auto" }}>
                  <input value={nameInput} onChange={e => setNameInput(e.target.value)} onKeyDown={e => e.key === "Enter" && nameInput.trim() && (setPlayerName(nameInput.trim()), setView("learn"))} placeholder={t.enterName} style={{ flex: 1, padding: "14px 20px", fontSize: 17, fontFamily: FB, background: C.bgInput, color: C.textPrimary, border: `1px solid ${C.borderInput}`, borderRadius: 10, outline: "none" }} />
                  <button onClick={() => nameInput.trim() && (setPlayerName(nameInput.trim()), setView("learn"))} style={{ padding: "14px 28px", fontSize: 17, fontWeight: 600, background: `linear-gradient(135deg, ${S.gold}, ${S.goldDim})`, color: "#0a0a0a", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: FD }}>{t.start}</button>
                </div>
              ) : (
                <button onClick={() => setView("learn")} style={{ padding: "16px 40px", fontSize: 18, fontWeight: 600, background: `linear-gradient(135deg, ${S.gold}, ${S.goldDim})`, color: "#0a0a0a", border: "none", borderRadius: 12, cursor: "pointer", fontFamily: FD }}>{t.startJourney}</button>
              )}
            </div>
          </div>
        )}

        {/* ═══ PHASE 1: LEARN ═══ */}
        {view === "learn" && (
          <div style={{ padding: 28, maxWidth: 800, margin: "0 auto" }}>
            {learnStep === 0 ? (
              <div style={{ animation: "fadeUp 0.5s" }}>
                <h2 style={{ fontFamily: FD, fontSize: 32, fontWeight: 700, marginBottom: 6 }}>{t.watchVideo}</h2>
                <p style={{ color: C.textSecondary, fontSize: 17, marginBottom: 20, lineHeight: 1.7 }}>{t.videoNote}</p>
                <div style={{ position: "relative", paddingBottom: "56.25%", borderRadius: 16, overflow: "hidden", marginBottom: 24, border: `1px solid ${C.borderSubtle}` }}>
                  <iframe src={`https://www.youtube.com/embed/${PHILOSOPHY.videoId}`} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="Socrates" />
                </div>
                <div style={{ textAlign: "center" }}><button onClick={() => setLearnStep(1)} style={{ padding: "14px 32px", fontSize: 17, fontWeight: 600, background: `linear-gradient(135deg, ${S.gold}, ${S.goldDim})`, color: "#0a0a0a", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: FD }}>{lang === "fr" ? "Explorer les 5 Piliers →" : "Explore the 5 Pillars →"}</button></div>
              </div>
            ) : (() => {
              const p = PHILOSOPHY.pillars[learnStep - 1];
              return (
                <div style={{ animation: "fadeUp 0.4s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                    <div style={{ fontSize: 14, color: C.textMuted, fontWeight: 600 }}>{t.pillar} {learnStep} {t.of} 5</div>
                    <div style={{ display: "flex", gap: 4 }}>{[1,2,3,4,5].map(i => <div key={i} onClick={() => setLearnStep(i)} style={{ width: 32, height: 4, borderRadius: 2, cursor: "pointer", background: i === learnStep ? S.gold : i < learnStep ? C.accentSuccess : "rgba(255,255,255,0.08)" }} />)}</div>
                  </div>
                  <div style={{ background: S.bg, border: `1px solid ${S.border}`, borderRadius: 16, padding: 28, marginBottom: 20 }}>
                    <div style={{ fontSize: 44, marginBottom: 12 }}>{p.icon}</div>
                    <h2 style={{ fontFamily: FD, fontSize: 30, fontWeight: 700, marginBottom: 10 }}>{p.title[lang]}</h2>
                    <div style={{ fontSize: 20, color: S.gold, fontStyle: "italic", lineHeight: 1.5 }}>"{p.quote[lang]}"</div>
                  </div>
                  <div style={{ background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 16, padding: 24, marginBottom: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.accentPrimary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>📖 {t.thePhil}</div>
                    <p style={{ fontSize: 17, color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>{p.explanation[lang]}</p>
                  </div>
                  <div style={{ background: C.bgCard, border: `1px solid ${C.accentSuccess}22`, borderRadius: 16, padding: 24, marginBottom: 28 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.accentSuccess, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>{t.atWork}</div>
                    <p style={{ fontSize: 17, color: C.textPrimary, lineHeight: 1.75, fontStyle: "italic", margin: 0 }}>{p.workplaceExample[lang]}</p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button onClick={() => setLearnStep(learnStep - 1)} style={{ padding: "12px 24px", fontSize: 15, fontWeight: 600, background: "transparent", color: C.textSecondary, border: `1px solid ${C.borderSubtle}`, borderRadius: 10, cursor: "pointer" }}>{learnStep === 1 ? (lang === "fr" ? "← Vidéo" : "← Video") : t.prevPillar}</button>
                    {learnStep < 5 ? <button onClick={() => setLearnStep(learnStep + 1)} style={{ padding: "12px 28px", fontSize: 15, fontWeight: 600, background: `linear-gradient(135deg, ${S.gold}, ${S.goldDim})`, color: "#0a0a0a", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: FD }}>{t.nextPillar}</button>
                    : <button onClick={() => { setView("check"); setCheckStep(0); setCheckAnswers([]); setCheckComplete(false); setSelectedCheck(null); setShowCheckInsight(false); }} style={{ padding: "12px 28px", fontSize: 15, fontWeight: 600, background: `linear-gradient(135deg, ${C.accentPrimary}, ${C.accentSecondary})`, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: FD }}>{t.readyCheck}</button>}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ═══ PHASE 2: CHECK ═══ */}
        {view === "check" && (
          <div style={{ padding: 28, maxWidth: 700, margin: "0 auto" }}>
            {!checkComplete ? (() => {
              const q = CHECK_Q[lang][checkStep];
              return (
                <div style={{ animation: "fadeUp 0.4s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                    <div style={{ fontSize: 14, color: C.textMuted }}>{t.question} {checkStep + 1}/{CHECK_Q[lang].length}</div>
                    <div style={{ display: "flex", gap: 4 }}>{CHECK_Q[lang].map((_, i) => <div key={i} style={{ width: 28, height: 4, borderRadius: 2, background: i === checkStep ? S.gold : i < checkStep ? C.accentSuccess : "rgba(255,255,255,0.08)" }} />)}</div>
                  </div>
                  <div style={{ background: S.bg, border: `1px solid ${S.border}`, borderRadius: 16, padding: 28, marginBottom: 20 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: S.gold, padding: "3px 10px", background: `${S.gold}12`, borderRadius: 6 }}>{q.pillar}</span>
                    <p style={{ fontSize: 20, color: C.textPrimary, lineHeight: 1.6, fontFamily: FD, fontWeight: 600, margin: "12px 0 0" }}>{q.question}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                    {q.options.map((opt, i) => (
                      <button key={i} onClick={() => !showCheckInsight && setSelectedCheck(i)} disabled={showCheckInsight} style={{
                        padding: "16px 20px", fontSize: 16, textAlign: "left", lineHeight: 1.55,
                        background: showCheckInsight ? (i === checkAnswers[checkAnswers.length-1]?.idx ? (opt.score === 3 ? `${C.accentSuccess}15` : `${C.accentWarning}15`) : opt.score === 3 ? `${C.accentSuccess}08` : C.bgCard) : selectedCheck === i ? `${S.gold}15` : C.bgCard,
                        border: `1px solid ${showCheckInsight ? (opt.score === 3 ? C.accentSuccess + "44" : C.borderSubtle) : selectedCheck === i ? S.border : C.borderSubtle}`,
                        borderRadius: 12, cursor: showCheckInsight ? "default" : "pointer", fontFamily: FB, color: C.textPrimary, transition: "all 0.2s",
                        opacity: showCheckInsight && i !== checkAnswers[checkAnswers.length-1]?.idx && opt.score !== 3 ? 0.4 : 1 }}>
                        {opt.text}{showCheckInsight && opt.score === 3 && <span style={{ marginLeft: 8, fontSize: 13, color: C.accentSuccess }}>{t.socratic}</span>}
                      </button>
                    ))}
                  </div>
                  {!showCheckInsight && selectedCheck !== null && <div style={{ textAlign: "center" }}><button onClick={() => { setCheckAnswers([...checkAnswers, { idx: selectedCheck, score: q.options[selectedCheck].score }]); setShowCheckInsight(true); }} style={{ padding: "12px 32px", fontSize: 16, fontWeight: 600, background: `linear-gradient(135deg, ${S.gold}, ${S.goldDim})`, color: "#0a0a0a", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: FD }}>{t.confirm}</button></div>}
                  {showCheckInsight && (
                    <div style={{ animation: "fadeUp 0.4s" }}>
                      <div style={{ background: C.bgCard, border: `1px solid ${S.border}`, borderRadius: 16, padding: 24, marginBottom: 20 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: S.gold, textTransform: "uppercase", marginBottom: 10 }}>🏛️ {t.socratesInsight}</div>
                        <p style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.75, fontStyle: "italic", margin: 0 }}>{q.insight}</p>
                      </div>
                      <div style={{ textAlign: "center" }}><button onClick={() => { setSelectedCheck(null); setShowCheckInsight(false); if (checkStep < CHECK_Q[lang].length - 1) setCheckStep(checkStep + 1); else setCheckComplete(true); }} style={{ padding: "12px 32px", fontSize: 16, fontWeight: 600, background: `linear-gradient(135deg, ${C.accentPrimary}, ${C.accentSecondary})`, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: FD }}>{checkStep < CHECK_Q[lang].length - 1 ? t.next : t.seeResults}</button></div>
                    </div>
                  )}
                </div>
              );
            })() : (
              <div style={{ animation: "fadeUp 0.5s", textAlign: "center", paddingTop: 20 }}>
                <div style={{ width: 100, height: 100, borderRadius: "50%", margin: "0 auto 16px", overflow: "hidden", border: `3px solid ${S.gold}`, boxShadow: `0 0 40px ${S.glow}` }}><img src="/socrates.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} /></div>
                <h2 style={{ fontFamily: FD, fontSize: 30, fontWeight: 700, marginBottom: 8 }}>{t.yourScore}</h2>
                <div style={{ fontSize: 56, fontFamily: FD, fontWeight: 700, color: checkPct >= 75 ? C.accentSuccess : checkPct >= 50 ? S.gold : C.accentWarning, marginBottom: 8 }}>{checkPct}%</div>
                <div style={{ width: 200, height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 4, margin: "0 auto 24px" }}><div style={{ width: `${checkPct}%`, height: "100%", background: checkPct >= 75 ? C.accentSuccess : checkPct >= 50 ? S.gold : C.accentWarning, borderRadius: 4, transition: "width 1s ease" }} /></div>
                <p style={{ fontSize: 18, color: C.textSecondary, lineHeight: 1.7, maxWidth: 520, margin: "0 auto 32px" }}>{checkPct >= 75 ? t.scoreHigh : checkPct >= 50 ? t.scoreMid : t.scoreLow}</p>
                <button onClick={() => setView("scenarios")} style={{ padding: "16px 40px", fontSize: 18, fontWeight: 600, background: `linear-gradient(135deg, ${S.gold}, ${S.goldDim})`, color: "#0a0a0a", border: "none", borderRadius: 12, cursor: "pointer", fontFamily: FD, boxShadow: `0 4px 20px ${S.glow}` }}>{t.enterSim}</button>
              </div>
            )}
          </div>
        )}

        {/* ═══ PHASE 3: SCENARIO SELECT ═══ */}
        {view === "scenarios" && (
          <div style={{ padding: 28, maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontFamily: FD, fontSize: 34, fontWeight: 700, marginBottom: 6 }}>{t.selectScenario}</h2>
            <p style={{ color: C.textSecondary, fontSize: 18, marginBottom: 24, lineHeight: 1.6 }}>{t.selectSub}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 16 }}>
              {SCENARIOS.map((sc, i) => (
                <div key={sc.id} onClick={() => startScenario(sc)} style={{ background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 16, padding: 22, cursor: "pointer", transition: "all 0.3s", animation: `fadeUp 0.4s ease ${i * 0.08}s both` }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = S.border; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.borderSubtle; e.currentTarget.style.transform = "none"; }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 30 }}>{sc.icon}</span>
                    <div>
                      <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 22 }}>{sc.title[lang]}</div>
                      <div style={{ fontSize: 14, color: C.textMuted }}>{sc.category} · {sc.duration} · 5 {t.decision}s</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.55, margin: "0 0 12px" }}>{sc.subtitle[lang]}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{sc.skills[lang].map(s => <span key={s} style={{ fontSize: 13, padding: "4px 10px", borderRadius: 6, background: `${S.gold}11`, color: S.gold, border: `1px solid ${S.border}` }}>{s}</span>)}</div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ═══ PHASE 3: PLAY (DECISIONS) ═══ */}
        {view === "play" && scenario && !simComplete && (
          <div style={{ padding: 28, maxWidth: 750, margin: "0 auto" }}>
            {(() => {
              const rd = scenario.rounds[lang][round];
              return (
                <div style={{ animation: "fadeUp 0.4s" }}>
                  {/* Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 24 }}>{scenario.icon}</span>
                      <div><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 18 }}>{scenario.title[lang]}</div><div style={{ fontSize: 13, color: C.textMuted }}>{t.decision} {round + 1} {t.of} {scenario.rounds[lang].length}</div></div>
                    </div>
                    <div style={{ display: "flex", gap: 4 }}>{scenario.rounds[lang].map((_, i) => <div key={i} style={{ width: 28, height: 6, borderRadius: 3, background: i === round ? S.gold : i < round ? C.accentSuccess : "rgba(255,255,255,0.08)", transition: "all 0.3s" }} />)}</div>
                  </div>

                  {/* Context */}
                  <div style={{ background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 16, padding: 22, marginBottom: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.accentWarning, textTransform: "uppercase", marginBottom: 8 }}>📋 {lang === "fr" ? "Situation" : "Context"}</div>
                    <p style={{ fontSize: 17, color: C.textPrimary, lineHeight: 1.65, margin: 0 }}>{rd.context}</p>
                  </div>

                  {/* Socrates Asks */}
                  <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", overflow: "hidden", border: `2px solid ${S.gold}`, flexShrink: 0 }}><img src="/socrates.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} /></div>
                    <div style={{ flex: 1, background: S.bg, border: `1px solid ${S.border}`, borderRadius: "16px 16px 16px 4px", padding: "16px 20px" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: S.gold, marginBottom: 6 }}>Socrate{lang === "en" ? "s" : ""} · <span style={{ fontWeight: 400, color: C.textMuted }}>{rd.pillar}</span></div>
                      <p style={{ fontSize: 17, color: C.textPrimary, lineHeight: 1.65, fontStyle: "italic", margin: 0 }}>{rd.socratesAsk}</p>
                    </div>
                  </div>

                  {/* Options */}
                  {!showFeedback && (
                    <>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", marginBottom: 10 }}>🎯 {t.makeChoice}</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                        {rd.options.map((opt, i) => (
                          <button key={i} onClick={() => setSelectedOption(i)} style={{
                            padding: "18px 22px", fontSize: 16, textAlign: "left", lineHeight: 1.6,
                            background: selectedOption === i ? `${S.gold}15` : C.bgCard,
                            border: `2px solid ${selectedOption === i ? S.gold : C.borderSubtle}`,
                            borderRadius: 14, cursor: "pointer", fontFamily: FB, color: C.textPrimary, transition: "all 0.2s",
                          }}>{opt.text}</button>
                        ))}
                      </div>
                      {selectedOption !== null && (
                        <div style={{ textAlign: "center" }}><button onClick={confirmDecision} style={{ padding: "14px 36px", fontSize: 17, fontWeight: 600, background: `linear-gradient(135deg, ${S.gold}, ${S.goldDim})`, color: "#0a0a0a", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: FD }}>{t.confirm}</button></div>
                      )}
                    </>
                  )}

                  {/* Feedback */}
                  {showFeedback && (
                    <div style={{ animation: "fadeUp 0.4s" }}>
                      <div style={{ background: C.bgCard, border: `1px solid ${S.border}`, borderRadius: 16, padding: 22, marginBottom: 20 }}>
                        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", border: `1.5px solid ${S.gold}`, flexShrink: 0 }}><img src="/socrates.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} /></div>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: S.gold, marginBottom: 6 }}>🏛️ {t.socratesInsight}</div>
                            <p style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.75, fontStyle: "italic", margin: 0 }}>{decisions[decisions.length - 1]?.reply}</p>
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <button onClick={nextRound} style={{ padding: "14px 36px", fontSize: 17, fontWeight: 600, background: `linear-gradient(135deg, ${C.accentPrimary}, ${C.accentSecondary})`, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: FD }}>
                          {round < scenario.rounds[lang].length - 1 ? t.nextDecision : t.viewReport}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* ═══ SIM COMPLETE — REPORT ═══ */}
        {view === "play" && simComplete && viewingReport && (
          <div style={{ padding: 28, maxWidth: 700, margin: "0 auto" }}>
            {renderReport(viewingReport)}
            <div style={{ textAlign: "center", marginTop: 20, paddingBottom: 20 }}>
              <button onClick={() => { setSimComplete(false); setView("scenarios"); }} style={{ padding: "14px 32px", fontSize: 16, fontWeight: 600, background: `linear-gradient(135deg, ${S.gold}, ${S.goldDim})`, color: "#0a0a0a", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: FD }}>{t.backToScenarios}</button>
            </div>
          </div>
        )}

        {/* ═══ REPORT ═══ */}
        {view === "report" && (
          <div style={{ padding: "32px 28px", maxWidth: 700, margin: "0 auto" }}>
            <h2 style={{ fontFamily: FD, fontSize: 30, fontWeight: 700, marginBottom: 24 }}>📜 {t.report}</h2>
            {allReports.length > 0 ? renderReport(allReports[0]) : <div style={{ background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 16, padding: 40, textAlign: "center" }}><p style={{ color: C.textSecondary }}>{t.noReports}</p></div>}
          </div>
        )}

        {/* ═══ HISTORY ═══ */}
        {view === "history" && (
          <div style={{ padding: "32px 28px", maxWidth: 700, margin: "0 auto" }}>
            <h2 style={{ fontFamily: FD, fontSize: 30, fontWeight: 700, marginBottom: 24 }}>📚 {t.history}</h2>
            {allReports.length === 0 ? <div style={{ background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 16, padding: 40, textAlign: "center" }}><p style={{ color: C.textSecondary }}>{t.noReports}</p></div>
            : allReports.map((r, i) => (
              <div key={i} onClick={() => { setViewingReport(r); setView("report"); }} style={{ background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 12, padding: 18, cursor: "pointer", marginBottom: 12, transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = S.border} onMouseLeave={e => e.currentTarget.style.borderColor = C.borderSubtle}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div><div style={{ fontFamily: FD, fontWeight: 700, fontSize: 17 }}>{r.scenarioTitle}</div><div style={{ fontSize: 14, color: C.textMuted }}>{r.date} · {r.decisions} {t.decision.toLowerCase()}s</div></div>
                  <div style={{ fontSize: 22, fontFamily: FD, fontWeight: 700, color: r.overall >= 80 ? C.accentSuccess : r.overall >= 60 ? S.gold : C.accentWarning }}>{r.overall}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        </div>{/* end content scroll */}
      </div>
    </div>
  );

  function renderReport(r) {
    return (
      <div style={{ animation: "fadeUp 0.5s" }}>
        <div style={{ background: C.bgCard, border: `1px solid ${S.border}`, borderRadius: 16, padding: 24, marginBottom: 16, textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 12px", overflow: "hidden", border: `2px solid ${S.gold}`, boxShadow: `0 0 30px ${S.glow}` }}><img src="/socrates.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} /></div>
          <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 24, marginBottom: 4 }}>{t.sessionWith}</div>
          <div style={{ fontSize: 16, color: S.gold }}>{r.scenarioTitle}</div>
          <div style={{ fontSize: 14, color: C.textMuted, marginTop: 4 }}>{r.date} · {r.playerName} · {r.decisions} decisions</div>
          {r.checkScore > 0 && <div style={{ fontSize: 13, color: C.accentPrimary, marginTop: 4 }}>Phase 2: {r.checkScore}%</div>}
        </div>
        <div style={{ background: `linear-gradient(135deg, ${S.gold}08, ${C.accentPrimary}08)`, border: `1px solid ${S.border}`, borderRadius: 16, padding: 24, marginBottom: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, fontFamily: FD, fontWeight: 700, color: r.overall >= 80 ? C.accentSuccess : r.overall >= 60 ? S.gold : C.accentWarning, marginBottom: 4 }}>{r.overall}/100</div>
          <div style={{ fontSize: 14, color: C.textMuted, textTransform: "uppercase", fontWeight: 700 }}>{t.overallScore}</div>
        </div>
        <div style={{ background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <ScoreBar label={t.virtue} score={r.virtue} color={C.accentSuccess} />
          <ScoreBar label={t.reasoning} score={r.reasoning} color={C.accentPrimary} />
          <ScoreBar label={t.selfAware} score={r.selfAware} color={C.accentSecondary} />
          <ScoreBar label={t.epistemic} score={r.epistemic} color={S.gold} />
        </div>
        <div style={{ background: S.bg, border: `1px solid ${S.border}`, borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 17, marginBottom: 10, color: S.gold }}>🏛️ {lang === "fr" ? "Verdict de Socrate" : "Socrates' Verdict"}</div>
          <p style={{ fontSize: 17, color: C.textPrimary, lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>{r.verdict}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div style={{ background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 16, padding: 20 }}>
            <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 15, marginBottom: 8, color: C.accentSuccess }}>✦ {t.strengths}</div>
            <div style={{ fontSize: 14, color: C.textSecondary }}>{r.strongest}</div>
          </div>
          <div style={{ background: C.bgCard, border: `1px solid ${C.borderSubtle}`, borderRadius: 16, padding: 20 }}>
            <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 15, marginBottom: 8, color: C.accentWarning }}>↗ {t.growth}</div>
            <div style={{ fontSize: 14, color: C.textSecondary }}>{r.weakest}</div>
          </div>
        </div>
        <div style={{ background: C.bgCard, border: `1px solid ${C.accentPrimary}33`, borderRadius: 16, padding: 24, textAlign: "center" }}>
          <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 15, marginBottom: 10, color: C.accentTertiary }}>❓ {t.closingQ}</div>
          <p style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>{r.closingQuestion}</p>
        </div>
      </div>
    );
  }
}
