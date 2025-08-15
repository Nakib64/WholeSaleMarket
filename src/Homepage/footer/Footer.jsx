import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-3 text-white">WholesaleCart</h2>
          <p className="text-gray-400 text-sm">
            A global wholesale platform connecting suppliers with resellers. Secure, fast, and reliable for B2B trade.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link to="/about" className="hover:text-blue-900 transition-colors">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-900 transition-colors">Contact</Link>
            </li>
         
          </ul>
        </div>

        {/* Pages */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Pages</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link to="/allProduct" className="hover:text-blue-900 transition-colors">All Products</Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-blue-900 transition-colors">Pricing Plans</Link>
            </li>
         
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Subscribe & Follow</h3>
          <p className="text-gray-400 text-sm mb-3">Get updates, offers, and latest products.</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-blue-900"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-900 text-white rounded-r-md hover:bg-blue-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <div className="flex gap-4 mt-4 text-gray-400">
            <a href="https://www.facebook.com/nafizuddowla.nokib/" className="hover:text-blue-900 transition-colors">
              <FaFacebookF />
            </a>
            <a href="https://www.linkedin.com/in/nafiz-uddowla-nakib-42a730335/" className="hover:text-blue-900 transition-colors">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-blue-900 transition-colors"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-900 transition-colors"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} WholesaleCart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
