import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Search, Download, Share2, Filter, ChevronUp, ChevronDown, 
  TrendingUp, Users, ShoppingBag, PieChart as PieIcon, Coffee
} from 'lucide-react';
import { SALES_DATA, PRODUCT_PERFORMANCE, GROWTH_DATA, CUSTOMER_STATS } from '../utils/dummyData';

const COLORS = ['#bc6c25', '#d4a373', '#606c38', '#283618', '#dda15e'];

const Table = ({ data, columns }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const sortedAndFilteredData = useMemo(() => {
    let filtered = data.filter(item => 
      Object.values(item).some(val => 
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return filtered;
  }, [data, searchTerm, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm">
      <div className="p-4 border-b dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search report..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 focus:ring-2 focus:ring-accent/20 outline-none transition-all dark:text-white"
          />
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors dark:text-white">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-accent text-white hover:bg-accent/90 rounded-lg text-sm font-medium transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-zinc-800/50">
              {columns.map(col => (
                <th 
                  key={col.key}
                  onClick={() => requestSort(col.key)}
                  className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400 cursor-pointer hover:text-accent transition-colors"
                >
                  <div className="flex items-center space-x-1">
                    <span>{col.label}</span>
                    {sortConfig.key === col.key && (
                      sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-zinc-800">
            {sortedAndFilteredData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors">
                {columns.map(col => (
                  <td key={col.key} className="px-6 py-4 text-sm text-gray-600 dark:text-zinc-300">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t dark:border-zinc-800 flex items-center justify-between text-sm text-gray-500">
        <span>Showing {sortedAndFilteredData.length} records</span>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 rounded border hover:bg-gray-50 dark:hover:bg-zinc-800">Prev</button>
          <button className="px-3 py-1 bg-accent text-white rounded">1</button>
          <button className="px-3 py-1 rounded border hover:bg-gray-50 dark:hover:bg-zinc-800">Next</button>
        </div>
      </div>
    </div>
  );
};

const Reports = () => {
  const [activeTab, setActiveTab] = useState('sales');

  const tabs = [
    { id: 'sales', label: 'Sales Report', icon: TrendingUp },
    { id: 'customer', label: 'Customer Activity', icon: Users },
    { id: 'orders', label: 'Order Summary', icon: ShoppingBag },
    { id: 'growth', label: 'Revenue Growth', icon: PieIcon },
    { id: 'product', label: 'Product Performance', icon: Coffee },
  ];

  const handleShare = async () => {
    const shareData = {
      title: 'Urban Brew Reports',
      text: 'Check out the latest sales performance for Urban Brew Café.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: WhatsApp share link
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareData.text} ${shareData.url}`)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const salesColumns = [
    { key: 'id', label: 'ID' },
    { key: 'date', label: 'Date' },
    { key: 'customer', label: 'Customer' },
    { key: 'items', label: 'Items' },
    { key: 'total', label: 'Total', render: (val) => `$${val.toFixed(2)}` },
    { 
      key: 'status', 
      label: 'Status',
      render: (val) => (
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
          val === 'Completed' ? 'bg-green-100 text-green-700' : 
          val === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
        }`}>
          {val}
        </span>
      )
    },
  ];

  const SummaryBar = ({ stats }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-accent/5 rounded-xl">
            <stat.icon className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">{stat.label}</p>
            <p className="text-lg font-bold dark:text-white leading-tight mt-0.5">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'sales':
        return (
          <div className="space-y-6">
            <SummaryBar stats={[
              { label: 'Today\'s Sales', value: '$1,240.50', icon: TrendingUp },
              { label: 'Orders Today', value: '42', icon: ShoppingBag },
              { label: 'Avg Order Val', value: '$29.54', icon: Coffee },
              { label: 'Conversion', value: '18.2%', icon: Users },
            ]} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-[400px] bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold dark:text-white">Daily Sales Performance</h3>
                    <select className="bg-gray-50 dark:bg-zinc-800 border-none rounded-lg text-xs font-bold px-3 py-1.5 focus:ring-1 focus:ring-accent outline-none dark:text-white">
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                    </select>
                  </div>
                  <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={SALES_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <Tooltip 
                        cursor={{ fill: 'rgba(188, 108, 37, 0.05)' }}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', backgroundColor: 'white' }}
                      />
                      <Bar dataKey="total" fill="#bc6c25" radius={[6, 6, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <Table data={SALES_DATA} columns={salesColumns} />
              </div>
              <div className="space-y-6">
                <div className="bg-accent rounded-3xl p-6 text-white overflow-hidden relative group">
                  <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <Coffee className="h-48 w-48" />
                  </div>
                  <h4 className="text-xl font-bold">Smart Insights</h4>
                  <p className="mt-2 text-accent-light text-sm">Your morning rush (8am - 10am) has increased by 15% this week.</p>
                  <button className="mt-6 bg-white text-accent px-6 py-2 rounded-xl text-sm font-bold w-full hover:bg-gray-50 transition-colors">
                    Optimize Staffing
                  </button>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                  <h3 className="font-bold mb-4 dark:text-white">Top Customers</h3>
                  <div className="space-y-4">
                    {['Alice Johnson', 'Bob Smith', 'Charlie Brown'].map((name, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs">
                            {name[0]}
                          </div>
                          <span className="text-sm font-medium dark:text-white">{name}</span>
                        </div>
                        <span className="text-sm text-gray-500 font-bold">$42.50</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'product':
        return (
          <div className="space-y-6">
            <SummaryBar stats={[
              { label: 'Active Items', value: '24', icon: Coffee },
              { label: 'Out of Stock', value: '0', icon: ShoppingBag },
              { label: 'Best Seller', value: 'Latte', icon: TrendingUp },
              { label: 'Margins', value: '64%', icon: PieIcon },
            ]} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-[400px] bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                <h3 className="font-bold mb-8 dark:text-white">Sales Distribution</h3>
                <ResponsiveContainer width="100%" height="80%">
                  <PieChart>
                    <Pie
                      data={PRODUCT_PERFORMANCE}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={100}
                      paddingAngle={8}
                      dataKey="revenue"
                    >
                      {PRODUCT_PERFORMANCE.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center flex-wrap gap-4 mt-4">
                  {PRODUCT_PERFORMANCE.map((p, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-xs text-gray-500 font-medium">{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Table 
                data={PRODUCT_PERFORMANCE} 
                columns={[
                  { key: 'name', label: 'Product' },
                  { key: 'sales', label: 'Units Sold' },
                  { key: 'revenue', label: 'Revenue', render: (val) => `$${val.toFixed(2)}` }
                ]} 
              />
            </div>
          </div>
        );
      case 'customer':
        return (
          <div className="space-y-6">
            <SummaryBar stats={CUSTOMER_STATS.map(s => ({ ...s, icon: Users }))} />
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
              <h2 className="text-xl font-bold mb-6 dark:text-white">Customer Activity Trend</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={GROWTH_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    <Line type="monotone" dataKey="orders" stroke="#bc6c25" strokeWidth={3} dot={{ r: 6, fill: '#bc6c25' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      case 'growth':
        return (
          <div className="space-y-6">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                <h3 className="font-bold mb-6 dark:text-white">Revenue Growth (MoM)</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={GROWTH_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                      <Bar dataKey="revenue" fill="#606c38" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-accent rounded-3xl p-8 text-white flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-2">Projected Growth</h3>
                <p className="text-accent-light mb-6 opacity-80">Based on April metrics, we project an 11% increase for next month.</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                    <span>Est. May Revenue</span>
                    <span className="font-bold">$27,260</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                    <span>Target Orders</span>
                    <span className="font-bold">1,450</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'orders':
        return (
           <div className="space-y-6">
            <SummaryBar stats={[
              { label: 'Dine-in (%)', value: '45%', icon: Coffee },
              { label: 'Takeaway (%)', value: '55%', icon: ShoppingBag },
              { label: 'Avg Prep Time', value: '12 min', icon: TrendingUp },
              { label: 'Order Accuracy', value: '99.2%', icon: Users },
            ]} />
             <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
              <h3 className="font-bold mb-4 dark:text-white">Daily Order Volume</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SALES_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                    <Bar dataKey="total" fill="#bc6c25" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-display font-bold dark:text-white">Performance Reports</h1>
          <p className="mt-1 text-gray-500 dark:text-zinc-400">Detailed analytics and business insights for Urban Brew.</p>
        </div>
        <button 
          onClick={handleShare}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all shadow-sm font-bold dark:text-white"
        >
          <Share2 className="h-5 w-5 text-accent" />
          <span>Share Full Report</span>
        </button>
      </div>

      <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-none no-scrollbar">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl whitespace-nowrap font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                  : 'bg-white dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 border border-gray-100 dark:border-zinc-800 hover:border-accent/50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Reports;
