"use client"
import { useState, useEffect } from "react";

interface Question {
  question: string
  answers: string[]
  correct: string
  explanation: string
}

export default function Quiz(){

const [question, setQuestion] = useState<Question | null>(null)

const [selected, setSelected] = useState<string | null>(null)

const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

const [loading, setLoading] = useState(true)

// how many questions answered starts at 0
const [questionCount, setQuestionCount]
 =useState(0)

// how many correct starts 0
const [score, setScore] = useState()

/// is quiz over starts as false
const [isFinished, setISFinished] = useState(false)

/// runs once when component mounts or pade loads
useEffect(() => {
  // call fetchQueion to get AI question immediately
  fetchQuestion()
  /// [] run oce on mount never again
}, [])

// async because we use await inside
async function fetchQuestion() {
  /// show loading spinner while fetching
  setLoading(true)

  ///Clear previous answer selection
  setSelected(null)

  //clear previous correct/wrong result
  setIsCorrect(null)

// call our API route await waits for response
const res = await fetch('/api/generate-question')

// convert response to JS object await waits for this too
const data = await res.json()

// save the question to state so component can display it 
setQuestion(data)

/// hide loading show the question
setLoading(false)
}

// runs when user clicks an answer button
// answer string = TypeScript says this must be a string
function handleAnswer(answer: string){
  /// save which answer the user clicked
  setSelected(answer)

  // check if clicked answer matches the correct answer 

  setIsCorrect(answer === question?.correct)


}


  //if loading is true, show this instead of the quiz 

if (loading) return <p>Gernerating question...</p>

return (
  <main>
    <h1>DMV Practice Quiz</h1>
    {/*display AI generated question  */}
    <p>{question?.question}</p>
  
  {/* display each answer as a  button */}
  {question?.answers.map((answer) => (
     <button
   key={answer}
   onClick={() => handleAnswer(answer) }
   style={{
    display: "block",
    margin: "8px 0",
    padding: "8px 16px",
    background: selected === null ? "purple"
      : answer === question.correct ? "green"
      : selected === answer ? "red"
      : "orange",
      color : "white",
      cursor: selected ? "default" : "pointer"
   }}
   disabled={selected !== null}
   >{answer}</button>
  ))}
  {/* show result after answering */}
  {selected && (
    <div>
     {/* show correct or wrong message */}
     <p>{isCorrect ? "✅ Correct!" : "❌ Wrong!"}</p>
     <p>{question?.explanation}</p>
      {/* fetch a brand new question */}
      <button onClick={fetchQuestion}>Next Question</button>
    </div>
  )}
 </main>
  )
}
