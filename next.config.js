module.exports = {
  reactStrictMode: true
};

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path*', // 匹配的路径
        destination: 'http://10.21.2.88/:path*', // 实际的后端 API 地址
      },
    ];
  },
};
