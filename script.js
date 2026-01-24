function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard! 📋');
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Tokenomics Pie Chart (empty data initially)
    const ctx = document.getElementById('tokenomicsChart').getContext('2d');
    tokenomicsPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    '#98FB98',
                    '#3CB371',
                    '#2E8B57',
                    '#69c269',
                    '#FF6384', // Color for Burned
                    '#CCCCCC'  // Color for Other Holders/Circulating
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

        // Function to fetch ALPH to USD conversion rate from Coin Paprika API
        async function getUSDConversionRate() {
            const url = 'https://api.coinpaprika.com/v1/coins/alph-alephium/ohlcv/today';
            const response = await fetch(url);
            const data = await response.json();
            if (data && data.length > 0) {
                return parseFloat(data[0].close);
            }
            return 0; // Return 0 or handle error appropriately if data is not available
        }

        // Call the function to fetch data and display market cap
        fetchData();

// Tokenomics Data
const EXY_TOKEN_ID = "b067767804137fa913fe30a26a7c5f397faba36aaa7b9650327ae4e6e9305d00";
const API_BASE_URL = "https://backend.mainnet.alephium.org/tokens/holders/token";
const DECIMALS = 18;
const TOTAL_STATIC_SUPPLY = 69000000;
const OTHER_BURNS_AMOUNT = 3301990.01; // The only other source of burns

let currentViewIsLive = true;
let liveTokenomicsCache = null;
let totalLiveSupplyCache = 0;
let tokenomicsPieChart; // Declare globally

const IMPORTANT_WALLETS = {
    "elexium-lp-balance": { address: "275YMYo21Hw4REEY2SXhweMHTXSpAP9dBUUGNtwGGX3SF", label: "Elexium LP", color: '#98FB98' },
    "treasury-balance": { address: "1GT7VotqHcb91dsKuvmoGNEzTyortaTkB1LZzgzekyjyj", label: "Treasury", color: '#2E8B57' },
    "team-balance": { address: "13gD5RtjkAD237PvDsVR1w9VBBwHFH1hddgAT9Mn6mL1R", label: "Team", color: '#3CB371' },
    "bribes-spent-balance": { address: "15EVxhQEeAhnoPnL7Dd6vd2GCdYDCQ6L9vG5KwXq4AFDr", label: "veDEX Bribes", color: '#69c269' },
    "burned-supply": { address: "", label: "Burned", color: '#FF6384' }, // No address for burned supply
    "other-holders-balance": { address: "", label: "Other Holders/Circulating", color: '#CCCCCC' }
};

const ORIGINAL_TOKENOMICS = {
    "elexium-lp-balance": { amount: (TOTAL_STATIC_SUPPLY * 0.69), percentage: 69, label: "Elexium LP", color: '#98FB98' },
    "treasury-balance": { amount: (TOTAL_STATIC_SUPPLY * 0.10), percentage: 10, label: "Treasury", color: '#2E8B57' },
    "team-balance": { amount: (TOTAL_STATIC_SUPPLY * 0.10), percentage: 10, label: "Team", color: '#3CB371' },
    "bribes-spent-balance": { amount: (TOTAL_STATIC_SUPPLY * 0.11), percentage: 11, label: "veDEX Bribes", color: '#69c269' },
    "burned-supply": { amount: 0, percentage: 0, label: "Burned", color: '#FF6384' },
    "other-holders-balance": { amount: 0, percentage: 0, label: "Other Holders/Circulating", color: '#CCCCCC' }
};

async function fetchAllTokenHolders(tokenId) {
    let allHolders = [];
    let page = 1;
    let limit = 100;
    let hasMore = true;

    while (hasMore) {
        const url = `${API_BASE_URL}/${tokenId}?limit=${limit}&page=${page}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.length > 0) {
            allHolders = allHolders.concat(data);
            page++;
            if (data.length < limit) {
                hasMore = false;
            }
        } else {
            hasMore = false;
        }
    }
    return allHolders;
}

function updateTokenomicsDisplay(dataArray, totalAmount) {
    const tokenomicsListDiv = document.getElementById("tokenomics-data-list");
    tokenomicsListDiv.innerHTML = ''; // Clear existing list

    // Sort by percentage in descending order
    dataArray.sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));

    const pieChartLabels = [];
    const pieChartData = [];
    const pieChartColors = [];

    for (const item of dataArray) {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
            <div class="legend-color" style="background: ${item.color}"></div>
            <span>${item.label}: <span id="${item.id}">${item.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })} (${item.percentage}%)</span></span>
        `;
        tokenomicsListDiv.appendChild(legendItem);

        pieChartLabels.push(item.label);
        pieChartData.push(parseFloat(item.percentage));
        pieChartColors.push(item.color);
    }

    document.getElementById("total-supply").textContent = totalAmount.toLocaleString(undefined, { maximumFractionDigits: 0 });
    tokenomicsPieChart.data.labels = pieChartLabels;
    tokenomicsPieChart.data.datasets[0].data = pieChartData;
    tokenomicsPieChart.data.datasets[0].backgroundColor = pieChartColors;
    tokenomicsPieChart.update();
}

