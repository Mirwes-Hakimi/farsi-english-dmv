"use client"

import { useState, useEffect } from "react"

// define the shape of a question from our API
interface Question {
  question: string
  answers: string[]
  correct: string
  explanation: string
}

export default function Quiz() {
  // store the AI generated question
  const [question, setQuestion] = useState<Question | null>(null)
  
  // track which answer user selected
  const [selected, setSelected] = useState<string | null>(null)
  
  // track if answer was correct
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  
  // show loading while AI generates question
  const [loading, setLoading] = useState(true)

  // fetch a question when component mounts
  useEffect(() => {
    fetchQuestion()
  }, [])

  // function to fetch AI question from our API
  async function fetchQuestion() {
    // reset everything for new question
    setLoading(true)
    setSelected(null)
    setIsCorrect(null)

    // call our API route
    const res = await fetch('/api/generate-question')
    const data = await res.json()
    
    setQuestion(data)
    setLoading(false)
  }

  // handle when user clicks an answer
  function handleAnswer(answer: string) {
    setSelected(answer)
    setIsCorrect(answer === question?.correct)
  }

  // show loading state
  if (loading) return <p>Generating question...</p>

  return (
    <main>
      <h1>DMV Practice Quiz</h1>

      {/* display AI generated question */}
      <p>{question?.question}</p>

      {/* display each answer as a button */}
      {question?.answers.map((answer) => (
        <button
          key={answer}
          onClick={() => handleAnswer(answer)}
          disabled={selected !== null}
          style={{
            display: "block",
            margin: "8px 0",
            padding: "8px 16px",
            background: selected === null ? "gray"
              : answer === question.correct ? "green"
              : selected === answer ? "red"
              : "gray",
            color: "white",
            cursor: selected ? "default" : "pointer"
          }}
        >
          {answer}
        </button>
      ))}

      {/* show result after answering */}
      {selected && (
        <div>
          <p>{isCorrect ? "✅ Correct!" : "❌ Wrong!"}</p>
          <p>{question?.explanation}</p>
          <button onClick={fetchQuestion}>Next Question</button>
        </div>
      )}
    </main>
  )
}