"use client";

import Link from "next/link";
import { useState } from "react";
import faqQuestions from "@/content/faq/questions.json";
import Navigation from "../components/Navigation";

interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filteredQuestions = faqQuestions.filter((item: FAQItem) =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group by category
  const groupedFAQs = filteredQuestions.reduce((acc: { [key: string]: FAQItem[] }, item: FAQItem) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const categories = Object.keys(groupedFAQs);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">Frequently Asked Questions</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Common questions about Bitcoin and blockchain</p>
        </div>
      </header>

      {/* Navigation */}
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Search Box */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search Questions
          </label>
          <input
            type="text"
            id="search"
            placeholder="Type to search questions and answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400"
          />
          {searchQuery && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Found {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* FAQ List */}
        {filteredQuestions.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">No questions found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4 pb-2 border-b dark:border-gray-700">
                  {category}
                </h2>
                <div className="space-y-3">
                  {groupedFAQs[category].map((item: FAQItem, index: number) => {
                    const globalIndex = faqQuestions.indexOf(item);
                    const isExpanded = expandedIndex === globalIndex;

                    return (
                      <div
                        key={globalIndex}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleExpand(globalIndex)}
                          className="w-full px-4 py-4 text-left bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center justify-between"
                        >
                          <span className="font-medium text-gray-800 dark:text-gray-200 pr-4">
                            {item.question}
                          </span>
                          <svg
                            className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform flex-shrink-0 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </button>
                        {isExpanded && (
                          <div className="px-4 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            This is an educational resource designed to help beginners understand blockchain and Bitcoin.
            For investment advice or specific technical support, please consult with qualified professionals.
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            Back to Home
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
        </div>
      </footer>
    </div>
  );
}
