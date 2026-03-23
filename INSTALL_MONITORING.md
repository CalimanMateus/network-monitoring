# 🚀 Instalação do Stack de Monitoramento

## 📋 Pré-requisitos
- Docker e Docker Compose instalados
- Node.js backend rodando em localhost:3000
- Prometheus configurado

## 🔧 Instalação dos Componentes

### 1. Node Exporter (Métricas do Host)
```bash
# Via Docker Compose (recomendado)
docker-compose -f docker-compose-monitoring.yml up -d node-exporter

# Ou via Docker direto
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

### 2. cAdvisor (Métricas de Containers Docker)
```bash
# Via Docker Compose (recomendado)
docker-compose -f docker-compose-monitoring.yml up -d cadvisor

# Ou via Docker direto
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

### 3. Iniciar Tudo Junto
```bash
# Iniciar ambos os serviços
docker-compose -f docker-compose-monitoring.yml up -d

# Verificar status
docker-compose -f docker-compose-monitoring.yml ps

# Verificar logs
docker-compose -f docker-compose-monitoring.yml logs -f
```

## ✅ Verificação

### Testar Endpoints
```bash
# Node Exporter
curl http://localhost:9100/metrics

# cAdvisor
curl http://localhost:8080/metrics

# Node.js Backend
curl http://localhost:3000/metrics
```

### Verificar no Prometheus
1. Acesse: http://localhost:9090
2. Vá para "Status" > "Targets"
3. Confirme que todos os targets estão "UP"

## 📊 Métricas Disponíveis

### Node Exporter (Host)
- `node_cpu_seconds_total` - CPU total por segundo
- `node_memory_MemAvailable_bytes` - Memória disponível
- `node_filesystem_size_bytes` - Tamanho do filesystem
- `node_network_receive_bytes_total` - Bytes recebidos na rede
- `node_load1` - Load average de 1 minuto

### cAdvisor (Containers)
- `container_memory_usage_bytes` - Uso de memória por container
- `container_cpu_usage_seconds_total` - CPU usada por container
- `container_network_receive_bytes_total` - Rede recebida por container
- `container_fs_usage_bytes` - Filesystem usage por container

### Node.js Backend
- `process_cpu_user_seconds_total` - CPU do processo Node.js
- `process_resident_memory_bytes` - Memória residente do processo
- `http_requests_total` - Total de requisições HTTP

## 🛠️ Solução de Problemas

### Portas em Uso
```bash
# Verificar portas
netstat -tulpn | grep :9100
netstat -tulpn | grep :8080

# Matar processos
sudo fuser -k 9100/tcp
sudo fuser -k 8080/tcp
```

### Permissões (Linux/Mac)
```bash
# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER

# Logout e login novamente
```

### Windows
- Execute Docker Desktop como Administrador
- Verifique se o Docker Daemon está rodando

## 🔄 Manutenção

### Atualizar Imagens
```bash
docker-compose -f docker-compose-monitoring.yml pull
docker-compose -f docker-compose-monitoring.yml up -d
```

### Backup de Configuração
```bash
# Salvar configuração atual
docker-compose -f docker-compose-monitoring.yml config > monitoring-backup.yml
```
