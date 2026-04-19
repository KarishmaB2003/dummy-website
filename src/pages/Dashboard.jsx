import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Coffee, Users, DollarSign, ShoppingCart, Plus, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DASHBOARD_STATS, FEATURED_ITEMS, RECENT_EVENTS } from '../utils/dummyData';
import Modal from '../components/Modal';

const StatCard = ({ label, value, trend, isPositive, icon: Icon }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800"
  >
    <div className="flex justify-between items-start">
      <div className="p-3 bg-accent/10 rounded-xl">
        <Icon className="h-6 w-6 text-accent" />
      </div>
      <div className={`flex items-center space-x-1 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        <span>{trend}</span>
        {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
      </div>
    </div>
    <div className="mt-4">
      <h3 className="text-gray-500 dark:text-zinc-400 text-sm font-medium">{label}</h3>
      <p className="text-2xl font-bold mt-1 dark:text-white">{value}</p>
    </div>
  </motion.div>
);

const AddForm = ({ title, fields, onSubmit }) => (
  <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 h-full">
    <h3 className="text-lg font-bold mb-4 dark:text-white flex items-center">
      <Plus className="h-5 w-5 mr-2 text-accent" /> {title}
    </h3>
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      {fields.map(field => (
        <div key={field.name}>
          <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
            {field.label}
          </label>
          <input
            type={field.type}
            placeholder={field.placeholder}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 focus:ring-2 focus:ring-accent/50 outline-none transition-all dark:text-white"
            required
          />
        </div>
      ))}
      <button className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-2 rounded-lg transition-colors">
        Submit
      </button>
    </form>
  </div>
);

const Dashboard = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'customer' or 'order'

  const handleSubmit = () => {
    setActiveModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const updatedFeaturedItems = FEATURED_ITEMS.map(item => 
    item.name === 'Signature Latte' ? { ...item, image: '/latte.png' } : item
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Section */}
      <section 
        className="relative rounded-3xl overflow-hidden bg-zinc-900 text-white p-8 md:p-16 min-h-[500px] flex items-center"
        style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 100%), url("/hero.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="relative z-10 max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold leading-tight"
          >
            Savor the Moment at <br /><span className="text-accent">Urban Brew</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-zinc-400 text-lg md:text-xl"
          >
            Where artisan craftsmanship meets the perfect cup. Experience our curated selection of premium blends and exquisite pastries.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <button 
              onClick={() => setActiveModal('order')}
              className="bg-accent px-8 py-3 rounded-full font-bold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
            >
              Order Now
            </button>
            <button className="border border-white/20 px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-all">
              View Menu
            </button>
          </motion.div>
        </div>
      </section>

      {/* Summary Stats */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-display font-bold dark:text-white">Business Overview</h2>
          <button 
            onClick={() => setActiveModal('customer')}
            className="flex items-center space-x-2 text-accent font-bold hover:text-accent/80"
          >
            <Plus className="h-4 w-4" />
            <span>New Customer</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Orders" value="1,284" trend="+12.5%" isPositive={true} icon={ShoppingCart} />
          <StatCard label="Revenue" value="$24,560" trend="+8.2%" isPositive={true} icon={DollarSign} />
          <StatCard label="Customers" value="842" trend="+5.4%" isPositive={true} icon={Users} />
          <StatCard label="Growth" value="22.4%" trend="+2.1%" isPositive={true} icon={ArrowUpRight} />
        </div>
      </section>

      {/* Featured Items and Recent Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-display font-bold dark:text-white">Featured Menu</h2>
            <div className="flex space-x-2">
              {['All', 'Coffee', 'Bakery'].map(cat => (
                <button key={cat} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${cat === 'All' ? 'bg-accent text-white' : 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {updatedFeaturedItems.map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ y: -8 }}
                className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-zinc-800"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-accent hover:text-white transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded">
                        {item.category}
                      </span>
                      <h3 className="mt-2 font-bold dark:text-white">{item.name}</h3>
                    </div>
                    <p className="text-accent font-bold">{item.price}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                    <button className="p-2 bg-gray-50 dark:bg-zinc-800 rounded-full hover:bg-accent hover:text-white transition-colors text-gray-400 hover:text-white">
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-display font-bold dark:text-white">Recent Activity</h2>
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 p-6 space-y-6">
            {RECENT_EVENTS.map((event, i) => (
              <div key={event.id} className="flex space-x-4 relative">
                {i !== RECENT_EVENTS.length - 1 && (
                  <div className="absolute left-6 top-10 bottom-0 w-px bg-gray-100 dark:bg-zinc-800" />
                )}
                <div className={`p-3 rounded-xl flex-shrink-0 relative z-10 ${
                  event.type === 'order' ? 'bg-orange-100 text-orange-600' :
                  event.type === 'customer' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                }`}>
                  {event.type === 'order' ? <ShoppingCart className="h-5 w-5" /> :
                   event.type === 'customer' ? <Users className="h-5 w-5" /> : <Star className="h-5 w-5" />}
                </div>
                <div>
                  <h4 className="font-bold text-sm dark:text-white leading-none">{event.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">{event.details}</p>
                  <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest">{event.time}</p>
                </div>
              </div>
            ))}
            <button className="w-full pt-2 text-sm font-bold text-accent hover:underline text-center">View Full Log</button>
          </div>

          <div className="bg-accent rounded-3xl p-8 text-white relative overflow-hidden group">
            <Coffee className="absolute -right-8 -bottom-8 h-40 w-40 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
            <h3 className="text-xl font-bold">Staffing Alert</h3>
            <p className="mt-2 text-accent-light text-sm opacity-90 leading-relaxed">Morning rush pattern detected. Add one barista for the 8 AM - 10 AM shift tomorrow.</p>
            <button className="mt-6 bg-white text-accent px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors w-full shadow-lg">
              Manage Roster
            </button>
          </div>
        </div>
      </section>

      {/* Modals */}
      <Modal 
        isOpen={activeModal === 'customer'} 
        onClose={() => setActiveModal(null)}
        title="Register New Customer"
      >
        <AddForm 
          title="" 
          fields={[
            { name: 'name', label: 'Customer Name', type: 'text', placeholder: 'John Doe' },
            { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
            { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 (555) 000-0000' }
          ]}
          onSubmit={handleSubmit}
        />
      </Modal>

      <Modal 
        isOpen={activeModal === 'order'} 
        onClose={() => setActiveModal(null)}
        title="Create Order"
      >
        <AddForm 
          title="" 
          fields={[
            { name: 'customer', label: 'Customer', type: 'text', placeholder: 'Search...' },
            { name: 'items', label: 'Items', type: 'text', placeholder: 'Latte, Espresso...' },
            { name: 'total', label: 'Total ($)', type: 'number', placeholder: '0.00' }
          ]}
          onSubmit={handleSubmit}
        />
      </Modal>

      {showSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg z-50 font-bold"
        >
          Successfully added!
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
