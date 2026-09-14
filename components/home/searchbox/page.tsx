"use client"

import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const STATUSES = ["Buy", "Rent"] as const

const SearchBox = () => {
  const router = useRouter()
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("Buy")
  const [query, setQuery] = useState("")

  const submit = (term = query) => {
    const params = new URLSearchParams()
    if (term.trim()) params.set("q", term.trim())
    params.set("status", status === "Rent" ? "For Rent" : "For Sale")
    router.push(`/marketplace?${params.toString()}`)
  }

  return (
    <div className="mt-10 rounded-[30px] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-2xl">
      {/* status toggle */}
      <div className="mb-4 flex w-fit items-center rounded-full bg-white/10 p-1">
        {STATUSES.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={status === item}
            onClick={() => setStatus(item)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              status === item
                ? "bg-primary text-white shadow-sm"
                : "text-white/70 hover:text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          submit()
        }}
        className="flex flex-col items-center gap-4 lg:flex-row"
      >
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={`Search ${status === "Buy" ? "homes to buy" : "places to rent"} by city, neighborhood, or address`}
          className="h-14 w-full flex-1 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white transition outline-none placeholder:text-white/50 focus:border-primary/40"
        />
        <button
          type="submit"
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 font-medium text-white transition hover:bg-primary/90 lg:w-auto"
        >
          <Search className="size-5" />
          Search Properties
        </button>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
        <span className="font-medium text-white/80">Popular:</span>
        {["Colombo", "Negombo", "Kandy", "Galle", "Bentota"].map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => {
              setQuery(city)
              submit(city)
            }}
            className="transition hover:text-white"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchBox