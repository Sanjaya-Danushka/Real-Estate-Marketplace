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
      className="group relative h-125 overflow-hidden rounded-4xl"
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

        {/* top badge */}
        <div className="absolute top-5 left-5 z-20 rounded-full bg-white/80 px-4 py-2 text-sm">
          {property.status}
        </div>
        {/* content card*/}
        <div className="absolute right-5 bottom-5 left-5 z-20 rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
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
              <p className="mt-1 text-sm font-medium text-white">
                {property.location}
              </p>
            </div>
            <div className="rounded-xl bg-white/10 px-2 py-2 text-sm text-amber-50">
              {property.type}
            </div>
          </div>
          <h2 className="mt-5 text-2xl font-bold text-white">
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
