// import React from "react";

// export interface Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image?: string;
//   inStock: boolean;
//   category: string;
//   discountPrice: number;
// }

// interface Props {
//   product: Product;
//   onAddToCart: (product: Product) => void;
//   onQuickView: (product: Product) => void;
// }

// const ProductCard: React.FC<Props> = ({
//   product,
//   onAddToCart,
//   onQuickView,
// }) => {
//   const isOnSale =
//     product.discountPrice && product.discountPrice < product.price;
//   return (
//     <div className="group border rounded-xl overflow-hidden hover:shadow-md transition bg-white">
//       {isOnSale && (
//         <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">
//           Sale
//         </div>
//       )}

//       <div className="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
//         <span className="text-gray-400 text-xs uppercase tracking-widest">
//           Gym Gear
//         </span>

//         <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//           <button
//             onClick={() => onQuickView(product)}
//             className="cursor-pointer bg-white text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
//           >
//             QUICK VIEW
//           </button>
//         </div>
//       </div>

//       <div className="p-4">
//         <h3 className="font-medium mb-1 capitalize">{product.name}</h3>
      

//         <p className="text-sm text-gray-500 mb-3 line-clamp-2">
//           {product.description}
//         </p>

//         <div className="flex items-center justify-between">
//           <span className="font-semibold text-lg text-green-700">
//             ₦{product.price.toLocaleString()}
//           </span>
//           <button
//             disabled={!product.inStock}
//             onClick={() => onAddToCart(product)}
//             className={`text-sm px-4 py-2 rounded-md font-medium transition-colors
//                     ${
//                       product.inStock
//                         ? "bg-green-700 text-white cursor-pointer hover:bg-gray-800"
//                         : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                     }`}
//           >
//             {product.inStock ? "Add To Cart" : "Out Of Stock"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
import React from "react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string; // We'll use this now
  inStock: boolean;
  category: string;
  discountPrice: number;
}

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({
  product,
  onAddToCart,
  onQuickView,
}) => {
  const isOnSale =
    product.discountPrice && product.discountPrice < product.price;

  return (
    /* Added 'relative' here so the Sale badge stays inside the card */
    <div className="group relative border rounded-xl overflow-hidden hover:shadow-md transition bg-white flex flex-col h-full">
      
      {/* Sale Badge */}
      {isOnSale && (
        <div className="absolute top-3 left-3 z-20 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">
          Sale
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-56 bg-gray-50 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span className="text-gray-400 text-xs uppercase tracking-widest">
            No Image
          </span>
        )}

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={() => onQuickView(product)}
            className="cursor-pointer bg-white text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-green-700 hover:text-white"
          >
            QUICK VIEW
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">
          {product.category}
        </span>
        <h3 className="font-bold text-gray-900 mb-1 capitalize leading-tight">
          {product.name}
        </h3>
      
        <p className="text-xs text-gray-500 mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            {isOnSale && (
              <span className="text-xs text-gray-400 line-through">
                ₦{product.price.toLocaleString()}
              </span>
            )}
            <span className="font-black text-xl text-green-800">
              ₦{(product.discountPrice || product.price).toLocaleString()}
            </span>
          </div>

          <button
            disabled={!product.inStock}
            onClick={() => onAddToCart(product)}
            className={`w-full text-xs py-3 rounded-lg font-bold uppercase tracking-tighter transition-all
                    ${
                      product.inStock
                        ? "bg-black text-white cursor-pointer hover:bg-green-800"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
          >
            {product.inStock ? "Add To Cart" : "Out Of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;