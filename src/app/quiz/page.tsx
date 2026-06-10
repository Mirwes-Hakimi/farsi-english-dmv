"use client"
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface Question {
  question: string
  answers: string[]
  correct: string
  explanation: string
}


function QuizInner(){

// read the lang parameter from the URL
const searchParams = useSearchParams()
const lang = searchParams.get('lang') || 'en'

// UI translations for each language
const translations = {
  en: {
    title: 'DMV Practice Quiz',
    generating: 'Generating Question...',
    aiPreparing: 'AI is preparing your next question',
    correct: '✅ Correct!',
    wrong: '❌ Wrong!',
    nextQuestion: 'Next Question →',
    quizComplete: 'Quiz Complete!',
    youScored: 'You scored',
    outOf: 'out of 10',
    pass: '✅ Pass! You are ready for the DMV test!',
    fail: '❌ Fail. Keep practicing!',
    tryAgain: 'Try Again',
    questionOf: 'of 10',
  },
  fa: {
    title: 'آزمون تمرینی DMV',
    generating: 'در حال آماده‌سازی سوال...',
    aiPreparing: 'هوش مصنوعی سوال بعدی شما را آماده می‌کند',
    correct: '✅ درست!',
    wrong: '❌ اشتباه!',
    nextQuestion: 'سوال بعدی ←',
    quizComplete: 'آزمون تمام شد!',
    youScored: 'امتیاز شما',
    outOf: 'از ۱۰',
    pass: '✅ قبول شدید! آماده امتحان DMV هستید!',
    fail: '❌ قبول نشدید. بیشتر تمرین کنید!',
    tryAgain: 'دوباره امتحان کنید',
    
  questionOf: `از ۱۰ :سوال`,  


  },
  ps: {
    title: ' DMV د جواز ازموینه',
    generating: 'پوښتنه چمتو کیږي...',
    aiPreparing: 'AI ستاسو بله پوښتنه چمتو کوي',
    correct: '✅ سمه ده!',
    wrong: '❌ غلطه ده!',
    nextQuestion: 'بله پوښتنه ←',
    quizComplete: 'ازموینه بشپړه شوه!',
    youScored: 'ستاسو نمره',
    outOf: 'له ۱۰ څخه',
    pass: '✅ پاس شوئ! د DMV ازموینې لپاره چمتو یاست!',
    fail: '❌ ناکام شوئ. نور تمرین وکړئ!',
    tryAgain: 'بیا هڅه وکړئ',
    questionOf: 'له ۱۰ څخه',
  }
}

// get translations for current language
const t = translations[lang as keyof typeof translations] || translations.en


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

const [askedQuestions, setAskedQuestions] = useState<string[]>([])


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

  try {
// call our API route await waits for response
const res = await fetch('/api/generate-question', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({ askedQuestions, lang })
})

/// check if response is ok before parsing
if (!res.ok) {
  throw new Error(`API error: ${res.status}`)
}

// convert response to JS object await waits for this too
const data = await res.json()

/// add new question to asked list
setAskedQuestions(prev => [...prev, data.question])

// save the question to state so component can display it 
setQuestion(data)

  } catch (error){
    console.error('Failed to fetch question:', error)
    // show error to user
    alert('Failed to load question. Please try again.')
    // undo count increment
    setQuestionCount(prev => prev - 1)
  } finally {
    /// always runs hide loading whether success or fail
  

/// hide loading show the question
setLoading(false)
 }
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


// Loading screen
if (loading) return (
  <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
    <div className="text-center">
      <div className="text-6xl mb-6">🚗</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.generating}</h2>
      <p className="text-gray-500">{t.aiPreparing}</p>
    </div>
  </main>
)

// Results screen
if (isFinished) return (
  <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
      <h1 className="text-3xl font-bold mb-4">{t.quizComplete}</h1>
      <p className="text-xl mb-2">{t.youScored} <span className="font-bold text-blue-600">{score} {t.outOf}</span></p>
      <p className={`text-lg font-semibold mb-6 ${score >= 7 ? 'text-green-600' : 'text-red-600'}`}>
        {score >= 7 ? t.pass : t.fail}
      </p>
      <button onClick={() => {
        setScore(0)
        setQuestionCount(0)
        setIsFinished(false)
        setSelected(null)
        setIsCorrect(null)
        fetchQuestion()
      }}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full"
      >
        {t.tryAgain}
      </button>
    </div>
  </main>
)


return (
  <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">

     <div className="flex justify-between items-center mb-6">
       <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>

    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
  {lang === 'en' 
    ? `${questionCount} of 10`
    : `${t.questionOf} ${questionCount}`
  }
</span>
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
     <p className="font-bold text-lg mb-2">{isCorrect ? t.correct : t.wrong}</p>
     <p className="text-gray-600 mb-4">{question?.explanation}</p>
      {/* fetch a brand new question */}
      <button onClick={fetchQuestion}
      className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">{t.nextQuestion}</button>
    </div>
    
  )}
  </div>
    </div>
 </main>
  )
}

export default function Quiz() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">🚗</div>
          <h2 className="text-2xl font-bold text-gray-800">Loading...</h2>
        </div>
      </main>
    }>
      <QuizInner />
    </Suspense>
  )
}




