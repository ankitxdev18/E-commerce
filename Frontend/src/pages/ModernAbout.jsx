import { motion } from "framer-motion";
import { Zap, Users, Globe, Award, Heart, Rocket } from "lucide-react";
import { Button } from "../components/ui/Base";
import { useNavigate } from "react-router-dom";

const ModernAbout = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance for the best shopping experience",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by and for millions of satisfied customers",
    },
    {
      icon: Globe,
      title: "Worldwide Shipping",
      description: "Deliver products to over 195 countries worldwide",
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized for excellence in e-commerce",
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction is our top priority",
    },
    {
      icon: Rocket,
      title: "Always Innovating",
      description: "Constantly improving to serve you better",
    },
  ];

  const stats = [
    { number: "10M+", label: "Happy Customers" },
    { number: "1M+", label: "Products Listed" },
    { number: "195", label: "Countries Served" },
    { number: "99.9%", label: "Uptime" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 md:py-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About ShopHub
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              We're redefining e-commerce by combining innovation, quality, and
              customer care. Our mission is to make online shopping accessible,
              affordable, and enjoyable for everyone.
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/")}
            >
              Start Shopping
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 text-center"
            >
              <p className="text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </p>
              <p className="text-neutral-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                Our Mission
              </h2>
              <p className="text-neutral-600 text-lg mb-4 leading-relaxed">
                At ShopHub, we believe shopping should be effortless. We're
                committed to offering the widest selection of quality products
                at unbeatable prices, with fast shipping and exceptional
                customer service.
              </p>
              <p className="text-neutral-600 text-lg leading-relaxed">
                Every day, we work to build trust with our customers and
                partners. We invest in technology, talent, and processes to
                deliver excellence in every interaction.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="w-full aspect-square bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-8xl">
                🎯
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-neutral-900">Our Values</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 hover:shadow-lg transition-all"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              We're a diverse group of passionate professionals dedicated to
              creating the best shopping experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((member) => (
              <motion.div
                key={member}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="rounded-xl overflow-hidden bg-gradient-to-b from-blue-100 to-blue-50 p-6"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-4xl text-white mx-auto mb-4">
                  👤
                </div>
                <h3 className="font-bold text-neutral-900 mb-1">
                  Team Member {member}
                </h3>
                <p className="text-neutral-600 text-sm">Role & Expertise</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join Millions of Happy Customers?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Discover amazing products, exclusive deals, and world-class
              service. Start your ShopHub journey today.
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/")}
            >
              Explore Products
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-neutral-900 text-center mb-12"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-4">
            {[
              {
                q: "How do I contact customer support?",
                a: "You can reach our 24/7 customer support team through email, phone, or live chat.",
              },
              {
                q: "What is your return policy?",
                a: "We offer 30-day returns for all items in their original condition.",
              },
              {
                q: "Do you offer international shipping?",
                a: "Yes! We ship to over 195 countries worldwide.",
              },
              {
                q: "How are my payments secured?",
                a: "We use industry-leading encryption and security protocols to protect your data.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-neutral-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-neutral-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-neutral-50 py-12 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-neutral-600 mb-6">
            Thank you for supporting ShopHub. Together, we're building the
            future of e-commerce.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline">Contact Us</Button>
            <Button variant="primary">Privacy Policy</Button>
            <Button variant="outline">Terms & Conditions</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModernAbout;
