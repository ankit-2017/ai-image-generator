/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // images: {
  //   domains: ['random.dog', 'localhost'],
  // },
  env: {
    BASE_URL: 'http://localhost:3000/',
  },
};

module.exports = nextConfig;