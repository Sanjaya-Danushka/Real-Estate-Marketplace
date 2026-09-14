"use client"
import Link from "next/link"
import React, { useState } from "react"
import { Button } from "../ui/button"
import { Home, Menu, X } from "lucide-react"
import { SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/nextjs"

interface NavbarProps {
  variant: "transparent" | "solid"
}

export const navLinks = ["Home", "Properties", "MarketPlace"]
const Navbar = ({ variant = "transparent" }: NavbarProps) => {
  const [Open, setOpen] = useState(false)
  const { isLoaded, isSignedIn } = useAuth()
  const isTransparent = variant === "transparent"
  return (
    <section
      className={`top-0 left-0 z-50 w-full ${isTransparent ? "absolute" : "sticky border-b border-black/5 bg-card"}`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <nav
          className={`flex h-20 items-center justify-between ${isTransparent ? "mt-6 rounded-3xl border border-white/10 bg-white/5 px-6 backdrop-blur-2xl" : "px-0"} `}
        >
          {/* logo */}
          <Link href="/" className="flex items-center text-2xl font-semibold">
            <span className={isTransparent ? "text-gray-300" : "text-text"}>
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
                className={`text-sm font-medium transition hover:text-primary ${isTransparent ? "text-white/80" : "text-text/70"}`}
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
                  variant="outline"
                  className="rounded-full bg-primary px-6 font-medium text-white/80 shadow-sm transition hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
                >
                  <Home className="mr-2 size-4" />
                  Add property
                </Button>
              </>
            ) : (
              <>
                <SignInButton>
                  <Button className="rounded-full bg-primary px-6 font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button
                    variant="outline"
                    className={`rounded-full px-6 font-medium transition hover:-translate-y-0.5 hover:shadow-md ${isTransparent ? "border-white/20 bg-white/5 text-white hover:bg-white/10" : "bg-transparent text-text"}`}
                  >
                    Sign up
                  </Button>
                </SignUpButton>
              </>
            )}
          </div>
          {/* mobile menu button */}
          <Button
            className={`flex h-11 w-11 items-center justify-center rounded-2xl transition lg:hidden ${isTransparent ? "border border-white/10 bg-white/5 text-white" : "border border-black/10 bg-background text-text"} `}
            onClick={() => setOpen(!Open)}
          >
            {Open ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </nav>
        {/* mobile menu */}
        {Open && (
          <div
            className={`mt-4 rounded-3xl p-6 backdrop-blur-2xl lg:hidden ${isTransparent ? "border border-white/10 bg-secondary/95" : "border border-black/5 bg-white"} `}
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `${item.toLowerCase()}`}
                  className={`transition hover:text-primary ${isTransparent ? "text-white/80" : "text-text/70"}`}
                >
                  {item}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                {isLoaded && isSignedIn ? (
                  <>
                    <div className="flex items-center gap-3">
                      <UserButton />
                      <span className={isTransparent ? "text-white" : "text-text"}>
                        Account
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      className="rounded-full bg-primary px-6 font-medium text-white/80 shadow-sm transition hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
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
                        className={`w-full rounded-full px-6 font-medium transition hover:-translate-y-0.5 hover:shadow-md ${isTransparent ? "border-white/20 bg-white/5 text-white hover:bg-white/10" : "bg-transparent text-text"}`}
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