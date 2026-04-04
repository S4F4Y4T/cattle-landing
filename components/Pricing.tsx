import PricingSection from "./PricingSection";
import type { Package } from "./PricingCard";

export const revalidate = 300;

async function fetchPackages(): Promise<Package[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/packages`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

export default async function Pricing() {
  const packages = await fetchPackages();

  const monthly = packages.filter((p) => p.billing_cycle === "monthly");
  const yearly  = packages.filter((p) => p.billing_cycle === "yearly");

  // Fall back: if all packages lack billing_cycle, show them all under monthly
  const displayMonthly = monthly.length > 0 ? monthly : packages;
  const displayYearly  = yearly;

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>

        <PricingSection monthly={displayMonthly} yearly={displayYearly} />
      </div>
    </section>
  );
}
