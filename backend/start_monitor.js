const { startMonitoring } = require('./src/monitor');

console.log('🚀 INICIANDO SISTEMA DE MONITORAMENTO');
console.log('Pressione Ctrl+C para parar\n');

// Inicia monitoramento a cada 15 segundos
startMonitoring(15);
