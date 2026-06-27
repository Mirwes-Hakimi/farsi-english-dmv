"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  // tracks if mobile menu is open or closed
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        
        {/* Logo */}


<Link href="/" className="flex items-center gap-2">
  <Image src="/DMVpracticeTest.png" alt="DMV Quiz logo" 
  width={48} 
  height={48} 
  priority
  className="h-12 w-12 rounded-full object-cover " /> 
  <span className="font-bold text-gray-800 text-lg"> DMV Permit Quiz</span>
</Link>

        {/* Desktop links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link href="/quiz" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Start Quiz
          </Link>
        </div>

        {/* Hamburger button — visible only on mobile */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* Mobile menu — shows when isOpen is true */}
      {isOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 px-4 pb-4">
          <Link href="/" className="text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link href="/quiz" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-center" onClick={() => setIsOpen(false)}>
            Start Quiz
          </Link>
        </div>
      )}
    </nav>
  )
}