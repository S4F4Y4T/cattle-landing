const features = [
  {
    emoji: "🐄",
    title: "Livestock Management",
    description:
      "Track animals, breeds, health records, and vaccinations across your entire herd with a full animal registry.",
  },
  {
    emoji: "🔪",
    title: "Slaughter Management",
    description:
      "Record slaughter operations, track animal parts, weights, and yields from farm to finished product.",
  },
  {
    emoji: "🏥",
    title: "Quarantine & Health",
    description:
      "Isolate and monitor sick animals, log treatments, and maintain a complete health history per animal.",
  },
  {
    emoji: "✅",
    title: "Farm Tasks",
    description:
      "Assign, track, and complete daily farm tasks. Keep staff accountable with status updates and deadlines.",
  },
  {
    emoji: "🌾",
    title: "Food & Nutrition",
    description:
      "Manage feed formulas, nutrient content, and feeding schedules with per-100g nutrient normalization.",
  },
  {
    emoji: "🍽️",
    title: "Provisions & Consumption",
    description:
      "Log feed consumption per animal or group and track how much of each food item has been used.",
  },
  {
    emoji: "📦",
    title: "Inventory & Stock",
    description:
      "Manage supplies, warehouses, and stock movements with real-time unit conversion and low-stock alerts.",
  },
  {
    emoji: "🛍️",
    title: "Purchases",
    description:
      "Record supplier purchases, track payment status, and keep a full history of inventory acquisitions.",
  },
  {
    emoji: "🏭",
    title: "Food Production",
    description:
      "Run production batches from raw ingredients to finished goods, with full nutrient and cost tracking.",
  },
  {
    emoji: "🏪",
    title: "Point of Sale",
    description:
      "Sell livestock and farm products directly at the counter with a fast POS interface and receipt generation.",
  },
  {
    emoji: "📋",
    title: "Sales History",
    description:
      "Browse, filter, and export a complete record of all sales transactions and customer purchases.",
  },
  {
    emoji: "👤",
    title: "Customer Management",
    description:
      "Maintain a customer directory with purchase history, contact details, and account balances.",
  },
  {
    emoji: "💰",
    title: "Finance Management",
    description:
      "Accounts, transactions, income and expense categories — complete financial visibility for your farm.",
  },
  {
    emoji: "👥",
    title: "HR Management",
    description:
      "Staff records, payslips, task assignments, and role-based access for every team member.",
  },
  {
    emoji: "🛒",
    title: "E-commerce Storefront",
    description:
      "Sell farm products online with a built-in customer storefront, order management, and marketing tools.",
  },
  {
    emoji: "🥛",
    title: "Dairy Operations",
    description:
      "Milk sessions, lactation tracking, quality tests, and production analytics for dairy farms.",
  },
  {
    emoji: "🔐",
    title: "Roles & Permissions",
    description:
      "Fine-grained RBAC with 50+ permissions. Control exactly what each user can see and do.",
  },
  {
    emoji: "⚙️",
    title: "Global Settings",
    description:
      "Configure units, currencies, farm profile, and system-wide defaults from a single settings panel.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Everything your farm needs
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            One platform to run your entire farm operation — from the field to the books.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative bg-gray-50 hover:bg-brand-50 border border-gray-100 hover:border-brand-200 rounded-2xl p-7 transition-all duration-200"
            >
              <div className="text-4xl mb-4">{feature.emoji}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
