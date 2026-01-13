import * as React from "react"
import Image from "next/image"
import { Star } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { 
  TypographyH2, 
  TypographyH4, 
  TypographyMuted, 
  TypographySmall 
} from "@/components/ui/typography"
import { fetchGoogleReviews, GOOGLE_RATING, type Review } from "@/lib/google-reviews"

export async function ReviewSection() {
  const reviews = await fetchGoogleReviews()

  return (
    <section className="w-full py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-primary font-medium mb-4">
              <span className="uppercase tracking-wider text-sm">Testimonials</span>
            </div>
            <TypographyH2 className="text-4xl md:text-5xl font-bold border-none tracking-tight">
              Why People Love Us
            </TypographyH2>
          </div>
          
          <div className="flex items-center gap-4 bg-card px-6 py-3 rounded-full shadow-sm border">
            <div className="flex items-center justify-center p-2 bg-white rounded-full shadow-sm w-10 h-10">
               {/* Google G Logo Placeholder - Simple Text G or SVG */}
               <span className="font-bold text-xl text-blue-600">G</span>
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Google Rating</div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-foreground">{GOOGLE_RATING}</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="">
            {reviews.map((review) => (
              <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3 pl-6">
                <Card className="border-none shadow-md bg-card/50 h-full p-6">
                  <CardContent className="p-0 flex flex-col gap-6 h-full justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-background shadow-sm shrink-0">
                          <Image
                            src={review.authorImage}
                            alt={review.authorName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm uppercase tracking-wide text-foreground">{review.authorName}</h4>
                          <span className="text-xs text-muted-foreground">{review.relativeTime}</span>
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-lg mb-3">&quot;{review.title}&quot;</h3>
                      <p className="text-muted-foreground text-base leading-relaxed line-clamp-4">
                        {review.text}
                      </p>
                    </div>

                    <div className="flex gap-0.5 mt-auto pt-4 border-t border-border/50 w-full">
                       {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-between mt-8 md:mt-12 px-2">
            <TypographySmall className="text-muted-foreground">
              See what our customers are saying
            </TypographySmall>
            <div className="flex gap-2">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </div>
        </Carousel>

      </div>
    </section>
  )
}