async function updateLiveTokenomics() {
    try {
        let currentTotalSupply = 0;
        let burnedSupply = 0;
        const liveDataArray = [];

        if (liveTokenomicsCache) {
            currentTotalSupply = totalLiveSupplyCache;
            let accountedSupply = 0;
            for (const key in IMPORTANT_WALLETS) {
                if (key === "burned-supply" || key === "other-holders-balance") continue;
                const data = liveTokenomicsCache[key];
                liveDataArray.push({
                    id: key,
                    label: IMPORTANT_WALLETS[key].label,
                    amount: data.balance,
                    percentage: data.percentage,
                    color: IMPORTANT_WALLETS[key].color
                });
                accountedSupply += data.balance;
            }
            burnedSupply = TOTAL_STATIC_SUPPLY - currentTotalSupply;
            liveDataArray.push({
                id: "burned-supply",
                label: IMPORTANT_WALLETS["burned-supply"].label,
                amount: burnedSupply,
                percentage: (burnedSupply / TOTAL_STATIC_SUPPLY * 100).toFixed(2),
                color: IMPORTANT_WALLETS["burned-supply"].color
            });

            const elexiumBurnedAmount = Math.max(0, burnedSupply - OTHER_BURNS_AMOUNT);
            liveDataArray.push({
                id: "elexium-burned",
                label: "Bought Back & Burned by Elexium",
                amount: elexiumBurnedAmount,
                percentage: (elexiumBurnedAmount / TOTAL_STATIC_SUPPLY * 100).toFixed(2),
                color: IMPORTANT_WALLETS["elexium-lp-balance"].color // Using Elexium LP color as a placeholder
            });

            const otherHoldersBalance = currentTotalSupply - accountedSupply - burnedSupply;
            const otherHoldersPercentage = (otherHoldersBalance / currentTotalSupply * 100).toFixed(2);
            liveDataArray.push({
                id: "other-holders-balance",
                label: IMPORTANT_WALLETS["other-holders-balance"].label,
                amount: otherHoldersBalance,
                percentage: otherHoldersPercentage,
                color: IMPORTANT_WALLETS["other-holders-balance"].color
            });

        } else {
            const holders = await fetchAllTokenHolders(EXY_TOKEN_ID);
            let totalNormalizedSupply = 0;
            const walletBalances = {};
            const tempLiveTokenomicsCache = {};

            for (const holder of holders) {
                const normalizedBalance = parseFloat(holder.balance) / Math.pow(10, DECIMALS);
                totalNormalizedSupply += normalizedBalance;

                for (const key in IMPORTANT_WALLETS) {
                    if (IMPORTANT_WALLETS[key].address === holder.address) {
                        walletBalances[key] = normalizedBalance;
                    }
                }
            }
            currentTotalSupply = totalNormalizedSupply;
            totalLiveSupplyCache = currentTotalSupply;

            let accountedSupply = 0;
            for (const key in IMPORTANT_WALLETS) {
                if (key === "burned-supply" || key === "other-holders-balance") continue;
                const balance = walletBalances[key] || 0;
                const percentage = (balance / currentTotalSupply * 100).toFixed(2);
                tempLiveTokenomicsCache[key] = { balance, percentage };
                liveDataArray.push({
                    id: key,
                    label: IMPORTANT_WALLETS[key].label,
                    amount: balance,
                    percentage: percentage,
                    color: IMPORTANT_WALLETS[key].color
                });
                accountedSupply += balance;
            }
            liveTokenomicsCache = tempLiveTokenomicsCache;

            burnedSupply = TOTAL_STATIC_SUPPLY - currentTotalSupply;
            liveDataArray.push({
                id: "burned-supply",
                label: IMPORTANT_WALLETS["burned-supply"].label,
                amount: burnedSupply,
                percentage: (burnedSupply / TOTAL_STATIC_SUPPLY * 100).toFixed(2),
                color: IMPORTANT_WALLETS["burned-supply"].color
            });

            const elexiumBurnedAmount = Math.max(0, burnedSupply - OTHER_BURNS_AMOUNT);
            liveDataArray.push({
                id: "elexium-burned",
                label: "Bought Back & Burned by Elexium",
                amount: elexiumBurnedAmount,
                percentage: (elexiumBurnedAmount / TOTAL_STATIC_SUPPLY * 100).toFixed(2),
                color: IMPORTANT_WALLETS["elexium-lp-balance"].color // Using Elexium LP color as a placeholder
            });

            const otherHoldersBalance = currentTotalSupply - accountedSupply - burnedSupply; // Adjusted calculation
            const otherHoldersPercentage = (otherHoldersBalance / currentTotalSupply * 100).toFixed(2);
            liveDataArray.push({
                id: "other-holders-balance",
                label: IMPORTANT_WALLETS["other-holders-balance"].label,
                amount: otherHoldersBalance,
                percentage: otherHoldersPercentage,
                color: IMPORTANT_WALLETS["other-holders-balance"].color
            });

        }

        updateTokenomicsDisplay(liveDataArray, currentTotalSupply);

        document.getElementById("view-original-tokenomics").textContent = "View Original Numbers 📊";
        currentViewIsLive = true;

    } catch (error) {
        console.error("Error fetching live tokenomics:", error);
        document.getElementById("total-supply").textContent = "Error";
        document.getElementById("burned-supply").textContent = "Error";
        document.getElementById("elexium-burned").textContent = "Error";
        document.getElementById("other-holders-balance").textContent = "Error";
        const tokenomicsListDiv = document.getElementById("tokenomics-data-list");
        tokenomicsListDiv.innerHTML = '';
        tokenomicsListDiv.innerHTML += `<div class="legend-item">Error loading data</div>`;
    }
}

