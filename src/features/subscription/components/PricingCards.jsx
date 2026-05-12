import React, { useState, useEffect } from 'react';
import { Check, Star, Shield, Zap } from 'lucide-react';
import { subscriptionPlanService } from '../services/subscriptionPlanService';

const PricingCards = ({ billingCycle, onSelectPlan, isLoading: isSubmitting }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await subscriptionPlanService.getActivePlans();
        if (res.success) {
          setPlans(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch plans:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const getPrice = (plan) => {
    if (!plan.prices) return 0;
    return plan.prices[billingCycle] || plan.prices.monthly;
  };

  const periodLabel = billingCycle === 'annual' ? 'yr' : billingCycle === 'quarterly' ? '3mo' : 'mo';

  const getIcon = (plan) => {
    const name = plan.name.toLowerCase();
    if (name.includes('platinum') || name.includes('total')) return <Shield className="w-5 h-5 text-blue-500" />;
    if (name.includes('gold') || plan.tag?.toLowerCase().includes('popular')) return <Star className="w-5 h-5 text-teal-600" />;
    return <Zap className="w-5 h-5 text-amber-500" />;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 font-medium">
        No subscription plans available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
      {plans.map((plan) => {
        const price = getPrice(plan);
        const isPopular = plan.tag?.toLowerCase().includes('popular') || plan.tag?.toLowerCase().includes('gold');
        
        return (
          <div
            key={plan._id}
            className={`relative flex flex-col rounded-2xl p-7 border ${
              isPopular
                ? 'bg-white border-teal-300 shadow-md ring-2 ring-teal-500/20'
                : 'bg-gray-50 border-gray-200 shadow-sm'
            }`}
          >
            {plan.tag && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                {plan.tag}
              </div>
            )}

            {/* Plan header */}
            <div className="flex items-center gap-3 mb-5">
              <div className={`p-2.5 rounded-xl border ${isPopular ? 'bg-teal-50 border-teal-100' : 'bg-white border-gray-200'}`}>
                {getIcon(plan)}
              </div>
              <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-end gap-1">
                <span className="text-4xl font-extrabold text-gray-900">₹{price.toLocaleString('en-IN')}</span>
                <span className="text-gray-400 text-sm font-medium mb-1">/{periodLabel}</span>
              </div>
              {billingCycle !== 'monthly' && (
                <p className="text-xs text-teal-600 font-medium mt-1">
                  {billingCycle === 'annual' ? 'Annual savings' : 'Quarterly savings'} applied
                </p>
              )}
            </div>

            {/* Features */}
            <ul className="flex-1 space-y-3 mb-7">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5 text-gray-600 text-sm">
                  <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              disabled={isSubmitting}
              onClick={() => onSelectPlan(plan)}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                isPopular
                  ? 'bg-teal-600 text-white hover:bg-teal-700'
                  : 'bg-white border border-gray-200 text-gray-800 hover:bg-gray-100'
              }`}
            >
              {isSubmitting ? 'Processing...' : 'Subscribe Now'}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PricingCards;


