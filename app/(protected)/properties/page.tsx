import FrontendLayout from "@/components/layout/frontendLayout"
import Navbar from "@/components/navbar/page"
import PropertiesToolbar from "@/components/properties/propertiesToolbar/page"
import PropertyGrid from "@/components/properties/propertyGrid/page"
import { db } from "@/lib/db"
import { Building2, KeyRound, MapPin, SlidersHorizontal } from "lucide-react"

interface PropertiesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const PropertiesPage = async ({ searchParams }: PropertiesPageProps) => {
  const { q, status } = await searchParams
  const query = typeof q === "string" ? q : undefined
  const statusFilter =
    status === "For Sale" || status === "For Rent" ? status : undefined

  const [total, forSale, forRent, locations] = await Promise.all([
    db.property.count(),
    db.property.count({ where: { status: "For Sale" } }),
    db.property.count({ where: { status: "For Rent" } }),
    db.property.groupBy({ by: ["location"] }),
  ])

  const stats = [
    { icon: Building2, label: "Total Listings", value: total },
    { icon: KeyRound, label: "For Sale", value: forSale },
    { icon: SlidersHorizontal, label: "For Rent", value: forRent },
    { icon: MapPin, label: "Locations", value: locations.length },
  ]

  return (
    <FrontendLayout>
      <Navbar variant="transparent" />

      {/* header band */}
      <header className="bg-linear-to-br from-slate-950 via-indigo-950 to-primary/60 pb-20">
        <div className="mx-auto max-w-7xl px-6 pt-28 lg:px-12">
          <p className="mb-4 text-sm font-semibold tracking-[0.25em] text-primary uppercase">
            Property Listings
          </p>
          <h1 className="max-w-3xl text-4xl font-bold text-white md:text-5xl">
            Browse Our Full Collection Of Properties
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
            Explore every home, apartment, villa, and commercial space available
            on our marketplace — search by location, filter by sale or rent, and
            find the place that fits your lifestyle.
          </p>

          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
              >
                <stat.icon className="size-6 text-primary" />
                <p className="mt-3 text-3xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* search toolbar overlapping the band */}
      <PropertiesToolbar initialQuery={query ?? ""} initialStatus={statusFilter ?? "All"} />

      {/* results */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
        <p className="text-sm text-text/50">
          Showing all matching listings across our marketplace
        </p>
        <PropertyGrid q={query} status={statusFilter} />
      </div>
    </FrontendLayout>
  )
}

export default PropertiesPage
