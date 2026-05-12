import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PricingCards from '../components/PricingCards';
import { useSubscriptionStore } from '../store/useSubscriptionStore';
import DummyPaymentGateway from '../components/DummyPaymentGateway';
import toast from 'react-hot-toast';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState(null);
  const { createSubscription, verifyPayment, isLoading } = useSubscriptionStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Keeping razorpay script in case it's needed later, but we use dummy gateway now.
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubscribeClick = (plan) => {
    const price = plan.prices[billingCycle] || plan.prices.monthly;
    setSelectedPlanDetails({
      id: plan._id,
      name: plan.name,
      price: `₹${price.toLocaleString('en-IN')}/${billingCycle === 'annual' ? 'yr' : 'mo'}`,
      rawPrice: price,
      billingCycle: billingCycle
    });
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async () => {
    setShowPaymentModal(false);
    
    try {
      // Save the subscription state locally for immediate feedback
      localStorage.setItem("userSubscription", JSON.stringify({
        plan: selectedPlanDetails.name,
        status: "Active",
        nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        price: selectedPlanDetails.price
      }));

      toast.success(`Payment successful! ${selectedPlanDetails.name} Plan active.`);
      
      // Redirect to login or dashboard
      navigate('/login');
    } catch (err) {
      toast.error("Error finalizing subscription");
    }
  };


  return (
    <section
      className="w-full py-20 relative overflow-hidden"
      style={{
        backgroundColor: '#f8fafc',
        backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.18) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* === SVG HEALTH VECTORS === */}
      <svg className="absolute top-10 left-12 opacity-[0.07] pointer-events-none" width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="9" y="1" width="8" height="24" rx="2" fill="#0d9488"/>
        <rect x="1" y="9" width="24" height="8" rx="2" fill="#0d9488"/>
      </svg>
      <svg className="absolute top-10 right-12 opacity-[0.06] pointer-events-none w-16" viewBox="0 0 64 80" fill="none">
        <path d="M32 4L8 14V36C8 54 20 68 32 76C44 68 56 54 56 36V14L32 4Z" stroke="#0d9488" strokeWidth="1.5" fill="none"/>
        <path d="M20 38l10 10 16-18" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <svg className="absolute bottom-10 right-16 opacity-[0.05] pointer-events-none" width="18" height="18" viewBox="0 0 26 26" fill="none">
        <rect x="9" y="1" width="8" height="24" rx="2" fill="#0d9488"/>
        <rect x="1" y="9" width="24" height="8" rx="2" fill="#0d9488"/>
      </svg>
      <svg className="absolute bottom-10 left-16 opacity-[0.05] pointer-events-none w-12" viewBox="0 0 48 44" fill="none">
        <path d="M24 40C24 40 4 28 4 16C4 10 8.5 6 14 6C18 6 22 8 24 12C26 8 30 6 34 6C39.5 6 44 10 44 16C44 28 24 40 24 40Z" stroke="#0d9488" strokeWidth="1.5" fill="none"/>
      </svg>

      {/* === CONTENT === */}
      <div className="relative z-10 flex flex-col items-center px-4">
        <p className="text-teal-600 text-xs tracking-widest uppercase font-semibold mb-4">Pricing</p>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-5 leading-tight">
          One Subscription.<br />
          <span className="text-teal-600">Complete Health. For Life.</span>
        </h1>

        <p className="text-gray-500 text-base md:text-lg max-w-2xl text-center mb-10">
          Choose the plan that fits your lifestyle. Get fresh produce, unlimited doctor consultations, and fitness training all in one app.
        </p>

        {/* Billing toggle */}
        <div className="flex bg-white border border-gray-200 p-1 rounded-xl shadow-sm mb-10">
          {['monthly', 'quarterly', 'annual'].map((cycle) => (
            <button
              key={cycle}
              onClick={() => setBillingCycle(cycle)}
              className={`px-6 py-2 rounded-lg font-medium text-sm transition-all capitalize ${
                billingCycle === cycle
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {cycle}
            </button>
          ))}
        </div>

        <PricingCards
          billingCycle={billingCycle}
          onSelectPlan={handleSubscribeClick}
          isLoading={isLoading}
        />

        {showPaymentModal && selectedPlanDetails && (
          <DummyPaymentGateway
            plan={selectedPlanDetails.name}
            amount={selectedPlanDetails.price}
            onClose={() => setShowPaymentModal(false)}
            onSuccess={handlePaymentSuccess}
          />
        )}
      </div>
    </section>
  );
};

export default PricingPage;
