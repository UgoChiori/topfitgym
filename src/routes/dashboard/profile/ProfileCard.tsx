import React, { useState, useEffect} from 'react';
import { auth, db,  } from "../../../auth/Firebase"
import { doc, getDoc, updateDoc} from "firebase/firestore";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import Input from '../../../components/Input';



const ProfileSettings: React.FC = () => {
const [ loading, setLoading ] = useState(false);
const [profile, setProfile] = useState({
  firstName:"",
  weight: "",
  height:"",
})

useEffect(() => {
  const fetchProfile = async () => {
    if (auth.currentUser) {
      const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile({
          firstName: data.firstName || "",
          weight: data.weight || "",
          height: data.height || "",

        })
      }
    }
  };
  fetchProfile();
},[])

const calculateBMI = () => {
const w = parseFloat(profile.weight);
const h = parseFloat(profile.height) / 100;
if (w >  0 && h > 0 ) {
  return ( w / (h * h)).toFixed(1);
}
return null;
}

const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    try {
      setLoading(true);
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        weight: profile.weight,
        height: profile.height,
        bmi: calculateBMI(),
      });
      toast.success("Profile updated successfully!");
      // I will come back to this abeg
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Update Error:", err)
      toast.error(err.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const bmi = calculateBMI();



  return (
   <div className="max-w-2xl mx-auto p-8 bg-white shadow-sm rounded-2xl mt-10">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Fitness Profile</h2>
      
      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
          <Input 
            type="number" 
            value={profile.weight} 
            onChange={(e) => setProfile({...profile, weight: e.target.value})}
            placeholder="e.g. 75"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
          <Input 
            type="number" 
            value={profile.height} 
            onChange={(e) => setProfile({...profile, height: e.target.value})}
            placeholder="e.g. 180"
          />
        </div>

        {/* This is thee BMI Display Card */}
        {bmi && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex justify-between items-center">
            <div>
              <p className="text-sm text-green-700 font-medium">Your Current BMI</p>
              <p className="text-2xl font-black text-green-900">{bmi}</p>
            </div>
            <div className="text-right text-xs text-green-600 font-bold uppercase">
              {parseFloat(bmi) < 18.5 ? "Underweight" : 
               parseFloat(bmi) < 25 ? "Healthy" : 
               parseFloat(bmi) < 30 ? "Overweight" : "Obese"}
            </div>
          </div>
        )}

        <Button text="Save Changes" loading={loading} width="100%" />
      </form>
    </div>
  )
}

export default ProfileSettings