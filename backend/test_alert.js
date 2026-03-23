const { sendAlert } = require('./src/alerts');

async function testAlert() {
  console.log('Enviando mensagem de teste...');
  const success = await sendAlert('🚀 <b>Teste do Sistema de Alerta</b>\n\n✅ Sistema funcionando perfeitamente!\n📅 Data: ' + new Date().toLocaleString('pt-BR'));
  
  if (success) {
    console.log('Teste concluído com sucesso!');
  } else {
    console.log('Falha no teste. Verifique o console para detalhes.');
  }
}

testAlert();
