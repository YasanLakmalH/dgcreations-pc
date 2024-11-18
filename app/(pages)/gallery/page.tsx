"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const products = [
  {
    id: 1,
    name: "Modern Pantry System",
    image: "",
    category: "Pantry",
  },
  {
    id: 2,
    name: "Elegant Dining Set",
    image: "",
    category: "Furniture",
  },
  {
    id: 3,
    name: "Storage Solutions",
    image: "",
    category: "Pantry",
  },
  {
    id: 4,
    name: "Luxury Sofa",
    image: "",
    category: "Furniture",
  },
  {
    id: 5,
    name: "Kitchen Cabinet System",
    image: "",
    category: "Pantry",
  },
  {
    id: 6,
    name: "Modern Bedroom Set",
    image: "",
    category: "Furniture",
  },
]

const categories = ["All", "Furniture", "Pantry"]

export default function Collection() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProducts = products.filter(
    (product) => selectedCategory === "All" || product.category === selectedCategory
  )

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Our Works</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collection of premium furniture and pantry solutions,
            designed to transform your living space.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center space-x-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              layout
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
    </div>
  )
}