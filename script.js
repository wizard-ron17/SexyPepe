function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard! 📋');
}

document.addEventListener('DOMContentLoaded', function() {
    // Tokenomics Pie Chart
    const ctx = document.getElementById('tokenomicsChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Liquidity', 'Bribes', 'Team', 'Treasury'],
            datasets: [{
                data: [69, 11, 10, 10],
                backgroundColor: [
                    '#98FB98',
                    '#3CB371',
                    '#2E8B57',
                    '#69c269'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });

    // Bribes Chart
    const bribesCtx = document.getElementById('bribesChart').getContext('2d');
    
    // Generate data points
    const epochs = Array.from({length: 31}, (_, i) => i + 1);
    const bribes = epochs.map(epoch => 1000000 * Math.pow(0.87, epoch - 1));

    new Chart(bribesCtx, {
        type: 'line',
        data: {
            labels: epochs,
            datasets: [{
                label: 'Bribe Amount ($EXY)',
                data: bribes,
                fill: true,
                backgroundColor: 'rgba(152,251,152,0.2)',
                borderColor: '#2E8B57',
                tension: 0.4,
                pointRadius: 2,
                pointHoverRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${(context.raw / 1000000).toFixed(3)}M $EXY`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Epochs'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Bribe Amount ($EXY)'
                    },
                    ticks: {
                        callback: function(value) {
                            return (value / 1000000).toFixed(2) + 'M';
                        }
                    }
                }
            }
        }
    });
});
