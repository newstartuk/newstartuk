import type { Metadata } from "next";
import { Building2, CreditCard, Shield, CheckCircle2, FileText, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Opening a UK Bank Account — NewstartUK",
  description: "Step-by-step guide to opening a UK bank account as an international student.",
};

const steps = [
  {
    icon: FileText,
    title: "Step 1 — Choose your bank",
    color: "text-brand-400",
    bg: "bg-brand-500/10",
    desc: "Choose between traditional UK banks and digital banks. Many students use both.",
    options: [
      { name: "Traditional Banks", banks: ["Barclays", "HSBC", "Lloyds", "NatWest", "Santander"] },
      { name: "Digital Banks (Popular with Students)", banks: ["Monzo", "Starling", "Revolut", "Wise"] },
    ],
    tip: "Digital banks (Monzo, Starling) are often the easiest to open as an international student — you can start your application online before arriving in the UK.",
  },
  {
    icon: FileText,
    title: "Step 2 — Gather your documents",
    color: "text-green-400",
    bg: "bg-green-500/10",
    desc: "UK banks require identity and address verification. Prepare these before applying.",
    checklist: [
      { label: "Passport or BRP (Biometric Residence Permit)", required: true },
      { label: "UK Visa / Entry Clearance (in passport)", required: true },
      { label: "University offer letter / CAS statement", required: true },
      { label: "Proof of UK address (university accommodation letter, tenancy agreement, or recent utility bill)", required: true },
      { label: "National Insurance number (required by some banks — apply at HMRC if needed)", required: false },
      { label: "Student ID card", required: false },
    ],
    tip: "Your university accommodation letter is usually accepted as proof of address for the initial account opening. Some banks will let you use your home country address temporarily.",
  },
  {
    icon: Building2,
    title: "Step 3 — Apply for your account",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    desc: "Most banks allow online applications. Some require an in-person branch visit.",
    process: [
      "Visit the bank's website or nearest branch.",
      "Select 'International Student Account' or 'Basic Bank Account'.",
      "Complete the application form with your personal details.",
      "Upload or present your documents for verification.",
      "Wait for identity and address checks (1–5 working days).",
      "Receive your account details — often before your card arrives.",
    ],
    tip: "Student bank accounts often come with a free 16–25 Railcard (Barclays, NatWest), free overdraft (check limits), or cash bonuses. Compare before choosing.",
  },
  {
    icon: CreditCard,
    title: "Step 4 — Receive and activate your card",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    desc: "Your debit card will arrive by post within 5–10 working days.",
    process: [
      "Your PIN will arrive separately by text or in a separate letter.",
      "Activate your card online or by phone.",
      "Set up mobile banking app for full access.",
      "Add your account details to your student loan / scholarship provider.",
    ],
  },
  {
    icon: Shield,
    title: "Important: Know your rights",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    desc: "As an international student, you have the same banking rights as UK residents.",
    rights: [
      "You are entitled to a basic bank account at any major UK bank (Financial Conduct Authority rules).",
      "Your money is protected up to £85,000 by the FSCS (Financial Services Compensation Scheme).",
      "Banks cannot refuse you a basic account for lacking a credit history.",
      "Report any fraud or suspicious activity to your bank immediately.",
    ],
  },
];

const banks = [
  { name: "Monzo", type: "Digital", highlight: "Easiest to open internationally", color: "text-pink-400", link: "https://monzo.com" },
  { name: "Starling", type: "Digital", highlight: "No fees, great app", color: "text-blue-400", link: "https://starlingbank.com" },
  { name: "Barclays", type: "Traditional", highlight: "Free 16–25 Railcard for students", color: "text-blue-300", link: "https://barclays.co.uk" },
  { name: "NatWest", type: "Traditional", highlight: "Student account with perks", color: "text-green-400", link: "https://natwest.com" },
  { name: "Revolut", type: "Digital", highlight: "Good for international transfers", color: "text-purple-400", link: "https://revolut.com" },
  { name: "Wise", type: "Digital", highlight: "Best rates for sending money home", color: "text-teal-400", link: "https://wise.com" },
];

