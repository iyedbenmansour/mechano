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
  Truck,
  Heart,
  Share2,
  ChevronDown,
  ChevronRight,
  Award,
  Clock,
  Zap,
  StarHalf,
  Plus
} from "lucide-react";

// Cart utility functions for session management
const CartUtils = {
  CART_KEY: 'shopping_cart',
  
  getCart: () => {
    try {
      const cartData = sessionStorage.getItem(CartUtils.CART_KEY);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error reading cart from sessionStorage:', error);
      return [];
    }
  },
  
  saveCart: (cart) => {
    try {
      sessionStorage.setItem(CartUtils.CART_KEY, JSON.stringify(cart));
      console.log('Cart saved to sessionStorage:', cart);
    } catch (error) {
      console.error('Error saving cart to sessionStorage:', error);
    }
  },
  
  addToCart: (product, quantity) => {
    const cart = CartUtils.getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      // Ensure price is stored as a number
      const price = typeof product.price === 'number' ? product.price : 
                    (parseFloat(product.price) || 99.99);
                    
      cart.push({
        id: product.id,
        name: product.name,
        price: price,
        imageUrl: product.imageUrl,
        quantity: quantity,
        availability: product.availability,
        category: product.category,
        addedAt: new Date().toISOString() // Track when item was added
      });
    }
    
    CartUtils.saveCart(cart);
    return cart;
  },
  
  getCartItemsCount: () => {
    const cart = CartUtils.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },
  
  removeFromCart: (productId) => {
    const cart = CartUtils.getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    CartUtils.saveCart(updatedCart);
    return updatedCart;
  },
  
  updateQuantity: (productId, newQuantity) => {
    const cart = CartUtils.getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
      if (newQuantity <= 0) {
        return CartUtils.removeFromCart(productId);
      } else {
        item.quantity = newQuantity;
        CartUtils.saveCart(cart);
      }
    }
    
    return cart;
  },
  
  clearCart: () => {
    try {
      sessionStorage.removeItem(CartUtils.CART_KEY);
      console.log('Cart cleared from sessionStorage');
    } catch (error) {
      console.error('Error clearing cart from sessionStorage:', error);
    }
  },
  
  getCartTotal: () => {
    const cart = CartUtils.getCart();
    const total = cart.reduce((total, item) => {
      // Ensure price is a valid number
      const price = typeof item.price === 'number' ? item.price : 
                   (parseFloat(item.price) || 0);
      return total + (price * item.quantity);
    }, 0);
    
    // Make sure we have a valid number before calling toFixed
    return typeof total === 'number' ? parseFloat(total.toFixed(2)) : 0;
  },
  
  getFormattedCartTotal: () => {
    return CartUtils.getCartTotal().toFixed(2);
  }
};

