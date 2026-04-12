// import React from 'react';
// import { Link } from 'react-router-dom';

// const Classes: React.FC = () => {
//   return (
//     <div className="min-h-screen py-16 sm:py-24 px-6 sm:px-12 bg-white">
//       {/* Main Heading */}
//       <h1 className="max-w-4xl mx-auto text-2xl sm:text-4xl font-black mb-16 text-gray-900 text-center tracking-tight leading-tight uppercase">
//         Please select a section <br className="hidden sm:block" /> to view details
//       </h1>

//       {/* Navigation Grid */}
//       <div className="grid gap-6 sm:grid-cols-2 lg:max-w-4xl mx-auto">
        
//         <Link 
//           to="/sessions" 
//           className="group flex flex-col justify-between p-8 h-48 bg-gray-50 rounded-2xl border border-transparent hover:border-green-800 transition-all duration-300"
//         >
//           <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">01</span>
//           <div className="flex justify-between items-end">
//             <span className="text-xl sm:text-2xl font-extrabold text-green-900 group-hover:translate-x-2 transition-transform duration-300">
//               View Class Sessions
//             </span>
//             <span className="text-2xl">→</span>
//           </div>
//         </Link>

//         <Link 
//           to="/arena-booking" 
//           className="group flex flex-col justify-between p-8 h-48 bg-gray-50 rounded-2xl border border-transparent hover:border-green-800 transition-all duration-300"
//         >
//           <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">02</span>
//           <div className="flex justify-between items-end">
//             <span className="text-xl sm:text-2xl font-extrabold text-green-900 group-hover:translate-x-2 transition-transform duration-300">
//               Book The Arena
//             </span>
//             <span className="text-2xl">→</span>
//           </div>
//         </Link>

//       </div>
      
//       {/* Branding Footer */}
//       <div className="mt-20 text-center">
//         <p className="text-[10px] tracking-[0.4em] text-gray-300 uppercase font-bold">
//           U|YAI Lifestyle Collective
//         </p>
//       </div>
//     </div>
//   )
// }

// export default Classes;

import React from 'react';
import { Link } from 'react-router-dom';

// 1. Import your images (Adjust these paths to your actual assets)
// import classSessionsImg from '../assets/class_sessions.jpg'; 
import topgymcover from '/images/topgymcover.png';
import courtimage from '/images/courtimage.png';

const Classes: React.FC = () => {
  // 2. Data structure to keep the JSX clean
  const sections = [
    {
      id: '01',
      title: "View Class Sessions",
      path: "/sessions",
      image: topgymcover, // Use imported image variable
    },
    {
      id: '02',
      title: "Book The Arena",
      path: "/arena-booking",
      image: courtimage, // Use imported image variable
     
    }
  ];

  return (
    // Set the overall page background to almost green-800 for high-end contrast
    <div className="min-h-screen py-16 sm:py-24 px-6 sm:px-12 border-t border-b border-green-800 bg-green-50">
      
      {/* 3. Main Heading: Large, Bold, White typography on Dark Background */}
     
      <h1 className="max-w-4xl mx-auto text-2xl sm:text-3xl font-bold mb-10 sm:mb-16 text-green-800 text-center tracking-wide leading-tight uppercase">
        Please select a section <br /> to explore
      </h1>

      {/* 4. Navigation Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:max-w-5xl mx-auto">
        
        {sections.map((section) => (
          <Link 
            key={section.id}
            to={section.path}
            className="group relative flex flex-col justify-between p-10 h-64 sm:h-80 overflow-hidden rounded-3xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
          >
            {/* 5. The Background Image with Hover Zoom Effect */}
            <div 
              className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${section.image})` }}
            />

            {/* 6. The Dark Overlay (Gradient for better text readability at the bottom) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* 7. Floating Content (White text on top of the overlay) */}
            
            {/* Top Row: Numeric Indicator */}
            <span className="relative z-20 text-sm font-bold tracking-[0.3em] text-gray-300 uppercase">
              {section.id}
            </span>

            {/* Bottom Row: Text and Arrow */}
            <div className="relative z-20 flex justify-between items-end">
              <span className="text-2xl sm:text-3xl font-extrabold text-white group-hover:tracking-wide transition-all duration-300 uppercase leading-snug">
                {section.title}
              </span>
              
              {/* Animated Arrow on Hover */}
              <span className="text-3xl text-white opacity-60 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                →
              </span>
            </div>
          </Link>
        ))}

      </div>
      
      {/* 8. Minimalist Branding Footer */}
      <div className="mt-28 text-center">
        <p className="text-[10px] tracking-[0.5em] text-green-800 uppercase font-black">
          U|YAI Lifestyle Collective
        </p>
      </div>
    </div>
  )
}

export default Classes;