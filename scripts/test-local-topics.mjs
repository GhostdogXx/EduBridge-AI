import { readFileSync } from "fs";

for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2].trim();
}

if (!process.env.OPENAI_API_KEY) {
  console.log("FAIL: Save .env.local with your OPENAI_API_KEY first (Ctrl+S).");
  process.exit(1);
}

const body = {
  grade: 4,
  subject: "mathematics",
  language: "filipino",
  keyword: "Oras",
  lowDataMode: false,
};

const res = await fetch("http://localhost:3000/api/topics", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

const text = await res.text();
console.log("status:", res.status);
console.log("preview:", text.slice(0, 300));
