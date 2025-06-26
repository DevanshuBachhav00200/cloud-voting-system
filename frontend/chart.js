chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Votes',
      data: counts,
      backgroundColor: ['#4e54c8', '#34ace0']
    }]
  }
});
