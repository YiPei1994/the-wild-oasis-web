"use client";

import { useState } from "react";

type CabinDescriptionProps = {
  description: string;
};
export default function CabinDescription({
  description,
}: CabinDescriptionProps) {
  const [show, setShow] = useState(false);
  return (
    <div className=" mb-10">
      <p
        className={`${
          show ? "line-clamp-none" : "line-clamp-3"
        } text-lg text-primary-300 transition-all duration-300 `}
      >
        {description}
      </p>
      <button
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
        onClick={() => setShow((b) => !b)}
      >
        {show ? "Show less" : "Show more"}
      </button>
    </div>
  );
}
