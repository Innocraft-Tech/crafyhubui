import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { Human } from "@/assets"

export function ProjectSlider() {
  return (
    <Carousel className="w-full max-w-full" opts={{
        align: "start",
        loop: true,
      }}>
      <CarouselContent>
          <CarouselItem>
             <Image src={Human} alt="Hummans"/>
          </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
