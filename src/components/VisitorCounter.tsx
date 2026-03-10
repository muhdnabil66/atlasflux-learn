"use client";

import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const res = await fetch("/api/visitor-count");
      const data = await res.json();
      setCount(data.count);
    };
    fetchCount();

    const increment = async () => {
      const res = await fetch("/api/visitor-count/increment", {
        method: "POST",
      });
      const data = await res.json();
      setCount(data.count);
    };
    increment();
  }, []);

  return (
    <div className="text-center text-gray-600 text-sm">
      👥 {count.toLocaleString()} visitors have joined us this month
    </div>
  );
}
