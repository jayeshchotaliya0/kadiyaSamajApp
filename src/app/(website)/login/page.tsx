"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormField } from "@/components/forms/FormField";
import { Logo } from "@/components/common/Logo";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { loginUser } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter email/mobile and password.");
      return;
    }
    loginUser(email, password);
    router.push("/dashboard");
  };

  return (
    <div className="container-page grid min-h-[70vh] items-center py-12 lg:grid-cols-2 lg:gap-12">
      <div className="hidden lg:block">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-secondary">
          Welcome back
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold leading-tight">
          Sign in to continue your match journey
        </h1>
        <p className="mt-4 max-w-md text-ink-soft leading-7">
          Demo login only — no real authentication. Any email and password will
          unlock the member dashboard UI.
        </p>
      </div>

      <div className="surface-card mx-auto w-full max-w-md p-6 sm:p-8">
        <Logo className="mb-6" />
        <h2 className="font-display text-2xl font-bold">Login</h2>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <FormField label="Email / Mobile" htmlFor="email" error={error}>
            <input
              id="email"
              className="field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </FormField>
          <FormField label="Password" htmlFor="password">
            <input
              id="password"
              type="password"
              className="field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </FormField>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="accent-secondary"
            />
            Remember Me
          </label>
          <button type="submit" className="btn-primary w-full">
            Login
          </button>
        </form>
        <div className="mt-5 flex flex-wrap justify-between gap-3 text-sm font-semibold">
          <Link href="/forgot-password" className="text-primary">
            Forgot Password
          </Link>
          <Link href="/register" className="text-secondary">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
