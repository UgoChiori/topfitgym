import React, { useState, useEffect } from "react";
import { auth, db } from "../../../auth/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useNavigate } from "react-router-dom";
import { uploadService } from "../../../services/uploadService";

const UserStats: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    weight: "",
    height: "",
    beforeImage: "",
    afterImage: "",
  });
  const navigate = useNavigate();

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
            beforeImage: data.beforeImage || "",
            afterImage: data.afterImage || "",
          });
        }
      }
    };
    fetchProfile();
  }, []);

  const calculateBMI = () => {
    const w = parseFloat(profile.weight);
    const h = parseFloat(profile.height) / 100;
    if (w > 0 && h > 0) {
      return (w / (h * h)).toFixed(1);
    }
    return null;
  };

  const handleProgressUpload = async (
    file: File,
    type: "beforeImage" | "afterImage"
  ) => {
    if (!auth.currentUser) return;
    try {
      setLoading(true);
      const path = `progress/${auth.currentUser.uid}/${type}`;
      const url = await uploadService(file, path);

      setProfile((prev) => ({ ...prev, [type]: url }));
      await updateDoc(doc(db, "users", auth.currentUser.uid), { [type]: url });
      toast.success(
        `${type === "beforeImage" ? "Before" : "After"} Photo Updated!`
      );
    } catch (err) {
      console.error(err);
      toast.error("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

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
      toast.success("Profile updated successfully! Redirecting");
      setTimeout(() => {
        navigate("/userprofile");
      }, 1500);
    } catch (err) {
      const error = err as Error;
      console.error("Update Error:", err);

      toast.error(error.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const bmi = calculateBMI();

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-sm rounded-2xl mt-10">
      <h2 className="text-2xl font-bold text-green-800 mb-6">
        Fitness Profile
      </h2>

      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Weight (kg)
          </label>
          <Input
            type="number"
            value={profile.weight}
            onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
            placeholder="e.g. 75"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Height (cm)
          </label>
          <Input
            type="number"
            value={profile.height}
            onChange={(e) => setProfile({ ...profile, height: e.target.value })}
            placeholder="e.g. 180"
          />
        </div>

        {/* This is thee BMI Display Card */}
        {bmi && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex justify-between items-center">
            <div>
              <p className="text-sm text-green-700 font-medium">
                Your Current BMI
              </p>
              <p className="text-2xl font-black text-green-900">{bmi}</p>
            </div>
            <div className="text-right text-xs text-green-600 font-bold uppercase">
              {parseFloat(bmi) < 18.5
                ? "Underweight"
                : parseFloat(bmi) < 25
                ? "Healthy"
                : parseFloat(bmi) < 30
                ? "Overweight"
                : "Obese"}
            </div>
          </div>
        )}
        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">
            Progress Photos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before Slot */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase">
                Before Photo
              </p>
              <label className="relative h-64 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden group hover:border-green-500 transition-all">
                {profile.beforeImage ? (
                  <img
                    src={profile.beforeImage}
                    className="w-full h-full object-cover"
                    alt="Before"
                  />
                ) : (
                  <span className="text-gray-400 text-xs">
                    Click to upload Before photo
                  </span>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files &&
                    handleProgressUpload(e.target.files[0], "beforeImage")
                  }
                />
              </label>
            </div>

            {/* After Slot */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase">
                After Photo
              </p>
              <label className="relative h-64 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden group hover:border-green-500 transition-all">
                {profile.afterImage ? (
                  <img
                    src={profile.afterImage}
                    className="w-full h-full object-cover"
                    alt="After"
                  />
                ) : (
                  <span className="text-gray-400 text-xs">
                    Click to upload After photo
                  </span>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files &&
                    handleProgressUpload(e.target.files[0], "afterImage")
                  }
                />
              </label>
            </div>
          </div>
        </div>
        <Button text="Save Changes" loading={loading} width="100%" />
      </form>
    </div>
  );
};

export default UserStats;
