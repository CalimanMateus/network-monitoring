# 🚀 Instalação do Stack de Monitoramento

## 📋 Pré-requisitos
- Docker e Docker Compose instalados
- Node.js backend rodando em localhost:3000
- Prometheus configurado e funcionando

## 🔧 Instalação dos Componentes

### 1️⃣ Node Exporter (Métricas do Host Sistema)

#### Via Docker Compose (Recomendado)
```yaml
# docker-compose-monitoring.yml
version: '3.8'

services:
  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    restart: unless-stopped
    ports:
      - "9100:9100"
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.rootfs=/rootfs'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'
      - '--collector.diskstats.ignore-devices=^(ram|loop|fd|(h|s|v)d[a-z]|nvme\\d+n\\d+p)\\d+$$'
```

#### Via Docker Direto
```bash
docker run -d \
  --name=node-exporter \
  --restart=unless-stopped \
  -p 9100:9100 \
  -v "/proc:/host/proc:ro" \
  -v "/sys:/host/sys:ro" \
  -v "/:/rootfs:ro" \
  prom/node-exporter:latest \
  --path.procfs=/host/proc \
  --path.rootfs=/rootfs \
  --path.sysfs=/host/sys \
  --collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)
```

### 2️⃣ cAdvisor (Métricas de Containers Docker)

#### Via Docker Compose (Recomendado)
```yaml
  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    container_name: cadvisor
    restart: unless-stopped
    ports:
      - "8080:8080"
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
      - /dev/disk/:/dev/disk:ro
    privileged: true
    devices:
      - /dev/kmsg
```

#### Via Docker Direto
```bash
docker run -d \
  --name=cadvisor \
  --restart=unless-stopped \
  -p 8080:8080 \
  -v "/:/rootfs:ro" \
  -v "/var/run:/var/run:ro" \
  -v "/sys:/sys:ro" \
  -v "/var/lib/docker/:/var/lib/docker:ro" \
  -v "/dev/disk/:/dev/disk:ro" \
  --privileged=true \
  --device=/dev/kmsg \
  gcr.io/cadvisor/cadvisor:latest
```

### 3️⃣ Docker Compose Completo

```yaml
# docker-compose-monitoring.yml
version: '3.8'

services:
  # Node Exporter - Métricas do Host
  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    restart: unless-stopped
    ports:
      - "9100:9100"
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.rootfs=/rootfs'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'
    networks:
      - monitoring

  # cAdvisor - Métricas de Containers Docker
  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    container_name: cadvisor
    restart: unless-stopped
    ports:
      - "8080:8080"
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
      - /dev/disk/:/dev/disk:ro
    privileged: true
    devices:
      - /dev/kmsg
    networks:
      - monitoring

networks:
  monitoring:
    driver: bridge
```

## 🚀 Comandos de Instalação

### Iniciar Serviços
```bash
# Baixar e iniciar todos os serviços
docker-compose -f docker-compose-monitoring.yml up -d

# Verificar status
docker-compose -f docker-compose-monitoring.yml ps

# Verificar logs
docker-compose -f docker-compose-monitoring.yml logs -f
```

### Parar Serviços
```bash
# Parar e remover containers
docker-compose -f docker-compose-monitoring.yml down

# Parar mantendo volumes
docker-compose -f docker-compose-monitoring.yml stop
```

## ✅ Verificação dos Endpoints

### Testar Conectividade
```bash
# Node Exporter
curl http://localhost:9100/metrics | head -10

# cAdvisor
curl http://localhost:8080/metrics | head -10

# Node.js Backend
curl http://localhost:3000/metrics | head -10

# Prometheus Targets
curl http://localhost:9090/api/v1/targets | jq '.data.activeTargets[] | {job: .labels.job, health: .health, lastError: .lastError}'
```

