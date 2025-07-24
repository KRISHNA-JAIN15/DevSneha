import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-950 flex items-center justify-center px-6 py-20">
      <div className="max-w-lg w-full bg-gray-900 rounded-3xl shadow-2xl p-12 sm:p-16 text-center relative overflow-hidden border border-gray-700">
        {/* Decorative circles */}
        <div className="absolute top-[-80px] left-[-80px] w-40 h-40 bg-blue-900 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute bottom-[-60px] right-[-60px] w-32 h-32 bg-purple-900 rounded-full opacity-30 animate-pulse animation-delay-1000"></div>

        <h2 className="text-5xl font-extrabold text-blue-400 mb-12 tracking-wide drop-shadow-lg">
          Get in Touch
        </h2>

        <p className="text-gray-300 mb-10 max-w-md mx-auto leading-relaxed text-lg">
          Whether you have questions, want to collaborate, or just say hi, we're here! Reach out anytime — we’d love to hear from you.
        </p>

        <div className="space-y-10 max-w-md mx-auto">
          {/* Name */}
          <div className="fade-in-up animation-delay-300">
            <p className="text-2xl font-semibold text-blue-400 mb-1 drop-shadow-md">
              Ashika Jain
            </p>
{/*             <p className="text-gray-300 text-lg">John Doe</p> */}
          </div>

          {/* Phone */}
          <div className="flex items-center justify-center space-x-4 fade-in-up animation-delay-600 hover:text-blue-500 transition-colors cursor-pointer">
            <Phone className="text-blue-400 drop-shadow" size={28} />
            <a
              href="tel:+918527803591"
              className="text-white text-lg font-medium underline decoration-blue-600 hover:decoration-blue-400"
            >
              +91 8527803591
            </a>
          </div>

          {/* Email */}
          <div className="flex items-center justify-center space-x-4 fade-in-up animation-delay-900 hover:text-blue-500 transition-colors cursor-pointer">
            <Mail className="text-blue-400 drop-shadow" size={28} />
            <a
              href="mailto:multitalentedmahi@gmail.com"
              className="text-white text-lg font-medium underline decoration-blue-600 hover:decoration-blue-400"
            >
              multitalentedmahi@gmail.com
            </a>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center space-x-4 fade-in-up animation-delay-[1200ms]">
            <MapPin className="text-blue-400 drop-shadow" size={28} />
            <p className="text-lg font-medium text-gray-300">Paramount Symphony , Crossing Republik</p>
          </div>
        </div>
      </div>

      {/* Custom animation styles */}
      <style>{`
        .fade-in-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s forwards;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        .animation-delay-900 {
          animation-delay: 900ms;
        }
        .animation-delay-\\[1200ms\\] {
          animation-delay: 1200ms;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        /* Pulse animation delay */
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default Contact;
