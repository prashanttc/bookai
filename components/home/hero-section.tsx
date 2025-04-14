  "use client"

  import { useEffect, useState } from "react"
  import Image from "next/image"
  import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
  import { Button } from "@/components/ui/button"
  import type { HeroSlide } from "@/types/type"

  interface HeroSectionProps {
    slides: HeroSlide[]
  }

  export function HeroSection({ slides }: HeroSectionProps) {
    const [currentSlide, setCurrentSlide] = useState(0)

    const nextSlide = () => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }

    const prevSlide = () => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    }
    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide()
      }, 5000)
  
      return () => clearInterval(interval)
    }, [currentSlide])
    return (
      <section className="relative">
        <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover " />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                <div className="px-6 md:px-10 max-w-xl text-white">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{slide.title}</h1>
                  <p className="mb-6 text-white/80">{slide.description}</p>
                  <Button className="gap-2 rounded-full px-6">
                    {slide.cta} <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </Button>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? "bg-white w-6" : "bg-white/50"}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }
