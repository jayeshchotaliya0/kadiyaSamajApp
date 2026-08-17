"use client";

import { useState } from "react";
import { BRAND } from "@/constants/brand";
import { FormField } from "@/components/forms/FormField";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="container-page grid gap-8 py-12 lg:grid-cols-2">
      <div>
        <h1 className="section-title">Contact Us</h1>
        <p className="section-subtitle">
          Reach the {BRAND.name} team. This form is frontend-only.
        </p>
        <div className="mt-8 space-y-2 text-ink-soft">
          <p>{BRAND.email}</p>
          <p>{BRAND.phone}</p>
          <p>{BRAND.address}</p>
        </div>
      </div>
      <form
        className="surface-card space-y-4 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <FormField label="Name" htmlFor="name">
          <input id="name" className="field" required />
        </FormField>
        <FormField label="Email" htmlFor="email">
          <input id="email" type="email" className="field" required />
        </FormField>
        <FormField label="Message" htmlFor="message">
          <textarea id="message" className="field min-h-32" required />
        </FormField>
        {sent ? (
          <p className="rounded-2xl bg-success/10 px-4 py-3 text-sm font-semibold text-success">
            Message captured in demo mode.
          </p>
        ) : null}
        <button type="submit" className="btn-primary">
          Send Message
        </button>
      </form>
    </div>
  );
}
