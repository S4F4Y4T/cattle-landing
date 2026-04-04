import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import RegistrationForm from "@/components/RegistrationForm";
import type { Package } from "@/components/PricingCard";

export const metadata = {
  title: "Start Free Trial — CattleSync",
  description: "Create your CattleSync account and start your 14-day free trial today.",
};

async function fetchPackages(): Promise<Package[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/packages`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: { plan?: string };
}) {
  const packages = await fetchPackages();
  const defaultPlanId = searchParams.plan ? Number(searchParams.plan) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-green-50 flex flex-col">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image src="/logo.png" alt="CattleSync" width={28} height={28} className="rounded" />
            <span className="font-bold text-lg text-gray-900">CattleSync</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Start your free trial
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              14 days free. No credit card required.
            </p>
          </div>

          <Suspense>
            <RegistrationForm packages={packages} defaultPlanId={defaultPlanId} />
          </Suspense>

          <p className="mt-6 text-center text-xs text-gray-400">
            Already have an account?{" "}
            <a
              href={`${process.env.NEXT_PUBLIC_APP_URL ?? "https://app.cattlesync.com"}/auth`}
              className="text-brand-600 hover:underline font-medium"
            >
              Sign in
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
