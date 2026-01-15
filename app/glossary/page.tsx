"use client";

import Link from "next/link";
import { useState } from "react";
import glossaryTerms from "@/content/glossary/terms.json";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

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
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <header className="border-b" style={{
        background: 'var(--background-elevated)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold mb-3 hover-primary-text" style={{ color: 'var(--primary)' }}>
            ← Back to Home
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold mb-2" style={{ color: 'var(--primary)' }}>Glossary</h1>
          <p className="text-base md:text-lg" style={{ color: 'var(--foreground-muted)' }}>
            Quick reference for blockchain and Bitcoin terms
          </p>
        </div>
      </header>

      {/* Navigation */}
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Search Box */}
        <div className="border-2 p-6 md:p-8 mb-10" style={{
          background: 'var(--background-elevated)',
          borderColor: 'var(--border-accent)',
          borderRadius: '2px',
          boxShadow: 'var(--shadow)'
        }}>
          <label htmlFor="search" className="block text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--foreground-muted)' }}>
            Search Terms
          </label>
          <input
            type="search"
            id="search"
            placeholder="Type to search terms or definitions…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete="off"
            className="w-full px-5 py-4 border-2 text-base md:text-lg transition-all"
            style={{
              borderColor: 'var(--border)',
              background: 'var(--background)',
              color: 'var(--foreground)',
              borderRadius: '2px'
            }}
          />
          {searchQuery && (
            <p className="text-sm font-medium mt-3" style={{ color: 'var(--foreground-muted)' }}>
              Found {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Terms List */}
        {filteredTerms.length === 0 ? (
          <div className="border-2 p-12 text-center" style={{
            background: 'var(--background-elevated)',
            borderColor: 'var(--border)',
            borderRadius: '2px'
          }}>
            <p className="text-lg" style={{ color: 'var(--foreground-muted)' }}>
              No terms found matching your search.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {sortedLetters.map((letter) => (
              <div key={letter} className="border-l-4 pl-6" style={{ borderColor: 'var(--primary)' }}>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 flex items-center gap-4" style={{
                  fontFamily: 'Crimson Pro, Georgia, serif',
                  color: 'var(--primary)'
                }}>
                  <span className="inline-flex items-center justify-center w-14 h-14 border-2" style={{
                    borderColor: 'var(--primary)',
                    background: 'var(--primary-light)',
                    borderRadius: '2px'
                  }}>
                    {letter}
                  </span>
                </h2>
                <div className="space-y-6">
                  {groupedTerms[letter].map((term: GlossaryTerm, index: number) => (
                    <div key={index} className="border-2 p-6 hover-border-secondary-slide" style={{
                      background: 'var(--background-elevated)',
                      borderColor: 'var(--border)',
                      borderRadius: '2px'
                    }}>
                      <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
                        {term.term}
                      </h3>
                      <p className="mb-4 leading-relaxed text-base md:text-lg" style={{ color: 'var(--foreground-muted)' }}>
                        {term.definition}
                      </p>
                      <div className="border-l-3 pl-4 py-2" style={{
                        borderLeftWidth: '3px',
                        borderColor: 'var(--secondary)',
                        background: 'var(--secondary-light)'
                      }}>
                        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
                          <span className="font-bold" style={{ color: 'var(--secondary)' }}>Example:</span>{" "}
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
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-block px-8 py-4 border-2 font-semibold hover-button"
            style={{
              borderColor: 'var(--primary)',
              background: 'var(--primary)',
              color: 'white',
              borderRadius: '2px'
            }}
          >
            Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
