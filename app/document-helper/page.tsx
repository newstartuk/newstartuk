"use client";
import { useState } from "react";
import {
  Bot,
  Shield,
  FileText,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Loader2,
} from "lucide-react";
import {
  getDocHelperResponse,
  getAvailableDocTypes,
} from "@/lib/doc-helper-responses";
import type { DocHelperResponse } from "@/types";
import Navigation from "@/components/Navigation";

const DISCLAIMER =
  "NewStart UK provides general settlement guidance, checklist support, document explanation, and signposting. We do not provide legal, immigration, financial, tax, medical, or housing advice. For official or regulated matters, please use official sources or speak to a qualified professional.";

const NIA_INTRO = "Hi! I'm Nia, your NewStart UK guide. I can help explain common UK documents in plain English — like tenancy agreements, council tax letters, student status letters, bank letters, and NHS forms. I don't give legal, immigration, or financial advice — I help you understand what documents mean so you can make your own decisions.";

export default function DocumentHelperPage() {
  const [selectedType, setSelectedType] = useState<string>("");
  const [userText, setUserText] = useState("");
  const [response, setResponse] = useState<DocHelperResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const docTypes = getAvailableDocTypes();

  const handleExplain = async () => {
    if (!selectedType && !userText) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    const result = getDocHelperResponse(selectedType);
    setResponse(result);
    setLoading(false);
  };

  return (
    <Navigation>
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-navy">Document Helper</h1>
              <p className="text-sm text-muted">Powered by Nia — NewStart Navigator</p>
            </div>
          </div>
        </div>

        {/* Welcome card */}
        <div className="card border-primary/20 bg-brand-50/50">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">N</span>
            </div>
            <div>
              <p className="text-sm text-civic-700 leading-relaxed italic">{NIA_INTRO}</p>
            </div>
          </div>
        </div>

        {/* Disclaimer banner */}
        <div className="disclaimer-box flex items-start gap-2">
          <Shield className="w-4 h-4 text-muted shrink-0 mt-0.5" />
          <p>{DISCLAIMER}</p>
        </div>

        {/* Document type selector */}
        <div className="card">
          <h2 className="text-base font-semibold text-navy mb-3">Choose a document type</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {docTypes.map((dt) => (
              <button
                key={dt.type}
                onClick={() => { setSelectedType(dt.type); setResponse(null); }}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  selectedType === dt.type
                    ? "border-primary bg-brand-50"
                    : "border-border bg-white hover:border-primary/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-navy">{dt.label}</p>
                    <p className="text-xs text-muted mt-0.5">Pre-written plain-English explanation</p>
                  </div>
                  {selectedType === dt.type && (
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-border">
            <label className="block text-xs font-medium text-navy mb-1.5">
              Or paste document text (optional)
            </label>
            <textarea
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              className="input-field resize-none"
              rows={4}
              placeholder="Paste document text here and I'll highlight key terms and missing information..."
            />
          </div>
          <button
            onClick={handleExplain}
            disabled={loading || (!selectedType && !userText)}
            className="btn-primary w-full justify-center mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Nia is reading...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" /> Explain in Plain English
              </>
            )}
          </button>
        </div>

        {/* Response */}
        {response && !response.refusal && (
          <div className="space-y-4">
            {/* Plain English */}
            <div className="card border-primary/20 bg-brand-50/30">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">N</span>
                </div>
                <h2 className="text-base font-semibold text-navy">In plain English</h2>
              </div>
              <p className="text-sm text-civic-700 leading-relaxed">{response.plainEnglish}</p>
            </div>

            {/* Missing fields */}
            {response.missingFields.length > 0 && (
              <div className="card">
                <h2 className="text-sm font-semibold text-navy mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" /> Check these are included
                </h2>
                <ul className="space-y-1.5">
                  {response.missingFields.map((field, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-civic-700">
                      <span className="text-amber-400 shrink-0 mt-0.5">⚠</span>
                      {field}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key terms */}
            {response.keyTerms.length > 0 && (
              <div className="card">
                <h2 className="text-sm font-semibold text-navy mb-3">Key terms explained</h2>
                <div className="space-y-3">
                  {response.keyTerms.map((kt, i) => (
                    <div key={i} className="pb-3 border-b border-civic-100 last:border-0 last:pb-0">
                      <p className="text-sm font-semibold text-navy">{kt.term}</p>
                      <p className="text-xs text-civic-600 mt-0.5 leading-relaxed">{kt.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Next steps */}
            {response.safeNextSteps.length > 0 && (
              <div className="card bg-green-50 border-green-200">
                <h2 className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Safe next steps
                </h2>
                <ul className="space-y-1.5">
                  {response.safeNextSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                      <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Disclaimer */}
            <div className="disclaimer-box">
              <p className="font-medium text-civic-700 mb-1">Remember</p>
              <p>{DISCLAIMER}</p>
            </div>
          </div>
        )}

        {response?.refusal && (
          <div className="card border-red-200 bg-red-50">
            <h2 className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> I can&apos;t help with that
            </h2>
            <p className="text-sm text-red-600">{response.refusalReason}</p>
          </div>
        )}
      </div>
    </Navigation>
  );
}
