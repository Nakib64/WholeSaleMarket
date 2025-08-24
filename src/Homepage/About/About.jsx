import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Globe, Award, ShoppingCart, Truck } from "lucide-react";
import warehouseHero from "@/assets/warehouse-hero.jpg";
import businessPartnership from "@/assets/business-partnership.jpg";
import globalNetwork from "@/assets/global-network.jpg";
import teamPhoto from "@/assets/team-photo.jpg";

const About = () => {
  const stats = [
    { number: "10K+", label: "Business Partners", icon: Users },
    { number: "50M+", label: "Products Moved", icon: ShoppingCart },
    { number: "25+", label: "Countries Served", icon: Globe },
    { number: "15+", label: "Years Experience", icon: Award },
  ];

  const values = [
    {
      title: "Reliability",
      description: "Consistent quality and on-time delivery you can count on",
      icon: Award,
    },
    {
      title: "Scale",
      description: "From small orders to enterprise-level wholesale operations",
      icon: TrendingUp,
    },
    {
      title: "Efficiency",
      description: "Streamlined processes that reduce costs and maximize value",
      icon: Truck,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] 
      },
    },
  };

  return (
    <>

      <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(34, 84, 255, 0.8), rgba(34, 84, 255, 0.3)), url(${warehouseHero})`,
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1]  }}
          className="relative z-10 text-center text-white max-w-4xl mx-auto px-6"
        >
          <Badge className="mb-6 bg-primary/20 text-primary-foreground border-primary/30">
            Leading B2B Wholesale Platform
          </Badge>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Wholesale
            <span className="block text-4xl md:text-6xl font-light opacity-90">
              Reimagined
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90"
          >
            Connecting businesses worldwide with efficient, scalable wholesale solutions
            that drive growth and success.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-4 text-lg">
              Partner With Us
            </Button>
          </motion.div>
        </motion.div>
      </section>

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
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <Card className="border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors duration-300">
                  <CardContent className="pt-8 pb-6">
                    <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      {stat.number}
                    </div>
                    <div className="text-muted-foreground font-medium">
                      {stat.label}
                    </div>
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
                Building the Future of{" "}
                <span className="text-primary">B2B Commerce</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Founded with a vision to revolutionize wholesale operations, Wholesale has
                  emerged as the trusted partner for businesses seeking efficient,
                  scalable solutions for their bulk purchasing needs.
                </p>
                <p>
                  Our platform connects suppliers and buyers across the globe, facilitating
                  seamless transactions while maintaining the highest standards of quality
                  and reliability. We understand that in B2B commerce, relationships matter
                  as much as transactions.
                </p>
                <p>
                  Today, we proudly serve thousands of businesses worldwide, from emerging
                  startups to established enterprises, helping them optimize their supply
                  chains and drive sustainable growth.
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
                <div className="text-sm font-medium">Growth Focused</div>
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
              What Drives Us Forward
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our core values shape every interaction, decision, and partnership we make.
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
                Global Network
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Connected Across{" "}
                <span className="text-secondary">Continents</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Our extensive global network spans 25+ countries, enabling seamless
                  cross-border transactions and logistics coordination. We've built
                  relationships with trusted partners in every major market.
                </p>
                <p>
                  From manufacturing hubs in Asia to distribution centers across Europe
                  and the Americas, our network ensures your products reach their
                  destination efficiently and cost-effectively.
                </p>
                <p>
                  With localized support teams and cultural expertise, we make
                  international business feel as simple as domestic operations.
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
              Experts Dedicated to{" "}
              <span className="text-primary">Your Success</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our diverse team of industry veterans, technology experts, and customer
              success specialists work together to deliver exceptional results.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative max-w-4xl mx-auto"
          >
            <img
              src={teamPhoto}
              alt="Our professional team"
              className="rounded-2xl shadow-xl w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-bold mb-2">
                United by Purpose
              </h3>
              <p className="text-lg opacity-90">
                Driven by excellence, powered by innovation
              </p>
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
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of businesses that trust Wholesale for their B2B commerce needs.
            Let's build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-4 text-lg"
            >
              Start Partnership
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4 text-lg"
            >
              Schedule Demo
            </Button>
          </div>
        </motion.div>
      </section>
      </div>
    </>
  );
};

export default About;