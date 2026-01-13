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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
            ← Back to All Lessons
          </Link>
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">Learn Blockchain</h1>
        </div>
      </header>

      {/* Navigation */}
      <Navigation />

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Lesson Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 dark:bg-blue-500 text-white text-lg font-bold">
              {lesson.day}
            </span>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{lesson.module}</p>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{lesson.title}</h1>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{lesson.duration}</p>
        </div>

        {/* Lesson Content */}
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8 prose prose-lg max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 mt-8 first:mt-0">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 mt-8">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-3 mt-6">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-lg">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-700 dark:text-gray-300 ml-4">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-gray-900 dark:text-gray-100">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="italic">{children}</em>
              ),
              hr: () => (
                <hr className="my-8 border-gray-200 dark:border-gray-700" />
              ),
            }}
          >
            {lesson.content}
          </ReactMarkdown>
        </article>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8 mb-8">
          {prevLesson ? (
            <Link
              href={`/lessons/${prevLesson.slug}`}
              className="flex-1 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-600 dark:border-blue-500"
            >
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">← Previous</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">Day {prevLesson.day}: {prevLesson.title}</p>
            </Link>
          ) : (
            <div className="flex-1"></div>
          )}
          {nextLesson ? (
            <Link
              href={`/lessons/${nextLesson.slug}`}
              className="flex-1 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border-r-4 border-blue-600 dark:border-blue-500 text-right"
            >
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Next →</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">Day {nextLesson.day}: {nextLesson.title}</p>
            </Link>
          ) : (
            <div className="flex-1"></div>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            Back to All Lessons
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
