import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Shield, Zap } from 'lucide-react';

const plans = [
  {
    id: 'fit_start',
    name: 'Fit Start',
    icon: <Zap className="w-6 h-6 text-amber-500" />,
    monthlyPrice: 499,
    features: [
      '2 fruit deliveries/week',
      '1 GP consultation/month',
      '1 basic lab panel/month',
      'Standard support'
    ]
  },
  {
    id: 'healthy_life',
    name: 'Healthy Life',
    icon: <Star className="w-6 h-6 text-green-400" />,
    monthlyPrice: 999,
    popular: true,
    features: [
      '3 fruit deliveries/week',
      '3 consultations/month',
      '2 lab panels/month',
      '8 trainer sessions/month',
      'Pharmacy auto-refill'
    ]
  },
  {
    id: 'total_wellness',
    name: 'Total Wellness',
    icon: <Shield className="w-6 h-6 text-blue-400" />,
    monthlyPrice: 1999,
    features: [
      'Daily fruit delivery',
      'Unlimited consultations',
      'Comprehensive quarterly labs',
      'Unlimited trainer sessions',
      'Up to 4 family members'
    ]
  }
];

const PricingCards = ({ billingCycle, onSelectPlan, isLoading }) => {
  const getCalculatedPrice = (basePrice) => {
    if (billingCycle === 'monthly') return basePrice;
    if (billingCycle === 'quarterly') return Math.floor(basePrice * 3 * 0.95); // 5% discount
    if (billingCycle === 'annual') return Math.floor(basePrice * 12 * 0.85); // 15% discount
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto px-4 mt-12">
      {plans.map((plan, index) => {
        const finalPrice = getCalculatedPrice(plan.monthlyPrice);

        return (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className={`relative p-8 rounded-3xl backdrop-blur-lg border ${
              plan.popular 
                ? 'bg-gradient-to-br from-green-900/40 to-teal-900/40 border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.15)]' 
                : 'bg-white/5 border-white/10'
            } flex flex-col`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-400 to-teal-500 text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
            )}
            
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 shadow-inner">
                {plan.icon}
              </div>
              <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
            </div>

            <div className="mb-8">
              <div className="flex items-end gap-1">
                <span className="text-4xl font-extrabold text-white">₹{finalPrice}</span>
                <span className="text-gray-400 font-medium mb-1">/{billingCycle === 'annual' ? 'yr' : billingCycle === 'quarterly' ? '3mo' : 'mo'}</span>
              </div>
              {billingCycle !== 'monthly' && (
                <div className="text-sm text-green-400 mt-2 font-medium">
                  {billingCycle === 'annual' ? 'Save 15%' : 'Save 5%'} applied
                </div>
              )}
            </div>

            <div className="flex-1">
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span className="leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              disabled={isLoading}
              onClick={() => onSelectPlan(plan.id)}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                plan.popular
                  ? 'bg-gradient-to-r from-green-400 to-teal-500 text-black hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? 'Processing...' : 'Subscribe Now'}
            </button>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PricingCards;
