import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    heading: "Platform",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing",  href: "#pricing" },
      { label: "FAQ",      href: "#faq" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Contact Us",     href: "mailto:hello@cattlesync.com" },
      { label: "Documentation",  href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy",   href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="CattleSync" width={32} height={32} className="rounded" />
              <span className="font-bold text-xl text-white">CattleSync</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              The complete farm management platform for livestock, inventory, finance, and more.
            </p>
            <a
              href="mailto:hello@cattlesync.com"
              className="mt-4 inline-block text-sm text-brand-400 hover:text-brand-300 transition-colors"
            >
              hello@cattlesync.com
            </a>
          </div>

          {/* Columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CattleSync. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
