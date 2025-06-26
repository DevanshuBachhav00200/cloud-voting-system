const apiUrl = ' https://cloud-voting-api-1018102396253.asia-south1.run.app'; // Replace with your real backend URL

let chart;

async function castVote(option) {
    await fetch(`${apiUrl}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ option })
    });
    loadVotes();
}

async function loadVotes() {
    const res = await fetch(`${apiUrl}/votes`);
    const data = await res.json();

    const labels = data.map(item => item.id);
    const counts = data.map(item => item.count);

    const ctx = document.getElementById('voteChart').getContext('2d');

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
}

loadVotes();
