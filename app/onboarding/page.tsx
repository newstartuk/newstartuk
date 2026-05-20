"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Calendar,
  MapPin,
  Home,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
} from "lucide-react";
import { setArrivalProfile, generateId } from "@/lib/utils";
import type { ArrivalProfile } from "@/types";

const STEPS = [
  { num: 1, label: "Who you are" },
  { num: 2, label: "Your arrival" },
  { num: 3, label: "Location" },
  { num: 4, label: "Accommodation" },
  { num: 5, label: "Optional details" },
];

const UK_CITIES = [
  "London", "Birmingham", "Manchester", "Leeds", "Sheffield", "Bristol",
  "Liverpool", "Newcastle", "Nottingham", "Southampton", "Brighton", "Glasgow",
  "Edinburgh", "Cardiff", "Belfast", "Other",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Partial<ArrivalProfile>>({
    arrivalType: "student",
    arrivalStatus: "not_arrived",
    arrivalDate: "",
    city: "",
    university: "",
    accommodationType: "university_accommodation",
    nationality: "",
    englishLevel: "intermediate",
    interestedInWork: false,
  });
  const [error, setError] = useState("");

  const update = (key: keyof ArrivalProfile, value: unknown) =>
    setForm((f) => ({ ...f, [key]: value }));

  const canNext = () => {
    if (step === 2) return !!form.arrivalDate;
    if (step === 3) return !!form.city && !!form.university;
    if (step === 4) return !!form.accommodationType;
    return true;
  };

  const handleFinish = () => {
    const profile: ArrivalProfile = {
      arrivalType: form.arrivalType ?? "student",
      arrivalStatus: form.arrivalStatus ?? "not_arrived",
      arrivalDate: form.arrivalDate ?? "",
      city: form.city ?? "",
      university: form.university ?? "",
      accommodationType: form.accommodationType ?? "university_accommodation",
      nationality: form.nationality || undefined,
      englishLevel: form.englishLevel,
      interestedInWork: form.interestedInWork ?? false,
      completed: true,
    };
    setArrivalProfile(profile);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-civic-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="font-semibold text-navy">NewStart UK</span>
          </div>
          <span className="text-xs text-muted">Step {step} of {STEPS.length}</span>
        </div>
      </header>

      {/* Progress bar */}
      <div className="bg-white border-b border-border">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex gap-1 py-3">
            {STEPS.map((s) => (
              <div
                key={s.num}
                className={`h-1 flex-1 rounded-full transition-all ${
                  s.num < step ? "bg-primary" : s.num === step ? "bg-primary/50" : "bg-civic-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg">
          {/* Step 1 — Arrival Type */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-navy">Who are you?</h2>
                  <p className="text-sm text-muted">Tell us a little about yourself.</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { value: "student", label: "International student", sub: "Coming to study at a UK university or college" },
                  { value: "worker", label: "Skilled worker", sub: "Moving to the UK for skilled employment" },
                  { value: "family", label: "Family member", sub: "Joining a family member already in the UK" },
                  { value: "other", label: "Other type of newcomer", sub: "Visitor, refugee, or another category" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => update("arrivalType", opt.value as ArrivalProfile["arrivalType"]) && update("arrivalType", opt.value)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      form.arrivalType === opt.value
                        ? "border-primary bg-brand-50"
                        : "border-border bg-white hover:border-primary/30"
                    }`}
                  >
                    <p className="text-sm font-semibold text-navy">{opt.label}</p>
                    <p className="text-xs text-muted mt-0.5">{opt.sub}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Arrival */}
          {step === 2 && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-navy">When are you arriving?</h2>
                  <p className="text-sm text-muted">This helps us set your personalised timeline.</p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                {[
                  { value: "not_arrived", label: "Not arrived yet — I'm still planning" },
                  { value: "arriving_soon", label: "Arriving within the next 30 days" },
                  { value: "arrived", label: "I've already arrived in the UK" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => update("arrivalStatus", opt.value as ArrivalProfile["arrivalStatus"]) && update("arrivalStatus", opt.value)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      form.arrivalStatus === opt.value
                        ? "border-primary bg-brand-50"
                        : "border-border bg-white hover:border-primary/30"
                    }`}
                  >
                    <p className="text-sm font-semibold text-navy">{opt.label}</p>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">
                  Expected or actual arrival date
                </label>
                <input
                  type="date"
                  value={form.arrivalDate ?? ""}
                  onChange={(e) => update("arrivalDate", e.target.value)}
                  className="input-field"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 3 — City & University */}
          {step === 3 && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-navy">Where will you be studying?</h2>
                  <p className="text-sm text-muted">We use this to personalise your guidance.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">UK city</label>
                  <select
                    value={form.city ?? ""}
                    onChange={(e) => update("city", e.target.value)}
                    className="select-field"
                    required
                  >
                    <option value="">Select your city</option>
                    {UK_CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">
                    University or college name
                  </label>
                  <input
                    type="text"
                    value={form.university ?? ""}
                    onChange={(e) => update("university", e.target.value)}
                    className="input-field"
                    placeholder="e.g. University of Manchester"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4 — Accommodation */}
          {step === 4 && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
                  <Home className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-navy">What&apos;s your accommodation?</h2>
                  <p className="text-sm text-muted">This affects the tasks you&apos;ll see.</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { value: "university_accommodation", label: "University halls or campus accommodation" },
                  { value: "private_rental", label: "Private rented flat or house" },
                  { value: "family", label: "Living with family or friends" },
                  { value: "temporary", label: "Temporary accommodation (hotel, Airbnb, etc.)" },
                  { value: "not_secured", label: "Not yet secured — still looking" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => update("accommodationType", opt.value as ArrivalProfile["accommodationType"]) && update("accommodationType", opt.value)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      form.accommodationType === opt.value
                        ? "border-primary bg-brand-50"
                        : "border-border bg-white hover:border-primary/30"
                    }`}
                  >
                    <p className="text-sm font-semibold text-navy">{opt.label}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5 — Optional */}
          {step === 5 && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-navy">A few optional details</h2>
                  <p className="text-sm text-muted">Help us make your guidance even more relevant.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">
                    Nationality (optional)
                  </label>
                  <input
                    type="text"
                    value={form.nationality ?? ""}
                    onChange={(e) => update("nationality", e.target.value)}
                    className="input-field"
                    placeholder="e.g. Nigerian, Indian, Chinese"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">
                    Your English level (optional)
                  </label>
                  <select
                    value={form.englishLevel ?? "intermediate"}
                    onChange={(e) => update("englishLevel", e.target.value as ArrivalProfile["englishLevel"])}
                    className="select-field"
                  >
                    <option value="beginner">Beginner — learning English</option>
                    <option value="intermediate">Intermediate — comfortable day-to-day</option>
                    <option value="advanced">Advanced — fluent and confident</option>
                  </select>
                </div>
                <div className="flex items-start gap-3 p-4 bg-civic-50 rounded-xl border border-civic-200">
                  <input
                    type="checkbox"
                    id="work"
                    checked={form.interestedInWork ?? false}
                    onChange={(e) => update("interestedInWork", e.target.checked)}
                    className="mt-0.5 rounded border-border accent-primary"
                  />
                  <div>
                    <label htmlFor="work" className="text-sm font-medium text-navy">
                      I plan to work while studying
                    </label>
                    <p className="text-xs text-muted mt-0.5">
                      We&apos;ll add tasks about NI numbers, right-to-work checks, and part-time job safety.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
              {error}
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex items-center justify-between mt-8">
            {step > 1 ? (
              <button onClick={() => setStep((s) => s - 1)} className="btn-ghost">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}
            {step < STEPS.length ? (
              <button
                onClick={() => { if (canNext()) setStep((s) => s + 1); else setError("Please complete this step before continuing."); }}
                className="btn-primary"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleFinish} className="btn-primary bg-accent hover:bg-green-600 border-0">
                <CheckCircle className="w-4 h-4" /> Finish Setup
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
