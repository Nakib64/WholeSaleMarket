import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router";

const About = () => {
  return (
    <section className=" bg-white flex items-center px-4 md:px-10 lg:px-20 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-1 gap-10 items-center">
        

        {/* Right Content */}
        <div className="text-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About Us</h2>

          <p className="text-gray-600 text-base leading-relaxed mb-4">
            Welcome to <span className="font-semibold text-black">Wholesale</span> — your trusted B2B partner for bulk purchasing. We offer competitive pricing, reliable sourcing, and a smooth buying experience for retailers and resellers.
          </p>

          <p className="text-gray-600 text-base leading-relaxed mb-4">
            Our platform connects you with high-demand products across fashion, electronics, accessories, and more — all ready for scalable growth and quick distribution.
          </p>

          <ul className="space-y-2 text-gray-700 text-sm mt-4">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold text-xl">✔</span>
              500+ verified B2B clients
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold text-xl">✔</span>
              Secure payments & fast nationwide delivery
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold text-xl">✔</span>
              Dedicated account & support team
            </li>
          </ul>

          <div className="mt-6">
            <Button>
              <Link
              to={"/contact"}
            >
              Contact Us
            </Link>
            </Button>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