function showOriginalTokenomics() {
    const originalDataArray = [];
    let accountedPercentage = 0;

    for (const key in ORIGINAL_TOKENOMICS) {
        const data = ORIGINAL_TOKENOMICS[key];
        if (key !== "burned-supply" && key !== "other-holders-balance" && key !== "elexium-burned") {
            originalDataArray.push({
                id: key,
                label: data.label,
                amount: data.amount,
                percentage: data.percentage,
                color: data.color
            });
            accountedPercentage += data.percentage;
        }
    }

    // Add Burned (0 for original)
    originalDataArray.push({
        id: "burned-supply",
        label: ORIGINAL_TOKENOMICS["burned-supply"].label,
        amount: ORIGINAL_TOKENOMICS["burned-supply"].amount,
        percentage: ORIGINAL_TOKENOMICS["burned-supply"].percentage,
        color: ORIGINAL_TOKENOMICS["burned-supply"].color
    });

    // Add Bought Back & Burned by Elexium (0 for original)
    originalDataArray.push({
        id: "elexium-burned",
        label: "Bought Back & Burned by Elexium",
        amount: 0,
        percentage: 0,
        color: IMPORTANT_WALLETS["elexium-lp-balance"].color // Using Elexium LP color as a placeholder
    });

    const otherHoldersPercentage = 100 - accountedPercentage;
    const otherHoldersAmount = TOTAL_STATIC_SUPPLY * (otherHoldersPercentage / 100);
    originalDataArray.push({
        id: "other-holders-balance",
        label: IMPORTANT_WALLETS["other-holders-balance"].label,
        amount: otherHoldersAmount,
        percentage: otherHoldersPercentage.toFixed(2),
        color: IMPORTANT_WALLETS["other-holders-balance"].color
    });

    updateTokenomicsDisplay(originalDataArray, TOTAL_STATIC_SUPPLY);

    document.getElementById("view-original-tokenomics").textContent = "View Live Numbers 📈";
    currentViewIsLive = false;
}

function toggleTokenomicsView() {
    if (currentViewIsLive) {
        showOriginalTokenomics();
    } else {
        updateLiveTokenomics();
    }
}

document.getElementById("view-original-tokenomics").addEventListener("click", toggleTokenomicsView);

// Call live tokenomics on page load
updateLiveTokenomics();
