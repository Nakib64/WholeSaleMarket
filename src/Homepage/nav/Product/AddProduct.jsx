import React, { useState } from 'react';

const AddProduct = () => {
  const [product, setProduct] = useState({
    image: '',
    name: '',
    mainQuantity: '',
    minSellingQuantity: '',
    brand: '',
    category: '',
    description: '',
    price: '',
    rating: '',
  });

  const categories = [
    'Electronics & Gadgets',
    'Home & Kitchen Appliances',
    'Fashion & Apparel',
    'Industrial Machinery & Tools',
    'Health & Beauty',
    'Automotive Parts & Accessories',
    'Office Supplies & Stationery',
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProduct({ ...product, [name]: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Product:', product);
    // Here you can send 'product' to your backend (e.g., via fetch/axios)
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Product Image Upload */}
        <div>
          <label className="block font-medium mb-1">Product Image:</label>
          <input
            type='text'
            name="image"
            onChange={handleChange}
            className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
            required
          />
        </div>

        {/* Product Name */}
        <div>
          <label className="block font-medium mb-1">Product Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
            required
          />
        </div>

        {/* Main Quantity */}
        <div>
          <label className="block font-medium mb-1">Main Quantity:</label>
          <input
            type="number"
            name="mainQuantity"
            value={product.mainQuantity}
            onChange={handleChange}
            placeholder="Total quantity available"
            className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
            required
          />
        </div>

        {/* Minimum Selling Quantity */}
        <div>
          <label className="block font-medium mb-1">Minimum Selling Quantity:</label>
          <input
            type="number"
            name="minSellingQuantity"
            value={product.minSellingQuantity}
            onChange={handleChange}
            placeholder="Minimum quantity for purchase"
            className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
            required
          />
        </div>

        {/* Brand Name */}
        <div>
          <label className="block font-medium mb-1">Brand Name:</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            placeholder="Enter brand name"
            className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
            required
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block font-medium mb-1">Category:</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Short Description */}
        <div>
          <label className="block font-medium mb-1">Short Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter a brief description"
            className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Price (per unit):</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Enter price"
            className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
            required
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block font-medium mb-1">Rating (1-5):</label>
          <input
            type="number"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            placeholder="Enter rating"
            min="1"
            max="5"
            className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
        >
          Add Product
        </button>

        {/* Product Content - Static Text */}
        <div className="mt-6 text-gray-600 text-sm">
          <p><strong>Note:</strong> Please make sure all product information is accurate. Once submitted, the product will be reviewed before being listed on our wholesale platform.</p>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
