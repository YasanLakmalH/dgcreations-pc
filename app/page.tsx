"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { motion } from "framer-motion"
import Testimonials from "@/components/testimonials"
import useEmblaCarousel from "embla-carousel-react"

const heroSlides = [
  {
    image: "/heroimgs/hero1.jpg",
    title: "Modern Living",
    description: "Discover our premium collection of contemporary furniture",
  },
  {
    image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099",
    title: "Pantry Excellence",
    description: "Custom pantry solutions for your dream kitchen",
  },
  {
    image: "/heroimgs/HeroImg3.webp",
    title: "Luxury Design",
    description: "Elevate your space with our signature collections",
  },
]

const featuredProducts = [
  {
    id: 1,
    name: "Modern Pantry System",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    category: "Pantry",
  },
  {
    id: 2,
    name: "Elegant Dining Set",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200",
    category: "Furniture",
  },
  {
    id: 3,
    name: "Storage Solutions",
    image: "https://images.unsplash.com/photo-1595514535215-8a5b64b2b681",
    category: "Pantry",
  },
]

export default function Home() {


  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="overflow-hidden h-full">
          <div className="flex h-full">
              <div className="relative h-full flex-[0_0_100%]">
                <Image
                  src={heroSlides[2].image}
                  alt={heroSlides[2].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white space-y-4 p-4">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-4xl md:text-6xl font-bold"
                    >
                      {heroSlides[2].title}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-lg md:text-xl"
                    >
                      {heroSlides[2].description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <Link href="/gallery">
                        <Button size="lg" className="mt-4">
                          Explore Collection
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden group">
                  <CardContent className="p-0">
                    <div className="relative h-64">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-muted-foreground">{product.category}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Quality",
                description: "Handcrafted with the finest materials for lasting beauty",
              },
              {
                title: "Custom Design",
                description: "Tailored solutions to match your unique style and space",
              },
              {
                title: "Expert Installation",
                description: "Professional installation by our skilled craftsmen",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-6 hover:bg-muted/50 rounded-lg transition-colors duration-300"
              >
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />
    </div>
  )
}