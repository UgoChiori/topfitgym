import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../../../auth/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { uploadService } from "../../../services/uploadService";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Label from "../../../components/Label";

const EditProfileForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    weight: "",
    height: "",
    photoURL: ""
  });

  // 1. Load current data
  useEffect(() => {
    const loadData = async () => {
      if (auth.currentUser) {
        const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (docSnap.exists()) {
          setFormData({
            firstName: docSnap.data().firstName || "",
            lastName: docSnap.data().lastName || "",
            weight: docSnap.data().weight || "",
            height: docSnap.data().height || "",
            photoURL: docSnap.data().photoURL || ""
          });
        }
      }
      setFetching(false);
    };
    loadData();
  }, []);

  // 2. Handle Image Selection & Upload
  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !auth.currentUser) return;

    try {
      setLoading(true);
      const path = `profiles/${auth.currentUser.uid}/avatar`;
      const url = await uploadService(file, path);
      
      setFormData((prev) => ({ ...prev, photoURL: url }));
      
      // Update Firestore immediately for the photo
      await updateDoc(doc(db, "users", auth.currentUser.uid), { photoURL: url });
      toast.success("Photo updated!");
    } catch (err) {
         console.error(err)
      toast.error("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Form Submit (Text data)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    try {
      setLoading(true);
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        weight: formData.weight,
        height: formData.height,
      });
      toast.success("Profile saved successfully!");
    } catch (err) {
      console.error(err)
      toast.error("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mt-10">
      <h2 className="text-2xl font-black text-gray-900 mb-8">EDIT INFORMATION</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-8">
          <div 
            onClick={handleImageClick}
            className="relative w-32 h-32 cursor-pointer group"
          >
            <img 
              src={formData.photoURL || "https://via.placeholder.com/150"} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover border-4 border-green-50 group-hover:border-green-500 transition-all"
            />
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-[10px] font-bold uppercase">Change</span>
            </div>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*" 
          />
        </div>

        {/* Text Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input 
              value={formData.firstName} 
              onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              value={formData.lastName} 
              onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
            />
          </div>
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input 
              type="number"
              value={formData.weight} 
              onChange={(e) => setFormData({...formData, weight: e.target.value})} 
            />
          </div>
          <div>
            <Label htmlFor="height">Height (cm)</Label>
            <Input 
              type="number"
              value={formData.height} 
              onChange={(e) => setFormData({...formData, height: e.target.value})} 
            />
          </div>
        </div>

        <Button 
          text={loading ? "Saving..." : "Save Changes"} 
          htmlType="submit" 
          disabled={loading}
          width="100%" 
        />
      </form>
    </div>
  );
};

export default EditProfileForm;