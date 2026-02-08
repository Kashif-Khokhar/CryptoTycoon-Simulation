import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { fetchCryptoHistory } from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PriceChart = ({ coinId, coinName }) => {
  const [chartData, setChartData] = useState(null);
  const [timeframe, setTimeframe] = useState(7);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadChartData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCryptoHistory(coinId, timeframe);
        
        const labels = data.prices.map(price => {
          const date = new Date(price[0]);
          return timeframe === 1 
            ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });
        
        const prices = data.prices.map(price => price[1]);
        
        const isPositive = prices[prices.length - 1] >= prices[0];
        
        setChartData({
          labels,
          datasets: [
            {
              label: `${coinName} Price (USD)`,
              data: prices,
              borderColor: isPositive ? '#00ff88' : '#ff006e',
              backgroundColor: isPositive 
                ? 'rgba(0, 255, 136, 0.1)' 
                : 'rgba(255, 0, 110, 0.1)',
              borderWidth: 3,
              fill: true,
              tension: 0.4,
              pointRadius: 0,
              pointHoverRadius: 6,
              pointHoverBackgroundColor: isPositive ? '#00ff88' : '#ff006e',
              pointHoverBorderColor: '#fff',
              pointHoverBorderWidth: 2,
            }
          ]
        });
      } catch (error) {
        console.error('Error loading chart data:', error);
        setError('Failed to load chart data');
      } finally {
        setLoading(false);
      }
    };

    if (coinId) {
      loadChartData();
    }
  }, [coinId, coinName, timeframe]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(10, 14, 39, 0.9)',
        titleColor: '#fff',
        bodyColor: '#10b981',
        borderColor: '#10b981',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return '$' + context.parsed.y.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
          maxTicksLimit: 8
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
          callback: function(value) {
            return '$' + value.toLocaleString('en-US');
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <div className="glass-card p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold">{coinName} Price Chart</h2>
        <div className="flex flex-wrap gap-2">
          {[1, 7, 30, 90].map(days => (
            <button
              key={days}
              onClick={() => setTimeframe(days)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                timeframe === days 
                  ? 'bg-gradient-to-r from-cyber-green to-cyber-amber text-white' 
                  : 'glass-card hover:bg-white/10'
              }`}
            >
              {days}D
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-64 md:h-80">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse text-cyber-green text-lg">Loading chart...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-white/60">
            <div className="text-center">
              <p className="mb-2">⚠️ {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="text-cyber-green hover:underline text-sm"
              >
                Retry
              </button>
            </div>
          </div>
        ) : chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full text-white/60">
            No data available
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceChart;
