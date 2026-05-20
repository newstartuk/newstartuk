"use client";
import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  Shield,
  Bell,
  BookOpen,
  MapPin,
  ChevronRight,
  Users,
  Star,
  AlertTriangle,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: CheckCircle,
    title: "Your Personalised 90-Day Roadmap",
    desc: "Tasks tailored to your arrival date, city, university, and accommodation type — from pre-arrival to settling in.",
    color: "text-primary",
    bg: "bg-brand-50",
  },
  {
    icon: Shield,
    title: "Scam & Mistake Prevention",
    desc: "Clear warnings about housing scams, job fraud, fake documents, and costly first-mistakes — before they happen.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: BookOpen,
    title: "Plain-English Guidance",
    desc: "Step-by-step guides on GP registration, opening a bank account, council tax exemption, and more — in plain English.",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    desc: "Get reminders at the right time — before your BRP collection deadline, your first council tax bill, and more.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: MapPin,
    title: "City & University Guides",
    desc: "Location-specific guidance packs for your city and institution — made by people who understand your situation.",
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    icon: Users,
    title: "Built for International Students",
    desc: "By people who know how overwhelming the first 90 days can be — and what actually matters.",
    color: "text-pink-500",
    bg: "bg-pink-50",
  },
];

const STAGES = [
  {
    num: "1",
    title: "Join the Waitlist",
    desc: "Sign up with your email. Takes 30 seconds.",
    color: "border-brand-200 bg-brand-50 text-brand-600",
  },
  {
    num: "2",
    title: "Tell Us About Yourself",
    desc: "Your arrival date, university, city, and accommodation type.",
    color: "border-blue-200 bg-blue-50 text-blue-600",
  },
  {
    num: "3",
    title: "Get Your Personalised Roadmap",
    desc: "See exactly what to do, when, and why — in plain English.",
    color: "border-purple-200 bg-purple-50 text-purple-600",
  },
  {
    num: "4",
    title: "Settle in Confidently",
    desc: "Track progress, read guides, get reminders, and avoid costly mistakes.",
    color: "border-green-200 bg-green-50 text-green-600",
  },
];

const DISCLAIMER =
  "NewStart UK provides general settlement guidance, checklist support, document explanation, and signposting. We do not provide legal, immigration, financial, tax, medical, or housing advice. For official or regulated matters, please use official sources or speak to a qualified professional.";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-civic-50">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="font-semibold text-navy text-lg">NewStart UK</span>
          </div>
          <nav className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-muted hover:text-navy transition-colors">
              Sign in
            </Link>
            <Link href="/signup" className="btn-primary text-sm">
              Get Started <ChevronRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-50 border border-brand-200 rounded-full text-xs text-primary font-medium mb-6">
              <Star className="w-3 h-3" /> For International Students in the UK
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-6">
              Your UK journey <br />
              <span className="text-primary">starts here.</span>
            </h1>
            <p className="text-lg sm:text-xl text-civic-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              A personalised settlement checklist for your first 90 days in the UK —
              covering GP registration, bank accounts, council tax, housing, and everything
              in between. No confusion. No costly mistakes. Just clear, practical guidance.
            </p>

            {!submitted ? (
              <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="input-field flex-1"
                  required
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Start for Free
                </button>
              </form>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5 max-w-md mx-auto mb-6 animate-fade-in">
                <p className="text-sm text-green-700 font-medium flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" /> You&apos;re on the list!
                </p>
                <p className="text-sm text-green-600 mt-1">
                  We&apos;ll send you an email as soon as your personalised checklist is ready.
                </p>
              </div>
            )}

            <p className="text-xs text-muted">
              Free to use. No credit card required. Built for international students.
            </p>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-civic-50 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs text-amber-600 font-medium mb-4">
                <AlertTriangle className="w-3 h-3" /> The Problem
              </div>
              <h2 className="text-3xl font-bold text-navy mb-4">
                The first 90 days in the UK are overwhelming.
              </h2>
              <p className="text-civic-600 leading-relaxed mb-4">
                GP registration. Bank accounts. Council tax. Housing contracts. BRP collection.
                Student status letters. NI numbers. Right to work. The list feels endless.
              </p>
              <p className="text-civic-600 leading-relaxed mb-4">
                Information is scattered across dozens of websites, forums, and university pages.
                By the time you find what you need, it is often too late.
              </p>
              <p className="text-civic-600 leading-relaxed">
                And then there are the mistakes that cost money — housing scams, council tax
                fines, visa condition breaches, and documents you wish you had prepared earlier.
              </p>
            </div>
            <div className="bg-white border border-border rounded-2xl p-6 space-y-4">
              {[
                { text: '"Where do I even start?"', icon: "❓" },
                { text: '"I just got a council tax bill — am I exempt?"', icon: "😰" },
                { text: '"I almost paid a fake landlord deposit."', icon: "😨" },
                { text: '"I missed my BRP collection deadline."', icon: "😱" },
                { text: '"I don\'t know what a share code is."', icon: "🤯" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <p className="text-sm text-civic-600 italic">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-3">
              Everything you need to settle in confidently.
            </h2>
            <p className="text-civic-600 max-w-xl mx-auto">
              Built from the ground up for international students. Practical. Plain-English.
              Protective.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="card-hover group">
                <div className={`w-10 h-10 ${f.bg} rounded-xl flex items-center justify-center mb-3`}>
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="text-base font-semibold text-navy mb-1.5">{f.title}</h3>
                <p className="text-sm text-civic-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey steps */}
      <section className="bg-civic-50 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-50 border border-brand-200 rounded-full text-xs text-primary font-medium mb-4">
              <Zap className="w-3 h-3" /> How It Works
            </div>
            <h2 className="text-3xl font-bold text-navy mb-3">Up and running in 5 minutes.</h2>
            <p className="text-civic-600 max-w-xl mx-auto">
              Answer a few questions about yourself. Get your personalised roadmap instantly.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STAGES.map((s) => (
              <div key={s.num} className={`card border-l-4 ${s.color}`}>
                <div className="text-3xl font-bold text-current mb-2 opacity-30">{s.num}</div>
                <h3 className="text-sm font-semibold text-navy mb-1">{s.title}</h3>
                <p className="text-xs text-civic-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="disclaimer-box max-w-3xl mx-auto text-center">
            <p className="font-medium text-civic-700 mb-2">Important disclaimer</p>
            <p>{DISCLAIMER}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to start your UK journey?
          </h2>
          <p className="text-civic-300 max-w-xl mx-auto mb-8">
            Join thousands of international students who are settling in confidently —
            with a clear plan and the right guidance.
          </p>
          {!submitted ? (
            <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input-field flex-1"
                required
              />
              <button type="submit" className="btn-primary bg-accent hover:bg-green-600 border-0 whitespace-nowrap">
                Get My Free Checklist
              </button>
            </form>
          ) : (
            <p className="text-sm text-civic-300">Check your inbox — we have sent you a confirmation email.</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-civic-100 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">N</span>
              </div>
              <span className="text-sm font-semibold text-navy">NewStart UK</span>
            </div>
            <p className="text-xs text-muted text-center sm:text-right max-w-sm">
              {DISCLAIMER}
            </p>
            <div className="flex items-center gap-4">
              <Link href="/guides" className="text-xs text-muted hover:text-primary transition-colors">
                Guides
              </Link>
              <Link href="/support" className="text-xs text-muted hover:text-primary transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
