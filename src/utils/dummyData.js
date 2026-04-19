export const DASHBOARD_STATS = [
  { label: 'Total Orders', value: '1,284', trend: '+12.5%', isPositive: true },
  { label: 'Revenue', value: '$24,560', trend: '+8.2%', isPositive: true },
  { label: 'Customers', value: '842', trend: '+5.4%', isPositive: true },
  { label: 'Growth', value: '22.4%', trend: '+2.1%', isPositive: true },
];

export const SALES_DATA = [
  { id: 1, date: '2026-04-01', customer: 'Alice Johnson', items: 'Latte, Croissant', total: 12.50, status: 'Completed' },
  { id: 2, date: '2026-04-01', customer: 'Bob Smith', items: 'Espresso', total: 3.50, status: 'Completed' },
  { id: 3, date: '2026-04-02', customer: 'Charlie Brown', items: 'Cappuccino, Muffin', total: 8.75, status: 'Pending' },
  { id: 4, date: '2026-04-02', customer: 'Diana Prince', items: 'Cold Brew, Bagel', total: 11.20, status: 'Completed' },
  { id: 5, date: '2026-04-03', customer: 'Edward Norton', items: 'Flat White', total: 4.50, status: 'Cancelled' },
];

export const FEATURED_ITEMS = [
  { id: 1, name: 'Signature Latte', price: '$4.50', category: 'Coffee', image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=400&h=300&fit=crop' },
  { id: 2, name: 'Artisan Croissant', price: '$3.75', category: 'Bakery', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop' },
  { id: 3, name: 'Cold Brew Special', price: '$5.25', category: 'Coffee', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop' },
  { id: 4, name: 'Blueberry Muffin', price: '$3.50', category: 'Bakery', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop' },
];

export const PRODUCT_PERFORMANCE = [
  { name: 'Latte', sales: 450, revenue: 2025 },
  { name: 'Cappuccino', sales: 320, revenue: 1440 },
  { name: 'Espresso', sales: 280, revenue: 840 },
  { name: 'Croissant', sales: 210, revenue: 787.5 },
  { name: 'Muffin', sales: 150, revenue: 525 },
];

export const GROWTH_DATA = [
  { month: 'Jan', revenue: 18400, orders: 920 },
  { month: 'Feb', revenue: 21200, orders: 1040 },
  { month: 'Mar', revenue: 19800, orders: 980 },
  { month: 'Apr', revenue: 24560, orders: 1284 },
];

export const CUSTOMER_STATS = [
  { name: 'New Customers', value: 124, trend: '+18%' },
  { name: 'Returning', value: 718, trend: '+4%' },
  { name: 'Avg Visit Rate', value: '2.4/mo', trend: '+12%' },
  { name: 'Satisfaction', value: '4.8/5', trend: '+0.2' },
];

export const RECENT_EVENTS = [
  { id: 1, type: 'order', title: 'Large Order Prepared', details: 'Table 14 - 8 items', time: '12 mins ago' },
  { id: 2, type: 'customer', title: 'New VIP Member', details: 'Sarah Jenkins joined loyalty', time: '45 mins ago' },
  { id: 3, type: 'alert', title: 'Inventory Low', details: 'Arabica Beans (Dark Roast)', time: '2 hours ago' },
  { id: 4, type: 'order', title: 'Order Cancelled', details: '#ORD-9842 (User Timeout)', time: '3 hours ago' },
];
