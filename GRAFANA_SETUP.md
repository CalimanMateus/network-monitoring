# 🎨 Grafana Dashboard Setup 2026

## 📋 Pré-requisitos
- Grafana instalado e rodando
- Prometheus configurado e funcionando
- Node Exporter e cAdvisor rodando

## 🔧 Configuração do Data Source Prometheus

### 1. Acessar Grafana
```
http://localhost:3000 (default)
Login: admin / admin
```

### 2. Adicionar Data Source Prometheus
1. Vá para **Configuration** > **Data Sources**
2. Clique em **Add data source**
3. Selecione **Prometheus**
4. Configure:
   - **Name**: Prometheus
   - **URL**: http://localhost:9090
   - **Access**: Server (default)
   - **Scrape interval**: 15s
5. Clique em **Save & Test**

## 📊 Importar Dashboard

### Método 1: Via Interface Grafana
1. Vá para **Dashboards** > **New Dashboard**
2. Clique em **Import dashboard**
3. Upload do arquivo JSON:
   - Clique em **Upload JSON file**
   - Selecione: `grafana/dashboard-network-monitoring.json`
4. Selecione o Data Source Prometheus
5. Clique em **Import**

### Método 2: Via API
```bash
# Import via curl (requer API key)
curl -X POST \
  http://admin:admin@localhost:3000/api/dashboards/db \
  -H 'Content-Type: application/json' \
  -d @grafana/dashboard-network-monitoring.json
```

## 🎯 Dashboard Features

### Painéis Incluídos
1. **🔥 CPU Node.js** - `process_cpu_user_seconds_total`
2. **💾 Memória Node.js** - `process_resident_memory_bytes`
3. **🌐 Requests Node.js** - `http_requests_total`
4. **🖥️ CPU Host** - `node_cpu_seconds_total`
5. **🧠 Memória Host** - `node_memory_MemAvailable_bytes`
6. **🟢 Status dos Serviços** - `up`
7. **🐳 Memória Containers Docker** - `container_memory_usage_bytes`

### Características
- **Auto-refresh**: 5 segundos
- **Time range**: Última 1 hora
- **Layout**: Grid responsivo 24x12
- **Cores**: Verde (normal), Vermelho (crítico)
- **Tooltips**: Crosshair compartilhado
- **Legendas**: Bottom placement

## 🚀 Verificação

### Confirmar Métricas
1. Verifique se todos os painéis mostram dados
2. Confirme que não há erros de query
3. Teste os time ranges diferentes

### Troubleshooting
```bash
# Verificar se Prometheus está recebendo métricas
curl http://localhost:9090/api/v1/query?query=up

# Verificar targets específicos
curl http://localhost:9090/api/v1/query?query=up{job="node-backend"}

# Testar métricas específicas
curl http://localhost:9090/api/v1/query?query=process_cpu_user_seconds_total
```

## 🎨 Customização

### Cores e Temas
- **Dark mode**: Configurado por padrão
- **Thresholds**: Verde (0-80%), Vermelho (>80%)
- **Units**: Auto-detected (bytes, percent, reqps)

### Adicionar Novos Painéis
1. Edit dashboard
2. Add panel
3. Select visualization
4. Configure Prometheus query
5. Save dashboard

### Alertas (Visual Only)
```json
// Exemplo de threshold configuration (placeholder)
{
  "thresholds": {
    "mode": "absolute",
    "steps": [
      {"color": "green", "value": null},
      {"color": "yellow", "value": 70},
      {"color": "red", "value": 90}
    ]
  }
}
```

## 📱 Mobile Responsivo
O dashboard é totalmente responsivo e funciona em:
- Desktop (1920x1080+)
- Tablet (768x1024)
- Mobile (375x667)

## 🔗 Links Úteis
- [Grafana Documentation](https://grafana.com/docs/)
- [Prometheus Querying](https://prometheus.io/docs/prometheus/latest/querying/)
- [Node Exporter Metrics](https://github.com/prometheus/node_exporter)
- [cAdvisor Metrics](https://github.com/google/cadvisor)

## 📈 Performance Tips
1. **Rate queries**: Use `rate()` para counters
2. **Time ranges**: Evite ranges muito longos
3. **Refresh rate**: 5s é bom para real-time
4. **Dashboard limits**: Máximo 20 painéis por dashboard

## 🛠️ Manutenção
- **Backup**: Export dashboard regularmente
- **Version control**: Salvar JSON no git
- **Updates**: Testar em ambiente dev antes de prod
- **Monitoring**: Monitorar o próprio Grafana
