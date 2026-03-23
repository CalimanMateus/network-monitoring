const { createMetricsServer, startHttpRequestSimulation } = require('./src/metrics');

const PORT = process.env.METRICS_PORT || 9090;

async function main() {
  try {
    console.log('🚀 Iniciando servidor de métricas...');
    
    // Inicia simulação de requisições HTTP
    startHttpRequestSimulation();
    
    // Cria e inicia o servidor
    const app = createMetricsServer(PORT);
    
    app.listen(PORT, () => {
      console.log(`📊 Servidor de métricas rodando na porta ${PORT}`);
      console.log(`🔗 Métricas disponíveis em: http://localhost:${PORT}/metrics`);
      console.log(`💚 Health check em: http://localhost:${PORT}/health`);
      console.log(`📡 Prometheus pode raspar: http://localhost:${PORT}/metrics`);
      console.log('\n📈 Métricas disponíveis:');
      console.log('  - process_cpu_user_seconds_total');
      console.log('  - process_resident_memory_bytes');
      console.log('  - http_requests_total');
      console.log('\n🌐 Requisições HTTP simuladas a cada 2 segundos para demonstração');
      console.log('Pressione Ctrl+C para parar o servidor');
    });
    
    // Tratamento de sinais para encerramento gracioso
    process.on('SIGINT', () => {
      console.log('\n🛑 Encerrando servidor de métricas...');
      process.exit(0);
    });
    
    process.on('SIGTERM', () => {
      console.log('\n🛑 Encerrando servidor de métricas...');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

main();
