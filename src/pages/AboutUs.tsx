import { Users, Award, Globe, Rocket } from 'lucide-react';

function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Navigation Spacer */}
      <div className="h-[64px] flex-none" />
      
      {/* Main Content Area */}
      <div 
        className="flex-1 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url('/hero.png')`
        }}
      >
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-white">About VirtualSpace</h1>
            <p className="text-xl text-gray-300">Revolutionizing the way businesses operate with premium virtual office solutions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
              <p className="text-gray-300 leading-relaxed">
                Founded in 2020, VirtualSpace emerged as a response to the evolving needs of modern businesses. We recognized that the future of work was changing, and businesses needed flexible, professional solutions that could adapt to their unique requirements. Our journey began with a vision to create the most comprehensive virtual office platform, combining premium business addresses with cutting-edge digital solutions.
              </p>
            </div>

            <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed">
                We're dedicated to empowering businesses of all sizes with professional virtual office solutions that enhance their credibility and operational efficiency. Our mission is to provide entrepreneurs and companies with prestigious business addresses, comprehensive mail handling services, and seamless virtual office management tools that help them succeed in today's digital economy.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#f59e0b]/20 rounded-full flex items-center justify-center mb-4">
                <Users className="text-[#f59e0b]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">10,000+</h3>
              <p className="text-gray-400">Active Clients</p>
            </div>

            <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#f59e0b]/20 rounded-full flex items-center justify-center mb-4">
                <Award className="text-[#f59e0b]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">50+</h3>
              <p className="text-gray-400">Premium Locations</p>
            </div>

            <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#f59e0b]/20 rounded-full flex items-center justify-center mb-4">
                <Globe className="text-[#f59e0b]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">15+</h3>
              <p className="text-gray-400">Countries Served</p>
            </div>

            <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#f59e0b]/20 rounded-full flex items-center justify-center mb-4">
                <Rocket className="text-[#f59e0b]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">99%</h3>
              <p className="text-gray-400">Client Satisfaction</p>
            </div>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Our Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-3">Premium Addresses</h3>
                <p className="text-gray-300">
                  Establish your business presence with prestigious addresses in prime business districts worldwide.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-3">Mail Management</h3>
                <p className="text-gray-300">
                  Professional mail handling services with scanning, forwarding, and secure digital storage options.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-3">Virtual Reception</h3>
                <p className="text-gray-300">
                  Dedicated virtual receptionists handling your calls and messages with professional excellence.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Why Choose Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-3">Flexibility</h3>
                <p className="text-gray-300">
                  Customizable virtual office solutions that grow with your business needs.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-3">Technology</h3>
                <p className="text-gray-300">
                  State-of-the-art digital platform for seamless virtual office management.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-3">Support</h3>
                <p className="text-gray-300">
                  24/7 dedicated support team ensuring smooth operations for your business.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors duration-200">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;