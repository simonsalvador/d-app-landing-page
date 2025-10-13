"use client";

import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCounters from "./StatCounters";

const testimonials = [
  {
    name: "Sarah Martínez",
    role: "Organizadora de Maratones",
    avatar: "SM",
    text: "D+ transformó cómo organizo eventos de running. El registro es fluido y las funciones de engagement son increíbles. Mi último maratón se agotó en 48 horas.",
    rating: 5,
  },
  {
      name: "James Chen",
      role: "Director de Liga de Baloncesto",
      text: "Gestionar nuestra liga comunitaria de baloncesto nunca ha sido tan fácil. Las herramientas de programación y las actualizaciones en tiempo real mantienen a todos informados. Un cambio de juego para deportes amateur.",
      avatar: "JC",
      rating: 5,
    },
    {
      name: "Emily Rodríguez",
      role: "Instructora de Yoga",
      text: "Uso D+ para promocionar mis sesiones de yoga al aire libre. El descubrimiento basado en ubicación me ayuda a llegar a nuevos estudiantes, y el procesamiento de pagos es seguro y directo.",
      avatar: "ER",
      rating: 5,
    },
];

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section id="comunidad" className="py-16 sm:py-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Amado por la <span className="text-white">Comunidad</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
            Unite a miles de atletas y organizadores que confían en D+ para sus actividades deportivas.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
                  <Card className="!bg-white dark:!bg-black border-0">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-lg sm:text-xl mb-6 text-gray-700 dark:text-gray-200 italic">
                        “{testimonial.text}”
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-lg text-gray-900 dark:text-white">{testimonial.name}</p>
                          <p className="text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === selectedIndex ? "bg-white w-8" : "bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <StatCounters />
      </div>
    </section>
  );
}