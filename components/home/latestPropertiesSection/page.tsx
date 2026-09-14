import { ArrowRight } from "lucide-react"
import Link from "next/link"
import ListingTabs from "@/components/home/listingTabs/page"
import Reveal from "@/components/ui/reveal"
import { db } from "@/lib/db"

const LatestPropertiesSection = async () => {
  const properties = await db.property.findMany({
    orderBy: { createdAt: "desc" },
    take: 8,
  })

  return (
    <section className="bg-muted/40 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-primary uppercase">
                New Listings
              </p>
              <h2 className="text-3xl font-bold text-text md:text-4xl">
                Discover Our Latest Properties
              </h2>
              <p className="mt-5 leading-relaxed text-text/60">
                Browse the newest homes, apartments, villas, and investments
                added to our marketplace by trusted owners and agents.
              </p>
            </div>
            <Link
              href="/marketplace"
              className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-text transition hover:border-primary hover:text-primary"
            >
              View all properties
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
        <Reveal delay={100} className="mt-10">
          <ListingTabs properties={properties} />
        </Reveal>
      </div>
    </section>
  )
}

export default LatestPropertiesSection