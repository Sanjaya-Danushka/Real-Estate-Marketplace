"use client"
import { navLinks } from "@/components/navbar/page"
import Link from "next/link"
import React from "react"

const Footer = () => {
  return (
    <div className="border-t border-black/5 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center lg:flex-row lg:px-12">
        <Link href="/" className="flex items-center text-2xl font-semibold">
          <span className="text-text">Real</span>
          <span className="rounded-tr-2xl rounded-bl-2xl bg-primary px-2 py-1 text-white">
            Estate
          </span>
        </Link>
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `${item.toLowerCase()}`}
              className={`text-sm font-medium text-text/70 transition hover:text-primary`}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Footer
