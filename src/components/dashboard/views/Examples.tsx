"use client";

import { useState } from "react";
import Card from "../common/Card";
import Modal from "@/components/ui/Modal";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  MagnifyingGlassIcon,
  ClipboardIcon,
  CheckIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";

// Jenis data untuk contoh
interface Example {
  id: number;
  title: string;
  type: "code" | "template";
  sdk?: string; // untuk kod sahaja
  description: string;
  language?: string; // untuk kod
  tags: string[];
  // Untuk kod
  code?: string;
  steps?: string;
  docs?: string;
  // Untuk template
  files?: { name: string; content: string; language: string }[];
}

// Fungsi muat turun fail
const downloadFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// Data contoh – banyak, sangat banyak!
const examplesData: Example[] = [
  // ========== CODE EXAMPLES (sedia ada) ==========
  {
    id: 1,
    type: "code",
    title: "Authenticate User with Clerk",
    sdk: "Clerk",
    description: "Sign in and sign up components for Next.js.",
    language: "TypeScript",
    tags: ["auth", "nextjs"],
    code: `import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html>
        <body>
          <header>
            <SignedOut>
              <SignInButton mode="modal" />
              <SignUpButton mode="modal" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}`,
    steps:
      "1. Install @clerk/nextjs\n2. Add environment variables\n3. Wrap app with ClerkProvider\n4. Use SignInButton and SignUpButton components.",
    docs: "https://clerk.com/docs",
  },
  {
    id: 2,
    type: "code",
    title: "Supabase Database Query",
    sdk: "Supabase",
    description: "Fetch data from a Supabase table.",
    language: "JavaScript",
    tags: ["database", "realtime"],
    code: `import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

async function getPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) console.error(error)
  else return data
}`,
    steps:
      "1. Install @supabase/supabase-js\n2. Initialize client with URL and anon key\n3. Use .from().select() to query.",
    docs: "https://supabase.com/docs",
  },
  {
    id: 3,
    type: "code",
    title: "Neon Serverless Query",
    sdk: "Neon",
    description: "Connect and query a Neon PostgreSQL database.",
    language: "JavaScript",
    tags: ["database", "postgresql"],
    code: `import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function getUsers() {
  const users = await sql\`SELECT * FROM users\`;
  return users;
}`,
    steps:
      "1. Install @neondatabase/serverless\n2. Set DATABASE_URL environment variable\n3. Use sql tagged template to query.",
    docs: "https://neon.tech/docs",
  },
  {
    id: 4,
    type: "code",
    title: "OpenRouter Chat Completion",
    sdk: "OpenRouter",
    description: "Call an LLM via OpenRouter API.",
    language: "JavaScript",
    tags: ["ai", "llm"],
    code: `const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${process.env.OPENROUTER_API_KEY}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'deepseek/deepseek-r1',
    messages: [{ role: 'user', content: 'Hello!' }]
  })
});
const data = await response.json();
console.log(data.choices[0].message.content);`,
    steps:
      "1. Get API key from OpenRouter\n2. Send POST request to /api/v1/chat/completions\n3. Include model and messages in body.",
    docs: "https://openrouter.ai/docs",
  },
  {
    id: 5,
    type: "code",
    title: "Stripe Checkout Session",
    sdk: "Stripe",
    description: "Create a Stripe Checkout session.",
    language: "JavaScript",
    tags: ["payments"],
    code: `import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [
    {
      price_data: {
        currency: 'usd',
        product_data: { name: 'T-shirt' },
        unit_amount: 2000,
      },
      quantity: 1,
    },
  ],
  mode: 'payment',
  success_url: 'https://example.com/success',
  cancel_url: 'https://example.com/cancel',
});`,
    steps:
      "1. Install stripe package\n2. Initialize with secret key\n3. Call stripe.checkout.sessions.create with options.",
    docs: "https://stripe.com/docs",
  },
  {
    id: 6,
    type: "code",
    title: "Auth0 Login with React",
    sdk: "Auth0",
    description: "Add authentication to a React app.",
    language: "JavaScript",
    tags: ["auth"],
    code: `import { Auth0Provider } from '@auth0/auth0-react';
import { useAuth0 } from '@auth0/auth0-react';

// Wrap app with provider
<Auth0Provider
  domain="YOUR_DOMAIN"
  clientId="YOUR_CLIENT_ID"
  authorizationParams={{ redirect_uri: window.location.origin }}
>
  <App />
</Auth0Provider>

// In component
function Profile() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  if (!isAuthenticated) return <button onClick={loginWithRedirect}>Log in</button>;
  return <button onClick={() => logout()}>Log out</button>;
}`,
    steps:
      "1. Install @auth0/auth0-react\n2. Wrap app with Auth0Provider\n3. Use useAuth0 hook in components.",
    docs: "https://auth0.com/docs",
  },
  {
    id: 7,
    type: "code",
    title: "Prisma Schema and Query",
    sdk: "Prisma",
    description: "Define a model and query data.",
    language: "Prisma/JavaScript",
    tags: ["orm", "database"],
    code: `// schema.prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  posts     Post[]
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  String?
}

// query
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const usersWithPosts = await prisma.user.findMany({
  include: { posts: true }
})`,
    steps:
      "1. Install prisma and initialize\n2. Define models in schema.prisma\n3. Run prisma generate\n4. Use PrismaClient to query.",
    docs: "https://www.prisma.io/docs",
  },
  {
    id: 8,
    type: "code",
    title: "tRPC Router and Query",
    sdk: "tRPC",
    description: "Create a simple tRPC router and query on client.",
    language: "TypeScript",
    tags: ["api", "rpc"],
    code: `// server/router.ts
import { initTRPC } from '@trpc/server';
const t = initTRPC.create();

export const appRouter = t.router({
  hello: t.procedure
    .query(() => 'Hello from tRPC!'),
});

export type AppRouter = typeof appRouter;

// client
import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';

const trpc = createTRPCReact<AppRouter>();

function MyComponent() {
  const hello = trpc.hello.useQuery();
  return <div>{hello.data}</div>;
}`,
    steps:
      "1. Install @trpc/server, @trpc/client, @trpc/react-query\n2. Define router on server\n3. Create client and use hooks.",
    docs: "https://trpc.io/docs",
  },

  // ========== SQL EXAMPLES ==========
  {
    id: 101,
    type: "code",
    title: "Create Users Table (PostgreSQL)",
    sdk: "SQL",
    description: "SQL statement to create a users table with common fields.",
    language: "SQL",
    tags: ["database", "postgresql"],
    code: `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name VARCHAR(100),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`,
    steps: "Run this SQL in your PostgreSQL database to create a users table.",
    docs: "https://www.postgresql.org/docs/",
  },
  {
    id: 102,
    type: "code",
    title: "Insert Sample Users",
    sdk: "SQL",
    description: "Insert sample data into users table.",
    language: "SQL",
    tags: ["database"],
    code: `INSERT INTO users (email, username, password_hash, full_name)
VALUES 
  ('john@example.com', 'john_doe', 'hashed_pw_1', 'John Doe'),
  ('jane@example.com', 'jane_smith', 'hashed_pw_2', 'Jane Smith');`,
  },
  {
    id: 103,
    type: "code",
    title: "Select Users with Pagination",
    sdk: "SQL",
    description: "Query users with limit and offset.",
    language: "SQL",
    tags: ["database"],
    code: `SELECT id, email, username, full_name, created_at
FROM users
ORDER BY created_at DESC
LIMIT 10 OFFSET 0;`,
  },
  {
    id: 104,
    type: "code",
    title: "Update User Email",
    sdk: "SQL",
    description: "Update a user's email address.",
    language: "SQL",
    tags: ["database"],
    code: `UPDATE users
SET email = 'newemail@example.com', updated_at = NOW()
WHERE id = 1;`,
  },
  {
    id: 105,
    type: "code",
    title: "Delete User",
    sdk: "SQL",
    description: "Delete a user by ID.",
    language: "SQL",
    tags: ["database"],
    code: `DELETE FROM users WHERE id = 1;`,
  },
  {
    id: 106,
    type: "code",
    title: "Create Posts Table with Foreign Key",
    sdk: "SQL",
    description: "Create a posts table referencing users.",
    language: "SQL",
    tags: ["database", "postgresql"],
    code: `CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`,
  },
  {
    id: 107,
    type: "code",
    title: "Join Users and Posts",
    sdk: "SQL",
    description: "Get all posts with author details.",
    language: "SQL",
    tags: ["database"],
    code: `SELECT p.id, p.title, p.content, p.created_at,
       u.username, u.full_name
FROM posts p
JOIN users u ON p.user_id = u.id
WHERE p.published = true
ORDER BY p.created_at DESC;`,
  },

  // ========== RLS (ROW LEVEL SECURITY) EXAMPLES ==========
  {
    id: 201,
    type: "code",
    title: "Enable RLS on Table",
    sdk: "Supabase",
    description: "Enable Row Level Security on a table.",
    language: "SQL",
    tags: ["supabase", "rls"],
    code: `ALTER TABLE users ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 202,
    type: "code",
    title: "Policy: Users can read all profiles",
    sdk: "Supabase",
    description: "Allow authenticated users to read all profiles.",
    language: "SQL",
    tags: ["supabase", "rls"],
    code: `CREATE POLICY "Anyone can read profiles"
ON users
FOR SELECT USING (auth.role() = 'authenticated');`,
  },
  {
    id: 203,
    type: "code",
    title: "Policy: Users can update own profile",
    sdk: "Supabase",
    description: "Allow users to update only their own row.",
    language: "SQL",
    tags: ["supabase", "rls"],
    code: `CREATE POLICY "Users can update own profile"
ON users
FOR UPDATE USING (auth.uid()::text = user_id);`,
  },
  {
    id: 204,
    type: "code",
    title: "Policy: Users can insert posts",
    sdk: "Supabase",
    description: "Allow authenticated users to insert posts.",
    language: "SQL",
    tags: ["supabase", "rls"],
    code: `CREATE POLICY "Users can insert posts"
ON posts
FOR INSERT WITH CHECK (auth.role() = 'authenticated');`,
  },
  {
    id: 205,
    type: "code",
    title: "Policy: Users can delete own posts",
    sdk: "Supabase",
    description: "Allow users to delete only their own posts.",
    language: "SQL",
    tags: ["supabase", "rls"],
    code: `CREATE POLICY "Users can delete own posts"
ON posts
FOR DELETE USING (auth.uid()::text = user_id);`,
  },

  // ========== WEBSITE TEMPLATES (HTML + CSS + JS) ==========
  {
    id: 301,
    type: "template",
    title: "Minimal Blog Template",
    description: "A clean, responsive blog layout with HTML and CSS.",
    tags: ["html", "css", "blog"],
    files: [
      {
        name: "index.html",
        language: "html",
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Blog</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>My Blog</h1>
        <nav>
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
        </nav>
    </header>
    <main>
        <article>
            <h2>Blog Post Title</h2>
            <p class="date">March 6, 2026</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel nisl nec nisi ultricies ultricies.</p>
            <a href="#" class="read-more">Read More</a>
        </article>
        <article>
            <h2>Another Post</h2>
            <p class="date">March 5, 2026</p>
            <p>Praesent euismod, nisi eu consectetur fermentum, nisl nisi bibendum nisi, eu bibendum nisi nisi eu nisi.</p>
            <a href="#" class="read-more">Read More</a>
        </article>
    </main>
    <footer>
        <p>&copy; 2026 My Blog. All rights reserved.</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>`,
      },
      {
        name: "style.css",
        language: "css",
        content: `body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    color: #333;
    background: #f9f9f9;
}
header {
    background: #fff;
    border-bottom: 1px solid #ddd;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
header h1 {
    margin: 0;
    color: #007acc;
}
nav a {
    margin-left: 1.5rem;
    text-decoration: none;
    color: #007acc;
}
nav a:hover {
    text-decoration: underline;
}
main {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
}
article {
    background: #fff;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
article h2 {
    margin-top: 0;
    color: #333;
}
.date {
    color: #777;
    font-size: 0.9rem;
    margin-bottom: 1rem;
}
.read-more {
    display: inline-block;
    margin-top: 1rem;
    color: #007acc;
    text-decoration: none;
    font-weight: bold;
}
.read-more:hover {
    text-decoration: underline;
}
footer {
    text-align: center;
    padding: 1rem;
    background: #fff;
    border-top: 1px solid #ddd;
    color: #777;
}`,
      },
      {
        name: "script.js",
        language: "javascript",
        content: `// Simple script to add interactivity (example)
console.log('Blog loaded!');
document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('This is a demo link.');
    });
});`,
      },
    ],
  },
  {
    id: 302,
    type: "template",
    title: "E‑commerce Product Page",
    description:
      "A modern product page with image gallery and add‑to‑cart button.",
    tags: ["html", "css", "ecommerce"],
    files: [
      {
        name: "index.html",
        language: "html",
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Name - MyStore</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <div class="logo">MyStore</div>
        <nav>
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">Cart</a>
        </nav>
    </header>
    <main>
        <div class="product">
            <div class="gallery">
                <img src="https://via.placeholder.com/400" alt="Product" class="main-image">
                <div class="thumbnails">
                    <img src="https://via.placeholder.com/80" alt="Thumb">
                    <img src="https://via.placeholder.com/80" alt="Thumb">
                    <img src="https://via.placeholder.com/80" alt="Thumb">
                </div>
            </div>
            <div class="details">
                <h1>Awesome Product</h1>
                <p class="price">$49.99</p>
                <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        </div>
    </main>
    <footer>
        <p>&copy; 2026 MyStore. All rights reserved.</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>`,
      },
      {
        name: "style.css",
        language: "css",
        content: `* {
    box-sizing: border-box;
}
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background: #f4f4f4;
}
header {
    background: #222;
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
header .logo {
    font-size: 1.5rem;
    font-weight: bold;
}
header nav a {
    color: white;
    margin-left: 1.5rem;
    text-decoration: none;
}
header nav a:hover {
    text-decoration: underline;
}
main {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 2rem;
}
.product {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
.gallery .main-image {
    width: 100%;
    border-radius: 8px;
}
.thumbnails {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
}
.thumbnails img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
    cursor: pointer;
    border: 2px solid transparent;
}
.thumbnails img:hover {
    border-color: #007bff;
}
.details h1 {
    margin-top: 0;
}
.price {
    font-size: 2rem;
    color: #b12704;
    margin: 0.5rem 0;
}
.description {
    line-height: 1.6;
    color: #555;
}
.add-to-cart {
    background: #ff9900;
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.2rem;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
}
.add-to-cart:hover {
    background: #e68a00;
}
footer {
    text-align: center;
    padding: 1rem;
    background: #222;
    color: white;
    margin-top: 2rem;
}`,
      },
      {
        name: "script.js",
        language: "javascript",
        content: `// Thumbnail click changes main image
document.querySelectorAll('.thumbnails img').forEach(thumb => {
    thumb.addEventListener('click', function() {
        const main = document.querySelector('.main-image');
        main.src = this.src;
    });
});

document.querySelector('.add-to-cart').addEventListener('click', () => {
    alert('Added to cart (demo)');
});`,
      },
    ],
  },
  {
    id: 303,
    type: "template",
    title: "Portfolio Website",
    description: "A modern portfolio template with projects grid.",
    tags: ["html", "css", "portfolio"],
    files: [
      {
        name: "index.html",
        language: "html",
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Jane Doe</h1>
        <p>Web Developer & Designer</p>
    </header>
    <nav>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
    </nav>
    <section id="about">
        <h2>About Me</h2>
        <p>I'm a passionate developer with experience in React, Node.js, and modern web technologies. I love building beautiful and functional websites.</p>
    </section>
    <section id="projects">
        <h2>Projects</h2>
        <div class="projects-grid">
            <div class="project-card">
                <img src="https://via.placeholder.com/300" alt="Project 1">
                <h3>Project One</h3>
                <p>A cool project description.</p>
            </div>
            <div class="project-card">
                <img src="https://via.placeholder.com/300" alt="Project 2">
                <h3>Project Two</h3>
                <p>Another awesome project.</p>
            </div>
            <div class="project-card">
                <img src="https://via.placeholder.com/300" alt="Project 3">
                <h3>Project Three</h3>
                <p>Yet another great project.</p>
            </div>
        </div>
    </section>
    <section id="contact">
        <h2>Contact</h2>
        <p>Email: jane.doe@example.com</p>
    </section>
    <footer>
        <p>&copy; 2026 Jane Doe</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>`,
      },
      {
        name: "style.css",
        language: "css",
        content: `body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    color: #333;
}
header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
    padding: 3rem 1rem;
}
header h1 {
    margin: 0;
    font-size: 3rem;
}
header p {
    font-size: 1.2rem;
    opacity: 0.9;
}
nav {
    background: #333;
    text-align: center;
    padding: 1rem;
}
nav a {
    color: white;
    text-decoration: none;
    margin: 0 1rem;
    font-size: 1.1rem;
}
nav a:hover {
    text-decoration: underline;
}
section {
    max-width: 1000px;
    margin: 2rem auto;
    padding: 0 1rem;
}
h2 {
    text-align: center;
    margin-bottom: 2rem;
}
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}
.project-card {
    background: #f9f9f9;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}
.project-card:hover {
    transform: translateY(-5px);
}
.project-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}
.project-card h3 {
    margin: 1rem 0 0.5rem;
    padding: 0 1rem;
}
.project-card p {
    padding: 0 1rem 1rem;
    color: #666;
}
footer {
    text-align: center;
    padding: 1rem;
    background: #333;
    color: white;
    margin-top: 2rem;
}`,
      },
      {
        name: "script.js",
        language: "javascript",
        content: `// Smooth scrolling for anchor links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});`,
      },
    ],
  },
  {
    id: 304,
    type: "template",
    title: "Landing Page (SaaS)",
    description:
      "A modern landing page for a SaaS product with call‑to‑action.",
    tags: ["html", "css", "landing"],
    files: [
      {
        name: "index.html",
        language: "html",
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MySaaS - Supercharge Your Workflow</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">MySaaS</div>
            <div class="nav-links">
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#contact">Contact</a>
                <a href="#" class="btn btn-outline">Sign In</a>
            </div>
        </nav>
        <div class="hero">
            <h1>Supercharge Your Workflow</h1>
            <p>Boost productivity with our powerful tools.</p>
            <a href="#" class="btn btn-primary">Start Free Trial</a>
        </div>
    </header>
    <main>
        <section id="features">
            <h2>Features</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <h3>Feature One</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div class="feature-card">
                    <h3>Feature Two</h3>
                    <p>Sed do eiusmod tempor incididunt ut labore et dolore.</p>
                </div>
                <div class="feature-card">
                    <h3>Feature Three</h3>
                    <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
                </div>
            </div>
        </section>
        <section id="pricing">
            <h2>Pricing</h2>
            <div class="pricing-grid">
                <div class="pricing-card">
                    <h3>Basic</h3>
                    <p class="price">$9/mo</p>
                    <ul>
                        <li>Feature 1</li>
                        <li>Feature 2</li>
                        <li>Feature 3</li>
                    </ul>
                    <a href="#" class="btn btn-outline">Choose</a>
                </div>
                <div class="pricing-card featured">
                    <h3>Pro</h3>
                    <p class="price">$29/mo</p>
                    <ul>
                        <li>All Basic features</li>
                        <li>Advanced analytics</li>
                        <li>Priority support</li>
                    </ul>
                    <a href="#" class="btn btn-primary">Choose</a>
                </div>
                <div class="pricing-card">
                    <h3>Enterprise</h3>
                    <p class="price">$99/mo</p>
                    <ul>
                        <li>All Pro features</li>
                        <li>Custom integrations</li>
                        <li>Dedicated account manager</li>
                    </ul>
                    <a href="#" class="btn btn-outline">Choose</a>
                </div>
            </div>
        </section>
    </main>
    <footer>
        <p>&copy; 2026 MySaaS. All rights reserved.</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>`,
      },
      {
        name: "style.css",
        language: "css",
        content: `* {
    box-sizing: border-box;
}
body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    color: #333;
}
header {
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    color: white;
}
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: rgba(0,0,0,0.1);
}
.logo {
    font-size: 1.5rem;
    font-weight: bold;
}
.nav-links a {
    color: white;
    text-decoration: none;
    margin-left: 1.5rem;
}
.btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    transition: background 0.3s, color 0.3s;
}
.btn-outline {
    border: 1px solid white;
    color: white;
}
.btn-outline:hover {
    background: white;
    color: #2575fc;
}
.btn-primary {
    background: #ffd700;
    color: #333;
}
.btn-primary:hover {
    background: #e6c200;
}
.hero {
    text-align: center;
    padding: 4rem 2rem;
}
.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}
.hero p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
}
section {
    max-width: 1000px;
    margin: 3rem auto;
    padding: 0 2rem;
}
h2 {
    text-align: center;
    margin-bottom: 2rem;
}
.features-grid, .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}
.feature-card, .pricing-card {
    background: #f9f9f9;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.feature-card h3 {
    margin-top: 0;
}
.pricing-card.featured {
    border: 2px solid #ffd700;
    transform: scale(1.05);
    background: #fff;
}
.pricing-card ul {
    list-style: none;
    padding: 0;
    margin: 1.5rem 0;
}
.pricing-card li {
    margin: 0.5rem 0;
}
.price {
    font-size: 2rem;
    font-weight: bold;
    color: #2575fc;
}
footer {
    text-align: center;
    padding: 1rem;
    background: #333;
    color: white;
}`,
      },
      {
        name: "script.js",
        language: "javascript",
        content: `// Add any interactivity here, e.g., scroll animations
