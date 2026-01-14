import Link from "next/link";
import { getAllLessons } from "@/lib/lessons";
import Navigation from "./components/Navigation";

export default function Home() {
  const lessons = getAllLessons();
  const modules = [...new Set(lessons.map(l => l.module))];

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <header className="border-b" style={{
        background: 'var(--background-elevated)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 animate-fade-in-up" style={{ color: 'var(--primary)' }}>
            Learn Blockchain
          </h1>
          <p className="text-lg md:text-xl animate-fade-in-up-delay-1" style={{ color: 'var(--foreground-muted)' }}>
            Master Bitcoin & Blockchain in 30 Days
          </p>
        </div>
      </header>

      {/* Navigation */}
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="relative border-2 p-8 md:p-10 mb-12 animate-fade-in-up-delay-2" style={{
          background: 'var(--background-elevated)',
          borderColor: 'var(--primary)',
          boxShadow: 'var(--shadow-lg)',
          borderRadius: '4px'
        }}>
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-20 h-20 opacity-10" style={{
            background: 'var(--primary)',
            clipPath: 'polygon(100% 0, 0 0, 100% 100%)'
          }}></div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            Welcome to Your Blockchain Journey
          </h2>
          <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--foreground-muted)' }}>
            This course is designed for complete beginners with zero technical background.
            Learn the fundamentals of blockchain and Bitcoin through simple, everyday language.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8">
            <div className="text-center p-6 border-2 relative overflow-hidden" style={{
              borderColor: 'var(--border-accent)',
              background: 'var(--primary-light)',
              borderRadius: '2px'
            }}>
              <div className="text-5xl font-bold mb-2" style={{
                fontFamily: 'Crimson Pro, Georgia, serif',
                color: 'var(--primary)'
              }}>30</div>
              <div className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--foreground-muted)' }}>
                Days of Lessons
              </div>
            </div>
            <div className="text-center p-6 border-2 relative overflow-hidden" style={{
              borderColor: 'var(--border-accent)',
              background: 'var(--secondary-light)',
              borderRadius: '2px'
            }}>
              <div className="text-5xl font-bold mb-2" style={{
                fontFamily: 'Crimson Pro, Georgia, serif',
                color: 'var(--secondary)'
              }}>5-10</div>
              <div className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--foreground-muted)' }}>
                Minutes per Day
              </div>
            </div>
            <div className="text-center p-6 border-2 relative overflow-hidden" style={{
              borderColor: 'var(--border-accent)',
              background: 'var(--primary-light)',
              borderRadius: '2px'
            }}>
              <div className="text-5xl font-bold mb-2" style={{
                fontFamily: 'Crimson Pro, Georgia, serif',
                color: 'var(--primary)'
              }}>0</div>
              <div className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--foreground-muted)' }}>
                Experience Needed
              </div>
            </div>
          </div>
        </div>

        {/* Lessons by Module */}
        <div className="space-y-10">
          {modules.map((module, moduleIndex) => {
            const moduleLessons = lessons.filter(l => l.module === module);
            return (
              <div
                key={module}
                className="border-l-4 pl-6 animate-fade-in-up-delay-3"
                style={{ borderColor: 'var(--primary)' }}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--foreground)' }}>
                  <span className="inline-flex items-center justify-center w-10 h-10 text-lg font-bold border-2" style={{
                    borderColor: 'var(--primary)',
                    color: 'var(--primary)',
                    borderRadius: '2px'
                  }}>
                    {moduleIndex + 1}
                  </span>
                  {module}
                </h3>
                <div className="space-y-3">
                  {moduleLessons.map((lesson) => (
                    <Link
                      key={lesson.slug}
                      href={`/lessons/${lesson.slug}`}
                      className="block p-5 border-2 hover-slide-right hover-border-primary hover-shadow"
                      style={{
                        background: 'var(--background-elevated)',
                        borderColor: 'var(--border)',
                        borderRadius: '2px'
                      }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <span className="inline-flex items-center justify-center w-12 h-12 text-lg font-bold border-2 flex-shrink-0" style={{
                            borderColor: 'var(--primary)',
                            color: 'var(--primary)',
                            background: 'var(--primary-light)',
                            fontFamily: 'Crimson Pro, Georgia, serif',
                            borderRadius: '2px'
                          }}>
                            {lesson.day}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-base md:text-lg mb-1" style={{ color: 'var(--foreground)' }}>
                              {lesson.title}
                            </h4>
                            <p className="text-sm font-medium" style={{ color: 'var(--foreground-muted)' }}>
                              {lesson.duration}
                            </p>
                          </div>
                        </div>
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--foreground-muted)' }}>
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
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/glossary"
            className="block p-8 border-2 hover-lift hover-border-secondary"
            style={{
              background: 'var(--background-elevated)',
              borderColor: 'var(--border-accent)',
              boxShadow: 'var(--shadow)',
              borderRadius: '2px'
            }}
          >
            <div className="text-3xl mb-3">📚</div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>Glossary</h3>
            <p className="leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
              Quick reference for all blockchain and Bitcoin terms
            </p>
          </Link>
          <Link
            href="/faq"
            className="block p-8 border-2 hover-lift hover-border-secondary"
            style={{
              background: 'var(--background-elevated)',
              borderColor: 'var(--border-accent)',
              boxShadow: 'var(--shadow)',
              borderRadius: '2px'
            }}
          >
            <div className="text-3xl mb-3">💬</div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>FAQ</h3>
            <p className="leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
              Answers to common questions about Bitcoin and blockchain
            </p>
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
          <p className="text-xs mb-6" style={{ color: 'var(--foreground-muted)', opacity: 0.7 }}>
            Educational purposes only. Not financial advice.
          </p>
          <p className="text-xs" style={{ color: 'var(--foreground-muted)', opacity: 0.5 }}>
            Made with vibe-coding by Jason Lee
          </p>
        </div>
      </footer>
    </div>
  );
}
