import React, {useState} from "react";
import { plans } from "./plans";
import OrderSummary from "./OrderSummary";

interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  features: string[];
  featured?: boolean;
}

const MembershipPlanForm: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);


if(selectedPlan) {
  return (
    <OrderSummary
    plan={selectedPlan}
    isYearly={isYearly}
    onBack={() => setSelectedPlan(null)}
    />
  )
}


  return (
    // Plans
   <div className="py-20 px-6 max-w-7xl mx-auto bg-white text-gray-900">
    <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold mb-6">Choose Your Plan</h1>
        <div className="flex items-center gap-4">
          <span className={!isYearly ? "font-bold text-black" : "text-gray-400"}>Monthly</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="w-12 h-6 bg-gray-200 rounded-full relative transition-colors"
            style={{ backgroundColor: isYearly ? "#16a34a" : "" }}
          >
            <div
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                isYearly ? "translate-x-6" : ""
              }`}
            />
          </button>
          <span className={isYearly ? "font-bold text-green-600" : "text-gray-400"}>
            Yearly <span className="text-xs">(-5%)</span>
          </span>
        </div>
      </div>
   <div className="grid md:grid-cols-3 gap-8">
    {plans.map((plan) => (
      <div key={plan.id} className="...">
      
        <button onClick={() => setSelectedPlan(plan)}
        className="capitalize cursor-pointer border-b-2">
          Get Started with {plan.name}
        </button>
      </div>
  
      
    ))}
   </div>
   </div>
  )
}

export default MembershipPlanForm;