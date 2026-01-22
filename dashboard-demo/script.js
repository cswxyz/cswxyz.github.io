// Dashboard Script
// Chart.js configuration and data visualization

// Chart.js global config for dark theme
Chart.defaults.color = '#a1a1a1';
Chart.defaults.borderColor = '#2a2a2a';
Chart.defaults.font.family = "'Inter', sans-serif";

let revenueChart, serviceChart, barberChart, sourceChart;

// Initialize dashboard
function initDashboard() {
  const rangeSelect = document.getElementById('range-select');
  rangeSelect.addEventListener('change', () => updateDashboard(parseInt(rangeSelect.value)));
  updateDashboard(30);
}

// Update all dashboard components
function updateDashboard(days) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  startDate.setHours(0, 0, 0, 0);

  const stats = getStats(bookings, startDate, endDate);

  // Update KPIs
  document.getElementById('total-revenue').textContent = formatCurrency(stats.totalRevenue);
  document.getElementById('total-bookings').textContent = stats.totalBookings.toLocaleString();
  document.getElementById('avg-ticket').textContent = formatCurrency(stats.avgTicket);
  document.getElementById('total-tips').textContent = formatCurrency(stats.totalTips);

  // Update payment sources
  document.getElementById('stripe-revenue').textContent = formatCurrency(stats.stripeRevenue);
  document.getElementById('stripe-percent').textContent = `${stats.stripePercent.toFixed(0)}% of total`;
  document.getElementById('pos-revenue').textContent = formatCurrency(stats.posRevenue);
  document.getElementById('pos-percent').textContent = `${(100 - stats.stripePercent).toFixed(0)}% of total`;

  // Update charts
  updateRevenueChart(stats.byDay, days);
  updateServiceChart(stats.byService);
  updateBarberChart(stats.byBarber);
  updateSourceChart(stats.byDay, days);

  // Update transactions table
  updateTransactionsTable(bookings, startDate, endDate);
}

// Format currency
function formatCurrency(amount) {
  return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

// Revenue Chart (Line)
function updateRevenueChart(byDay, days) {
  const ctx = document.getElementById('revenueChart').getContext('2d');

  const dates = [];
  const revenues = [];

  // Generate date range
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    dates.push(formatDateShort(dateStr));
    revenues.push(byDay[dateStr]?.revenue || 0);
  }

  if (revenueChart) revenueChart.destroy();

  revenueChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Revenue',
        data: revenues,
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: days > 30 ? 0 : 3,
        pointHoverRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => formatCurrency(ctx.raw)
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (val) => '$' + val
          },
          grid: { color: '#1a1a1a' }
        },
        x: {
          grid: { display: false },
          ticks: {
            maxTicksLimit: 10
          }
        }
      }
    }
  });
}

// Service Chart (Doughnut)
function updateServiceChart(byService) {
  const ctx = document.getElementById('serviceChart').getContext('2d');

  const labels = Object.keys(byService);
  const data = labels.map(s => byService[s].revenue);

  const colors = [
    '#22c55e', '#3b82f6', '#a855f7', '#ec4899',
    '#f59e0b', '#06b6d4', '#84cc16', '#ef4444'
  ];

  if (serviceChart) serviceChart.destroy();

  serviceChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors.slice(0, labels.length),
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 12,
            padding: 12,
            font: { size: 11 }
          }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.label}: ${formatCurrency(ctx.raw)}`
          }
        }
      }
    }
  });
}

// Barber Chart (Bar)
function updateBarberChart(byBarber) {
  const ctx = document.getElementById('barberChart').getContext('2d');

  const labels = Object.keys(byBarber);
  const revenues = labels.map(b => byBarber[b].revenue);
  const counts = labels.map(b => byBarber[b].count);

  if (barberChart) barberChart.destroy();

  barberChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Revenue',
        data: revenues,
        backgroundColor: '#3b82f6',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            afterLabel: (ctx) => `${counts[ctx.dataIndex]} appointments`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (val) => '$' + val
          },
          grid: { color: '#1a1a1a' }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });
}

// Source Chart (Stacked Area)
function updateSourceChart(byDay, days) {
  const ctx = document.getElementById('sourceChart').getContext('2d');

  const dates = [];
  const stripeData = [];
  const posData = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    dates.push(formatDateShort(dateStr));
    stripeData.push(byDay[dateStr]?.stripe || 0);
    posData.push(byDay[dateStr]?.pos || 0);
  }

  if (sourceChart) sourceChart.destroy();

  sourceChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Online (Stripe)',
          data: stripeData,
          borderColor: '#635BFF',
          backgroundColor: 'rgba(99, 91, 255, 0.2)',
          fill: true,
          tension: 0.3,
          pointRadius: 0
        },
        {
          label: 'Walk-in (POS)',
          data: posData,
          borderColor: '#666666',
          backgroundColor: 'rgba(102, 102, 102, 0.2)',
          fill: true,
          tension: 0.3,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            padding: 15,
            font: { size: 11 }
          }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${formatCurrency(ctx.raw)}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          stacked: true,
          ticks: {
            callback: (val) => '$' + val
          },
          grid: { color: '#1a1a1a' }
        },
        x: {
          stacked: true,
          grid: { display: false },
          ticks: {
            maxTicksLimit: 8
          }
        }
      }
    }
  });
}

// Transactions Table
function updateTransactionsTable(bookings, startDate, endDate) {
  const tbody = document.getElementById('transactions-body');

  const filtered = bookings
    .filter(b => {
      const d = new Date(b.date);
      return d >= startDate && d <= endDate;
    })
    .slice(0, 10); // Show last 10

  tbody.innerHTML = filtered.map(b => `
    <tr>
      <td>${formatDateTime(b.date)}</td>
      <td>${b.client}</td>
      <td>${b.service}</td>
      <td>${b.barber}</td>
      <td><span class="source-badge ${b.source === 'stripe' ? 'stripe' : 'pos'}">${b.source === 'stripe' ? 'Online' : 'Walk-in'}</span></td>
      <td class="amount-cell">${formatCurrency(b.total)}</td>
    </tr>
  `).join('');
}

// Date formatting helpers
function formatDateShort(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatDateTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initDashboard);
