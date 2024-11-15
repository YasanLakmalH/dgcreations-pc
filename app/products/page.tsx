"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const products = [
  {
    id: 1,
    name: "Luxury Sofa Set",
    category: "Living Room",
    price: "$2,999",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    description: "Premium leather sofa with modern design",
  },
  {
    id: 2,
    name: "Modern Dining Table",
    category: "Dining Room",
    price: "$1,499",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200",
    description: "Elegant dining table for 6 people",
  },
  {
    id: 3,
    name: "Pantry Organization System",
    category: "Kitchen",
    price: "$899",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    description: "Complete pantry organization solution",
  },
  {
    id: 4,
    name: "Executive Office Desk",
    category: "Office",
    price: "$1,299",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd",
    description: "Professional office desk with storage",
  },
  {
    id: 5,
    name: "Kitchen Cabinet Set",
    category: "Kitchen",
    price: "$3,499",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba",
    description: "Modern kitchen cabinet system",
  },
  {
    id: 6,
    name: "Bedroom Suite",
    category: "Bedroom",
    price: "$4,999",
    image: "https://images.unsplash.com/photo-1505693314120-0d443867891c",
    description: "Complete bedroom furniture set",
  },
]

const categories = ["All", "Living Room", "Dining Room", "Kitchen", "Office", "Bedroom"]
const sortOptions = ["Price: Low to High", "Price: High to Low", "Name: A to Z", "Name: Z to A"]

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState(sortOptions[0])

  const filteredProducts = products
    .filter((product) => selectedCategory === "All" || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "Price: Low to High":
          return parseInt(a.price.replace(/\D/g, "")) - parseInt(b.price.replace(/\D/g, ""))
        case "Price: High to Low":
          return parseInt(b.price.replace(/\D/g, "")) - parseInt(a.price.replace(/\D/g, ""))
        case "Name: A to Z":
          return a.name.localeCompare(b.name)
        case "Name: Z to A":
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Our Products</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of premium furniture and storage solutions
          </p>
        </div>
      </section>

      {/* Filters and Sort */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="min-w-[100px]"
              >
                {category}
              </Button>
            ))}
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                    <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                    <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{product.price}</span>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
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