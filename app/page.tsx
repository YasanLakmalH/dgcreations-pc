"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { GemIcon, Paintbrush, Award } from "lucide-react";
import DesignBanner from "@/components/designBanner";
import Testimonials from "@/components/testimonials";

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
];

const featuredProducts = [
  {
    id: 1,
    name: "Modern Pantry Cupboard",
    image: "/gallery/pantry3.webp",
    category: "Pantry",
  },
  {
    id: 2,
    name: "Elegant Dining Set",
    image: "/gallery/dining.webp",
    category: "Pantry",
  },
  {
    id: 3,
    name: "Settyback",
    image: "/gallery/setyback.webp",
    category: "Furniture",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="overflow-hidden h-full">
          <div className="flex h-full">
            <div className="relative h-full w-full">
              <Image
                src={heroSlides[2].image}
                alt={heroSlides[2].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="text-center text-white space-y-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-bold"
                  >
                    {heroSlides[2].title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-md md:text-lg lg:text-xl"
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
                        Explore Our Works
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DesignBanner />

      {/* Featured Products */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <a href="/products">
                  <Card className="overflow-hidden group">
                    <CardContent className="p-0">
                      <div className="relative h-48 md:h-64">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-md md:text-lg font-semibold">{product.name}</h3>
                        <p className="text-sm md:text-base text-muted-foreground">{product.category}</p>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Premium Quality",
                description: "Handcrafted with the finest materials for lasting beauty",
                icon: <GemIcon />,
              },
              {
                title: "Custom Design",
                description: "Tailored solutions to match your unique style and space",
                icon: <Paintbrush />,
              },
              {
                title: "Expert Installation",
                description: "Professional installation by our skilled craftsmen",
                icon: <Award />,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-4 sm:p-6 rounded-lg shadow-lg bg-stone-200"
              >
                <span className="flex justify-center py-3 text-4xl text-primary">{feature.icon}</span>
                <h3 className="text-lg md:text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
}