export default function BankPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-xs text-green-400 font-medium mb-4">
          <Building2 className="w-3 h-3" /> Essential — Week 1 Task
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Opening a UK Bank Account</h1>
        <p className="text-gray-400 leading-relaxed">
          A UK bank account is essential for receiving your student loan or scholarship, paying rent, and managing daily expenses. Here&apos;s how to do it.
        </p>
      </div>

      {/* Quick guide */}
      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5 mb-8">
        <h2 className="text-sm font-semibold text-green-300 mb-2">🏆 Recommended: Open a Digital Bank Account First</h2>
        <p className="text-sm text-gray-400 leading-relaxed mb-3">
          Monzo or Starling allow you to start your application online <strong className="text-gray-300">before you arrive in the UK</strong>. You&apos;ll have a UK account number and sort code immediately — ready to receive your loan or scholarship the moment you land.
        </p>
        <div className="flex gap-3 flex-wrap">
          <a href="https://monzo.com" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 bg-dark-700 border border-dark-600 rounded-lg text-pink-400 hover:text-pink-300 transition-colors">
            Open Monzo →
          </a>
          <a href="https://starlingbank.com" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 bg-dark-700 border border-dark-600 rounded-lg text-blue-400 hover:text-blue-300 transition-colors">
            Open Starling →
          </a>
        </div>
      </div>

      {/* Banks comparison */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-white mb-4">Popular UK Banks for Students</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {banks.map((bank) => (
            <a
              key={bank.name}
              href={bank.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-dark-800 border border-dark-600 rounded-xl p-4 hover:border-brand-500/40 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-semibold ${bank.color}`}>{bank.name}</span>
                <span className="text-xs text-gray-600 bg-dark-700 px-2 py-0.5 rounded">{bank.type}</span>
              </div>
              <p className="text-xs text-gray-400">{bank.highlight}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-6 mb-10">
        {steps.map((step, i) => (
          <div key={i} className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-xl ${step.bg} shrink-0`}>
                <step.icon className={`w-6 h-6 ${step.color}`} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">{step.title}</h2>
                <p className="text-sm text-gray-400 mt-1 leading-relaxed">{step.desc}</p>
              </div>
            </div>

            {"options" in step && (
              <div className="space-y-3 ml-2">
                {step.options?.map((opt) => (
                  <div key={opt.name}>
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">{opt.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {opt.banks.map((bank) => (
                        <span key={bank} className="text-xs px-3 py-1 bg-dark-700 border border-dark-600 rounded-lg text-gray-300">
                          {bank}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {"checklist" in step && (
              <div className="ml-2">
                {step.checklist?.map((item, j) => (
                  <div key={j} className="flex items-start gap-3 py-2 border-b border-dark-700 last:border-0">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${item.required ? "text-green-400" : "text-gray-600"}`} />
                    <div>
                      <p className="text-sm text-gray-300">{item.label}</p>
                      {item.required && <span className="text-xs text-red-400">Required</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {"process" in step && (
              <ol className="ml-2 space-y-2">
                {step.process?.map((item, j) => (
                  <li key={j} className="flex gap-3 text-sm text-gray-300">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-dark-700 text-gray-500 text-xs flex items-center justify-center mt-0.5 font-medium">{j + 1}</span>
                    {item}
                  </li>
                ))}
              </ol>
            )}

            {"rights" in step && (
              <ul className="ml-2 space-y-2">
                {step.rights?.map((item, j) => (
                  <li key={j} className="flex gap-3 text-sm text-gray-300">
                    <span className="text-yellow-400 shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {step.tip && (
              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg ml-2">
                <p className="text-xs text-yellow-300">💡 Tip: {step.tip}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sending money home */}
      <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
          <Globe className="w-5 h-5 text-brand-400" /> Sending Money Home
        </h2>
        <p className="text-sm text-gray-400 mb-4 leading-relaxed">
          When you need to send money to your family abroad, avoid high street bank fees. Use a specialist service.
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { name: "Wise", url: "https://wise.com" },
            { name: "Revolut", url: "https://revolut.com" },
            { name: "Monzo (World)", url: "https://monzo.com" },
          ].map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 bg-dark-700 border border-dark-600 rounded-lg text-brand-400 hover:text-brand-300 transition-colors"
            >
              {s.name} →
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
