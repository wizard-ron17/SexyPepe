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
  
  // Price Chart
  async function fetchData() {
    try {
        const response = await fetch('https://rons-server.netlify.app/.netlify/functions/server/api/historical-trades/exy');
        const data = await response.json();
        
        // Reduce data points for better performance
        const reducedData = data
            .sort((a, b) => a.trade_timestamp - b.trade_timestamp)
            .map(item => ({
                time: new Date(Number(item.trade_timestamp)),
                price: Number(item.price)
            }));

        if (reducedData.length > 0) {
            document.getElementById('loading').style.display = 'none';
            createChart(reducedData);
        } else {
            document.getElementById('loading').textContent = 'No data available';
        }
    } catch (error) {
        document.getElementById('loading').textContent = 'Error loading data';
    }
}

function createChart(data) {
    const ctx = document.getElementById('priceChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.time.toLocaleTimeString()),
            datasets: [{
                label: 'Price',
                data: data.map(d => d.price),
                backgroundColor: 'rgba(152,251,152,0.2)',
                borderColor: '#2E8B57',
                borderWidth: 1.5,
                pointRadius: 0,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 0 // Disable animations for better performance
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true, // Enable the tooltip
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        size: 12
                    },
                    bodyFont: {
                        size: 12
                    },
                    padding: 8,
                    callbacks: {
                        title: function(context) {
                            // Optional: Show time in the title of the tooltip
                            return `Time: ${context[0].label}`;
                        },
                        label: function(context) {
                            return `Price: $${context.parsed.y.toFixed(8)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 12,
                        font: {
                            size: 10
                        }
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(75, 115, 85, 0.1)'
                    },
                    ticks: {
                        font: {
                            size: 10
                        },
                        callback: function(value) {
                            return value.toFixed(8);
                        }
                    }
                }
            }
        }
    });
}

fetchData();


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

async function fetchData() {
            try {
                // Fetch EXY price data from API
                const response = await fetch('https://rons-server.netlify.app/.netlify/functions/server/api/historical-trades/exy');
                const data = await response.json();

                // Get the last price from the response (bottom of the response data)
                const lastPrice = Number(data[data.length - 1].price);

                // Fetch EX Price in ALPH and ALPH USD Price
                const { alphPrice, usdPrice } = await getTokenPriceInfo();

                // Calculate market cap
                const marketCap = lastPrice * alphPrice * usdPrice * 69000000;

                // Display market cap
                document.getElementById('marketCap').textContent = `$${marketCap.toFixed(2)}`;

                // Hide the loading text
                document.getElementById('loading').style.display = 'none';
            } catch (error) {
                document.getElementById('loading').textContent = 'Error loading data';
            }
        }

        // Function to fetch EX price in ALPH and ALPH USD price
        async function getTokenPriceInfo() {
            const alphPriceResponse = await fetch('https://backend.mainnet.alephium.org/addresses/27Ub32AhfC9ULKGKGUTdDGU2ehvUN55aLS4oU8nmW3x9M/balance');
            const alphData = await alphPriceResponse.json();
            const alphBalance = parseFloat(alphData.balance) / 1e18;

            const exPriceResponse = await fetch('https://backend.mainnet.alephium.org/addresses/27Ub32AhfC9ULKGKGUTdDGU2ehvUN55aLS4oU8nmW3x9M/tokens-balance?limit=100&page=1');
            const exTokenData = await exPriceResponse.json();
            const exToken = exTokenData.find(token => token.tokenId === "cad22f7c98f13fe249c25199c61190a9fb4341f8af9b1c17fcff4cd4b2c3d200");
            const exBalance = parseFloat(exToken.balance) / 1e18;

            const alphPrice = (alphBalance / exBalance).toFixed(3);

            const usdConversionRate = await getUSDConversionRate();
            const usdPrice = (alphPrice * usdConversionRate).toFixed(2);

            return { alphPrice, usdPrice };
        }

        // Function to fetch ALPH to USD conversion rate from Coinbase API
        async function getUSDConversionRate() {
            const url = 'https://api.coinbase.com/v2/exchange-rates?currency=ALPH';
            const response = await fetch(url);
            const data = await response.json();
            return parseFloat(data.data.rates.USD);
        }

        // Call the function to fetch data and display market cap
        fetchData();
