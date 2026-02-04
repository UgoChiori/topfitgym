

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm } from "react-hook-form";
import { useGymStore } from "../../../store/useGymStore";
import { useNavigate } from "react-router-dom";
import { Edit2, User, Target, CreditCard } from "lucide-react";
import { usePaystackPayment } from "react-paystack";
import { auth, db } from "../../../auth/Firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

const OrderSummary: React.FC = () => {
  const navigate = useNavigate();
  const { step, setStep, formData, updateDetails, isYearly, reset } = useGymStore();

  const REGISTRATION_FEE = 7000;
  const VAT_RATE = 0.075;

  const basePrice = formData.selectedPlan?.monthlyPrice || 0;
  const subtotal = isYearly ? (basePrice * 0.95) * 12 : basePrice;
  const vatAmount = (subtotal + REGISTRATION_FEE) * VAT_RATE;
  const grandTotal = subtotal + REGISTRATION_FEE + vatAmount;

  
  const config = {
    reference: new Date().getTime().toString(),
    email: formData.email || auth.currentUser?.email || "customer@example.com",
    amount: Math.floor(grandTotal * 100),
    publicKey: (import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string) || "",
  };

  
  const initializePayment = usePaystackPayment(config);

  const { 
    register, 
    getValues,
    trigger, 
    formState: { errors } 
  } = useForm({ 
    defaultValues: formData,
    mode: "onChange" 
  });

  if (!formData.selectedPlan) return null;


  const handleSuccess = async (response: any) => {
    try {
      const membershipRef = collection(db, "memberships");
      const membershipData = {
        userId: auth.currentUser?.uid,
        email: formData.email,
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        planName: formData.selectedPlan.name,
        isYearly: isYearly,
        goals: formData.goals,
        amountPaid: grandTotal,
        reference: response.reference,
        status: "active",
        startDate: serverTimestamp(),
        createdAt: serverTimestamp(),
      };

      await addDoc(membershipRef, membershipData);
      toast.success("Welcome to the Tribe! Membership active.");
      reset();
      navigate("/userprofile");
    } catch (error) {
      console.error("Firestore Save Error:", error);
      toast.error("Payment successful, but activation failed.");
    }
  };

  const handleClose = () => toast.info("Transaction cancelled.");

  const handleNext = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ["fullName", "email", "phoneNumber"];
    if (step === 2) fieldsToValidate = ["goals"];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      const currentValues = getValues();
      updateDetails(currentValues); 
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else updateDetails({ selectedPlan: null });
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
   
      <div className="mb-12 max-w-sm">
        <div className="flex justify-between text-[10px] font-bold mb-2 text-green-800 uppercase">
          <span>{step === 1 ? "Details" : step === 2 ? "Goals" : "Review"}</span>
          <span>Step {step} of 3</span>
        </div>
        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
          <div className="bg-green-800 h-full transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="space-y-8">
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-3xl font-black italic uppercase">01. Personal Profile</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <input {...register("fullName", { required: "Name is required" })} placeholder="Full Name" className={`w-full p-4 border rounded-2xl outline-none focus:ring-1 ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:ring-green-800'}`} />
                    {errors.fullName && <p className="text-red-500 text-xs font-bold px-2">{errors.fullName.message as string}</p>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <input {...register("phoneNumber", { required: "Phone is required" })} placeholder="Phone Number" className={`w-full p-4 border rounded-2xl outline-none focus:ring-1 ${errors.phoneNumber ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:ring-green-800'}`} />
                    {errors.phoneNumber && <p className="text-red-500 text-xs font-bold px-2">{errors.phoneNumber.message as string}</p>}
                  </div>
                  <div className="flex flex-col gap-1 col-span-full">
                    <input {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })} placeholder="Email Address" className={`w-full p-4 border rounded-2xl outline-none focus:ring-1 ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:ring-green-800'}`} />
                    {errors.email && <p className="text-red-500 text-xs font-bold px-2">{errors.email.message as string}</p>}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-3xl font-black italic uppercase">02. Fitness Goals</h2>
                <div className="grid grid-cols-2 gap-4">
                  {["Weight Loss", "Muscle Building", "Cardio", "Flexibility"].map(g => (
                    <label key={g} className="p-5 border rounded-2xl flex items-center gap-3 cursor-pointer hover:bg-green-50 transition">
                      <input type="checkbox" value={g} {...register("goals")} className="accent-green-800 w-5 h-5" />
                      <span className="font-bold">{g}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-fadeIn">
                <h2 className="text-3xl font-black italic uppercase">03. Final Preview</h2>
                <div className="bg-white border rounded-3xl p-6 relative">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="p-3 bg-gray-100 rounded-2xl"><User size={20}/></div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Personal Info</p>
                        <p className="font-bold text-lg">{formData.fullName}</p>
                        <p className="text-sm text-gray-500">{formData.email} • {formData.phoneNumber}</p>
                      </div>
                    </div>
                    <button onClick={() => setStep(1)} className="p-2 text-green-800 hover:bg-green-50 rounded-xl transition"><Edit2 size={18} /></button>
                  </div>
                </div>
                <div className="bg-white border rounded-3xl p-6 relative">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="p-3 bg-gray-100 rounded-2xl"><Target size={20}/></div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Fitness Goals</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.goals.length > 0 ? formData.goals.map(g => (
                            <span key={g} className="text-xs font-bold bg-green-100 text-green-800 px-3 py-1 rounded-full uppercase">{g}</span>
                          )) : <span className="text-sm italic text-gray-400">No goals selected</span>}
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setStep(2)} className="p-2 text-green-800 hover:bg-green-50 rounded-xl transition"><Edit2 size={18} /></button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button type="button" onClick={handleBack} className="px-8 py-4 border-2 rounded-2xl font-bold hover:bg-gray-50 transition">Back</button>
              {step < 3 && (
                <button type="button" onClick={handleNext} className="px-12 py-4 bg-green-800 text-white rounded-2xl font-black uppercase shadow-lg hover:bg-green-900 transition">Continue</button>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-8 rounded-[40px] border border-gray-100 sticky top-10 shadow-sm">
            <h3 className="text-xl font-bold mb-6 italic uppercase flex items-center gap-2"><CreditCard size={20}/> Summary</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">{formData.selectedPlan.name} Plan</span>
                <span className="font-bold">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-400 italic">
                <span>Registration Fee</span>
                <span>₦{REGISTRATION_FEE.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>VAT (7.5%)</span>
                <span>₦{vatAmount.toLocaleString()}</span>
              </div>
              <hr className="my-4 border-dashed" />
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Grand Total</span>
                <span className="text-3xl font-black text-green-800 tracking-tighter">₦{grandTotal.toLocaleString()}</span>
              </div>

              {step === 3 && (
                <button 
                  onClick={() => {
                    if (!auth.currentUser) {
                      toast.warning("Please login to complete payment");
                      navigate("/login");
                      return;
                    }
                    initializePayment({ onSuccess: handleSuccess, onClose: handleClose });
                  }}
                  className="w-full bg-green-800 text-white py-5 rounded-2xl font-black text-lg mt-6 hover:shadow-2xl transition-all active:scale-95"
                >
                  ACTIVATE NOW
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;