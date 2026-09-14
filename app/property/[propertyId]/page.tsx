import { InputForm } from "@/components/emailForm/page"
import FrontendLayout from "@/components/layout/frontendLayout"
import Navbar from "@/components/navbar/page"
import PropertyCard from "@/components/properties/propertyCard/page"
import { db } from "@/lib/db"
import {
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  MapPin,
  Ruler,
} from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface PropertyPageProps {
  params: Promise<{ propertyId: string }>
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { propertyId } = await params
  const property = await db.property.findUnique({
    where: { id: Number(propertyId) },
  })
  return {
    title: property
      ? `${property.title} · ${property.location}`
      : "Property not found",
    description: property?.description,
  }
}

const PropertyPage = async ({ params }: PropertyPageProps) => {
  const { propertyId } = await params
  const id = Number(propertyId)
  if (Number.isNaN(id)) notFound()

  const property = await db.property.findUnique({ where: { id } })
  if (!property) notFound()

  const similar = await db.property.findMany({
    where: { type: property.type, id: { not: property.id } },
    orderBy: { createdAt: "desc" },
    take: 3,
  })

  const facts = [
    { icon: BedDouble, label: "Bedrooms", value: `${property.bedrooms}` },
    { icon: Bath, label: "Bathrooms", value: `${property.bathrooms}` },
    { icon: Ruler, label: "Area", value: `${property.area.toLocaleString()} sqft` },
    { icon: Building2, label: "Type", value: property.type },
    {
      icon: CalendarDays,
      label: "Listed",
      value: new Date(property.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
    },
  ]

  const highlights = [
    "Prime location within walking distance of amenities",
    "Modern design with premium high-quality finishes",
    "Bright, spacious interiors with abundant natural light",
    "Secure neighborhood with 24/7 access",
    "Close to public transport and major highways",
    "Great potential for long-term appreciation",
  ]

  return (
    <FrontendLayout>
      <Navbar variant={"solid"} />
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
        {/* breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text/50">
          <Link href="/" className="transition hover:text-primary">
            Home
          </Link>
          <ChevronRight className="size-4" />
          <Link href="/marketplace" className="transition hover:text-primary">
            Marketplace
          </Link>
          <ChevronRight className="size-4" />
          <span className="max-w-48 truncate font-medium text-text">
            {property.title}
          </span>
        </nav>

        {/* header */}
        <div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                {property.status}
              </span>
              <span className="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-text/70">
                {property.type}
              </span>
            </div>
            <h1 className="mt-4 text-4xl font-bold text-text md:text-5xl">
              {property.title}
            </h1>
            <div className="mt-3 flex items-center gap-2 text-text/60">
              <MapPin className="size-5 text-primary" />
              <span className="font-medium">{property.location}</span>
            </div>
          </div>

          {/* price card */}
          <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
            <p className="text-sm text-text/50">Property Price</p>
            <h2 className="mt-1 text-4xl font-bold text-primary">
              ${property.price.toLocaleString()}
              {property.status !== "For Sale" && (
                <span className="text-xl font-semibold">/mo</span>
              )}
            </h2>
          </div>
        </div>

        {/* hero image */}
        <div className="relative mt-8 h-72 w-full overflow-hidden rounded-4xl sm:h-100 lg:h-130">
          <Image
            src={property.image}
            alt={property.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* quick facts */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="flex items-center gap-4 rounded-3xl border border-black/5 bg-white p-5 shadow-sm"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <fact.icon className="size-6 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs text-text/50">{fact.label}</p>
                <p className="truncate font-bold text-text">{fact.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* body */}
        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          {/* left */}
          <div className="lg:col-span-2">
            <div className="rounded-4xl border border-black/5 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-text">About This Property</h2>
              {property.description ? (
                <p className="mt-5 leading-relaxed text-text/70">
                  {property.description}
                </p>
              ) : (
                <p className="mt-5 leading-relaxed text-text/70">
                  Discover this exceptional {property.type.toLowerCase()} in{" "}
                  {property.location}. Featuring {property.bedrooms} bedrooms and{" "}
                  {property.bathrooms} bathrooms across {property.area} sqft of
                  thoughtfully designed living space, this property blends modern
                  comfort with style. Experience serene surroundings, convenient
                  access to local amenities, and a lifestyle that balances
                  relaxation with connectivity.
                </p>
              )}

              {/* highlights */}
              <h3 className="mt-10 text-xl font-bold text-text">
                Key Highlights
              </h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="size-4 text-primary" />
                    </span>
                    <span className="text-sm text-text/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* right */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <InputForm />
          </div>
        </div>

        {/* similar */}
        {similar.length > 0 && (
          <section className="mt-16">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] text-primary uppercase">
                  Similar Listings
                </p>
                <h2 className="mt-2 text-3xl font-bold text-text">
                  More {property.type}s Nearby
                </h2>
              </div>
              <Link
                href="/marketplace"
                className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary transition hover:text-primary/80"
              >
                View all <ChevronRight className="size-4" />
              </Link>
            </div>
            <div className="mt-6 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {similar.map((item) => (
                <PropertyCard key={item.id} property={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </FrontendLayout>
  )
}

export default PropertyPage