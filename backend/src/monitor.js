const { sendAlert } = require('./alerts');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

/**
 * Verifica se o container zabbix-server está rodando
 * @returns {Promise<boolean>} - true se está rodando, false se está parado
 */
async function checkZabbixContainer() {
  try {
    const { stdout } = await execPromise('docker ps --filter "name=zabbix-server" --format "{{.Names}}"');
    return stdout.includes('zabbix-server');
  } catch (error) {
    console.log('Erro ao verificar container Zabbix:', error.message);
    return false;
  }
}

/**
 * Verifica o uso de CPU do sistema
 * @returns {Promise<number>} - percentual de CPU
 */
async function checkCpuUsage() {
  try {
    const { stdout } = await execPromise('wmic cpu get loadpercentage /value');
    const match = stdout.match(/LoadPercentage=(\d+)/);
    return match ? parseInt(match[1]) : 0;
  } catch (error) {
    console.log('Erro ao verificar CPU:', error.message);
    return 0;
  }
}

/**
 * Verifica o uso de memória do sistema
 * @returns {Promise<number>} - percentual de memória
 */
async function checkMemoryUsage() {
  try {
    const { stdout } = await execPromise('wmic OS get TotalVisibleMemorySize,FreePhysicalMemory /value');
    const totalMatch = stdout.match(/TotalVisibleMemorySize=(\d+)/);
    const freeMatch = stdout.match(/FreePhysicalMemory=(\d+)/);
    
    if (totalMatch && freeMatch) {
      const total = parseInt(totalMatch[1]);
      const free = parseInt(freeMatch[1]);
      return Math.round(((total - free) / total) * 100);
    }
    return 0;
  } catch (error) {
    console.log('Erro ao verificar memória:', error.message);
    return 0;
  }
}

/**
 * Verificação real do sistema
 * @returns {Promise<void>}
 */
async function checkSystemFailures() {
  console.log('🔍 Iniciando verificação do sistema...');
  
  const failures = [];
  
  // Verifica Zabbix agent
  const zabbixRunning = await checkZabbixContainer();
  if (!zabbixRunning) {
    failures.push("Zabbix agent is not available");
  }
  
  // Verifica CPU
  const cpuUsage = await checkCpuUsage();
  if (cpuUsage > 80) {
    failures.push(`CPU acima de 80% (atual: ${cpuUsage}%)`);
  }
  
  // Verifica Memória
  const memoryUsage = await checkMemoryUsage();
  if (memoryUsage > 90) {
    failures.push(`Memória acima de 90% (atual: ${memoryUsage}%)`);
  }
  
  if (failures.length > 0) {
    console.log(`⚠️  Falhas detectadas: ${failures.length}`);
    
    for (const failure of failures) {
      console.log(`  - ${failure}`);
      
      // Prepara mensagem de alerta
      const alertMessage = `🚨 <b>ALERTA DE SISTEMA</b>\n\n` +
        `<b>Problema detectado:</b> ${failure}\n` +
        `<b>Data/Hora:</b> ${new Date().toLocaleString('pt-BR')}\n` +
        `<b>Status:</b> Requer atenção imediata`;
      
      // Envia alerta para o Telegram
      const success = await sendAlert(alertMessage);
      
      if (success) {
        console.log('✅ Alerta enviado com sucesso para o Telegram');
      } else {
        console.log('❌ Falha ao enviar alerta para o Telegram');
      }
    }
  } else {
    console.log('✅ Sistema funcionando normalmente - nenhuma falha detectada');
  }
}

/**
 * Inicia o monitoramento contínuo
 * @param {number} interval - Intervalo em segundos entre verificações
 */
function startMonitoring(interval = 30) {
  console.log(`🚀 Monitoramento iniciado - verificando a cada ${interval} segundos`);
  
  // Executa verificação imediata
  checkSystemFailures();
  
  // Configura verificação periódica
  setInterval(checkSystemFailures, interval * 1000);
}

// Se executado diretamente, inicia o monitoramento
if (require.main === module) {
  startMonitoring(10); // Verifica a cada 10 segundos para teste
}

module.exports = {
  checkSystemFailures,
  startMonitoring
};
