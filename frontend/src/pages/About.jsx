import React from 'react';
import { Heart, Star, Gift, Sparkles } from 'lucide-react';
import { redirect } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-700 via-purple-900 to-pink-700 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-purple-100">
              Divine Collections
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90 text-purple-300">
              Bringing sacred traditions and divine blessings to your doorstep through 
              exquisite God Vastra and beautiful seasonal Rakhis.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-20 fill-purple-900">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-purple-100 mb-6 flex items-center">
              <Heart className="text-pink-400 mr-3" size={36} />
              Our Divine Journey
            </h2>
            <p className="text-lg text-purple-300 mb-6 leading-relaxed">
              Rooted in devotion and crafted with love, our collection celebrates the rich 
              spiritual heritage of India. We specialize in authentic God Vastra that adorns 
              deities with dignity and grace, and handcrafted Rakhis that symbolize the 
              eternal bond of love and protection.
            </p>
            <p className="text-lg text-purple-300 leading-relaxed">
              Every piece in our catalogue is carefully selected to bring divine blessings 
              and joy to your sacred spaces and celebrations.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl">
            <div className="text-center">
              <Sparkles className="text-pink-500 mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold text-purple-100 mb-4">Our Mission</h3>
              <p className="text-purple-300 leading-relaxed">
                To preserve and promote sacred traditions by providing authentic, 
                high-quality spiritual products that enhance your devotional practices 
                and festive celebrations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Categories */}
      <div className="bg-white/10 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-purple-100 mb-16">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {/* God Vastra */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
              <div className="text-center">
                <Star className="text-pink-400 mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-bold text-purple-100 mb-4">Sacred God Vastra</h3>
                <ul className="text-purple-300 space-y-2 text-left">
                  <li>• Exquisite silk and cotton garments for deities</li>
                  <li>• Traditional dhoti, kurta, and saree collections</li>
                  <li>• Seasonal festival wear and special occasion attire</li>
                  <li>• Custom embroidery and personalization options</li>
                  <li>• Premium quality fabrics with authentic designs</li>
                </ul>
              </div>
            </div>

            {/* Rakhi Collection */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
              <div className="text-center">
                <Gift className="text-pink-500 mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-bold text-purple-100 mb-4">Seasonal Rakhi Collection</h3>
                <ul className="text-purple-300 space-y-2 text-left">
                  <li>• Handcrafted traditional and designer Rakhis</li>
                  <li>• Eco-friendly and sustainable materials</li>
                  <li>• Kids' cartoon and themed Rakhi sets</li>
                  <li>• Premium gift hampers and combinations</li>
                  <li>• International shipping for global families</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gradient-to-r from-purple-800 to-pink-700 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-purple-100 mb-16">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: <Heart size={32} className="text-pink-400"/>, title: "Devotion", desc: "Every product is crafted with genuine devotion and respect for sacred traditions" },
              { icon: <Star size={32} className="text-purple-300"/>, title: "Quality", desc: "Premium materials and meticulous attention to detail in every creation" },
              { icon: <Gift size={32} className="text-pink-500"/>, title: "Service", desc: "Dedicated to bringing joy and spiritual fulfillment to your celebrations" }
            ].map((val, idx) => (
              <div key={idx} className="text-center text-purple-100">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                <p className="opacity-90">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-purple-900 to-pink-800 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-purple-100 mb-6">
            Join Our Divine Family
          </h2>
          <p className="text-lg text-purple-300 mb-8 leading-relaxed">
            Experience the beauty of authentic spiritual products and celebrate traditions 
            with our carefully curated collections. Let us be part of your sacred journey 
            and festive celebrations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 hover:brightness-110 text-white px-8 py-3 rounded-full font-semibold shadow-md transition duration-300">
              Explore Collection
            </button>
            <button onClick={() => window.location.href = '/contact'} className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-8 py-3 rounded-full font-semibold transition duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
