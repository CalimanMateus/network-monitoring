# 🚀 Network Monitoring Stack 2026 - Complete

Monitoramento completo com Prometheus, Grafana, Node.js, Host, Docker, Disco e Rede.

## ⚡ Quick Start

### 1️⃣ Iniciar Stack de Monitoramento
```bash
# Node Exporter + cAdvisor
docker-compose -f docker-compose-monitoring.yml up -d

# Verificar status
docker-compose -f docker-compose-monitoring.yml ps
```

### 2️⃣ Verificar Endpoints
```bash
# Prometheus Targets
curl http://localhost:9090/api/v1/targets

# Node Exporter (Host Metrics)
curl http://localhost:9100/metrics | grep "node_"

# cAdvisor (Docker Metrics)
curl http://localhost:8080/metrics | grep "container_"

# Node.js Backend
curl http://localhost:3000/metrics | grep "process_"
```

### 3️⃣ Importar Dashboard Grafana
1. Acessar: http://localhost:3000
2. Import: `grafana/dashboard-complete-2026.json`
3. Data Source: Prometheus (http://localhost:9090)

## 📊 Arquivos Gerados

### 🎛️ Prometheus Config
- **File**: `prometheus/prometheus.yml`
- **Jobs**: node-backend, node-exporter, docker, prometheus
- **Interval**: 15s
- **Métricas específicas documentadas**

### 🐳 Docker Services
- **File**: `docker-compose-monitoring.yml`
- **Services**: node-exporter (9100), cadvisor (8080)
- **Network**: monitoring bridge

### 🎨 Grafana Dashboard
- **File**: `grafana/dashboard-complete-2026.json`
- **Panels**: 9 painéis completos
- **Refresh**: 5s auto
- **Layout**: 24x12 grid responsivo

## 🔗 URLs de Acesso

| Serviço | URL | Port | Métricas |
|---------|-----|------|----------|
| Prometheus | http://localhost:9090 | 9090 | All metrics |
| Grafana | http://localhost:3000 | 3000 | Dashboard |
| Node Exporter | http://localhost:9100 | 9100 | Host metrics |
| cAdvisor | http://localhost:8080 | 8080 | Docker metrics |
| Node.js Backend | http://localhost:3000/metrics | 3000 | App metrics |

## 📈 Métricas Disponíveis

### 🟢 Node.js Backend
- `process_cpu_user_seconds_total` - CPU do processo
- `process_resident_memory_bytes` - Memória residente
- `http_requests_total` - Requisições HTTP

### 🔵 Host Sistema (Node Exporter)
- `node_cpu_seconds_total` - CPU total
- `node_memory_MemAvailable_bytes` - Memória disponível
- `node_memory_MemTotal_bytes` - Memória total
- `node_disk_bytes_read` - Leitura do disco
- `node_disk_bytes_written` - Escrita no disco
- `node_network_receive_bytes_total` - Rede recebida
- `node_network_transmit_bytes_total` - Rede transmitida
- `node_time_seconds` - Timestamp do sistema

### 🟡 Docker Containers (cAdvisor)
- `container_memory_usage_bytes` - Memória por container
- `container_cpu_usage_seconds_total` - CPU por container
- `container_network_receive_bytes_total` - Rede por container

## 🎯 Dashboard Panels (9 Painéis)

### 📱 Node.js Application
1. **🔥 CPU Node.js** - CPU do processo
2. **💾 Memória Node.js** - Memória do processo
3. **🌐 Requests Node.js** - Requisições por segundo

### 🖥️ Host Sistema
4. **🖥️ CPU Host** - CPU do sistema
5. **🧠 Memória Host** - Memória disponível
6. **⏰ Uptime Sistema** - Tempo de atividade

### 🐳 Docker Containers
7. **🐳 Memória Containers Docker** - Uso por container

### 💾 Sistema (Disco e Rede)
8. **💾 I/O Disco** - Leitura/escrita do disco
9. **🌐 Tráfego Rede** - Tráfego de rede

## 🎨 Features do Dashboard

- **Auto-refresh**: 5 segundos
- **Time range**: Última 1 hora (ajustável)
- **Layout**: Grid responsivo 24x12
- **Cores**: Verde (normal), Amarelo (atenção), Vermelho (crítico)
- **Tooltips**: Crosshair compartilhado
- **Units**: Automáticas (bytes, percent, reqps, Bps)
- **Mobile**: Totalmente responsivo

## 🔧 Troubleshooting

### Services Down?
```bash
# Verificar containers
docker ps -a

# Reiniciar stack
docker-compose -f docker-compose-monitoring.yml restart

# Verificar logs
docker-compose -f docker-compose-monitoring.yml logs -f
```

### Prometheus Targets Down?
1. Verifique se os serviços estão rodando
2. Confirme as portas (9100, 8080, 3000, 9090)
3. Verifique firewall/rede

### Grafana No Data?
1. Confirme data source Prometheus conectado
2. Verifique se as métricas existem
3. Teste queries manualmente no Prometheus

## 📚 Documentação Completa

- **Instalação**: `INSTALL_MONITORING_STACK.md`
- **Grafana Setup**: `GRAFANA_DASHBOARD_SETUP.md`
- **Prometheus**: `prometheus/prometheus.yml`

## 🚀 Próximos Passos

1. **✅ Monitoramento Básico**: Já configurado
2. **📈 Alertas**: Configurar alertas no Grafana (placeholders prontos)
3. **📊 Dashboards**: Criar dashboards específicos
4. **🔍 Exporters**: Adicionar mais exporters
5. **💾 Retenção**: Configurar retenção de dados

## 🎯 Verificação Final

```bash
# Verificar todos os serviços
curl -s http://localhost:9090/api/v1/targets | jq '.data.activeTargets[] | {job: .labels.job, health: .health}'

# Verificar métricas específicas
curl -s "http://localhost:9090/api/v1/query?query=up" | jq '.data.result[] | {metric: .metric, value: .value[1]}'

# Verificar dashboard
# Acessar: http://localhost:3000/dashboard/uid/network-monitoring-complete-2026
```

---

## 🎉 Stack Completo Funcionando!

✅ **Prometheus** - Coletando métricas de 4 fontes  
✅ **Node Exporter** - Métricas do host (CPU, memória, disco, rede)  
✅ **cAdvisor** - Métricas de containers Docker  
✅ **Node.js Backend** - Métricas da aplicação  
✅ **Grafana Dashboard** - 9 painéis profissionais  
✅ **Auto-refresh** - 5 segundos  
✅ **Thresholds visuais** - Cores por status  
✅ **Mobile responsivo** - Funciona em qualquer dispositivo  

**Monitoramento completo 2026 pronto para uso!** 🚀
