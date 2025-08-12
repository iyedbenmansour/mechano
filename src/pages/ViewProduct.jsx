import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams, Link } from "react-router-dom";
import CommandForm from "./CommandForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  ArrowLeft, 
  Package, 
  ShoppingCart, 
  CheckCircle, 
  XCircle, 
  Tag, 
  Info, 
  DollarSign,
  Hash,
  Star,
  Shield,
  Truck
} from "lucide-react";

export default function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showCommandForm, setShowCommandForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to load product");
        console.error("Error fetching product:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md">
            <XCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <Link
              to="/products"
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="pt-20 pb-4 bg-gradient-to-r from-black via-gray-900 to-black border-b border-red-500/20">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            to="/products"
            className="inline-flex items-center text-gray-400 hover:text-red-400 transition-colors duration-300 font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800">
              {product.imageUrl ? (
                <div className="relative w-full h-full">
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                      <div className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
                    </div>
                  )}
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    style={{ opacity: imageLoading ? 0 : 1 }}
                    onLoad={() => setImageLoading(false)}
                    onError={() => setImageLoading(false)}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <Package className="w-24 h-24 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">No Image Available</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Availability Badge */}
            <div className="absolute top-6 right-6">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm ${
                product.availability 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {product.availability ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    In Stock
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    Out of Stock
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
                {product.name}
              </h1>
              {product.category && (
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-semibold uppercase tracking-wide text-sm">
                    {product.category}
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            {product.price && (
              <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-red-400" />
                  <span className="text-3xl font-black text-white">${product.price}</span>
                  <span className="text-gray-400">per unit</span>
                </div>
              </div>
            )}

            {/* Product Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Quantity */}
              {product.quantity && (
                <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Hash className="w-5 h-5 text-red-400" />
                    <h3 className="font-semibold text-white">Quantity</h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-300">{product.quantity}</p>
                </div>
              )}

              {/* Availability Status */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-red-400" />
                  <h3 className="font-semibold text-white">Status</h3>
                </div>
                <div className={`flex items-center gap-2 ${
                  product.availability ? 'text-green-400' : 'text-red-400'
                }`}>
                  {product.availability ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <XCircle className="w-5 h-5" />
                  )}
                  <span className="font-semibold">
                    {product.availability ? 'Available' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Info className="w-5 h-5 text-red-400" />
                  <h3 className="font-semibold text-white text-lg">Product Description</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl">
                <Star className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <h4 className="font-semibold text-white">Premium Quality</h4>
                <p className="text-gray-400 text-sm">Certified materials</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl">
                <Shield className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <h4 className="font-semibold text-white">Guaranteed</h4>
                <p className="text-gray-400 text-sm">Quality assurance</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl">
                <Truck className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <h4 className="font-semibold text-white">Fast Delivery</h4>
                <p className="text-gray-400 text-sm">Quick shipping</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => setShowCommandForm(true)}
                disabled={!product.availability}
                className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  product.availability
                    ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white transform hover:scale-105 shadow-2xl shadow-red-500/25'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-6 h-6" />
                {product.availability ? 'Order Now' : 'Currently Unavailable'}
              </button>
              
              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  Need help? <span className="text-red-400 font-semibold cursor-pointer hover:underline">Contact our experts</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Command Form Modal */}
      {showCommandForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-red-500/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CommandForm
              product={product}
              onClose={() => setShowCommandForm(false)}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}