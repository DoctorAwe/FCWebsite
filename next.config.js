module.exports = {
  reactStrictMode: true

};

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path*', // 匹配的路径
        destination: 'http://localhost:8080/:path*', // 实际的后端 API 地址
      },
    ];
  },
};
