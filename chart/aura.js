let chart = null;
let currentInterval = 240;
let rawTradeData = null;

// Define default time windows for each interval (in milliseconds)
const TIME_WINDOWS = {
    60: 7 * 24 * 60 * 60 * 1000,      // 1H: Last 7 days
    240: 30 * 24 * 60 * 60 * 1000,    // 4H: Last 30 days
    720: 60 * 24 * 60 * 60 * 1000,    // 12H: Last 60 days
    1440: 90 * 24 * 60 * 60 * 1000,   // 1D: Last 90 days
    10080: null                        // 1W: Show all
};

async function fetchData() {
    try {
        const response = await fetch('https://rons-server.netlify.app/.netlify/functions/server/api/historical-trades/aura');
        rawTradeData = await response.json();
        // Sort trades by timestamp once
        rawTradeData.sort((a, b) => Number(a.trade_timestamp) - Number(b.trade_timestamp));
        
        processDataAndUpdateChart(currentInterval);
    } catch (error) {
        document.getElementById('loading').textContent = 'Error loading data';
        console.error('Error:', error);
    }
}

function processDataAndUpdateChart(interval) {
    if (!rawTradeData) return;

    const trades = rawTradeData;
    const candleData = [];
    const PERIOD = interval * 60 * 1000; // Convert minutes to milliseconds
    
    // Get the start and end timestamps
    const startTime = Math.floor(Number(trades[0].trade_timestamp) / PERIOD) * PERIOD;
    const endTime = Math.ceil(Number(trades[trades.length - 1].trade_timestamp) / PERIOD) * PERIOD;
    
    // Create a map of all trade periods
    const tradePeriods = new Map();
    trades.forEach(trade => {
        const timestamp = Math.floor(Number(trade.trade_timestamp) / PERIOD) * PERIOD;
        if (!tradePeriods.has(timestamp)) {
            tradePeriods.set(timestamp, []);
        }
        tradePeriods.get(timestamp).push(trade);
    });

    let lastClose = null;
    let lastTimestamp = null;

    // Process all periods
    for (let timestamp = startTime; timestamp <= endTime; timestamp += PERIOD) {
        if (tradePeriods.has(timestamp)) {
            // Period with actual trades
            const periodTrades = tradePeriods.get(timestamp);
            const prices = periodTrades.map(t => Number(t.base_volume) / Number(t.target_volume));
            const volume = periodTrades.reduce((sum, t) => sum + Number(t.base_volume), 0);

            // Fill any gap before this candle if needed
            if (lastClose !== null && lastTimestamp !== timestamp - PERIOD) {
                const gapStart = lastTimestamp + PERIOD;
                const gapPeriods = (timestamp - gapStart) / PERIOD;
                const priceDiff = prices[0] - lastClose;
                const priceStep = priceDiff / (gapPeriods + 1);

                for (let t = gapStart; t < timestamp; t += PERIOD) {
                    const stepIndex = (t - gapStart) / PERIOD + 1;
                    const intermediatePrice = lastClose + (priceStep * stepIndex);
                    const prevIntermediatePrice = lastClose + (priceStep * (stepIndex - 1));
                    
                    candleData.push({
                        x: t,
                        y: [
                            prevIntermediatePrice,
                            Math.max(prevIntermediatePrice, intermediatePrice),
                            Math.min(prevIntermediatePrice, intermediatePrice),
                            intermediatePrice
                        ],
                        volume: 0
                    });
                }
            }

            candleData.push({
                x: timestamp,
                y: [
                    lastClose !== null ? lastClose : (Number(periodTrades[0].base_volume) / Number(periodTrades[0].target_volume)),
                    Math.max(...prices),
                    Math.min(...prices),
                    (Number(periodTrades[periodTrades.length - 1].base_volume) / Number(periodTrades[periodTrades.length - 1].target_volume))
                ],
                volume: volume
            });

            lastClose = (Number(periodTrades[periodTrades.length - 1].base_volume) / Number(periodTrades[periodTrades.length - 1].target_volume));
            lastTimestamp = timestamp;
        } else {
            if (lastClose !== null) {
                candleData.push({
                    x: timestamp,
                    y: [lastClose, lastClose, lastClose, lastClose],
                    volume: 0
                });
                lastTimestamp = timestamp;
            }
        }
    }

    document.getElementById('loading').style.display = 'none';
    createChart(candleData, interval);
}

