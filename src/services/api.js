import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Fetch top cryptocurrencies
export const fetchTopCryptos = async (limit = 10) => {
    try {
        const response = await axios.get(`${COINGECKO_API}/coins/markets`, {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: limit,
                page: 1,
                sparkline: false,
                price_change_percentage: '24h'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching crypto data:', error);
        throw error;
    }
};

// Fetch historical data for a specific crypto
export const fetchCryptoHistory = async (coinId, days = 7) => {
    try {
        const response = await axios.get(`${COINGECKO_API}/coins/${coinId}/market_chart`, {
            params: {
                vs_currency: 'usd',
                days: days,
                interval: days === 1 ? 'hourly' : 'daily'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching crypto history:', error);
        throw error;
    }
};

// Fetch specific crypto details
export const fetchCryptoDetails = async (coinId) => {
    try {
        const response = await axios.get(`${COINGECKO_API}/coins/${coinId}`, {
            params: {
                localization: false,
                tickers: false,
                market_data: true,
                community_data: false,
                developer_data: false
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching crypto details:', error);
        throw error;
    }
};
