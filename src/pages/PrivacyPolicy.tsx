import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Navigation Spacer */}
      <div className="h-[64px] flex-none" />
      
      <div 
        className="flex-1 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80')`
        }}
      >
        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
              <Link 
                to="/contact" 
                className="flex items-center gap-2 text-[#f59e0b] hover:text-[#f59e0b]/80 transition-colors duration-200"
              >
                <ArrowLeft size={20} />
                Back to Contact
              </Link>
            </div>

            <div className="space-y-8 text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
                <p>
                  We collect information that you provide directly to us, including name, email address, and any other 
                  information you choose to provide.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
                <p>
                  We use the information we collect to operate, maintain, and provide the features and functionality of our service, 
                  to communicate directly with you, and for compliance purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing</h2>
                <p>
                  We do not share, sell, rent, or trade your personal information with third parties for their commercial purposes 
                  except as specifically described in this policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
                <p>
                  We use appropriate technical and organizational measures to protect the personal information that we collect and 
                  process about you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Your Rights</h2>
                <p>
                  You have the right to access, update, or delete your personal information. You can exercise these rights by 
                  contacting us through the provided contact information.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}