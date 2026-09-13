import React from "react"
import FrontendLayout from "../../components/layout/frontendLayout"
import Navbar from "@/components/navbar/page"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import properties from "@/constants/dummyProperty"
import PropertyCard from "@/components/properties/propertyCard/page"

const MarketPlace = () => {
  return (
    <FrontendLayout>
      <Navbar variant={"solid"} />
      <div className="mx-auto w-full max-w-7xl p-6 lg:px-12">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Explore</h2>
          <Button variant={"outline"} className={"text-[#5048E4]"}>
            <SlidersHorizontal size={24} />
            Filter
          </Button>
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

export default MarketPlace
