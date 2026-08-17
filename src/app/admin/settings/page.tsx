"use client";

import { useState } from "react";
import { FormField } from "@/components/forms/FormField";
import { BRAND } from "@/constants/brand";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    adminName: "Demo Admin",
    email: "admin@prajabandhan.in",
    websiteName: BRAND.name as string,
    contactEmail: BRAND.email as string,
    contactPhone: BRAND.phone as string,
    logoText: BRAND.shortName as string,
    notifications: true,
    appearance: "Warm Classic",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-ink-soft">All settings are UI/demo only and stored in component state.</p>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <section className="surface-card space-y-4 p-5">
          <h2 className="font-display text-xl font-bold">Admin Profile</h2>
          <FormField label="Name" htmlFor="adminName"><input id="adminName" className="field" value={form.adminName} onChange={(e) => setForm((s) => ({ ...s, adminName: e.target.value }))} /></FormField>
          <FormField label="Email" htmlFor="email"><input id="email" className="field" value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} /></FormField>
        </section>

        <section className="surface-card space-y-4 p-5">
          <h2 className="font-display text-xl font-bold">Change Password</h2>
          <FormField label="Current Password" htmlFor="currentPassword"><input id="currentPassword" type="password" className="field" value={form.currentPassword} onChange={(e) => setForm((s) => ({ ...s, currentPassword: e.target.value }))} /></FormField>
          <FormField label="New Password" htmlFor="newPassword"><input id="newPassword" type="password" className="field" value={form.newPassword} onChange={(e) => setForm((s) => ({ ...s, newPassword: e.target.value }))} /></FormField>
          <FormField label="Confirm Password" htmlFor="confirmPassword"><input id="confirmPassword" type="password" className="field" value={form.confirmPassword} onChange={(e) => setForm((s) => ({ ...s, confirmPassword: e.target.value }))} /></FormField>
        </section>

        <section className="surface-card space-y-4 p-5">
          <h2 className="font-display text-xl font-bold">Website Settings</h2>
          <FormField label="Website Name" htmlFor="websiteName"><input id="websiteName" className="field" value={form.websiteName} onChange={(e) => setForm((s) => ({ ...s, websiteName: e.target.value }))} /></FormField>
          <FormField label="Logo Text Placeholder" htmlFor="logoText"><input id="logoText" className="field" value={form.logoText} onChange={(e) => setForm((s) => ({ ...s, logoText: e.target.value }))} /></FormField>
          <FormField label="Contact Email" htmlFor="contactEmail"><input id="contactEmail" className="field" value={form.contactEmail} onChange={(e) => setForm((s) => ({ ...s, contactEmail: e.target.value }))} /></FormField>
          <FormField label="Contact Phone" htmlFor="contactPhone"><input id="contactPhone" className="field" value={form.contactPhone} onChange={(e) => setForm((s) => ({ ...s, contactPhone: e.target.value }))} /></FormField>
        </section>

        <section className="surface-card space-y-4 p-5">
          <h2 className="font-display text-xl font-bold">Notifications & Appearance</h2>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" checked={form.notifications} onChange={(e) => setForm((s) => ({ ...s, notifications: e.target.checked }))} className="accent-secondary" />
            Enable notification settings (demo)
          </label>
          <FormField label="Appearance" htmlFor="appearance">
            <select id="appearance" className="field" value={form.appearance} onChange={(e) => setForm((s) => ({ ...s, appearance: e.target.value }))}>
              <option>Warm Classic</option>
              <option>Fresh Teal</option>
              <option>Soft Rose</option>
            </select>
          </FormField>
        </section>
      </div>

      {saved ? <p className="rounded-2xl bg-success/10 px-4 py-3 text-sm font-semibold text-success">Settings saved in demo state.</p> : null}
      <button type="button" className="btn-primary" onClick={() => setSaved(true)}>Save Settings</button>
    </div>
  );
}
