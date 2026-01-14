import Link from "next/link";
import { getLessonBySlug, getAllLessons } from "@/lib/lessons";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import Navigation from "@/app/components/Navigation";

export async function generateStaticParams() {
  const lessons = getAllLessons();
  return lessons.map((lesson) => ({
    slug: lesson.slug,
  }));
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    notFound();
  }

  const allLessons = getAllLessons();
  const currentIndex = allLessons.findIndex(l => l.slug === slug);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <header className="border-b" style={{
        background: 'var(--background-elevated)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold mb-3 hover-primary-text" style={{ color: 'var(--primary)' }}>
            ← Back to All Lessons
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--primary)' }}>Learn Blockchain</h1>
        </div>
      </header>

      {/* Navigation */}
      <Navigation />

      <main className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        {/* Lesson Header */}
        <div className="border-2 p-6 md:p-8 mb-8 relative" style={{
          background: 'var(--background-elevated)',
          borderColor: 'var(--primary)',
          borderRadius: '2px'
        }}>
          {/* Progress indicator */}
          <div className="absolute top-0 left-0 h-1" style={{
            width: `${(lesson.day / 30) * 100}%`,
            background: 'var(--primary)',
            transition: 'width 0.3s ease'
          }}></div>

          <div className="flex items-start gap-4 md:gap-5">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 border-2 flex flex-col items-center justify-center" style={{
                borderColor: 'var(--primary)',
                background: 'var(--primary-light)',
                borderRadius: '2px'
              }}>
                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--primary)' }}>Day</div>
                <div className="text-3xl md:text-4xl font-bold" style={{
                  fontFamily: 'Crimson Pro, Georgia, serif',
                  color: 'var(--primary)'
                }}>{lesson.day}</div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--foreground-muted)' }}>
                {lesson.module}
              </p>
              <h1 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
                {lesson.title}
              </h1>
              <div className="inline-flex items-center gap-2 px-3 py-1 border" style={{
                borderColor: 'var(--border-accent)',
                background: 'var(--secondary-light)',
                borderRadius: '2px'
              }}>
                <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--secondary)' }}>
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-sm font-medium" style={{ color: 'var(--foreground-muted)' }}>
                  {lesson.duration}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <article className="border-2 p-6 md:p-10 mb-8" style={{
          background: 'var(--background-elevated)',
          borderColor: 'var(--border)',
          borderRadius: '2px',
          boxShadow: 'var(--shadow)'
        }}>
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl md:text-4xl font-bold mb-6 mt-10 first:mt-0 pb-3 border-b" style={{
                  color: 'var(--foreground)',
                  borderColor: 'var(--border-accent)'
                }}>{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-8" style={{ color: 'var(--foreground)' }}>{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl md:text-2xl font-bold mb-3 mt-6" style={{ color: 'var(--foreground)' }}>{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-5 leading-relaxed text-base md:text-lg" style={{ color: 'var(--foreground-muted)' }}>{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="mb-6 space-y-2 ml-6">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-6 space-y-2 ml-6">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="pl-2 leading-relaxed" style={{
                  color: 'var(--foreground-muted)',
                  listStyleType: 'disc'
                }}>{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="font-bold" style={{ color: 'var(--foreground)' }}>{children}</strong>
              ),
              em: ({ children }) => (
                <em className="italic" style={{ color: 'var(--foreground-muted)' }}>{children}</em>
              ),
              hr: () => (
                <hr className="my-10" style={{ borderColor: 'var(--border-accent)', borderWidth: '2px' }} />
              ),
            }}
          >
            {lesson.content}
          </ReactMarkdown>
        </article>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {prevLesson ? (
            <Link
              href={`/lessons/${prevLesson.slug}`}
              className="p-5 border-2 hover-slide-left hover-border-primary"
              style={{
                background: 'var(--background-elevated)',
                borderColor: 'var(--border)',
                borderRadius: '2px'
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--primary)' }}>
                  <path d="M15 19l-7-7 7-7"></path>
                </svg>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--foreground-muted)' }}>Previous Lesson</span>
              </div>
              <p className="font-semibold" style={{ color: 'var(--foreground)' }}>Day {prevLesson.day}: {prevLesson.title}</p>
            </Link>
          ) : (
            <div></div>
          )}
          {nextLesson ? (
            <Link
              href={`/lessons/${nextLesson.slug}`}
              className="p-5 border-2 hover-slide-right-border text-right"
              style={{
                background: 'var(--background-elevated)',
                borderColor: 'var(--border)',
                borderRadius: '2px'
              }}
            >
              <div className="flex items-center justify-end gap-3 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--foreground-muted)' }}>Next Lesson</span>
                <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--primary)' }}>
                  <path d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
              <p className="font-semibold" style={{ color: 'var(--foreground)' }}>Day {nextLesson.day}: {nextLesson.title}</p>
            </Link>
          ) : (
            <div></div>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-10">
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
            Back to All Lessons
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
