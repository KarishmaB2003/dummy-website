import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Zap, Coffee } from 'lucide-react';

const About = () => {
  const values = [
    { icon: Heart, title: 'Passion for Quality', description: 'Every bean we source is chosen with care and brewed to perfection.' },
    { icon: Shield, title: 'Sustainable Sourcing', description: 'We partner directly with farmers to ensure ethical and fair trade practices.' },
    { icon: Zap, title: 'Modern Innovation', description: 'Using state-of-the-art equipment to deliver consistent, flavorful results.' },
    { icon: Coffee, title: 'Community First', description: 'Urban Brew is more than a café; it is a space for people to connect.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-bold dark:text-white leading-tight">
            Crafting the Perfect Cup <br /><span className="text-accent">Since 2026</span>
          </h1>
          <p className="mt-6 text-gray-600 dark:text-zinc-400 text-lg">
            Urban Brew Café started with a simple mission: to bring world-class coffee to our local community. What began as a small stand has grown into a destination for coffee enthusiasts and food lovers alike.
          </p>
          <p className="mt-4 text-gray-600 dark:text-zinc-400 text-lg">
            Our team of expert baristas and chefs work tirelessly to provide an experience that is both sophisticated and welcoming.
          </p>
        </div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=800&fit=crop" 
            alt="Café Interior" 
            className="rounded-3xl shadow-2xl"
          />
          <div className="absolute -bottom-6 -left-6 bg-accent p-8 rounded-2xl text-white hidden md:block">
            <p className="text-4xl font-bold">10k+</p>
            <p className="text-accent-light">Happy Customers</p>
          </div>
        </div>
      </section>

      <section>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-display font-bold dark:text-white">Our Core Values</h2>
          <p className="mt-4 text-gray-500 dark:text-zinc-300">The principles that guide every cup we brew and every guest we serve.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800"
            >
              <div className="p-3 bg-white dark:bg-zinc-800 rounded-2xl w-fit shadow-sm">
                <v.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-6 font-bold text-xl dark:text-white">{v.title}</h3>
              <p className="mt-3 text-gray-500 dark:text-zinc-400">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-900 rounded-[3rem] p-12 md:p-20 text-white overflow-hidden relative">
        <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Our Artisan Process</h2>
            <div className="space-y-6">
              {[
                { step: "01", title: "Selection", desc: "We source only Grade A Arabica beans from high-altitude farms." },
                { step: "02", title: "Roasting", desc: "Small-batch roasting ensures every profile is perfect and consistent." },
                { step: "03", title: "Brewing", desc: "Expert baristas use precision equipment to extract full flavor." }
              ].map((s, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-accent font-bold text-xl">{s.step}</span>
                  <div>
                    <h4 className="font-bold text-lg">{s.title}</h4>
                    <p className="text-zinc-400 text-sm mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop" className="rounded-2xl" alt="process" />
              <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop" className="rounded-2xl mt-8" alt="roasting" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
