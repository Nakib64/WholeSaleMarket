"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Package, Shirt } from "lucide-react";

const categories = [
  { title: "Electronics", icon: <ShoppingBag className="w-8 h-8 text-blue-500" />, desc: "Smart devices & gadgets" },
  { title: "Bulk Groceries", icon: <Package className="w-8 h-8 text-green-500" />, desc: "Everyday essentials in bulk" },
  { title: "Fashion & Apparel", icon: <Shirt className="w-8 h-8 text-pink-500" />, desc: "Clothing for all seasons" },
];

export function FeaturedCategories() {
  return (
    <section className="py-16 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Featured Categories</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {categories.map((cat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
          >
            <Card className="hover:shadow-lg hover:scale-105 transition-all cursor-pointer border-none">
              <CardHeader className="flex flex-col items-center">
                {cat.icon}
                <CardTitle>{cat.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">{cat.desc}</CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
