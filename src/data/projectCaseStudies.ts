export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectChallenge = {
  title: string;
  description: string;
};

export type ProjectCaseStudy = {
  projectId: string;

  headline: string;
  summary: string;

  role: string;
  company: string;
  year: string;
  status: string;

  technologies: string[];

  metrics: ProjectMetric[];

  problem: {
    eyebrow: string;
    title: string;
    description: string;
  };

  solution: {
    eyebrow: string;
    title: string;
    description: string;
  };

  challenges: ProjectChallenge[];

  architecture: {
    frontend: string[];
    backend: string[];
    database: string[];
    infrastructure: string[];
  };

  highlights: string[];
};

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    projectId: "jardines-web-2026",

    headline:
      "Building a modern digital ecosystem for a national funeral-services organization.",

    summary:
      "A complete redesign and engineering effort focused on transforming a traditional corporate website into a scalable digital ecosystem connecting services, plans, locations, obituaries and interactive experiences.",

    role: "Full Stack Software Engineer",
    company: "Jardines del Renacer",
    year: "2026",
    status: "Production",

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Vercel",
      "Framer Motion",
    ],

    metrics: [
      {
        value: "120+",
        label: "Locations represented",
      },
      {
        value: "100%",
        label: "Responsive experience",
      },
      {
        value: "Full Stack",
        label: "Architecture",
      },
      {
        value: "2026",
        label: "Platform generation",
      },
    ],

    problem: {
      eyebrow: "01 / THE PROBLEM",

      title:
        "A large organization needed one coherent digital experience.",

      description:
        "The existing digital presence needed to support multiple services, geographical coverage, plans, obituaries and business areas while remaining simple for users to understand and easy for the organization to expand.",
    },

    solution: {
      eyebrow: "02 / THE SOLUTION",

      title:
        "A modular platform designed around business capabilities.",

      description:
        "I structured the experience as reusable modules rather than isolated pages, allowing services, plans, locations and interactive tools to share a consistent design system and technical foundation.",
    },

    challenges: [
      {
        title: "Large information architecture",
        description:
          "Organizing a significant amount of corporate and service information without overwhelming users.",
      },

      {
        title: "National coverage",
        description:
          "Designing interactive location and coverage experiences capable of representing departments, cities and branches.",
      },

      {
        title: "Reusable UI architecture",
        description:
          "Creating components that could support multiple service areas without duplicating layouts and logic.",
      },
    ],

    architecture: {
      frontend: [
        "Next.js App Router",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Reusable component architecture",
      ],

      backend: [
        "Next.js server functionality",
        "API integrations",
        "Business logic modules",
      ],

      database: [
        "Supabase",
        "PostgreSQL",
      ],

      infrastructure: [
        "Vercel",
        "GitHub",
        "CI/CD",
      ],
    },

    highlights: [
      "Interactive Colombia coverage experience",
      "Dynamic service and plan interfaces",
      "Responsive corporate design system",
      "Obituary experience",
      "Reusable modular components",
      "Performance-oriented architecture",
    ],
  },

  {
    projectId: "aura-master",

    headline:
      "Centralizing digital media, room experiences and operational workflows.",

    summary:
      "Aura Master is an operations platform created to centralize digital content, obituaries, presentations and room configuration inside a unified administrative environment.",

    role: "Full Stack Software Engineer",
    company: "Jardines del Renacer",
    year: "2026",
    status: "Active Development",

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma",
      "SQLite",
      "Tailwind CSS",
      "Framer Motion",
    ],

    metrics: [
      {
        value: "Multi-role",
        label: "Administration",
      },
      {
        value: "Centralized",
        label: "Media control",
      },
      {
        value: "Real-time",
        label: "Room workflows",
      },
      {
        value: "2026",
        label: "Architecture",
      },
    ],

    problem: {
      eyebrow: "01 / THE PROBLEM",
      title:
        "Operational content was distributed across different processes.",
      description:
        "Managing media, room content and obituary information independently created unnecessary complexity and made centralized control difficult.",
    },

    solution: {
      eyebrow: "02 / THE SOLUTION",
      title:
        "One operations layer for multiple physical locations.",
      description:
        "Aura combines administration, content management and room configuration into a unified system with clearly defined roles and reusable workflows.",
    },

    challenges: [
      {
        title: "Role architecture",
        description:
          "Separating Master and Admin responsibilities while maintaining a simple interface.",
      },
      {
        title: "Operational state",
        description:
          "Keeping configuration and room information consistent across different workflows.",
      },
      {
        title: "Database evolution",
        description:
          "Managing schema changes and migrations while the product architecture continued evolving.",
      },
    ],

    architecture: {
      frontend: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
      ],

      backend: [
        "Next.js server actions",
        "Prisma ORM",
        "Authentication logic",
      ],

      database: [
        "SQLite development database",
        "Prisma schema",
      ],

      infrastructure: [
        "Git",
        "Vercel-ready architecture",
      ],
    },

    highlights: [
      "Role-based administration",
      "Room management",
      "Media configuration",
      "Obituary management",
      "Presentation workflows",
    ],
  },

  {
    projectId: "renacer-mascotas",

    headline:
      "Creating a specialized digital ecosystem around pet memorial services.",

    summary:
      "A dedicated digital experience created for Renacer Mascotas, combining specialized services, identity and modern user interactions.",

    role: "Full Stack Developer",
    company: "Renacer Mascotas",
    year: "2026",
    status: "Production",

    technologies: [
      "React",
      "TypeScript",
      "JavaScript",
      "Responsive UI",
      "Git",
    ],

    metrics: [
      {
        value: "V2",
        label: "Platform evolution",
      },
      {
        value: "Responsive",
        label: "Experience",
      },
      {
        value: "Brand",
        label: "Focused",
      },
      {
        value: "Digital",
        label: "Services",
      },
    ],

    problem: {
      eyebrow: "01 / THE PROBLEM",
      title:
        "A specialized business needed an experience with its own identity.",
      description:
        "The pet-services ecosystem required a digital presence capable of feeling independent while still belonging to the wider Renacer brand.",
    },

    solution: {
      eyebrow: "02 / THE SOLUTION",
      title:
        "A warmer, specialized product experience.",
      description:
        "The platform was designed around the specific service context, using dedicated visual language and responsive interactions.",
    },

    challenges: [
      {
        title: "Brand differentiation",
        description:
          "Creating a distinctive experience without breaking the relationship with the parent brand.",
      },
      {
        title: "Emotional UX",
        description:
          "Balancing usability and visual sensitivity in a service with strong emotional context.",
      },
    ],

    architecture: {
      frontend: [
        "Component-based frontend",
        "Responsive layout",
        "Reusable UI",
      ],

      backend: [
        "Application business logic",
      ],

      database: [
        "Project-specific data layer",
      ],

      infrastructure: [
        "GitHub",
        "Modern web deployment",
      ],
    },

    highlights: [
      "Specialized brand experience",
      "Responsive interface",
      "Service-oriented navigation",
      "Modern visual system",
    ],
  },

  {
    projectId: "locos-digital-marketing",

    headline:
      "Combining branding, marketing and web engineering into one commercial experience.",

    summary:
      "A digital platform designed to present marketing services and technology through a stronger, more modern commercial identity.",

    role: "Developer & Product Builder",
    company: "Locos Digital Marketing",
    year: "2026",
    status: "Production",

    technologies: [
      "JavaScript",
      "Frontend Development",
      "Responsive Design",
      "GitHub",
    ],

    metrics: [
      {
        value: "Business",
        label: "Focused",
      },
      {
        value: "Modern",
        label: "UX/UI",
      },
      {
        value: "Responsive",
        label: "Frontend",
      },
      {
        value: "Live",
        label: "Product",
      },
    ],

    problem: {
      eyebrow: "01 / THE PROBLEM",
      title:
        "Digital services need to communicate value immediately.",
      description:
        "The challenge was translating marketing services into an online experience capable of feeling credible, modern and commercially focused.",
    },

    solution: {
      eyebrow: "02 / THE SOLUTION",
      title:
        "A strong digital storefront for services and technology.",
      description:
        "The experience combines visual hierarchy, marketing messaging and responsive frontend implementation.",
    },

    challenges: [
      {
        title: "Conversion-focused presentation",
        description:
          "Balancing visual creativity with clear commercial communication.",
      },
      {
        title: "Brand identity",
        description:
          "Creating a recognizable visual personality rather than using a generic agency template.",
      },
    ],

    architecture: {
      frontend: [
        "Responsive frontend",
        "Reusable sections",
        "Interactive components",
      ],

      backend: [
        "Business interaction flows",
      ],

      database: [
        "Project-specific data",
      ],

      infrastructure: [
        "GitHub",
        "Web deployment",
      ],
    },

    highlights: [
      "Commercial UX",
      "Responsive layout",
      "Marketing-focused design",
      "Custom visual identity",
    ],
  },

  {
    projectId: "condolencias-digitales",

    headline:
      "Digitizing condolences while simplifying funeral-room administration.",

    summary:
      "A Full Stack platform designed around digital condolences, funeral-room workflows, role-based administration and structured data management.",

    role: "Full Stack Software Engineer",
    company: "Jardines del Renacer",
    year: "2026",
    status: "Production",

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "PDF Generation",
    ],

    metrics: [
      {
        value: "Role-based",
        label: "Access",
      },
      {
        value: "Automated",
        label: "Closing",
      },
      {
        value: "PDF",
        label: "Export",
      },
      {
        value: "Structured",
        label: "Data",
      },
    ],

    problem: {
      eyebrow: "01 / THE PROBLEM",
      title:
        "A deeply human process still depended on manual workflows.",
      description:
        "Condolence collection and room administration required a structured digital system capable of respecting the emotional context while improving operational efficiency.",
    },

    solution: {
      eyebrow: "02 / THE SOLUTION",
      title:
        "A digital workflow built around people and operations.",
      description:
        "The platform allows condolences to be collected, administered and exported while controlling access and lifecycle by room and location.",
    },

    challenges: [
      {
        title: "Sensitive experience",
        description:
          "Building an interface appropriate for an emotionally sensitive context.",
      },
      {
        title: "Role-based workflows",
        description:
          "Supporting central administration, locations and operational roles.",
      },
      {
        title: "Lifecycle automation",
        description:
          "Managing automatic closing and final exports for completed rooms.",
      },
    ],

    architecture: {
      frontend: [
        "Next.js",
        "React",
        "TypeScript",
        "Responsive UI",
      ],

      backend: [
        "Next.js server logic",
        "Role authorization",
        "PDF generation",
      ],

      database: [
        "Supabase",
        "PostgreSQL",
      ],

      infrastructure: [
        "Vercel",
        "GitHub",
      ],
    },

    highlights: [
      "Digital condolences",
      "Room lifecycle",
      "Role-based administration",
      "PDF exports",
      "Location analytics",
    ],
  },
];

export function getProjectCaseStudy(
  projectId: string,
) {
  return projectCaseStudies.find(
    (project) => project.projectId === projectId,
  );
}