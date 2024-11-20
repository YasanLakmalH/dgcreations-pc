"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const products = [
  { 
    id: 1,
    name: "Bottle Rack",
    category: "Kitchen Room",
    image: "/Products/BottleRack/1.webp",
    description: 'Stylish and space-saving storage for your bottles',

  },
  {
    id: 2,
    name: "Dining Table",
    category: "Dining Room",
    image: "/Products/DiningTable/7.webp",
    description: 'Integrated dining solution for compact spaces',
  },
  {
    id: 3,
    name: "Oven Cupboard",
    category: "Kitchen",
    image: "/Products/OvenCup/3.webp",
    description: 'Dedicated space for seamless oven placement',
  },
  {
    id: 4,
    name: "Refrigerator Cabinet", 
    category: "Kitchen",
    image: "/Products/RefrigeratorCup/11.webp",
    description: "designed integrate a refrigerator seamlessly into a kitchen",
  },
  {
    id: 5,
    name: "Sety Back",
    category: "Living Room",
    image: "/Products/SetyBack/15.webp",
    description: "decorative or functional wall-mounted panel",
  },
  {
    id: 6,
    name: "Shop Tables",
    category: "Shop",
    image: "/Products/ShopTables/19.webp",
    description: "designed for retail spaces assist in workspace activities.",
  },
  {
    id: 7,
    name: "Storage Compartment",
    category: "Office",
    image: "/Products/StorageCompartments/13.webp",
    description: "organize and store items",
  },
  {
    id: 8,
    name: "TV Wall Panel",
    category: "Living Room",
    image: "/Products/TVWallPanel/4.webp",
    description: "stylish and functional designed to mount and display a television",
  },
];

const categories = ["All", "Living Room", "Dining Room", "Kitchen", "Office", "Shop"];
const sortOptions = ["Name: A to Z", "Name: Z to A"];

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState(sortOptions[0]);

  const filteredProducts = products
    .filter(
      (product) =>
        selectedCategory === "All" || product.category === selectedCategory
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "Name: A to Z":
          return a.name.localeCompare(b.name);
        case "Name: Z to A":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Our Products</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Browse our collection of premium products.
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
                className={`min-w-[100px] ${selectedCategory === category ? "bg-primary text-white" : ""}`}
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
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

