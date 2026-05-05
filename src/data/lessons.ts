export type Module = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  video: {
    thumbnail: string;
    duration: number;
    url: string;
  } | null;
};

export function getModules(): Module[] {
  return lessons;
}

export async function getLesson(
  slug: string,
): Promise<(Lesson & { module: Module; next: Lesson | null }) | null> {
  let module = lessons.find(({ lessons }) =>
    lessons.some(({ id }) => id === slug),
  );

  if (!module) {
    return null;
  }

  let index = module.lessons.findIndex(({ id }) => id === slug);

  return {
    ...module.lessons[index],
    module,
    next: index < module.lessons.length - 1 ? module.lessons[index + 1] : null,
  };
}

export async function getLessonContent(slug: string) {
  return (await import(`@/data/lessons/${slug}.mdx`)).default;
}

const lessons = [
  {
    id: "augle",
    title: "Augle: Platform Whitepaper",
    description:
      "Multi-agent AI deliberation for high-stakes questions. Version 2.0 · April 2026.",
    lessons: [
      {
        id: "augle-executive-summary",
        title: "Executive Summary",
        description:
          "What Augle delivers, the architecture in one paragraph, and what's new in v2.0.",
        video: null,
      },
      {
        id: "augle-overview",
        title: "1. Overview",
        description:
          "Augmented deliberation — what Augle is, what it is not, and where it starts.",
        video: null,
      },
      {
        id: "augle-the-problem",
        title: "2. The Problem",
        description:
          "Hallucination, confidence without calibration, and monoculture bias in AI today.",
        video: null,
      },
      {
        id: "augle-the-solution",
        title: "3. The Solution",
        description:
          "Structured multi-agent deliberation, cross-provider diversity, and deterministic verdicts.",
        video: null,
      },
      {
        id: "augle-how-it-works",
        title: "4. How It Works",
        description:
          "The three-phase deliberative arc, session depth tiers, and the Guardian at round boundaries.",
        video: null,
      },
      {
        id: "augle-agent-ensemble",
        title: "5. The Agent Ensemble",
        description:
          "Seven agents, each with a specific role and model — Topic Architect through Pragmatist.",
        video: null,
      },
      {
        id: "augle-the-guardian",
        title: "6. The Guardian",
        description:
          "The integrity gate: how user domain knowledge enters the deliberation safely.",
        video: null,
      },
      {
        id: "augle-source-verification",
        title: "7. Source Verification Service",
        description:
          "New in v2.0. Catching hallucinated citations at the source before they propagate.",
        video: null,
      },
      {
        id: "augle-multi-provider",
        title: "8. Multi-Provider Architecture",
        description:
          "Why five providers, model selection rationale, and the Synthesizer contingency.",
        video: null,
      },
      {
        id: "augle-determinism",
        title: "9. Determinism and Confidence",
        description:
          "Temperature settings, confidence grades, and how uncertainty flows to delivery.",
        video: null,
      },
      {
        id: "augle-platform-modes",
        title: "10. Platform Modes",
        description:
          "Prediction Markets (v1, live) and Letters and Science (v2, waitlist).",
        video: null,
      },
      {
        id: "augle-results-output",
        title: "11. Results and Output",
        description:
          "The six output sections, the Results hero card, PDF export, and follow-on sessions.",
        video: null,
      },
      {
        id: "augle-credit-pricing",
        title: "12. Credit System and Pricing",
        description:
          "Credit bundles, session tier pricing, cost economics, and the refund policy.",
        video: null,
      },
      {
        id: "augle-letters-science",
        title: "13. Letters and Science — V2 Deep Dive",
        description:
          "The academic mode: neutrality check, evidence weight framing, and what's already built.",
        video: null,
      },
      {
        id: "augle-use-cases",
        title: "14. Use Cases",
        description:
          "Prediction markets, venture capital, legal research, academic research, and enterprise strategy.",
        video: null,
      },
      {
        id: "augle-roadmap",
        title: "15. Roadmap",
        description:
          "Phase 1 (live), Phase 2 (Letters and Science + enterprise), and Phase 3 (platform expansion).",
        video: null,
      },
      {
        id: "augle-reasoning-corpus",
        title: "16. The Long-Term Asset — Reasoning Corpus",
        description:
          "Why every completed session is an asset and the three strategic paths for the corpus.",
        video: null,
      },
      {
        id: "augle-team",
        title: "17. Team",
        description:
          "Cory Kelly (CEO) and Shubhanker Saxena (CTO) — built on conviction.",
        video: null,
      },
      {
        id: "augle-demo",
        title: "18. Demo",
        description:
          "A full walkthrough of Augle — from first touch to final report, every screen in sequence.",
        video: null,
      },
      {
        id: "augle-faq",
        title: "19. FAQ",
        description:
          "Common questions about Augle's architecture, pricing, accuracy claims, and data ownership.",
        video: null,
      },
      {
        id: "augle-glossary",
        title: "20. Glossary",
        description:
          "Defined terms across the architecture — from Augmented deliberation to Unresolved Strong objection.",
        video: null,
      },
    ],
  },
];