function createChart(data, interval) {
    const prices = data.flatMap(candle => candle.y);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;

    // Calculate initial viewport window
    const dataEndTime = data[data.length - 1].x;
    const timeWindow = TIME_WINDOWS[interval];
    const viewportStart = timeWindow ? dataEndTime - timeWindow : data[0].x;

    const options = {
        series: [{
            name: 'Price',
            data: data
        }],
        chart: {
            type: 'candlestick',
            height: 700,
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            },
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true
                },
                autoSelected: 'zoom'
            },
            background: '#1a2332'
        },
        title: {
            text: `$AURA/ALPH (${interval === 60 ? '1H' : interval === 240 ? '4H' : interval === 720 ? '12H' : interval === 10080 ? '1W' : '1D'})`,
            align: 'left',
            style: {
                fontSize: '16px',
                fontWeight: '600',
                color: '#fff'
            }
        },
        theme: {
            mode: 'dark',
            palette: 'palette1'
        },
        plotOptions: {
            candlestick: {
                colors: {
                    upward: '#049981', 
                    downward: '#f23645'
                },
                wick: {
                    useFillColor: true,
                }
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                show: true,
                style: {
                    colors: '#9dacba',
                    fontSize: '12px',
                    fontWeight: 500
                },
                datetimeFormatter: {
                    year: 'yyyy',
                    month: "MMM 'yy",
                    day: 'dd MMM',
                    hour: 'HH:mm'
                }
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            tickAmount: 8,
            // Set initial viewport (users can zoom out to see all data)
            min: viewportStart,
            max: dataEndTime,
            crosshairs: {
                show: true,
                width: 1,
                position: 'back',
                opacity: 0.9,
                stroke: {
                    color: '#9dacba',
                    width: 1,
                    dashArray: 2,
                }
            },
        },
        yaxis: {
            min: minPrice,
            max: maxPrice + (priceRange * 0.05),
            tickAmount: 8,
            labels: {
                style: {
                    colors: '#9dacba',
                    fontSize: '12px',
                    fontWeight: 500
                },
                formatter: (value) => {
                    return value.toFixed(8);
                }
            },
            tooltip: {
                enabled: true
            },
            crosshairs: {
                show: true,
                position: 'back',
                stroke: {
                    color: '#9dacba',
                    width: 1,
                    dashArray: 2,
                }
            },
        },
        grid: {
            borderColor: 'rgba(154, 168, 184, 0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            }
        },
        tooltip: {
            enabled: true,
            theme: 'dark',
            style: {
                fontSize: '12px',
                fontFamily: undefined
            },
            x: {
                format: 'MMM dd HH:mm'
            },
            y: {
                formatter: (value) => {
                    return value.toFixed(8);
                }
            }
        }
    };

    if (chart) {
        chart.destroy();
    }
    chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}

// Add event listeners to interval buttons
document.querySelectorAll('.interval-btn').forEach(button => {
    button.addEventListener('click', () => {
        const interval = parseInt(button.dataset.interval);
        if (interval !== currentInterval) {
            // Update active state
            document.querySelector('.interval-btn.active').classList.remove('active');
            button.classList.add('active');
            
            // Update loading state
            document.getElementById('loading').style.display = 'block';
            document.getElementById('loading').textContent = 'Processing data...';
            
            // Update chart with new interval
            currentInterval = interval;
            setTimeout(() => processDataAndUpdateChart(interval), 0);
        }
    });
});

// Initial load
fetchData();
