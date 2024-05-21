"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useState } from "react";

export default function CabinFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleChange(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const value = (e.target as HTMLInputElement).value;
    const params = new URLSearchParams(searchParams);

    params.set("capacity", value);
    router.replace(`${path}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="py-4 flex gap-4 items-center justify-end w-full">
      <Button
        activeFilter={activeFilter}
        value="all"
        onClick={(e) => handleChange(e)}
      >
        All
      </Button>
      <Button
        activeFilter={activeFilter}
        value="small"
        onClick={(e) => handleChange(e)}
      >
        Small cabins
      </Button>
      <Button
        activeFilter={activeFilter}
        value="mid"
        onClick={(e) => handleChange(e)}
      >
        Mid cabins
      </Button>
      <Button
        activeFilter={activeFilter}
        value="large"
        onClick={(e) => handleChange(e)}
      >
        Large cabins
      </Button>
    </div>
  );
}

type ButtonProps = {
  children: ReactNode;
  value: string;
  activeFilter: string;
} & React.ComponentPropsWithoutRef<"button">;

function Button({ children, value, activeFilter, ...props }: ButtonProps) {
  return (
    <button
      className={`${
        activeFilter === value ? "bg-primary-700" : ""
      } px-5 py-2 hover:bg-primary-700`}
      value={value}
      {...props}
    >
      {children}
    </button>
  );
}
