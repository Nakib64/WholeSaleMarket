import React, { useState, useCallback } from "react";
import { Link } from "react-router";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";

import {
  FaShoePrints,
  FaShoppingBag,
  FaGem,
  FaPumpSoap,
  FaTshirt,
  FaFemale,
  FaBaby,
  FaGlasses,
  FaSnowflake,
  FaMobileAlt,
} from "react-icons/fa";

const categories = [
  { name: "Shoes", slug: "shoes", icon: <FaShoePrints /> },
  { name: "Bags", slug: "bags", icon: <FaShoppingBag /> },
  { name: "Jewelry", slug: "jewelry", icon: <FaGem /> },
  { name: "Beauty and Personal Care", slug: "beauty", icon: <FaPumpSoap /> },
  { name: "Men’s Clothing", slug: "mens-clothing", icon: <FaTshirt /> },
  { name: "Women’s Clothing", slug: "womens-clothing", icon: <FaFemale /> },
  { name: "Baby Items", slug: "baby-items", icon: <FaBaby /> },
  { name: "Eyewear", slug: "eyewear", icon: <FaGlasses /> },
  { name: "Seasonal Products", slug: "seasonal", icon: <FaSnowflake /> },
];

const containerVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.38,
      ease: [0.22, 1, 0.36, 1], // smooth “standard” easing
    },
  },
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
};

const CategoryDrawer = () => {
  const [open, setOpen] = useState(false);

  const handleLinkClick = useCallback(() => {
    // Smoothly close after a tiny delay so the click feels responsive
    requestAnimationFrame(() => setOpen(false));
  }, []);

  return (
    <div className="flex md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        {/* Trigger (hamburger) */}
        <SheetTrigger asChild>
          <button
            aria-label="Open categories"
            className="p-2 rounded-md hover:bg-blue-600 active:scale-[0.98] transition"
          >
            <Menu className="h-6 w-6 text-white" />
          </button>
        </SheetTrigger>

        {/* Drawer panel */}
        {/* We disable the default CSS animation so Framer Motion fully controls the feel */}
        <SheetContent
          side="left"
          className="w-80 p-0 data-[state=open]:animate-none data-[state=closed]:animate-none"
        >
          <SheetHeader className="px-4 pt-4 pb-2">
            <SheetTitle className="text-lg font-bold">Categories</SheetTitle>
          </SheetHeader>

          {/* Framer-motion container for silky open */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="px-2 pb-6"
          >
            <motion.ul
              variants={listVariants}
              className="flex flex-col gap-1"
            >
              {categories.map((item, idx) => (
                <motion.li key={idx} variants={itemVariants}>
                  <Link
                    to={`/category/${item.slug}`}
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-50 active:bg-blue-100 transition"
                  >
                    <span className="text-xl text-blue-600">{item.icon}</span>
                    <span className="text-gray-800">{item.name}</span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CategoryDrawer;
