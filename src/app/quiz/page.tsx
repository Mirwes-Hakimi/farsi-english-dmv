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
const [score, setScore] = useState(0)

/// is quiz over starts as false
const [isFinished, setIsFinished] = useState(false)

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

  setQuestionCount(prev => prev + 1)

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
 

  /// checks against 10 directly since count updates in fetchQuestion
  if (questionCount === 9)
      setIsFinished(true)

  
  // increment score if correct
  if(answer === question?.correct)
    setScore(prev => prev + 1)

  if (questionCount + 1 === 10 )
    setIsFinished(true)
    
  

}


  //if loading is true, show this instead of the quiz 

if (loading) return <p>Gernerating question...</p>

// show results screen when quiz is finished
if (isFinished) return (
  <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
      <h1 className="text-3xl font-bold mb-4">Quiz Complete!</h1>
      <p className="text-xl mb-2">You scored <span className="font-bold text-blue-600">{score} out of 10</span></p>
      <p className={`text-lg font-semibold mb-6 ${score >= 7 ? 'text-green-600' : 'text-red-600'}`}>
        {score >= 7 ? "✅ Pass! You are ready for the DMV test!" : "❌ Fail. Keep practicing!"}
      </p>
      <button 
        onClick={() => {
          setScore(0)
          setQuestionCount(0)
          setIsFinished(false)
          setSelected(null)
          setIsCorrect(null)
          fetchQuestion()
        }}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full"
      >
        Try Again
      </button>
    </div>
  </main>
)
return (
  <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">

     <div className="flex justify-between items-center mb-6">
       <h1 className="text-2xl font-bold text-gray-800">DMV Practice Quiz</h1>

    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Question {questionCount} of 10</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">

        <div className="bg-blue-600 h-2 rounded-full transition-all"
        style={{ width:  `${(questionCount / 10) * 100}%`}}>


        </div>
      </div>
    {/*display AI generated question  */}
    <p className="text-lg font-medium text-gray-900 mb-6">{question?.question}</p>
  
  <div className="flex flex-col gap-3">
  {/* display each answer as a  button */}
  {question?.answers.map((answer) => (
     <button
   key={answer}
   onClick={() => handleAnswer(answer) }

   disabled={selected !== null}
   className={`p-4 rounded-lg text-left font-medium transition-colors border-2
    ${selected === null ? 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
      : answer ===question.correct
      ? 'border-green-500 bg-green-50 text-green-700'
      : selected === answer
      ? 'border-red-500 bg-red-50 text-red-700'
      : 'border-gray-200 text-gray-400'
    }`}
   
   >{answer}</button>
  ))}
  {/* show result after answering */}
  {selected && (
    <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
     {/* show correct or wrong message */}
     <p className="font-bold text-lg mb-2">{isCorrect ? "✅ Correct!" : "❌ Wrong!"}</p>
     <p className="text-gray-600 mb-4">{question?.explanation}</p>
      {/* fetch a brand new question */}
      <button onClick={fetchQuestion}
      className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Next Question</button>
    </div>
    
  )}
  </div>
    </div>
 </main>
  )
}
