"use client"

import { ArrowRight, Home } from "lucide-react"
import { useAddProperty } from "@/components/properties/addPropertyModal/page"
import Reveal from "@/components/ui/reveal"

const CtaBanner = () => {
  const { openAddProperty } = useAddProperty()

  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-12">
      <Reveal>
        <div className="relative overflow-hidden rounded-4xl bg-primary px-8 py-16 text-center md:px-16">
          {/* decorative circles */}
          <div className="pointer-events-none absolute -top-20 -left-20 size-64 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -right-24 -bottom-24 size-80 rounded-full bg-white/10" />

          <div className="relative">
            <Home className="mx-auto size-10 text-white/80" />
            <h2 className="mt-5 text-3xl font-bold text-white md:text-5xl">
              Own a property? List it with us.
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/75">
              Reach thousands of buyers and renters across the country. Create
              your listing in minutes and start getting inquiries today.
            </p>
            <button
              type="button"
              onClick={openAddProperty}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-primary shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Add your property
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export default CtaBanner