"use client"

import { Mail, MapPin, Phone, Send } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { navLinks } from "@/components/navbar/page"

const Footer = () => {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = () => {
    if (!email.includes("@")) return
    setSubscribed(true)
    setEmail("")
  }

  return (
    <footer className="bg-secondary text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* brand */}
          <div>
            <Link href="/" className="flex items-center text-2xl font-semibold">
              <span className="text-white">Real</span>
              <span className="rounded-tr-2xl rounded-bl-2xl bg-primary px-2 py-1 text-white">
                Estate
              </span>
            </Link>
            <p className="mt-5 leading-relaxed text-white/60">
              The premium real estate marketplace connecting owners, buyers,
              and renters with the perfect place to call home.
            </p>
          </div>

          {/* explore */}
          <div>
            <h3 className="font-semibold text-white">Explore</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-white/60 transition hover:text-white"
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/properties"
                  className="text-white/60 transition hover:text-white"
                >
                  Add Property
                </Link>
              </li>
            </ul>
          </div>

          {/* contact */}
          <div>
            <h3 className="font-semibold text-white">Contact</h3>
            <ul className="mt-5 space-y-4 text-white/60">
              <li className="flex items-center gap-3">
                <MapPin className="size-4 shrink-0 text-primary" />
                Colombo 03, Sri Lanka
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-primary" />
                +94 11 234 5678
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-primary" />
                hello@realestate.lk
              </li>
            </ul>
          </div>

          {/* newsletter */}
          <div>
            <h3 className="font-semibold text-white">Property Alerts</h3>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              Get new listings and market updates straight to your inbox.
            </p>
            {subscribed ? (
              <p className="mt-4 rounded-2xl bg-primary/15 px-4 py-3 text-sm font-medium text-primary">
                You&apos;re subscribed. Welcome aboard!
              </p>
            ) : (
              <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1.5">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && subscribe()}
                  placeholder="you@email.com"
                  className="w-full bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/40"
                />
                <button
                  type="button"
                  onClick={subscribe}
                  aria-label="Subscribe"
                  className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition hover:bg-primary/80"
                >
                  <Send className="size-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} RealEstate, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/" className="transition hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer