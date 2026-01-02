import React, {useState} from  "react";

const amenities = [
  {
    title: "Access to 10 Locations",
    desc: "Daily programming with video descriptions are available through our app. Athletes can post scores, track progress, and interact with others in the community.",
  },
  {
    title: "24/7 Open Gym",
    desc: "Train anytime, day or night. All branches are fully equipped and accessible round the clock.",
  },
  {
    title: "Virtual Programming",
    desc: "Follow guided workouts remotely with expert explanations and structured training plans.",
  },
  {
    title: "Showers and Towel Service",
    desc: "Clean showers and fresh towels available at all locations for your comfort.",
  },
  {
    title: "Top Notch Coaching",
    desc: "Train with certified coaches who provide guidance, correction, and progress tracking.",
  },
  {
    title: "Class Variety",
    desc: "Strength, Tabata, Yoga, Conditioning, and more — a broad range of group classes.",
  },
];

const Amenities: React.FC = () => {
     const [activeAmenity, setActiveAmenity] = useState(0);
  return (
  <section className="w-full py-14 sm:py-20 px-4 sm:px-8 md:px-12">
  <h2 className="text-2xl sm:text-3xl text-green-800 font-bold text-center mb-10 sm:mb-16 tracking-wide">
    AMENITIES
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
    {/* Left list */}
    <div className="flex flex-col space-y-5 sm:space-y-6 text-base sm:text-lg">
      {amenities.map((item, i) => (
        <button
          key={i}
          onClick={() => setActiveAmenity(i)}
          className={`font-semibold tracking-wide text-left transition-colors duration-300
            ${
              activeAmenity === i
                ? "text-green-800"
                : "text-gray-700 hover:text-green-800"
            }`}
        >
          {item.title.toUpperCase()}
        </button>
      ))}
    </div>

    {/* Right description */}
    <div className="relative md:pl-10">
      {/* Vertical line — desktop only */}
      <div className="hidden md:block absolute left-0 top-0 h-full border-l-2 border-dotted border-green-800"></div>

      <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-800">
        {amenities[activeAmenity].desc}
      </p>
    </div>
  </div>
</section>
  )
}

export default Amenities