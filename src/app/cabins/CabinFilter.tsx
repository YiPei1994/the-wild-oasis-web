"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CabinFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  function handleChange(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const value = (e.target as HTMLInputElement).value;
    const params = new URLSearchParams(searchParams);
    params.set("capacity", value);
    router.replace(`${path}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="py-4 flex gap-4 items-center justify-end w-full">
      <button
        className={`px-5 py-2 hover:bg-primary-700`}
        value="all"
        onClick={(e) => handleChange(e)}
      >
        All
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700`}
        value="small"
        onClick={(e) => handleChange(e)}
      >
        Small cabins
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700`}
        value="mid"
        onClick={(e) => handleChange(e)}
      >
        Mid cabins
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700`}
        value="large"
        onClick={(e) => handleChange(e)}
      >
        Large cabins
      </button>
    </div>
  );
}
