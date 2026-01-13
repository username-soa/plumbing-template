import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { TypographyH2 } from "@/components/ui/typography"

export function CTASection() {
  return (
    <section className="w-full py-24 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/plumbing-cta-bg.png"
          alt="Professional Plumbing Service"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="max-w-2xl text-white">
            <TypographyH2 className="text-3xl md:text-5xl font-bold border-none tracking-tight">
              Join Thousands of Happy Clients and Book Today
            </TypographyH2>
            <p className="mt-4 text-white/90 text-lg md:text-xl font-light">
              Reliable, efficient, and professional plumbing services are just a click away.
            </p>
          </div>
          
          <div className="shrink-0">
            <Button 
              size="default" 
              variant="secondary" 
              className="font-bold text-lg px-8 py-6 h-auto shadow-2xl hover:shadow-xl transition-all hover:scale-105 rounded-full bg-white text-primary hover:bg-white/90"
              asChild
            >
              <Link href="/contact">
                Book Service Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
