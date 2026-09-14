import FrontendLayout from "@/components/layout/frontendLayout"
import Navbar from "@/components/navbar/page"
import PropertyGrid from "@/components/properties/propertyGrid/page"

import React from "react"

const PropertiesPage = () => {
  return (
    <FrontendLayout>
      <Navbar variant={"solid"} />
      <div className="mx-auto w-full max-w-7xl p-6 lg:px-12">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Properties</h2>
        </div>
        <PropertyGrid />
      </div>
    </FrontendLayout>
  )
}

export default PropertiesPage
