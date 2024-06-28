const puppeteer = require('puppeteer');
var posts = [];
const axios = require('axios')
const Sequelize = require('sequelize')

class statusnaoenviado{
  acaoModel = require("../../MYSQL/models/acaoModel"); //Altere para o caminho correto

  constructor() {
      this.acaoModel = new this.acaoModel;
  }
 async importaZurich(i = 0, arr = []) {
    const browser = await puppeteer.launch(
      { 
        headless: true,
        // executablePath: 'C:\\Users\\Micro\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe' 
      }
    );
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768});
    await page.goto('https://zews.zurich.com.br/PortalPrestador/auth/login');
    await page.waitForSelector('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input')
    await page.type("body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input", 'pvdsupl01');
    await page.type("body > app-root > app-loading > div > app-login > mat-card > app-loading > app-password-input > div > div > input",'suPo&t4L');
    await page.waitForTimeout(2500)
    await page.click('body > app-root > app-loading > div > app-login > mat-card > app-loading > button');
    await page.waitForTimeout(2500)
     
    posts = arr.length > 0 ? arr : await rep.carregaOS(); 
    await rep.listagem(page, browser, posts, i)

    }
    async listagem(page,browser, arr = [], i = 0){
        try{
          console.log(arr);
          await page.waitForTimeout(5000)
          
          let OS = arr[i].OS;

          console.log(arr.length);
          console.log(i);
          const data = new Date();
          const dias = 7;
          function addDays(date, days) {
          date.setDate(date.getDate() + days);
           return date.toISOString().slice(0, 10).split('-').reverse().join('/');
          }
          
          const novaData = addDays(data, dias);
          
          console.log(novaData)
 

          await page.waitForTimeout(5000)
    await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li:nth-child(2) > a')
    await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li:nth-child(2) > a');
    await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input');
    await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input');
    await page.type('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input', OS);
    await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > button');
    await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > div > div > div > app-so-card > mat-card > div.d-flex.flex-row > div.m-auto.pl-2.ng-star-inserted > button')
    await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > div > div > div > app-so-card > mat-card > div.d-flex.flex-row > div.m-auto.pl-2.ng-star-inserted > button')
    await page.waitForTimeout(5000)
    await page.waitForSelector('#messagesCard > mat-card > div > div.row > div:nth-child(3) > app-collapse-button > button')
    await page.click('#messagesCard > mat-card > div > div.row > div:nth-child(3) > app-collapse-button > button')
    await page.waitForTimeout(8000)
    
    const spanTexts1 = await page.$$eval('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.msg_history.ng-star-inserted', elements => elements.map(el => el.innerText))
    let nota = spanTexts1[0]
    console.log(nota)
    await page.waitForTimeout(5000)

    if(nota == undefined ) {

    await page.waitForTimeout(10000)
    await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
    await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
    await page.waitForTimeout(2000)
    
    await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')
    await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')
    await page.waitForTimeout(5000)
    const input = await page.$('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input');
    await input.click({ clickCount: 3 })
     await page.waitForTimeout(5000)
    await page.type('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input',`Prezados, atendimento recebido, estaremos entrando em contato com segurado para agendar a visita técnica. Previsão de atendimento ${novaData}.`)
    await rep.updateGatilhoSinistros(arr[i].id);
    await page.waitForTimeout(10000)
    console.log('Gatilho alterado')
    await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
    
  }else{

    if(nota.indexOf("Prezados, atendimento recebido") !== -1) {
    await rep.updateGatilhoSinistros(arr[i].id);
    console.log('Nota encontrada')

  }else{
    console.log('Nota não encontrada')
    await page.waitForTimeout(10000)
    await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
    await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
    await page.waitForTimeout(2000)
    
    await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')
    await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')
    await page.waitForTimeout(5000)
    const input = await page.$('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input');
    await input.click({ clickCount: 3 })
     await page.waitForTimeout(5000)
    await page.type('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input',`Prezados, atendimento recebido, estaremos entrando em contato com segurado para agendar a visita técnica. Previsão de atendimento ${novaData}.`)
    await rep.updateGatilhoSinistros(arr[i].id);
    await page.waitForTimeout(10000)
    console.log('Gatilho alterado')
    await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')

  }
}
    rep.listagem(page, browser, arr, ++i)
    } catch(error) {
      console.log(error);
      //return;
      i++
      console.log(i, arr.length)
      if (error == "TypeError: Cannot read properties of undefined (reading 'OS')") {
        console.log('reset');
        await browser.close();
        function reset() {
          setTimeout(() => {
           // rep.importaZurich();
            console.log('reset');
          }, 300000);
        }
      
        // Função para exibir o cronômetro
        function exibirCronometro(tempoRestante) {
         
        }
      
        // Função para iniciar o cronômetro
        function iniciarCronometro(tempoTotal) {
          let tempoRestante = tempoTotal;
      
          const cronometro = setInterval(() => {
            tempoRestante--;
            exibirCronometro(tempoRestante);
      
            if (tempoRestante <= 0) {
              clearInterval(cronometro);
              reset();
              rep.importaZurich(i);
              console.log('Iniciando o código...');
            }
          }, 1000);
      
          exibirCronometro(tempoRestante);
        }
      
        // Iniciar o cronômetro com o tempo total de 5 minutos (300 segundos)
        iniciarCronometro(300);
      } else {
        rep.importaZurich(i);
        await browser.close();
      }
    }}



    async carregaOS(){
      const response = await this.acaoModel.manualQuery({
        bd: "servico_bd",
        tabela: "importados_zurich",
        query: "SELECT IZ.id,IZ.OS,IZ.Sinistro,IZ.data,S.sel_nome  FROM importados_zurich IZ left join selects S ON S.sel_id = IZ.status  WHERE IZ.id_emp IN (1) AND gatilho = 0 AND status = 5  AND (STR_TO_DATE(IZ.data,'%d/%m/%Y') >= '2023-04-17' AND STR_TO_DATE(IZ.data,'%d/%m/%Y') <= '2030-12-30')  group by IZ.id;",
        tipoQuery: { type: Sequelize.SELECT }
      });
          
      return response[0];
    }
    
      removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject  = {};
    
        for(var i in originalArray) {
          lookupObject[originalArray[i][prop]] = originalArray[i];
        }
    
        for(i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
      }
    
      async updateGatilhoSinistros(id) {
        axios.post("https://gsplanaltec.com/consultaBot/",
        {
          sqlQuery:`UPDATE importados_zurich SET gatilho = 1 WHERE id IN (${id})`
        },
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }).then(function(response) {
          var retorno =  response.data;
          console.log(retorno)
        }).catch(function (error) {
          console.error(error);
        });
      }
    
      reset(){
        setTimeout(rep.importaZurich, 300000)
        console.log('reset')
      }
      
    }
const rep = new statusnaoenviado;
rep.importaZurich();