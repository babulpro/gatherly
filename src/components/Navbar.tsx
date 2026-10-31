"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { Spinner } from "@heroui/react";

export default function TopNavbar() {
  const { data: session, isPending } = useSession();
  const [now, setNow] = useState<Date | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  const user = session?.user;

   

  return (
    <nav className="fixed inset-x-0 top-0 z-50 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Left: logo + brand + live time */}
        <Link href="/" className="flex items-center gap-3 font-bold text-foreground">
          <div className="grid h-8 w-16 place-items-center rounded-lg bg-[#043117]">
            {/* <Image
              src="/logo-icon.png"
              alt="Bazar Dor"
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
            /> */}
            babul
          </div>
          {/* <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold">Bazar Dor</span>
            <span className="text-xs font-normal text-default-500 tabular-nums">
              {now ? now.toLocaleString() : "\u00A0"}
            </span>
          </div> */}
        </Link>
        <div className="flex justify-between items-center gap-2">
          <Link href="/about">about</Link>
          <Link href="/dashboard">dashboard</Link>
        </div>


        {/* Right: auth actions */}
        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="h-9 w-9 animate-pulse rounded-full bg-default-200" />
          ) : user ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex cursor-pointer items-center gap-2 rounded-full py-1 pl-1 pr-2 outline-none transition hover:bg-default-100 focus-visible:ring-2 focus-visible:ring-primary"
              >
                {/* Fixed user icon avatar */}
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
                <span className="max-w-[120px] truncate text-sm font-medium">
                  {user.name}
                </span>
                <svg
                  className={`h-4 w-4 text-default-500 transition-transform ${
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
                <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-lg border border-separator bg-background shadow-lg">
                  <Link
                    href="/settings"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-foreground hover:bg-default-100"
                  >
                    Settings
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      signOut();
                    }}
                    className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-danger hover:bg-danger-50"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/sign-in" className="text-sm font-medium">
                Login
              </Link>
              <Link  href="/sign-up">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </header>
    </nav>
  );
}