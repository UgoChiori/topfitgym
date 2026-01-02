import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";


type ClassCardProps = {
  title: string;
  slug: string;
  description: string;
  icon: string;
}



const Classcard: React.FC<ClassCardProps> = ({
  title,
  slug,
  description,
  icon,
}) => {
  const navigate = useNavigate();


  const goToSchedule = useCallback(() => {
    navigate(`/classes/${slug}`);
  }, [navigate, slug]);



  return (
     <div
      className="group border border-gray-200 rounded-2xl p-6 sm:p-8 bg-white
                 shadow-sm hover:shadow-xl transition-all duration-300
                 transform hover:-translate-y-2"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h2 className="text-lg sm:text-xl font-semibold text-green-800 group-hover:text-green-900">
        {title}
      </h2>
       <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
        {description}
      </p>
         <button
        onClick={goToSchedule}
        className="mt-6 w-full border-2 border-gray-800 text-gray-800
                   py-2.5 rounded-lg font-semibold tracking-wide cursor-pointer
                   transition-all duration-300
                   group-hover:bg-gray-800 group-hover:text-white"
      >
        VIEW SCHEDULE
      </button>
    </div>
  )
}

export default Classcard