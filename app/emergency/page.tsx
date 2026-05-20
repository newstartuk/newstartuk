import type { Metadata } from "next";
import { Phone, AlertTriangle, Shield, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Emergency Contacts — NewstartUK",
  description: "Essential emergency and support contacts for international students in the UK.",
};

const emergencyContacts = [
  {
    category: "Life-Threatening Emergency",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    items: [
      {
        name: "Emergency Services (Police, Fire, Ambulance)",
        number: "999",
        sub: "Free from any phone — for life-threatening emergencies only",
        available: "24/7",
      },
      {
        name: "NHS Ambulance / Paramedics (non-999 advice)",
        number: "111",
        sub: "Call 111 for urgent medical help that is not life-threatening",
        available: "24/7",
      },
    ],
  },
  {
    category: "Police",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    items: [
      {
        name: "Metropolitan Police (London)",
        number: "0300 123 1212",
        sub: "Non-emergency police assistance",
        available: "24/7",
      },
      {
        name: "UK Police (General)",
        number: "101",
        sub: "Non-emergency police line across the UK",
        available: "24/7",
      },
    ],
  },
  {
    category: "Medical",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
    items: [
      {
        name: "NHS 111 — Medical Advice Line",
        number: "111",
        sub: "Free medical advice and signposting",
        available: "24/7",
      },
      {
        name: "NHS Emergency (A&E)",
        number: "999",
        sub: "For serious emergencies only",
        available: "24/7",
      },
      {
        name: "Samaritans — Mental Health Support",
        number: "116 123",
        sub: "Free, confidential emotional support",
        available: "24/7",
      },
    ],
  },
  {
    category: "University Support",
    color: "text-brand-400",
    bg: "bg-brand-500/10",
    border: "border-brand-500/30",
    items: [
      {
        name: "University Security / Porters",
        number: "Check your university website",
        sub: "Your university's 24/7 emergency contact",
        available: "24/7",
      },
      {
        name: "International Student Office",
        number: "Contact via university portal",
        sub: "Visa, immigration, and student support",
        available: "Mon–Fri 9am–5pm",
      },
      {
        name: "Student Welfare / Counselling",
        number: "Contact via university portal",
        sub: "Mental health, personal issues, financial hardship",
        available: "Mon–Fri + out-of-hours crisis",
      },
    ],
  },
  {
    category: "Legal & Immigration",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    items: [
      {
        name: "UKVI (UK Visas & Immigration) Helpline",
        number: "0800 678 1767",
        sub: "Visa, BRP, immigration enquiries",
        available: "Mon–Fri 9am–4:30pm",
      },
      {
        name: "Citizens Advice Bureau",
        number: "0800 144 8848",
        sub: "Free legal and benefits advice",
        available: "Mon–Fri",
      },
    ],
  },
  {
    category: "Crisis & Safety",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    items: [
      {
        name: "Shelter — Housing Charity",
        number: "0808 800 4444",
        sub: "Free housing advice and support",
        available: "24/7",
      },
      {
        name: "National Domestic Abuse Helpline",
        number: "0808 2000 247",
        sub: "24/7 support for domestic abuse",
        available: "24/7",
      },
      {
        name: "Stop Hate UK — Hate Crime Reporting",
        number: "0800 138 1625",
        sub: "Report hate crime, discrimination",
        available: "24/7",
      },
    ],
  },
];

export default function EmergencyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded-full text-xs text-red-400 font-medium mb-4">
          <AlertTriangle className="w-3 h-3" /> Save This Page — You May Need It
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Emergency Contacts</h1>
        <p className="text-gray-400 leading-relaxed">
          All contacts below are free or included in your UK phone plan. Keep this page bookmarked.
        </p>
      </div>

      {/* Top priority banner */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 mb-8 flex items-start gap-4">
        <div className="p-3 bg-red-500/20 rounded-xl shrink-0">
          <AlertTriangle className="w-6 h-6 text-red-400" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-white mb-1">In a life-threatening emergency — call 999</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Police, Fire, Ambulance — say what you need, where you are, and stay on the line. If you cannot speak, dial 999 then press 55 when prompted.
          </p>
        </div>
      </div>

      {/* Contact sections */}
      <div className="space-y-6">
        {emergencyContacts.map((section) => (
          <div key={section.category} className="bg-dark-800 border border-dark-600 rounded-2xl overflow-hidden">
            <div className={`px-5 py-4 border-b ${section.border} bg-opacity-50`}>
              <h2 className={`text-sm font-semibold ${section.color}`}>{section.category}</h2>
            </div>
            <div className="divide-y divide-dark-700">
              {section.items.map((item) => (
                <div key={item.name} className="px-5 py-4 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
                    <p className="text-xs text-gray-600 mt-1">{item.available}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xl font-bold text-white font-mono">{item.number}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* WhatsApp EU Exit */}
      <div className="mt-8 bg-dark-800 border border-dark-600 rounded-2xl p-5">
        <h2 className="text-sm font-semibold text-white mb-2">💬 WhatsApp Emergency Contacts</h2>
        <p className="text-xs text-gray-400 leading-relaxed mb-3">
          Some UK emergency services now offer WhatsApp contact. For non-emergency police matters in London, message the Metropolitan Police on WhatsApp.
        </p>
        <p className="text-xs text-brand-400">Send a message to: 07903 024 987 (Met Police — non-emergency only)</p>
      </div>
    </div>
  );
}
