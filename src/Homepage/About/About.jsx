import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Users,
  Globe,
  Award,
  ShoppingCart,
  Truck,
} from "lucide-react";

import warehouseHero from "@/assets/warehouse-hero.jpg";
import businessPartnership from "@/assets/business-partnership.jpg";
import globalNetwork from "@/assets/global-network.jpg";
import teamPhoto from "@/assets/team-photo.jpg";

const About = () => {
  const stats = [
    { number: "12K+", label: "Active Partners", icon: Users },
    { number: "60M+", label: "Orders Fulfilled", icon: ShoppingCart },
    { number: "30+", label: "Countries Reached", icon: Globe },
    { number: "18+", label: "Years of Excellence", icon: Award },
  ];

  const values = [
    {
      title: "Reliability",
      description:
        "We deliver what we promise—on time, every time. Trust is the foundation of everything we do.",
      icon: Award,
    },
    {
      title: "Scalability",
      description:
        "Whether you’re a startup or a multinational, our platform grows with your business needs.",
      icon: TrendingUp,
    },
    {
      title: "Efficiency",
      description:
        "Our logistics and automation systems are designed to minimize costs and maximize speed.",
      icon: Truck,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto px-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants} className="text-center">
                <Card className="border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors duration-300">
                  <CardContent className="pt-8 pb-6">
                    <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      {stat.number}
                    </div>
                    <div className="text-muted-foreground font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                Our Story
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Empowering Global{" "}
                <span className="text-primary">B2B Connections</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2007, <strong>TradeLink Global</strong> began with one goal:
                  to simplify how businesses source, purchase, and distribute products
                  across borders. What started as a small distribution hub has grown into
                  a worldwide supply chain network.
                </p>
                <p>
                  Our platform bridges suppliers and buyers, offering secure payments,
                  transparent pricing, and real-time logistics. We believe that building
                  long-term partnerships is more valuable than short-term gains.
                </p>
                <p>
                  Today, TradeLink supports thousands of companies—from retailers and
                  manufacturers to distributors—helping them move goods efficiently while
                  scaling sustainably.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src={businessPartnership}
                alt="Business partnership handshake"
                className="rounded-2xl shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg">
                <TrendingUp className="w-8 h-8 mb-2" />
                <div className="text-sm font-medium">Driven by Growth</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto px-6"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge className="mb-6 bg-secondary/10 text-secondary border-secondary/20">
              Our Values
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              What Defines Our Work
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every decision we make and every partnership we build is guided by these
              principles.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Global Network Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src={globalNetwork}
                alt="Global logistics network"
                className="rounded-2xl shadow-lg w-full"
              />
              <div className="absolute -top-6 -left-6 bg-secondary text-secondary-foreground p-6 rounded-xl shadow-lg">
                <Globe className="w-8 h-8 mb-2" />
                <div className="text-sm font-medium">Global Reach</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Badge className="mb-6 bg-secondary/10 text-secondary border-secondary/20">
                Our Network
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Connected Across{" "}
                <span className="text-secondary">30+ Countries</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  We operate a fully integrated global network that enables
                  cross-border trade with local expertise. Our partnerships extend from
                  Asia’s top manufacturing hubs to logistics centers in Europe and the
                  Americas.
                </p>
                <p>
                  Every shipment is tracked, every process optimized — ensuring
                  transparency and reliability from origin to destination.
                </p>
                <p>
                  With multilingual support teams and 24/7 customer service, doing
                  business globally has never been easier.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto px-6"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Our Team
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              People Behind the{" "}
              <span className="text-primary">Progress</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From engineers to logistics specialists, every member of our team shares
              one goal — making global trade smoother and smarter.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="relative max-w-4xl mx-auto">
            <img
              src={teamPhoto}
              alt="Our professional team"
              className="rounded-2xl shadow-xl w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent rounded-2xl" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-bold mb-2">United by Purpose</h3>
              <p className="text-lg opacity-90">Driven by innovation and integrity</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 text-center text-primary-foreground"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let’s Build a Better Supply Chain — Together
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Partner with TradeLink Global and experience seamless sourcing,
            logistics, and distribution that helps your business thrive worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-4 text-lg"
            >
              Become a Partner
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4 text-lg"
            >
              Book a Consultation
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
