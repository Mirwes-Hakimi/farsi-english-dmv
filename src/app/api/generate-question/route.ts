import { NextResponse } from "next/server"
import OpenAI from "openai"

// initialize OpenAI with your API key from .env.local
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function GET() {
  // ask OpenAI to generate a DMV question
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini", // fast and cheap model
    messages: [
      {
        role: "system",
        content: "You are a California DMV test expert. Generate practice questions."
      },
      {
        role: "user",
        content: `Generate 1 multiple choice DMV practice question.
        Return ONLY a JSON object in this exact format:
        {
          "question": "the question here",
          "answers": ["option1", "option2", "option3", "option4"],
          "correct": "the correct answer here",
          "explanation": "why this is correct"
        }`
      }
    ]
  })

  // extract the text response from OpenAI
  const content = completion.choices[0].message.content

  // parse the JSON string into a JavaScript object
  const question = JSON.parse(content!)

  return NextResponse.json(question)
}