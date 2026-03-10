// src/lib/sdkData.ts

export interface SdkDocSection {
  title: string;
  content: string;
}

export interface SDKDetail {
  id: string; // slug
  name: string;
  description: string;
  install: string;
  docs: string;
  website: string;
  tags: string[];
  language: string;
  version: string;
  license: string;
  category: string;
  docSections: SdkDocSection[];
}

// ------------------------------------------------------------------
// Data asas (18 SDK) – dengan docSections lengkap
// (Saya sertakan hanya Supabase dan Clerk sebagai contoh.
//  Anda perlu menambah baki 16 SDK dengan format yang sama.)
// ------------------------------------------------------------------
const baseSdkDetailList: Omit<SDKDetail, "id">[] = [
  {
    name: "Supabase",
    description:
      "Open source Firebase alternative. PostgreSQL database, authentication, storage.",
    install: "npm install @supabase/supabase-js",
    docs: "https://supabase.com/docs",
    website: "https://supabase.com",
    tags: ["database", "auth", "realtime"],
    language: "JavaScript",
    version: "2.45.0",
    license: "MIT",
    category: "Database",
    docSections: [
      {
        title: "Installation",
        content: `
# Installation

Install the Supabase client library via npm:

\`\`\`bash
npm install @supabase/supabase-js
\`\`\`

Then import and initialize:

\`\`\`javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project.supabase.co'
const supabaseKey = process.env.SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
\`\`\`
        `,
      },
      {
        title: "Authentication",
        content: `
# Authentication

Sign up a new user:

\`\`\`javascript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
})
\`\`\`

Sign in:

\`\`\`javascript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})
\`\`\`
        `,
      },
      {
        title: "Database Queries",
        content: `
# Database Queries

Select data:

\`\`\`javascript
const { data, error } = await supabase
  .from('todos')
  .select('*')
  .eq('user_id', userId)
\`\`\`

Insert data:

\`\`\`javascript
const { data, error } = await supabase
  .from('todos')
  .insert([{ title: 'Learn Supabase', user_id: userId }])
\`\`\`
        `,
      },
    ],
  },
  {
    name: "Clerk",
    description:
      "Complete user management and authentication for Next.js and React.",
    install: "npm install @clerk/nextjs",
    docs: "https://clerk.com/docs",
    website: "https://clerk.com",
    tags: ["auth", "user management"],
    language: "JavaScript",
    version: "5.0.0",
    license: "MIT",
    category: "Authentication",
    docSections: [
      {
        title: "Installation",
        content: `
# Installation

Install Clerk for Next.js:

\`\`\`bash
npm install @clerk/nextjs
\`\`\`

Add environment variables:

\`\`\`
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
\`\`\`

Wrap your app with ClerkProvider:

\`\`\`javascript
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
\`\`\`
        `,
      },
      {
        title: "Authentication",
        content: `
# Authentication

Use the \`<SignIn />\` and \`<SignUp />\` components:

\`\`\`javascript
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return <SignIn />
}
\`\`\`

Access user data with \`useUser\` hook:

\`\`\`javascript
import { useUser } from '@clerk/nextjs'

export default function Profile() {
  const { user } = useUser()
  return <div>Hello, {user?.fullName}</div>
}
\`\`\`
        `,
      },
    ],
  },
  // ... (masukkan baki 16 SDK di sini)
];

// ------------------------------------------------------------------
// Senarai nama tambahan dan kategori untuk mencapai >200 SDK
// ------------------------------------------------------------------
const extraNames = [
  "React",
  "Vue",
  "Angular",
  "Svelte",
  "Next.js",
  "Nuxt",
  "Gatsby",
  "Astro",
  "Express",
  "Fastify",
  "NestJS",
  "Hono",
  "Django",
  "Flask",
  "FastAPI",
  "Laravel",
  "Rails",
  "Drizzle",
  "TypeORM",
  "Sequelize",
  "Knex",
  "Mongoose",
  "Redis",
  "PostgreSQL",
  "Firebase",
  "AWS Amplify",
  "Clerk",
  "Auth0",
  "NextAuth",
  "OpenAI",
  "Anthropic",
  "LangChain",
  "Hugging Face",
  "TensorFlow",
  "PyTorch",
  "scikit-learn",
  "Paddle",
  "Lemon Squeezy",
  "PayPal",
  "Yup",
  "Joi",
  "Redux",
  "MobX",
  "Recoil",
  "Bootstrap",
  "Material UI",
  "Chakra UI",
  "GSAP",
  "Three.js",
  "Babylon.js",
  "SWR",
  "Apollo",
  "URQL",
  "Formik",
  "Final Form",
  "Jest",
  "Vitest",
  "Cypress",
  "Playwright",
  "Puppeteer",
  "Webpack",
  "Vite",
  "ESBuild",
  "Rollup",
  "Parcel",
  "OpenTelemetry",
  "Sentry",
  "LogRocket",
  "json_logic",
  "memory_profiler",
  "resend-ruby",
  "datadog-ruby",
  "opentelemetry-ruby",
  "snowflake-ruby",
  "yrs",
  "lz4_flex",
  "prism",
  "delayed",
  "anthropic-ruby",
  "sqlalchemy",
  "tenacity",
  "mysqlclient",
  "deeplake",
  "sdv",
  "docker-py",
  "orjson",
  "keyboard",
  "teleport",
  "rook",
  "kubescape",
  "apache-hertzbeat",
  "apache-teaclave",
  "minima",
  "edgeml",
  "remeda",
  "terraform-dns",
  "qwed",
  "dnsplane",
  "vaquum-limen",
];

