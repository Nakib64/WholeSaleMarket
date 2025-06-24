import React from 'react';
import { NavLink } from 'react-router';
import {
  FaShoePrints, FaShoppingBag, FaGem, FaPumpSoap, FaTshirt, FaFemale,
  FaBaby, FaGlasses, FaBookOpen, FaSnowflake, FaMobileAlt
} from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';

const categories = [
  { name: 'Shoes', slug: 'shoes', icon: <FaShoePrints /> },
  { name: 'Bags', slug: 'bags', icon: <FaShoppingBag /> },
  { name: 'Jewelry', slug: 'jewelry', icon: <FaGem /> },
  { name: 'Beauty and Personal Care', slug: 'beauty', icon: <FaPumpSoap /> },
  { name: 'Men’s Clothing', slug: 'mens-clothing', icon: <FaTshirt /> },
  { name: 'Women’s Clothing', slug: 'womens-clothing', icon: <FaFemale /> },
  { name: 'Baby Items', slug: 'baby-items', icon: <FaBaby /> },
  { name: 'Eyewear', slug: 'eyewear', icon: <FaGlasses /> },
  { name: 'Seasonal Products', slug: 'seasonal', icon: <FaSnowflake /> },
  { name: 'Phone accessories', slug: 'phone-accessories', icon: <FaMobileAlt /> },
];

const CategoryMenu = () => {
  return (
    <div className="w-full sticky top-0 bg-white  rounded overflow-hidden">
      {categories.map((item, index) => (
        <NavLink
          key={index}
          to={`/category/${item.slug}`}
          className={({ isActive }) =>
            `flex items-center justify-between px-4 py-3 cursor-pointer hover:translate-x-1 transform transition-transform duration-200 hover:bg-gray-100 ${
              isActive ? 'bg-gray-200 ' : ''
            }`
          }
        >
          <div className="flex items-center gap-3 text-gray-700 text-base">
            <div className="text-xl">{item.icon}</div>
            <span className="text-sm">{item.name}</span>
          </div>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
        </NavLink>
      ))}
    </div>
  );
};

export default CategoryMenu;
