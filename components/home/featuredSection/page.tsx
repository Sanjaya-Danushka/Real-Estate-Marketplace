import { Sparkles } from "lucide-react"
import PropertyCard from "@/components/properties/propertyCard/page"
import Reveal from "@/components/ui/reveal"
import { db } from "@/lib/db"

const FeaturedSection = async () => {
  const properties = await db.property.findMany({
    where: { featured: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  })

  if (properties.length === 0) return null

  return (
    <section className="bg-secondary">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <Reveal>
          <div className="flex items-center gap-3">
            <Sparkles className="size-6 text-primary" />
            <p className="text-sm font-semibold tracking-[0.25em] text-primary uppercase">
              Featured Listings
            </p>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            Handpicked Premium Properties
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/60">
            Our team curates standout homes worth putting on your shortlist —
            from exclusive villas to prime commercial spaces.
          </p>
        </Reveal>
        <Reveal delay={100} className="mt-10">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default FeaturedSection