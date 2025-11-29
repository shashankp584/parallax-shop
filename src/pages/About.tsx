import { motion } from 'framer-motion';
import { Heart, Shield, Truck, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">About ShopFlow</h1>
            <p className="text-xl text-muted-foreground">
              Your trusted destination for premium products
            </p>
          </div>

          <Card className="p-8 mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2024, ShopFlow was born from a simple idea: to create an online shopping
                experience that combines quality products with exceptional service. We believe that
                shopping should be enjoyable, convenient, and trustworthy.
              </p>
              <p>
                Our carefully curated collection features premium products across multiple categories,
                from cutting-edge electronics to stylish accessories. Each item is selected with care
                to ensure it meets our high standards of quality and design.
              </p>
              <p>
                We're committed to providing not just products, but an experience. From the moment
                you land on our site to the day your order arrives, we're dedicated to making every
                step seamless and satisfying.
              </p>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              {
                icon: Heart,
                title: 'Customer First',
                description: 'Your satisfaction is our top priority. We go above and beyond to ensure you love your purchase.',
              },
              {
                icon: Shield,
                title: 'Quality Guarantee',
                description: 'Every product is carefully vetted to meet our stringent quality standards.',
              },
              {
                icon: Truck,
                title: 'Fast Delivery',
                description: 'Quick and reliable shipping with real-time tracking on all orders.',
              },
              {
                icon: Award,
                title: 'Excellence',
                description: 'Award-winning customer service and a seamless shopping experience.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <value.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="p-8 text-center hero-gradient text-white">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg mb-6 text-white/90">
              Become part of thousands of satisfied customers who trust ShopFlow for their shopping needs.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <p className="text-4xl font-bold">10K+</p>
                <p className="text-white/90">Happy Customers</p>
              </div>
              <div>
                <p className="text-4xl font-bold">500+</p>
                <p className="text-white/90">Products</p>
              </div>
              <div>
                <p className="text-4xl font-bold">50+</p>
                <p className="text-white/90">Countries</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
