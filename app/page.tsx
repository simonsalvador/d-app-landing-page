"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Users,
  MapPin,
  Settings,
  Calendar,
  MessageCircle,
  Trophy,
  Star,
  ChevronLeft,
  ChevronRight,
  Mail,
} from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import Navbar from "@/components/navbar"

// Counter animation hook
function useCountUp(end: number, duration = 2000) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
      let startTime: number | null = null
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration, hasAnimated])

  return { count, ref }
}

function StatCounter({ value, label, suffix, index }: { value: number; label: string; suffix: string; index: number }) {
  const { count, ref } = useCountUp(value)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-lg sm:text-xl text-white/90">{label}</div>
    </motion.div>
  )
}

export default function LandingPage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    })
  }, [emblaApi])

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  const stats = [
    { value: 50000, label: "Usuarios Activos", suffix: "+" },
    { value: 10000, label: "Eventos Creados", suffix: "+" },
    { value: 450, label: "Deportes Disponibles", suffix: "+" },
  ]

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
  ]

  const faqs = [
    {
      question: "¿Qué es D+?",
      answer:
        "D+ es una plataforma deportiva que conecta a deportistas, espectadores y organizadores de eventos en un solo lugar. Podés descubrir competencias, inscribirte fácilmente, seguir tus deportes favoritos y concectar con una enorme comunidad. Además, si sos organizador, podés crear y publicar tus propios eventos para que otros deportistas se unan.",
  },
    {
      question: "¿Cómo creo un evento en D+?",
      answer:
        'Crear un evento es simple: descarga la app, regístrate, toca "Crear Evento", completa los detalles (deporte, descripción, ubicación, fecha, hora), y publica. Tu evento será visible instantáneamente para usuarios cercanos.',
    },
    {
      question: "¿Puedo usar D+ para eventos gratuitos y pagos?",
      answer:
        "Sí, D+ soporta tanto eventos gratuitos como pagos.",
    },
    {
      question: "¿Cómo encuentro eventos cerca de mí?",
      answer:
        "Usa nuestra búsqueda inteligente basada en ubicación. Filtra por deporte, distancia, fecha y nivel de habilidad. La app muestra eventos de forma interactiva para que encuentres la actividad perfecta cerca de ti.",
    },
    {
      question: "¿Qué deportes están disponibles en D+?",
      answer:
        "D+ soporta más de 400 deportes y actividades: fútbol, running, yoga, ciclismo, natación, tenis, baloncesto, y más. Si tu deporte no está listado, puedes sugerirlo y lo agregaremos.",
    },
    {
      question: "¿Cómo me inscribo en un evento?",
      answer:
        'Entrá al evento que te interesa y tocá "Inscribirme". Si el evento tiene pago, podrás completarlo directamente desde la app o a través del enlace del organizador.',
    },
    {
      question: "¿Puedo filtrar los eventos por fecha o ubicación?",
      answer:
        "Sí, podés aplicar filtros por nombre, ubicación, rango de fechas, deporte o etiquetas. Así encontrás fácilmente los eventos que se ajustan a tus intereses.",
    },
    {
      question: "Soy organizador, ¿puedo publicar mis eventos?",
      answer:
        "Sí. D+ ofrece herramientas para organizadores: podés publicar eventos, gestionar inscripciones y destacar tus actividades con mayor visibilidad en la plataforma.",
    },
    {
      question: "¿Puedo acceder a D+ desde el celular?",
      answer:
        "Sí. D+ está disponible como app móvil y también podés acceder desde cualquier navegador en tu teléfono o computadora.",
    },
    {
      question: "¿Qué hago si veo un error o información incorrecta?",
      answer:
        "Podés reportar el evento desde la app o escribirnos directamente a soporte. Revisamos todos los reportes manualmente para mantener la información actualizada.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20"
      >
        <div className="absolute inset-0">
          <Image
            src="/dynamic-sports-action-athletes-running-jumping.jpg"
            alt="Atletas en acción"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/85 to-background/90" />
        </div>
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/10"
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance"
            >
              Conectá con tu <span className="text-primary">comunidad deportiva</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-12 text-pretty max-w-3xl mx-auto"
            >
              Descubrí, creá y participá en eventos deportivos cerca tuyo. Desde fútbol hasta yoga, D+ conecta atletas y
              organizadores en una sola plataforma.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-8 py-6 text-lg w-full sm:w-auto"
                asChild
              >
                <Link href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  Obtené en Google Play
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg w-full sm:w-auto bg-background/80 backdrop-blur-sm"
                asChild
              >
                <Link href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                 <img
                  src="/IconApple.png"
                  alt="Apple App Store"
                  width={18}
                  height={18}
                  className="mr-2 relative top-[-2px]"
                  />
                  Descargá en App Store
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="caracteristicas" className="py-16 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
              El mundo deportivo <span className="text-primary">simplificado</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Entendemos los desafíos que enfrentan atletas y organizadores. Por eso construimos D+.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Users,
                title: "Comunidades Dispersas",
                tagline: "D+ conecta todo",
                description:
                  "No más grupos dispersos en diferentes plataformas. Reuní toda tu comunidad deportiva en un espacio unificado.",
              },
              {
                icon: MapPin,
                title: "Eventos Difíciles de Encontrar",
                tagline: "Descubrí al instante",
                description:
                  "Encontrá eventos deportivos locales, torneos y actividades cerca tuyo con búsqueda inteligente basada en ubicación.",
              },
              {
                icon: Settings,
                title: "Gestión Complicada",
                tagline: "Organizá con facilidad",
                description:
                  "Herramientas optimizadas para crear, gestionar y promocionar tus eventos sin la molestia de sistemas complejos.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-primary font-semibold mb-3">{item.tagline}</p>
                    <p className="text-muted-foreground flex-grow">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Para Organizadores */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">
                Para <span className="text-primary">Organizadores</span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 text-pretty">
                Creá y gestioná eventos deportivos sin esfuerzo. Desde torneos locales hasta ligas a gran escala, D+ te
                da las herramientas para tener éxito.
              </p>
              <ul className="space-y-4">
                {[
                  {
                    icon: Calendar,
                    text: "Configuración de eventos en minutos",
                  },
                  {
                    icon: Users,
                    text: "Gestión de participantes integrada",
                  },
                  {
                    icon: MessageCircle,
                    text: "Comunicación en tiempo real",
                  },
                  { icon: Trophy, text: "Seguimiento y análisis de rendimiento" },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-lg">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <Image
                src="/d-plus-mockup-organizador.png"
                alt="D+ App para Organizadores"
                width={800}
                height={600}
                className="rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl mx-auto"
              />
            </motion.div>
          </div>

          {/* Para Participantes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center order-2 lg:order-1"
            >
              <Image
                src="/d-plus-mockup-participantes.png"
                alt="D+ App para Participantes"
                width={800}
                height={600}
                className="rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl mx-auto"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">
                Para <span className="text-primary">Participantes</span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 text-pretty">
                Descubrí nuevas actividades deportivas, conectá con atletas afines y llevá tu juego al siguiente nivel.
              </p>
              <ul className="space-y-4">
                {[
                  {
                    icon: MapPin,
                    text: "Descubrí eventos cerca tuyo",
                  },
                  {
                    icon: Users,
                    text: "Conectá con tu comunidad deportiva",
                  },
                  {
                    icon: Calendar,
                    text: "Registro y pago sin complicaciones",
                  },
                  {
                    icon: Trophy,
                    text: "Seguí tu progreso y logros",
                  },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-lg">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-16"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base md:text-lg"
              asChild
            >
              <Link href="#descargar">
                <span className="hidden sm:inline">Unite como organizador o participante</span>
                <span className="sm:hidden">Unite ahora!</span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="comunidad"
        className="py-16 sm:py-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
              Amado por la <span className="text-white">Comunidad</span>
            </h2>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto text-pretty">
              Unite a miles de atletas y organizadores que confían en D+ para sus actividades deportivas.
            </p>
          </motion.div>

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
                          "{testimonial.text}"
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

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 sm:mt-24">
            {stats.map((stat, index) => (
              <StatCounter key={index} value={stat.value} label={stat.label} suffix={stat.suffix} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="preguntas" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
              Preguntas <span className="text-primary">Frecuentes</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground text-pretty">Todo lo que necesitás saber sobre D+</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg sm:text-xl">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-base sm:text-lg text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-lg text-muted-foreground mb-4">¿Aún tenés preguntas?</p>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white bg-transparent px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base"
              asChild
            >
              <Link href="mailto:soporte@dplus.com">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="hidden sm:inline">Contactá a nuestro equipo de soporte</span>
                <span className="sm:hidden">Contactar soporte</span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="descargar" className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/sports-celebration-victory-athletes.jpg"
            alt="Celebración deportiva"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-background/95" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Empezá tu viaje deportivo <span className="text-primary">hoy</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-12 text-pretty">
              Unite a miles de atletas y organizadores. Descargá D+ y transformá tu experiencia deportiva.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-8 py-6 text-lg w-full sm:w-auto"
                  asChild
                >
                  <Link href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    Obtené en Google Play
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg w-full sm:w-auto bg-transparent"
                  asChild
                >
                  <Link href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                    <img
                      src="/IconApple.png"
                      alt="Apple App Store"
                      width={18}
                      height={18}
                      className="mr-2 relative top-[-2px]"
                    />
                    Descargá en App Store
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-2xl sm:text-3xl font-bold text-primary hover:scale-105 transition-transform"
                aria-label="Go to home">
                  <Image
                    src="/LogoD+.png"       
                    alt="D+ Logo"
                    width={64} 
                    height={64}        
                    priority
                    className="object-contain"
                  />
              </button>
              <p className="text-muted-foreground">Conectando comunidades deportivas en todo el mundo.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Producto</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#caracteristicas" className="text-muted-foreground hover:text-primary transition-colors">
                    Características
                  </Link>
                </li>
                <li>
                  <Link href="#comunidad" className="text-muted-foreground hover:text-primary transition-colors">
                    Comunidad
                  </Link>
                </li>
                <li>
                  <Link href="#preguntas" className="text-muted-foreground hover:text-primary transition-colors">
                    Preguntas
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Carreras
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Términos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 D+. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
