import { Briefcase, Hammer, Palette, TrendingUp } from "lucide-react"

export function WhyNowSection() {
  return (
    <section className="py-24 md:py-32 border-b border-border">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="space-y-16">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Why This Matters Now</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Knowledge workers, frontline staff, and creative teams are drowning in fragmented tools. Interlay helps
              them work across systems with less friction and more control.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <Briefcase className="h-10 w-10 text-primary" />
              <h3 className="text-lg font-semibold">Knowledge Workers</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Juggling 10+ apps daily, losing context with every switch, fighting tool fragmentation.
              </p>
            </div>

            <div className="space-y-3">
              <Hammer className="h-10 w-10 text-primary" />
              <h3 className="text-lg font-semibold">Frontline Teams</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Need simple, integrated workflows without technical complexity or vendor lock-in.
              </p>
            </div>

            <div className="space-y-3">
              <Palette className="h-10 w-10 text-primary" />
              <h3 className="text-lg font-semibold">Creative Professionals</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Want malleable tools that adapt to their process, not rigid apps that constrain creativity.
              </p>
            </div>

            <div className="space-y-3">
              <TrendingUp className="h-10 w-10 text-primary" />
              <h3 className="text-lg font-semibold">Growing Movement</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Local-first, malleable, interoperable software is gaining momentum across the industry.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-semibold">The Time Horizon Problem</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Consumer apps have short lifespans. When they shut down, your data becomes useless. We need durable,
                  resilient systems built for the long term—not quarterly earnings.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="text-6xl font-bold text-primary/20">∞</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
