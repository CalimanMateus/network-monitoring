const axios = require('axios');

const ZABBIX_API_URL = 'http://localhost:8080/api_jsonrpc.php';
const ZABBIX_USER = 'Admin';
const ZABBIX_PASSWORD = 'zabbix';

async function login() {
  try {
    const response = await axios.post(ZABBIX_API_URL, {
      jsonrpc: '2.0',
      method: 'user.login',
      params: {
        user: ZABBIX_USER,
        password: ZABBIX_PASSWORD
      },
      id: 1,
      auth: null
    });
    return response.data.result;
  } catch (error) {
    console.error('Erro no login Zabbix:', error.message);
    return null;
  }
}

async function getProblems() {
  const auth = await login();
  if (!auth) return [];

  try {
    const response = await axios.post(ZABBIX_API_URL, {
      jsonrpc: '2.0',
      method: 'problem.get',
      params: {
        output: 'extend',
        recent: 'true'
      },
      auth: auth,
      id: 2
    });

    return response.data.result.map(p => ({
      name: p.name,
      severity: p.severity,
      clock: p.clock
    }));
  } catch (error) {
    console.error('Erro ao buscar problemas:', error.message);
    return [];
  }
}

module.exports = { getProblems };
