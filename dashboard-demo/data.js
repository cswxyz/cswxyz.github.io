// Dummy data for barbershop dashboard demo
// Simulates Stripe online bookings + optional Square POS data

const services = [
  { id: 1, name: "Haircut", price: 30, duration: 30 },
  { id: 2, name: "Haircut + Beard", price: 45, duration: 45 },
  { id: 3, name: "Beard Trim", price: 20, duration: 20 },
  { id: 4, name: "Kids Cut", price: 22, duration: 25 },
  { id: 5, name: "Buzz Cut", price: 20, duration: 15 },
  { id: 6, name: "Fade", price: 35, duration: 35 },
  { id: 7, name: "Hot Towel Shave", price: 35, duration: 30 },
  { id: 8, name: "Hair + Shave Combo", price: 60, duration: 60 }
];

const barbers = [
  { id: 1, name: "Carlos" },
  { id: 2, name: "Miguel" },
  { id: 3, name: "Danny" }
];

const clients = [
  "Marcus", "David", "Jose", "Ryan", "Chris", "Mike", "Alex", "Tony",
  "Luis", "Eric", "Kevin", "James", "Brian", "Diego", "Omar", "Victor",
  "Andres", "Javier", "Roberto", "Fernando", "Gabriel", "Adrian", "Daniel"
];

// Generate bookings for the past 90 days
function generateBookings() {
  const bookings = [];
  const now = new Date();

  for (let daysAgo = 0; daysAgo < 90; daysAgo++) {
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);

    // Skip some Sundays (closed) but not all
    if (date.getDay() === 0 && Math.random() > 0.3) continue;

    // 4-12 bookings per day depending on day of week
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseBookings = isWeekend ? 10 : 7;
    const numBookings = baseBookings + Math.floor(Math.random() * 5);

    for (let i = 0; i < numBookings; i++) {
      const service = services[Math.floor(Math.random() * services.length)];
      const barber = barbers[Math.floor(Math.random() * barbers.length)];
      const client = clients[Math.floor(Math.random() * clients.length)];

      // 70% online (Stripe), 30% walk-in (POS/Square)
      const isOnline = Math.random() > 0.3;

      // Random hour between 9am and 7pm
      const hour = 9 + Math.floor(Math.random() * 10);
      const minute = Math.random() > 0.5 ? 0 : 30;

      const bookingDate = new Date(date);
      bookingDate.setHours(hour, minute, 0, 0);

      // Small tip variation
      const tipPercent = Math.random() > 0.4 ? (0.15 + Math.random() * 0.1) : 0;
      const tip = Math.round(service.price * tipPercent);

      bookings.push({
        id: `BK${String(bookings.length + 1).padStart(5, '0')}`,
        date: bookingDate.toISOString(),
        client: client,
        service: service.name,
        serviceId: service.id,
        barber: barber.name,
        barberId: barber.id,
        amount: service.price,
        tip: tip,
        total: service.price + tip,
        source: isOnline ? 'stripe' : 'square_pos',
        status: 'completed'
      });
    }
  }

  return bookings.sort((a, b) => new Date(b.date) - new Date(a.date));
}

const bookings = generateBookings();

// Calculate summary stats
function getStats(data, startDate, endDate) {
  const filtered = data.filter(b => {
    const d = new Date(b.date);
    return d >= startDate && d <= endDate;
  });

  const totalRevenue = filtered.reduce((sum, b) => sum + b.total, 0);
  const totalBookings = filtered.length;
  const avgTicket = totalBookings > 0 ? totalRevenue / totalBookings : 0;
  const totalTips = filtered.reduce((sum, b) => sum + b.tip, 0);

  const stripeRevenue = filtered.filter(b => b.source === 'stripe').reduce((sum, b) => sum + b.total, 0);
  const posRevenue = filtered.filter(b => b.source === 'square_pos').reduce((sum, b) => sum + b.total, 0);

  // By service
  const byService = {};
  filtered.forEach(b => {
    if (!byService[b.service]) byService[b.service] = { count: 0, revenue: 0 };
    byService[b.service].count++;
    byService[b.service].revenue += b.total;
  });

  // By barber
  const byBarber = {};
  filtered.forEach(b => {
    if (!byBarber[b.barber]) byBarber[b.barber] = { count: 0, revenue: 0 };
    byBarber[b.barber].count++;
    byBarber[b.barber].revenue += b.total;
  });

  // Daily breakdown
  const byDay = {};
  filtered.forEach(b => {
    const day = b.date.split('T')[0];
    if (!byDay[day]) byDay[day] = { count: 0, revenue: 0, stripe: 0, pos: 0 };
    byDay[day].count++;
    byDay[day].revenue += b.total;
    if (b.source === 'stripe') byDay[day].stripe += b.total;
    else byDay[day].pos += b.total;
  });

  return {
    totalRevenue,
    totalBookings,
    avgTicket,
    totalTips,
    stripeRevenue,
    posRevenue,
    stripePercent: totalRevenue > 0 ? (stripeRevenue / totalRevenue * 100) : 0,
    byService,
    byBarber,
    byDay
  };
}
