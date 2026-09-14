"use client"
import Link from "next/link"
import React, { useState } from "react"
import { Button } from "../ui/button"
import { Home, Menu, X } from "lucide-react"
import { SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/nextjs"
import { useAddProperty } from "@/components/properties/addPropertyModal/page"

interface NavbarProps {
  variant: "transparent" | "solid"
}

export const navLinks = ["Home", "Properties", "MarketPlace"]
const Navbar = ({ variant = "transparent" }: NavbarProps) => {
  const [Open, setOpen] = useState(false)
  const { isLoaded, isSignedIn } = useAuth()
  const { openAddProperty } = useAddProperty()
  const isTransparent = variant === "transparent"
  return (
    <section
      className={`top-0 left-0 z-50 w-full ${
        isTransparent
          ? "absolute bg-transparent"
          : "sticky border-b border-slate-200 bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <nav className="flex h-20 items-center justify-between">
          {/* logo */}
          <Link href="/" className="flex items-center text-2xl font-semibold">
            <span className={isTransparent ? "text-white" : "text-text"}>
              Real
            </span>
            <span className="rounded-tr-2xl rounded-bl-2xl bg-primary px-2 py-1 text-white">
              Estate
            </span>
          </Link>
          {/* desktop links */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `${item.toLowerCase()}`}
                className={`text-sm font-medium transition hover:text-primary ${
                  isTransparent ? "text-white/80 hover:text-white" : "text-text/70"
                }`}
              >
                {item}
              </Link>
            ))}
          </div>
          {/* desktop buttons */}
          <div className="hidden items-center gap-4 lg:flex">
            {isLoaded && isSignedIn ? (
              <>
                <UserButton />

                <Button
                  onClick={openAddProperty}
                  variant="outline"
                  className={`rounded-full px-6 font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                    isTransparent
                      ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
                      : "border-black/10 bg-transparent text-text hover:border-primary hover:text-primary"
                  }`}
                >
                  <Home className="mr-2 size-4" />
                  Add property
                </Button>
              </>
            ) : (
              <>
                <SignInButton>
                  <Button
                    className={`rounded-full px-6 font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                      isTransparent
                        ? "bg-white text-text hover:bg-white/90"
                        : "bg-primary text-white"
                    }`}
                  >
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button
                    variant="outline"
                    className={`rounded-full px-6 font-medium transition hover:-translate-y-0.5 hover:shadow-md ${
                      isTransparent
                        ? "border-white/30 text-white hover:bg-white/10"
                        : "border-black/10 bg-transparent text-text hover:border-primary hover:text-primary"
                    }`}
                  >
                    Sign up
                  </Button>
                </SignUpButton>
              </>
            )}
          </div>
          {/* mobile menu button */}
          <Button
            className={`flex h-11 w-11 items-center justify-center rounded-2xl transition lg:hidden ${
              isTransparent
                ? "border border-white/20 bg-white/10 text-white"
                : "border border-slate-200 bg-white text-text"
            }`}
            onClick={() => setOpen(!Open)}
          >
            {Open ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </nav>
        {/* mobile menu */}
        {Open && (
          <div
            className={`mb-4 rounded-3xl p-6 lg:hidden ${
              isTransparent
                ? "border border-white/10 bg-slate-900/95 text-white"
                : "border border-slate-200 bg-white text-text"
            }`}
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `${item.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className={`transition hover:text-primary ${
                    isTransparent ? "text-white/80" : "text-text/70"
                  }`}
                >
                  {item}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                {isLoaded && isSignedIn ? (
                  <>
                    <div className="flex items-center gap-3">
                      <UserButton />
                      <span
                        className={isTransparent ? "text-white" : "text-text"}
                      >
                        Account
                      </span>
                    </div>
                    <Button
                      onClick={openAddProperty}
                      variant="outline"
                      className={`w-full rounded-full px-6 font-medium transition hover:-translate-y-0.5 hover:shadow-md ${
                        isTransparent
                          ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
                          : "border-black/10 bg-transparent text-text hover:border-primary hover:text-primary"
                      }`}
                    >
                      <Home className="mr-2 size-4" />
                      Add property
                    </Button>
                  </>
                ) : (
                  <>
                    <SignInButton>
                      <Button className="w-full rounded-full bg-primary px-6 font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                        Login
                      </Button>
                    </SignInButton>
                    <SignUpButton>
                      <Button
                        variant="outline"
                        className={`w-full rounded-full px-6 font-medium transition hover:-translate-y-0.5 hover:shadow-md ${
                          isTransparent
                            ? "border-white/30 bg-transparent text-white hover:bg-white/10"
                            : "border-black/10 bg-transparent text-text hover:border-primary hover:text-primary"
                        }`}
                      >
                        Sign up
                      </Button>
                    </SignUpButton>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Navbar