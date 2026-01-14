import React, { useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { Product } from "../components/ProductCard";
import QuickViewModal from "../modals/QuickViewModal";
import { useCart } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";

const Products: React.FC = () => {
  const { addToCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStock = onlyInStock ? product.inStock : true;
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      return matchesSearch && matchesStock && matchesCategory;
    });
  }, [searchQuery, onlyInStock, selectedCategories]);

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-20">
      {/* Cart drawer opens when "add to cart is clicked. Click outside or on the cloe icon to close" */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Shop</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Train better with gym-approved gear and supplements. Available for
          delivery or pickup at any of our{" "}
          <a href="/locations" className="underline text-green-800">
            locations
          </a>
          .
        </p>
      </section>
      {/* Search for specific item(s) */}
      <div className="mb-8">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search for supplements, bands, hoodies..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <aside className="lg:col-span-1">
          <div className="sticky top-24 border rounded-xl p-6">
            <h2 className="font-semibold mb-6">Filters</h2>

            <fieldset className="mb-6">
              <legend className="text-sm font-medium mb-3">Category</legend>
              <ul className="space-y-2 text-sm">
                {["Supplements", "Apparel", "Accessories", "Recovery"].map(
                  (category) => (
                    <li key={category}>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                        />
                        {category}
                      </label>
                    </li>
                  )
                )}
              </ul>
            </fieldset>

            <fieldset className="mb-6">
              <legend className="text-sm font-medium mb-3">Availability</legend>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                />
                In stock only
              </label>
            </fieldset>
          </div>
        </aside>

        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-500 py-20">
              No products match your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </main>
  );
};

export default Products;
