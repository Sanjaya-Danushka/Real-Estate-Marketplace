import PropertyCard from "@/components/properties/propertyCard/page"
import { db } from "@/lib/db"

const PropertyGrid = async () => {
  const properties = await db.property.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="my-6 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}

export default PropertyGrid