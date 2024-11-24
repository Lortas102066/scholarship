"use client"
import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle  } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"


export function CarouselSize() {
    const plugin = React.useRef(
        Autoplay({ delay: 2500, stopOnInteraction: true })
      )
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/2 sm:basis-1/3">
              <Card className="h-48 bg-gray-500 sm:h-64">
                <CardHeader>
                    <CardTitle>奨学金</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
        <div className="absolute -left-4 top-1/2 -translate-y-1/2">
          <CarouselPrevious className="relative left-4 sm:left-0" />
        </div>
        <div className="absolute -right-4 top-1/2 -translate-y-1/2">
          <CarouselNext className="relative right-4 sm:right-0" />
        </div>
    </Carousel>
  )
}
