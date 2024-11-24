"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CarouselSize } from "../components/Card"

export default function ScholarshipSearch() {
  const [selectedCategory, setSelectedCategory] = useState("popular")

  return (
    <div className="h-[80vh] mx-auto container">
      <div className="flex gap-4 mb-4">
        <Button
          variant={selectedCategory === "popular" ? "default" : "outline"}
          onClick={() => setSelectedCategory("popular")}
        >
          人気奨学金
        </Button>
        <Button
          variant={selectedCategory === "amount" ? "default" : "outline"}
          onClick={() => setSelectedCategory("amount")}
        >
          支給額ランキング
        </Button>
        <Button
          variant={selectedCategory === "applicants" ? "default" : "outline"}
          onClick={() => setSelectedCategory("applicants")}
        >
          募集人数
        </Button>
      </div>
      <CarouselSize category={selectedCategory} />
    </div>
  )
}

