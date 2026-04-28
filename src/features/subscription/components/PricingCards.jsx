import React from 'react';
import { Check, Star, Shield, Zap } from 'lucide-react';

const plans = [
  {
    id: 'fit_start',
    name: 'Fit Start',
    icon: <Zap className="w-5 h-5 text-amber-500" />,
    monthlyPrice: 499,
    features: [
      '2 fruit deliveries/week',
      '1 GP consultation/month',
      '1 basic lab panel/month',
      'Standard support',
    ],
  },
  {
    id: 'healthy_life',
    name: 'Healthy Life',
    icon: <Star className="w-5 h-5 text-teal-600" />,
    monthlyPrice: 999,
    popular: true,
    features: [
      '3 fruit deliveries/week',
      '3 consultations/month',
      '2 lab panels/month',
      '8 trainer sessions/month',
      'Pharmacy auto-refill',
    ],
  },
  {
    id: 'total_wellness',
    name: 'Total Wellness',
    icon: <Shield className="w-5 h-5 text-blue-500" />,
    monthlyPrice: 1999,
    features: [
      'Daily fruit delivery',
      'Unlimited consultations',
      'Comprehensive quarterly labs',
      'Unlimited trainer sessions',
      'Up to 4 family members',
    ],
  },
];

const PricingCards = ({ billingCycle, onSelectPlan, isLoading }) => {
  const getPrice = (base) => {
    if (billingCycle === 'quarterly') return Math.floor(base * 3 * 0.95);
    if (billingCycle === 'annual') return Math.floor(base * 12 * 0.85);
    return base;
  };

  const periodLabel = billingCycle === 'annual' ? 'yr' : billingCycle === 'quarterly' ? '3mo' : 'mo';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
      {plans.map((plan) => {
        const price = getPrice(plan.monthlyPrice);
        return (
          <div
            key={plan.id}
            className={`relative flex flex-col rounded-2xl p-7 border ${
              plan.popular
                ? 'bg-white border-teal-300 shadow-md ring-2 ring-teal-500/20'
                : 'bg-gray-50 border-gray-200 shadow-sm'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                Most Popular
              </div>
            )}

            {/* Plan header */}
            <div className="flex items-center gap-3 mb-5">
              <div className={`p-2.5 rounded-xl border ${plan.popular ? 'bg-teal-50 border-teal-100' : 'bg-white border-gray-200'}`}>
                {plan.icon}
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
                  {billingCycle === 'annual' ? '15% off' : '5% off'} applied
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
              disabled={isLoading}
              onClick={() => onSelectPlan(plan.id)}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                plan.popular
                  ? 'bg-teal-600 text-white hover:bg-teal-700'
                  : 'bg-white border border-gray-200 text-gray-800 hover:bg-gray-100'
              }`}
            >
              {isLoading ? 'Processing...' : 'Subscribe Now'}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PricingCards;
