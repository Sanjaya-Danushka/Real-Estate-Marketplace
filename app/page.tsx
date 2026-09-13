import RecentProperties from "@/components/home/recentProperties/page"
import SearchBox from "@/components/home/searchbox/page"
import FrontendLayout from "@/components/layout/frontendLayout"
import Navbar from "@/components/navbar/page"
import React from "react"

const page = () => {
  return (
    <FrontendLayout>
      <Navbar variant="transparent" />
      <section
        className="relative flex min-h-screen items-center overflow-hidden bg-cover py-2 pt-32 lg:pt-36"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/80 via-slate-900/50 to-transparent" />
        {/* content */}
        <div className="relative z-10 w-full">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            {/* badge */}
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm font-medium tracking-wide text-white">
                  Premium Real Estate Marketplace
                </span>
              </div>
              {/* heading */}
              <h2 className="text-4xl leading-tight font-bold text-white md:text-6xl lg:text-7xl">
                Find The Perfect Place To Call Home
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
                Dicover Luxury apartments, modern homes,and premium properties
                in the best location around the world
              </p>
              <SearchBox />
            </div>
          </div>
        </div>
      </section>
      <RecentProperties />
    </FrontendLayout>
  )
}

export default page
