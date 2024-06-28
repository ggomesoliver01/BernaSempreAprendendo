const cron = require('node-cron');
const { exec } = require('child_process');


const appsToRestart = ['merli128.js' ];

const task = cron.schedule('0 */2 * * *', () => {
  appsToRestart.forEach((appName) => {
    exec(`pm2 restart ${appName}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao reiniciar ${appName}: ${error}`);
      } else {
        console.log(`${appName} reiniciado com sucesso: ${stdout}`);
      }
    });
  });
});


task.start();

