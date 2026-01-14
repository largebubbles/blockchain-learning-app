"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const navItems = [
    { path: "/", label: "Lessons", exact: true },
    { path: "/glossary", label: "Glossary", exact: false },
    { path: "/faq", label: "FAQ", exact: false },
  ];

  return (
    <nav className="border-b" style={{
      background: 'var(--background-elevated)',
      borderColor: 'var(--border)'
    }}>
      <div className="max-w-4xl mx-auto px-4 py-4 flex gap-2 md:gap-4 items-center flex-wrap">
        {navItems.map((item) => {
          const active = item.exact
            ? (isActive(item.path) && !isActive("/lessons"))
            : isActive(item.path);

          return (
            <Link
              key={item.path}
              href={item.path}
              className="px-4 py-2 font-semibold text-sm md:text-base transition-all duration-200 border-2"
              style={{
                color: active ? 'white' : 'var(--foreground)',
                background: active ? 'var(--primary)' : 'transparent',
                borderColor: active ? 'var(--primary)' : (hoveredPath === item.path ? 'var(--primary)' : 'transparent'),
                borderRadius: '2px'
              }}
              onMouseEnter={() => setHoveredPath(item.path)}
              onMouseLeave={() => setHoveredPath(null)}
            >
              {item.label}
            </Link>
          );
        })}
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
