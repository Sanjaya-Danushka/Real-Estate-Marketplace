import { MessageSquare, Search, Scale } from "lucide-react"
import Reveal from "@/components/ui/reveal"

const steps = [
  {
    icon: Search,
    title: "Search & Discover",
    description:
      "Filter through thousands of verified listings across the island and save the ones you love.",
  },
  {
    icon: Scale,
    title: "Compare & Shortlist",
    description:
      "Compare prices, locations, and amenities side by side to find the perfect match.",
  },
  {
    icon: MessageSquare,
    title: "Contact the Owner",
    description:
      "Reach out directly to schedule a visit, ask questions, or start the deal.",
  },
]

const HowItWorksSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-primary uppercase">
            How It Works
          </p>
          <h2 className="text-3xl font-bold text-text md:text-4xl">
            Find Your Next Property in Three Steps
          </h2>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {steps.map(({ icon: Icon, title, description }, index) => (
          <Reveal key={title} delay={index * 120}>
            <div className="group relative h-full overflow-hidden rounded-4xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
              <span className="absolute -top-4 -right-2 text-[7rem] leading-none font-black text-slate-100 transition group-hover:text-primary/10">
                {index + 1}
              </span>
              <span className="relative flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                <Icon className="size-7" />
              </span>
              <h3 className="relative mt-6 text-xl font-bold text-text">
                {title}
              </h3>
              <p className="relative mt-3 leading-relaxed text-text/60">
                {description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default HowItWorksSection