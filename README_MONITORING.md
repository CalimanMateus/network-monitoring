# 🚀 Network Monitoring Stack 2026

Monitoramento completo com Prometheus, Grafana, Node.js, Host e Docker.

## ⚡ Quick Start

### 1. Iniciar Stack de Monitoramento
```bash
# Node Exporter + cAdvisor
docker-compose -f docker-compose-monitoring.yml up -d

# Verificar status
docker-compose -f docker-compose-monitoring.yml ps
```

### 2. Verificar Endpoints
```bash
# Prometheus Targets
curl http://localhost:9090/api/v1/targets

# Node Exporter
curl http://localhost:9100/metrics | head -5

# cAdvisor  
curl http://localhost:8080/metrics | head -5

# Node.js Backend
curl http://localhost:3000/metrics | head -5
```

### 3. Importar Dashboard Grafana
1. Acessar: http://localhost:3000
2. Import: `grafana/dashboard-network-monitoring.json`
3. Data Source: Prometheus (http://localhost:9090)

## 📊 Arquivos Gerados

### 🎛️ Prometheus Config
- **File**: `prometheus/prometheus.yml`
- **Jobs**: node-backend, node-exporter, docker, prometheus
- **Interval**: 15s

### 🐳 Docker Services
- **File**: `docker-compose-monitoring.yml`
- **Services**: node-exporter (9100), cadvisor (8080)
- **Network**: monitoring bridge

### 🎨 Grafana Dashboard
- **File**: `grafana/dashboard-network-monitoring.json`
- **Panels**: 7 painéis completos
- **Refresh**: 5s auto

## 🔗 URLs de Acesso

| Serviço | URL | Port |
|---------|-----|------|
| Prometheus | http://localhost:9090 | 9090 |
| Grafana | http://localhost:3000 | 3000 |
| Node Exporter | http://localhost:9100 | 9100 |
| cAdvisor | http://localhost:8080 | 8080 |
| Node.js Backend | http://localhost:3000/metrics | 3000 |

## 📈 Métricas Disponíveis

### Node.js Backend
- `process_cpu_user_seconds_total` - CPU do processo
- `process_resident_memory_bytes` - Memória residente
- `http_requests_total` - Requisições HTTP

### Host Sistema (Node Exporter)
- `node_cpu_seconds_total` - CPU total
- `node_memory_MemAvailable_bytes` - Memória disponível
- `node_filesystem_size_bytes` - Disco
- `node_network_receive_bytes_total` - Rede

### Docker Containers (cAdvisor)
- `container_memory_usage_bytes` - Memória por container
- `container_cpu_usage_seconds_total` - CPU por container
- `container_network_receive_bytes_total` - Rede por container

## 🎯 Dashboard Panels

1. **🔥 CPU Node.js** - Uso de CPU do processo
2. **💾 Memória Node.js** - Memória do processo
3. **🌐 Requests Node.js** - Requisições por segundo
4. **🖥️ CPU Host** - CPU do sistema
5. **🧠 Memória Host** - Memória disponível
6. **🟢 Status Serviços** - Health check
7. **🐳 Memória Docker** - Uso por container

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
2. Confirme as portas não estão em uso
3. Verifique firewall/rede

### Grafana No Data?
1. Confirme data source Prometheus está conectado
2. Verifique se as métricas existem
3. Teste queries manualmente

## 📚 Documentação Completa

- **Instalação**: `INSTALL_MONITORING.md`
- **Grafana Setup**: `GRAFANA_SETUP.md`
- **Prometheus**: `prometheus/prometheus.yml`

## 🚀 Próximos Passos

1. **Alertas**: Configurar alertas no Grafana
2. **Dashboards**: Criar dashboards específicos
3. **Exporters**: Adicionar mais exporters
4. **Retention**: Configurar retenção de dados

---

**Stack Completo** ✅ Prometheus + Grafana + Node.js + Host + Docker
