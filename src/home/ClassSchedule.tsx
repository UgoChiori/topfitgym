import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import classSchedules from "../data/classSchedules";

const JOINED_CLASSES_KEY = "joinedClasses";

const ClassSchedule: React.FC = () => {
  const [joinedClasses, setJoinedClasses] = useState<string[]>([]);
  const { slug } = useParams<{ slug: string }>();


  useEffect(() => {
    const saved = localStorage.getItem(JOINED_CLASSES_KEY);
    if (saved) {
      setJoinedClasses(JSON.parse(saved));
    }
  }, []);


  if (!slug || !classSchedules[slug]) {
    return <Navigate to="/classes" replace />;
  }

  const schedule = classSchedules[slug];


  const saveJoined = (updated: string[]) => {
    setJoinedClasses(updated);
    localStorage.setItem(JOINED_CLASSES_KEY, JSON.stringify(updated));
  };

  const joinClass = (id: string) => {
    if (!joinedClasses.includes(id)) {
      saveJoined([...joinedClasses, id]);
    }
  };

  const cancelClass = (id: string) => {
    saveJoined(joinedClasses.filter((cid) => cid !== id));
  };


  const isPast = (time: string, day: string) => {
    const now = new Date();
    const today = now.toLocaleDateString("en-US", { weekday: "long" });
    if (today !== day) return false;

    const [hourMinute, period] = time.split(" – ")[0].split(" ");
    const [hour, minute] = hourMinute.split(":").map(Number);

    let classHour = hour;
    if (period === "PM" && hour !== 12) classHour += 12;
    if (period === "AM" && hour === 12) classHour = 0;

    const classTime = new Date();
    classTime.setHours(classHour, minute, 0, 0);

    return now > classTime;
  };


  const sortedSchedule = [...schedule].sort((a, b) => {
    const aJoined = joinedClasses.includes(a.id) ? 0 : 1;
    const bJoined = joinedClasses.includes(b.id) ? 0 : 1;
    return aJoined - bJoined;
  });


  return (
    <section className="py-16 px-4 sm:px-8 max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-green-800 mb-10 text-center uppercase">
        {slug.replace(/-/g, " ").toUpperCase()} Schedule
      </h1>

      <div className="space-y-4">
        {sortedSchedule.map((item) => {
          const joined = joinedClasses.includes(item.id);
          const past = isPast(item.time, item.day);

          return (
            <div
              key={item.id}
              className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border rounded-xl px-5 py-4 shadow-sm
                ${joined ? "bg-green-50 border-green-400" : "bg-white border-gray-200"}`}
            >
           
              <div>
                <p className="font-semibold text-gray-800">{item.day}</p>
                <p className="text-gray-600">{item.time}</p>
                <p className="text-gray-500 text-sm">
                  Capacity: {joined ? 1 : 0}/{item.capacity}
                </p>
              </div>

           
              <div className="flex gap-2">
                {joined ? (
                  <button
                    onClick={() => cancelClass(item.id)}
                    className="px-5 py-2 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
                  >
                    CANCEL
                  </button>
                ) : (
                  <button
                    onClick={() => joinClass(item.id)}
                    disabled={past}
                    className={`px-5 py-2 rounded-lg font-semibold transition border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white cursor-pointer
                      ${past ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {past ? "PAST CLASS" : "JOIN CLASS"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ClassSchedule;
