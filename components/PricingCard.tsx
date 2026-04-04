import Link from "next/link";

export interface Package {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price_bdt: number;
  billing_cycle: "monthly" | "yearly";
  limits: Record<string, number | null>;
}

interface Props {
  pkg: Package;
  isPopular?: boolean;
  isYearly: boolean;
}

function formatLimit(value: number | null | undefined, unit = ""): string {
  if (value === null || value === undefined || value === -1) return "Unlimited";
  return `${value.toLocaleString()}${unit ? " " + unit : ""}`;
}

function buildFeatures(limits: Package["limits"]): string[] {
  const lines: string[] = [];

  const animals = limits.max_animals;
  lines.push(`Up to ${formatLimit(animals, "animals")}`);

  const users = limits.max_users;
  lines.push(`${formatLimit(users, "users")}`);

  const staff = limits.max_staff;
  lines.push(`${formatLimit(staff, "staff")}`);

  const storage = limits.storage_gb ?? (limits.storage_mb ? limits.storage_mb / 1024 : null);
  lines.push(`${formatLimit(storage, "GB storage")}`);

  lines.push("All modules included");

  const logDays = limits.activity_log_days;
  if (logDays === null || logDays === undefined || logDays === -1) {
    lines.push("Unlimited activity logs");
  } else {
    lines.push(`${logDays}-day activity logs`);
  }

  return lines;
}

export default function PricingCard({ pkg, isPopular = false, isYearly }: Props) {
  const isEnterprise = pkg.slug === "enterprise";

  const monthlyEquivalent =
    isYearly && pkg.billing_cycle === "yearly"
      ? Math.round(pkg.price_bdt / 12)
      : pkg.price_bdt;

  const yearlySavings =
    isYearly && pkg.billing_cycle === "yearly" ? null : null;

  const features = buildFeatures(pkg.limits);

  return (
    <div
      className={`relative flex flex-col rounded-2xl border ${
        isPopular
          ? "border-brand-600 shadow-xl shadow-brand-600/10 bg-white"
          : "border-gray-200 bg-white"
      } p-8`}
    >
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="bg-brand-600 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
        {pkg.description && (
          <p className="mt-1 text-sm text-gray-500">{pkg.description}</p>
        )}
      </div>

      <div className="mb-8">
        {isEnterprise ? (
          <div className="text-3xl font-bold text-gray-900">Custom</div>
        ) : (
          <>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-900">
                ৳{monthlyEquivalent.toLocaleString()}
              </span>
              <span className="text-gray-500 text-sm">/ month</span>
            </div>
            {isYearly && pkg.billing_cycle === "yearly" && (
              <p className="mt-1 text-sm text-brand-600 font-medium">
                ৳{pkg.price_bdt.toLocaleString()} billed yearly
              </p>
            )}
          </>
        )}
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feat) => (
          <li key={feat} className="flex items-start gap-2.5 text-sm text-gray-700">
            <svg
              className="w-4 h-4 mt-0.5 shrink-0 text-brand-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {feat}
          </li>
        ))}
      </ul>

      {isEnterprise ? (
        <a
          href="mailto:hello@cattlesync.com"
          className="block text-center bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
        >
          Contact Us
        </a>
      ) : (
        <Link
          href={`/register?plan=${pkg.id}`}
          className={`block text-center font-semibold py-3 px-6 rounded-xl transition-colors ${
            isPopular
              ? "bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-600/25"
              : "bg-gray-900 hover:bg-gray-800 text-white"
          }`}
        >
          Start Free Trial
        </Link>
      )}
    </div>
  );
}
