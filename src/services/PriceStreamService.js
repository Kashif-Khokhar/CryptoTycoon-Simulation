/**
 * Service to handle real-time price updates via Binance WebSockets
 */

class PriceStreamService {
    constructor() {
        this.ws = null;
        this.subscribers = new Set();
        this.symbols = new Map(); // Map of crypto ID to Binance symbol (e.g. 'bitcoin' -> 'btcusdt')
        this.isReconnecting = false;
    }

    // Initialize with the list of cryptos we care about
    init(cryptos) {
        // Map standard IDs to Binance symbols
        cryptos.forEach(c => {
            const binanceSymbol = `${c.symbol.toLowerCase()}usdt`;
            this.symbols.set(binanceSymbol, c.id);
        });

        this.connect();
    }

    connect() {
        if (this.ws) this.ws.close();

        const streams = Array.from(this.symbols.keys()).map(s => `${s}@ticker`).join('/');
        this.ws = new WebSocket(`wss://stream.binance.com:9443/ws/${streams}`);

        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const symbol = data.s.toLowerCase();
            const cryptoId = this.symbols.get(symbol);

            if (cryptoId) {
                const update = {
                    id: cryptoId,
                    price: parseFloat(data.c), // current price
                    change: parseFloat(data.P) // 24h change percentage
                };
                this.notify(update);
            }
        };

        this.ws.onclose = () => {
            if (!this.isReconnecting) {
                this.isReconnecting = true;
                setTimeout(() => {
                    this.isReconnecting = false;
                    this.connect();
                }, 5000);
            }
        };

        this.ws.onerror = (err) => {
            console.error('WebSocket Error:', err);
        };
    }

    subscribe(callback) {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }

    notify(data) {
        this.subscribers.forEach(cb => cb(data));
    }

    close() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
}

export const priceStreamService = new PriceStreamService();
