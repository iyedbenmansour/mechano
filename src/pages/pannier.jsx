// Panier.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CommandForm from '../components/commandform';
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  Package,
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  AlertCircle,
  CheckCircle,
  Trash2
} from 'lucide-react';

// Cart utility functions using sessionStorage (consistent with ViewProduct)
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
      
      // Dispatch cart update event
      window.dispatchEvent(new CustomEvent('cartUpdated', {
        detail: {
          cartCount: CartUtils.getTotalItems(),
          cartTotal: CartUtils.getTotal()
        }
      }));
    } catch (error) {
      console.error('Error saving cart to sessionStorage:', error);
    }
  },
  
  updateQuantity: (productId, newQuantity) => {
    const cart = CartUtils.getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
      if (newQuantity <= 0) {
        cart.splice(itemIndex, 1);
      } else {
        cart[itemIndex].quantity = newQuantity;
        cart[itemIndex].updatedAt = new Date().toISOString(); // Track when updated
      }
      CartUtils.saveCart(cart);
    }
    return cart;
  },
  
  removeItem: (productId) => {
    const cart = CartUtils.getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    CartUtils.saveCart(updatedCart);
    return updatedCart;
  },
  
  clearCart: () => {
    try {
      sessionStorage.removeItem(CartUtils.CART_KEY);
      console.log('Cart cleared from sessionStorage');
      
      // Dispatch cart update event
      window.dispatchEvent(new CustomEvent('cartUpdated', {
        detail: {
          cartCount: 0,
          cartTotal: 0
        }
      }));
      
      return [];
    } catch (error) {
      console.error('Error clearing cart from sessionStorage:', error);
      return [];
    }
  },
  
  getTotal: () => {
    const cart = CartUtils.getCart();
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      return total + (price * item.quantity);
    }, 0);
  },
  
  getTotalItems: () => {
    const cart = CartUtils.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },
  
  // Additional utility methods
  getItemCount: (productId) => {
    const cart = CartUtils.getCart();
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  },
  
  hasItem: (productId) => {
    const cart = CartUtils.getCart();
    return cart.some(item => item.id === productId);
  }
};

