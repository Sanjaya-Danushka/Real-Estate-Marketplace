"use client"

import { Search, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const STATUSES = ["All", "For Sale", "For Rent"] as const

interface PropertiesToolbarProps {
  initialQuery: string
  initialStatus: string
}

const PropertiesToolbar = ({
  initialQuery,
  initialStatus,
}: PropertiesToolbarProps) => {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [status, setStatus] = useState(initialStatus)

  const push = (term: string, nextStatus: string) => {
    const params = new URLSearchParams()
    if (term.trim()) params.set("q", term.trim())
    if (nextStatus && nextStatus !== "All") {
      params.set("status", nextStatus)
    }
    const qs = params.toString()
    router.push(qs ? `/properties?${qs}` : "/properties")
  }

  const hasFilters = Boolean(query.trim() || status !== "All")

  return (
    <div className="relative z-10 mx-auto -mt-9 max-w-7xl px-6 lg:px-12">
      <div className="rounded-[30px] border border-black/5 bg-white p-4 shadow-xl shadow-slate-900/10">
        <form
          onSubmit={(event) => {
            event.preventDefault()
            push(query, status)
          }}
          className="flex flex-col items-center gap-4 lg:flex-row"
        >
          <div className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 focus-within:border-primary/40">
            <Search className="size-5 shrink-0 text-text/40" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by city, neighborhood, or address…"
              className="h-12 w-full flex-1 bg-transparent text-text outline-none placeholder:text-text/40"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setQuery("")
                  push("", status)
                }}
                className="text-text/40 transition hover:text-text"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="flex w-full items-center rounded-2xl bg-slate-100 p-1 lg:w-auto">
            {STATUSES.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={status === item}
                onClick={() => {
                  setStatus(item)
                  push(query, item)
                }}
                className={`rounded-xl px-5 py-2 text-sm font-semibold transition lg:whitespace-nowrap ${
                  status === item
                    ? "bg-primary text-white shadow-sm"
                    : "text-text/60 hover:text-text"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-8 font-medium text-white transition hover:bg-primary/90 lg:w-auto"
          >
            <Search className="size-4" />
            Search
          </button>
        </form>

        {hasFilters && (
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
            <p className="text-text/60">
              Filtering by{" "}
              <span className="font-medium text-text">
                {query || "all locations"}
              </span>
              {status !== "All" ? ` · ${status}` : ""}
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("")
                setStatus("All")
                push("", "All")
              }}
              className="flex items-center gap-1 font-semibold text-primary transition hover:text-primary/80"
            >
              <X className="size-4" />
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertiesToolbar
