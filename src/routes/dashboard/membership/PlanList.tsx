/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Check, Plus, Minus } from "lucide-react";
import { plans } from "./plans";
import { useNavigate } from "react-router-dom";
import { useGymStore } from "../../../store/useGymStore";

const PlanList: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const navigate = useNavigate();
  const setPlan = useGymStore((state: any) => state.setPlan); 


  

  const faqs = [
    {
      q: "Can I cancel my membership anytime?",
      a: "Yes, monthly plans can be cancelled at any time without penalty. Yearly plans are committed for 12 months.",
    },
    {
      q: "Do you offer student discounts?",
      a: "Absolutely! Bring a valid student ID to any of our locations to get 15% off any plan.",
    },
    {
      q: "Is there a registration fee?",
      a: "We have a one-time ₦5,000 onboarding fee for new members which includes a fitness assessment.",
    },
  ];
  
  const handlePlan = (plan: any) => {
    setPlan(plan, isYearly); 
    navigate("/membership"); 
  }
  return (
    <div className="bg-white min-h-screen">
      <div className="py-20 px-6 max-w-7xl mx-auto">
       
       

     <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Membership Plans</h1>
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={!isYearly ? "font-bold" : "text-gray-400"}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="w-12 h-6 bg-gray-200 rounded-full relative transition-colors"
              style={{ backgroundColor: isYearly ? "#16a34a" : "" }}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${isYearly ? "translate-x-6" : ""}`} />
            </button>
            <span className={isYearly ? "font-bold text-green-600" : "text-gray-400"}>Yearly (-5%)</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {plans.map((plan) => (
            <div key={plan.id} className={`p-8 rounded-3xl border ${plan.featured ? "border-green-600 shadow-xl" : "border-gray-100 bg-gray-50"} relative flex flex-col`}>
              <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
              <div className="mb-6 font-bold text-2xl">
                ₦{isYearly ? (plan.monthlyPrice * 0.95).toLocaleString() : plan.monthlyPrice.toLocaleString()}
                <span className="text-sm font-normal text-gray-500"> /mo</span>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature: string, i: number) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-600">
                    <Check size={16} className="text-green-600 flex-shrink-0" /> {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlan(plan)} 
                className={`w-full py-4 rounded-xl font-bold transition cursor-pointer ${plan.featured ? "bg-green-600 text-white" : "bg-white border"}`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
        <div className="max-w-3xl mx-auto border-t pt-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left bg-gray-50 hover:bg-gray-100 transition"
                >
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  {openFaq === index ? <Minus size={20} /> : <Plus size={20} />}
                </button>
                {openFaq === index && (
                  <div className="p-5 bg-white text-gray-600 text-sm border-t leading-relaxed animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanList;