console.log('Landing page loaded');`,
      },
    ],
  },
  {
    id: 305,
    type: "template",
    title: "Next.js Starter Template",
    description:
      "A minimal Next.js 15 app with Tailwind CSS and Clerk authentication.",
    tags: ["nextjs", "react", "clerk", "tailwind"],
    files: [
      {
        name: "app/layout.tsx",
        language: "typescript",
        content: `import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Next.js App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}`,
      },
      {
        name: "app/page.tsx",
        language: "typescript",
        content: `import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to My Next.js App</h1>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
        <p className="mt-4">You are signed in!</p>
      </SignedIn>
    </main>
  )
}`,
      },
      {
        name: "app/globals.css",
        language: "css",
        content: `@tailwind base;
@tailwind components;
@tailwind utilities;`,
      },
      {
        name: "middleware.ts",
        language: "typescript",
        content: `import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}`,
      },
      {
        name: "package.json (dependencies)",
        language: "json",
        content: `{
  "dependencies": {
    "@clerk/nextjs": "^5.0.0",
    "next": "15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0"
  }
}`,
      },
    ],
  },
  // More templates can be added similarly...
];

// Unique SDK/tags for filter
const sdkList = [
  "All",
  ...new Set(examplesData.filter((e) => e.sdk).map((e) => e.sdk!)),
];
const typeList = ["All", "code", "template"];

export default function Examples() {
  const [search, setSearch] = useState("");
  const [selectedSdk, setSelectedSdk] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedExample, setSelectedExample] = useState<Example | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredExamples = examplesData.filter((ex) => {
    const matchesSearch =
      ex.title.toLowerCase().includes(search.toLowerCase()) ||
      ex.description.toLowerCase().includes(search.toLowerCase()) ||
      ex.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    const matchesSdk =
      selectedSdk === "All" || (ex.sdk && ex.sdk === selectedSdk);
    const matchesType = selectedType === "All" || ex.type === selectedType;
    return matchesSearch && matchesSdk && matchesType;
  });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Code Examples & Templates
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Ready‑to‑use code snippets and website templates.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search examples..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 dark:text-white"
        >
          {typeList.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select
          value={selectedSdk}
          onChange={(e) => setSelectedSdk(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 dark:text-white"
        >
          {sdkList.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Examples Grid */}
      {filteredExamples.length === 0 ? (
        <Card>
          <p className="text-center py-8 text-gray-500">No examples found.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExamples.map((ex) => (
            <div
              key={ex.id}
              onClick={() => {
                setSelectedExample(ex);
                setShowModal(true);
              }}
              className="cursor-pointer transition-transform duration-200 hover:scale-105"
            >
              <Card hover>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                      {ex.title}
                    </h3>
                    <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded">
                      {ex.type === "template" ? "Template" : ex.sdk}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {ex.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {ex.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {ex.tags.length > 3 && (
                      <span className="text-xs">+{ex.tags.length - 3}</span>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <span className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
                      {ex.type === "template"
                        ? "View Template →"
                        : "View Code →"}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Modal Detail */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedExample?.title || ""}
        maxWidth="2xl"
      >
        {selectedExample && (
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            {selectedExample.type === "code" && (
              <>
                {/* Header with SDK and language */}
                <div className="flex items-center gap-2 text-sm">
                  {selectedExample.sdk && (
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded">
                      {selectedExample.sdk}
                    </span>
                  )}
                  {selectedExample.language && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                      {selectedExample.language}
                    </span>
                  )}
                </div>

                <p className="text-gray-700 dark:text-gray-300">
                  {selectedExample.description}
                </p>

                {/* Steps */}
                {selectedExample.steps && (
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      Steps
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">
                      {selectedExample.steps}
                    </p>
                  </div>
                )}

                {/* Code block */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      Code
                    </h4>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          selectedExample.code!,
                          selectedExample.id.toString(),
                        )
                      }
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                      title="Copy code"
                    >
                      {copiedId === selectedExample.id.toString() ? (
                        <CheckIcon className="h-5 w-5 text-green-600" />
                      ) : (
                        <ClipboardIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </button>
                  </div>
                  <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                    <SyntaxHighlighter
                      language={
                        selectedExample.language?.toLowerCase() || "javascript"
                      }
                      style={vs2015}
                      customStyle={{
                        margin: 0,
                        padding: "1rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      {selectedExample.code!}
                    </SyntaxHighlighter>
                  </div>
                </div>

                {/* Documentation link */}
                {selectedExample.docs && (
                  <a
                    href={selectedExample.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline block"
                  >
                    Read Documentation →
                  </a>
                )}
              </>
            )}

            {selectedExample.type === "template" && selectedExample.files && (
              <>
                <p className="text-gray-700 dark:text-gray-300">
                  {selectedExample.description}
                </p>
                <div className="space-y-6">
                  {selectedExample.files.map((file, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {file.name}
                        </h4>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              downloadFile(file.content, file.name)
                            }
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                            title="Download file"
                          >
                            <DocumentArrowDownIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          </button>
                          <button
                            onClick={() =>
                              copyToClipboard(file.content, `file-${idx}`)
                            }
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                            title="Copy to clipboard"
                          >
                            {copiedId === `file-${idx}` ? (
                              <CheckIcon className="h-5 w-5 text-green-600" />
                            ) : (
                              <ClipboardIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                        <SyntaxHighlighter
                          language={file.language}
                          style={vs2015}
                          customStyle={{
                            margin: 0,
                            padding: "1rem",
                            fontSize: "0.875rem",
                          }}
                        >
                          {file.content}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
