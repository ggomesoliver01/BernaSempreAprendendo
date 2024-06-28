const cron = require('node-cron');
const moment = require('moment-timezone');

moment.tz.setDefault('America/Sao_Paulo');

const targetTime = moment().set({ hour: 15, minute: 4, second: 0 });


function calcularTempoRestante() {
  const currentTime = moment();
  const diff = moment.duration(targetTime.diff(currentTime));

  const hours = diff.hours();
  const minutes = diff.minutes();
  const seconds = diff.seconds();

  return `${hours}h ${minutes}m ${seconds}s`;
}

function exibirCronometro() {
  console.clear();
  console.log(`Tempo restante para a execução: ${calcularTempoRestante()}`);
}

setInterval(exibirCronometro, 1000);

cron.schedule('4 15 * * 1-5', () => {
  clearInterval();
  console.log('Iniciou.');
});