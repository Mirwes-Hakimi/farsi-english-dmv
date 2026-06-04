



export default function Home() {
 
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero section */}
            <section className="flex flex-col items-center justify-center text-center px-4 py-24 ">
              <div className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium mb-6" >
                AI-Powered • Free • California DMV
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 max-w-2xl leading-tight ">
                 Pass Your Learner Permit DMV Test on the <span className="text-blue-600">First Try</span>

              </h1>
              <p className="text-xl text-gray-500 mb-10 max-w-xl">
                Practice with AI-generated questions that cover every category on the California DMV written test. No two quizzes are ever the same.
              </p>

              <a href="/quiz"
                className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold
                      text-lg hover:bg-blue-700 transition-colors shadow-lg">
                Start Free Quiz
              </a>

              <p className="text-gray-400 text-sm mt-4"> No signup required • 10 questions • Instant results</p>
            </section>
            {/* Features Section */}
            <section className="bg-white py-20 px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                    Why Use This App? 
                </h2>
                 <p className="text-center text-gray-500 mb-12">Everything you need to pass your DMV written test</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 rounded-xl border border-gray-100 shadow-sm">
                  <div className="text-4xl mb-4">🤖</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">AI Generated</h3>
                 <p className="text-gray-500">Every question is uniquely created by AI, no two quizzes are ever the same</p>
                </div> 

                      <div className="text-center p-6 rounded-xl border border-gray-100 shadow-sm">
                        
                      <div className="text-4xl mb-4">📊</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2"> Track Progress</h3>
                      <p className="text-gray-500">See your score after every quiz and know exactly if you are ready for the real test</p>  
                   </div>

                  <div className="text-center p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-4xl mb-4">🌍</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Multilingual</h3>
                    <p className="text-gray-500">Available in English and Farsi, serving California community</p>
                  </div>  
                  </div>
         </div>
                    </section>
                    {/* HOW IT WORKS SECTION */}
<section className="bg-gray-50 py-20 px-4">
  <div className="max-w-4xl mx-auto">
    
    <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
      How It Works
    </h2>
    <p className="text-center text-gray-500 mb-12">
      Ready to practice in under 30 seconds
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      <div className="text-center">
        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Click Start</h3>
        <p className="text-gray-500">No signup, no account needed. Just click and start practicing instantly.</p>
      </div>

      <div className="text-center">
        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Answer Questions</h3>
        <p className="text-gray-500">AI generates 10 unique DMV questions. Get instant feedback on every answer.</p>
      </div>

      <div className="text-center">
        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">See Your Score</h3>
        <p className="text-gray-500">Get your results instantly. Pass or fail — then practice again with new questions.</p>
      </div>

    </div>

  </div>
</section>

{/* FOOTER */}
<footer className="bg-white border-t border-gray-200 py-8 px-4 text-center">
  <p className="text-gray-500 text-sm">
    Built by <span className="font-semibold text-gray-700">Mirwes Hakimi</span> • 
    <a href="https://github.com/Mirwes-Hakimi" className="text-blue-600 hover:underline ml-1" target="_blank">GitHub</a>
  </p>
  <p className="text-gray-400 text-xs mt-1">
    AI-Powered California DMV Practice Quiz
  </p>
</footer>
        </main>
    )
}