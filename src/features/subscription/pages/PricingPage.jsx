import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PricingCards from '../components/PricingCards';
import { useSubscriptionStore } from '../store/useSubscriptionStore';
import toast from 'react-hot-toast';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const { createSubscription, verifyPayment, isLoading } = useSubscriptionStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamically load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubscribe = async (planId) => {
    // In a real app, user ID comes from auth state
    const dummyUserId = "60d0fe4f5311236168a109ca"; 

    try {
      toast.loading("Initiating subscription...", { id: "sub" });
      const response = await createSubscription(planId, billingCycle, dummyUserId);
      
      const options = {
        key: response.key,
        subscription_id: response.razorpaySubscriptionId,
        name: "Wellwigen",
        description: "Health-as-a-Service Subscription",
        image: "https://example.com/your_logo", // Replace with real logo
        handler: async function (paymentResponse) {
          try {
            toast.loading("Verifying payment...", { id: "sub" });
            await verifyPayment(paymentResponse, response.subscriptionId);
            toast.success("Subscription Active!", { id: "sub" });
            navigate('/subscription-success');
          } catch (err) {
            toast.error("Payment verification failed", { id: "sub" });
          }
        },
        theme: {
          color: "#0f6e56",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response){
        toast.error("Payment failed: " + response.error.description, { id: "sub" });
      });
      rzp.open();
      
      toast.dismiss("sub");
    } catch (error) {
      toast.error(error.message || "Failed to create subscription", { id: "sub" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-amber-900/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center mb-6 tracking-tight">
          One Subscription. <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-400">
            Complete Health. For Life.
          </span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl text-center mb-12 px-4">
          Choose the plan that fits your lifestyle. Get fresh produce, unlimited doctor consultations, and fitness training all in one app.
        </p>

        {/* Toggle */}
        <div className="flex bg-white/5 border border-white/10 p-1 rounded-2xl backdrop-blur-md mb-8">
          {['monthly', 'quarterly', 'annual'].map((cycle) => (
            <button
              key={cycle}
              onClick={() => setBillingCycle(cycle)}
              className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all capitalize ${
                billingCycle === cycle
                  ? 'bg-gradient-to-r from-green-400 to-teal-500 text-black shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {cycle}
            </button>
          ))}
        </div>

        <PricingCards 
          billingCycle={billingCycle} 
          onSelectPlan={handleSubscribe} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
};

export default PricingPage;
