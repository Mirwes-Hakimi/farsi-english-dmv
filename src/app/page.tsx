
export default function Home() {

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ===== Hero section ===== */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-24">

        {/* Top badge. Updated from "AI-Powered" since questions now come from a verified handbook-based bank. */}
        <div className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium mb-6">
          Verified • Free • California DMV
        </div>

        {/* Main headline */}
        <h1 className="text-5xl font-bold text-gray-900 mb-6 max-w-2xl leading-tight">
          Pass Your Permit DMV Test on the <span className="text-blue-600">First Try</span>
        </h1>

        {/* Subtext. Updated to reflect the real value: questions verified against the official handbook, in English and Farsi. */}
        <p className="text-xl text-gray-500 mb-10 max-w-xl">
          Practice with questions verified against the official California Driver&apos;s Handbook, in English and Farsi. Every quiz pulls from a fresh set.
        </p>

        {/* ===== Language selector ===== */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-500 font-medium">Select your language:</p>

          {/* Two buttons now (Pashto removed, since the question bank is English + Farsi only) */}
          <div className="flex flex-col sm:flex-row gap-3">

            {/* English start button */}
            <a href="/quiz?lang=en"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg text-center">
              Start in English
            </a>

            {/* Farsi / Dari start button */}
            <a href="/quiz?lang=fa"
              className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors shadow-lg text-center">
              شروع به فارسی / دری
            </a>

          </div>

          {/* Small reassurance line under the buttons */}
          <p className="text-gray-400 text-sm mt-2">
            No signup required • 46 questions • Instant results
          </p>
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">

          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Why Use This App?
          </h2>
          <p className="text-center text-gray-500 mb-12">Everything you need to pass your DMV written test</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Feature 1. Updated from "AI Generated" to the verified-handbook message, which is now accurate and a stronger selling point. */}
            <div className="text-center p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Verified Questions</h3>
              <p className="text-gray-500">Every question is grounded in the official California Driver&apos;s Handbook, so you study the real rules.</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Track Progress</h3>
              <p className="text-gray-500">See your score after every quiz and know exactly if you are ready for the real test.</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Bilingual</h3>
              <p className="text-gray-500">Every question shown in English and Farsi, serving the California community.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ===== How It Works Section ===== */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">

          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Ready to practice in under 30 seconds
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Step 1 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Click Start</h3>
              <p className="text-gray-500">No signup, no account needed. Just click and start practicing instantly.</p>
            </div>

            {/* Step 2. Updated wording: no longer "AI generates", now it's a fixed verified set. */}
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Answer Questions</h3>
              <p className="text-gray-500">Work through 46 DMV questions in English and Farsi. Get instant feedback on every answer.</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">See Your Score</h3>
              <p className="text-gray-500">Get your results instantly. Pass or fail, then practice again with a fresh set.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-white border-t border-gray-200 py-8 px-4 text-center">
        <p className="text-gray-500 text-sm">
          Built by <span className="font-semibold text-gray-700">KBL Web Solutions</span> •
          <a href="https://www.kblwebsolutions.com/" className="text-blue-600 hover:underline ml-1" target="_blank">KBL Web Solutions</a>
        </p>
        {/* Attribution for handbook content, required under the handbook's CC BY-NC license. */}
        <p className="text-gray-400 text-xs mt-1">
          Questions based on the California Driver&apos;s Handbook (California DMV), CC BY-NC 4.0.
        </p>

        {/* Legal disclaimer: clarifies this is an independent practice tool, not a government service */}
<p className="text-gray-400 text-xs mt-3 max-w-xl mx-auto">
  This is an independent practice tool and is not affiliated with, endorsed by, or operated by the California Department of Motor Vehicles or any government agency. Practice questions are for study purposes only. Always refer to the official{" "}
  <a href="https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/"
    className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
    California Driver&apos;s Handbook
  </a>{" "}
  for current rules. Passing this practice quiz does not guarantee passing the official DMV test.
</p>
      </footer>

    </main>
  )
}