import React from "react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const features = [
    {
      title: "Database Generation",
      description: "Generate database as per company needs.",
      image: "/img2.png"
    },
    {
      title: "Student profile",
      description: "Create and Update student profile.",
      image: "/img3.png"
    },
    {
      title: "Dashboards for management",
      description: "Management of your progress made easy.",
      image: "/image.png"
    }
  ];
  

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-34 px-4 ">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 break-words max-w-3xl">
  Welcome to 
</h1>
<h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-500 via-[#3c8c84] to-indigo-500 bg-clip-text text-transparent animate-text-shine">
  TNP Management platform of IGDTUW
</h1>
        
        <p className="text-lg md:text-xl mb-6 max-w-2xl">
        Powering Placements at IGDTUW with Precision.
        </p>
      <Link to="/SignUp">  <Button className="text-lg px-12 py-6 mt-12 bg-[#3c8c84]" >Get Started</Button></Link>
      </section>



     {/* Carousel Section */}
<section className="py-20 px-4">
    <h1 className="text-center font-bold mb-4 text-3xl pb-4"> Features</h1>
  <Carousel
    plugins={[
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
      }),
    ]}
    className="w-full max-w-5xl mx-auto"
  >
    <CarouselContent>
      {features.map((feature, index) => (
        <CarouselItem
          key={index}
          className="px-4"
        >
          <div className="flex flex-col md:flex-row items-center border rounded-2xl shadow-lg overflow-hidden p-6">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full md:w-1/2 h-64 object-contain"
            />
            <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left md:w-1/2">
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className=" text-lg">{feature.description}</p>
            </div>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>
</section>

       
      
    </div>
  );
}