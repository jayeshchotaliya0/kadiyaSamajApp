"use client";

import { useState } from "react";
import Link from "next/link";
import { FormField } from "@/components/forms/FormField";

const steps = [
  "Enter Email/Mobile",
  "Verification",
  "OTP",
  "New Password",
  "Success",
] as const;

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(0);
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const next = () => {
    setError("");
    if (step === 0 && !contact) return setError("Enter email or mobile.");
    if (step === 2 && otp.length < 4) return setError("Enter the demo OTP (any 4+ digits).");
    if (step === 3) {
      if (!password || password !== confirm) {
        return setError("Passwords must match.");
      }
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  return (
    <div className="container-page py-12">
      <div className="surface-card mx-auto max-w-xl p-6 sm:p-8">
        <h1 className="font-display text-3xl font-bold">Forgot Password</h1>
        <p className="mt-2 text-ink-soft">
          Frontend demo flow only. No real OTP or email is sent.
        </p>

        <ol className="mt-6 flex flex-wrap gap-2">
          {steps.map((label, index) => (
            <li
              key={label}
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                index === step
                  ? "bg-primary text-white"
                  : index < step
                    ? "bg-primary/10 text-primary"
                    : "bg-bg text-ink-soft"
              }`}
            >
              {label}
            </li>
          ))}
        </ol>

        <div className="mt-8 space-y-4">
          {step === 0 && (
            <FormField label="Email / Mobile" htmlFor="contact" error={error}>
              <input
                id="contact"
                className="field"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </FormField>
          )}
          {step === 1 && (
            <div className="rounded-2xl bg-bg p-4 text-sm leading-7 text-ink-soft">
              We found a demo account for <strong>{contact}</strong>. Continue to
              enter a mock OTP.
            </div>
          )}
          {step === 2 && (
            <FormField label="Enter OTP" htmlFor="otp" error={error} hint="Use any 4+ digit code.">
              <input
                id="otp"
                className="field"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </FormField>
          )}
          {step === 3 && (
            <>
              <FormField label="New Password" htmlFor="password" error={error}>
                <input
                  id="password"
                  type="password"
                  className="field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </>
          )}
          {step === 4 && (
            <div className="rounded-2xl border border-success/20 bg-success/5 p-5 text-success">
              Password updated successfully in this demo. You can now login.
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {step < 4 ? (
            <button type="button" className="btn-primary" onClick={next}>
              Continue
            </button>
          ) : (
            <Link href="/login" className="btn-primary">
              Back to Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
