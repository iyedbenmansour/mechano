"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search, Filter, Grid, List, Package, Eye, Wrench, Sprout, ChevronDown, Star, StarHalf } from "lucide-react";

import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [tempFilters, setTempFilters] = useState({
    categories: [],
    priceRange: { min: "", max: "" }
  });
  const [appliedFilters, setAppliedFilters] = useState({
    categories: [],
    priceRange: { min: "", max: "" }
  });

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

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  const handleCategoryChange = (category, checked) => {
    if (checked) {
      setTempFilters(prev => ({
        ...prev,
        categories: [...prev.categories, category]
      }));
    } else {
      setTempFilters(prev => ({
        ...prev,
        categories: prev.categories.filter(c => c !== category)
      }));
    }
  };

  const handlePriceRangeChange = (field, value) => {
    setTempFilters(prev => ({
      ...prev,
      priceRange: { ...prev.priceRange, [field]: value }
    }));
  };

  const applyFilters = () => {
    setAppliedFilters({ ...tempFilters });
  };

  const clearAllFilters = () => {
    const emptyFilters = { categories: [], priceRange: { min: "", max: "" } };
    setTempFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setSearchTerm("");
    setSelectedCategory("");
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = appliedFilters.categories.length === 0 || 
      appliedFilters.categories.includes(product.category);
    
    // Mock price for filtering (you can replace this with actual price field)
    const mockPrice = product.price || (product.name?.length || 0) * 10 + 50;
    const matchesPrice = (!appliedFilters.priceRange.min || mockPrice >= parseFloat(appliedFilters.priceRange.min)) &&
      (!appliedFilters.priceRange.max || mockPrice <= parseFloat(appliedFilters.priceRange.max));
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Mock price generator for products (replace with actual price field)
  const getProductPrice = (product) => {
    return product.price || (product.name?.length || 0) * 10 + 50;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />

      {/* Amazon-style breadcrumb and title section */}
      <div className="pt-20 pb-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-3">
            <nav className="text-sm text-gray-600 mb-4">
              <span className="hover:text-red-600 cursor-pointer">Home</span>
              <span className="mx-2">›</span>
              <span className="text-gray-900 font-medium">All Products</span>
            </nav>
            
            <h1 className="text-2xl font-normal text-gray-900 mb-4">
              Results for <span className="font-medium">"All Products"</span>
            </h1>
            
            {/* Amazon-style search and filter bar */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-red-500 focus:ring-1 focus:ring-red-500 text-sm"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none px-3 py-2 pr-8 border border-gray-300 rounded-md focus:border-red-500 focus:ring-1 focus:ring-red-500 text-sm bg-white min-w-[150px]"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Sort and View options */}
              <div className="flex items-center gap-4">
              

                <div className="flex border border-gray-300 rounded">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1 ${viewMode === "grid" ? "bg-gray-100" : ""}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1 ${viewMode === "list" ? "bg-gray-100" : ""}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar - Amazon style filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Refine by</h3>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Clear all
                </button>
              </div>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={tempFilters.categories.includes(category)}
                        onChange={(e) => handleCategoryChange(category, e.target.checked)}
                        className="text-red-600 focus:ring-red-500 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{category}</span>
                      <span className="ml-auto text-xs text-gray-400">
                        ({products.filter(p => p.category === category).length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-3">
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      placeholder="Min"
                      value={tempFilters.priceRange.min}
                      onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={tempFilters.priceRange.max}
                      onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    Price range: ${Math.min(...products.map(getProductPrice))} - ${Math.max(...products.map(getProductPrice))}
                  </div>
                </div>
              </div>

              {/* Apply Filters Button */}
              <button
                onClick={applyFilters}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors duration-200"
              >
                Apply Filters
              </button>
              
              {/* Active Filters Display */}
              {(appliedFilters.categories.length > 0 || appliedFilters.priceRange.min || appliedFilters.priceRange.max) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Active Filters:</h5>
                  <div className="space-y-1">
                    {appliedFilters.categories.map(category => (
                      <span key={category} className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                        {category}
                      </span>
                    ))}
                    {(appliedFilters.priceRange.min || appliedFilters.priceRange.max) && (
                      <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                        ${appliedFilters.priceRange.min || '0'} - ${appliedFilters.priceRange.max || '∞'}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Product Area */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-red-500/30 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading products...</p>
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-medium text-gray-800 mb-2">
                  {products.length === 0 ? "No products to display" : "No results found"}
                </h2>
                <p className="text-gray-500 mb-6">
                  {products.length === 0
                    ? "Check back later for new products."
                    : "Try different keywords or remove search filters."}
                </p>
                {(searchTerm || selectedCategory) && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("");
                      clearAllFilters();
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-md text-sm"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <div className={viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                : "space-y-4"}>
                {filteredProducts.map((product) => {
                  const productPrice = getProductPrice(product);
                  
                  return viewMode === "grid" ? (
                    // Amazon Grid View
                    <div
                      key={product.id}
                      className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200 p-4 group"
                    >
                      <div className="relative mb-3">
                        <Link to={`/product/${product.id}`}>
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-200"
                            />
                          ) : (
                            <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded">
                              <Wrench className="w-12 h-12 text-gray-300" />
                            </div>
                          )}
                        </Link>
                      </div>
                      
                      <div className="space-y-2">
                        <Link to={`/product/${product.id}`}>
                          <h3 className="text-sm font-medium text-gray-900 hover:text-red-600 line-clamp-2 leading-tight">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-semibold text-gray-900">
                            ${productPrice.toFixed(2)}
                          </span>
                        </div>
                        
                        {product.category && (
                          <div className="text-xs text-gray-600 uppercase tracking-wide">
                            {product.category}
                          </div>
                        )}
                        
                        {product.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {product.description}
                          </p>
                        )}
                        
                        <div className="pt-2">
                          <Link
                            to={`/product/${product.id}`}
                            className="inline-block bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors duration-200 w-full text-center"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Amazon List View
                    <div
                      key={product.id}
                      className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 p-4"
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-32">
                          <Link to={`/product/${product.id}`}>
                            {product.imageUrl ? (
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-32 object-contain"
                              />
                            ) : (
                              <div className="w-full h-32 bg-gray-100 flex items-center justify-center rounded">
                                <Wrench className="w-8 h-8 text-gray-300" />
                              </div>
                            )}
                          </Link>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <Link to={`/product/${product.id}`}>
                            <h3 className="text-lg font-medium text-gray-900 hover:text-red-600 mb-1">
                              {product.name}
                            </h3>
                          </Link>
                       
                          
                          {product.category && (
                            <div className="text-sm text-gray-600 mb-2">
                              Category: <span className="text-gray-900">{product.category}</span>
                            </div>
                          )}
                          
                          {product.description && (
                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                              {product.description}
                            </p>
                          )}
                          
                          <Link
                            to={`/product/${product.id}`}
                            className="inline-block bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-6 py-2 rounded-md transition-colors duration-200"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProductList;