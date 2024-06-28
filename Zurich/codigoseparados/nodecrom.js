const cron = require('node-cron');
const { exec } = require('child_process');


const appsToRestart = ['agendamentotaxa.js', 'agendamento.js', 'agmoveis.js', 'autorizado.js','autorizadomoveis.js', 
                       'visitainiciar.js','visitainiciarmoveis.js','visitainiciartaxa.js','entregasolicitada.js','entregasolicitadataxa.js',
                       'finalizacao.js','finalizacaoTaxa.js','finalizacaomoveis.js','naocoberto.js','naocobertomoveis.js','naocobertotaxa.js',
                       'semdefeito.js','semdefeitomoveis.js','semdefeitotaxa.js','autorizadovelho.js','electrolux.js', 'agendado.js','agendadomoveis.js'
                        ,'agendadotaxa.js','pendenciapeça.js','pendenciapeçamoveis.js','pendenciapeçataxa.js','pendente.js','pendentemoveis.js',
                        'pendentetaxa.js','remarcado.js','remarcadomoveis.js','remarcadotaxa.js','reparo.js','reparomoveis.js','reparotaxa.js',
                        'visitacumprida.js','visitacumpridamoveis.js','visitacumpridataxa.js', 'vistoria.js','vistoriamoveis.js','vistoriavelho.js',
                        'naoenviado.js','naoenviadomoveis.js', 'naoenviadofast.js','naoenviadotaxa.js' ];

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

