// import React, { useState, useEffect } from "react";

// const amenities = [
//   {
//     title: "Access to 10 Locations",
//     desc: "Daily programming with video descriptions are available through our app. Athletes can post scores, track progress, and interact with others in the community.",
//   },
//   {
//     title: "24/7 Open Gym",
//     desc: "Train anytime, day or night. All branches are fully equipped and accessible round the clock.",
//   },
//   {
//     title: "Virtual Programming",
//     desc: "Follow guided workouts remotely with expert explanations and structured training plans.",
//   },
//   {
//     title: "Showers and Towel Service",
//     desc: "Clean showers and fresh towels available at all locations for your comfort.",
//   },
//   {
//     title: "Top Notch Coaching",
//     desc: "Train with certified coaches who provide guidance, correction, and progress tracking.",
//   },
//   {
//     title: "Class Variety",
//     desc: "Strength, Tabata, Yoga, Conditioning, and more — a broad range of group classes.",
//   },
// ];
// const classesData = [
//   {
//     title: "Tabata",
//     desc:
//       "High-intensity interval workouts designed to push your limits and boost endurance.",
//     icon: "⚡",
//   },
//   {
//     title: "Strength Training",
//     desc:
//       "Build muscle, improve posture, and increase strength with expert coaching.",
//     icon: "🏋️",
//   },
//   {
//     title: "Yoga",
//     desc:
//       "Improve flexibility, balance, and mindfulness through guided practice.",
//     icon: "🧘",
//   },
//   {
//     title: "HIIT",
//     desc:
//       "Fast-paced calorie-burning workouts combining strength and cardio.",
//     icon: "🔥",
//   },
//   {
//     title: "CrossFit",
//     desc:
//       "Functional training that builds power, agility, and total-body fitness.",
//     icon: "💪",
//   },
//   {
//     title: "Mobility & Recovery",
//     desc:
//       "Improve movement, reduce injury risk, and recover faster.",
//     icon: "🩹",
//   },
// ];

// // ----------------- LOCATIONS DATA -----------------
// const locations = [
//   { name: "Lekki Phase 1", city: "Lagos" },
//   { name: "Ikeja GRA", city: "Lagos" },
//   { name: "Yaba", city: "Lagos" },
//   { name: "Victoria Island", city: "Lagos" },
//   { name: "Jabi", city: "Abuja" },
//   { name: "Wuse 2", city: "Abuja" },
//   { name: "Garki", city: "Abuja" },
//   { name: "GRA Phase 2", city: "Port Harcourt" },
//   { name: "Peter Odili Road", city: "Port Harcourt" },
//   { name: "Uyo Central District", city: "Uyo" },
// ];

// const Home: React.FC = () => {
//   const images = [
//     "images/topgymcover.png",
//     "images/cover.jpg",
//     "images/workoutimg.jpg",
//   ];

//   const [, setIndex] = useState(0);
//   const [activeAmenity, setActiveAmenity] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % images.length);
//     }, 6000);
//     return () => clearInterval(interval);
//   }, [images.length]);

//   return (
//     <div className="w-full overflow-hidden bg-white text-gray-900">

// <div className="relative w-full h-[450px] sm:h-[550px] md:h-[650px] overflow-hidden">
//   {/* Slider */}
//   <div className="overflow-hidden w-full h-full relative">
//     <div className="flex animate-slideLeft">
//       {[...images, ...images].map((img, i) => (
//         <img
//           key={i}
//           src={img}
//           alt=""
//           className="w-full h-full object-cover flex-shrink-0 opacity-70"
//         />
//       ))}
//     </div>
//   </div>
// <div className="absolute inset-0 bg-black/40 flex flex-col justify-between px-4 py-6 opacity-70">
//   {/* Centered h1 */}
//   <div className="flex flex-col items-center justify-center flex-1">
//     <h1 className="text-white text-3xl text-center sm:text-5xl font-bold tracking-wider">
//       CROSSFIT | HIIT | 24/7 OPEN GYM <br />
//       <br />
//       NUTRITION | YOGA
//     </h1>
//   </div>

//   <div className="flex flex-col items-center mb-6">
//     <h3 className="text-white text-2xl text-center sm:text-3xl font-bold tracking-wider mb-4">
//       www.topfitgym.com
//     </h3>

//    <button
//   type="submit"
//   onClick={() => {}}
//   disabled={false}
//   className="w-[200px] bg-gray-700 hover:bg-gray-600 cursor-pointer text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
// >
//   REGISTER
// </button>

//   </div>
// </div>

// </div>

//       {/* <section className="w-full py-20 px-6 sm:px-12">
//         <h2 className="text-3xl text-green-800 font-bold text-center mb-16 tracking-wide">
//           AMENITIES
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
//           <div className="flex flex-col space-y-8 text-xl">
//             {amenities.map((item, i) => (
//               <button
//                 key={i}
//                 onClick={() => setActiveAmenity(i)}
//                 className={`font-semibold tracking-wide text-left transition
//                 ${
//                   activeAmenity === i
//                     ? "text-green-800"
//                     : "text-gray-800 hover:text-green-800"
//                 }`}
//               >
//                 {item.title.toUpperCase()}
//               </button>
//             ))}
//           </div>