### Verificar Métricas Específicas
```bash
# CPU do Host
curl -s "http://localhost:9100/metrics" | grep "node_cpu_seconds_total"

# Memória do Host
curl -s "http://localhost:9100/metrics" | grep "node_memory_MemAvailable_bytes"

# Disco do Host
curl -s "http://localhost:9100/metrics" | grep "node_disk_bytes_"

# Rede do Host
curl -s "http://localhost:9100/metrics" | grep "node_network_"

# Containers Docker
curl -s "http://localhost:8080/metrics" | grep "container_memory_usage_bytes"
```

## 📊 Métricas Disponíveis

### Node Exporter (Host Sistema)
- **CPU**: `node_cpu_seconds_total{mode="user|system|idle|iowait|irq|softirq"}`
- **Memória**: `node_memory_MemAvailable_bytes`, `node_memory_MemTotal_bytes`
- **Disco**: `node_disk_bytes_read`, `node_disk_bytes_written`
- **Rede**: `node_network_receive_bytes_total`, `node_network_transmit_bytes_total`
- **Tempo**: `node_time_seconds`
- **Load**: `node_load1`, `node_load5`, `node_load15`
- **Filesystem**: `node_filesystem_size_bytes`, `node_filesystem_free_bytes`

### cAdvisor (Docker Containers)
- **Memória**: `container_memory_usage_bytes`, `container_memory_max_usage_bytes`
- **CPU**: `container_cpu_usage_seconds_total`, `container_cpu_cfs_throttled_seconds_total`
- **Rede**: `container_network_receive_bytes_total`, `container_network_transmit_bytes_total`
- **Filesystem**: `container_fs_usage_bytes`, `container_fs_reads_bytes_total`

### Node.js Backend
- **CPU**: `process_cpu_user_seconds_total`
- **Memória**: `process_resident_memory_bytes`, `process_heap_size_bytes`
- **HTTP**: `http_requests_total`, `http_request_duration_seconds`

## 🛠️ Troubleshooting

### Portas em Uso
```bash
# Verificar portas ocupadas
netstat -tulpn | grep -E ":9100|:8080"

# Liberar portas no Linux
sudo fuser -k 9100/tcp
sudo fuser -k 8080/tcp

# Liberar portas no Windows
netstat -ano | findstr :9100
taskkill /PID <PID> /F
```

### Permissões (Linux/Mac)
```bash
# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER

# Fazer logout e login novamente
newgrp docker
```

### Windows Specific
```powershell
# Verificar se Docker Desktop está rodando
docker version

# Verificar containers
docker ps -a

# Limpar se necessário
docker system prune -f
```

### Problemas Comuns

1. **Node Exporter não mostra métricas de disco**
   - Verifique se os volumes estão montados corretamente
   - Confirme se o filesystem não está em modo read-only

2. **cAdvisor não mostra containers**
   - Execute com `--privileged=true`
   - Verifique se `/var/lib/docker` está montado

3. **Prometheus não encontra targets**
   - Verifique se os serviços estão rodando nas portas corretas
   - Confirme se não há firewall bloqueando

## 🔄 Manutenção

### Atualizar Imagens
```bash
# Pull das imagens mais recentes
docker-compose -f docker-compose-monitoring.yml pull

# Recriar containers com novas imagens
docker-compose -f docker-compose-monitoring.yml up -d --force-recreate
```

### Backup de Configuração
```bash
# Exportar configuração atual
docker-compose -f docker-compose-monitoring.yml config > monitoring-backup.yml

# Backup de métricas (se necessário)
docker exec prometheus promtool tsdb dump /prometheus/data/ > metrics-backup.txt
```

### Monitoramento dos Serviços
```bash
# Script de verificação rápida
#!/bin/bash
echo "=== Node Exporter ==="
curl -s http://localhost:9100/metrics | wc -l

echo "=== cAdvisor ==="
curl -s http://localhost:8080/metrics | wc -l

echo "=== Prometheus Targets ==="
curl -s http://localhost:9090/api/v1/targets | jq '.data.activeTargets | length'
```

## 📚 Documentação Adicional

- [Node Exporter GitHub](https://github.com/prometheus/node_exporter)
- [cAdvisor GitHub](https://github.com/google/cadvisor)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Docker Compose Reference](https://docs.docker.com/compose/)
