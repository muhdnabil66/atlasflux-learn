"use client";

import { useState } from "react";
import Card from "../common/Card";
import ReactMarkdown from "react-markdown";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// ------------------------------------------------------------------
// Data mock dokumentasi SDK (lebih 200 SDK) – setiap SDK kini mempunyai kategori
// ------------------------------------------------------------------
const sdkDocsData = [
  // ========== SDK yang sudah ada ==========
  {
    id: "supabase",
    name: "Supabase",
    category: "Databases & ORMs",
    sections: [
      {
        id: "supabase-install",
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
        id: "supabase-auth",
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
        id: "supabase-database",
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
    id: "clerk",
    name: "Clerk",
    category: "Authentication & Security",
    sections: [
      {
        id: "clerk-install",
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
        id: "clerk-auth",
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
  {
    id: "neon",
    name: "Neon",
    category: "Databases & ORMs",
    sections: [
      {
        id: "neon-install",
        title: "Installation",
        content: `
# Installation

Install the Neon serverless driver:

\`\`\`bash
npm install @neondatabase/serverless
\`\`\`

Connect to your database:

\`\`\`javascript
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

const result = await sql\`SELECT version()\`
console.log(result)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    category: "AI / ML",
    sections: [
      {
        id: "openrouter-install",
        title: "Installation",
        content: `
# Installation

OpenRouter provides a simple HTTP API. You can use any HTTP client.

Example with fetch:

\`\`\`javascript
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${process.env.OPENROUTER_API_KEY}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'deepseek/deepseek-r1',
    messages: [{ role: 'user', content: 'Hello!' }]
  })
})
const data = await response.json()
console.log(data.choices[0].message.content)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Additional popular SDKs",
    sections: [
      {
        id: "stripe-install",
        title: "Installation",
        content: `
# Installation

Install Stripe.js and Stripe Node.js library:

\`\`\`bash
npm install @stripe/stripe-js stripe
\`\`\`

Initialize Stripe on the client:

\`\`\`javascript
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_...')
\`\`\`

On the server:

\`\`\`javascript
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
\`\`\`
        `,
      },
    ],
  },

  // ========== SDK baru – Web & Frontend ==========
  {
    id: "react",
    name: "React",
    category: "Web & Frontend",
    sections: [
      {
        id: "react-install",
        title: "Installation",
        content: `
# Installation

Create a new React app:

\`\`\`bash
npx create-react-app my-app
cd my-app
npm start
\`\`\`

Or using Vite:

\`\`\`bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
\`\`\`
        `,
      },
    ],
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Web & Frontend",
    sections: [
      {
        id: "nextjs-install",
        title: "Installation",
        content: `
# Installation

Create a new Next.js app:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

Optionally enable Turbopack:

\`\`\`bash
npm run dev -- --turbopack
\`\`\`
        `,
      },
    ],
  },
  {
    id: "vue",
    name: "Vue.js",
    category: "Web & Frontend",
    sections: [
      {
        id: "vue-install",
        title: "Installation",
        content: `
# Installation

Create a new Vue app:

\`\`\`bash
npm create vue@latest my-vue-app
cd my-vue-app
npm install
npm run dev
\`\`\`
        `,
      },
    ],
  },
  {
    id: "svelte",
    name: "Svelte",
    category: "Web & Frontend",
    sections: [
      {
        id: "svelte-install",
        title: "Installation",
        content: `
# Installation

Create a new SvelteKit app:

\`\`\`bash
npm create svelte@latest my-app
cd my-app
npm install
npm run dev
\`\`\`
        `,
      },
    ],
  },
  {
    id: "angular",
    name: "Angular",
    category: "Web & Frontend",
    sections: [
      {
        id: "angular-install",
        title: "Installation",
        content: `
# Installation

Install Angular CLI globally:

\`\`\`bash
npm install -g @angular/cli
ng new my-angular-app
cd my-angular-app
ng serve
\`\`\`
        `,
      },
    ],
  },
  {
    id: "astro",
    name: "Astro",
    category: "Web & Frontend",
    sections: [
      {
        id: "astro-install",
        title: "Installation",
        content: `
# Installation

Create a new Astro project:

\`\`\`bash
npm create astro@latest
cd my-astro-project
npm run dev
\`\`\`
        `,
      },
    ],
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    category: "Web & Frontend",
    sections: [
      {
        id: "tailwind-install",
        title: "Installation",
        content: `
# Installation

Install via npm:

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

Add to your CSS:

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`
        `,
      },
    ],
  },
  {
    id: "d3",
    name: "D3.js",
    category: "Web & Frontend",
    sections: [
      {
        id: "d3-install",
        title: "Installation",
        content: `
# Installation

Install D3 via npm:

\`\`\`bash
npm install d3
\`\`\`

Import in your project:

\`\`\`javascript
import * as d3 from 'd3'
\`\`\`
        `,
      },
    ],
  },
  {
    id: "chartjs",
    name: "Chart.js",
    category: "Web & Frontend",
    sections: [
      {
        id: "chartjs-install",
        title: "Installation",
        content: `
# Installation

Install Chart.js:

\`\`\`bash
npm install chart.js
\`\`\`

Create a chart:

\`\`\`javascript
import Chart from 'chart.js/auto'

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{ label: '# of Votes', data: [12, 19, 3] }]
  }
})
\`\`\`
        `,
      },
    ],
  },
  {
    id: "recharts",
    name: "Recharts",
    category: "Web & Frontend",
    sections: [
      {
        id: "recharts-install",
        title: "Installation",
        content: `
# Installation

Install Recharts:

\`\`\`bash
npm install recharts
\`\`\`

Example:

\`\`\`jsx
import { LineChart, Line, XAxis, YAxis } from 'recharts'

const data = [{ name: 'Page A', uv: 400 }, { name: 'Page B', uv: 300 }]

<LineChart width={400} height={400} data={data}>
  <XAxis dataKey="name" />
  <YAxis />
  <Line type="monotone" dataKey="uv" stroke="#8884d8" />
</LineChart>
\`\`\`
        `,
      },
    ],
  },
  {
    id: "mapbox",
    name: "Mapbox GL JS",
    category: "Web & Frontend",
    sections: [
      {
        id: "mapbox-install",
        title: "Installation",
        content: `
# Installation

Install Mapbox GL JS:

\`\`\`bash
npm install mapbox-gl
\`\`\`

Initialize a map:

\`\`\`javascript
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'YOUR_TOKEN'
new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-74.5, 40],
  zoom: 9
})
\`\`\`
        `,
      },
    ],
  },
  {
    id: "maplibre",
    name: "MapLibre GL JS",
    category: "Web & Frontend",
    sections: [
      {
        id: "maplibre-install",
        title: "Installation",
        content: `
# Installation

Install MapLibre:

\`\`\`bash
npm install maplibre-gl
\`\`\`

Create a map:

\`\`\`javascript
import maplibregl from 'maplibre-gl'

new maplibregl.Map({
  container: 'map',
  style: 'https://demotiles.maplibre.org/style.json',
  center: [0, 0],
  zoom: 1
})
\`\`\`
        `,
      },
    ],
  },
  {
    id: "leaflet",
    name: "Leaflet",
    category: "Web & Frontend",
    sections: [
      {
        id: "leaflet-install",
        title: "Installation",
        content: `
# Installation

Install Leaflet:

\`\`\`bash
npm install leaflet
\`\`\`

Add CSS and JS:

\`\`\`javascript
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const map = L.map('map').setView([51.505, -0.09], 13)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "lodash",
    name: "Lodash",
    category: "Utility Libraries",
    sections: [
      {
        id: "lodash-install",
        title: "Installation",
        content: `
# Installation

Install Lodash:

\`\`\`bash
npm install lodash
\`\`\`

Import functions:

\`\`\`javascript
import _ from 'lodash'
// or
import { debounce } from 'lodash'
\`\`\`
        `,
      },
    ],
  },
  {
    id: "date-fns",
    name: "date-fns",
    category: "Utility Libraries",
    sections: [
      {
        id: "datefns-install",
        title: "Installation",
        content: `
# Installation

Install date-fns:

\`\`\`bash
npm install date-fns
\`\`\`

Use functions:

\`\`\`javascript
import { format, differenceInDays } from 'date-fns'

format(new Date(), 'yyyy-MM-dd')
differenceInDays(new Date(2025, 0, 1), new Date(2024, 0, 1))
\`\`\`
        `,
      },
    ],
  },
  {
    id: "zod",
    name: "Zod",
    category: "Utility Libraries",
    sections: [
      {
        id: "zod-install",
        title: "Installation",
        content: `
# Installation

Install Zod:

\`\`\`bash
npm install zod
\`\`\`

Define a schema:

\`\`\`javascript
import { z } from 'zod'

const UserSchema = z.object({
  name: z.string(),
  age: z.number().min(0)
})

const user = UserSchema.parse({ name: 'Alice', age: 30 })
\`\`\`
        `,
      },
    ],
  },
  {
    id: "redux",
    name: "Redux Toolkit",
    category: "Web & Frontend",
    sections: [
      {
        id: "redux-install",
        title: "Installation",
        content: `
# Installation

Install Redux Toolkit and React-Redux:

\`\`\`bash
npm install @reduxjs/toolkit react-redux
\`\`\`

Create a store:

\`\`\`javascript
import { configureStore, createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: { increment: state => { state.value++ } }
})

export const store = configureStore({ reducer: counterSlice.reducer })
\`\`\`
        `,
      },
    ],
  },
  {
    id: "zustand",
    name: "Zustand",
    category: "Web & Frontend",
    sections: [
      {
        id: "zustand-install",
        title: "Installation",
        content: `
# Installation

Install Zustand:

\`\`\`bash
npm install zustand
\`\`\`

Create a store:

\`\`\`javascript
import { create } from 'zustand'

const useStore = create((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 }))
}))
\`\`\`
        `,
      },
    ],
  },

  // ========== Backend & API Frameworks ==========
  {
    id: "express",
    name: "Express.js",
    category: "Backend & API Frameworks",
    sections: [
      {
        id: "express-install",
        title: "Installation",
        content: `
# Installation

Create a new project and install Express:

\`\`\`bash
mkdir my-app
cd my-app
npm init -y
npm install express
\`\`\`

Basic server:

\`\`\`javascript
const express = require('express')
const app = express()
app.get('/', (req, res) => res.send('Hello World'))
app.listen(3000)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "fastify",
    name: "Fastify",
    category: "Backend & API Frameworks",
    sections: [
      {
        id: "fastify-install",
        title: "Installation",
        content: `
# Installation

Install Fastify:

\`\`\`bash
npm install fastify
\`\`\`

Create a server:

\`\`\`javascript
import Fastify from 'fastify'

const fastify = Fastify({ logger: true })

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.listen({ port: 3000 })
\`\`\`
        `,
      },
    ],
  },
  {
    id: "nestjs",
    name: "NestJS",
    category: "Backend & API Frameworks",
    sections: [
      {
        id: "nestjs-install",
        title: "Installation",
        content: `
# Installation

Install NestJS CLI:

\`\`\`bash
npm i -g @nestjs/cli
nest new my-project
cd my-project
npm run start:dev
\`\`\`
        `,
      },
    ],
  },
  {
    id: "hono",
    name: "Hono",
    category: "Backend & API Frameworks",
    sections: [
      {
        id: "hono-install",
        title: "Installation",
        content: `
# Installation

Install Hono:

\`\`\`bash
npm install hono
\`\`\`

Basic app:

\`\`\`javascript
import { Hono } from 'hono'

const app = new Hono()
app.get('/', (c) => c.text('Hello Hono!'))

export default app
\`\`\`
        `,
      },
    ],
  },
  {
    id: "django",
    name: "Django",
    category: "Backend & API Frameworks",
    sections: [
      {
        id: "django-install",
        title: "Installation",
        content: `
# Installation

Install Django:

\`\`\`bash
pip install django
django-admin startproject mysite
cd mysite
python manage.py runserver
\`\`\`
        `,
      },
    ],
  },
  {
    id: "flask",
    name: "Flask",
    category: "Backend & API Frameworks",
    sections: [
      {
        id: "flask-install",
        title: "Installation",
        content: `
# Installation

Install Flask:

\`\`\`bash
pip install flask
\`\`\`

Minimal app:

\`\`\`python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run()
\`\`\`
        `,
      },
    ],
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "Backend & API Frameworks",
    sections: [
      {
        id: "fastapi-install",
        title: "Installation",
        content: `
# Installation

Install FastAPI and an ASGI server:

\`\`\`bash
pip install fastapi uvicorn
\`\`\`

Example:

\`\`\`python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "laravel",
    name: "Laravel",
    category: "Backend & API Frameworks",
    sections: [
      {
        id: "laravel-install",
        title: "Installation",
        content: `
# Installation

Install Laravel via Composer:

\`\`\`bash
composer create-project laravel/laravel example-app
cd example-app
php artisan serve
\`\`\`
        `,
      },
    ],
  },
  {
    id: "rails",
    name: "Ruby on Rails",
    category: "Backend & API Frameworks",
    sections: [
      {
        id: "rails-install",
        title: "Installation",
        content: `
# Installation

Install Rails:

\`\`\`bash
gem install rails
rails new myapp
cd myapp
bin/rails server
\`\`\`
        `,
      },
    ],
  },
  {
    id: "spring",
    name: "Spring Boot",
    category: "Backend & API Frameworks",
    sections: [
      {
        id: "spring-install",
        title: "Installation",
        content: `
# Installation

Use Spring Initializr or create a Maven project:

\`\`\`xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
</parent>
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
\`\`\`
        `,
      },
    ],
  },

  // ========== Databases & ORMs ==========
  {
    id: "prisma",
    name: "Prisma",
    category: "Databases & ORMs",
    sections: [
      {
        id: "prisma-install",
        title: "Installation",
        content: `
# Installation

Install Prisma CLI and client:

\`\`\`bash
npm install prisma --save-dev
npx prisma init
npm install @prisma/client
\`\`\`

Define your schema in \`prisma/schema.prisma\` and run:

\`\`\`bash
npx prisma generate
\`\`\`
        `,
      },
    ],
  },
  {
    id: "drizzle",
    name: "Drizzle ORM",
    category: "Databases & ORMs",
    sections: [
      {
        id: "drizzle-install",
        title: "Installation",
        content: `
# Installation

Install Drizzle:

\`\`\`bash
npm install drizzle-orm better-sqlite3
npm install -D drizzle-kit
\`\`\`

Example:

\`\`\`typescript
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'

const sqlite = new Database('sqlite.db')
const db = drizzle(sqlite)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "typeorm",
    name: "TypeORM",
    category: "Databases & ORMs",
    sections: [
      {
        id: "typeorm-install",
        title: "Installation",
        content: `
# Installation

Install TypeORM and reflect-metadata:

\`\`\`bash
npm install typeorm reflect-metadata
\`\`\`

Create a data source:

\`\`\`typescript
import { DataSource } from 'typeorm'

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'test',
  entities: [__dirname + '/entity/*.js'],
  synchronize: true,
})
\`\`\`
        `,
      },
    ],
  },
  {
    id: "sequelize",
    name: "Sequelize",
    category: "Databases & ORMs",
    sections: [
      {
        id: "sequelize-install",
        title: "Installation",
        content: `
# Installation

Install Sequelize and a driver:

\`\`\`bash
npm install sequelize pg pg-hstore
\`\`\`

Connect:

\`\`\`javascript
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'
})
\`\`\`
        `,
      },
    ],
  },
  {
    id: "knex",
    name: "Knex.js",
    category: "Databases & ORMs",
    sections: [
      {
        id: "knex-install",
        title: "Installation",
        content: `
# Installation

Install Knex and a database driver:

\`\`\`bash
npm install knex pg
\`\`\`

Initialize:

\`\`\`javascript
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'password',
    database: 'my_db'
  }
})
\`\`\`
        `,
      },
    ],
  },
  {
    id: "mongoose",
    name: "Mongoose",
    category: "Databases & ORMs",
    sections: [
      {
        id: "mongoose-install",
        title: "Installation",
        content: `
# Installation

Install Mongoose:

\`\`\`bash
npm install mongoose
\`\`\`

Connect to MongoDB:

\`\`\`javascript
import mongoose from 'mongoose'

await mongoose.connect('mongodb://127.0.0.1:27017/test')
\`\`\`
        `,
      },
    ],
  },
  {
    id: "sqlalchemy",
    name: "SQLAlchemy",
    category: "Databases & ORMs",
    sections: [
      {
        id: "sqlalchemy-install",
        title: "Installation",
        content: `
# Installation

Install SQLAlchemy:

\`\`\`bash
pip install sqlalchemy
\`\`\`

Example:

\`\`\`python
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker

engine = create_engine('sqlite:///example.db')
Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)

Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()
\`\`\`
        `,
      },
    ],
  },
  {
    id: "redis",
    name: "Redis (node-redis)",
    category: "Databases & ORMs",
    sections: [
      {
        id: "redis-install",
        title: "Installation",
        content: `
# Installation

Install the official Redis client:

\`\`\`bash
npm install redis
\`\`\`

Usage:

\`\`\`javascript
import { createClient } from 'redis'

const client = createClient()
client.on('error', err => console.log('Redis Client Error', err))
await client.connect()

await client.set('key', 'value')
const value = await client.get('key')
\`\`\`
        `,
      },
    ],
  },
  {
    id: "postgres",
    name: "node-postgres",
    category: "Databases & ORMs",
    sections: [
      {
        id: "postgres-install",
        title: "Installation",
        content: `
# Installation

Install pg:

\`\`\`bash
npm install pg
\`\`\`

Query:

\`\`\`javascript
import pg from 'pg'
const { Client } = pg

const client = new Client()
await client.connect()
const res = await client.query('SELECT $1::text as message', ['Hello world'])
console.log(res.rows[0].message)
await client.end()
\`\`\`
        `,
      },
    ],
  },

  // ========== Cloud & Infrastructure ==========
  {
    id: "aws-sdk",
    name: "AWS SDK for JavaScript",
    category: "Cloud & Infrastructure",
    sections: [
      {
        id: "aws-install",
        title: "Installation",
        content: `
# Installation

Install the AWS SDK:

\`\`\`bash
npm install aws-sdk
\`\`\`

Or use the modular v3:

\`\`\`bash
npm install @aws-sdk/client-s3
\`\`\`

Example (v3):

\`\`\`javascript
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3'

const client = new S3Client({ region: 'us-east-1' })
const command = new ListBucketsCommand({})
const response = await client.send(command)
console.log(response.Buckets)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "google-cloud",
    name: "Google Cloud SDK",
    category: "Cloud & Infrastructure",
    sections: [
      {
        id: "gcloud-install",
        title: "Installation",
        content: `
# Installation

Install the Google Cloud client library:

\`\`\`bash
npm install @google-cloud/storage
\`\`\`

Example:

\`\`\`javascript
const { Storage } = require('@google-cloud/storage')

const storage = new Storage()
const [buckets] = await storage.getBuckets()
console.log('Buckets:', buckets)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "azure-sdk",
    name: "Azure SDK for JS",
    category: "Cloud & Infrastructure",
    sections: [
      {
        id: "azure-install",
        title: "Installation",
        content: `
# Installation

Install Azure Storage Blob client:

\`\`\`bash
npm install @azure/storage-blob
\`\`\`

Example:

\`\`\`javascript
const { BlobServiceClient } = require('@azure/storage-blob')

const connStr = 'DefaultEndpointsProtocol=https;...'
const blobServiceClient = BlobServiceClient.fromConnectionString(connStr)
const containerClient = blobServiceClient.getContainerClient('mycontainer')
\`\`\`
        `,
      },
    ],
  },
  {
    id: "terraform",
    name: "Terraform CDK",
    category: "Cloud & Infrastructure",
    sections: [
      {
        id: "terraform-install",
        title: "Installation",
        content: `
# Installation

Install the CDK for Terraform:

\`\`\`bash
npm install cdktf-cli
\`\`\`

Initialize a project:

\`\`\`bash
cdktf init --template=typescript --local
\`\`\`
        `,
      },
    ],
  },
  {
    id: "pulumi",
    name: "Pulumi",
    category: "Cloud & Infrastructure",
    sections: [
      {
        id: "pulumi-install",
        title: "Installation",
        content: `
# Installation

Install Pulumi CLI and SDK:

\`\`\`bash
npm install @pulumi/pulumi
\`\`\`

Create a stack:

\`\`\`typescript
import * as aws from '@pulumi/aws'

const bucket = new aws.s3.Bucket('my-bucket')
export const bucketName = bucket.id
\`\`\`
        `,
      },
    ],
  },
  {
    id: "kubernetes",
    name: "Kubernetes JS Client",
    category: "Cloud & Infrastructure",
    sections: [
      {
        id: "k8s-install",
        title: "Installation",
        content: `
# Installation

Install the official Kubernetes client:

\`\`\`bash
npm install @kubernetes/client-node
\`\`\`

List pods:

\`\`\`javascript
const k8s = require('@kubernetes/client-node')

const kc = new k8s.KubeConfig()
kc.loadFromDefault()
const k8sApi = kc.makeApiClient(k8s.CoreV1Api)
const pods = await k8sApi.listNamespacedPod('default')
console.log(pods.body.items)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "docker",
    name: "Dockerode",
    category: "Cloud & Infrastructure",
    sections: [
      {
        id: "docker-install",
        title: "Installation",
        content: `
# Installation

Install Dockerode:

\`\`\`bash
npm install dockerode
\`\`\`

List containers:

\`\`\`javascript
const Docker = require('dockerode')
const docker = new Docker({ socketPath: '/var/run/docker.sock' })
const containers = await docker.listContainers()
console.log(containers)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "kubescape",
    name: "Kubescape",
    category: "Cloud & Infrastructure",
    sections: [
      {
        id: "kubescape-install",
        title: "Installation",
        content: `
# Installation

Install Kubescape CLI:

\`\`\`bash
curl -s https://raw.githubusercontent.com/kubescape/kubescape/master/install.sh | /bin/bash
\`\`\`

Or use the Go SDK:

\`\`\`bash
go get github.com/kubescape/kubescape/v3
\`\`\`
        `,
      },
    ],
  },

  // ========== AI / ML ==========
  {
    id: "openai",
    name: "OpenAI Node.js",
    category: "AI / ML",
    sections: [
      {
        id: "openai-install",
        title: "Installation",
        content: `
# Installation

Install the OpenAI library:

\`\`\`bash
npm install openai
\`\`\`

Example:

\`\`\`javascript
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const completion = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello!' }]
})
console.log(completion.choices[0].message)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "anthropic",
    name: "Anthropic Python",
    category: "AI / ML",
    sections: [
      {
        id: "anthropic-install",
        title: "Installation",
        content: `
# Installation

Install the Anthropic Python SDK:

\`\`\`bash
pip install anthropic
\`\`\`

Usage:

\`\`\`python
import anthropic

client = anthropic.Anthropic(api_key="my-api-key")
message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1000,
    messages=[{"role": "user", "content": "Hello"}]
)
print(message.content)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "langchain",
    name: "LangChain",
    category: "AI / ML",
    sections: [
      {
        id: "langchain-install",
        title: "Installation",
        content: `
# Installation

Install LangChain:

\`\`\`bash
npm install langchain
\`\`\`

Basic usage:

\`\`\`javascript
import { OpenAI } from 'langchain/llms/openai'
import { PromptTemplate } from 'langchain/prompts'

const model = new OpenAI({ openAIApiKey: '...' })
const prompt = PromptTemplate.fromTemplate('Tell me a joke about {topic}')
const chain = prompt.pipe(model)
const res = await chain.invoke({ topic: 'cats' })
\`\`\`
        `,
      },
    ],
  },
  {
    id: "huggingface",
    name: "Hugging Face Transformers",
    category: "AI / ML",
    sections: [
      {
        id: "huggingface-install",
        title: "Installation",
        content: `
# Installation

Install the Transformers library:

\`\`\`bash
pip install transformers
\`\`\`

Example pipeline:

\`\`\`python
from transformers import pipeline

classifier = pipeline('sentiment-analysis')
result = classifier('I love this!')
print(result)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "AI / ML",
    sections: [
      {
        id: "tensorflow-install",
        title: "Installation",
        content: `
# Installation

Install TensorFlow:

\`\`\`bash
pip install tensorflow
\`\`\`

Quick example:

\`\`\`python
import tensorflow as tf

mnist = tf.keras.datasets.mnist
(x_train, y_train), (x_test, y_test) = mnist.load_data()
model = tf.keras.models.Sequential([
    tf.keras.layers.Flatten(input_shape=(28, 28)),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(10)
])
\`\`\`
        `,
      },
    ],
  },
  {
    id: "pytorch",
    name: "PyTorch",
    category: "AI / ML",
    sections: [
      {
        id: "pytorch-install",
        title: "Installation",
        content: `
# Installation

Install PyTorch from the official site:

\`\`\`bash
pip install torch torchvision torchaudio
\`\`\`

Basic tensor:

\`\`\`python
import torch

x = torch.tensor([1.0, 2.0, 3.0])
print(x)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "scikit-learn",
    name: "scikit-learn",
    category: "AI / ML",
    sections: [
      {
        id: "sklearn-install",
        title: "Installation",
        content: `
# Installation

Install scikit-learn:

\`\`\`bash
pip install scikit-learn
\`\`\`

Example:

\`\`\`python
from sklearn import datasets
from sklearn.ensemble import RandomForestClassifier

iris = datasets.load_iris()
clf = RandomForestClassifier()
clf.fit(iris.data, iris.target)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "spacy",
    name: "spaCy",
    category: "AI / ML",
    sections: [
      {
        id: "spacy-install",
        title: "Installation",
        content: `
# Installation

Install spaCy:

\`\`\`bash
pip install spacy
python -m spacy download en_core_web_sm
\`\`\`

Usage:

\`\`\`python
import spacy

nlp = spacy.load('en_core_web_sm')
doc = nlp('Apple is looking at buying U.K. startup for $1 billion')
for ent in doc.ents:
    print(ent.text, ent.label_)
\`\`\`
        `,
      },
    ],
  },

  // ========== Big Data & Stream Processing ==========
  {
    id: "apache-spark",
    name: "Apache Spark (PySpark)",
    category: "Big Data & Stream Processing",
    sections: [
      {
        id: "spark-install",
        title: "Installation",
        content: `
# Installation

Install PySpark:

\`\`\`bash
pip install pyspark
\`\`\`

Example:

\`\`\`python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName('example').getOrCreate()
df = spark.read.csv('data.csv', header=True)
df.show()
\`\`\`
        `,
      },
    ],
  },
  {
    id: "apache-flink",
    name: "Apache Flink (Python)",
    category: "Big Data & Stream Processing",
    sections: [
      {
        id: "flink-install",
        title: "Installation",
        content: `
# Installation

Install PyFlink:

\`\`\`bash
pip install apache-flink
\`\`\`

Example:

\`\`\`python
from pyflink.table import EnvironmentSettings, TableEnvironment

env_settings = EnvironmentSettings.in_streaming_mode()
t_env = TableEnvironment.create(env_settings)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "apache-kafka",
    name: "Apache Kafka (node-rdkafka)",
    category: "Big Data & Stream Processing",
    sections: [
      {
        id: "kafka-install",
        title: "Installation",
        content: `
# Installation

Install node-rdkafka:

\`\`\`bash
npm install node-rdkafka
\`\`\`

Producer example:

\`\`\`javascript
const Kafka = require('node-rdkafka')

const producer = Kafka.Producer.createWriteStream({
  'metadata.broker.list': 'localhost:9092'
}, {}, { topic: 'test' })

producer.write(Buffer.from('Hello'))
\`\`\`
        `,
      },
    ],
  },
  {
    id: "apache-airflow",
    name: "Apache Airflow",
    category: "Big Data & Stream Processing",
    sections: [
      {
        id: "airflow-install",
        title: "Installation",
        content: `
# Installation

Install Airflow:

\`\`\`bash
pip install apache-airflow
\`\`\`

Initialize database:

\`\`\`bash
airflow db init
\`\`\`
        `,
      },
    ],
  },
  {
    id: "apache-hadoop",
    name: "Apache Hadoop",
    category: "Big Data & Stream Processing",
    sections: [
      {
        id: "hadoop-install",
        title: "Installation",
        content: `
# Installation

Hadoop is typically installed via distribution packages or direct download.

After installation, use the Hadoop streaming API for Python:

\`\`\`bash
hadoop jar hadoop-streaming.jar -input /input -output /output -mapper mapper.py -reducer reducer.py
\`\`\`
        `,
      },
    ],
  },
  {
    id: "apache-hive",
    name: "Apache Hive",
    category: "Big Data & Stream Processing",
    sections: [
      {
        id: "hive-install",
        title: "Installation",
        content: `
# Installation

Hive can be installed from the Apache Hive downloads page.

After setup, use the Hive JDBC driver or PyHive:

\`\`\`bash
pip install pyhive[hive]
\`\`\`

Connect:

\`\`\`python
from pyhive import hive

conn = hive.Connection(host='localhost', port=10000)
cursor = conn.cursor()
cursor.execute('SELECT * FROM mytable')
print(cursor.fetchall())
\`\`\`
        `,
      },
    ],
  },
  {
    id: "apache-iceberg",
    name: "Apache Iceberg",
    category: "Big Data & Stream Processing",
    sections: [
      {
        id: "iceberg-install",
        title: "Installation",
        content: `
# Installation

Iceberg is a table format; you can use it with Spark, Flink, etc.

For Spark, add the Iceberg runtime:

\`\`\`bash
spark-sql --packages org.apache.iceberg:iceberg-spark-runtime-3.5_2.12:1.5.0
\`\`\`
        `,
      },
    ],
  },
  {
    id: "apache-druid",
    name: "Apache Druid",
    category: "Big Data & Stream Processing",
    sections: [
      {
        id: "druid-install",
        title: "Installation",
        content: `
# Installation

Druid can be run via Docker:

\`\`\`bash
docker run -p 8888:8888 apache/druid:latest
\`\`\`

Use the Druid Python client:

\`\`\`bash
pip install pydruid
\`\`\`
        `,
      },
    ],
  },
  {
    id: "clickhouse",
    name: "ClickHouse",
    category: "Big Data & Stream Processing",
    sections: [
      {
        id: "clickhouse-install",
        title: "Installation",
        content: `
# Installation

Install the ClickHouse Python driver:

\`\`\`bash
pip install clickhouse-driver
\`\`\`

Example:

\`\`\`python
from clickhouse_driver import Client

client = Client('localhost')
result = client.execute('SELECT version()')
print(result)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "elasticsearch",
    name: "Elasticsearch",
    category: "Big Data & Stream Processing",
    sections: [
      {
        id: "elastic-install",
        title: "Installation",
        content: `
# Installation

Install the official Elasticsearch client:

\`\`\`bash
npm install @elastic/elasticsearch
\`\`\`

Example:

\`\`\`javascript
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

const result = await client.search({
  index: 'my-index',
  query: { match: { title: 'test' } }
})
\`\`\`
        `,
      },
    ],
  },
  {
    id: "opensearch",
    name: "OpenSearch",
    category: "Big Data & Stream Processing",
    sections: [
      {
        id: "opensearch-install",
        title: "Installation",
        content: `
# Installation

Install the OpenSearch JavaScript client:

\`\`\`bash
npm install @opensearch-project/opensearch
\`\`\`

Example:

\`\`\`javascript
const { Client } = require('@opensearch-project/opensearch')
const client = new Client({ node: 'http://localhost:9200' })

const info = await client.info()
\`\`\`
        `,
      },
    ],
  },
  {
    id: "grafana",
    name: "Grafana (Grafana Faro)",
    category: "Observability",
    sections: [
      {
        id: "grafana-install",
        title: "Installation",
        content: `
# Installation

Grafana Faro is a frontend observability SDK:

\`\`\`bash
npm install @grafana/faro-web-sdk
\`\`\`

Initialize:

\`\`\`javascript
import { initializeFaro } from '@grafana/faro-web-sdk'

initializeFaro({
  url: 'https://collector.example.com',
  app: { name: 'my-app' }
})
\`\`\`
        `,
      },
    ],
  },
  {
    id: "prometheus",
    name: "Prometheus (prom-client)",
    category: "Observability",
    sections: [
      {
        id: "prometheus-install",
        title: "Installation",
        content: `
# Installation

Install prom-client for Node.js:

\`\`\`bash
npm install prom-client
\`\`\`

Create metrics:

\`\`\`javascript
const client = require('prom-client')
const counter = new client.Counter({ name: 'requests_total', help: 'Total requests' })
counter.inc()
\`\`\`
        `,
      },
    ],
  },

  // ========== Observability ==========
  {
    id: "opentelemetry",
    name: "OpenTelemetry",
    category: "Observability",
    sections: [
      {
        id: "otel-install",
        title: "Installation",
        content: `
# Installation

Install the OpenTelemetry Node.js SDK:

\`\`\`bash
npm install @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node
\`\`\`

Setup:

\`\`\`javascript
const { NodeSDK } = require('@opentelemetry/sdk-node')
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node')

const sdk = new NodeSDK({
  instrumentations: [getNodeAutoInstrumentations()]
})

sdk.start()
\`\`\`
        `,
      },
    ],
  },
  {
    id: "sentry",
    name: "Sentry",
    category: "Observability",
    sections: [
      {
        id: "sentry-install",
        title: "Installation",
        content: `
# Installation

Install Sentry SDK:

\`\`\`bash
npm install @sentry/nextjs
\`\`\`

Initialize:

\`\`\`javascript
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://your-dsn@sentry.io/project-id',
  tracesSampleRate: 1.0
})
\`\`\`
        `,
      },
    ],
  },
  {
    id: "logrocket",
    name: "LogRocket",
    category: "Observability",
    sections: [
      {
        id: "logrocket-install",
        title: "Installation",
        content: `
# Installation

Install LogRocket:

\`\`\`bash
npm install logrocket
\`\`\`

Initialize:

\`\`\`javascript
import LogRocket from 'logrocket'

LogRocket.init('your-app-id')
\`\`\`
        `,
      },
    ],
  },

  // ========== Ruby Gems (dari Ruby Toolbox) ==========
  {
    id: "json_logic",
    name: "json_logic (Ruby)",
    category: "Ruby Gems",
    sections: [
      {
        id: "json_logic-install",
        title: "Installation",
        content: `
# Installation

Add to Gemfile:

\`\`\`ruby
gem 'json_logic'
\`\`\`

Then:

\`\`\`ruby
require 'json_logic'

rule = { "==" => [1, 1] }
result = JsonLogic.apply(rule) # => true
\`\`\`
        `,
      },
    ],
  },
  {
    id: "types_from_serializers",
    name: "types_from_serializers (Ruby)",
    category: "Ruby Gems",
    sections: [
      {
        id: "tfs-install",
        title: "Installation",
        content: `
# Installation

Add to Gemfile:

\`\`\`ruby
gem 'types_from_serializers'
\`\`\`

Then run generator to produce TypeScript interfaces.
        `,
      },
    ],
  },
  {
    id: "memory_profiler",
    name: "memory_profiler (Ruby)",
    category: "Ruby Gems",
    sections: [
      {
        id: "memory_profiler-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'memory_profiler'
\`\`\`

Usage:

\`\`\`ruby
report = MemoryProfiler.report do
  # your code
end
report.pretty_print
\`\`\`
        `,
      },
    ],
  },
  {
    id: "resend-ruby",
    name: "Resend Ruby SDK",
    category: "Ruby Gems",
    sections: [
      {
        id: "resend-ruby-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'resend'
\`\`\`

Send an email:

\`\`\`ruby
require 'resend'

Resend.api_key = 're_...'
Resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'user@example.com',
  subject: 'Hello',
  html: '<p>Hello</p>'
})
\`\`\`
        `,
      },
    ],
  },
  {
    id: "datadog-ruby",
    name: "Datadog Ruby SDK",
    category: "Ruby Gems",
    sections: [
      {
        id: "datadog-ruby-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'ddtrace'
\`\`\`

Initialize:

\`\`\`ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.enabled = true
end
\`\`\`
        `,
      },
    ],
  },
  {
    id: "opentelemetry-ruby",
    name: "OpenTelemetry Ruby",
    category: "Ruby Gems",
    sections: [
      {
        id: "otel-ruby-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'opentelemetry-sdk'
gem 'opentelemetry-exporter-otlp'
\`\`\`

Setup:

\`\`\`ruby
require 'opentelemetry/sdk'

OpenTelemetry::SDK.configure do |c|
  c.service_name = 'my-service'
end
\`\`\`
        `,
      },
    ],
  },
  {
    id: "snowflake-ruby",
    name: "Snowflake Ruby Driver",
    category: "Ruby Gems",
    sections: [
      {
        id: "snowflake-ruby-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'snowflake-ruby'
\`\`\`

Connect:

\`\`\`ruby
require 'snowflake'

client = Snowflake::Client.new(account: 'myaccount', user: 'user', password: 'pass')
client.query('SELECT 1')
\`\`\`
        `,
      },
    ],
  },
  {
    id: "yrs-ruby",
    name: "yrs (Yjs for Ruby)",
    category: "Ruby Gems",
    sections: [
      {
        id: "yrs-ruby-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'yrs'
\`\`\`

Example:

\`\`\`ruby
require 'yrs'

doc = Y::Doc.new
text = doc.get_text('mytext')
text.insert(0, 'Hello')
\`\`\`
        `,
      },
    ],
  },
  {
    id: "lz4_ruby",
    name: "lz4_flex (Ruby)",
    category: "Ruby Gems",
    sections: [
      {
        id: "lz4-ruby-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'lz4_flex'
\`\`\`

Compress/decompress:

\`\`\`ruby
require 'lz4_flex'

compressed = LZ4Flex.compress('hello')
decompressed = LZ4Flex.decompress(compressed)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "prism-ruby",
    name: "Prism (Ruby Parser)",
    category: "Ruby Gems",
    sections: [
      {
        id: "prism-ruby-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'prism'
\`\`\`

Parse Ruby code:

\`\`\`ruby
require 'prism'

Prism.parse('puts "hello"')
\`\`\`
        `,
      },
    ],
  },
  {
    id: "delayed",
    name: "Delayed (ActiveJob backend)",
    category: "Ruby Gems",
    sections: [
      {
        id: "delayed-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'delayed'
\`\`\`

In your Rails app, configure ActiveJob:

\`\`\`ruby
config.active_job.queue_adapter = :delayed
\`\`\`
        `,
      },
    ],
  },
  {
    id: "anthropic-ruby",
    name: "Anthropic Ruby",
    category: "Ruby Gems",
    sections: [
      {
        id: "anthropic-ruby-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'anthropic'
\`\`\`

Example:

\`\`\`ruby
require 'anthropic'

client = Anthropic::Client.new(api_key: 'sk-...')
response = client.messages.create(
  model: 'claude-3-opus-20240229',
  messages: [{ role: 'user', content: 'Hello' }]
)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "openapi_parser",
    name: "openapi_parser (Ruby)",
    category: "Ruby Gems",
    sections: [
      {
        id: "openapi_parser-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'openapi_parser'
\`\`\`

Parse an OpenAPI spec:

\`\`\`ruby
require 'openapi_parser'

spec = OpenAPIParser.parse(YAML.load_file('openapi.yaml'))
\`\`\`
        `,
      },
    ],
  },
  {
    id: "acts-as-taggable-on",
    name: "acts-as-taggable-on (Ruby)",
    category: "Ruby Gems",
    sections: [
      {
        id: "acts-as-taggable-on-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'acts-as-taggable-on'
\`\`\`

Then run the generator and migrate:

\`\`\`bash
rails acts_as_taggable_on_engine:install:migrations
rails db:migrate
\`\`\`
        `,
      },
    ],
  },
  {
    id: "inertia-rails",
    name: "Inertia.js Rails Adapter",
    category: "Ruby Gems",
    sections: [
      {
        id: "inertia-rails-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'inertia_rails'
\`\`\`

Then set up the middleware and use the Inertia renderer.
        `,
      },
    ],
  },
  {
    id: "axe-capybara",
    name: "axe-capybara (Ruby)",
    category: "Ruby Gems",
    sections: [
      {
        id: "axe-capybara-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'axe-capybara'
\`\`\`

Use in feature specs:

\`\`\`ruby
it 'is accessible' do
  visit root_path
  expect(page).to be_axe_clean
end
\`\`\`
        `,
      },
    ],
  },
  {
    id: "ruby-lsp-rspec",
    name: "ruby-lsp-rspec",
    category: "Ruby Gems",
    sections: [
      {
        id: "ruby-lsp-rspec-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'ruby-lsp-rspec'
\`\`\`

Then add to your .ruby-lsp configuration.
        `,
      },
    ],
  },
  {
    id: "mindee-ruby",
    name: "Mindee Ruby SDK",
    category: "Ruby Gems",
    sections: [
      {
        id: "mindee-ruby-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'mindee'
\`\`\`

Example:

\`\`\`ruby
require 'mindee'

client = Mindee::Client.new(api_key: '...')
result = client.parse(Mindee::Invoice, 'path/to/invoice.pdf')
\`\`\`
        `,
      },
    ],
  },
  {
    id: "tencent-cloud-ruby",
    name: "Tencent Cloud Ruby SDK",
    category: "Ruby Gems",
    sections: [
      {
        id: "tencent-cloud-ruby-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'tencentcloud-sdk-common'
\`\`\`

Example:

\`\`\`ruby
require 'tencentcloud-sdk-common'

client = TencentCloud::Common::Client.new(region: 'ap-guangzhou')
\`\`\`
        `,
      },
    ],
  },
  {
    id: "axe-cucumber",
    name: "axe-cucumber (Ruby)",
    category: "Ruby Gems",
    sections: [
      {
        id: "axe-cucumber-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'axe-cucumber'
\`\`\`

Then use the step definitions provided.
        `,
      },
    ],
  },
  {
    id: "argon2-ruby",
    name: "argon2 (Ruby)",
    category: "Ruby Gems",
    sections: [
      {
        id: "argon2-ruby-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'argon2'
\`\`\`

Example:

\`\`\`ruby
require 'argon2'

hash = Argon2::Password.create('password')
Argon2::Password.verify_password('password', hash)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "mailchimp-transactional",
    name: "Mailchimp Transactional Ruby",
    category: "Ruby Gems",
    sections: [
      {
        id: "mailchimp-transactional-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'mailchimp_transactional'
\`\`\`

Example:

\`\`\`ruby
require 'mailchimp_transactional'

client = MailchimpTransactional::Client.new(api_key: '...')
client.messages.send(message: { to: [{ email: 'user@example.com' }], text: 'Hello' })
\`\`\`
        `,
      },
    ],
  },
  {
    id: "hiredis",
    name: "hiredis (Ruby binding)",
    category: "Ruby Gems",
    sections: [
      {
        id: "hiredis-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'hiredis'
gem 'redis'
\`\`\`

Then use it with redis-rb:

\`\`\`ruby
require 'redis'

redis = Redis.new(driver: :hiredis)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "keycloak-admin-ruby",
    name: "keycloak-admin-ruby",
    category: "Ruby Gems",
    sections: [
      {
        id: "keycloak-admin-ruby-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'keycloak-admin'
\`\`\`

Example:

\`\`\`ruby
require 'keycloak-admin'

client = KeycloakAdmin::Client.new(realm: 'myrealm')
client.token(username: 'admin', password: 'pass')
\`\`\`
        `,
      },
    ],
  },
  {
    id: "spree-cli",
    name: "Spree CLI (Ruby)",
    category: "Ruby Gems",
    sections: [
      {
        id: "spree-cli-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'spree_cli'
\`\`\`

Then run:

\`\`\`bash
spree install
\`\`\`
        `,
      },
    ],
  },
  {
    id: "tokenizers-ruby",
    name: "tokenizers (Ruby)",
    category: "Ruby Gems",
    sections: [
      {
        id: "tokenizers-ruby-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'tokenizers'
\`\`\`

Example:

\`\`\`ruby
require 'tokenizers'

tokenizer = Tokenizers.from_pretrained('bert-base-uncased')
encoding = tokenizer.encode('Hello world')
puts encoding.tokens
\`\`\`
        `,
      },
    ],
  },
  {
    id: "zstd-ruby",
    name: "zstd-ruby",
    category: "Ruby Gems",
    sections: [
      {
        id: "zstd-ruby-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'zstd-ruby'
\`\`\`

Compress:

\`\`\`ruby
require 'zstd'

compressed = Zstd.compress('data')
decompressed = Zstd.decompress(compressed)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "sorbet-struct",
    name: "sorbet-struct (Ruby)",
    category: "Ruby Gems",
    sections: [
      {
        id: "sorbet-struct-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'sorbet-struct'
\`\`\`

Define a struct:

\`\`\`ruby
require 'sorbet-struct'

class Person < T::Struct
  const :name, String
  const :age, Integer
end
\`\`\`
        `,
      },
    ],
  },
  {
    id: "payout-ruby",
    name: "payout (Ruby)",
    category: "Ruby Gems",
    sections: [
      {
        id: "payout-ruby-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'payout'
\`\`\`

Example:

\`\`\`ruby
require 'payout'

Payout.api_key = 'your-api-key'
Payout::Payment.create(amount: 1000, currency: 'usd')
\`\`\`
        `,
      },
    ],
  },
  {
    id: "unicode-confusable",
    name: "unicode-confusable (Ruby)",
    category: "Ruby Gems",
    sections: [
      {
        id: "unicode-confusable-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'unicode-confusable'
\`\`\`

Check confusability:

\`\`\`ruby
require 'unicode/confusable'

Unicode::Confusable.confusable?('pаypal', 'paypal') # true (Cyrillic a)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "redis-client",
    name: "redis-client (Ruby)",
    category: "Ruby Gems",
    sections: [
      {
        id: "redis-client-install",
        title: "Installation",
        content: `
# Installation

\`\`\`ruby
gem 'redis-client'
\`\`\`

Usage:

\`\`\`ruby
require 'redis-client'

redis = RedisClient.new(host: 'localhost', port: 6379)
redis.call('SET', 'key', 'value')
\`\`\`
        `,
      },
    ],
  },

  // ========== Python (dari best-of-python) ==========
  {
    id: "sqlalchemy-python",
    name: "SQLAlchemy (Python)",
    category: "Python",
    sections: [
      {
        id: "sqlalchemy-python-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
pip install sqlalchemy
\`\`\`

Example:

\`\`\`python
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine('sqlite:///example.db')
Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "tenacity",
    name: "tenacity (Python)",
    category: "Python",
    sections: [
      {
        id: "tenacity-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
pip install tenacity
\`\`\`

Example:

\`\`\`python
from tenacity import retry, stop_after_attempt

@retry(stop=stop_after_attempt(3))
def flaky_function():
    import random
    if random.random() < 0.5:
        raise Exception("Failed")
    return "Success"
\`\`\`
        `,
      },
    ],
  },
  {
    id: "mysqlclient",
    name: "mysqlclient (Python)",
    category: "Python",
    sections: [
      {
        id: "mysqlclient-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
pip install mysqlclient
\`\`\`

Connect:

\`\`\`python
import MySQLdb

db = MySQLdb.connect(host="localhost", user="root", passwd="", db="test")
cursor = db.cursor()
cursor.execute("SELECT VERSION()")
\`\`\`
        `,
      },
    ],
  },
  {
    id: "activeloop",
    name: "Activeloop (Deep Lake)",
    category: "Python",
    sections: [
      {
        id: "activeloop-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
pip install deeplake
\`\`\`

Example:

\`\`\`python
import deeplake

ds = deeplake.load('hub://activeloop/mnist')
\`\`\`
        `,
      },
    ],
  },
  {
    id: "sdv",
    name: "Synthetic Data Vault (SDV)",
    category: "Python",
    sections: [
      {
        id: "sdv-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
pip install sdv
\`\`\`

Generate synthetic data:

\`\`\`python
from sdv.tabular import GaussianCopula

model = GaussianCopula()
model.fit(real_data)
synthetic_data = model.sample(num_rows=100)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "docker-py",
    name: "Docker SDK for Python",
    category: "Python",
    sections: [
      {
        id: "docker-py-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
pip install docker
\`\`\`

Example:

\`\`\`python
import docker

client = docker.from_env()
client.containers.run('alpine', 'echo hello world')
\`\`\`
        `,
      },
    ],
  },
  {
    id: "orjson",
    name: "orjson (Python)",
    category: "Python",
    sections: [
      {
        id: "orjson-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
pip install orjson
\`\`\`

Usage:

\`\`\`python
import orjson

data = {'key': 'value'}
serialized = orjson.dumps(data)
deserialized = orjson.loads(serialized)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "keyboard",
    name: "keyboard (Python)",
    category: "Python",
    sections: [
      {
        id: "keyboard-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
pip install keyboard
\`\`\`

Example:

\`\`\`python
import keyboard

keyboard.write('Hello')
keyboard.press_and_release('shift+a')
\`\`\`
        `,
      },
    ],
  },
  {
    id: "macropy",
    name: "MacroPy",
    category: "Python",
    sections: [
      {
        id: "macropy-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
pip install macropy
\`\`\`

Use macros:

\`\`\`python
from macropy.core.quotes import macros, q

expr = q[1 + 2]
\`\`\`
        `,
      },
    ],
  },

  // ========== Go Projects (dari GitHub stars) ==========
  {
    id: "teleport",
    name: "Teleport (Go client)",
    category: "Go Projects",
    sections: [
      {
        id: "teleport-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
go get github.com/gravitational/teleport/api/client
\`\`\`

Example:

\`\`\`go
package main

import (
    "context"
    "github.com/gravitational/teleport/api/client"
)

func main() {
    clt, err := client.New(context.Background(), client.Config{
        Addrs: []string{"localhost:3025"},
    })
}
\`\`\`
        `,
      },
    ],
  },
  {
    id: "rook",
    name: "Rook (Go client)",
    category: "Go Projects",
    sections: [
      {
        id: "rook-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
go get github.com/rook/rook/pkg/client/clientset/versioned
\`\`\`

Then use the Kubernetes client.
        `,
      },
    ],
  },
  {
    id: "kubescape-go",
    name: "Kubescape Go SDK",
    category: "Go Projects",
    sections: [
      {
        id: "kubescape-go-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
go get github.com/kubescape/kubescape/v3
\`\`\`

Example:

\`\`\`go
import "github.com/kubescape/kubescape/v3/cmd"

func main() {
    cmd.Execute()
}
\`\`\`
        `,
      },
    ],
  },

  // ========== Miscellaneous from Apache Announcement ==========
  {
    id: "apache-hertzbeat",
    name: "Apache HertzBeat",
    category: "Miscellaneous",
    sections: [
      {
        id: "hertzbeat-install",
        title: "Installation",
        content: `
# Installation

HertzBeat can be run via Docker:

\`\`\`bash
docker run -d -p 1157:1157 --name hertzbeat apache/hertzbeat
\`\`\`

Access the dashboard at http://localhost:1157.
        `,
      },
    ],
  },
  {
    id: "apache-teaclave",
    name: "Apache Teaclave",
    category: "Miscellaneous",
    sections: [
      {
        id: "teaclave-install",
        title: "Installation",
        content: `
# Installation

Teaclave provides Rust SDK:

\`\`\`toml
[dependencies]
teaclave = { git = "https://github.com/apache/incubator-teaclave" }
\`\`\`
        `,
      },
    ],
  },
  {
    id: "apache-training",
    name: "Apache Training",
    category: "Miscellaneous",
    sections: [
      {
        id: "apache-training-install",
        title: "Installation",
        content: `
# Installation

Apache Training is a collection of training materials. You can browse them at:

https://training.apache.org
        `,
      },
    ],
  },

  // ========== Additional popular SDKs ==========
  {
    id: "auth0",
    name: "Auth0 SDK (Node.js)",
    category: "Authentication & Security",
    sections: [
      {
        id: "auth0-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install @auth0/auth0-react
\`\`\`

For React:

\`\`\`jsx
import { Auth0Provider } from '@auth0/auth0-react'

root.render(
  <Auth0Provider
    domain="YOUR_DOMAIN"
    clientId="YOUR_CLIENT_ID"
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <App />
  </Auth0Provider>
)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "firebase",
    name: "Firebase JS SDK",
    category: "Additional popular SDKs",
    sections: [
      {
        id: "firebase-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install firebase
\`\`\`

Initialize:

\`\`\`javascript
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: '...',
  authDomain: '...',
  projectId: '...'
}

const app = initializeApp(firebaseConfig)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "twilio",
    name: "Twilio Node.js SDK",
    category: "Additional popular SDKs",
    sections: [
      {
        id: "twilio-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install twilio
\`\`\`

Send SMS:

\`\`\`javascript
const twilio = require('twilio')
const client = twilio(accountSid, authToken)

client.messages.create({
  body: 'Hello',
  from: '+1234567890',
  to: '+0987654321'
})
\`\`\`
        `,
      },
    ],
  },
  {
    id: "sendgrid",
    name: "SendGrid Node.js SDK",
    category: "Additional popular SDKs",
    sections: [
      {
        id: "sendgrid-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install @sendgrid/mail
\`\`\`

Send email:

\`\`\`javascript
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

sgMail.send({
  to: 'test@example.com',
  from: 'test@example.com',
  subject: 'Hello',
  text: 'Hello world'
})
\`\`\`
        `,
      },
    ],
  },
  {
    id: "mailgun",
    name: "Mailgun.js",
    category: "Additional popular SDKs",
    sections: [
      {
        id: "mailgun-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install mailgun.js
\`\`\`

Example:

\`\`\`javascript
const formData = require('form-data')
const Mailgun = require('mailgun.js')
const mailgun = new Mailgun(formData)

const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY })

mg.messages.create('sandbox...', {
  from: 'mailgun@sandbox...',
  to: ['user@example.com'],
  subject: 'Hello',
  text: 'Testing'
})
\`\`\`
        `,
      },
    ],
  },
  {
    id: "postmark",
    name: "Postmark.js",
    category: "Additional popular SDKs",
    sections: [
      {
        id: "postmark-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install postmark
\`\`\`

Send email:

\`\`\`javascript
const postmark = require('postmark')
const client = new postmark.ServerClient('server-token')

client.sendEmail({
  From: 'sender@example.com',
  To: 'receiver@example.com',
  Subject: 'Hello',
  TextBody: 'Hello'
})
\`\`\`
        `,
      },
    ],
  },
  {
    id: "cloudinary",
    name: "Cloudinary Node.js SDK",
    category: "Additional popular SDKs",
    sections: [
      {
        id: "cloudinary-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install cloudinary
\`\`\`

Upload image:

\`\`\`javascript
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'your-cloud',
  api_key: 'your-key',
  api_secret: 'your-secret'
})

cloudinary.uploader.upload('image.jpg')
\`\`\`
        `,
      },
    ],
  },
  {
    id: "imgix",
    name: "Imgix JS SDK",
    category: "Additional popular SDKs",
    sections: [
      {
        id: "imgix-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install imgix-core-js
\`\`\`

Example:

\`\`\`javascript
const ImgixClient = require('imgix-core-js')
const client = new ImgixClient({ domain: 'your-domain.imgix.net' })
const url = client.buildURL('/image.jpg', { w: 500, h: 300 })
\`\`\`
        `,
      },
    ],
  },
  {
    id: "mux",
    name: "Mux Node SDK",
    category: "Additional popular SDKs",
    sections: [
      {
        id: "mux-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install @mux/mux-node
\`\`\`

Create an asset:

\`\`\`javascript
const Mux = require('@mux/mux-node')
const { Video } = new Mux(accessToken, secret)

const asset = await Video.Assets.create({
  input: 'https://example.com/video.mp4'
})
\`\`\`
        `,
      },
    ],
  },
  {
    id: "squoosh",
    name: "Squoosh (Node API)",
    category: "Additional popular SDKs",
    sections: [
      {
        id: "squoosh-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install @squoosh/lib
\`\`\`

Example:

\`\`\`javascript
const { ImagePool } = require('@squoosh/lib')
const imagePool = new ImagePool()
const image = imagePool.ingestImage('image.jpg')
await image.encode({ mozjpeg: {} })
const binary = await image.encodedWith.mozjpeg
\`\`\`
        `,
      },
    ],
  },

  // ========== Authentication & Security ==========
  {
    id: "passport",
    name: "Passport.js",
    category: "Authentication & Security",
    sections: [
      {
        id: "passport-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install passport
\`\`\`

Example with local strategy:

\`\`\`javascript
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(
  (username, password, done) => {
    // verify user
  }
))
\`\`\`
        `,
      },
    ],
  },
  {
    id: "bcrypt",
    name: "bcrypt",
    category: "Authentication & Security",
    sections: [
      {
        id: "bcrypt-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install bcrypt
\`\`\`

Hash and compare:

\`\`\`javascript
const bcrypt = require('bcrypt')
const hash = await bcrypt.hash('password', 10)
const match = await bcrypt.compare('password', hash)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "jsonwebtoken",
    name: "jsonwebtoken",
    category: "Authentication & Security",
    sections: [
      {
        id: "jsonwebtoken-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install jsonwebtoken
\`\`\`

Sign and verify:

\`\`\`javascript
const jwt = require('jsonwebtoken')
const token = jwt.sign({ userId: 123 }, 'secret')
const decoded = jwt.verify(token, 'secret')
\`\`\`
        `,
      },
    ],
  },

  // ========== Testing ==========
  {
    id: "jest",
    name: "Jest",
    category: "Testing",
    sections: [
      {
        id: "jest-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install --save-dev jest
\`\`\`

Add to package.json:

\`\`\`json
"scripts": { "test": "jest" }
\`\`\`

Write a test:

\`\`\`javascript
test('adds 1 + 2 equals 3', () => {
  expect(1 + 2).toBe(3)
})
\`\`\`
        `,
      },
    ],
  },
  {
    id: "vitest",
    name: "Vitest",
    category: "Testing",
    sections: [
      {
        id: "vitest-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install -D vitest
\`\`\`

In vite.config.ts:

\`\`\`ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: { globals: true }
})
\`\`\`
        `,
      },
    ],
  },
  {
    id: "cypress",
    name: "Cypress",
    category: "Testing",
    sections: [
      {
        id: "cypress-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install cypress --save-dev
\`\`\`

Open Cypress:

\`\`\`bash
npx cypress open
\`\`\`
        `,
      },
    ],
  },
  {
    id: "playwright",
    name: "Playwright",
    category: "Testing",
    sections: [
      {
        id: "playwright-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm init playwright@latest
\`\`\`

Run tests:

\`\`\`bash
npx playwright test
\`\`\`
        `,
      },
    ],
  },
  {
    id: "puppeteer",
    name: "Puppeteer",
    category: "Testing",
    sections: [
      {
        id: "puppeteer-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install puppeteer
\`\`\`

Example:

\`\`\`javascript
const puppeteer = require('puppeteer')
const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.goto('https://example.com')
await browser.close()
\`\`\`
        `,
      },
    ],
  },

  // ========== Utility Libraries ==========
  {
    id: "axios",
    name: "Axios",
    category: "Utility Libraries",
    sections: [
      {
        id: "axios-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install axios
\`\`\`

Make a request:

\`\`\`javascript
const axios = require('axios')
const response = await axios.get('https://api.example.com')
\`\`\`
        `,
      },
    ],
  },
  {
    id: "graphql-request",
    name: "graphql-request",
    category: "Utility Libraries",
    sections: [
      {
        id: "graphql-request-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install graphql-request graphql
\`\`\`

Example:

\`\`\`javascript
import { request, gql } from 'graphql-request'

const query = gql\`{ hello }\`
const data = await request('https://api.example.com/graphql', query)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "apollo-client",
    name: "Apollo Client",
    category: "Utility Libraries",
    sections: [
      {
        id: "apollo-client-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install @apollo/client graphql
\`\`\`

Initialize:

\`\`\`javascript
import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://api.example.com/graphql',
  cache: new InMemoryCache()
})
\`\`\`
        `,
      },
    ],
  },
  {
    id: "urql",
    name: "urql",
    category: "Utility Libraries",
    sections: [
      {
        id: "urql-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install urql graphql
\`\`\`

Setup:

\`\`\`jsx
import { Client, Provider } from 'urql'

const client = new Client({ url: 'https://api.example.com/graphql' })

<Provider value={client}>
  <App />
</Provider>
\`\`\`
        `,
      },
    ],
  },
  {
    id: "tanstack-query",
    name: "TanStack Query",
    category: "Utility Libraries",
    sections: [
      {
        id: "tanstack-query-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install @tanstack/react-query
\`\`\`

Setup:

\`\`\`jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
\`\`\`
        `,
      },
    ],
  },
  {
    id: "swr",
    name: "SWR",
    category: "Utility Libraries",
    sections: [
      {
        id: "swr-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install swr
\`\`\`

Example:

\`\`\`jsx
import useSWR from 'swr'

function Profile() {
  const { data } = useSWR('/api/user', fetcher)
  return <div>{data?.name}</div>
}
\`\`\`
        `,
      },
    ],
  },

  // ========== Build Tools ==========
  {
    id: "webpack",
    name: "Webpack",
    category: "Build Tools",
    sections: [
      {
        id: "webpack-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install --save-dev webpack webpack-cli
\`\`\`

Create webpack.config.js:

\`\`\`javascript
module.exports = {
  entry: './src/index.js',
  output: { filename: 'bundle.js' }
}
\`\`\`
        `,
      },
    ],
  },
  {
    id: "vite",
    name: "Vite",
    category: "Build Tools",
    sections: [
      {
        id: "vite-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm create vite@latest my-app
cd my-app
npm install
npm run dev
\`\`\`
        `,
      },
    ],
  },
  {
    id: "esbuild",
    name: "esbuild",
    category: "Build Tools",
    sections: [
      {
        id: "esbuild-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install esbuild
\`\`\`

Build:

\`\`\`bash
npx esbuild app.js --bundle --outfile=out.js
\`\`\`
        `,
      },
    ],
  },
  {
    id: "rollup",
    name: "Rollup",
    category: "Build Tools",
    sections: [
      {
        id: "rollup-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install --save-dev rollup
\`\`\`

Configure rollup.config.js and run:

\`\`\`bash
npx rollup -c
\`\`\`
        `,
      },
    ],
  },
  {
    id: "parcel",
    name: "Parcel",
    category: "Build Tools",
    sections: [
      {
        id: "parcel-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install --save-dev parcel
\`\`\`

Run:

\`\`\`bash
npx parcel src/index.html
\`\`\`
        `,
      },
    ],
  },

  // ========== Game Development ==========
  {
    id: "phaser",
    name: "Phaser",
    category: "Game Development",
    sections: [
      {
        id: "phaser-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install phaser
\`\`\`

Create a game:

\`\`\`javascript
import Phaser from 'phaser'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: { preload, create, update }
}

new Phaser.Game(config)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "babylonjs",
    name: "Babylon.js",
    category: "Game Development",
    sections: [
      {
        id: "babylon-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install @babylonjs/core
\`\`\`

Create a scene:

\`\`\`javascript
import { Engine, Scene } from '@babylonjs/core'

const engine = new Engine(canvas)
const scene = new Scene(engine)
\`\`\`
        `,
      },
    ],
  },
  {
    id: "threejs",
    name: "Three.js",
    category: "Game Development",
    sections: [
      {
        id: "three-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install three
\`\`\`

Basic scene:

\`\`\`javascript
import * as THREE from 'three'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ canvas })
\`\`\`
        `,
      },
    ],
  },

  // ========== Miscellaneous (OpenSSF, Arinova, etc.) ==========
  {
    id: "minima",
    name: "minima- (JavaScript framework)",
    category: "Miscellaneous",
    sections: [
      {
        id: "minima-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install minima-
\`\`\`

Check documentation at https://github.com/tolin-simpson/minima-
        `,
      },
    ],
  },
  {
    id: "edgeml-python",
    name: "EdgeML Python SDK",
    category: "Miscellaneous",
    sections: [
      {
        id: "edgeml-python-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
pip install edgeml
\`\`\`

Example:

\`\`\`python
from edgeml import FederatedLearning

fl = FederatedLearning()
fl.train()
\`\`\`
        `,
      },
    ],
  },
  {
    id: "edgeml-ios",
    name: "EdgeML iOS SDK",
    category: "Miscellaneous",
    sections: [
      {
        id: "edgeml-ios-install",
        title: "Installation",
        content: `
# Installation

Add via CocoaPods:

\`\`\`ruby
pod 'EdgeML'
\`\`\`

Then import:

\`\`\`swift
import EdgeML
\`\`\`
        `,
      },
    ],
  },
  {
    id: "edgeml-android",
    name: "EdgeML Android SDK",
    category: "Miscellaneous",
    sections: [
      {
        id: "edgeml-android-install",
        title: "Installation",
        content: `
# Installation

Add to build.gradle:

\`\`\`gradle
implementation 'com.github.edgeml:edgeml-android:1.0.0'
\`\`\`
        `,
      },
    ],
  },
  {
    id: "remeda",
    name: "Remeda",
    category: "Miscellaneous",
    sections: [
      {
        id: "remeda-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
npm install remeda
\`\`\`

Example:

\`\`\`typescript
import { pipe, map } from 'remeda'

pipe([1, 2, 3], map(x => x * 2)) // [2,4,6]
\`\`\`
        `,
      },
    ],
  },
  {
    id: "terraform-dns",
    name: "Terraform DNS Modules",
    category: "Miscellaneous",
    sections: [
      {
        id: "terraform-dns-install",
        title: "Installation",
        content: `
# Installation

Use in your Terraform configuration:

\`\`\`hcl
module "dns" {
  source = "terraform-aws-modules/route53/aws"
  # ...
}
\`\`\`
        `,
      },
    ],
  },
  {
    id: "qwed",
    name: "qwed (AI verification)",
    category: "Miscellaneous",
    sections: [
      {
        id: "qwed-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
pip install qwed
\`\`\`

Documentation: https://docs.qwed.ai
        `,
      },
    ],
  },
  {
    id: "dnsplane",
    name: "dnsplane",
    category: "Miscellaneous",
    sections: [
      {
        id: "dnsplane-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
go get github.com/earentir/dnsplane
\`\`\`
        `,
      },
    ],
  },
  {
    id: "vaquum-limen",
    name: "Vaquum Limen",
    category: "Miscellaneous",
    sections: [
      {
        id: "vaquum-limen-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
pip install vaquum-limen
\`\`\`

Example:

\`\`\`python
from vaquum import Limen

limen = Limen()
\`\`\`
        `,
      },
    ],
  },
  {
    id: "rust-protobuf-iter",
    name: "Rust Protobuf Iter",
    category: "Miscellaneous",
    sections: [
      {
        id: "rust-protobuf-iter-install",
        title: "Installation",
        content: `
# Installation

Add to Cargo.toml:

\`\`\`toml
[dependencies]
protobuf-iter = "0.1"
\`\`\`
        `,
      },
    ],
  },
  {
    id: "loom",
    name: "Loom (agent framework)",
    category: "Miscellaneous",
    sections: [
      {
        id: "loom-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
pip install loom-ai
\`\`\`

Documentation: https://github.com/ilsun/loom
        `,
      },
    ],
  },
  {
    id: "arinova-agent-sdk",
    name: "Arinova Agent SDK",
    category: "Miscellaneous",
    sections: [
      {
        id: "arinova-agent-install",
        title: "Installation",
        content: `
# Installation

\`\`\`bash
pip install arinova-agent-sdk
\`\`\`

Example:

\`\`\`python
from arinova_agent import ArinovaAgent

agent = ArinovaAgent(server_url="https://chat.arinova.ai", bot_token="your-token")

@agent.on_task
async def handle(task):
    task.send_complete("Hello")

agent.run()
\`\`\`
        `,
      },
    ],
  },
];

// ------------------------------------------------------------------
// Fungsi untuk mendapatkan semua kategori unik
// ------------------------------------------------------------------
const allCategories = Array.from(
  new Set(sdkDocsData.map((sdk) => sdk.category)),
).sort();

export default function SDKDocs() {
  const [selectedSdk, setSelectedSdk] = useState(sdkDocsData[0]); // default Supabase
  const [selectedSection, setSelectedSection] = useState(
    selectedSdk.sections[0],
  );
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Filter SDK berdasarkan kategori dan search
  const filteredSdks = sdkDocsData.filter((sdk) => {
    const matchesCategory =
      selectedCategory === "All" || sdk.category === selectedCategory;
    const matchesSearch = sdk.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Jika SDK yang dipilih tidak ada dalam filteredSdks, pilih yang pertama
  if (
    !filteredSdks.find((sdk) => sdk.id === selectedSdk.id) &&
    filteredSdks.length > 0
  ) {
    setSelectedSdk(filteredSdks[0]);
    setSelectedSection(filteredSdks[0].sections[0]);
  }

  const handleSdkClick = (sdk: (typeof sdkDocsData)[0]) => {
    setSelectedSdk(sdk);
    setSelectedSection(sdk.sections[0]);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSearch(""); // optional: reset search when changing category
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          SDK Documentation
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Detailed guides and API references for the SDKs we support.
        </p>
      </div>

      {/* Category buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryClick("All")}
          className={`px-3 py-1 rounded-full text-sm font-medium transition ${
            selectedCategory === "All"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          All
        </button>
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search and layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar kiri */}
        <div className="lg:w-64 space-y-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search SDK..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Daftar SDK (hanya filtered) */}
          <Card className="p-2 max-h-[70vh] overflow-y-auto">
            {filteredSdks.length === 0 ? (
              <p className="text-center py-4 text-gray-500">No SDKs found.</p>
            ) : (
              filteredSdks.map((sdk) => (
                <button
                  key={sdk.id}
                  onClick={() => handleSdkClick(sdk)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                    selectedSdk.id === sdk.id
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {sdk.name}
                </button>
              ))
            )}
          </Card>

          {/* Sub-bagian (hanya tampil jika SDK dipilih) */}
          {selectedSdk && (
            <Card className="p-2">
              {selectedSdk.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                    selectedSection.id === section.id
                      ? "bg-gray-200 dark:bg-gray-700 font-medium"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </Card>
          )}
        </div>

        {/* Konten utama */}
        <div className="flex-1">
          {selectedSection && (
            <Card>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <div className="relative">
                          <pre
                            className={`language-${match[1]} bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm`}
                          >
                            <code className={className} {...props}>
                              {children}
                            </code>
                          </pre>
                        </div>
                      ) : (
                        <code
                          className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {selectedSection.content}
                </ReactMarkdown>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