//           <div className="relative pl-10">
//             <div className="absolute left-0 top-0 h-full border-l-2 border-dotted border-green-800"></div>

//             <p className="text-lg leading-relaxed">
//               {amenities[activeAmenity].desc}
//             </p>
//           </div>
//         </div>
//       </section> */}
// <section className="w-full py-14 sm:py-20 px-4 sm:px-8 md:px-12">
//   <h2 className="text-2xl sm:text-3xl text-green-800 font-bold text-center mb-10 sm:mb-16 tracking-wide">
//     AMENITIES
//   </h2>

//   <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
//     {/* Left list */}
//     <div className="flex flex-col space-y-5 sm:space-y-6 text-base sm:text-lg">
//       {amenities.map((item, i) => (
//         <button
//           key={i}
//           onClick={() => setActiveAmenity(i)}
//           className={`font-semibold tracking-wide text-left transition-colors duration-300
//             ${
//               activeAmenity === i
//                 ? "text-green-800"
//                 : "text-gray-700 hover:text-green-800"
//             }`}
//         >
//           {item.title.toUpperCase()}
//         </button>
//       ))}
//     </div>

//     {/* Right description */}
//     <div className="relative md:pl-10">
//       {/* Vertical line — desktop only */}
//       <div className="hidden md:block absolute left-0 top-0 h-full border-l-2 border-dotted border-green-800"></div>

//       <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-800">
//         {amenities[activeAmenity].desc}
//       </p>
//     </div>
//   </div>
// </section>
// <section className="py-16 sm:py-20 px-4 sm:px-8 md:px-12 bg-white">
//   <h1 className="text-2xl sm:text-3xl font-extrabold mb-14 text-green-800 text-center tracking-wide">
//     CLASSES
//   </h1>

//   <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//     {classesData.map((item, i) => (
//       <div
//         key={i}
//         className="group border border-gray-200 rounded-2xl p-6 sm:p-8 bg-white
//                    shadow-sm hover:shadow-xl transition-all duration-300
//                    transform hover:-translate-y-2"
//       >
//         {/* Icon */}
//         <div className="text-4xl mb-4">{item.icon}</div>

//         {/* Title */}
//         <h2 className="text-lg sm:text-xl font-semibold text-green-800 group-hover:text-green-900">
//           {item.title}
//         </h2>

//         {/* Description */}
//         <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
//           {item.desc}
//         </p>

//         {/* Button */}
//         <button
//           className="mt-6 w-full border-2 border-green-800 text-green-800
//                      py-2.5 rounded-lg font-semibold tracking-wide
//                      transition-all duration-300
//                      group-hover:bg-green-800 group-hover:text-white"
//         >
//           VIEW SCHEDULE
//         </button>
//       </div>
//     ))}
//   </div>
// </section>

//       {/* <section className="py-16 px-6 sm:px-12 bg-white">
//         <h1 className="text-3xl font-bold mb-10 text-green-800 text-center">
//           CLASSES
//         </h1>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           <div className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
//             <h2 className="text-xl font-semibold text-green-800">Tabata</h2>
//             <p className="mt-2 text-gray-600">
//               High-intensity interval workouts designed to push your limits.
//             </p>
//           </div>

//           <div className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
//             <h2 className="text-xl font-semibold text-green-800">
//               Strength Training
//             </h2>
//             <p className="mt-2 text-gray-600">
//               Build muscle, improve posture, and increase endurance with our
//               expert coaches.
//             </p>
//           </div>

//           <div className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
//             <h2 className="text-xl font-semibold text-green-800">Yoga</h2>
//             <p className="mt-2 text-gray-600">
//               Improve flexibility, balance, and mindfulness through guided
//               practice.
//             </p>
//           </div>
//         </div>
//       </section> */}

//       <div className="px-6 sm:px-12 py-20">
//         <h1 className="text-3xl font-semibold mb-10 text-center text-green-800">
//           LOCATIONS
//         </h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {locations.map((loc, i) => (
//             <div
//               key={i}
//               className="border p-6 rounded-xl shadow-sm hover:shadow-md transition"
//             >
//               <h3 className="text-xl font-bold">{loc.name}</h3>
//               <p className="text-gray-600">{loc.city}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import HeroSection from "./HeroSection";
import Amenities from "./Amenities";
import Classes from "./Classes";
import Locations from "./Locations";

const Home: React.FC = () => {
  return (
    <div className="w-full overflow-hidden bg-white text-gray-900">
      <HeroSection />
      <Amenities />
      <Classes />
      <Locations />
    </div>
  );
};

export default Home;
