const axios = require('axios');

const BOT_TOKEN = '8677925355:AAHWjg3-FQnV9FvIVLlC7zi9Kt0mgJlgejw';

async function getChatId() {
  try {
    const response = await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`);
    
    if (response.data.ok && response.data.result.length > 0) {
      const chatId = response.data.result[0].message.chat.id;
      console.log(`Seu Chat ID é: ${chatId}`);
      console.log('Adicione este valor ao arquivo .env ou à variável de ambiente CHAT_ID');
    } else {
      console.log('Nenhuma mensagem encontrada. Envie uma mensagem para @AlertaApiTesteBot primeiro.');
    }
  } catch (error) {
    console.error('Erro ao obter Chat ID:', error.message);
  }
}

getChatId();
