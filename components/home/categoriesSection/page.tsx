import { Building, Building2, Castle, House, Map, Store } from "lucide-react"
import Link from "next/link"
import Reveal from "@/components/ui/reveal"

const categories = [
  { icon: Building2, label: "Apartments", count: "320 listings" },
  { icon: House, label: "Houses", count: "260 listings" },
  { icon: Castle, label: "Villas", count: "140 listings" },
  { icon: Building, label: "Condos", count: "180 listings" },
  { icon: Map, label: "Land", count: "95 listings" },
  { icon: Store, label: "Commercial", count: "75 listings" },
]

const CategoriesSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
      <Reveal>
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-primary uppercase">
            Browse by Type
          </p>
          <h2 className="text-3xl font-bold text-text md:text-4xl">
            Explore Our Property Categories
          </h2>
          <p className="mt-5 leading-relaxed text-text/60">
            From city apartments to countryside estates, find the perfect
            match for your next move.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map(({ icon: Icon, label, count }, index) => (
          <Reveal key={label} delay={index * 80}>
            <Link
              href="/marketplace"
              className="group flex flex-col items-center gap-3 rounded-4xl border border-slate-200 bg-white p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-muted/50 hover:shadow-lg"
            >
              <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                <Icon className="size-7" />
              </span>
              <span className="font-semibold text-text">{label}</span>
              <span className="text-xs font-medium text-text/50">{count}</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default CategoriesSection