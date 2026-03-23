const { getMetrics } = require('./src/metrics');

async function testMetrics() {
  try {
    console.log('🔍 Verificando métricas disponíveis...\n');
    
    const metrics = await getMetrics();
    const lines = metrics.split('\n');
    
    // Filtra as métricas específicas
    const targetMetrics = [
      'process_cpu_user_seconds_total',
      'process_resident_memory_bytes', 
      'http_requests_total'
    ];
    
    console.log('📊 Métricas encontradas:');
    targetMetrics.forEach(metric => {
      const found = lines.filter(line => line.startsWith(metric));
      if (found.length > 0) {
        console.log(`\n✅ ${metric}:`);
        found.forEach(line => console.log(`   ${line}`));
      } else {
        console.log(`\n❌ ${metric}: não encontrada`);
      }
    });
    
  } catch (error) {
    console.error('❌ Erro ao testar métricas:', error.message);
  }
}

testMetrics();
