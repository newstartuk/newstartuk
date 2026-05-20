import Link from "next/link";
import {
  Shield,
  GraduationCap,
  ArrowRight,
  Clock,
  CheckCircle,
  Banknote,
  Heart,
  Car,
  Home,
  Phone,
} from "lucide-react";

const categories = [
  { id: "legal", label: "Legal & Immigration", icon: Shield, color: "text-red-400", bg: "bg-red-500/10", href: "/checklist?category=legal" },
  { id: "finance", label: "Finance & Banking", icon: Banknote, color: "text-green-400", bg: "bg-green-500/10", href: "/checklist?category=finance" },
  { id: "health", label: "Health & NHS", icon: Heart, color: "text-pink-400", bg: "bg-pink-500/10", href: "/nhs" },
  { id: "transport", label: "Transport", icon: Car, color: "text-blue-400", bg: "bg-blue-500/10", href: "/checklist?category=transport" },
  { id: "housing", label: "Housing", icon: Home, color: "text-yellow-400", bg: "bg-yellow-500/10", href: "/checklist?category=housing" },
  { id: "emergency", label: "Emergency Contacts", icon: Phone, color: "text-orange-400", bg: "bg-orange-500/10", href: "/emergency" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-dark-900 px-6 py-20 text-center">
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600/30 border border-brand-500/40 rounded-full text-sm text-brand-200 mb-6">
            <GraduationCap className="w-4 h-4" />
            For International Students
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your first 90 days,<br />
            <span className="text-brand-300">sorted.</span>
          </h1>
          <p className="text-lg md:text-xl text-brand-100 mb-10 max-w-xl mx-auto leading-relaxed">
            NewstartUK guides you through everything you need to do when you arrive in the UK — from opening a bank account to registering with a GP.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/checklist"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-all hover:scale-105 shadow-lg"
            >
              Get Started — It's Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-brand-400/40 text-white font-medium rounded-xl hover:bg-brand-700/20 transition-all"
            >
              View Dashboard
            </Link>
          </div>
        </div>
        {/* Decorative blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-brand-700/30 rounded-full blur-3xl" />
      </section>

      {/* 90-Day Promise */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <Clock className="w-6 h-6 text-brand-400" />
          <h2 className="text-2xl font-bold text-white">Your 90-Day Journey</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { phase: "Week 1–2", title: "Get Settled", tasks: "Bank account, NHS, sim card, BRP collection", color: "border-brand-400" },
            { phase: "Week 3–6", title: "Find Your Footing", tasks: "Transport, housing, budget, student discounts", color: "border-warning" },
            { phase: "Week 7–13", title: "Make It Home", tasks: "Social connections, explore your city, build confidence", color: "border-success" },
          ].map((phase) => (
            <div key={phase.phase} className={`p-6 bg-dark-800 border-l-4 ${phase.color} rounded-r-xl`}>
              <p className="text-sm text-brand-400 font-medium mb-1">{phase.phase}</p>
              <h3 className="text-lg font-semibold text-white mb-2">{phase.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{phase.tasks}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-2">What You&apos;ll Need to Do</h2>
        <p className="text-gray-400 mb-10">Everything organised into clear categories. No jargon, no confusion.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group p-5 bg-dark-800 border border-dark-600 rounded-xl hover:border-brand-500/50 transition-all hover:shadow-lg hover:shadow-brand-500/5 flex items-start gap-4"
            >
              <div className={`p-3 rounded-lg ${cat.bg} shrink-0`}>
                <cat.icon className={`w-5 h-5 ${cat.color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-white group-hover:text-brand-300 transition-colors mb-1">{cat.label}</h3>
                <p className="text-xs text-gray-500">Tap to explore →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why NewstartUK */}
      <section className="px-6 py-16 bg-dark-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">Why Use NewstartUK?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle,
                title: "Step-by-Step Guidance",
                desc: "Every task broken down into simple, clear steps. No official jargon.",
              },
              {
                icon: Clock,
                title: "Track Your Progress",
                desc: "See exactly what you've completed and what's left in your 90 days.",
              },
              {
                icon: Shield,
                title: "Trusted Information",
                desc: "Reviewed by immigration advisors. Updated regularly with UK government guidance.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-500/10 rounded-full mb-4">
                  <item.icon className="w-6 h-6 text-brand-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-dark-700 text-center text-sm text-gray-500">
        <p>NewstartUK — Supporting new immigrants in the UK 🇬🇧</p>
        <p className="mt-1">Built with care. Not affiliated with the UK Government.</p>
      </footer>
    </main>
  );
}
