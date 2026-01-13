"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div className="max-w-4xl mx-auto px-4 py-4 flex gap-6 items-center">
        <Link
          href="/"
          className={
            isActive("/") && !isActive("/lessons")
              ? "text-blue-600 dark:text-blue-400 font-medium"
              : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          }
        >
          Lessons
        </Link>
        <Link
          href="/glossary"
          className={
            isActive("/glossary")
              ? "text-blue-600 dark:text-blue-400 font-medium"
              : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          }
        >
          Glossary
        </Link>
        <Link
          href="/faq"
          className={
            isActive("/faq")
              ? "text-blue-600 dark:text-blue-400 font-medium"
              : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          }
        >
          FAQ
        </Link>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
