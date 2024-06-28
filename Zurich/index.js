const importacaoconserto = require('./importacaoZurich/importaconserto');
const importacaofast = require('./importacaoZurich/importacaozurichFAST');
const importacaomoveis = require('./importacaoZurich/importacaozurichmoveis');
const importacaotaxaflet = require('./importacaoZurich/importacaozurichmoveisTAXAFLET');

var fs = require('fs');

//Chama Modulos
var conserto = new importacaoconserto();
var impfast = new importacaofast();
var impmoveis = new importacaomoveis();
var impflet = new importacaotaxaflet()

const readline = require('readline');
const { allowedNodeEnvironmentFlags } = require('process');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.clear();
var config = JSON.parse(fs.readFileSync("./config.json"));

rl.question('Escolha a Serguradora: (Digite o Codigo) \n Zurich - 0 \n', function (seguradora) {
    rl.question(`Ecolha a Linha: (Digite o Codigo) \n ${config[seguradora].linhas} \n`, function (linha) {
        rl.question(`Escolha a Opção: (Digite o Codigo) \n ${config[seguradora].opcoes} \n`, function (opcao) {
            console.log(`${config[seguradora].seguradora} automação foi iniciada na ${config[seguradora].linhas[linha]}`);
            selecionaAutomacao(seguradora, linha, opcao, config[seguradora]);
        });
    });
});



function selecionaAutomacao(seguradora, linha, opcao, objSegurado){ 
  
  var dadosTerminal = {
    seguradoraT: seguradora,
    linhaT: linha,
    opcaoT: opcao,
    obj: objSegurado
  }
  
  
  
  
  if(seguradora == 0){
    if(opcao == 0){
      console.log('importando conserto...');
      conserto.importaZurich("http://zews.zurich.com.br/PortalPrestador/auth/login", dadosTerminal);
    }if (opcao == 1){
      console.log('importando Moveis');
      impmoveis.importaZurichm("http://zews.zurich.com.br/PortalPrestador/auth/login", dadosTerminal);
    }if(opcao == 2){
      console.log('importando Fast...');
      impfast.importaZurichf("http://zews.zurich.com.br/PortalPrestador/auth/login", dadosTerminal);
    }if(opcao == 3){
      console.log('importando flet');
      impflet.importaZurichT("http://zews.zurich.com.br/PortalPrestador/auth/login", dadosTerminal)};
  }
}

 

   rl.on('close', function () {
    process.exit(0);
});
