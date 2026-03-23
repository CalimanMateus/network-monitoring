const client = require('prom-client');

// Configura o prefixo para todas as métricas
client.register.setDefaultLabels({
  app: 'network-monitoring'
});

// Habilita coleta de métricas padrão do Node.js
// Isso incluirá automaticamente:
// - process_cpu_user_seconds_total
// - process_resident_memory_bytes
// - nodejs_heap_size_used_bytes
// - nodejs_heap_size_total_bytes
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

// Métrica personalizada para contagem de requisições HTTP
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Número total de requisições HTTP recebidas',
  labelNames: ['method', 'route', 'status_code']
});

/**
 * Simula uma requisição HTTP e atualiza a métrica
 * @param {string} method - Método HTTP (GET, POST, etc)
 * @param {string} route - Rota da requisição
 * @param {number} statusCode - Código de status HTTP
 */
function simulateHttpRequest(method, route, statusCode) {
  const labels = { method, route, status_code: statusCode.toString() };
  httpRequestsTotal.inc(labels);
}

/**
 * Retorna todas as métricas em formato Prometheus
 * @returns {Promise<string>} - Métricas formatadas
 */
async function getMetrics() {
  return await client.register.metrics();
}

/**
 * Inicia a simulação de requisições HTTP para demonstração
 */
function startHttpRequestSimulation() {
  console.log('🌐 Iniciando simulação de requisições HTTP...');
  
  setInterval(() => {
    const methods = ['GET', 'POST', 'PUT', 'DELETE'];
    const routes = ['/api/health', '/api/metrics', '/api/alerts', '/api/status'];
    const statusCodes = [200, 201, 400, 404, 500];
    
    const method = methods[Math.floor(Math.random() * methods.length)];
    const route = routes[Math.floor(Math.random() * routes.length)];
    const statusCode = statusCodes[Math.floor(Math.random() * statusCodes.length)];
    
    simulateHttpRequest(method, route, statusCode);
  }, 2000); // Simula requisição a cada 2 segundos
}

/**
 * Cria um servidor Express simples para expor métricas
 * @param {number} port - Porta do servidor
 * @returns {import('express').Express} - App Express
 */
function createMetricsServer(port = 9090) {
  const express = require('express');
  const app = express();
  
  // Endpoint principal de métricas
  app.get('/metrics', async (req, res) => {
    try {
      const metrics = await getMetrics();
      res.set('Content-Type', client.register.contentType);
      res.end(metrics);
    } catch (error) {
      console.error('Erro ao servir métricas:', error);
      res.status(500).send('Erro ao coletar métricas');
    }
  });
  
  // Endpoint de health check
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });
  
  // Endpoint de informações
  app.get('/', (req, res) => {
    res.json({
      service: 'Network Monitoring Metrics',
      version: '1.0.0',
      metrics_available: [
        'process_cpu_user_seconds_total',
        'process_resident_memory_bytes',
        'http_requests_total'
      ],
      endpoints: {
        metrics: '/metrics',
        health: '/health',
        info: '/'
      }
    });
  });
  
  return app;
}

module.exports = {
  getMetrics,
  createMetricsServer,
  simulateHttpRequest,
  startHttpRequestSimulation,
  register: client.register
};
