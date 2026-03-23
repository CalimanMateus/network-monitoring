🧠 Network Monitoring — Monitoramento de Rede Local

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Telegram Bot](https://img.shields.io/badge/Telegram-Bot-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)
![API](https://img.shields.io/badge/API-Integration-6c757d?style=for-the-badge)
![Monitoring](https://img.shields.io/badge/Monitoring-Real%20Time-success?style=for-the-badge)
![Alerts](https://img.shields.io/badge/Alerts-Telegram-blue?style=for-the-badge)
![Observability](https://img.shields.io/badge/Observability-Full-orange?style=for-the-badge)

Um sistema completo para monitoramento de rede local em tempo real, desenvolvido com foco em diagnóstico, performance e visibilidade de dispositivos conectados.

📌 Visão Geral

Este projeto tem como objetivo fornecer uma ferramenta leve e eficiente para:

Monitorar dispositivos na rede local
Detectar instabilidades (queda, latência, perda de pacote)
Acompanhar uso de rede (download/upload)
Auxiliar em troubleshooting de rede

Ferramentas desse tipo são essenciais porque permitem visualizar o tráfego e comportamento da rede em tempo real .

🎯 Objetivo

Resolver problemas comuns como:

Internet lenta sem causa aparente
Dispositivos caindo da rede
Alto consumo de banda
Falta de visibilidade da rede local
🏗️ Arquitetura do Projeto
[ Dispositivos da Rede ]

          ↓
[ Scanner / Monitoramento ]

          ↓
[ Processamento de Dados ]

          ↓
[ Interface / Output (CLI ou Dashboard) ]

🔹 Camadas

1. Coleta de Dados

Ping ICMP
Monitoramento de interfaces de rede
Captura de tráfego (opcional)

2. Processamento

Cálculo de latência
Taxa de upload/download
Status (online/offline)

3. Apresentação

Logs no terminal
Dashboard (caso tenha frontend)
Alertas (opcional)
⚙️ Tecnologias Utilizadas

(ajuste conforme seu código real depois)

Backend
Python / Node.js / Bash (dependendo do seu projeto)

Bibliotecas comuns:
psutil → uso de rede
socket → conexões
subprocess → execução de ping
scapy → análise de pacotes (avançado)
Sistema
Linux / Windows compatível

Uso de comandos nativos:
ping
netstat
ipconfig / ifconfig

🔍 Funcionalidades

📡 Monitoramento de dispositivos

Verifica se dispositivos estão online/offline

Atualização em tempo real

⚡ Medição de latência
Ping contínuo

Identificação de instabilidade

📊 Monitoramento de tráfego

Upload / Download

Uso de banda

🧠 Diagnóstico de rede

Ajuda a identificar gargalos

Detecta perda de pacote

🧪 Como funciona (fluxo):
O sistema coleta dados da rede
Executa testes (ping / leitura de tráfego)
Processa os dados
Exibe os resultados em tempo real
Emvia Alertas para Telegram
Tenta reiniciar processos que cairam

🚀 Como rodar o projeto
# Clonar repositório:
git clone https://github.com/CalimanMateus/network-monitoring.git

# Entrar na pasta:
cd network-monitoring

# Instalar dependências:
pip install -r requirements.txt   # ou npm install

# Executar
python main.py ou node app.js

📊 Exemplo de saída:

Dispositivo: 192.168.0.1
Status: ONLINE
Latência: 12ms
Download: 5.2 MB/s
Upload: 1.1 MB/s


🧱 Desafios do Projeto
🔴 1. Captura de dados de rede
Difícil obter dados precisos em tempo real
Diferença entre sistemas operacionais

🔴 2. Permissões do sistema
Algumas funções exigem privilégios elevados (root/admin)

🔴 3. Performance
Monitoramento contínuo pode consumir recursos

🔴 4. Precisão dos dados
Ping não representa toda a realidade da rede
Necessidade de múltiplas métricas

💡 Possíveis melhorias
- Dashboard web (React / Vue)
Histórico de dados (Banco de Dados)
Integração com APIs
Detecção automática de dispositivos
🧠 Conceitos aplicados
Redes de computadores
Monitoramento de sistemas
Programação assíncrona
Coleta e análise de dados
Observabilidade


🧑‍💻 Autor
Mateus Caliman
Projeto desenvolvido para aprendizado e prática em:

- Redes
- Monitoramento
- Backend
- DevOps

⭐ Por que esse projeto é forte no portfólio?

✔ Mostra conhecimento em redes
✔ Mostra capacidade de resolver problemas reais
✔ Pode ser evoluído para produto real
✔ Demonstra pensamento de engenharia

🔥 Resumo

Um projeto prático e escalável que demonstra na prática como:

👉 Monitorar redes
👉 Diagnosticar problemas
👉 Trabalhar com dados em tempo real
