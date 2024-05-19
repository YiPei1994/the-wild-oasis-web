"use client";

import { useState } from "react";

type CounterProps = {
  users: number;
};

export default function Counter({ users }: CounterProps) {
  const [count, setCount] = useState(users);
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount((c) => c + 1)}>Add +1</button>
    </div>
  );
}
