// scripts/generate-full-content.js
require("dotenv").config({ path: ".env.local" });
const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Expanded list of free models (as of early 2025)
const freeModels = [
  "meta-llama/llama-3.3-70b-instruct:free",
  "stepfun/step-3.5-flash:free",
  "google/gemma-3-27b-it:free",
  "microsoft/phi-4-mini:free", // lightweight but decent
  "nvidia/llama-3.1-nemotron-70b:free", // good for coding
  "cohere/command-r7b:free", // good for instruction following
  "mistralai/mistral-7b-instruct:free", // reliable
  "deepseek/deepseek-chat-v3:free", // strong for coding
  "qwen/qwen2.5-72b-instruct:free", // large, good quality
];

// If you have credits and want to use a top‑tier paid model, uncomment the line below
// const paidModel = "openai/gpt-4o";

const languages = [
  { id: 1, name: "JavaScript", tutorials: 24 },
  { id: 2, name: "Python", tutorials: 18 },
  { id: 3, name: "TypeScript", tutorials: 12 },
  { id: 4, name: "HTML/CSS", tutorials: 10 },
  { id: 5, name: "React", tutorials: 15 },
  { id: 6, name: "Node.js", tutorials: 9 },
];

async function generateWithAI(prompt) {
  try {
    // To use a fixed model (free or paid), replace with:
    // const selectedModel = "meta-llama/llama-3.3-70b-instruct:free";
    const selectedModel =
      freeModels[Math.floor(Math.random() * freeModels.length)];
    console.log(`   Using model: ${selectedModel}`);

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      },
    );

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      // Try to read error body for more info
      const errBody = await response.text();
      console.error("Error details:", errBody);
      return null;
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (err) {
    console.error("OpenRouter error:", err);
    return null;
  }
}

// ... rest of the script (generateTutorial, generateChallenge, generateProject, main) remains the same as the previous working version

async function generateTutorial(languageName, topic, order) {
  const prompt = `Create a short tutorial about "${topic}" in ${languageName}. 
The tutorial should contain:
- A brief introduction
- Explanations with code examples (use \`\`\` for code blocks)
- A small exercise at the end
Format the response in Markdown.`;
  const content = await generateWithAI(prompt);
  if (!content) return null;
  const firstLine = content.split("\n")[0].replace(/^#+\s*/, "");
  const title =
    firstLine.substring(0, 50) || `${languageName} Tutorial ${order}`;
  return { title, content, order };
}

async function generateChallenge(languageName, difficulty, order) {
  const prompt = `Create a coding challenge in ${languageName} with ${difficulty} difficulty. Include:
- Problem statement
- Input/Output format
- Example(s)
- Constraints
- Starter code (optional)
- Solution (at the end)
Format the response in Markdown.`;
  const content = await generateWithAI(prompt);
  if (!content) return null;
  const firstLine = content.split("\n")[0].replace(/^#+\s*/, "");
  const title =
    firstLine.substring(0, 50) || `${languageName} Challenge ${order}`;
  return { title, content, difficulty };
}

async function generateProject(languageName, level, order) {
  const prompt = `Create a project idea in ${languageName} for ${level} level. Include:
- Project title
- Description of what to build
- Required features
- Technologies to use
- Basic steps
Format the response in Markdown.`;
  const content = await generateWithAI(prompt);
  if (!content) return null;
  const firstLine = content.split("\n")[0].replace(/^#+\s*/, "");
  const title =
    firstLine.substring(0, 50) || `${languageName} Project ${order}`;
  return { title, content, level };
}

async function main() {
  // Clear old data (optional)
  // await sql`DELETE FROM tutorials WHERE language_id IN (1,2,3,4,5,6)`;
  // await sql`DELETE FROM challenges WHERE language_id IN (1,2,3,4,5,6)`;
  // await sql`DELETE FROM projects WHERE language_id IN (1,2,3,4,5,6)`;

  for (const lang of languages) {
    console.log(
      `\n=== Processing ${lang.name} (${lang.tutorials} tutorials) ===`,
    );

    const tutorialTopics = [
      "Introduction",
      "Variables",
      "Data Types",
      "Operators",
      "Control Flow",
      "Functions",
      "Arrays",
      "Objects",
      "Loops",
      "Strings",
      "Recursion",
      "Closures",
      "Classes",
      "Inheritance",
      "Modules",
      "Error Handling",
      "I/O",
      "Networking",
      "Databases",
      "Testing",
      "Optimization",
      "Security",
      "Tooling",
      "Best Practices",
    ];
    for (let i = 0; i < lang.tutorials; i++) {
      const topic = tutorialTopics[i % tutorialTopics.length];
      console.log(`  Generating tutorial ${i + 1}/${lang.tutorials}...`);
      const tut = await generateTutorial(lang.name, topic, i + 1);
      if (tut) {
        await sql`
          INSERT INTO tutorials (language_id, title, content, "order")
          VALUES (${lang.id}, ${tut.title}, ${tut.content}, ${tut.order})
        `;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    const difficulties = ["Easy", "Medium", "Hard"];
    for (let i = 0; i < 5; i++) {
      const diff = difficulties[i % 3];
      console.log(`  Generating challenge ${i + 1}/5...`);
      const chal = await generateChallenge(lang.name, diff, i + 1);
      if (chal) {
        await sql`
          INSERT INTO challenges (language_id, title, content, difficulty, type, question)
          VALUES (
            ${lang.id}, 
            ${chal.title}, 
            ${chal.content}, 
            ${chal.difficulty}, 
            'coding', 
            ${chal.content}
          )
        `;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    const levels = ["Beginner", "Intermediate", "Advanced"];
    for (let i = 0; i < 3; i++) {
      const level = levels[i];
      console.log(`  Generating project ${i + 1}/3...`);
      const proj = await generateProject(lang.name, level, i + 1);
      if (proj) {
        await sql`
          INSERT INTO projects (language_id, title, content, level)
          VALUES (${lang.id}, ${proj.title}, ${proj.content}, ${proj.level})
        `;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  console.log("\nAll content generated successfully!");
}

main().catch(console.error);
