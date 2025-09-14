"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search, Filter, Grid, List, Package, Eye, Wrench, Sprout, ChevronDown, Star, StarHalf, ArrowLeft, XCircle } from "lucide-react";

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
        console.error("Erreur lors de la récupération des produits :", error);
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
      console.error("Erreur lors de la suppression du produit :", error);
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

      {/* Breadcrumb and title section */}
      <div className="pt-20 pb-4 bg-white border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-3">
            <nav className="text-sm text-gray-600 mb-4">
            <Link to="/">  <span className="hover:text-blue-600 cursor-pointer">Accueil</span></Link>
              <span className="mx-2 text-orange-400">›</span>
              <span className="text-blue-900 font-medium">Tous les produits</span>
            </nav>
            
            <h1 className="text-2xl font-normal text-blue-900 mb-4">
              Résultats pour <span className="font-medium text-orange-600">"Tous les produits"</span>
            </h1>
            
            {/* Search and filter bar */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Rechercher des produits..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm transition-all"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none px-3 py-2 pr-8 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm bg-white min-w-[150px] transition-all"
                  >
                    <option value="">Toutes les catégories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Sort and View options */}
              <div className="flex items-center gap-4">
                <div className="flex border border-blue-300 rounded">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors ${viewMode === "grid" ? "bg-blue-500 text-white" : "bg-white text-blue-600 hover:bg-blue-50"}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors ${viewMode === "list" ? "bg-blue-500 text-white" : "bg-white text-blue-600 hover:bg-blue-50"}`}
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
          {/* Left Sidebar - Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-blue-200 p-4 sticky top-24 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-blue-900">Affiner par</h3>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-orange-500 hover:text-orange-600 transition-colors"
                >
                  Tout effacer
                </button>
              </div>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-blue-900 mb-3">Catégorie</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {categories.map(category => (
                    <label key={category} className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={tempFilters.categories.includes(category)}
                        onChange={(e) => handleCategoryChange(category, e.target.checked)}
                        className="text-blue-600 focus:ring-blue-500 focus:ring-2 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 hover:text-blue-600">{category}</span>
                      <span className="ml-auto text-xs text-orange-500 bg-orange-50 px-2 py-1 rounded-full">
                        {products.filter(p => p.category === category).length}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-blue-900 mb-3">Fourchette de prix</h4>
                <div className="space-y-3">
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      placeholder="Min"
                      value={tempFilters.priceRange.min}
                      onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                    <span className="text-orange-500 font-medium">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={tempFilters.priceRange.max}
                      onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    Fourchette de prix : <span className="text-blue-600">{Math.min(...products.map(getProductPrice))} TND</span> - <span className="text-orange-500">{Math.max(...products.map(getProductPrice))} TND</span>
                  </div>
                </div>
              </div>

              {/* Apply Filters Button */}
              <button
                onClick={applyFilters}
                className="w-full bg-orange-500 hover:from-blue-700 hover:to-orange-600 text-white font-medium py-2 px-4 rounded-md text-sm transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Appliquer les filtres
              </button>
              
              {/* Active Filters Display */}
              {(appliedFilters.categories.length > 0 || appliedFilters.priceRange.min || appliedFilters.priceRange.max) && (
                <div className="mt-4 pt-4 border-t border-blue-100">
                  <h5 className="text-sm font-medium text-blue-900 mb-2">Filtres actifs :</h5>
                  <div className="space-y-1">
                    {appliedFilters.categories.map(category => (
                      <span key={category} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                        {category}
                      </span>
                    ))}
                    {(appliedFilters.priceRange.min || appliedFilters.priceRange.max) && (
                      <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                        {appliedFilters.priceRange.min || '0'} TND - {appliedFilters.priceRange.max || '∞'} TND
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
                  <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-500">Chargement des produits...</p>
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-lg border border-blue-200 shadow-sm">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-medium text-blue-900 mb-2">
                  {products.length === 0 ? "Aucun produit à afficher" : "Aucun résultat trouvé"}
                </h2>
                <p className="text-gray-500 mb-6">
                  {products.length === 0
                    ? "Revenez plus tard pour de nouveaux produits."
                    : "Essayez d'autres mots-clés ou supprimez les filtres de recherche."}
                </p>
                {(searchTerm || selectedCategory) && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("");
                      clearAllFilters();
                    }}
                    className="bg-orange-500 hover:from-blue-700 hover:to-orange-600 text-white font-medium px-6 py-2 rounded-md text-sm shadow-lg hover:shadow-xl transition-all"
                  >
                    Effacer les filtres
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
                    // Grid View
                    <div
                      key={product.id}
                      className="bg-white border border-blue-200 rounded-lg hover:shadow-lg transition-all duration-200 p-4 group hover:border-orange-300"
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
                            <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center rounded">
                              <Wrench className="w-12 h-12 text-blue-400" />
                            </div>
                          )}
                        </Link>
                      </div>
                      
                      <div className="space-y-2">
                        <Link to={`/product/${product.id}`}>
                          <h3 className="text-sm font-medium text-blue-900 hover:text-orange-500 line-clamp-2 leading-tight transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-semibold text-blue-900">
                            {productPrice.toFixed(2)} TND
                          </span>
                        </div>
                        
                        {product.category && (
                          <div className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full uppercase tracking-wide inline-block border border-orange-200">
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
                            className="inline-block bg-orange-500 hover:from-blue-700 hover:to-orange-600 text-white text-sm font-medium px-4 py-2 rounded-md transition-all duration-200 w-full text-center shadow-md hover:shadow-lg"
                          >
                            Acheter maintenant
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // List View
                    <div
                      key={product.id}
                      className="bg-white border border-blue-200 rounded-lg hover:shadow-md transition-all duration-200 p-4 hover:border-orange-300"
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
                              <div className="w-full h-32 bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center rounded">
                                <Wrench className="w-8 h-8 text-blue-400" />
                              </div>
                            )}
                          </Link>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <Link to={`/product/${product.id}`}>
                            <h3 className="text-lg font-medium text-blue-900 hover:text-orange-500 mb-1 transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                        
                          <div className="flex items-center mb-2">
                            <span className="text-xl font-semibold text-blue-900">
                              {productPrice.toFixed(2)} TND
                            </span>
                          </div>
                          
                          {product.category && (
                            <div className="text-sm text-gray-600 mb-2">
                              Catégorie : <span className="text-orange-600 font-medium">{product.category}</span>
                            </div>
                          )}
                          
                          {product.description && (
                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                              {product.description}
                            </p>
                          )}
                          
                          <Link
                            to={`/product/${product.id}`}
                            className="inline-block bg-orange-500 hover:from-blue-700 hover:to-orange-600 text-white text-sm font-medium px-6 py-2 rounded-md transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            Voir les détails
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