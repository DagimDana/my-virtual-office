import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsAndConditions() {
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
              <h1 className="text-3xl font-bold text-white">Terms & Conditions</h1>
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
                <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using this virtual office platform, you agree to be bound by these Terms and Conditions. 
                  If you disagree with any part of these terms, you may not access the service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">2. Use License</h2>
                <p>
                  Permission is granted to temporarily access the materials (information or software) on our virtual office platform 
                  for personal, non-commercial transitory viewing only.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. User Account</h2>
                <p>
                  To access certain features of the platform, you must create a user account. You are responsible for maintaining 
                  the confidentiality of your account and password.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. Service Updates</h2>
                <p>
                  We reserve the right to withdraw or amend our service, and any service or material we provide, in our sole discretion 
                  without notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Governing Law</h2>
                <p>
                  These terms shall be governed by and construed in accordance with the laws of Ethiopia, without regard to its 
                  conflict of law provisions.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}