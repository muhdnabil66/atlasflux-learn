// scripts/generate-challenges.js
require("dotenv").config({ path: ".env.local" });
const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const TOTAL_QUESTIONS = 500;

const topics = [
  "Internet",
  "Networking",
  "Web Development",
  "Programming",
  "Cybersecurity",
  "Digital Facts",
  "History of Computing",
  "Data Structures",
  "Algorithms",
  "Operating Systems",
];

async function generateQuestion() {
  const type = Math.random() < 0.5 ? "multiple_choice" : "true_false";
  const topic = topics[Math.floor(Math.random() * topics.length)];
  const difficulty = ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)];

  let prompt;
  if (type === "multiple_choice") {
    prompt = `Generate a multiple choice question about ${topic} (difficulty: ${difficulty}). 
Return ONLY a valid JSON object with keys: question, options (an object with A, B, C, D), correct_answer (A, B, C, or D). 
Example: {"question": "What is the capital of France?", "options": {"A": "London", "B": "Paris", "C": "Berlin", "D": "Madrid"}, "correct_answer": "B"}`;
  } else {
    prompt = `Generate a true/false question about ${topic} (difficulty: ${difficulty}). 
Return ONLY a valid JSON object with keys: question, correct_answer (true or false). 
Example: {"question": "The internet was invented in the 1960s.", "correct_answer": "true"}`;
  }

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-4o", // or use a free model like 'meta-llama/llama-3-8b-instruct:free'
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      },
    );

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Extract JSON from the response (it might be wrapped in markdown)
    const jsonMatch = content.match(/\{.*\}/s);
    if (!jsonMatch) {
      console.log("Failed to parse JSON:", content);
      return null;
    }
    const q = JSON.parse(jsonMatch[0]);

    return {
      question: q.question,
      type,
      options: q.options ? JSON.stringify(q.options) : null,
      correct_answer: q.correct_answer.toString().toLowerCase(),
      difficulty,
      topic,
    };
  } catch (err) {
    console.error("Error generating question:", err);
    return null;
  }
}

async function seed() {
  console.log(`Generating ${TOTAL_QUESTIONS} questions...`);
  for (let i = 0; i < TOTAL_QUESTIONS; i++) {
    const q = await generateQuestion();
    if (q) {
      await sql`
        INSERT INTO challenges (question, type, options, correct_answer, difficulty, topic)
        VALUES (${q.question}, ${q.type}, ${q.options}, ${q.correct_answer}, ${q.difficulty}, ${q.topic})
      `;
      console.log(`Inserted question ${i + 1}/${TOTAL_QUESTIONS}`);
    } else {
      console.log(`Skipped question ${i + 1}`);
    }
    // Wait a bit to avoid rate limits
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  console.log("Done!");
}

seed().catch(console.error);
