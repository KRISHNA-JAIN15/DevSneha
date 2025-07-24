import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../api/product";
import {
  IndianRupee,
  Sparkles,
  TrendingUp,
  Star,
  ShoppingBag,
  ArrowRight,
  Package,
  Heart,
  Eye,
  Zap,
  Gift,
  Crown,
} from "lucide-react";

const Home = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [rakhiProducts, setRakhiProducts] = useState([]);
  const [vastraProducts, setVastraProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      const [rakhiResponse, vastraResponse] = await Promise.all([
        axios.get("/tag/rakhi"),
        axios.get("/tag/Vastra"),
      ]);

      const rakhiData = rakhiResponse.data;
      const vastraData = vastraResponse.data;

      setRakhiProducts(rakhiData.slice(0, 4));
      setVastraProducts(vastraData.slice(0, 4));
      setFeaturedProducts([
        ...rakhiData.slice(0, 2),
        ...vastraData.slice(0, 2),
      ]);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-6">
          {/* Hero Section */}
          <div className="text-center space-y-8 max-w-4xl">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                <span className="text-yellow-400 font-semibold tracking-wider uppercase text-sm">
                  Premium Collection
                </span>
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>

              <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                ELEVATE
                <span className="block text-5xl md:text-7xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  YOUR STYLE
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Discover extraordinary fashion and traditional pieces that
                define your unique story
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/signin"
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold text-lg transition-all duration-300 hover:from-purple-500 hover:to-pink-500 hover:scale-105 hover:shadow-2xl"
              >
                <span className="flex items-center space-x-2">
                  <span>Start Shopping</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </Link>

              <Link
                to="/signup"
                className="px-8 py-4 border-2 border-white/20 backdrop-blur-sm rounded-full text-white font-bold text-lg hover:border-white/40 hover:bg-white/10 transition-all duration-300"
              >
                Create Account
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <Crown className="w-8 h-8 text-yellow-400 mb-3 mx-auto" />
                <h3 className="text-lg font-bold mb-2">Premium Quality</h3>
                <p className="text-gray-400 text-sm">
                  Curated collection of finest traditional and modern wear
                </p>
              </div>

              <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <Zap className="w-8 h-8 text-purple-400 mb-3 mx-auto" />
                <h3 className="text-lg font-bold mb-2">Fast Delivery</h3>
                <p className="text-gray-400 text-sm">
                  Quick and secure delivery to your doorstep
                </p>
              </div>

              <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <Gift className="w-8 h-8 text-pink-400 mb-3 mx-auto" />
                <h3 className="text-lg font-bold mb-2">Special Occasions</h3>
                <p className="text-gray-400 text-sm">
                  Perfect pieces for festivals and celebrations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full animate-bounce"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Star className="w-6 h-6 text-yellow-300 animate-spin" />
              <span className="text-yellow-300 font-semibold tracking-widest uppercase text-sm">
                Welcome !!!
              </span>
              <Star className="w-6 h-6 text-yellow-300 animate-spin" />
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Hey{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                {user.name}
              </span>{" "}
              👋
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Ready to discover something amazing today?
            </p>

            <div className="text-lg text-purple-200 mb-8">
              {currentTime.toLocaleTimeString()} •{" "}
              {currentTime.toLocaleDateString()}
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="backdrop-blur-sm bg-white/10 rounded-2xl px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold">
{/*                   {rakhiProducts.length + vastraProducts.length}+ */}
                  50+
                </div>
                <div className="text-sm text-purple-200">Products</div>
              </div>
              <div className="backdrop-blur-sm bg-white/10 rounded-2xl px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold">2</div>
                <div className="text-sm text-purple-200">Collections</div>
              </div>
              <div className="backdrop-blur-sm bg-white/10 rounded-2xl px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold">⭐ 4.9</div>
                <div className="text-sm text-purple-200">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            <span className="text-purple-600 font-semibold tracking-wider uppercase text-sm">
              Trending Now
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Collection
            </span>
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-lg animate-pulse"
              >
                <div className="h-64 bg-gray-200 rounded-t-3xl"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product._id}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border hover:border-purple-200 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Product Badge */}
                <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  FEATURED
                </div>

                {/* Like Button */}
                {/* <button className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white">
                  <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                </button> */}

                {/* Product Image */}
                <div className="relative overflow-hidden h-64 bg-gradient-to-br from-purple-100 to-pink-100">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-16 h-16 text-purple-400" />
                    </div>
                  )}

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    {/* <button className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="w-4 h-4" />
                      <span>Quick View</span>
                    </button> */}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1 group-hover:text-purple-600 transition-colors">
                    {product.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description || "Premium quality product"}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-2xl font-bold text-gray-800">
                      <IndianRupee className="w-5 h-5" />
                      <span>{product.price.toLocaleString("en-IN")}</span>
                    </div>

                    {/* <div className="flex items-center space-x-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Collections Preview */}
      <div className="bg-gradient-to-r from-gray-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Explore Our{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Collections
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From traditional elegance to contemporary style
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Rakhi Collection */}
            <Link
              to="/rakhi"
              className="group relative bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 overflow-hidden hover:scale-105 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-4">🪬</div>
                <h3 className="text-3xl font-bold mb-2">Accessories Collection</h3>
                <p className="text-orange-100 mb-6">
                  Celebrate traditions with graceful accessories
                </p>
                <div className="flex items-center text-white font-semibold">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Vastra Collection */}
            <Link
              to="/vastra"
              className="group relative bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 overflow-hidden hover:scale-105 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-4">👗</div>
                <h3 className="text-3xl font-bold mb-2">Vastra Collection</h3>
                <p className="text-purple-100 mb-6">
                  Exquisite clothing for every occasion
                </p>
                <div className="flex items-center text-white font-semibold">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <span className="text-purple-600 font-semibold tracking-wider uppercase text-sm">
              Start Shopping
            </span>
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Ready to find your perfect piece?
          </h2>

          <p className="text-xl text-gray-600 mb-8">
            Browse our complete collection and discover items that speak to your
            style
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105">
              <ShoppingBag className="w-5 h-5" />
              <span>Shop Now</span>
            </button>

            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-bold text-lg hover:border-purple-600 hover:text-purple-600 transition-all duration-300">
              Browse Catalog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
