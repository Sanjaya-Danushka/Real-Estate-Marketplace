import React from "react"
import FrontendLayout from "../../components/layout/frontendLayout"
import Navbar from "@/components/navbar/page"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import PropertyGrid from "@/components/properties/propertyGrid/page"

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
        <PropertyGrid />
      </div>
    </FrontendLayout>
  )
}

export default MarketPlace
