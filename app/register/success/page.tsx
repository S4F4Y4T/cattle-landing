"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Suspense } from "react";

const REDIRECT_SECONDS = 5;
const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN ?? "cattlesync.com";
const APP_PROTOCOL = process.env.NEXT_PUBLIC_APP_PROTOCOL ?? "https";
const APP_PORT = process.env.NEXT_PUBLIC_APP_PORT ?? "";

function SuccessContent() {
  const searchParams = useSearchParams();
  const slug  = searchParams.get("slug") ?? "";
  const email = searchParams.get("email") ?? "";

  const portSuffix = APP_PORT ? `:${APP_PORT}` : "";
  const dashboardUrl = `${APP_PROTOCOL}://${slug}.${APP_DOMAIN}${portSuffix}/auth`;

  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          window.location.href = dashboardUrl;
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [dashboardUrl]);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-12 text-center max-w-lg w-full mx-auto">
      <div className="flex justify-center mb-6">
        <CheckCircle className="w-16 h-16 text-brand-600" strokeWidth={1.5} />
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-3">
        Your account is being set up!
      </h1>

      <p className="text-gray-600 leading-relaxed mb-2">
        We&apos;re provisioning your CattleSync workspace.
      </p>

      {email && (
        <p className="text-gray-600 leading-relaxed mb-6">
          You&apos;ll receive an email at{" "}
          <span className="font-semibold text-gray-900">{email}</span>{" "}
          with your login link shortly.
        </p>
      )}

      <p className="text-sm text-gray-500 mb-8">
        This usually takes less than a minute.
      </p>

      {slug && (
        <a
          href={dashboardUrl}
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Go to {slug}.{APP_DOMAIN}
          <span aria-hidden>→</span>
        </a>
      )}

      {countdown > 0 && (
        <p className="mt-4 text-xs text-gray-400">
          Redirecting automatically in {countdown}s…
        </p>
      )}
    </div>
  );
}

export default function SuccessPage() {
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

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Suspense>
          <SuccessContent />
        </Suspense>
      </main>
    </div>
  );
}
