// import React, { useCallback } from "react";
// import { useNavigate } from "react-router-dom";




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


// const Classes: React.FC = () => {
//   const navigate = useNavigate();


//   const goToClassSchedule = useCallback(() => {
//     navigate("/classes");
//   }, [navigate]);


//   return (
//    <section className="py-16 sm:py-20 px-4 sm:px-8 md:px-12 bg-white">
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
//         onClick={goToClassSchedule}
//           className="mt-6 w-full border-2 border-gray-800 text-gray-800
//                      py-2.5 rounded-lg font-semibold tracking-wide cursor-pointer
//                      transition-all duration-300
//                      group-hover:bg-gray-800 group-hover:text-white"
//         >
//           VIEW SCHEDULE
//         </button>
//       </div>
//     ))}
//   </div>
// </section>
//   )
// }

// export default Classes


import React from "react";
import Classcard from "../routes/dashboard/classes/Classcard";

const classesData = [
  {
    title: "Tabata",
    slug: "tabata",
    desc: "High-intensity interval workouts designed to push your limits and boost endurance.",
    icon: "⚡",
  },
  {
    title: "Strength Training",
    slug: "strength-training",
    desc: "Build muscle, improve posture, and increase strength with expert coaching.",
    icon: "🏋️",
  },
  {
    title: "Yoga",
    slug: "yoga",
    desc: "Improve flexibility, balance, and mindfulness through guided practice.",
    icon: "🧘",
  },
  {
    title: "HIIT",
    slug: "hiit",
    desc: "Fast-paced calorie-burning workouts combining strength and cardio.",
    icon: "🔥",
  },
  {
    title: "CrossFit",
    slug: "crossfit",
    desc: "Functional training that builds power, agility, and total-body fitness.",
    icon: "💪",
  },
  {
    title: "Mobility & Recovery",
    slug: "mobility-recovery",
    desc: "Improve movement, reduce injury risk, and recover faster.",
    icon: "🩹",
  },
];


const Classes: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-8 md:px-12 bg-white">
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-14 text-green-800 text-center tracking-wide">
        CLASSES
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {classesData.map((item) => (
          <Classcard
            key={item.slug}
            title={item.title}
            slug={item.slug}
            description={item.desc}
            icon={item.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default Classes;
