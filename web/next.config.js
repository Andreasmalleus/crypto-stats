/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["s2.coinmarketcap.com", "assets.coingecko.com"],
  },
  env: {
    API_KEY: process.env.API_KEY,
  },
};
