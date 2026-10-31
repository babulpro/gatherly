"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { LogoMark, LogoWordmark } from "./logo";

const NAV_LINKS = [
  { href: "/events", label: "Events" },
  { href: "/events/create", label: "Host" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function TopNavbar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const user = session?.user;

  // Close dropdown / mobile on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setMenuOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // Lock scroll while mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const linkCls = (href: string) =>
    [
      "rounded-lg px-3 py-1.5 text-sm font-medium transition",
      isActive(pathname, href)
        ? "bg-primary/10 text-primary"
        : "text-default-600 hover:bg-default-100 hover:text-foreground",
    ].join(" ");

  return (
    <nav className="fixed inset-x-0 top-0 z-50 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#043117] text-white">
            <LogoMark className="h-5 w-5" />
          </span>
          <LogoWordmark className="text-lg text-foreground" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(pathname, l.href) ? "page" : undefined}
              className={linkCls(l.href)}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right: auth + mobile toggle */}
        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="h-9 w-9 animate-pulse rounded-full bg-default-200" />
          ) : user ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                className="flex cursor-pointer items-center gap-2 rounded-full py-1 pl-1 pr-2 outline-none transition hover:bg-default-100 focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
                  </svg>
                </span>
                <span className="hidden max-w-[120px] truncate text-sm font-medium sm:inline">
                  {user.name}
                </span>
                <svg
                  className={`hidden h-4 w-4 text-default-500 transition-transform sm:block ${
                    menuOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 8l4 4 4-4" />
                </svg>
              </button>

              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-separator bg-background shadow-lg"
                >
                  <div className="border-b border-separator px-4 py-2.5">
                    <p className="truncate text-sm font-medium text-foreground">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-default-500">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    href="/dashboard"
                    role="menuitem"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-default-100"
                  >
                    My Dashboard
                  </Link>
                  <Link
                    href="/events/create"
                    role="menuitem"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-default-100"
                  >
                    Host an Event
                  </Link>
                  <Link
                    href="/settings"
                    role="menuitem"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-default-100"
                  >
                    Settings
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      signOut();
                    }}
                    className="block w-full cursor-pointer border-t border-separator px-4 py-2 text-left text-sm text-danger hover:bg-danger-50"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="hidden rounded-lg px-3 py-1.5 text-sm font-medium text-default-600 transition hover:bg-default-100 hover:text-foreground sm:inline-block"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="hidden rounded-lg bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:inline-block"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg text-foreground transition hover:bg-default-100 sm:hidden"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {mobileOpen ? (
                <path d="M6 6l12 12M18 6l-12 12" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-separator bg-background/95 backdrop-blur-lg sm:hidden">
          <div className="mx-auto max-w-5xl space-y-1 px-6 py-4">
            <Link
              href="/"
              className={linkCls("/") + " block"}
              aria-current={pathname === "/" ? "page" : undefined}
            >
              Home
            </Link>
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={linkCls(l.href) + " block"}
                aria-current={isActive(pathname, l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}

            {!user && !isPending && (
              <div className="mt-3 flex gap-2 border-t border-separator pt-3">
                <Link
                  href="/sign-in"
                  className="flex-1 rounded-lg border border-separator py-2 text-center text-sm font-medium text-foreground"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="flex-1 rounded-lg bg-primary py-2 text-center text-sm font-medium text-primary-foreground"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}