/**
 * Single source of truth for all site copy.
 * Edit this file — components read from it, nothing is hardcoded in JSX.
 */

export interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly index: string;
}

export interface ExperienceItem {
  readonly role: string;
  readonly employer: string;
  readonly period: string;
  readonly description: string;
  readonly stack: readonly string[];
}

export interface EducationItem {
  readonly credential: string;
  readonly institution: string;
  readonly period: string;
  readonly detail: string;
}

export interface SkillGroup {
  readonly title: string;
  readonly items: readonly string[];
}

export interface Project {
  readonly index: string;
  readonly name: string;
  readonly client: string;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly stack: readonly string[];
  readonly href?: string;
}

export interface Testimonial {
  readonly quote: string;
  readonly author: string;
  readonly role: string;
}

export interface Stat {
  readonly value: string;
  readonly label: string;
}

export const profile = {
  fullName: 'Mamun Rahman',
  firstName: 'Ma',
  lastNameInline: 'mun',
  surname: 'Rahman',
  monogramTop: 'Ma',
  monogramBottom: 'mun',
  monogramSub: 'Rahman',
  photoAlt: 'Mamun Rahman, arms folded, standing in a lantern-lit Tokyo side street at dusk.',
  kicker: 'Cloud & DevOps Portfolio',
  role: 'Cloud Engineer & DevOps Specialist',
  company: 'Louhi Networks Oy',
  location: 'Helsinki, Finland',
  email: 'mamun.rahman@louhi.fi',
  tagline:
    'I build and run production cloud platforms — GCP, Firebase and Cloud Run — and the CI/CD that ships them safely.',
  footerLine: 'AI Agents · Workflow Automation · Cloud Platforms',
  intro:
    "I'm Mamun Rahman, a Cloud Engineer and DevOps specialist at Louhi Networks Oy. I design multi-tenant SaaS architecture on Google Cloud, harden it with Firebase Auth, App Check and RBAC, and wire the whole thing to automated Bitbucket pipelines so releases are boring by design.",
  introSecondary:
    'On the frontend I work in React 19 and TypeScript. On the backend, Cloud Functions, Firestore and containerised services on Cloud Run. In between: Docker, IaC, observability, CORS forensics, and n8n automation that removes the manual steps nobody should be doing twice.',
} as const;

export const nav: readonly NavItem[] = [
  { id: 'about', label: 'About Me', index: '02' },
  { id: 'education', label: 'Education', index: '03' },
  { id: 'experience', label: 'Work Experience', index: '04' },
  { id: 'skills', label: 'Skills', index: '05' },
  { id: 'projects', label: 'Recent Projects', index: '06' },
  { id: 'testimonials', label: 'Testimonials', index: '07' },
  { id: 'contact', label: 'Contact Me', index: '08' },
];

export const stats: readonly Stat[] = [
  { value: '99.9%', label: 'Uptime targets held on Cloud Run services' },
  { value: '<10m', label: 'Commit to production, fully automated' },
  { value: 'Multi', label: 'Tenant SaaS with row-level RBAC' },
  { value: '0', label: 'Manual deploy steps in the release path' },
];

export const marqueeWords: readonly string[] = [
  'Google Cloud Platform',
  'Cloud Run',
  'Firebase',
  'Firestore',
  'Terraform',
  'Docker',
  'React 19',
  'TypeScript',
  'Bitbucket Pipelines',
  'n8n',
  'AI Agents',
];

export const education: readonly EducationItem[] = [
  {
    credential: 'Google Cloud Certified — Professional Cloud Architect',
    institution: 'Google Cloud',
    period: 'Certification',
    detail:
      'Designing secure, scalable and highly available cloud architecture; migration planning and cost governance on GCP.',
  },
  {
    credential: 'Business Information Technology — Cyber Security',
    institution: 'Laurea University of Applied Sciences',
    period: '2024 – 2026',
    detail:
      'Cyber security in a business context: secure system design, networking and risk management — the groundwork for hardening cloud platforms.',
  },
  {
    credential: 'Continuous learning',
    institution: 'Self-directed',
    period: 'Ongoing',
    detail:
      'Platform engineering, SRE practice, container security and workflow automation. The stack moves; so do I.',
  },
];

export const experience: readonly ExperienceItem[] = [
  {
    role: 'Cloud Engineer & DevOps Specialist',
    employer: 'Louhi Networks Oy',
    period: 'Present',
    description:
      'Own the cloud platform end to end: GCP architecture, Cloud Run environments for dev and prod, Firebase backend services and the Bitbucket Pipelines that deploy them. Build multi-tenant SaaS with RBAC, App Check and reCAPTCHA, and integrate third-party APIs including Visma Sign and Google Workspace.',
    stack: ['GCP', 'Cloud Run', 'Firebase', 'Firestore', 'Bitbucket Pipelines', 'Docker'],
  },
];