export default function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showCommandForm, setShowCommandForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("description");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [showAddToCartSuccess, setShowAddToCartSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productData = docSnap.data();
          // Ensure price is stored as a number
          const price = typeof productData.price === 'number' ? productData.price : 
                       (parseFloat(productData.price) || 99.99);
          
          setProduct({ 
            id: docSnap.id, 
            ...productData,
            price: price 
          });
        } else {
          setError("Produit non trouvé");
        }
      } catch (err) {
        setError("Échec du chargement du produit");
        console.error("Erreur lors de la récupération du produit :", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= (product?.quantity || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!product.availability) return;
    
    setAddToCartLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      CartUtils.addToCart(product, quantity);
      
      // Show success message
      setShowAddToCartSuccess(true);
      setTimeout(() => setShowAddToCartSuccess(false), 3000);
      
      // Dispatch custom event to update cart count in navbar if needed
      window.dispatchEvent(new CustomEvent('cartUpdated', {
        detail: {
          cartCount: CartUtils.getCartItemsCount(),
          cartTotal: CartUtils.getCartTotal()
        }
      }));
      
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
      // You could add error state and show error message to user
    } finally {
      setAddToCartLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 text-lg">Chargement des détails du produit...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md">
            <XCircle className="w-24 h-24 text-orange-500 mx-auto mb-6" />
            <h2 className="text-2xl font-medium text-gray-800 mb-4">Produit non trouvé</h2>
            <p className="text-gray-500 mb-6">{error}</p>
            <Link
              to="/product"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-colors duration-200 inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux produits
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      
      {/* Success Toast */}
      {showAddToCartSuccess && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-slide-in-right">
          <CheckCircle className="w-5 h-5" />
          <span>Produit ajouté au panier !</span>
        </div>
      )}
      
      {/* Breadcrumb */}
      <div className="pt-20 pb-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-3">
            <nav className="text-sm text-gray-600 mb-4">
            <Link to="/">  <span className="hover:text-blue-600 cursor-pointer">Accueil</span></Link>
              <span className="mx-2">›</span>
              <Link to="/product" className="hover:text-blue-600 cursor-pointer">Tous les produits</Link>
              <span className="mx-2">›</span>
              {product.category && (
                <>
                    <Link to="/product" className="hover:text-blue-600 cursor-pointer">{product.category}</Link>
                  <span className="mx-2">›</span>
                </>
              )}
              <span className="text-gray-900 font-medium">{product.name}</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Images */}
          <div className="lg:w-2/5">
            <div className="sticky top-24">
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                <div className="relative">
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-600 rounded-full animate-spin"></div>
                    </div>
                  )}
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain aspect-square transition-opacity duration-300"
                      style={{ opacity: imageLoading ? 0 : 1 }}
                      onLoad={() => setImageLoading(false)}
                      onError={() => setImageLoading(false)}
                    />
                  ) : (
                    <div className="w-full aspect-square flex items-center justify-center bg-gray-100 rounded">
                      <Package className="w-24 h-24 text-gray-300" />
                    </div>
                  )}
                  
                  {/* Availability Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                      product.availability 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {product.availability ? (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          En stock
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" />
                          En rupture de stock
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Thumbnail Gallery (mock) */}
                <div className="flex gap-2 mt-4">
                
                </div>
              </div>
              
            
            </div>
          </div>
          
          {/* Right Column - Product Details */}
          <div className="lg:w-3/5">
            {/* Product Header */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
              <h1 className="text-2xl font-medium text-gray-900 mb-2">
                {product.name}
              </h1>
              
              {/* Ratings */}
              <div className="flex items-center gap-1 mb-4">
                <div className="flex text-orange-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <StarHalf className="w-5 h-5 fill-current" />
                </div>
                <span className="text-blue-600 text-sm hover:text-blue-700 hover:underline cursor-pointer">
  {Math.floor(Math.random() * 66) + " avis"}
</span>
                
                {product.category && (
                  <>
                    <span className="mx-2 text-gray-300">|</span>
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 text-gray-500 mr-1" />
                      <span className="text-sm text-gray-600 font-medium">{product.category}</span>
                    </div>
                  </>
                )}
              </div>
              
              {/* Price */}
              <div className="border-t border-b border-gray-200 py-4 my-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-medium text-gray-900">
                    {product.price.toFixed(2)} TND
                  </span>
                
                </div>
                
                {/* Mock discount */}
              
              </div>
              
              {/* Quick details */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">À propos de cet article :</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Les matériaux de qualité supérieure garantissent la durabilité et des performances durables</li>
                  <li>La conception facile à utiliser simplifie l'installation et l'entretien</li>
                  <li>Compatible avec la plupart des systèmes et applications standards</li>
                  <li>Soutenu par notre garantie de satisfaction et notre support client</li>
                </ul>
              </div>
            </div>
            
            {/* Buy Box */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
              <div className="mb-4">
                <span className="text-xl font-medium text-gray-900">
                  {product.price.toFixed(2)} TND
                </span>
              
              </div>
              
              <div className={`mb-4 text-sm ${product.availability ? 'text-green-700' : 'text-orange-700'} font-medium`}>
                {product.availability ? (
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>En stock</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <XCircle className="w-4 h-4" />
                    <span>En rupture de stock</span>
                  </div>
                )}
              </div>
              
              {/* Quantity selector */}
              <div className="mb-4">
                <label className="text-sm text-gray-700 block mb-1">Quantité :</label>
                <div className="flex items-center">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="border border-gray-300 rounded-l px-3 py-1 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <div className="border-t border-b border-gray-300 px-4 py-1 text-center min-w-[40px]">
                    {quantity}
                  </div>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="border border-gray-300 rounded-r px-3 py-1 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    disabled={quantity >= (product?.quantity || 10)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.availability || addToCartLoading}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    product.availability
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {addToCartLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Ajout en cours...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Ajouter au panier
                    </>
                  )}
                </button>

                {/* Buy Now Button */}
                <button
                  onClick={() => setShowCommandForm(true)}
                  disabled={!product.availability}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    product.availability
                      ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Acheter maintenant
                </button>
                
              </div>
              
              {/* Secure transaction */}
              <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-700">
                <div className="flex items-center gap-1 mb-1">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">Transaction sécurisée</span>
                </div>
                
                <div className="flex items-start gap-2 mt-3">
                  
                </div>
                
                <div className="flex items-start gap-2 mt-3">
                  <Award className="w-4 h-4 text-blue-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Garantie</div>
                  
                  </div>
                </div>
              </div>
            </div>
            
            
          
          </div>
        </div>
      </div>

      {/* Command Form Modal */}
      {showCommandForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CommandForm
              product={product}
              quantity={quantity}
              onClose={() => setShowCommandForm(false)}
            />
          </div>
        </div>
      )}

      <Footer />
      
      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}