import type { Metadata } from "next";
import { Heart, Phone, MapPin, Clock, Shield, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "NHS Guide — NewstartUK",
  description: "Step-by-step guide to NHS registration for international students.",
};

const steps = [
  {
    icon: MapPin,
    title: "Step 1 — Find a GP near you",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    desc: "You can register with any NHS GP surgery — it does not have to be closest to your home. Use the NHS finder tool below.",
    details: [
      "Go to: nhs.uk/service-search/find-a-gp",
      "Enter your postcode or accommodation address",
      "Call the surgery to confirm they are accepting new patients",
      "You can register even if you don't have a fixed address yet — use your university address",
    ],
    tip: "University health centres are often the easiest — designed specifically for students.",
  },
  {
    icon: FileText,
    title: "Step 2 — Gather your documents",
    color: "text-green-400",
    bg: "bg-green-500/10",
    desc: "You will need the following to register. The surgery cannot refuse you for missing documents.",
    details: [
      "Passport or BRP (Biometric Residence Permit)",
      "Proof of address (university accommodation letter, tenancy agreement, or bank statement)",
      "NHS number (if you have one from your visa application — not essential)",
      "Previous GP details (if transferring from another UK area)",
    ],
    tip: "If you don't have proof of address yet, your university student ID card + acceptance letter usually works.",
  },
  {
    icon: CheckCircle2,
    title: "Step 3 — Complete registration",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    desc: "Registration is free and takes about 10 minutes.",
    details: [
      "Visit the GP surgery in person and ask to register",
      "Fill in a GMS1 registration form (the surgery provides this)",
      "You may be offered a New Patient Health Check — this is routine",
      "You will receive an NHS number — keep this safe, you will need it for prescriptions and referrals",
    ],
    tip: "Some surgeries allow you to pre-register online. Check their website before visiting.",
  },
  {
    icon: Phone,
    title: "Step 4 — Book your first appointment",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    desc: "Once registered, book a routine check-up or health review.",
    details: [
      "Call the surgery on 0300 0 300 000 or book via their online booking system",
      "Tell them you are a new patient requesting a New Patient Health Check",
      "Bring a list of any current medications or medical conditions",
      "This is a good opportunity to mention any health concerns or ongoing treatment",
    ],
    tip: "Registering with a dentist is separate — see below.",
  },
];

const services = [
  {
    name: "NHS 111 — Non-emergency medical advice",
    phone: "111 (free, 24/7)",
    desc: "Call 111 for urgent medical help that is not a 999 emergency. They will tell you where to go and what to do.",
    icon: Phone,
    color: "text-blue-400",
  },
  {
    name: "A&E — Accident & Emergency",
    phone: "999 (emergency only)",
    desc: "Only for serious emergencies: unconsciousness, severe chest pain, heavy bleeding, suspected stroke.",
    icon: Heart,
    color: "text-red-400",
  },
  {
    name: "Pharmacy — Minor ailments",
    phone: "Walk in (no appointment)",
    desc: "For colds, infections, minor injuries. Pharmacists can advise and provide over-the-counter medication.",
    icon: Shield,
    color: "text-green-400",
  },
  {
    name: "Sexual Health Clinic",
    phone: "Via NHS 111 or local clinic",
    desc: "Free, confidential sexual health services including contraception and STI testing.",
    icon: CheckCircle2,
    color: "text-purple-400",
  },
];

export default function NHSPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-pink-500/10 border border-pink-500/30 rounded-full text-xs text-pink-400 font-medium mb-4">
          <Heart className="w-3 h-3" /> Essential — Do This First
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Register with the NHS</h1>
        <p className="text-gray-400 leading-relaxed max-w-xl">
          The NHS (National Health Service) is the UK&apos;s publicly funded healthcare system. As an international student, you are entitled to use the NHS. Here&apos;s how to get access.
        </p>
      </div>

      {/* Legal note */}
      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5 mb-10">
        <p className="text-sm text-green-300">
          <strong>Good news:</strong> If you are studying in the UK for more than 6 months, you have access to the NHS under the Immigration Health Surcharge (IHS) paid with your visa. You do not need private health insurance, though some students choose to have it.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-6 mb-14">
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
            <ul className="space-y-2 ml-2">
              {step.details.map((detail, j) => (
                <li key={j} className="flex gap-3 text-sm text-gray-300">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-dark-700 text-gray-500 text-xs flex items-center justify-center mt-0.5 font-medium">{j + 1}</span>
                  {detail}
                </li>
              ))}
            </ul>
            {step.tip && (
              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-xs text-yellow-300">💡 Tip: {step.tip}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* NHS Services */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-white mb-2">Know When to Use What</h2>
        <p className="text-gray-400 text-sm mb-6">Understanding NHS services saves time and ensures you get the right care.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((s, i) => (
            <div key={i} className="bg-dark-800 border border-dark-600 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <s.icon className={`w-4 h-4 ${s.color}`} />
                <h3 className="text-sm font-semibold text-white">{s.name}</h3>
              </div>
              <p className="text-xs font-mono text-brand-400 mb-2">{s.phone}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* NHS App */}
      <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6 mb-10">
        <h2 className="text-lg font-semibold text-white mb-2">📱 Download the NHS App</h2>
        <p className="text-sm text-gray-400 mb-4 leading-relaxed">
          The NHS App lets you book GP appointments, order repeat prescriptions, view your health record, and access 111 — all from your phone.
        </p>
        <a
          href="https://www.nhs.uk/nhs-app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 font-medium"
        >
          Download the NHS App → <ExternalLinkIcon className="w-3 h-3" />
        </a>
      </div>

      {/* Register with a dentist */}
      <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-2">Also: Register with a Dentist</h2>
        <p className="text-sm text-gray-400 mb-4 leading-relaxed">
          NHS dental care is subsidised. Search for an NHS dentist near you. Waiting lists can be long in some areas, so register early.
        </p>
        <a
          href="https://www.nhs.uk/service-search/find-a-dentist"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 font-medium"
        >
          Find an NHS Dentist → <ExternalLinkIcon className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}
