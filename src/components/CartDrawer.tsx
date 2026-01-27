import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";
import { auth, db } from "../auth/Firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface PaystackSuccessAction {
  reference: string;
  trans: string;
  status: string;
  message: string;
  transaction: string;
}

const CartDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalAmount,
    cartCount,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  const config = {
    reference: new Date().getTime().toString(),
    email: auth.currentUser?.email || "customer@example.com",
    amount: totalAmount * 100,
    publicKey: (import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string) || "",
  };

  const initializePayment = usePaystackPayment(config);

  // const handleSuccess = (response: PaystackSuccessAction) => {
  //   toast.success("Payment Successful! Ref: " + response.reference);
  //   console.log("Successful: " + response.reference);
  //   clearCart();
  //   onClose();
  //   navigate("/userprofile");
  // };



const handleSuccess = async (response: PaystackSuccessAction) => {
  try {
      const ordersRef = collection(db, "orders");

 
    const orderData = {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.discountPrice || item.price,
        quantity: item.quantity,
        image: item.image
      })),
      total: totalAmount,
      reference: response.reference, // From Paystack
      status: "paid",
      createdAt: serverTimestamp(),
    };

    // 3. Save to Firestore
    await addDoc(ordersRef, orderData);

    toast.success("Order confirmed!");
    clearCart();
    onClose();
    navigate("/userprofile");

  } catch (error) {
    console.error("Firestore Save Error:", error);
    toast.error("Payment was successful, but we couldn't save the order record. Please contact support.");
  }
};
  const handlePaystackClose = () => {
    toast.info("Payment Window Closed.");
  };

  const handleCheckout = () => {
    console.log("Paystack Config:", config);

    if (!config.publicKey) {
      toast.error("Payment system configuration missing (API Key)");
      return;
    }
    if (!auth.currentUser) {
      toast.error("Please login to checkout");
      console.log("please login to continue");
      navigate("/login");
      return;
    }

    if (cart.length === 0) return;

    initializePayment({
      onSuccess: handleSuccess,
      onClose: handlePaystackClose,
    });
  };

  const handleStartShopping = () => {
    onClose();
    navigate("/products");
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed right-0 top-0 h-full w-full sm:max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-xl font-bold">Your Cart ({cartCount})</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                <p>Your cart is empty</p>
                <button
                  onClick={handleStartShopping}
                  className="mt-4 text-black underline font-medium cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-20 w-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-sm capitalize">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-1"
                        >
                          -
                        </button>
                        <span className="px-2 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-1"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-sm">
                        ₦
                        {(
                          item.quantity * (item.discountPrice || item.price)
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600 font-medium">Subtotal</span>
                <span className="text-xl font-black text-green-800">
                  ₦{totalAmount.toLocaleString()}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-green-800 hover:bg-green-900 text-white py-4 rounded-xl font-bold active:scale-[0.98] transition cursor-pointer shadow-lg"
              >
                Pay With Paystack
              </button>
              <div className="flex items-center justify-center gap-2 mt-4 opacity-50">
                <span className="text-[10px] font-bold uppercase text-gray-400">
                  Secured by
                </span>
                <img src="images/paystacklogo.png" className="h-3" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
