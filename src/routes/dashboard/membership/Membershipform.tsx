// import React from "react";
// import { useGymStore } from "../../../store/useGymStore";
// import { useForm } from "react-hook-form";



// const MembershipForm: React.FC = () => {
//     const { step, setStep, formData, setFormData, resetForm} = useGymStore();
//     const { register, handleSubmit, formState: { errors }} = useForm({
//         defaultValues: formData
//     })

// const nextStep = (data) => {
//     setFormData(data);
//     setStep(step + 1);
// };

// const onSubmitFinal = () => {
//     console.log("Final Submission:", formData);
//     alert("Welcome to the Gym! Your membership is confirmed.");
//     resetForm();
//     localStorage.removeItem('gym-membership-draft');
//   };

// const totalSteps = 4;
// const progress = (step / totalSteps) * 100;

// const prevStep = () => setStep(step - 1);


//   return (
//   <div className="max-w-md mx-auto p-8 border rounded-xl shadow-lg bg-white mt-10">
//     <div className="mb-8">
//        <div className="flex justify-between mb-2 text-sm font-medium text-blue-600">
//         <span>Step {step} of {totalSteps} </span>
//         <span> {Math.round(progress)}% </span>
//        </div>
//        <div className="w-full bg-gray-200 h-2.5 rounded-full">
//           <div 
//             className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
//             style={{width: `${progress}%`}} />

//            </div>
//     </div>
//    <form onSubmit={handleSubmit(nextStep)}>
//         {/* PAGE 1: Personal Details */}
//         {step === 1 && (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold text-gray-800">Tell us about yourself</h2>
//             <div>
//               <label className="block text-sm font-medium mb-1">Full Name</label>
//               <input 
//                 {...register("fullName", { required: "Name is required" })} 
//                 className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none" 
//               />
//               {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Email</label>
//               <input 
//                 {...register("email", { required: "Valid email required" })} 
//                 type="email"
//                 className="border p-2 w-full rounded outline-none" 
//               />
//             </div>
//             <button type="submit" className="bg-blue-600 text-white p-3 w-full rounded-lg font-bold hover:bg-blue-700">Next</button>
//           </div>
//         )}

//         {/* PAGE 2: Select Plan */}
//         {step === 2 && (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold text-gray-800">Choose your plan</h2>
//             <div className="grid gap-3">
//               <label className="border p-4 rounded-lg cursor-pointer hover:bg-gray-50 flex justify-between">
//                 <div className="flex items-center gap-3">
//                   <input type="radio" {...register("plan")} value="basic" />
//                   <div>
//                     <p className="font-bold">Basic Plan</p>
//                     <p className="text-sm text-gray-500">$20/mo</p>
//                   </div>
//                 </div>
//               </label>
//               <label className="border p-4 rounded-lg cursor-pointer hover:bg-gray-50 flex justify-between">
//                 <div className="flex items-center gap-3">
//                   <input type="radio" {...register("plan")} value="pro" />
//                   <div>
//                     <p className="font-bold">Pro Plan</p>
//                     <p className="text-sm text-gray-500">$50/mo</p>
//                   </div>
//                 </div>
//               </label>
//             </div>
//             <div className="flex gap-4">
//               <button type="button" onClick={prevStep} className="bg-gray-200 text-gray-700 p-3 w-full rounded-lg">Back</button>
//               <button type="submit" className="bg-blue-600 text-white p-3 w-full rounded-lg hover:bg-blue-700">Next</button>
//             </div>
//           </div>
//         )}

//         {/* PAGE 3: Fitness Goals */}
//         {step === 3 && (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold text-gray-800">Your Goals</h2>
//             <p className="text-sm text-gray-500">Select all that apply</p>
//             <div className="space-y-2">
//               {['Weight Loss', 'Muscle Gain', 'Cardio', 'Flexibility'].map(goal => (
//                 <label key={goal} className="flex items-center gap-3 p-2 border rounded">
//                   <input type="checkbox" value={goal} {...register("goals")} />
//                   {goal}
//                 </label>
//               ))}
//             </div>
//             <div className="flex gap-4">
//               <button type="button" onClick={prevStep} className="bg-gray-200 p-3 w-full rounded-lg">Back</button>
//               <button type="submit" className="bg-blue-600 text-white p-3 w-full rounded-lg">Preview</button>
//             </div>
//           </div>
//         )}

//         {/* PAGE 4: Review & Final Submit */}
//         {step === 4 && (
//           <div className="space-y-6">
//             <h2 className="text-2xl font-bold text-gray-800">Review Application</h2>
            
//             <div className="bg-gray-50 p-4 rounded-lg space-y-3 relative">
//               <button 
//                 type="button" 
//                 onClick={() => setStep(1)} 
//                 className="absolute top-2 right-2 text-blue-600 text-xs underline"
//               >
//                 Edit All
//               </button>
//               <div>
//                 <p className="text-xs text-gray-400 uppercase font-bold">Personal</p>
//                 <p>{formData.fullName} ({formData.email})</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-400 uppercase font-bold">Membership</p>
//                 <p className="capitalize">{formData.plan} Plan</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-400 uppercase font-bold">Goals</p>
//                 <p>{formData.goals.length > 0 ? formData.goals.join(', ') : 'None selected'}</p>
//               </div>
//             </div>

//             <div className="flex gap-4">
//               <button type="button" onClick={prevStep} className="bg-gray-200 p-3 w-full rounded-lg text-gray-700">Go Back</button>
//               <button 
//                 type="button" 
//                 onClick={onSubmitFinal} 
//                 className="bg-green-600 text-white p-3 w-full rounded-lg font-bold hover:bg-green-700"
//               >
//                 Confirm & Pay
//               </button>
//             </div>
//           </div>
//         )}
//       </form>
//   </div>
//   )
// }

// export default MembershipForm