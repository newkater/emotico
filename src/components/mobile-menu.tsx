"use client"

import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(!open)}>
        {open ? (
          <AiOutlineClose className="block md:hidden" />
        ) : (
          <RxHamburgerMenu className="block md:hidden" />
        )}
      </button>
      <div
        className={cn("w-full flex flex-col bg-slate-100 justify-center items-center", open ? "md:hidden" : "hidden")}
      >
        {navLinks.map((l) => (
          <Link
            className="w-full p-4 hover:bg-slate-300"
            key={l.label}
            href={l.href}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </>
  );
};
