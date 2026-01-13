import Link from "next/link";
import { getAllLessons } from "@/lib/lessons";
import Navigation from "./components/Navigation";

export default function Home() {
  const lessons = getAllLessons();
  const modules = [...new Set(lessons.map(l => l.module))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Learn Blockchain</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Master Bitcoin & Blockchain in 30 Days</p>
        </div>
      </header>

      {/* Navigation */}
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Welcome to Your Blockchain Journey!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This course is designed for complete beginners with zero technical background.
            Learn the fundamentals of blockchain and Bitcoin through simple, everyday language.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">30</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Days of Lessons</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">5-10</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Minutes per Day</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">0</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Technical Experience Needed</div>
            </div>
          </div>
        </div>

        {/* Lessons by Module */}
        <div className="space-y-8">
          {modules.map((module) => {
            const moduleLessons = lessons.filter(l => l.module === module);
            return (
              <div key={module} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">{module}</h3>
                <div className="space-y-2">
                  {moduleLessons.map((lesson) => (
                    <Link
                      key={lesson.slug}
                      href={`/lessons/${lesson.slug}`}
                      className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium">
                              {lesson.day}
                            </span>
                            <div>
                              <h4 className="font-medium text-gray-800 dark:text-gray-200">{lesson.title}</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{lesson.duration}</p>
                            </div>
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M9 5l7 7-7 7"></path>
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/glossary" className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">Glossary</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Quick reference for all blockchain and Bitcoin terms
            </p>
          </Link>
          <Link href="/faq" className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">FAQ</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Answers to common questions about Bitcoin and blockchain
            </p>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-gray-800 dark:bg-gray-950 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm">
            Learn Blockchain - Your journey to understanding Bitcoin and blockchain technology
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Educational purposes only. Not financial advice.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-600 mt-4">
            Made with vibe-coding by Jason Lee
          </p>
        </div>
      </footer>
    </div>
  );
}
