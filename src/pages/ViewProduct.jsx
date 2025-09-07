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
  StarHalf
} from "lucide-react";

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
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
      
      {/* Breadcrumb */}
      <div className="pt-20 pb-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-3">
            <nav className="text-sm text-gray-600 mb-4">
            <Link to="/">  <span className="hover:text-blue-600 cursor-pointer">Accueil</span></Link>
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
                  24 avis
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
                    {product.price || 99.99} TND
                  </span>
                  <span className="text-sm text-gray-500">
                    + Livraison Gratuite
                  </span>
                </div>
                
                {/* Mock discount */}
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm text-gray-500 line-through">
                    {(parseFloat(product.price || 99.99) * 1.2).toFixed(2)} TND
                  </span>
                  <span className="text-xs font-medium text-orange-700 bg-orange-100 px-1.5 py-0.5 rounded">
                    Économisez 20%
                  </span>
                </div>
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
                  {product.price || 99.99} TND
                </span>
                <div className="text-sm text-blue-600 hover:text-blue-700 hover:underline cursor-pointer">
                  Livraison GRATUITE disponible
                </div>
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
                    className="border border-gray-300 rounded-l px-3 py-1 hover:bg-blue-50 hover:border-blue-300"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <div className="border-t border-b border-gray-300 px-4 py-1 text-center min-w-[40px]">
                    {quantity}
                  </div>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="border border-gray-300 rounded-r px-3 py-1 hover:bg-blue-50 hover:border-blue-300"
                    disabled={quantity >= (product?.quantity || 10)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowCommandForm(true)}
                  disabled={!product.availability}
                  className={`w-full py-2 px-4 rounded-full font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
                    product.availability
                      ? 'bg-orange-500 hover:from-blue-700 hover:to-orange-600 text-white'
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
                  <Truck className="w-4 h-4 text-orange-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Livraison rapide</div>
                    <div className="text-gray-500">Expédié généralement sous 2-3 jours ouvrables</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 mt-3">
                  <Award className="w-4 h-4 text-blue-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Garantie</div>
                    <div className="text-gray-500">Garantie constructeur d'un an</div>
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
    </div>
  );
}