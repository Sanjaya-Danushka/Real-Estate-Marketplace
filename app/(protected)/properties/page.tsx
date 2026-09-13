import FrontendLayout from "@/components/layout/frontendLayout"
import Navbar from "@/components/navbar/page"
import PropertyCard from "@/components/properties/propertyCard/page"
import properties from "@/constants/dummyProperty"

import React from "react"

const PropertiesPage = () => {
  return (
    <FrontendLayout>
      <Navbar variant={"solid"} />
      <div className="mx-auto w-full max-w-7xl p-6 lg:px-12">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Properties</h2>
        </div>
        <div className="my-6 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </FrontendLayout>
  )
}

export default PropertiesPage
