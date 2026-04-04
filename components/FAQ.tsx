"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is there a free trial?",
    answer:
      "Yes! Every plan starts with a 14-day free trial. You get full access to all features included in your chosen plan with no commitment.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Absolutely. You can cancel your subscription at any time from your account settings. There are no cancellation fees or long-term contracts.",
  },
  {
    question: "Do I need a credit card to sign up?",
    answer:
      "No credit card is required to start your free trial. You only need to provide payment information when you decide to continue after the trial.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept bKash, Nagad, Rocket, bank transfers, and major credit/debit cards. All payments are in BDT.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes. You can change your plan at any time. Upgrades take effect immediately; downgrades take effect at the start of your next billing cycle.",
  },
  {
    question: "Is my farm data safe and private?",
    answer:
      "Your data is fully isolated from other farms. We use industry-standard encryption at rest and in transit. Your data is never shared with third parties.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer:
      "After cancellation, your account enters a 30-day grace period during which you can export your data. After 30 days, all data is permanently deleted.",
  },
  {
    question: "Do you offer a discount for yearly billing?",
    answer:
      "Yes! Switching to yearly billing saves you up to 20% compared to paying month-by-month. Toggle to 'Yearly' in the pricing section to see the savings.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-gray-900">{question}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-gray-400 mt-0.5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-sm text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Frequently asked questions
          </h2>
        </div>

        <div className="divide-y divide-gray-200 border border-gray-200 rounded-2xl px-6">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
