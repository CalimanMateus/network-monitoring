# 🎨 Grafana Dashboard Setup 2026 - Complete

## 📋 Pré-requisitos
- Grafana instalado e rodando (http://localhost:3000)
- Prometheus configurado e funcionando (http://localhost:9090)
- Node Exporter rodando (http://localhost:9100)
- cAdvisor rodando (http://localhost:8080)
- Node.js backend rodando (http://localhost:3000)

## 🔧 Configuração do Data Source Prometheus

### 1. Acessar Grafana
```
URL: http://localhost:3000
Login: admin / admin (primeiro acesso)
```

### 2. Adicionar Data Source Prometheus
1. **Configuration** > **Data Sources**
2. **Add data source**
3. Selecionar **Prometheus**
4. Configurar:
   - **Name**: Prometheus
   - **URL**: http://localhost:9090
   - **Access**: Server (default)
   - **Scrape interval**: 15s
   - **HTTP Method**: GET
5. **Save & Test**

## 📊 Importar Dashboard Completo

### Método 1: Via Interface Grafana
1. **Dashboards** > **New Dashboard** > **Import dashboard**
2. **Upload JSON file**
3. Selecionar: `grafana/dashboard-complete-2026.json`
4. **Data Source**: Prometheus (selecionar o configurado)
5. **Import**

### Método 2: Via API
```bash
# Requer API key do Grafana
curl -X POST \
  http://admin:admin@localhost:3000/api/dashboards/db \
  -H 'Content-Type: application/json' \
  -d @grafana/dashboard-complete-2026.json
```

## 🎯 Painéis do Dashboard

### 📱 Node.js Application
1. **🔥 CPU Node.js** - `process_cpu_user_seconds_total`
   - CPU do processo Node.js em percentual
   - Thresholds: Verde (<70%), Amarelo (70-90%), Vermelho (>90%)

2. **💾 Memória Node.js** - `process_resident_memory_bytes`
   - Memória residente do processo em bytes
   - Thresholds: Verde (<512MB), Amarelo (512MB-1GB), Vermelho (>1GB)

3. **🌐 Requests Node.js** - `http_requests_total`
   - Requisições por segundo (rate)
   - Unidade: reqps

### 🖥️ Host Sistema
4. **🖥️ CPU Host** - `node_cpu_seconds_total`
   - CPU do sistema em percentual
   - Calculado: 100 - (idle * 100)
   - Thresholds: Verde (<70%), Amarelo (70-90%), Vermelho (>90%)

5. **🧠 Memória Host** - `node_memory_MemAvailable_bytes`
   - Memória disponível do sistema
   - Thresholds: Verde (>2GB), Amarelo (1-2GB), Vermelho (<1GB)

6. **⏰ Uptime Sistema** - `node_time_seconds`
   - Tempo de atividade do sistema
   - Unidade: dias/horas/minutos

### 🐳 Docker Containers
7. **🐳 Memória Containers Docker** - `container_memory_usage_bytes`
   - Uso de memória por container
   - Legend: nome do container

### 💾 Sistema (Disco e Rede)
8. **💾 I/O Disco** - `node_disk_bytes_read`, `node_disk_bytes_written`
   - Taxa de leitura/escrita do disco
   - Unidade: Bps (bytes por segundo)
   - Duas séries: Leitura e Escrita

9. **🌐 Tráfego Rede** - `node_network_receive_bytes_total`, `node_network_transmit_bytes_total`
   - Tráfego de rede do host
   - Unidade: Bps
   - Duas séries: Recebido e Transmitido

## 🎨 Configurações Visuais

### Layout do Dashboard
- **Grid**: 24x12 (largura x altura)
- **Auto-refresh**: 5 segundos
- **Time range**: Última 1 hora (ajustável)
- **Tooltip**: Crosshair compartilhado
- **Theme**: Dark mode

### Cores e Thresholds
- **Verde**: Operação normal
- **Amarelo**: Atenção (warning)
- **Vermelho**: Crítico (alert)

### Unidades Automáticas
- **CPU/Memória**: Percentual ou bytes
- **Rede/Disco**: Bps (bytes por segundo)
- **Requests**: reqps (requisições por segundo)
- **Tempo**: dtdurations (dias/horas/minutos)

## 🔍 Verificação das Métricas

### Testar Queries Manualmente
```bash
# Node.js Metrics
curl -s "http://localhost:9090/api/v1/query?query=process_cpu_user_seconds_total"

# Host Metrics
curl -s "http://localhost:9090/api/v1/query?query=node_cpu_seconds_total"
curl -s "http://localhost:9090/api/v1/query?query=node_memory_MemAvailable_bytes"
curl -s "http://localhost:9090/api/v1/query?query=node_disk_bytes_read"
curl -s "http://localhost:9090/api/v1/query?query=node_network_receive_bytes_total"

# Docker Metrics
curl -s "http://localhost:9090/api/v1/query?query=container_memory_usage_bytes"
```

### Verificar no Prometheus UI
1. Acesse: http://localhost:9090
2. **Status** > **Targets**
3. Confirme todos os targets como "UP":
   - prometheus (localhost:9090)
   - node-backend (localhost:3000)
   - node-exporter (localhost:9100)
   - docker (localhost:8080)

## 🚨 Alertas (Placeholders)

### Configuração Visual
- Thresholds configurados em painéis relevantes
- Cores indicam status: verde (normal), amarelo (atenção), vermelho (crítico)
- Sem integração com Telegram ou outros sistemas

### Exemplo de Threshold
```json
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

## 📱 Responsividade

O dashboard é totalmente responsivo:
- **Desktop**: 1920x1080+ (layout completo)
- **Tablet**: 768x1024 (adaptado)
- **Mobile**: 375x667 (simplificado)

## 🛠️ Customização

### Adicionar Novos Painéis
1. **Edit dashboard**
2. **Add panel**
3. **Select visualization** (Time series, Stat, etc.)
4. **Configure Prometheus query**
5. **Set thresholds e cores**
6. **Save dashboard**

### Modificar Queries
- **CPU**: `rate(process_cpu_user_seconds_total[5m]) * 100`
- **Memória**: `process_resident_memory_bytes`
- **Disco**: `rate(node_disk_bytes_read[5m])`
- **Rede**: `rate(node_network_receive_bytes_total[5m])`

### Ajustar Time Range
- **Padrão**: Última 1 hora
- **Opções**: 5m, 15m, 30m, 1h, 3h, 6h, 12h, 24h
- **Custom**: Range específico

## 🔗 Links Úteis

### Documentação
- [Grafana Docs](https://grafana.com/docs/)
- [Prometheus Querying](https://prometheus.io/docs/prometheus/latest/querying/)
- [Node Exporter Metrics](https://github.com/prometheus/node_exporter)
- [cAdvisor Metrics](https://github.com/google/cadvisor)

### Query Examples
```promql
# CPU alta (>80%)
100 - (avg by (instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80

# Memória baixa (<1GB)
node_memory_MemAvailable_bytes < 1073741824

# Disco com alta atividade
rate(node_disk_bytes_total[5m]) > 1048576  # >1MB/s

# Rede com tráfego alto
rate(node_network_receive_bytes_total[5m]) > 10485760  # >10MB/s
```

## 📈 Performance Tips

### Otimização do Dashboard
1. **Rate queries**: Use `rate()` para contadores
2. **Time ranges**: Evite ranges muito longos
3. **Refresh rate**: 5s é bom para real-time
4. **Panel limits**: Máximo 10-15 painéis por dashboard

### Melhorar Performance
```yaml
# No prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

# Reduzir retenção se necessário
storage:
  tsdb:
    retention.time: 15d
```

## 🔄 Manutenção

### Backup do Dashboard
```bash
# Export dashboard via API
curl -s http://admin:admin@localhost:3000/api/dashboards/uid/network-monitoring-complete-2026 > dashboard-backup.json

# Via interface: Dashboard > Share > Export > Save to JSON file
```

### Version Control
- Salvar JSON no Git
- Mudanças versionadas
- Rollback fácil

### Updates
- Testar em ambiente dev antes de prod
- Verificar compatibilidade de métricas
- Documentar mudanças

---

## ✅ Checklist Final

- [ ] Prometheus rodando e coletando métricas
- [ ] Node Exporter funcionando (porta 9100)
- [ ] cAdvisor funcionando (porta 8080)
- [ ] Node.js backend com métricas (porta 3000)
- [ ] Grafana configurado com data source Prometheus
- [ ] Dashboard importado e funcionando
- [ ] Todos os painéis mostrando dados
- [ ] Thresholds visuais configurados
- [ ] Auto-refresh funcionando (5s)

**Dashboard completo pronto para uso!** 🎯
