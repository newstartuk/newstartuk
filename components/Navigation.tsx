"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  BookOpen,
  MessageSquare,
  Settings,
  Shield,
  X,
  Menu,
  LogOut,
  FileText,
  ChevronRight,
} from "lucide-react";
import { clearUser, clearAllData, getUser, getArrivalProfile } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/checklist", label: "My Checklist", icon: CheckSquare },
  { href: "/guides", label: "Guidance Library", icon: BookOpen },
  { href: "/document-helper", label: "Document Helper", icon: FileText },
  { href: "/support", label: "Support", icon: MessageSquare },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Navigation({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = getUser();
    setUserName(user?.name?.split(" ")[0] ?? "there");
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    clearAllData();
    router.push("/login");
  };

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + "/");

  return (
    <div className="min-h-screen bg-civic-50">
      {/* Top bar */}
      <header
        className={`sticky top-0 z-40 bg-white border-b border-border transition-shadow ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden btn-ghost p-2"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-semibold text-navy hidden sm:block">NewStart UK</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/admin" className="btn-ghost hidden sm:flex">
              <Shield className="w-4 h-4" />
              <span className="text-xs">Admin</span>
            </Link>
            <div className="flex items-center gap-2 pl-2 border-l border-civic-200">
              <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold text-xs">
                  {userName[0]?.toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-navy hidden sm:block">Hi, {userName}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r border-border bg-white min-h-[calc(100vh-4rem)] sticky top-16">
          <nav className="flex-1 p-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? "nav-link-active" : "nav-link"}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-border space-y-1">
            <Link href="/admin" className={isActive("/admin") ? "nav-link-active" : "nav-link"}>
              <Shield className="w-4 h-4" />
              Admin Panel
            </Link>
            <button
              onClick={handleLogout}
              className="nav-link w-full text-left text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl flex flex-col">
              <div className="h-16 px-4 flex items-center justify-between border-b border-border">
                <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">N</span>
                  </div>
                  <span className="font-semibold text-navy">NewStart UK</span>
                </Link>
                <button onClick={() => setSidebarOpen(false)} className="btn-ghost p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={isActive(item.href) ? "nav-link-active" : "nav-link"}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/admin"
                  onClick={() => setSidebarOpen(false)}
                  className={isActive("/admin") ? "nav-link-active" : "nav-link"}
                >
                  <Shield className="w-4 h-4" />
                  Admin Panel
                </Link>
              </nav>
              <div className="p-4 border-t border-border space-y-1">
                <button
                  onClick={handleLogout}
                  className="nav-link w-full text-left text-red-500 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
