import { type Prisma } from "@prisma/client"
import PropertyCard from "@/components/properties/propertyCard/page"
import { db } from "@/lib/db"

export interface PropertyFilters {
  q?: string
  status?: string
}

const PropertyGrid = async ({ q, status }: PropertyFilters = {}) => {
  const where: Prisma.PropertyWhereInput = {
    ...(status ? { status } : {}),
    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { location: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
  }

  const properties = await db.property.findMany({
    where,
    orderBy: { createdAt: "desc" },
  })

  if (properties.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-slate-300 py-16 text-center text-text/50">
        No properties match your search. Try a different location or status.
      </p>
    )
  }

  return (
    <div className="my-6 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}

export default PropertyGrid