import PropertyGrid from "@/components/properties/propertyGrid/page"
import React from "react"

const RecentProperties = () => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* header */}
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-primary uppercase">
            New Listings
          </p>
          <h2 className="text-3xl font-bold text-text md:text-4xl">
            Discover Our Latest Properties
          </h2>
          <p className="mt-5 leading-relaxed text-text/60">
            Browse the latest homes,aprtments,villas, and investments
            opprtunities addded to our marketplace by trusted property owners
            and agents
          </p>
        </div>

        {/* properties grid */}
        <PropertyGrid />
      </div>
    </section>
  )
}

export default RecentProperties
