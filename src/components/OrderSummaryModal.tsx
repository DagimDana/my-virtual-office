import { useState } from 'react';
import { X, Check, ArrowLeft } from 'lucide-react';

interface Plan {
  name: string;
  price: string;
  recommended?: boolean;
}

interface OrderSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: Plan;
  billingCycle: 'monthly' | 'yearly';
}

function OrderSummaryModal({ isOpen, onClose, selectedPlan, billingCycle }: OrderSummaryModalProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setShowConfirmation(false);
    onClose();
  };

  const handleConfirm = () => {
    setShowConfirmation(true);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const today = new Date();
  const nextBillingDate = new Date();
  nextBillingDate.setMonth(nextBillingDate.getMonth() + (billingCycle === 'monthly' ? 1 : 12));

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900/90 w-full max-w-2xl rounded-2xl border border-gray-800">
        <div className="p-6">
          {!showConfirmation ? (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">Your Order Summary</h2>
                <button 
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
                    <div>
                      <h3 className="font-semibold text-white">{selectedPlan.name}</h3>
                      <p className="text-sm text-gray-400">
                        {selectedPlan.recommended && (
                          <span className="bg-[#f59e0b] text-white text-xs px-2 py-0.5 rounded-full mr-2">
                            Recommended
                          </span>
                        )}
                        Billed {billingCycle}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-white">${selectedPlan.price}</p>
                    <p className="text-sm text-gray-400">Per {billingCycle === 'monthly' ? 'Month' : 'Year'}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={handleClose}
                  className="flex-1 py-3 px-4 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-3 px-4 rounded-lg bg-[#f59e0b] text-white font-semibold hover:bg-[#f59e0b]/90 transition-colors"
                >
                  Confirm Order
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-8">
                <button 
                  onClick={() => setShowConfirmation(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft size={24} />
                </button>
                <h2 className="text-3xl font-bold text-white">Order Details</h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Check size={24} className="text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Order Confirmed!</h3>
                    <p className="text-sm text-gray-400">Thank you for your purchase</p>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-6 space-y-4">
                  <div className="flex justify-between text-gray-400">
                    <span>Order Date</span>
                    <span className="text-white">{formatDate(today)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Next Billing Date</span>
                    <span className="text-white">{formatDate(nextBillingDate)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Plan</span>
                    <span className="text-white">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Billing Cycle</span>
                    <span className="text-white capitalize">{billingCycle}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-700 flex justify-between text-gray-400">
                    <span>Amount</span>
                    <span className="text-white font-bold">${selectedPlan.price}</span>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full py-3 px-4 rounded-lg bg-[#f59e0b] text-white font-semibold hover:bg-[#f59e0b]/90 transition-colors"
                >
                  Done
                </button>
              </div>
            </>
          )}
        </div>

        <div className="border-t border-gray-800 p-4 flex justify-between text-sm text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}

export default OrderSummaryModal;