"use client";

import { useState } from "react";
import PricingCard, { type Package } from "./PricingCard";

interface Props {
  monthly: Package[];
  yearly: Package[];
}

export default function PricingSection({ monthly, yearly }: Props) {
  const [isYearly, setIsYearly] = useState(false);

  const packages = isYearly ? yearly : monthly;

  // Compute yearly savings % vs monthly (use first non-enterprise pair)
  let savingsPercent: number | null = null;
  if (monthly.length > 0 && yearly.length > 0) {
    const m = monthly.find((p) => p.slug !== "enterprise");
    const y = yearly.find((p) => p.slug !== "enterprise");
    if (m && y) {
      const monthlyTotal = m.price_bdt * 12;
      const yearlyTotal = y.price_bdt;
      savingsPercent = Math.round(((monthlyTotal - yearlyTotal) / monthlyTotal) * 100);
    }
  }

  const popularSlug = "professional";

  return (
    <div>
      {/* Toggle */}
      {monthly.length > 0 && yearly.length > 0 && (
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={`text-sm font-medium ${!isYearly ? "text-gray-900" : "text-gray-500"}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly((v) => !v)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isYearly ? "bg-brand-600" : "bg-gray-300"
            }`}
            role="switch"
            aria-checked={isYearly}
            aria-label="Toggle billing cycle"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                isYearly ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${isYearly ? "text-gray-900" : "text-gray-500"}`}>
            Yearly
            {savingsPercent !== null && savingsPercent > 0 && (
              <span className="ml-1.5 bg-brand-100 text-brand-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                Save {savingsPercent}%
              </span>
            )}
          </span>
        </div>
      )}

      {packages.length === 0 ? (
        <p className="text-center text-gray-500 py-12">No plans available right now.</p>
      ) : (
        <div
          className={`grid gap-8 ${
            packages.length === 1
              ? "max-w-sm mx-auto"
              : packages.length === 2
              ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {packages.map((pkg) => (
            <PricingCard
              key={pkg.id}
              pkg={pkg}
              isPopular={pkg.slug === popularSlug}
              isYearly={isYearly}
            />
          ))}
        </div>
      )}
    </div>
  );
}
