const { exec } = require('child_process');

function restartContainer(containerName) {
  exec(`docker restart ${containerName}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao reiniciar container ${containerName}:`, error);
      return;
    }
    console.log(`✅ Container ${containerName} reiniciado com sucesso!`);
  });
}

module.exports = { restartContainer };
