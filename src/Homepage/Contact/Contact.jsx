import { Button } from "@/components/ui/button";
import React from "react";

const Contact = () => {
  return (
    <section className=" bg-gray-50 flex items-center px-4 md:px-10 lg:px-20 py-12">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Get in Touch</h2>
          <p className="text-gray-600 text-base">
            We'd love to hear from you. Whether you have a question about products, pricing, or anything else—our team is ready to answer all your questions.
          </p>

          <div className="space-y-4 text-gray-700 text-sm">
            <div>
              <span className="font-semibold block text-gray-800">Email</span>
              support@nakibwholesale.com
            </div>
            <div>
              <span className="font-semibold block text-gray-800">Phone</span>
              +880 1234 567890
            </div>
            <div>
              <span className="font-semibold block text-gray-800">Address</span>
              Rajapur, Dhaka, Bangladesh
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Message sent! (You can connect this to Formspree, EmailJS, or your backend)");
          }}
          className="bg-white rounded-lg shadow-md p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              required
              name="name"
              placeholder="Enter your name"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              required
              rows="5"
              placeholder="Write your message..."
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>

          <Button type="submit" className="btn btn-primary w-full">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
