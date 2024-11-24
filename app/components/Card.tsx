"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

interface Scholarship {
  id: number
  title: string
  popular?: number
  amount?: number
  applicants?: number
}

const scholarships: Scholarship[] = [
  { id: 1, title: "奨学金A", popular: 1, amount: 100000, applicants: 500 },
  { id: 2, title: "奨学金B", popular: 2, amount: 150000, applicants: 300 },
  { id: 3, title: "奨学金C", popular: 3, amount: 80000, applicants: 1000 },
  { id: 4, title: "奨学金D", popular: 4, amount: 200000, applicants: 200 },
  { id: 5, title: "奨学金E", popular: 5, amount: 120000, applicants: 700 },
]

interface CarouselSizeProps {
  category: string
}

export function CarouselSize({ category }: CarouselSizeProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: true })
  )

  const getSortedScholarships = () => {
    switch (category) {
      case "popular":
        return [...scholarships].sort((a, b) => (a.popular || 0) - (b.popular || 0))
      case "amount":
        return [...scholarships].sort((a, b) => (b.amount || 0) - (a.amount || 0))
      case "applicants":
        return [...scholarships].sort((a, b) => (b.applicants || 0) - (a.applicants || 0))
      default:
        return scholarships
    }
  }

  const sortedScholarships = getSortedScholarships()

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
        {sortedScholarships.map((scholarship, index) => (
          <CarouselItem key={scholarship.id} className="basis-1/2 sm:basis-1/3">
            <Card className="h-48 bg-gray-100 sm:h-72">
              <CardHeader>
                <CardTitle>{scholarship.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <span className="text-3xl font-semibold">{index + 1}</span>
                {category === "popular" && (
                  <span className="mt-2">人気順位: {scholarship.popular}</span>
                )}
                {category === "amount" && (
                  <span className="mt-2">支給額: {scholarship.amount}円</span>
                )}
                {category === "applicants" && (
                  <span className="mt-2">募集人数: {scholarship.applicants}人</span>
                )}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute -left-0 top-1/2 -translate-y-1/2 sm:-left-4">
        <CarouselPrevious className="relative left-4 sm:left-0" />
      </div>
      <div className="absolute -right-0 top-1/2 -translate-y-1/2 sm:-right-4">
        <CarouselNext className="relative right-4 sm:right-0" />
      </div>
    </Carousel>
  )
}

