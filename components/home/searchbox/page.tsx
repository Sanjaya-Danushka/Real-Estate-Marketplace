import { Button } from "@base-ui/react"
import React from "react"

const SearchBox = () => {
  return (
    <div className="mt-10 rounded-[30px] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-2xl">
      <div className="flex flex-col items-center gap-4 lg:flex-row">
        <input
          type="text"
          placeholder="Search by city, neighborhood, or address"
          className="h-14 w-full flex-1 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white transition outline-none placeholder:text-white/50 focus:border-primary/40"
        />
        <Button className="h-14 rounded-2xl bg-primary px-6 font-medium text-white transition hover:bg-primary/90">
          Search Properties
        </Button>
      </div>
    </div>
  )
}

export default SearchBox
