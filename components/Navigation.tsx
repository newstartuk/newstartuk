"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  Calculator,
  Heart,
  Phone,
  Menu,
  X,
  Home,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/checklist", label: "Checklist", icon: CheckSquare },
  { href: "/budget", label: "Budget", icon: Calculator },
  { href: "/nhs", label: "NHS Guide", icon: Heart },
  { href: "/emergency", label: "Emergency", icon: Phone },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-50 bg-dark-900/95 backdrop-blur border-b border-dark-700 px-4 py-3 flex items-center justify-between md:hidden">
        <span className="font-bold text-brand-400 text-lg">NewstartUK</span>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Desktop sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-dark-900 border-r border-dark-700 flex-col py-8 px-4 z-40">
        <div className="mb-10 px-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              NS
            </div>
            <div>
              <span className="font-bold text-white text-lg leading-none block">Newstart</span>
              <span className="text-brand-400 text-xs font-medium">United Kingdom</span>
            </div>
          </Link>
        </div>

        <div className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-brand-600/20 text-brand-300 border border-brand-500/30"
                    : "text-gray-400 hover:text-white hover:bg-dark-800"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="mt-4 px-3 text-xs text-gray-600">
          <p>MVP 1 — International Students</p>
          <p className="mt-0.5">v0.1.0</p>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-dark-900/95 backdrop-blur pt-16">
          <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
                    active
                      ? "bg-brand-600/20 text-brand-300"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
