import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 pl-2 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-3">WholesaleCart</h2>
          <p className="text-gray-400 text-sm">
            A global wholesale platform connecting suppliers with resellers. Secure, fast, and reliable for B2B trade.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            {/* <li><Link to="/faq" className="hover:text-white">FAQs</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li> */}
          </ul>
        </div>

  

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 mt-2 text-gray-400">
            <a href="https://www.facebook.com/nafizuddowla.nokib/" className="hover:text-white"><FaFacebookF /></a>
            <a href="https://www.linkedin.com/in/nafiz-uddowla-nakib-42a730335/" className="hover:text-white"><FaLinkedinIn /></a>
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
