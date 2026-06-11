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
    outOf: 'out of 46',
    pass: '✅ Pass! You are ready for the DMV test!',
    fail: '❌ Fail. Keep practicing!',
    tryAgain: 'Try Again',
    questionOf: 'of 46',
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
    outOf: 'از ۴۶',
    pass: '✅ قبول شدید! آماده امتحان DMV هستید!',
    fail: '❌ قبول نشدید. بیشتر تمرین کنید!',
    tryAgain: 'دوباره امتحان کنید',
    
  questionOf: `از ۴۶ :سوال`,  


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
    outOf: 'له ۴۶ څخه',
    pass: '✅ پاس شوئ! د DMV ازموینې لپاره چمتو یاست!',
    fail: '❌ ناکام شوئ. نور تمرین وکړئ!',
    tryAgain: 'بیا هڅه وکړئ',
    questionOf: 'له ۴۶ څخه',
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
 

 

  
  // increment score if correct
  if(answer === question?.correct)
    setScore(prev => prev + 1)

  if (questionCount === 46 ) setIsFinished(true)
    
  

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
  <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full overflow-hidden">
      
      {/* Blue header */}
      <div className="bg-blue-600 px-6 py-5">
        <p className="text-blue-200 text-sm font-medium">Session Complete</p>
        <h1 className="text-white text-2xl font-bold">{t.quizComplete}</h1>
      </div>

      {/* Score circle */}
      <div className="flex flex-col items-center py-8">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="10"/>
            {/* Progress circle */}
            <circle 
              cx="60" cy="60" r="50" 
              fill="none" 
              stroke={score >= 38 ? "#22c55e" : "#ef4444"} 
              strokeWidth="10"
              strokeDasharray={`${(score / 46) * 314} 314`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${score >= 38 ? 'text-green-600' : 'text-red-500'}`}>
              {score}
            </span>
            <span className="text-gray-400 text-xs">of 46</span>
          </div>
        </div>

        {/* Pass/Fail badge */}
        <div className={`mt-4 px-6 py-1 rounded-full border-2 font-bold text-sm
          ${score >= 38
            ? 'border-green-500 text-green-600' 
            : 'border-red-500 text-red-500'}`}>
          {score >= 38 ? 'PASSED' : 'FAILED'}
        </div>
      </div>

      {/* Score breakdown */}
      <div className="mx-6 mb-6 border border-gray-100 rounded-xl overflow-hidden">
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
          <span className="text-gray-600">Correct</span>
          <span className="text-green-600 font-bold">{score}</span>
        </div>
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
          <span className="text-gray-600">Incorrect</span>
          <span className="text-red-500 font-bold">{questionCount - score}</span>
        </div>
        <div className="flex justify-between items-center px-4 py-3">
          <span className="text-gray-600">DMV Min.</span>
          <span className="text-blue-600 font-bold">38 / 46</span>
        </div>
      </div>

      {/* Button */}
      <div className="px-6 pb-6">
        <button
          onClick={() => {
            setScore(0)
            setQuestionCount(0)
            setIsFinished(false)
            setSelected(null)
            setIsCorrect(null)
            fetchQuestion()
          }}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
        >
          {t.tryAgain}
        </button>
      </div>

    </div>
  </main>
)


return (
  <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full">

     <div className="flex justify-between items-center mb-6">
       <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>

    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
  {lang === 'en' 
    ? `${questionCount} of 46`
    : `${t.questionOf} ${questionCount}`
  }
</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">

        <div className="bg-blue-600 h-2 rounded-full transition-all"
        style={{ width:  `${(questionCount / 46) * 100}%`}}>


        </div>
      </div>
    {/*display AI generated question  */}
    <p className="text-lg font-medium text-gray-900 mb-6">{question?.question}</p>
  
  <div className="flex flex-col gap-3 w-full">
  {/* display each answer as a  button */}
  {question?.answers.map((answer, index) => (
     <button
   key={answer}
   onClick={() => handleAnswer(answer) }

   disabled={selected !== null}
   className={`w-full p-3 rounded-xl text-left font-medium transition-colors border shadow-sm flex items-center gap-3
    ${selected === null ? 'border-gray-100 hover:border-blue-300 hover:bg-blue-50'
      : answer ===question.correct
      ? 'border-green-500 bg-green-50 text-green-700'
      : selected === answer
      ? 'border-red-500 bg-red-50 text-red-700'
      : 'border-gray-200 text-gray-400'
    }`}

   
   >
    {/* Letter Label */}
    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
     ${selected === null
     ? 'bg-gray-100 text-gray-600'
     : answer === question.correct
     ?'bg-green-500 text-white'
     : selected === answer
     ? 'bg-red-500 text-white'
     :'bg-gray-100 text-gray-400'
     }`}>
      {['A', 'B', 'C', 'D'][index]}
     </span>

   <span> {answer}</span>
  </button>
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




