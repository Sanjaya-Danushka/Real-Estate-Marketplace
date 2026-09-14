import { Building2, HandCoins, MapPin, Users } from "lucide-react"
import Reveal from "@/components/ui/reveal"

const stats = [
  { icon: Building2, value: "1,200+", label: "Properties Listed" },
  { icon: MapPin, value: "48", label: "Cities & Regions" },
  { icon: Users, value: "900+", label: "Happy Owners" },
  { icon: HandCoins, value: "$240M", label: "Transactions Closed" },
]

const StatsSection = () => {
  return (
    <section className="bg-secondary">
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 px-6 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:px-12">
        {stats.map(({ icon: Icon, value, label }, index) => (
          <Reveal key={label} delay={index * 100}>
            <div className="flex items-center gap-4 px-2 py-8">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-primary">
                <Icon className="size-6" />
              </span>
              <div>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-sm text-white/60">{label}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default StatsSection