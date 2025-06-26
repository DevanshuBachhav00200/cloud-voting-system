const apiUrl = 'https://cloud-voting-api-1018102396253.asia-south1.run.app';

let chart;

async function castVote(option) {
  try {
    const response = await fetch(`${apiUrl}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ option })
    });

    const result = await response.text();
    console.log('Vote response:', result);
    loadVotes();
  } catch (error) {
    console.error('Error casting vote:', error);
    alert('Error casting vote. Please try again.');
  }
}

async function loadVotes() {
  try {
    const res = await fetch(`${apiUrl}/results`);
    const data = await res.json();

    const labels = Object.keys(data);
    const counts = Object.values(data);

    const canvas = document.getElementById('voteChart');
    if (!canvas) {
      console.error("Canvas with id 'voteChart' not found.");
      return;
    }

    const ctx = canvas.getContext('2d');

    if (chart) {
      chart.data.labels = labels;
      chart.data.datasets[0].data = counts;
      chart.update();
    } else {
      chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Votes',
            data: counts,
            backgroundColor: ['#4e54c8', '#34ace0']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });
    }
  } catch (error) {
    console.error('Error loading votes:', error);
    alert('Failed to load results.');
  }
}

// ✅ Make sure it runs only after DOM is ready
window.onload = () => {
  loadVotes();
};
