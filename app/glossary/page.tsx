"use client";

import Link from "next/link";
import { useState } from "react";
import glossaryTerms from "@/content/glossary/terms.json";
import Navigation from "../components/Navigation";

interface GlossaryTerm {
  term: string;
  definition: string;
  example: string;
}

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTerms = glossaryTerms.filter((term: GlossaryTerm) =>
    term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group terms by first letter
  const groupedTerms = filteredTerms.reduce((acc: { [key: string]: GlossaryTerm[] }, term: GlossaryTerm) => {
    const firstLetter = term.term[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(term);
    return acc;
  }, {});

  const sortedLetters = Object.keys(groupedTerms).sort();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">Glossary</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Quick reference for blockchain and Bitcoin terms</p>
        </div>
      </header>

      {/* Navigation */}
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Search Box */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search Terms
          </label>
          <input
            type="text"
            id="search"
            placeholder="Type to search terms or definitions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400"
          />
          {searchQuery && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Found {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Terms List */}
        {filteredTerms.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">No terms found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {sortedLetters.map((letter) => (
              <div key={letter} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4 pb-2 border-b dark:border-gray-700">
                  {letter}
                </h2>
                <div className="space-y-6">
                  {groupedTerms[letter].map((term: GlossaryTerm, index: number) => (
                    <div key={index} className="border-l-4 border-blue-200 dark:border-blue-700 pl-4">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                        {term.term}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                        {term.definition}
                      </p>
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          <span className="font-medium text-blue-600 dark:text-blue-400">Example:</span>{" "}
                          {term.example}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

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
