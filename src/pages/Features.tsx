import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderSummaryModal from '../components/OrderSummaryModal';

function Features() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const plans = [
    {
      name: 'Standard',
      price: billingCycle === 'monthly' ? '99' : '990',
      features: [
        'Lorem ipsum',
        'Lorem ipsum',
        'Lorem ipsum',
        'Lorem ipsum',
        'Lorem ipsum',
        'Lorem ipsum'
      ],
      buttonText: 'Choose Plan',
      buttonStyle: 'bg-[#1e3a8a] text-white'
    },
    {
      name: 'Premium',
      recommended: true,
      price: billingCycle === 'monthly' ? '299' : '2990',
      features: [
        'Lorem ipsum',
        'Lorem ipsum',
        'Lorem ipsum',
        'Lorem ipsum',
        'Lorem ipsum',
        'Lorem ipsum'
      ],
      buttonText: 'Choose Plan',
      buttonStyle: 'bg-[#f59e0b] text-white'
    },
    {
      name: 'Enterprise',
      customPlan: true,
      features: [
        'Lorem ipsum',
        'Lorem ipsum',
        'Lorem ipsum',
        'Lorem ipsum',
        'Lorem ipsum',
        'Lorem ipsum'
      ],
      buttonText: 'Contact Us',
      buttonStyle: 'bg-[#1e3a8a] text-white'
    }
  ];

  const handlePlanSelect = (plan: any) => {
    if (plan.customPlan) {
      // Scroll to top before navigation
      window.scrollTo(0, 0);
      navigate('/contact');
    } else {
      setSelectedPlan(plan);
      setIsModalOpen(true);
    }
  };

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
            <h1 className="text-4xl font-bold mb-4 text-white">Flexible Plans</h1>
            <p className="text-xl text-gray-300">Choose a plan that work best for you & your team</p>
            
            <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm rounded-full p-1 mt-8">
              <button
                className={`px-6 py-2 rounded-full ${
                  billingCycle === 'monthly' ? 'bg-[#f59e0b] text-white' : 'text-gray-400'
                }`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </button>
              <button
                className={`px-6 py-2 rounded-full ${
                  billingCycle === 'yearly' ? 'bg-[#f59e0b] text-white' : 'text-gray-400'
                }`}
                onClick={() => setBillingCycle('yearly')}
              >
                Yearly<span className="text-sm ml-1">(Save 60%)</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 ${
                  plan.recommended ? 'transform scale-105' : ''
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#f59e0b] text-white px-4 py-1 rounded-full text-sm">
                    Recommended
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-4 text-white">{plan.name}</h3>
                <p className="text-gray-400 mb-6">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                </p>
                {!plan.customPlan && (
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-400">{billingCycle === 'monthly' ? '/Per Month' : '/Per Year'}</span>
                  </div>
                )}
                {plan.customPlan && (
                  <div className="mb-8">
                    <h4 className="text-2xl font-bold text-white">Custom Plan</h4>
                  </div>
                )}
                <ul className="space-y-4 mb-8 text-gray-300">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <span className="mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors duration-200">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
          </div>
        </div>
      </div>

      <OrderSummaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPlan={selectedPlan}
        billingCycle={billingCycle}
      />
    </div>
  );
}

export default Features;