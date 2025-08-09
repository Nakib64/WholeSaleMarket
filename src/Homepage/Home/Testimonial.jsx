import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  { name: "Amit Roy", review: "Amazing quality and fast delivery! I will order again for sure.", img: "https://i.ibb.co/5cPmygq/amit.jpg" },
  { name: "Sara Khan", review: "Bulk prices are unbeatable, and the support team is very helpful.", img: "https://i.ibb.co/tm9YTXt/sara.jpg" },
  { name: "David Lee", review: "I stocked my shop easily thanks to this platform. 5 stars!", img: "https://i.ibb.co/rbXFc87/david.jpg" },
];

export function Testimonials() {
  return (
    <section className="py-16 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">What Our Clients Say</h2>
      <div className="space-y-8">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
          >
            <Card className="hover:shadow-lg transition-all border-none">
              <CardHeader className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={t.img} alt={t.name} />
                  <AvatarFallback>{t.name[0]}</AvatarFallback>
                </Avatar>
                <CardTitle>{t.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t.review}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
