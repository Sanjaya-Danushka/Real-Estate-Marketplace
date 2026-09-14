"use client"

import { useSyncExternalStore } from "react"
import {
  getMergedProperties,
  subscribeSavedProperties,
} from "@/lib/propertyStore"
import PropertyCard from "@/components/properties/propertyCard/page"

const PropertyGrid = () => {
  const list = useSyncExternalStore(
    subscribeSavedProperties,
    getMergedProperties,
    getMergedProperties
  )

  return (
    <div className="my-6 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {list.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}

export default PropertyGrid