import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { 
  TypographyH2, 
  TypographyH3,
  TypographyH4, 
  TypographyMuted,
  TypographySmall 
} from "@/components/ui/typography"

const STATS = [
  {
    value: "10+",
    label: "Years of Experience",
    description: "Over the years, we've earned the trust of hundreds of homeowners and businesses by delivering consistent, high-quality plumbing solutions."
  },
  {
    value: "99%",
    label: "Customer Satisfaction",
    description: "Our experienced team takes pride in every job, using safe and eco-friendly products to create healthier, efficient systems."
  },
  {
    value: "10K+",
    label: "Happy Clients",
    description: "From on-time service to exceptional attention to detail, our commitment to excellence is reflected in our client satisfaction."
  }
]

const CARDS = [
  {
    title: "Built on Trust, Powered by Service",
    image: "/about-trust.png"
  },
  {
    title: "Making Efficient Flow Our Promise",
    image: "/about-team.png"
  },
  {
    title: "Your Trusted Plumbing Experts",
    image: "/about-expert.png"
  }
]

export function AboutSection() {
  return (
    <section className="w-full py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-primary font-medium mb-4">
              <span className="uppercase tracking-wider text-sm">About Us</span>
            </div>
            <TypographyH2 className="text-4xl md:text-5xl font-bold border-none tracking-tight leading-tight">
              At FlowMasters we believe a reliable plumbing system creates a <span className="text-primary">happier and healthier life.</span>
            </TypographyH2>
          </div>
          <div className="w-full lg:w-auto">
             <Button size="lg" className="rounded-full px-8 h-12 text-base font-semibold shadow-lg hover:scale-105 transition-transform" asChild>
              <Link href="/about">
                Learn More About Us
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {STATS.map((stat, index) => (
            <div key={index} className="flex flex-col gap-3">
              <span className="text-5xl font-bold tracking-tighter text-foreground">{stat.value}</span>
              <TypographyH4 className="font-bold text-lg">{stat.label}</TypographyH4>
              <TypographyMuted className="text-base leading-relaxed">
                {stat.description}
              </TypographyMuted>
            </div>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CARDS.map((card, index) => (
            <div key={index} className="group relative h-[400px] w-full float-left rounded-3xl overflow-hidden cursor-pointer">
              <Image 
                src={card.image} 
                alt={card.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 text-white group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
                <h3 className="text-white text-xl font-bold leading-snug max-w-[80%] group-hover:translate-x-2 transition-transform">
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