export default function Panier() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [updateLoading, setUpdateLoading] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Load cart items on component mount
  useEffect(() => {
    setLoading(true);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      const items = CartUtils.getCart();
      setCartItems(items);
      setLoading(false);
    }, 300);
  }, []);

  // Listen for cart updates from other components
  useEffect(() => {
    const handleCartUpdate = () => {
      setCartItems(CartUtils.getCart());
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleQuantityChange = async (productId, change) => {
    const item = cartItems.find(item => item.id === productId);
    if (!item) return;
    
    const newQuantity = item.quantity + change;
    if (newQuantity < 1) return;
    
    // Show loading state for this specific item
    setUpdateLoading(prev => ({ ...prev, [productId]: true }));
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const updatedCart = CartUtils.updateQuantity(productId, newQuantity);
      setCartItems(updatedCart);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setUpdateLoading(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleRemoveItem = async (productId) => {
    setUpdateLoading(prev => ({ ...prev, [productId]: true }));
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const updatedCart = CartUtils.removeItem(productId);
      setCartItems(updatedCart);
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setUpdateLoading(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedCart = CartUtils.clearCart();
      setCartItems(updatedCart);
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderSingleItem = (product) => {
    setSelectedProduct({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity: product.quantity
    });
    setShowOrderForm(true);
  };

  const handleOrderAllItems = () => {
    // Create a combined product for all items
    setSelectedProduct({
      id: 'cart-order',
      name: `Commande (${totalItems} articles)`,
      price: total / totalItems,
      quantity: totalItems
    });
    setShowOrderForm(true);
  };

  const handleOrderSuccess = () => {
    // Clear cart after successful order
    CartUtils.clearCart();
    setCartItems([]);
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 5000);
  };

  const total = CartUtils.getTotal();
  const totalItems = CartUtils.getTotalItems();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 text-lg">Chargement du panier...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Success Message */}
      {orderSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-8 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3 animate-slide-in">
          <CheckCircle className="w-6 h-6" />
          <div>
            <div className="font-semibold">Commande confirmée !</div>
            <div className="text-sm">Vous recevrez un email de confirmation bientôt.</div>
          </div>
        </div>
      )}
      
      <div className="pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Mon Panier</h1>
                  <p className="text-gray-600">
                    {totalItems > 0 ? `${totalItems} article${totalItems > 1 ? 's' : ''}` : 'Panier vide'}
                  </p>
                </div>
              </div>
              <Link
                to="/product"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Continuer mes achats
              </Link>
            </div>
          </div>

          {cartItems.length === 0 ? (
            /* Empty Cart */
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-xl font-medium text-gray-900 mb-2">Votre panier est vide</h2>
              <p className="text-gray-600 mb-6">Découvrez nos produits et ajoutez-les à votre panier</p>
              <Link
                to="/product"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Voir les produits
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative">
                    {updateLoading[item.id] && (
                      <div className="absolute inset-0 bg-white/70 rounded-lg flex items-center justify-center z-10">
                        <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-600 rounded-full animate-spin"></div>
                      </div>
                    )}
                    
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-24 h-24 object-contain rounded-lg border border-gray-200"
                          />
                        ) : (
                          <div className="w-24 h-24 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                            <Package className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                            {item.category && (
                              <p className="text-sm text-gray-600">{item.category}</p>
                            )}
                            {item.addedAt && (
                              <p className="text-xs text-gray-400">
                                Ajouté le {new Date(item.addedAt).toLocaleDateString('fr-FR')}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleOrderSingleItem(item)}
                              className="text-orange-500 hover:text-orange-700 p-1 transition-colors"
                              title="Commander"
                              disabled={updateLoading[item.id]}
                            >
                              <ShoppingCart className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-700 p-1 transition-colors"
                              title="Supprimer"
                              disabled={updateLoading[item.id]}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Price and Availability */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg font-semibold text-gray-900">
                            {parseFloat(item.price).toFixed(2)} TND
                          </span>
                          <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
                            item.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {item.availability ? (
                              <>
                                <CheckCircle className="w-3 h-3" />
                                En stock
                              </>
                            ) : (
                              <>
                                <AlertCircle className="w-3 h-3" />
                                Rupture
                              </>
                            )}
                          </div>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <button
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="border border-gray-300 rounded-l px-3 py-1 hover:bg-gray-50 transition-colors disabled:opacity-50"
                              disabled={item.quantity <= 1 || updateLoading[item.id]}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <div className="border-t border-b border-gray-300 px-4 py-1 min-w-[60px] text-center bg-gray-50">
                              {item.quantity}
                            </div>
                            <button
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="border border-gray-300 rounded-r px-3 py-1 hover:bg-gray-50 transition-colors disabled:opacity-50"
                              disabled={updateLoading[item.id]}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-lg font-semibold text-gray-900">
                              {(parseFloat(item.price) * item.quantity).toFixed(2)} TND
                            </div>
                            <div className="text-sm text-gray-500">
                              {parseFloat(item.price).toFixed(2)} TND × {item.quantity}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Clear Cart Button */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <button
                    onClick={handleClearCart}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                    disabled={loading}
                  >
                    <X className="w-4 h-4" />
                    Vider le panier
                  </button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Résumé de commande</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Sous-total ({totalItems} articles)</span>
                      <span>{total.toFixed(2)} TND</span>
                    </div>
                  
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-lg font-semibold text-gray-900">
                        <span>Total</span>
                        <span>{total.toFixed(2)} TND</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleOrderAllItems}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 mb-3"
                    disabled={cartItems.length === 0}
                  >
                    <CreditCard className="w-5 h-5" />
                    Passer commande
                  </button>
                  
                  <div className="text-xs text-gray-500 space-y-2">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>Paiement 100% sécurisé</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-blue-500" />
                      <span>Livraison gratuite</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Order Modal with CommandForm */}
      {showOrderForm && selectedProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full overflow-hidden">
            <CommandForm 
              product={{
                id: selectedProduct.id,
                name: selectedProduct.name,
                price: selectedProduct.price,
              }}
              quantity={selectedProduct.quantity}
              onClose={() => {
                setShowOrderForm(false);
                // Don't call handleOrderSuccess here anymore
              }}
              onOrderSuccess={handleOrderSuccess} // New prop to handle successful orders
            />
          </div>
        </div>
      )}
      
      <Footer />
      
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}