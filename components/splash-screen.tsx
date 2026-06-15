"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950">
      <div
        className={`
    transition-all duration-1000 ease-in-out
    ${
      animate
        ? "-translate-y-40 scale-[0.32] md:-translate-y-36 md:-translate-x-[42vw] md:scale-[0.28]"
        : "translate-x-0 translate-y-0 scale-100"
    }
  `}
      >
        <Image
          src="/brand/logo-mark.png"
          alt="TILLA-OS"
          width={180}
          height={180}
          priority
        />
      </div>

      <div
        className={`transition-all duration-700 ease-in-out ${
          animate ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        <h1 className="mt-8 text-4xl font-bold tracking-wide text-white">
          TILLA-OS
        </h1>

        <p className="mt-2 text-center text-zinc-400">Brand Decision Engine</p>
      </div>
    </div>
  );
}
