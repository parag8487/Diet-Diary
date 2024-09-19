// Function to fetch saved meal data for the week
function fetchWeeklyData() {
    return fetch('http://localhost:3000/get-weekly-data') // Update with your actual endpoint
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching weekly data:', error);
            return {
                calorieData: [0, 0, 0, 0, 0, 0, 0], // Fallback data if there's an error
                proteinData: [0, 0, 0, 0, 0, 0, 0]
            };
        });
}

// Function to update the chart with new data
function updateChart(chart, data) {
    chart.data.datasets[0].data = data.calorieData;
    chart.data.datasets[1].data = data.proteinData;
    chart.update();
}

// Initialize the chart
const ctx = document.getElementById("calorieProteinChart").getContext("2d");
const calorieProteinChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
            {
                label: "Calories",
                data: [], // Data for weekly calories
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
                yAxisID: 'y1'
            },
            {
                label: "Protein (g)",
                data: [], // Data for weekly protein
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                yAxisID: 'y2'
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Days of the Week'
                }
            },
            y1: {
                type: 'linear',
                position: 'left',
                beginAtZero: false,
                min: 100, // Minimum value for Calories
                max: 1500, // Maximum value for Calories
                title: {
                    display: true,
                    text: 'Calories'
                },
                grid: {
                    drawOnChartArea: false // Hide grid lines for this axis
                }
            },
            y2: {
                type: 'linear',
                position: 'right',
                beginAtZero: false,
                min: 10, // Minimum value for Protein
                max: 150, // Maximum value for Protein
                title: {
                    display: true,
                    text: 'Protein (g)'
                },
                grid: {
                    drawOnChartArea: false // Hide grid lines for this axis
                }
            }
        }
    }
});

// Fetch and update the chart with saved weekly data
fetchWeeklyData().then(data => {
    console.log('Fetched data:', data); // Debugging line
    updateChart(calorieProteinChart, data);
});
