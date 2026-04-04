"use client";

import { useState } from "react";

interface SubModule {
  emoji: string;
  title: string;
  description: string;
}

interface Tab {
  id: string;
  label: string;
  emoji: string;
  summary: string;
  modules: SubModule[];
}

const tabs: Tab[] = [
  {
    id: "livestock",
    label: "Livestock",
    emoji: "🐄",
    summary: "Full herd management from birth to slaughter.",
    modules: [
      {
        emoji: "🐄",
        title: "Animal Registry",
        description:
          "Track every animal by ID, breed, age, weight, and status with a full individual history.",
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
          "Isolate sick animals, log treatments, and maintain a complete health record per animal.",
      },
      {
        emoji: "🥛",
        title: "Dairy Operations",
        description:
          "Milk sessions, lactation tracking, quality tests, and production analytics for dairy farms.",
      },
    ],
  },
  {
    id: "operations",
    label: "Farm Operations",
    emoji: "🌾",
    summary: "Manage daily farm activities, feed, and nutrition.",
    modules: [
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
          "Manage feed formulas and nutrient content with per-100g normalization and feeding schedules.",
      },
      {
        emoji: "🍽️",
        title: "Provisions & Consumption",
        description:
          "Log feed consumption per animal or group and track how much of each food item has been used.",
      },
      {
        emoji: "🏭",
        title: "Food Production",
        description:
          "Run production batches from raw ingredients to finished goods with full nutrient and cost tracking.",
      },
    ],
  },
  {
    id: "inventory",
    label: "Inventory",
    emoji: "📦",
    summary: "Stock, warehouses, and supplier purchases in one place.",
    modules: [
      {
        emoji: "📦",
        title: "Stock Management",
        description:
          "Track stock levels across warehouses with real-time unit conversion and low-stock alerts.",
      },
      {
        emoji: "🏬",
        title: "Warehouses",
        description:
          "Manage multiple storage locations and move stock between warehouses with a full audit trail.",
      },
      {
        emoji: "📒",
        title: "Product Catalog",
        description:
          "Maintain a master catalog of all farm items with units, categories, and cost prices.",
      },
      {
        emoji: "🛍️",
        title: "Purchases",
        description:
          "Record supplier purchases, track payment status, and keep a complete acquisition history.",
      },
    ],
  },
  {
    id: "sales",
    label: "Sales & Commerce",
    emoji: "🏪",
    summary: "Sell in-person and online — manage customers and orders.",
    modules: [
      {
        emoji: "🏪",
        title: "Point of Sale",
        description:
          "Sell livestock and farm products at the counter with a fast POS interface and receipt generation.",
      },
      {
        emoji: "📋",
        title: "Sales History",
        description:
          "Browse, filter, and export a complete record of all sales transactions.",
      },
      {
        emoji: "👤",
        title: "Customer Management",
        description:
          "Maintain a customer directory with purchase history, contact details, and account balances.",
      },
      {
        emoji: "🛒",
        title: "E-commerce Storefront",
        description:
          "Sell farm products online with a built-in storefront, order management, and marketing tools.",
      },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    emoji: "💰",
    summary: "Complete financial visibility across your farm.",
    modules: [
      {
        emoji: "💳",
        title: "Accounts",
        description:
          "Manage multiple bank and cash accounts with running balances and transfer history.",
      },
      {
        emoji: "💸",
        title: "Transactions",
        description:
          "Record income and expense transactions, attach receipts, and reconcile accounts.",
      },
      {
        emoji: "🗂️",
        title: "Categories",
        description:
          "Organize finances with custom income and expense categories for detailed reporting.",
      },
      {
        emoji: "📊",
        title: "Financial Reports",
        description:
          "View profit and loss, cash flow summaries, and per-category breakdowns at a glance.",
      },
    ],
  },
  {
    id: "hr",
    label: "HR",
    emoji: "👥",
    summary: "Manage your workforce from hire to payslip.",
    modules: [
      {
        emoji: "👤",
        title: "Staff Records",
        description:
          "Maintain employee profiles with contact info, role, join date, and employment status.",
      },
      {
        emoji: "💵",
        title: "Payslips",
        description:
          "Generate and send payslips with salary breakdown, deductions, and net pay per period.",
      },
      {
        emoji: "📌",
        title: "Task Assignments",
        description:
          "Assign farm tasks to specific staff members and track completion status.",
      },
      {
        emoji: "🔐",
        title: "Roles & Permissions",
        description:
          "Fine-grained RBAC with 50+ permissions — control exactly what each user can see and do.",
      },
    ],
  },
];

export default function Features() {
  const [activeId, setActiveId] = useState(tabs[0].id);

  const active = tabs.find((t) => t.id === activeId)!;

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Everything your farm needs
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            One platform to run your entire farm operation — from the field to the books.
          </p>
        </div>

        {/* Horizontal scrolling tab bar */}
        <div className="relative mb-10">
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-2 min-w-max sm:min-w-0 sm:flex-wrap sm:justify-center">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveId(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                    activeId === tab.id
                      ? "bg-brand-600 text-white shadow-md shadow-brand-600/20"
                      : "bg-gray-100 text-gray-600 hover:bg-brand-50 hover:text-brand-700"
                  }`}
                >
                  <span>{tab.emoji}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active tab summary */}
        <p className="text-center text-gray-500 text-sm mb-8">{active.summary}</p>

        {/* Sub-module cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {active.modules.map((mod) => (
            <div
              key={mod.title}
              className="bg-gray-50 hover:bg-brand-50 border border-gray-100 hover:border-brand-200 rounded-2xl p-6 transition-all duration-200"
            >
              <div className="text-3xl mb-3">{mod.emoji}</div>
              <h3 className="text-base font-semibold text-gray-900 mb-1.5">{mod.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{mod.description}</p>
            </div>
          ))}
        </div>

        {/* Tab dots */}
        <div className="flex justify-center gap-1.5 mt-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveId(tab.id)}
              aria-label={tab.label}
              className={`h-1.5 rounded-full transition-all ${
                activeId === tab.id ? "w-6 bg-brand-600" : "w-1.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
