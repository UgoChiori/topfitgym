import React, { useState, useEffect } from "react";




const HeroSection: React.FC = () => {
      const [, setIndex] = useState(0);
     const images = [
    "images/topgymcover.png",
    "images/cover.jpg",
    "images/workoutimg.jpg",
  ];

    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, 6000);
      return () => clearInterval(interval);
    }, [images.length]);
  
  return (

        <div className="relative w-full h-[450px] sm:h-[550px] md:h-[650px] overflow-hidden">
 
  <div className="overflow-hidden w-full h-full relative">
    <div className="flex animate-slideLeft">
      {[...images, ...images].map((img, i) => (
        <img
          key={i}
          src={img}
          alt=""
          className="w-full h-full object-cover flex-shrink-0 opacity-70"
        />
      ))}
    </div>
  </div>
<div className="absolute inset-0 bg-black/40 flex flex-col justify-between px-4 py-6 opacity-70">
 
  <div className="flex flex-col items-center justify-center flex-1">
    <h1 className="text-white text-3xl text-center sm:text-5xl font-bold tracking-wider">
      CROSSFIT | HIIT | 24/7 OPEN GYM <br />
      <br />
      NUTRITION | YOGA
    </h1>
  </div>


  <div className="flex flex-col items-center mb-6">
    <h3 className="text-white text-2xl text-center sm:text-3xl font-bold tracking-wider mb-4">
      www.topfitgym.com
    </h3>

   <button
  type="submit"
  onClick={() => {}}
  disabled={false}
  className="w-[200px] bg-gray-700 hover:bg-gray-600 cursor-pointer text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
>
  REGISTER
</button>

  
   
  
  </div>
</div>

 
</div>


  )
}

export default HeroSection