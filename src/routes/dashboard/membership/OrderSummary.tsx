import React from "react";

interface OrderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plan: any;
  isYearly: boolean;
  onBack: () => void;
}

const OrderSummary: React.FC<OrderProps> = ({ plan, isYearly, onBack }) => {
  const REGISTRATION_FEE = 7000;
  const VAT_RATE = 0.075; // 7.5% is the current Naija rate
  const basePrice = plan.monthlyPrice;

  const monthlyDiscount = isYearly ? basePrice * 0.05 : 0;
  const finalMonthly = basePrice - monthlyDiscount;
  const membershipSubtotal = isYearly ? finalMonthly * 12 : finalMonthly;

  const taxableAmount = membershipSubtotal + REGISTRATION_FEE;
  const vatAmount = taxableAmount * VAT_RATE;

  const grandTotal = taxableAmount + vatAmount;

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <button
        onClick={onBack}
        className="text-gray-500 mb-8 hover:text-black transition cursor-pointer"
      >
        ← Back to plans
      </button>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Registration Details</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-xl outline-none focus:ring-1 focus:ring-green-800"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full p-3 border rounded-xl outline-none focus:ring-1 focus:ring-green-800"
                placeholder="+234..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full p-3 border rounded-xl outline-none focus:ring-1 focus:ring-green-800"
                placeholder="name@email.com"
              />
            </div>

            <h3 className="text-lg font-bold mt-8">Payment Options</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="p-4 border-2 border-green-800 rounded-xl bg-green-50 text-center font-bold cursor-pointer"
              >
                Paystack / Card
              </button>
              <button
                type="button"
                className="p-4 border border-gray-200 rounded-xl text-center hover:bg-gray-50 transition cursor-pointer"
              >
                Bank Transfer
              </button>
            </div>
          </form>
        </div>

        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 h-fit">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">
                {plan.name} Membership ({isYearly ? "Annual" : "Monthly"})
              </span>
              <span className="font-bold">
                ₦{(isYearly ? basePrice * 12 : basePrice).toLocaleString()}
              </span>
            </div>

            {isYearly && (
              <div className="flex justify-between text-red-600 font-medium">
                <span>Yearly Savings (-5%)</span>
                <span>-₦{(monthlyDiscount * 12).toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between text-gray-600">
              <span>One-time Registration Fee</span>
              <span>₦{REGISTRATION_FEE.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>VAT (7.5%)</span>
              <span className="font-medium text-gray-900">
                ₦{vatAmount.toLocaleString()}
              </span>
            </div>

            <hr className="my-4 border-dashed" />

            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Amount</span>
              <div className="text-right">
                <span className="text-green-800 block text-2xl">
                  ₦{grandTotal.toLocaleString()}
                </span>
                <span className="text-[10px] text-gray-400 font-normal">
                  All taxes included
                </span>
              </div>
            </div>

            <button className="w-full bg-green-800 text-white py-4 rounded-xl font-bold mt-6 hover:shadow-lg active:scale-95 transition-all cursor-pointer">
              Pay ₦{grandTotal.toLocaleString()} Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
