import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search, ShoppingBag, Eye, Filter, Grid, List, Package } from "lucide-react";

import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(collection(db, "products"));
        setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Get unique categories
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Header */}
      <div className="pt-20 pb-8 bg-gradient-to-r from-black via-gray-900 to-black border-b border-red-500/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              <span className="text-red-500">PREMIUM</span>
              <br />
              <span className="text-white">MECHANICAL PRODUCTS</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our extensive catalog of precision-engineered mechanical components
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-white placeholder-gray-400 transition-all duration-300"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-12 pr-8 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-white transition-all duration-300 min-w-[200px]"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-700">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" 
                    ? "bg-red-500 text-white" 
                    : "text-gray-400 hover:text-white"} transition-all duration-300`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" 
                    ? "bg-red-500 text-white" 
                    : "text-gray-400 hover:text-white"} transition-all duration-300`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Results Counter */}
            <div className="mt-4 text-center">
              <span className="text-gray-400">
                Showing {filteredProducts.length} of {products.length} products
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory && ` in ${selectedCategory}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading products...</p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-24 h-24 text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-300 mb-4">
              {products.length === 0 ? "No Products Available" : "No Products Found"}
            </h2>
            <p className="text-gray-400 mb-6">
              {products.length === 0 
                ? "Our catalog is being updated. Check back soon for new products."
                : "Try adjusting your search criteria or browse all categories."}
            </p>
            {(searchTerm || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                }}
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
            : "space-y-6"}>
            {filteredProducts.map((product) => (
              viewMode === "grid" ? (
                // Grid View
                <div 
                  key={product.id} 
                  className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-red-500/50 rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10"
                >
                  {/* Product Image */}
                  <div className="relative h-48 overflow-hidden">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <Package className="w-16 h-16 text-gray-600" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                      {product.name}
                    </h2>
                    {product.category && (
                      <p className="text-red-400 text-sm font-semibold mb-3 uppercase tracking-wide">
                        {product.category}
                      </p>
                    )}
                    {product.description && (
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    
                    <div className="flex gap-3">
                      <Link
                        to={`/product/${product.id}`}
                        className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-center flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                // List View
                <div 
                  key={product.id} 
                  className="group bg-gradient-to-r from-gray-900 to-black border border-gray-800 hover:border-red-500/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
                >
                  <div className="flex items-center gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-24 h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center rounded-lg">
                          <Package className="w-8 h-8 text-gray-500" />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                        {product.name}
                      </h2>
                      {product.category && (
                        <p className="text-red-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                          {product.category}
                        </p>
                      )}
                      {product.description && (
                        <p className="text-gray-400 text-sm">
                          {product.description}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex-shrink-0">
                      <Link
                        to={`/product/${product.id}`}
                        className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default ProductList;