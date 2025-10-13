"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

function useCountUp(end: number, duration = 2000) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration, hasAnimated]);

  return { count, ref };
}

const stats = [
  { value: 50000, label: "Usuarios Activos", suffix: "+" },
  { value: 10000, label: "Eventos Creados", suffix: "+" },
  { value: 450, label: "Deportes Disponibles", suffix: "+" },
];

function StatCounter({ value, label, suffix }: { value: number; label: string; suffix: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-lg sm:text-xl text-white/90">{label}</div>
    </div>
  );
}

export default function StatCounters() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 sm:mt-24">
      {stats.map((stat, index) => (
        <StatCounter
          key={index}
          value={stat.value}
          label={stat.label}
          suffix={stat.suffix}
        />
      ))}
    </div>
  );
}
