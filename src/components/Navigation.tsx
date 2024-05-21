"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const path = usePathname();
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className={`${
              path.startsWith("/cabins") ? "text-accent-400" : ""
            } hover:text-accent-400 transition-colors`}
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`${
              path.startsWith("/about") ? "text-accent-400" : ""
            } hover:text-accent-400 transition-colors`}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className={`${
              path.startsWith("/account") ? "text-accent-400" : ""
            } hover:text-accent-400 transition-colors`}
          >
            Guest area
          </Link>
        </li>
      </ul>
    </nav>
  );
}
