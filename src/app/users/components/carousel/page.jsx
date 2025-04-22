"use client"; // Ensure it's a client-side component

import { useState, useEffect } from "react";
import Image from "next/image";

const Carousel = () => {
  const slides = [
    // "/carousel/image4.jpg",
    "/carousel/image5.webp",
    "/carousel/image2.jpeg",
    "/carousel/image3.jpg",

    // "/carousel/image6.jpg",

  ];

  const [current, setCurrent] = useState(0);
  const length = slides.length;

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 2000);
    return () => clearInterval(interval);
  }, [length]);

  return (
    <div className="relative w-full">
      {/* Carousel Wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {slides.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg w-[90%] "
              
            />
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 p-1 rounded-full"
        onClick={() => setCurrent(current === 0 ? length - 1 : current - 1)}
      >
        ❮
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 p-1 rounded-full"
        onClick={() => setCurrent((current + 1) % length)}
      >
        
        ❯
      </button>
    </div>
  );
};

export default Carousel;
