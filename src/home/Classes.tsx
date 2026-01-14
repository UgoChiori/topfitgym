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
