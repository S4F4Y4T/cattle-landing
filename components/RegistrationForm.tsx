"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Check, X, Loader2 } from "lucide-react";
import { checkSlug, register } from "@/lib/api";
import type { Package } from "./PricingCard";

// ─── helpers ────────────────────────────────────────────────────────────────

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 30);
}

// ─── Step indicator ──────────────────────────────────────────────────────────

function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => i + 1).map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
              s < step
                ? "bg-brand-600 text-white"
                : s === step
                ? "bg-brand-600 text-white ring-4 ring-brand-100"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {s < step ? <Check size={14} /> : s}
          </div>
          {s < total && (
            <div
              className={`h-0.5 w-10 sm:w-16 transition-colors ${
                s < step ? "bg-brand-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Field wrapper ───────────────────────────────────────────────────────────

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition";

// ─── Main component ──────────────────────────────────────────────────────────

interface FormData {
  name: string;
  email: string;
  password: string;
  orgName: string;
  slug: string;
  packageId: number | null;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  orgName?: string;
  slug?: string;
}

interface Props {
  packages: Package[];
  defaultPlanId?: number | null;
}

export default function RegistrationForm({ packages, defaultPlanId }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPlanId =
    defaultPlanId ??
    (searchParams.get("plan") ? Number(searchParams.get("plan")) : null);

  const defaultPackage = packages.find((p) => p.slug !== "enterprise") ?? packages[0] ?? null;

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    orgName: "",
    slug: "",
    packageId: initialPlanId ?? defaultPackage?.id ?? null,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const [slugSuggestion, setSlugSuggestion] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── slug availability check ──────────────────────────────────────────────

  const doCheckSlug = useCallback(async (value: string) => {
    if (value.length < 3) {
      setSlugStatus("idle");
      return;
    }
    setSlugStatus("checking");
    setSlugSuggestion(null);
    try {
      const result = await checkSlug(value);
      setSlugStatus(result.available ? "available" : "taken");
      if (!result.available && result.suggestion) {
        setSlugSuggestion(result.suggestion);
      }
    } catch {
      setSlugStatus("idle");
    }
  }, []);

  const handleSlugChange = (raw: string) => {
    const value = slugify(raw);
    setForm((f) => ({ ...f, slug: value }));
    setSlugStatus("idle");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doCheckSlug(value), 500);
  };

  // auto-generate slug from org name
  const handleOrgNameChange = (value: string) => {
    setForm((f) => {
      const autoSlug = slugify(value);
      return { ...f, orgName: value, slug: autoSlug };
    });
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const autoSlug = slugify(value);
    if (autoSlug.length >= 3) {
      debounceRef.current = setTimeout(() => doCheckSlug(autoSlug), 500);
    } else {
      setSlugStatus("idle");
    }
  };

  useEffect(() => () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  // ── validation ───────────────────────────────────────────────────────────

  function validateStep1(): boolean {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email address.";
    }
    if (!form.password) {
      e.password = "Password is required.";
    } else if (form.password.length < 8) {
      e.password = "Password must be at least 8 characters.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2(): boolean {
    const e: Errors = {};
    if (!form.orgName.trim()) e.orgName = "Farm name is required.";
    if (!form.slug) {
      e.slug = "Subdomain is required.";
    } else if (form.slug.length < 3) {
      e.slug = "Subdomain must be at least 3 characters.";
    } else if (slugStatus === "taken") {
      e.slug = "This subdomain is already taken.";
    } else if (slugStatus === "checking") {
      e.slug = "Please wait while we check availability.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ── navigation ───────────────────────────────────────────────────────────

  const next = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((s) => s + 1);
  };

  const back = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

  // ── submission ───────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await register({
        name:       form.name,
        email:      form.email,
        password:   form.password,
        slug:       form.slug,
        package_id: form.packageId,
      });
      router.push(`/register/success?slug=${form.slug}&email=${encodeURIComponent(form.email)}`);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        "Registration failed. Please try again.";
      setSubmitError(msg);
      setSubmitting(false);
    }
  };

  // ── render ───────────────────────────────────────────────────────────────

  const monthlyPackages = packages.filter(
    (p) => p.billing_cycle === "monthly" || !packages.some((x) => x.billing_cycle === "monthly")
  );
  const displayPackages = monthlyPackages.length > 0 ? monthlyPackages : packages;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 w-full max-w-lg mx-auto">
      <StepIndicator step={step} total={3} />

      {/* ── Step 1: Account ─────────────────────────────────────────────── */}
      {step === 1 && (
        <div className="space-y-5">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Your Account</h2>
            <p className="text-sm text-gray-500 mt-1">Step 1 of 3 — Create your login credentials.</p>
          </div>

          <Field label="Full Name" error={errors.name}>
            <input
              type="text"
              className={inputCls}
              placeholder="Rahul Hasan"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              autoComplete="name"
            />
          </Field>

          <Field label="Email Address" error={errors.email}>
            <input
              type="email"
              className={inputCls}
              placeholder="rahul@greenvalley.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              autoComplete="email"
            />
          </Field>

          <Field label="Password" error={errors.password}>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`${inputCls} pr-10`}
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </Field>

          <button
            onClick={next}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2.5 rounded-xl transition-colors mt-2"
          >
            Next →
          </button>
        </div>
      )}

      {/* ── Step 2: Farm ────────────────────────────────────────────────── */}
      {step === 2 && (
        <div className="space-y-5">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Your Farm</h2>
            <p className="text-sm text-gray-500 mt-1">Step 2 of 3 — Set up your workspace.</p>
          </div>

          <Field label="Farm / Organization Name" error={errors.orgName}>
            <input
              type="text"
              className={inputCls}
              placeholder="Green Valley Farm"
              value={form.orgName}
              onChange={(e) => handleOrgNameChange(e.target.value)}
            />
          </Field>

          <Field label="Subdomain" error={errors.slug}>
            <div className="flex items-stretch">
              <input
                type="text"
                className={`flex-1 rounded-l-lg border border-r-0 border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition`}
                placeholder="greenvalley"
                value={form.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                maxLength={30}
              />
              <span className="flex items-center px-3 bg-gray-50 border border-l-0 border-gray-300 rounded-r-lg text-sm text-gray-500 whitespace-nowrap">
                .{process.env.NEXT_PUBLIC_APP_DOMAIN ?? "cattlesync.com"}
              </span>
            </div>

            {/* Availability indicator */}
            {form.slug.length >= 3 && (
              <div className="mt-1.5 flex items-center gap-1.5">
                {slugStatus === "checking" && (
                  <><Loader2 size={13} className="animate-spin text-gray-400" /><span className="text-xs text-gray-500">Checking…</span></>
                )}
                {slugStatus === "available" && (
                  <><Check size={13} className="text-brand-600" /><span className="text-xs text-brand-700 font-medium">Available</span></>
                )}
                {slugStatus === "taken" && (
                  <div>
                    <div className="flex items-center gap-1.5">
                      <X size={13} className="text-red-500" />
                      <span className="text-xs text-red-600 font-medium">Already taken</span>
                    </div>
                    {slugSuggestion && (
                      <button
                        type="button"
                        onClick={() => handleSlugChange(slugSuggestion)}
                        className="mt-1 text-xs text-brand-600 hover:underline"
                      >
                        Use "{slugSuggestion}" instead
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </Field>

          <div className="flex gap-3 pt-2">
            <button
              onClick={back}
              className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-xl transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={next}
              disabled={slugStatus === "checking"}
              className="flex-1 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Plan ────────────────────────────────────────────────── */}
      {step === 3 && (
        <div className="space-y-5">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Choose Your Plan</h2>
            <p className="text-sm text-gray-500 mt-1">
              Step 3 of 3 — All plans start with a 14-day free trial.
            </p>
          </div>

          <div className="space-y-3">
            {displayPackages.map((pkg) => {
              const selected = form.packageId === pkg.id;
              const isEnterprise = pkg.slug === "enterprise";
              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => !isEnterprise && setForm((f) => ({ ...f, packageId: pkg.id }))}
                  disabled={isEnterprise}
                  className={`w-full text-left rounded-xl border-2 px-4 py-3.5 transition-all ${
                    selected
                      ? "border-brand-600 bg-brand-50"
                      : isEnterprise
                      ? "border-gray-200 bg-gray-50 opacity-60 cursor-default"
                      : "border-gray-200 hover:border-brand-300 hover:bg-brand-50/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-semibold text-gray-900">{pkg.name}</span>
                      {isEnterprise && (
                        <span className="ml-2 text-xs text-gray-500">— Contact us</span>
                      )}
                    </div>
                    {!isEnterprise && (
                      <span className="text-sm font-bold text-gray-900">
                        ৳{pkg.price_bdt.toLocaleString()}
                        <span className="text-xs font-normal text-gray-500">/mo</span>
                      </span>
                    )}
                    {selected && (
                      <div className="w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center ml-3">
                        <Check size={11} className="text-white" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-gray-500 text-center pt-1">
            No credit card required. Cancel anytime.
          </p>

          {submitError && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={back}
              disabled={submitting}
              className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-xl transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {submitting ? (
                <><Loader2 size={16} className="animate-spin" /> Setting up…</>
              ) : (
                "Start Free Trial"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
