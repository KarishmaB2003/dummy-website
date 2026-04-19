import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-bold dark:text-white leading-tight">
            Get in <span className="text-accent">Touch</span>
          </h1>
          <p className="mt-6 text-gray-600 dark:text-zinc-400 text-lg">
            Have a question about our menu, special events, or catering? We'd love to hear from you.
          </p>

          <div className="mt-12 space-y-8">
            <div className="flex items-start space-x-6 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors">
              <div className="p-3 bg-accent text-white rounded-xl shadow-lg shadow-accent/20">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold dark:text-white text-lg">Visit Us</h3>
                <p className="text-gray-500 dark:text-zinc-400 mt-1">123 Artisan Alley, Brewing District<br />New York, NY 10001</p>
                <button className="mt-3 text-sm font-bold text-accent hover:underline">Get Directions →</button>
              </div>
            </div>
            <div className="flex items-start space-x-6 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors">
              <div className="p-3 bg-accent text-white rounded-xl shadow-lg shadow-accent/20">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold dark:text-white text-lg">Call Us</h3>
                <p className="text-gray-500 dark:text-zinc-400 mt-1">+1 (212) 555-0123</p>
                <p className="text-xs text-gray-400 mt-1">Available 24/7 for urgent inquiries.</p>
              </div>
            </div>
            <div className="flex items-start space-x-6 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors">
              <div className="p-3 bg-accent text-white rounded-xl shadow-lg shadow-accent/20">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold dark:text-white text-lg">Brewing Hours</h3>
                <div className="mt-2 grid grid-cols-2 gap-x-8 gap-y-1">
                  <span className="text-sm text-gray-500">Mon - Fri</span>
                  <span className="text-sm font-bold dark:text-zinc-300">7am - 8pm</span>
                  <span className="text-sm text-gray-500">Sat - Sun</span>
                  <span className="text-sm font-bold dark:text-zinc-300">8am - 9pm</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mock Map Preview */}
          <div className="mt-12 h-48 rounded-3xl bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s-l+000(-73.9857,40.7484)/-73.9857,40.7484,14,0/600x400?access_token=pk.ey')] bg-cover bg-center grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white dark:bg-zinc-800 px-4 py-2 rounded-full shadow-xl font-bold flex items-center space-x-2 border dark:border-zinc-700">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-xs dark:text-white">View on Google Maps</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-zinc-300 mb-2">Full Name</label>
              <input 
                type="text" 
                required
                value={formState.name}
                onChange={(e) => setFormState({...formState, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all dark:text-white"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-zinc-300 mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={formState.email}
                onChange={(e) => setFormState({...formState, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all dark:text-white"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-zinc-300 mb-2">Message</label>
              <textarea 
                rows="4" 
                required
                value={formState.message}
                onChange={(e) => setFormState({...formState, message: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all dark:text-white"
                placeholder="Tell us how we can help..."
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-accent/20 transition-all flex items-center justify-center space-x-2"
            >
              <span>{isSent ? 'Message Sent!' : 'Send Message'}</span>
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="text-3xl font-display font-bold dark:text-white text-center mb-12">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { q: "Do you offer catering for events?", a: "Yes! We provide full-service catering for corporate events, weddings, and private parties. Contact us for our catering menu." },
            { q: "Are there vegan-friendly options?", a: "Absolutely. We have a selection of vegan pastries and provide oat, almond, and soy milk for all drinks." },
            { q: "Can I host a private event at the café?", a: "Yes, Urban Brew is available for private bookings after 8 PM. Please email us for availability." },
            { q: "Do you have free Wi-Fi?", a: "Yes, we offer high-speed Wi-Fi to all our customers. Perfect for remote work or study." }
          ].map((item, i) => (
            <div key={i} className="p-6 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800">
              <h4 className="font-bold dark:text-white mb-2">{item.q}</h4>
              <p className="text-sm text-gray-500 dark:text-zinc-400">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
