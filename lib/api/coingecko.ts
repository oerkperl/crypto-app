import axios from 'axios';

// CoinGecko API configuration
const COINGECKO_API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;
const BASE_URL = 'https://api.coingecko.com/api/v3';

// Create axios instance with default config
export const coingeckoApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add API key to requests if available
coingeckoApi.interceptors.request.use((config) => {
  if (COINGECKO_API_KEY) {
    config.headers['x-cg-demo-api-key'] = COINGECKO_API_KEY;
  }
  return config;
});

// API endpoint builders
export const endpoints = {
  // Market data
  markets: (params: {
    vsCurrency?: string;
    ids?: string;
    order?: string;
    perPage?: number;
    page?: number;
    sparkline?: boolean;
    priceChangePercentage?: string;
  }) => {
    const searchParams = new URLSearchParams();
    
    if (params.vsCurrency) searchParams.append('vs_currency', params.vsCurrency);
    if (params.ids) searchParams.append('ids', params.ids);
    if (params.order) searchParams.append('order', params.order);
    if (params.perPage) searchParams.append('per_page', params.perPage.toString());
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.sparkline !== undefined) searchParams.append('sparkline', params.sparkline.toString());
    if (params.priceChangePercentage) searchParams.append('price_change_percentage', params.priceChangePercentage);
    
    return `/coins/markets?${searchParams.toString()}`;
  },

  // Search coins
  search: (query: string) => `/search?query=${encodeURIComponent(query)}`,

  // Global market data
  global: () => '/global',

  // Coin details
  coin: (coinId: string, params?: {
    localization?: boolean;
    tickers?: boolean;
    marketData?: boolean;
    communityData?: boolean;
    developerData?: boolean;
    sparkline?: boolean;
  }) => {
    const searchParams = new URLSearchParams();
    
    if (params?.localization !== undefined) searchParams.append('localization', params.localization.toString());
    if (params?.tickers !== undefined) searchParams.append('tickers', params.tickers.toString());
    if (params?.marketData !== undefined) searchParams.append('market_data', params.marketData.toString());
    if (params?.communityData !== undefined) searchParams.append('community_data', params.communityData.toString());
    if (params?.developerData !== undefined) searchParams.append('developer_data', params.developerData.toString());
    if (params?.sparkline !== undefined) searchParams.append('sparkline', params.sparkline.toString());
    
    const query = searchParams.toString();
    return `/coins/${coinId}${query ? `?${query}` : ''}`;
  },

  // Market chart data
  marketChart: (coinId: string, params: {
    vsCurrency: string;
    days: number | string;
    interval?: string;
  }) => {
    const searchParams = new URLSearchParams();
    searchParams.append('vs_currency', params.vsCurrency);
    searchParams.append('days', params.days.toString());
    if (params.interval) searchParams.append('interval', params.interval);
    
    return `/coins/${coinId}/market_chart?${searchParams.toString()}`;
  },
};

// Helper functions for common API calls
export const apiHelpers = {
  // Get coin markets with common parameters
  getCoinMarkets: async (params: {
    vsCurrency?: string;
    ids?: string;
    page?: number;
    perPage?: number;
  }) => {
    const response = await coingeckoApi.get(endpoints.markets({
      vsCurrency: params.vsCurrency || 'usd',
      ids: params.ids,
      order: 'market_cap_desc',
      page: params.page || 1,
      perPage: params.perPage || 100,
      sparkline: true,
      priceChangePercentage: '1h,24h,7d',
    }));
    return response.data;
  },

  // Search for coins
  searchCoins: async (query: string) => {
    const response = await coingeckoApi.get(endpoints.search(query));
    return response.data;
  },

  // Get global market data
  getGlobalData: async () => {
    const response = await coingeckoApi.get(endpoints.global());
    return response.data;
  },

  // Get single coin data
  getCoinData: async (coinId: string) => {
    const response = await coingeckoApi.get(endpoints.coin(coinId, {
      localization: false,
      tickers: false,
      marketData: true,
      communityData: true,
      developerData: false,
      sparkline: true,
    }));
    return response.data;
  },

  // Get market chart data
  getMarketChart: async (coinId: string, vsCurrency: string, days: number | string) => {
    const response = await coingeckoApi.get(endpoints.marketChart(coinId, {
      vsCurrency,
      days,
    }));
    return response.data;
  },
};
