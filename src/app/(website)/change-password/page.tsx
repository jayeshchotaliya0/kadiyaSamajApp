"use client";

import { useState } from "react";
import { FormField } from "@/components/forms/FormField";

export default function ChangePasswordPage() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    if (!current || !next || !confirm) {
      setError("All fields are required.");
      return;
    }
    if (next.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (next !== confirm) {
      setError("New password and confirm password must match.");
      return;
    }
    setError("");
    setSuccess(true);
  };

  return (
    <div className="container-page py-12">
      <div className="surface-card mx-auto max-w-lg p-6 sm:p-8">
        <h1 className="font-display text-3xl font-bold">Change Password</h1>
        <p className="mt-2 text-ink-soft">Frontend validation and success state only.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <FormField label="Current Password" htmlFor="current" error={error}>
            <input
              id="current"
              type="password"
              className="field"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
            />
          </FormField>
          <FormField label="New Password" htmlFor="next">
            <input
              id="next"
              type="password"
              className="field"
              value={next}
              onChange={(e) => setNext(e.target.value)}
            />
          </FormField>
          <FormField label="Confirm Password" htmlFor="confirm">
            <input
              id="confirm"
              type="password"
              className="field"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </FormField>
          {success ? (
            <div className="rounded-2xl border border-success/20 bg-success/5 px-4 py-3 text-sm font-medium text-success">
              Password changed successfully (demo).
            </div>
          ) : null}
          <button type="submit" className="btn-primary">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
