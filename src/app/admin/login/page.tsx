"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/common/Logo";
import { FormField } from "@/components/forms/FormField";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function AdminLoginPage() {
  const { loginAdmin } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("admin@prajabandhan.in");
  const [password, setPassword] = useState("admin123");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  return (
    <div className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,_rgba(14,92,86,0.16),_transparent_40%),#f3f6f5] px-4 py-10">
      <div className="surface-card w-full max-w-md p-6 sm:p-8">
        <Logo href="/admin/login" className="mb-6" />
        <h1 className="font-display text-2xl font-bold">Admin Login</h1>
        <p className="mt-2 text-sm text-ink-soft">Frontend demo authentication only.</p>
        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!email || !password) {
              setError("Email and password are required.");
              return;
            }
            loginAdmin(email, password);
            router.push("/admin/dashboard");
          }}
        >
          <FormField label="Email" htmlFor="email" error={error}>
            <input id="email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormField>
          <FormField label="Password" htmlFor="password">
            <input id="password" type="password" className="field" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormField>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-secondary" />
            Remember me
          </label>
          <button type="submit" className="btn-primary w-full">Login</button>
        </form>
        <div className="mt-4 flex justify-between text-sm font-semibold">
          <button type="button" className="text-primary" onClick={() => setError("Password reset UI only — no email sent.")}>Forgot password</button>
          <Link href="/" className="text-secondary">Back to website</Link>
        </div>
      </div>
    </div>
  );
}
