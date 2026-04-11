import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useAppStore from '../store/useAppStore';

function Cart() {
  const location = useLocation();
  const selectedPlan = useAppStore((state) => state.subscription.selectedPlan);
  const setSelectedPlan = useAppStore((state) => state.setSelectedPlan);
  const subscription = useAppStore((state) => state.subscription);
  const submitSubscription = useAppStore((state) => state.submitSubscription);
  const clearSubscriptionStatus = useAppStore((state) => state.clearSubscriptionStatus);

  useEffect(() => {
    if (location.state?.selectedPlan) {
      setSelectedPlan(location.state.selectedPlan);
    }

    return () => {
      clearSubscriptionStatus();
    };
  }, [location.state, setSelectedPlan, clearSubscriptionStatus]);

  const handleOrder = async () => {
    if (!selectedPlan) {
      return;
    }

    const orderData = {
      userId: '123',
      planName: selectedPlan.name,
      price: selectedPlan.price,
    };

    try {
      await submitSubscription(orderData);
    } catch (error) {
      console.error('Order submission failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f8f9] flex items-center justify-center px-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        
        <h1 className="text-2xl font-bold text-gray-900">
          Subscription Summary
        </h1>

        {selectedPlan ? (
          <>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedPlan.name}
              </h2>
              <p className="text-2xl text-teal-600 font-bold mt-2">
                {selectedPlan.price}
              </p>
            </div>

            <button
              onClick={handleOrder}
              disabled={subscription.loading}
              className="mt-8 w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {subscription.loading ? 'Placing order...' : 'Place Order'}
            </button>

            {subscription.error && <p className="mt-4 text-sm text-red-500">{subscription.error}</p>}
            {subscription.success && <p className="mt-4 text-sm text-teal-600">{subscription.success}</p>}
          </>
        ) : (
          <p className="mt-4 text-red-500">No plan selected</p>
        )}
      </div>
    </div>
  );
}

export default Cart;