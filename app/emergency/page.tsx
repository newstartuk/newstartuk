"use client";
import Navigation from "@/components/Navigation";
import { Shield, Phone, AlertTriangle, MapPin, ExternalLink } from "lucide-react";
import Disclaimer from "@/components/Disclaimer";

export default function EmergencyPage() {
  return (
    <Navigation>
      <div className="max-w-3xl mx-auto space-y-5 animate-fade-in">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-navy">Emergency Contacts</h1>
            <p className="text-xs text-muted mt-0.5">Key numbers and contacts for your safety in the UK</p>
          </div>
        </div>

        {/* Critical notice */}
        <div className="card border-2 border-red-300 bg-red-50">
          <h2 className="text-sm font-bold text-red-700 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Save these numbers now
          </h2>
          <p className="text-sm text-red-600 leading-relaxed">
            In a life-threatening emergency, always call <strong>999</strong> first. These numbers are for information — if you are in immediate danger, call emergency services.
          </p>
        </div>

        {/* Emergency services */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-navy uppercase tracking-wide">Emergency services</h2>
          {[
            { service: "Emergency (police, ambulance, fire)", number: "999", desc: "24/7 — for life-threatening emergencies only", color: "bg-red-50 border-red-200", text: "text-red-600", badge: "Free" },
            { service: "NHS non-emergency line", number: "111", desc: "24/7 — medical help when it is urgent but not life-threatening", color: "bg-blue-50 border-blue-200", text: "text-blue-600", badge: "Free" },
            { service: "Police non-emergency", number: "101", desc: "For non-urgent crime, reporting, and police assistance", color: "bg-civic-50 border-civic-200", text: "text-civic-600", badge: "15p/min" },
            { service: "UK-wide crime reporting (Action Fraud)", number: "0300 123 2040", desc: "Report fraud, cybercrime, or scams — available Mon–Sat 9am–6pm", color: "bg-amber-50 border-amber-200", text: "text-amber-600", badge: "Free" },
          ].map(({ service, number, desc, color, text, badge }) => (
            <div key={service} className={`card border-2 flex flex-col sm:flex-row sm:items-center gap-3 ${color}`}>
              <div className="flex-1">
                <p className="text-sm font-semibold text-navy">{service}</p>
                <p className="text-xs text-muted mt-0.5">{desc}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xl font-bold ${text}`}>{number}</span>
                <span className="text-xs text-muted bg-white/60 px-2 py-0.5 rounded-full">{badge}</span>
              </div>
            </div>
          ))}
        </div>

        {/* University contacts */}
        <div className="card">
          <h2 className="section-title">Your university contacts</h2>
          <p className="text-sm text-civic-600 leading-relaxed mb-4">
            Your university has dedicated support services for international students. Save these and add your own.
          </p>
          <div className="space-y-3">
            {[
              { label: "International student support office", placeholder: "e.g. +44 20 7679 xxx" },
              { label: "University security / campus police", placeholder: "e.g. +44 20 7679 xxxx" },
              { label: "Student services / welfare", placeholder: "e.g. +44 20 7679 xxxx" },
              { label: "Out-of-hours emergency line", placeholder: "e.g. +44 79xx xxx xxx" },
            ].map(({ label, placeholder }) => (
              <div key={label}>
                <label className="input-label">{label}</label>
                <input type="tel" placeholder={placeholder} className="input-field" />
              </div>
            ))}
          </div>
          <p className="text-xs text-muted mt-3">
            Tip: Find your university's main switchboard number on their website and save it to your phone contacts now.
          </p>
        </div>

        {/* Other contacts */}
        <div className="card">
          <h2 className="section-title">Other useful contacts</h2>
          <div className="space-y-3">
            {[
              { service: " Samaritans (mental health support)", number: "116 123", desc: "Free, confidential emotional support — 24/7", color: "bg-teal-50 border-teal-200" },
              { service: "Childline (under-19s)", number: "0800 1111", desc: "Free, confidential support for young people", color: "bg-purple-50 border-purple-200" },
              { service: "National Domestic Abuse Helpline", number: "0808 2000 247", desc: "24/7 support for people experiencing domestic abuse", color: "bg-red-50 border-red-200" },
              { service: "Modern Slavery Helpline", number: "0800 0121 700", desc: "Report suspected exploitation or trafficking", color: "bg-amber-50 border-amber-200" },
              { service: "Crisis Text Line (text support)", number: "SHOUT 85258", desc: "Text SHOUT to 85258 for 24/7 crisis support", color: "bg-blue-50 border-blue-200" },
              { feature: true, service: "Your accommodation / landlord", number: "", desc: "Save your landlord's or halls manager's contact", color: "bg-civic-50 border-civic-200" },
              { feature: true, service: "Your embassy or high commission", number: "", desc: "Your home country's embassy in the UK — for passport/emergency travel docs", color: "bg-civic-50 border-civic-200" },
            ].map(({ service, number, desc, color, feature }) => (
              <div key={service} className={`card border-2 flex flex-col sm:flex-row sm:items-center gap-3 ${color}`}>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy">{service}</p>
                  <p className="text-xs text-muted mt-0.5">{desc}</p>
                </div>
                {!feature && number && (
                  <span className="text-lg font-bold text-primary shrink-0">{number}</span>
                )}
                {feature && (
                  <span className="text-xs text-muted shrink-0">Add your own →</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Your embassy */}
        <div className="card border-blue-200 bg-blue-50">
          <h2 className="text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Find your embassy
          </h2>
          <p className="text-sm text-blue-700 mb-3">
            Your embassy can help with emergency travel documents, support if you are detained or arrested, and in some cases, welfare checks.
          </p>
          <a
            href="https://www.gov.uk/government/publications/foreign-embassies-in-the-uk"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full justify-center"
          >
            <ExternalLink className="w-4 h-4" /> Find foreign embassies in the UK (GOV.UK)
          </a>
        </div>

        {/* Safety tips */}
        <div className="card">
          <h2 className="section-title">Staying safe in the UK</h2>
          <div className="space-y-2">
            {[
              "Save emergency numbers on your phone — 999 and 111 at minimum",
              "Register with your university security alerts system",
              "Share your accommodation address with a trusted person back home",
              "Download what3words app — emergency services can find you anywhere in the UK",
              "Know your nearest police station (查找最近的警局)",
              "Keep copies of your passport and BRP in a safe place — not on you at all times",
            ].map((tip) => (
              <div key={tip} className="flex items-start gap-2.5 p-3 bg-civic-50 rounded-xl">
                <span className="text-primary shrink-0 mt-0.5">✓</span>
                <p className="text-sm text-civic-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        <Disclaimer type="general" />
      </div>
    </Navigation>
  );
}
