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
          <h1 className="text-3xl md:text-5xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
            Frequently Asked Questions
          </h1>
          <p className="text-base md:text-lg" style={{ color: 'var(--foreground-muted)' }}>
            Common questions about Bitcoin and blockchain
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
            Search Questions
          </label>
          <input
            type="text"
            id="search"
            placeholder="Type to search questions and answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-4 border-2 text-base md:text-lg transition-all"
            style={{
              borderColor: 'var(--border)',
              background: 'var(--background)',
              color: 'var(--foreground)',
              borderRadius: '2px'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.outline = 'none';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          />
          {searchQuery && (
            <p className="text-sm font-medium mt-3" style={{ color: 'var(--foreground-muted)' }}>
              Found {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* FAQ List */}
        {filteredQuestions.length === 0 ? (
          <div className="border-2 p-12 text-center" style={{
            background: 'var(--background-elevated)',
            borderColor: 'var(--border)',
            borderRadius: '2px'
          }}>
            <p className="text-lg" style={{ color: 'var(--foreground-muted)' }}>
              No questions found matching your search.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {categories.map((category, catIndex) => (
              <div key={category} className="border-l-4 pl-6" style={{ borderColor: 'var(--secondary)' }}>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--foreground)' }}>
                  <span className="inline-flex items-center justify-center w-10 h-10 text-lg font-bold border-2" style={{
                    borderColor: 'var(--secondary)',
                    color: 'var(--secondary)',
                    background: 'var(--secondary-light)',
                    borderRadius: '2px'
                  }}>
                    {catIndex + 1}
                  </span>
                  {category}
                </h2>
                <div className="space-y-3">
                  {groupedFAQs[category].map((item: FAQItem, index: number) => {
                    const globalIndex = faqQuestions.indexOf(item);
                    const isExpanded = expandedIndex === globalIndex;

                    return (
                      <div
                        key={globalIndex}
                        className="border-2 overflow-hidden transition-all duration-200"
                        style={{
                          background: 'var(--background-elevated)',
                          borderColor: isExpanded ? 'var(--primary)' : 'var(--border)',
                          borderRadius: '2px'
                        }}
                      >
                        <button
                          onClick={() => toggleExpand(globalIndex)}
                          className="w-full px-5 py-4 md:px-6 md:py-5 text-left transition-colors flex items-center justify-between gap-4"
                          style={{
                            background: isExpanded ? 'var(--primary-light)' : 'transparent'
                          }}
                          onMouseEnter={(e) => {
                            if (!isExpanded) {
                              e.currentTarget.style.background = 'var(--primary-light)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isExpanded) {
                              e.currentTarget.style.background = 'transparent';
                            }
                          }}
                        >
                          <span className="font-semibold text-base md:text-lg" style={{ color: 'var(--foreground)' }}>
                            {item.question}
                          </span>
                          <svg
                            className="w-5 h-5 flex-shrink-0 transition-transform duration-200"
                            style={{
                              color: 'var(--primary)',
                              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                            }}
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
                          <div className="px-5 py-5 md:px-6 md:py-6 border-t-2 animate-fade-in-up" style={{
                            borderColor: 'var(--border-accent)'
                          }}>
                            <p className="leading-relaxed text-base md:text-lg" style={{ color: 'var(--foreground-muted)' }}>
                              {item.answer}
                            </p>
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
        <div className="border-2 p-8 mt-12" style={{
          background: 'var(--secondary-light)',
          borderColor: 'var(--secondary)',
          borderRadius: '2px'
        }}>
          <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
            Still have questions?
          </h3>
          <p className="leading-relaxed text-base md:text-lg" style={{ color: 'var(--foreground-muted)' }}>
            This is an educational resource designed to help beginners understand blockchain and Bitcoin.
            For investment advice or specific technical support, please consult with qualified professionals.
          </p>
        </div>

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

      {/* Footer */}
      <footer className="mt-20 py-12 border-t" style={{
        background: 'var(--background-elevated)',
        borderColor: 'var(--border)'
      }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-3" style={{
            fontFamily: 'Crimson Pro, Georgia, serif',
            color: 'var(--primary)'
          }}>
            Learn Blockchain
          </div>
          <p className="text-sm mb-2" style={{ color: 'var(--foreground-muted)' }}>
            Your journey to understanding Bitcoin and blockchain technology
          </p>
          <p className="text-xs" style={{ color: 'var(--foreground-muted)', opacity: 0.7 }}>
            Educational purposes only. Not financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
