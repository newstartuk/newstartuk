"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getUser,
  getArrivalProfile,
  getReminderPrefs,
  setReminderPrefs,
  clearAllData,
} from "@/lib/utils";
import type { ArrivalProfile, ReminderPrefs } from "@/types";
import {
  User,
  Bell,
  Trash2,
  CheckCircle,
  AlertCircle,
  MapPin,
  GraduationCap,
} from "lucide-react";
import Navigation from "@/components/Navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<ReturnType<typeof getUser>>(null);
  const [profile, setProfile] = useState<ReturnType<typeof getArrivalProfile>>(null);
  const [reminders, setReminders] = useState<ReminderPrefs>({ emailReminders: false, frequency: "weekly" });
  const [saved, setSaved] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const u = getUser();
    const p = getArrivalProfile();
    const r = getReminderPrefs();
    setUser(u);
    setProfile(p);
    setReminders(r);
  }, []);

  const handleReminderSave = () => {
    setReminderPrefs(reminders);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = () => {
    clearAllData();
    router.push("/login");
  };

  return (
    <Navigation>
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-navy">Settings</h1>

        {/* Profile */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-base font-semibold text-navy">Your profile</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-muted mb-1">Name</label>
              <input type="text" value={user?.name ?? ""} readOnly className="input-field" />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">Email</label>
              <input type="email" value={user?.email ?? ""} readOnly className="input-field" />
            </div>
            {profile && (
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs text-muted mb-1">City</label>
                  <p className="text-sm font-medium text-navy flex items-center gap-1"><MapPin className="w-3 h-3" /> {profile.city}</p>
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1">University</label>
                  <p className="text-sm font-medium text-navy flex items-center gap-1"><GraduationCap className="w-3 h-3" /> {profile.university}</p>
                </div>
              </div>
            )}
            <a href="/onboarding" className="text-xs text-primary hover:underline">
              Edit arrival profile →
            </a>
          </div>
        </div>

        {/* Reminders */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="text-base font-semibold text-navy">Reminder preferences</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-navy">Email reminders</p>
                <p className="text-xs text-muted">Receive email reminders for upcoming tasks</p>
              </div>
              <button
                onClick={() => setReminders((r) => ({ ...r, emailReminders: !r.emailReminders }))}
                className={`w-12 h-6 rounded-full transition-all relative ${
                  reminders.emailReminders ? "bg-primary" : "bg-civic-200"
                }`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                  reminders.emailReminders ? "right-1" : "left-1"
                }`} />
              </button>
            </div>
            {reminders.emailReminders && (
              <div>
                <label className="block text-xs text-muted mb-1.5">Reminder frequency</label>
                <select
                  value={reminders.frequency}
                  onChange={(e) => setReminders((r) => ({ ...r, frequency: e.target.value as ReminderPrefs["frequency"] }))}
                  className="select-field"
                >
                  <option value="daily">Daily digest</option>
                  <option value="weekly">Weekly summary</option>
                  <option value="biweekly">Every two weeks</option>
                  <option value="monthly">Monthly roundup</option>
                </select>
              </div>
            )}
            <button onClick={handleReminderSave} className="btn-primary">
              {saved ? <><CheckCircle className="w-4 h-4" /> Saved</> : "Save preferences"}
            </button>
          </div>
        </div>

        {/* Delete account */}
        <div className="card border-red-200">
          <div className="flex items-center gap-3 mb-4">
            <Trash2 className="w-5 h-5 text-danger" />
            <h2 className="text-base font-semibold text-danger">Delete account &amp; data</h2>
          </div>
          <p className="text-sm text-civic-600 mb-4">
            This will delete all your account data and checklist progress. This action cannot be undone.
          </p>
          {!confirmDelete ? (
            <button onClick={() => setConfirmDelete(true)} className="btn-primary bg-red-500 hover:bg-red-600 border-0">
              Delete my account
            </button>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-3">
              <p className="text-sm text-red-700 font-medium">Are you sure? This will delete everything permanently.</p>
              <div className="flex gap-2">
                <button onClick={handleDelete} className="btn-primary bg-red-500 hover:bg-red-600 border-0 text-white">
                  Yes, delete everything
                </button>
                <button onClick={() => setConfirmDelete(false)} className="btn-ghost">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Navigation>
  );
}
