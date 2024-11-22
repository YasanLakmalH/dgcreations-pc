"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Suboda Ranawaka",
    role: "Homeowner",
    image: "",
    content: `🤎🤎🤎I wanted to take a moment to express
            my heartfelt thanks for the incredible work
            you've done in transforming my home. Your
            expertise and attention to detail have truly brought a modern, beautiful touch to my old house. 
            I am beyond thrilled with the results and appreciate all the effort your team put into every aspect of the project. I wanted to thank you for the amazing work
            you've done on my home. I'm so happy with the results and appreciate all your hardwork ....💐💐💐🤎🤎`,
  },
  {
    id: 2,
    name: "Jayamani Rasanthika",
    role: "Homeowner",
    image: "",
    content: `The best place to get done your pantry cupboards. 
              I highly recommend Dimantha at DG creation to anyone who seeks for a reliable and high quality service.
              The service was top notch and his designs are unique and
              surprisingly affordable. I wasn't even in Sri Lanka while he
              handled my job, yet he delivered the work to my utmost
              satisfaction`,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-8 md:py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-center mb-6 sm:text-2xl md:text-3xl md:mb-8">
          What Our Clients Say
        </h2>
        <div className="relative h-full md:h-96">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full mx-2 sm:mx-0">
                <CardContent className="flex flex-col items-center justify-center h-full p-4 sm:p-6 md:p-8 text-center">
                  <Avatar className="w-12 h-12 mb-3 sm:w-16 sm:h-16 md:w-20 md:h-20">
                    <AvatarImage
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                    />
                    <AvatarFallback>
                      {testimonials[currentIndex].name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm mb-2 sm:text-base sm:mb-3 md:text-lg md:mb-4 italic">
                    {testimonials[currentIndex].content}
                  </p>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base md:text-lg">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-xs text-muted-foreground sm:text-sm md:text-base">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                  
                </CardContent>
              </Card>
            </motion.div>
  
          </AnimatePresence>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 mt-2 pt-28">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
        
      </div>
      
    </section>
  );
}
