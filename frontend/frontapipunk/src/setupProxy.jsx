const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // A rota que você deseja proxy (deve corresponder à rota da sua API no servidor Spring Boot)
    createProxyMiddleware({
      target: 'http://localhost:8080', // URL do servidor Spring Boot
      changeOrigin: true,
    })
  );
};
