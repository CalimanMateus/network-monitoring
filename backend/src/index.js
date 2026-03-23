const express = require('express');
const { checkSystemFailures } = require('./monitor');
const { getMetrics } = require('./metrics');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Verificar sistema
app.post('/check', async (req, res) => {
  try {
    await checkSystemFailures();
    res.json({ message: 'Verificação concluída' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Métricas
app.get('/metrics', async (req, res) => {
  try {
    const metrics = await getMetrics();
    res.set('Content-Type', 'text/plain');
    res.send(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
