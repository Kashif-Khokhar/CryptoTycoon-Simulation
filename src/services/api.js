import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Mock data for fallback
const MOCK_TOP_CRYPTOS = [
    { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', current_price: 64230.50, image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png', price_change_percentage_24h: 1.2 },
    { id: 'ethereum', symbol: 'eth', name: 'Ethereum', current_price: 3450.20, image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png', price_change_percentage_24h: -0.5 },
    { id: 'solana', symbol: 'sol', name: 'Solana', current_price: 145.80, image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png', price_change_percentage_24h: 4.8 },
    { id: 'binancecoin', symbol: 'bnb', name: 'BNB', current_price: 590.10, image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png', price_change_percentage_24h: 0.2 },
    { id: 'ripple', symbol: 'xrp', name: 'XRP', current_price: 0.62, image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png', price_change_percentage_24h: -1.1 },
    { id: 'cardano', symbol: 'ada', name: 'Cardano', current_price: 0.45, image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png', price_change_percentage_24h: -2.3 },
    { id: 'avalanche-2', symbol: 'avax', name: 'Avalanche', current_price: 38.50, image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png', price_change_percentage_24h: 3.1 },
    { id: 'dogecoin', symbol: 'doge', name: 'Dogecoin', current_price: 0.16, image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png', price_change_percentage_24h: 5.4 },
    { id: 'polkadot', symbol: 'dot', name: 'Polkadot', current_price: 7.20, image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png', price_change_percentage_24h: -1.5 },
    { id: 'chainlink', symbol: 'link', name: 'Chainlink', current_price: 18.40, image: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png', price_change_percentage_24h: 0.9 },
    { id: 'polygon', symbol: 'matic', name: 'Polygon', current_price: 0.72, image: 'https://assets.coingecko.com/coins/images/4713/large/polygon.png', price_change_percentage_24h: -0.4 },
    { id: 'terra-luna-2', symbol: 'luna', name: 'Terra', current_price: 0.95, image: 'https://assets.coingecko.com/coins/images/25767/large/terra_luna_2.png', price_change_percentage_24h: -12.5 }
];

const generateMockHistory = (basePrice, days) => {
    const points = days === 1 ? 24 : days;
    const interval = days === 1 ? 3600000 : 86400000;
    const now = Date.now();
    const prices = [];

    for (let i = points; i >= 0; i--) {
        const time = now - (i * interval);
        const randomChange = (Math.random() - 0.48) * 0.05; // biased slightly upwards
        const price = basePrice * (1 + randomChange);
        prices.push([time, price]);
    }

    return { prices };
};

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
            },
            timeout: 5000 // 5 second timeout
        });
        return response.data;
    } catch (error) {
        console.warn('API Error (fetchTopCryptos), falling back to mock data:', error.message);
        // Add a flag for App to know it's mock data
        return MOCK_TOP_CRYPTOS.slice(0, limit).map(c => ({ ...c, isMock: true }));
    }
};

// Fetch historical data for a specific crypto
export const fetchCryptoHistory = async (coinId, days = 7) => {
    try {
        const response = await axios.get(`${COINGECKO_API}/coins/${coinId}/market_chart`, {
            params: {
                vs_currency: 'usd',
                days: days
            },
            timeout: 5000
        });
        return response.data;
    } catch (error) {
        console.warn(`API Error (fetchCryptoHistory for ${coinId}), falling back to mock data:`, error.message);
        const coin = MOCK_TOP_CRYPTOS.find(c => c.id === coinId) || MOCK_TOP_CRYPTOS[0];
        return generateMockHistory(coin.current_price, days);
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
            },
            timeout: 5000
        });
        return response.data;
    } catch (error) {
        console.warn(`API Error (fetchCryptoDetails for ${coinId}), falling back to mock:`, error.message);
        const coin = MOCK_TOP_CRYPTOS.find(c => c.id === coinId) || MOCK_TOP_CRYPTOS[0];
        return {
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            market_data: {
                current_price: { usd: coin.current_price },
                price_change_percentage_24h: coin.price_change_percentage_24h
            }
        };
    }
};
