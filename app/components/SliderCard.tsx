"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CarouselSize } from "../components/Card"

const SliderCard = () => {
    const [selectedCategory, setSelectedCategory] = useState("popular")

  return (
    <div>
        <div className="flex gap-4 justify-center my-3">
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
      <div className="divider my-3 md:my-9"></div>
      <div>
        <h2 className="text-2xl font-bold my-1 text-center sm:text-4xl sm:my-3">奨学金一覧</h2>
      </div>
    </div>
  )
}

export default SliderCard;