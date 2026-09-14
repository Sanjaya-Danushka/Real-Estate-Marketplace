"use client"

import { type Property } from "@prisma/client"
import { useState } from "react"
import PropertyCard from "@/components/properties/propertyCard/page"

const TABS = ["All", "For Sale", "For Rent"] as const

interface ListingTabsProps {
  properties: Property[]
}

const ListingTabs = ({ properties }: ListingTabsProps) => {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All")

  const list =
    tab === "All" ? properties : properties.filter((p) => p.status === tab)

  return (
    <div>
      <div className="mb-8 flex w-fit items-center rounded-full bg-secondary/5 p-1 ring-1 ring-slate-200">
        {TABS.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={tab === item}
            onClick={() => setTab(item)}
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${
              tab === item
                ? "bg-primary text-white shadow-sm"
                : "text-text/60 hover:text-text"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {list.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {list.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <p className="rounded-3xl border border-dashed border-slate-300 py-16 text-center text-text/50">
          No {tab.toLowerCase()} properties right now.
        </p>
      )}
    </div>
  )
}

export default ListingTabs