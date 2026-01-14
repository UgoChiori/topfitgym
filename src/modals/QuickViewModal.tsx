import React from "react";
import { Product } from "../components/ProductCard";
import ModalBodyWrapper from "./ModalBodyWrapper";

interface Props {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const QuickViewModal: React.FC<Props> = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <>
    <ModalBodyWrapper>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black z-10"
        >
          ✕
        </button>

      
        <div className="md:w-1/2 h-64 md:h-auto bg-gray-100 flex items-center justify-center">
           <span className="text-gray-400">Product Image</span>
        </div>

     
        <div className="p-8 md:w-1/2 flex flex-col justify-center">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <div className="text-2xl font-semibold mb-8">
            ₦{product.price.toLocaleString()}
          </div>

          <button
            disabled={!product.inStock}
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className={`w-full py-4 rounded-xl font-medium transition
              ${product.inStock 
                ? "bg-black text-white hover:bg-gray-800" 
                : "bg-gray-200 text-gray-500 cursor-not-allowed"}
            `}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
    </ModalBodyWrapper>
    </>
  
  );
};

export default QuickViewModal;