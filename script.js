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

async function fetchData() {
    try {
        // Fetch EXY price data from API
        const response = await fetch('https://rons-server.netlify.app/.netlify/functions/server/api/historical-trades/exy');
        const data = await response.json();

        // Get the last price from the response (EXY price in EX)
        const lastPrice = Number(data[data.length - 1].price);

        // Fetch EX Price in ALPH and USD Price
        const { exPriceInAlph, alphUSD } = await getTokenPriceInfo();

        // Calculate different price representations
        const exyPriceInEx = lastPrice.toFixed(6);
        // EXY in ALPH = EXY in EX * EX in ALPH
        const exyPriceInAlph = (lastPrice * exPriceInAlph).toFixed(6);
        const exyPriceInUsd = (lastPrice * exPriceInAlph * alphUSD).toFixed(6);
        const marketCap = (lastPrice * exPriceInAlph * alphUSD * 69000000).toFixed(2);

        // Update the display
        document.getElementById('exy-price-ex').textContent = `${exyPriceInEx} EX`;
        document.getElementById('exy-price-alph').textContent = `${exyPriceInAlph} ALPH`;
        document.getElementById('exy-price-usd').textContent = `$${exyPriceInUsd}`;
        document.getElementById('market-cap').textContent = `$${marketCap}`;

    } catch (error) {
        console.error('Error loading data:', error);
        const elements = ['exy-price-ex', 'exy-price-alph', 'exy-price-usd', 'market-cap'];
        elements.forEach(id => {
            document.getElementById(id).textContent = 'Error loading data';
        });
    }
}

// Call the function to fetch data and display prices
fetchData();

        // Function to fetch EX price in ALPH and ALPH USD price
        async function getTokenPriceInfo() {
    const exPriceInAlphResponse = await fetch('https://backend.mainnet.alephium.org/addresses/27Ub32AhfC9ULKGKGUTdDGU2ehvUN55aLS4oU8nmW3x9M/balance');
    const alphData = await exPriceInAlphResponse.json();
    const alphBalance = parseFloat(alphData.balance) / 1e18;

    const exPriceResponse = await fetch('https://backend.mainnet.alephium.org/addresses/27Ub32AhfC9ULKGKGUTdDGU2ehvUN55aLS4oU8nmW3x9M/tokens-balance?limit=100&page=1');
    const exTokenData = await exPriceResponse.json();
    const exToken = exTokenData.find(token => token.tokenId === "cad22f7c98f13fe249c25199c61190a9fb4341f8af9b1c17fcff4cd4b2c3d200");
    const exBalance = parseFloat(exToken.balance) / 1e18;

    // EX Price in ALPH
    const exPriceInAlph = (alphBalance / exBalance).toFixed(3);

    const alphUSD = await getUSDConversionRate();

    return { exPriceInAlph, alphUSD };
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
