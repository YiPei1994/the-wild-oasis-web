import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function Navigation() {
  const user = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className={` hover:text-accent-400 transition-colors`}
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={` hover:text-accent-400 transition-colors`}
          >
            About
          </Link>
        </li>
        <li>
          {user?.user?.image ? (
            <Link
              href="/account"
              className={`flex gap-4 items-center hover:text-accent-400 transition-colors`}
            >
              <img
                src={user.user.image}
                className="h-8 rounded-full"
                alt={user.user.name}
                referrerPolicy="no-referrer"
              />
              <span> Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className={` hover:text-accent-400 transition-colors`}
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
