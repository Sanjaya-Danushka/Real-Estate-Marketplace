import { type Property } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import React from "react"

interface PropertyCardProps {
  property: Property
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Link
      href={`/property/${property.id}`}
      className="group relative block h-125 overflow-hidden rounded-4xl"
    >
      <div className="relative h-full w-full">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="inset-0 object-cover transition duration-700 group-hover:scale-110"
        />
        {/* dark overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

        {/* top badges */}
        <div className="absolute top-5 right-5 left-5 z-20 flex items-center justify-between gap-3">
          <span className="shrink-0 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-text">
            {property.status}
          </span>
          <span className="max-w-[55%] shrink truncate rounded-full bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
            {property.type}
          </span>
        </div>

        {/* content card */}
        <div className="absolute right-5 bottom-5 left-5 z-20 rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-2xl">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              {property.status === "For Sale" ? (
                <h3 className="flex items-center text-2xl font-bold text-white">
                  ${property.price.toLocaleString()}
                </h3>
              ) : (
                <h3 className="flex items-center text-2xl font-bold text-white">
                  ${property.price.toLocaleString()}
                  <span className="ml-2 text-sm font-medium">/mo</span>
                </h3>
              )}
              <p className="mt-1 truncate text-sm font-medium text-white/80">
                {property.location}
              </p>
            </div>
          </div>
          <h2 className="mt-5 truncate text-2xl font-bold text-white">
            {property.title}
          </h2>

          {/* features */}
          <div className="mt-5 flex flex-wrap gap-3 border-t border-white/10 pt-5 text-amber-50">
            <div className="rounded-full bg-white/10 px-4 py-2 text-sm">
              {property.bedrooms} Beds
            </div>
            <div className="rounded-full bg-white/10 px-4 py-2 text-sm">
              {property.bathrooms} Bathrooms
            </div>
            <div className="rounded-full bg-white/10 px-4 py-2 text-sm">
              {property.area} sqft
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PropertyCard