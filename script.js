function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard! 📋');
}

// Pie Chart
document.addEventListener('DOMContentLoaded', function() {
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
});
