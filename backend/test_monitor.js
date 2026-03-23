const { checkSystemFailures } = require('./src/monitor');

async function testMonitoring() {
  console.log('=== TESTE DO SISTEMA DE MONITORAMENTO ===\n');
  
  // Executa 3 verificações para demonstrar diferentes cenários
  for (let i = 1; i <= 3; i++) {
    console.log(`\n--- Verificação ${i}/3 ---`);
    await checkSystemFailures();
    
    // Espera 2 segundos entre verificações
    if (i < 3) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('\n=== TESTE CONCLUÍDO ===');
}

testMonitoring();
