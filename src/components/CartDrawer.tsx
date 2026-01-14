import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, totalAmount, cartCount } =
    useCart();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/products");
  };
  return (
    <>
      {/* Backdrop  */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/*  Side Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 sm:text-xl border-b flex items-center justify-between">
            <h2 className="text-xl font-bold">Your Cart ({cartCount})</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                <p className="capitalize">Your cart is empty</p>
                <button
                  onClick={handleClick}
                  className="mt-4 text-black underline font-medium cursor-pointer capitalize"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const activePrice = item.discountPrice || item.price;
                const lineTotal = activePrice * item.quantity;

                return (
                  <div key={item.id} className="flex gap-4">
                   
                 
                    <div className="h-20 w-20 bg-gray-100 rounded-lg flex-shrink-0" >
                        <img src={item.image} alt="images" />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium text-sm capitalize">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-red-500 hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>

                      <p className="text-xs text-gray-400 mb-3 uppercase tracking-tight">
                        {item.category}
                      </p>

                      <div className="flex items-center justify-between">
                        {/* Quantity  */}
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-2 py-1 hover:bg-gray-50 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-2 py-1 hover:bg-gray-50 cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Price  */}
                        <div className="text-right">
                          {item.discountPrice && (
                            <span className="block text-[10px] text-gray-400 line-through leading-none">
                              ₦{item.price.toLocaleString()}
                            </span>
                          )}
                          <span
                            className={`font-semibold text-sm ${
                              item.discountPrice ? "text-red-600" : "text-black"
                            }`}
                          >
                            ₦{lineTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

       
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t bg-gray-50 pb-8 sm:pb-6">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-xl font-bold">
                  ₦{totalAmount.toLocaleString()}
                </span>
              </div>
              <button className="w-full bg-black text-white py-4 rounded-xl font-bold active:scale-[0.98] transition cursor-pointer">
                Checkout Now
              </button>
              <p className="text-center text-xs text-gray-400 mt-4 italic">
                Shipping and taxes calculated at checkout
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
