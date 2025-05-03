// Total Sales chart
const ctx = document.getElementById("salesChart");
new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Direct", "Affiliate", "Sponsored", "E-mail"],
    datasets: [
      {
        label: "Sales",
        data: [300.56, 135.18, 48.96, 154.02],
        backgroundColor: ["#6366F1", "#F87171", "#34D399", "#FBBF24"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  },
});

// revenue chart
const ctx1 = document.getElementById("revenueChart").getContext("2d");

new Chart(ctx1, {
  type: "line",
  data: {
    labels: ["Direct", "Affiliate", "Sponsored", "E-mail"],
    datasets: [
      {
        label: "Sales",
        data: [300.56, 135.18, 48.96, 154.02],
        backgroundColor: ["#6366F1", "#F87171", "#34D399", "#FBBF24"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  },
});

// Projections Vs Actual chart
const ctxs = document.getElementById("projectionChart").getContext("2d");
new Chart(ctxs, {
  type: "bar",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Actuals",
        data: [
          65000, 52000, 78000, 79000, 50000, 86000, 40000, 32000, 60000, 52000,
          79000, 80000,
        ],
        backgroundColor: "#6366f1",
      },
      {
        label: "Projections",
        data: [
          155000, 90000, 110000, 145000, 115000, 165000, 120000, 85000, 150000,
          90000, 135000, 133000,
        ],
        backgroundColor: "#d1d5db",
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
