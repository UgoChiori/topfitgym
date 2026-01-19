import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../../auth/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Button from "../../../components/Button";

const UserProfile: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-32 bg-green-800 w-full"></div>
          
          <div className="px-8 pb-8">
            <div className="relative -mt-16 flex justify-between items-end mb-6">
              <div className="relative">
                <img 
                  src={userData?.photoURL || "https://via.placeholder.com/150"} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full border-4 border-white object-cover bg-gray-200"
                />
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              
              <Link to="/editprofile">
                <Button 
                  text="Edit Profile" 
                  width="auto" 
                  className="!py-2 !px-6 bg-white !text-green-800 border border-green-800 hover:bg-green-50"
                />
              </Link>
            </div>

            <div className="mb-8">
              <h1 className="text-3xl font-black text-gray-900 capitalize">
                {userData?.firstName} {userData?.lastName}
              </h1>
              <p className="text-gray-500 font-medium">{auth.currentUser?.email}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 border-t border-b border-gray-100 py-6 mb-8">
              <div className="text-center">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Weight</p>
                <p className="text-xl font-black text-green-800">{userData?.weight || "--"} <span className="text-sm font-normal text-gray-500">kg</span></p>
              </div>
              <div className="text-center border-x border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Height</p>
                <p className="text-xl font-black text-green-800">{userData?.height || "--"} <span className="text-sm font-normal text-gray-500">cm</span></p>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">BMI</p>
                <p className="text-xl font-black text-green-800">{userData?.bmi || "--"}</p>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Fitness Deep Dive</h3>
              <div 
                onClick={() => navigate("/userstatistics")}
                className="flex items-center justify-between p-4 bg-green-50 rounded-2xl cursor-pointer hover:bg-green-100 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-green-800 p-3 rounded-xl text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-green-900 text-sm">View Fitness Stats</p>
                    <p className="text-xs text-green-700 opacity-70">Before & After photos, BMI history, and goals</p>
                  </div>
                </div>
                <span className="text-green-800 font-bold group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;