const extraCategories = [
  "Web & Frontend",
  "Backend & API",
  "Database",
  "Authentication",
  "AI",
  "Payments",
  "Utilities",
  "State Management",
  "Styling",
  "Animations",
  "HTTP",
  "Forms",
  "Testing",
  "Build Tools",
  "Game Development",
  "Observability",
  "Ruby Gems",
  "Python",
  "Go",
  "Miscellaneous",
];

// Fungsi untuk menjana bahagian dokumentasi generik
function generateDocSections(name: string): SdkDocSection[] {
  return [
    {
      title: "Getting Started",
      content: `
# Getting Started with ${name}

Install the package:

\`\`\`bash
npm install ${name.toLowerCase().replace(/\s+/g, "-")}
\`\`\`

Then import and use it in your project.

For detailed documentation, please refer to the official website.
      `,
    },
    {
      title: "Basic Usage",
      content: `
# Basic Usage

Here's a simple example:

\`\`\`javascript
// Example code for ${name}
const result = ${name}.doSomething();
console.log(result);
\`\`\`
      `,
    },
  ];
}

// Fungsi untuk menjana SDK tambahan dengan docSections generik
function generateExtraSDKDetails(count: number): Omit<SDKDetail, "id">[] {
  const extras: Omit<SDKDetail, "id">[] = [];
  for (let i = 0; i < count; i++) {
    const name =
      extraNames[i % extraNames.length] +
      (i >= extraNames.length
        ? ` ${Math.floor(i / extraNames.length) + 1}`
        : "");
    const category = extraCategories[i % extraCategories.length];
    const lang = ["JavaScript", "TypeScript", "Python", "Ruby", "Go", "Rust"][
      i % 6
    ];
    const installCmd =
      lang === "Python"
        ? `pip install ${name.toLowerCase().replace(/\s+/g, "-")}`
        : lang === "Ruby"
          ? `gem install ${name.toLowerCase()}`
          : lang === "Go"
            ? `go get github.com/${name.toLowerCase()}/${name}`
            : lang === "Rust"
              ? `cargo install ${name}`
              : `npm install ${name.toLowerCase().replace(/\s+/g, "-")}`;
    extras.push({
      name,
      description: `${name} is a powerful ${category.toLowerCase()} tool for modern development.`,
      install: installCmd,
      docs: `https://${name.toLowerCase().replace(/\s+/g, "")}.dev/docs`,
      website: `https://${name.toLowerCase().replace(/\s+/g, "")}.dev`,
      tags: [category.toLowerCase().split(" ")[0]],
      language: lang,
      version: `${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}.0`,
      license: ["MIT", "Apache-2.0", "BSD-3", "GPL-3", "ISC"][i % 5],
      category,
      docSections: generateDocSections(name),
    });
  }
  return extras;
}

// Gabung semua SDK dan tambah id (slug)
const fullList: SDKDetail[] = [
  ...baseSdkDetailList,
  ...generateExtraSDKDetails(200 - baseSdkDetailList.length),
].map((sdk, index) => ({
  ...sdk,
  id:
    sdk.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") +
    (index < baseSdkDetailList.length ? "" : `-${index}`),
}));

// Eksport untuk halaman detail (data penuh)
export const sdkFullList = fullList;

// Untuk halaman utama, kita hanya perlukan metadata (tanpa docSections)
export interface SDKSummary {
  name: string;
  description: string;
  install: string;
  docs: string;
  website: string;
  tags: string[];
  language: string;
  version: string;
  license: string;
  category: string;
  slug: string;
}

export const sdkSummaryList: SDKSummary[] = fullList.map(
  ({ docSections, ...rest }) => ({
    ...rest,
    slug: rest.id,
  }),
);
