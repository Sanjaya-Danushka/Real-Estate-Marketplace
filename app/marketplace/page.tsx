import React from "react"
import FrontendLayout from "../../components/layout/frontendLayout"
import Navbar from "@/components/navbar/page"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal, X } from "lucide-react"
import Link from "next/link"
import PropertyGrid from "@/components/properties/propertyGrid/page"

interface MarketPlaceProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const MarketPlace = async ({ searchParams }: MarketPlaceProps) => {
  const { q, status } = await searchParams
  const query = typeof q === "string" ? q : undefined
  const statusFilter = typeof status === "string" ? status : undefined
  const hasFilters = Boolean(query || statusFilter)

  return (
    <FrontendLayout>
      <Navbar variant={"solid"} />
      <div className="mx-auto w-full max-w-7xl p-6 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Explore</h2>
            {hasFilters && (
              <p className="mt-1 text-sm text-text/60">
                Showing{" "}
                <span className="font-medium text-text">
                  {query || "all locations"}
                </span>
                {statusFilter ? ` · ${statusFilter}` : ""}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {hasFilters && (
              <Link
                href="/marketplace"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-text/60 transition hover:text-text"
              >
                <X className="size-4" />
                Clear filters
              </Link>
            )}
            <Button variant={"outline"} className={"text-[#5048E4]"}>
              <SlidersHorizontal size={24} />
              Filter
            </Button>
          </div>
        </div>
        <PropertyGrid q={query} status={statusFilter} />
      </div>
    </FrontendLayout>
  )
}

export default MarketPlace