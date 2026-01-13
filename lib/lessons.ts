import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const lessonsDirectory = path.join(process.cwd(), 'content/lessons');

export interface LessonMetadata {
  day: number;
  title: string;
  module: string;
  duration: string;
  slug: string;
}

export interface Lesson extends LessonMetadata {
  content: string;
}

export function getAllLessons(): LessonMetadata[] {
  // Check if directory exists
  if (!fs.existsSync(lessonsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(lessonsDirectory);
  const lessons = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(lessonsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        day: data.day,
        title: data.title,
        module: data.module,
        duration: data.duration,
        slug,
      } as LessonMetadata;
    })
    .sort((a, b) => a.day - b.day);

  return lessons;
}

export function getLessonBySlug(slug: string): Lesson | null {
  try {
    const fullPath = path.join(lessonsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      day: data.day,
      title: data.title,
      module: data.module,
      duration: data.duration,
      slug,
      content,
    };
  } catch (error) {
    return null;
  }
}

export function getLessonByDay(day: number): Lesson | null {
  const slug = `day-${String(day).padStart(2, '0')}`;
  return getLessonBySlug(slug);
}

export function getModules(): string[] {
  const lessons = getAllLessons();
  const modules = [...new Set(lessons.map(lesson => lesson.module))];
  return modules;
}
