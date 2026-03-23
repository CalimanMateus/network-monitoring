require('dotenv').config();
const axios = require('axios');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'COLOQUE SEU TOKEN AQUI (BOT TELEGRAM)';
const CHAT_ID = process.env.CHAT_ID || 'COLOQUE ID DO CHAT AQUI DO TELEGRAM';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

/**
 * Envia uma mensagem de alerta para o Telegram Bot
 * @param {string} message - Mensagem a ser enviada
 * @returns {Promise<boolean>} - true se enviado com sucesso, false caso contrário
 */
async function sendAlert(message) {
  try {
    const response = await axios.post(TELEGRAM_API_URL, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    });

    if (response.data.ok) {
      console.log('✅ Alerta enviado com sucesso para o Telegram');
      return true;
    } else {
      console.error('❌ Erro ao enviar alerta:', response.data.description);
      return false;
    }
  } catch (error) {
    console.error('❌ Erro ao enviar alerta para o Telegram:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Detalhes do erro:', error.response.data);
    }
    return false;
  }
}

module.exports = {
  sendAlert
};
