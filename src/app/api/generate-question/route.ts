import { NextResponse } from "next/server"
import OpenAI from "openai"

// initialize OpenAI with your API key from .env.local
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: Request) {
  /// get previously asked questions from frontend
  // get language along with asked questions
  const { askedQuestions, lang } = await request.json()


// map language code to full name for the prompt
const languageMap: Record<string, string> = {
  en: 'English',
  fa: 'Farsi (Dari)',
  ps: 'Pashto'
}

const language = languageMap[lang] || 'English'

  const avoidList = askedQuestions.length > 0 
    ? `Don NOT repeat these questions: ${askedQuestions.join(' | ')}`
    : '';

  // ask OpenAI to generate a DMV question
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 1.2,
    messages: [
      {
        role: "system",
        content: "You are a California DMV test expert. Generate unique practice questions."
      },
      {
        role: "user",
        content: `Generate 1 random multiple choice California DMV practice question.
${avoidList}
Generate the question and all answers in ${language}.
Vary between: road signs, speed limits, right of way, parking rules, 
traffic lights, DUI laws, freeway driving, weather conditions.

Return ONLY a JSON object in this exact format:
{
  "question": "the question here in ${language}",
  "answers": ["option1", "option2", "option3", "option4"],
  "correct": "the correct answer here in ${language}",
  "explanation": "why this is correct in ${language}"
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