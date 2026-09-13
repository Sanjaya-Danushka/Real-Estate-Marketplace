import { InputForm } from "@/components/emailForm/page"
import FrontendLayout from "@/components/layout/frontendLayout"
import Navbar from "@/components/navbar/page"
import { Angle, Bath, BedDouble, MapPin } from "lucide-react"
import Image from "next/image"
import React from "react"

const ProperyPage = () => {
  return (
    <FrontendLayout>
      <Navbar variant={"solid"} />
      <section className="py-15">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {/* left */}
          <div className="flex flex-col justify-between gap-8 lg:flex-row">
            <p className="text-sm font-semibold tracking-[0.25em] text-primary uppercase">
              For Sale
            </p>
            <h2 className="mt-3 text-4xl font-bold text-text md:text-5xl">
              Modern Luxuray Apratment
            </h2>
            {/* right */}
            <div className="rounded-[28px] border border-black/5 p-3">
              <p className="text-sm text-text">Propert Price</p>
              <h2 className="mt-2 text-4xl font-bold text-primary">
                $1,500,000
              </h2>
            </div>
          </div>
          <div className="flex-wrap items-center gap-3 md:flex md:flex-row">
            <div className="my-6 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
              <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1">
                <MapPin size={16} className="text-neutral-400" />
                <span className="font-medium text-neutral-900">
                  Manhattan,New York
                </span>
              </div>
            </div>
            <div className="my-6 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
              <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1">
                <Angle size={16} className="text-neutral-400" />
                <span className="font-medium text-neutral-900">2200 sqrt</span>
              </div>
            </div>
            <div className="my-6 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
              <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1">
                <BedDouble size={16} className="text-neutral-400" />
                <span className="font-medium text-neutral-900">7 rooms</span>
              </div>
            </div>
            <div className="my-6 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
              <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1">
                <Bath size={16} className="text-neutral-400" />
                <span className="font-medium text-neutral-900">2 baths</span>
              </div>
            </div>
          </div>
          <div className="relative my-6 h-60 w-full md:h-100 lg:h-120">
            <Image
              src="/image1.jpg"
              alt="property"
              fill
              className="rounded-2xl object-cover"
            />
          </div>
          <div className="flex flex-col justify-between gap-6 lg:col-span-2 lg:flex-row">
            {/* left */}
            <div>
              <div className="rounded-4xl border border-black/5 p-3">
                <h2>About This Property</h2>
                <p className="mt-6 text-justify leading-relaxed text-text/70">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Suscipit temporibus amet, in et, delectus dolores ab nostrum
                  ex explicabo exercitationem tenetur, saepe necessitatibus
                  eaque accusamus sapiente. Quam dicta eligendi voluptas.
                </p>
              </div>
            </div>

            {/* right */}
            <InputForm />
          </div>
        </div>
      </section>
    </FrontendLayout>
  )
}

export default ProperyPage
