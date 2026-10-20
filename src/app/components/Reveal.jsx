"use client";

import { createElement, useEffect, useRef, useState } from "react";

export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  as = "div",
  className = "",
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const offset =
    direction === "left"
      ? "-translate-x-12"
      : direction === "right"
      ? "translate-x-12"
      : "translate-y-8";

  return createElement(
    as,
    {
      ref,
      style: { transitionDelay: `${delay}ms` },
      className: `transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 ${
        visible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${offset}`
      } ${className}`,
    },
    children
  );
}