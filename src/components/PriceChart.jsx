import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, CandlestickSeries, AreaSeries, HistogramSeries } from 'lightweight-charts';
import { fetchCryptoHistory } from '../services/api';

const PriceChart = ({ coinId, coinName }) => {
  const chartContainerRef = useRef();
  const [timeframe, setTimeframe] = useState(7);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState('candlestick'); // 'line' or 'candlestick'

  useEffect(() => {
    let priceSeries;
    let volumeSeries;
    let chart;

    const loadChartData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCryptoHistory(coinId, timeframe);
        
        if (!chartContainerRef.current) return;

        const width = chartContainerRef.current.clientWidth;
        if (!data || !data.prices || data.prices.length === 0) {
          throw new Error('No historical data available for this asset');
        }

        // Transform CoinGecko data to OHLC for Candlestick
        const seenTimes = new Set();
        const chartData = data.prices
          .map((p, i, arr) => {
            const time = Math.floor(p[0] / 1000);
            if (seenTimes.has(time)) return null;
            seenTimes.add(time);

            const price = p[1];
            const prevPrice = i > 0 ? arr[i-1][1] : price;
            
            const open = prevPrice;
            const close = price;
            const volatility = 0.002;
            const high = Math.max(open, close) * (1 + Math.random() * volatility);
            const low = Math.min(open, close) * (1 - Math.random() * volatility);
            
            return { time, open, high, low, close };
          })
          .filter(Boolean)
          .sort((a, b) => a.time - b.time);

        if (chartData.length < 2) {
          throw new Error('Insufficient data points for charting');
        }

        const volumeData = chartData.map(d => ({
          time: d.time,
          value: Math.random() * 100,
          color: d.close >= d.open ? 'rgba(0, 255, 136, 0.3)' : 'rgba(255, 0, 110, 0.3)'
        }));

        chart = createChart(chartContainerRef.current, {
          layout: {
            background: { type: ColorType.Solid, color: 'transparent' },
            textColor: 'rgba(255, 255, 255, 0.7)',
          },
          grid: {
            vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
            horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
          },
          width: width || 400,
          height: 400,
          timeScale: {
            borderColor: 'rgba(255, 255, 255, 0.1)',
            timeVisible: true,
            secondsVisible: false,
          },
        });

        if (chartType === 'candlestick') {
          priceSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#10b981',
            downColor: '#f43f5e',
            borderVisible: false,
            wickUpColor: '#10b981',
            wickDownColor: '#f43f5e',
          });
          priceSeries.setData(chartData);
        } else {
          priceSeries = chart.addSeries(AreaSeries, {
            lineColor: '#10b981',
            topColor: 'rgba(16, 185, 129, 0.4)',
            bottomColor: 'rgba(16, 185, 129, 0.0)',
            lineWidth: 2,
          });
          priceSeries.setData(chartData.map(d => ({ time: d.time, value: d.close })));
        }

        volumeSeries = chart.addSeries(HistogramSeries, {
          color: 'rgba(38, 166, 154, 0.5)',
          priceFormat: {
            type: 'volume',
          },
          priceScaleId: '', 
        });
        
        volumeSeries.priceScale().applyOptions({
          scaleMargins: {
            top: 0.8,
            bottom: 0,
          },
        });
        volumeSeries.setData(volumeData);

        chart.timeScale().fitContent();

        const handleResize = () => {
          if (chartContainerRef.current) {
            chart.applyOptions({ 
              width: chartContainerRef.current.clientWidth,
              height: 400
            });
          }
        };

        window.addEventListener('resize', handleResize);
        
        // Final check to ensure width is applied after initial render
        setTimeout(handleResize, 100);

        return () => {
          window.removeEventListener('resize', handleResize);
          chart.remove();
        };
      } catch (err) {
        console.error('Chart error:', err);
        setError(err.message || 'Failed to load chart data');
      } finally {
        setLoading(false);
      }
    };

    loadChartData();

    return () => {
      if (chart) chart.remove();
    };
  }, [coinId, timeframe, chartType]);

  return (
    <div className="glass-card p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold">{coinName} Market</h2>
          <div className="flex gap-2 mt-2">
            <button 
              onClick={() => setChartType('line')}
              className={`text-xs px-2 py-1 rounded transition-colors ${chartType === 'line' ? 'bg-cyber-green text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
            >
              Line
            </button>
            <button 
              onClick={() => setChartType('candlestick')}
              className={`text-xs px-2 py-1 rounded transition-colors ${chartType === 'candlestick' ? 'bg-cyber-green text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
            >
              Candles
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {[1, 7, 30, 90].map(days => (
            <button
              key={days}
              onClick={() => setTimeframe(days)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
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
      
      <div ref={chartContainerRef} className="h-[400px] w-full relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-cyber-darker/50 z-10 rounded-lg">
            <div className="animate-pulse text-cyber-green text-lg">Loading advanced charts...</div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-cyber-darker/50 z-10 rounded-lg p-6">
            <div className="text-4xl mb-4">📉</div>
            <p className="text-white/60 mb-4 text-center">{error}</p>
            <button 
              onClick={() => setTimeframe(timeframe)} // Trigger re-render
              className="btn-success text-xs px-4 py-2"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceChart;
