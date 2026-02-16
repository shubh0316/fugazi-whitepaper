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
    id: "fugazi",
    title: "Fugazi: Whitepaper",
    description:
      "A new category of skill-based competition built directly on real crypto market data, where volatility becomes the playing field.",
    lessons: [
      {
        id: "fugazi-overview",
        title: "Overview & Important Terms",
        description:
          "Introduction to Fugazi and key terminology. Understanding what Fugazi is and what it is not.",
        video: null,
      },
      {
        id: "fugazi-competitive-formats",
        title: "Competitive Format Structure",
        description:
          "Explore the three-tier competition structure: Blitz, Standard, and Championship matches.",
        video: null,
      },
      {
        id: "fugazi-core-insight",
        title: "The Core Insight",
        description:
          "The fundamental principle behind Fugazi: skill becomes measurable when the environment is controlled.",
        video: null,
      },
      {
        id: "fugazi-game-loop",
        title: "The Fugazi Game Loop",
        description:
          "How matches work from challenge creation through post-match review.",
        video: null,
      },
      {
        id: "fugazi-competition-mechanics",
        title: "Competition Mechanics",
        description:
          "Understanding how competitions work without financial stakes using simulated portfolios.",
        video: null,
      },
      {
        id: "fugazi-skill-rating",
        title: "Skill Rating & Matchmaking",
        description:
          "How Fugazi evaluates player performance and matches opponents using Elo-style rating systems.",
        video: null,
      },
      {
        id: "fugazi-progression",
        title: "Progression, Status, and Incentives",
        description:
          "How players progress through skill ratings, leaderboards, and competitive tiers.",
        video: null,
      },
      {
        id: "fugazi-ai-coach",
        title: "AI Coach",
        description:
          "Post-match analysis system designed to help players understand their performance.",
        video: null,
      },
      {
        id: "fugazi-monetization",
        title: "Monetization",
        description:
          "Social competition monetization model using Fugazi Tokens and optional enhancements.",
        video: null,
      },
      {
        id: "fugazi-trust-integrity",
        title: "Trust, Fairness, and Integrity",
        description:
          "How Fugazi ensures transparent, repeatable, and manipulation-resistant outcomes.",
        video: null,
      },
      {
        id: "fugazi-launch-strategy",
        title: "Launch Strategy & Jurisdiction Awareness",
        description:
          "Geo-aware feature gating and jurisdiction-based platform capabilities.",
        video: null,
      },
      {
        id: "fugazi-growth-strategy",
        title: "Growth Strategy and Competitive Distribution",
        description:
          "How Fugazi drives user acquisition, solves marketplace liquidity, and compounds growth.",
        video: null,
      },
      {
        id: "fugazi-long-term-vision",
        title: "Long-Term Vision and Scaled Growth Strategy",
        description:
          "Fugazi's approach to scaling as a standalone platform and optional Phase 2 expansion.",
        video: null,
      },
      {
        id: "fugazi-risk-analysis",
        title: "Risk Analysis and Mitigation Strategy",
        description:
          "Key risks facing competitive marketplaces and how Fugazi addresses them.",
        video: null,
      },
      {
        id: "fugazi-faq",
        title: "Frequently Asked Questions",
        description:
          "Common questions about Fugazi, its mechanics, and long-term vision.",
        video: null,
      },
    ],
  },
];