export const skills: readonly SkillGroup[] = [
  {
    title: 'Cloud & Infrastructure',
    items: [
      'Google Cloud Platform',
      'Cloud Run',
      'Cloud Functions',
      'Cloud Storage',
      'IAM & Service Accounts',
      'Secret Manager',
      'Load Balancing & CDN',
    ],
  },
  {
    title: 'DevOps & CI/CD',
    items: [
      'Bitbucket Pipelines',
      'Docker',
      'Infrastructure as Code',
      'Blue/green & staged rollout',
      'Artifact Registry',
      'Monitoring & alerting',
      'Incident response',
    ],
  },
  {
    title: 'Backend & Data',
    items: [
      'Firebase Auth',
      'Firestore',
      'Security Rules',
      'App Check & reCAPTCHA',
      'Node.js & TypeScript',
      'REST API design',
      'Multi-tenant RBAC',
    ],
  },
  {
    title: 'Frontend',
    items: [
      'React 19',
      'TypeScript (strict)',
      'Vite',
      'Tailwind CSS',
      'State & data fetching',
      'Accessibility',
      'Performance budgets',
    ],
  },
  {
    title: 'AI Agents & Automation',
    items: [
      'n8n workflow automation',
      'AI agent design & orchestration',
      'LLM API integration (Claude, Gemini)',
      'Tool calling & function schemas',
      'RAG over internal documents',
      'Prompt design & output evaluation',
      'Human-in-the-loop approval steps',
      'Webhook & event-driven pipelines',
      'Visma Sign & Google Workspace APIs',
    ],
  },
  {
    title: 'Engineering Practice',
    items: [
      'Architecture & trade-off analysis',
      'CORS & networking forensics',
      'Cost optimisation',
      'Documentation',
      'Code review',
      'Mentoring',
    ],
  },
];

export const projects: readonly Project[] = [
  {
    index: '01',
    name: 'Multi-Tenant SaaS Platform',
    client: 'Louhi Networks Oy',
    summary:
      'A tenant-isolated SaaS platform on GCP where every request is authorised at the row level. Firebase Auth issues custom claims, Firestore Security Rules enforce them, and App Check keeps the API surface closed to anything but the real client.',
    highlights: [
      'Custom-claim RBAC with per-tenant data isolation',
      'App Check + reCAPTCHA Enterprise on all callables',
      'Separate dev and prod Cloud Run environments',
    ],
    stack: ['GCP', 'Firebase Auth', 'Firestore', 'Cloud Run', 'React 19'],
  },
  {
    index: '02',
    name: 'Zero-Touch Delivery Pipeline',
    client: 'Internal platform',
    summary:
      'Commit to production without a human in the loop. Bitbucket Pipelines builds a Docker image, pushes to Artifact Registry, deploys to Cloud Run behind a revision tag, runs smoke checks, then shifts traffic — with a one-command rollback if anything looks wrong.',
    highlights: [
      'Cached multi-stage Docker builds',
      'Env-scoped secrets via Secret Manager',
      'Automated smoke tests before traffic shift',
    ],
    stack: ['Bitbucket Pipelines', 'Docker', 'Cloud Run', 'Artifact Registry'],
  },
  {
    index: '03',
    name: 'Document Signing Automation',
    client: 'Business operations',
    summary:
      'An n8n-orchestrated flow that takes a document from generation through Visma Sign to archived, signed storage — with status webhooks driving the state machine and Google Workspace handling distribution. What took a person an afternoon now takes a webhook.',
    highlights: [
      'Visma Sign API integration with signed-callback verification',
      'Retry and dead-letter handling on every external call',
      'Full audit trail written to Firestore',
    ],
    stack: ['n8n', 'Visma Sign', 'Cloud Functions', 'Google Workspace'],
  },
  {
    index: '04',
    name: 'React 19 Design System',
    client: 'Product team',
    summary:
      'A strictly typed component library powering the tenant-facing app. Built on React 19 and Vite with Tailwind tokens, it keeps bundle size honest and gives the team one place to change how the product looks and behaves.',
    highlights: [
      'Fully typed props with no implicit any',
      'Token-driven theming, light and dark',
      'Accessibility checks in CI',
    ],
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS'],
  },
];

export const testimonials: readonly Testimonial[] = [
  {
    quote:
      'Mamun took a fragile manual deploy and turned it into something we stopped thinking about. That is the highest compliment you can pay infrastructure.',
    author: 'Engineering Lead',
    role: 'Louhi Networks Oy',
  },
  {
    quote:
      'He debugs across the whole stack — browser to Cloud Run to IAM policy — and explains what he found in a way the rest of the team can act on.',
    author: 'Product Owner',
    role: 'Platform team',
  },
  {
    quote:
      'Pragmatic architecture decisions, documented properly. Onboarding onto his services took hours instead of weeks.',
    author: 'Senior Developer',
    role: 'Partner team',
  },
];

export const contact = {
  heading: 'Contact Me',
  blurb:
    "Building something on GCP, untangling a deployment pipeline, or need a multi-tenant architecture reviewed? Send a message — I read everything.",
  email: 'mamun.rahman@louhi.fi',
  links: [
    { label: 'Email', value: 'mamun.rahman@louhi.fi', href: 'mailto:mamun.rahman@louhi.fi' },
    {
      label: 'LinkedIn',
      value: '/in/rahmanmamun',
      href: 'https://www.linkedin.com/in/rahmanmamun/',
    },
    { label: 'GitHub', value: '@mamun', href: 'https://github.com/' },
    { label: 'Company', value: 'louhi.fi', href: 'https://www.louhi.fi/' },
  ],
} as const;
