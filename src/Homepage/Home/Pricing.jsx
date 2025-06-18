import React from 'react';

const plans = [
  {
    title: 'Starter Plan',
    price: '$99/month',
    features: ['Up to 100 Orders', 'Basic Support', 'Access to 10 Suppliers'],
  },
  {
    title: 'Business Plan',
    price: '$299/month',
    features: ['Up to 1000 Orders', 'Priority Support', 'Access to 50 Suppliers', 'Custom Deals'],
  },
  {
    title: 'Enterprise Plan',
    price: 'Contact Us',
    features: ['Unlimited Orders', 'Dedicated Account Manager', 'Custom API Integration', 'Exclusive Supplier Access'],
  },
];

const PricingPlans = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
          <p className="text-2xl font-semibold text-blue-600 mb-4">{plan.price}</p>
          <ul className="text-gray-600 mb-4 space-y-2">
            {plan.features.map((feature, idx) => (
              <li key={idx}>✔️ {feature}</li>
            ))}
          </ul>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Choose Plan
          </button>
        </div>
      ))}
    </div>
  );
};

export default PricingPlans;
