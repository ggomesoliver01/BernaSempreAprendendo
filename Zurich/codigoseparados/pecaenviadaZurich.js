const puppeteer = require('puppeteer');
const axios = require('axios');
const moment = require('moment');
const Sequelize = require("sequelize")
var posts = [];


class PecaEnviada{

  acaoModel = require("../../MYSQL/models/acaoModel");
  constructor() {
      this.acaoModel = new this.acaoModel;
  }

    async logando(i = 0, arr = []){
        const browser = await puppeteer.launch({
            headless: true,
            // executablePath: 'C:\\Users\\user\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'
        }); 
    


        console.log('Login...')
        const page = await browser.newPage();
        await page.setViewport({width: 1920, height: 1080});
        await page.goto('https://zews.zurich.com.br/PortalPrestador/home')
        await page.waitForTimeout(2000)
        await page.click('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input')
        await page.type('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input', 'pvdsupl')
        await page.waitForSelector('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-password-input > div > div > input')
        await page.click('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-password-input > div > div > input')
        await page.type('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-password-input > div > div > input', 'suPo!t0L')
        await page.waitForTimeout(2000)
        await page.click('body > app-root > app-loading > div > app-login > mat-card > app-loading > button') // Comando usado para logar no site
        await page.waitForTimeout(10000)
        console.log('Logou no site!')

        posts = arr.length > 0 ? arr : await teste.carregaOS(); 
        await teste.listagem(page, browser, posts, i) 
        return;
    }

    async listagem(page,browser, arr = [], i = 0){
        try {
            console.log(arr[i]);
            await page.waitForTimeout(5000)
          let OS = arr[i].OS;
          let AG =arr[i].AG
          console.log(arr.length);
          console.log(i);
          console.log(AG)
          let AGS = AG.split("/");
          let dataCerta = `${AGS[2]}-${AGS[1]}-${AGS[0]}`;
          console.log(OS)
          console.log(dataCerta)
          console.log(AGS)
          let pedrao = (moment(dataCerta).add(3, 'days').format('DD/MM/YYYY')); 
          console.log(pedrao)
          // Convertendo a data para o formato do moment.js
let pedraoMoment = moment(pedrao, 'DD/MM/YYYY');

// Verificando se é sábado ou domingo
if (pedraoMoment.day() === 6) { // 6 é sábado
    // Adicionando os dias necessários para chegar à próxima segunda-feira (2 dias)
    pedraoMoment.add(2, 'days');
} else if (pedraoMoment.day() === 0) { // 0 é domingo
    // Adicionando os dias necessários para chegar à próxima segunda-feira (1 dia)
    pedraoMoment.add(1, 'days');
}

// Obtendo a data formatada
pedrao = pedraoMoment.format('DD/MM/YYYY');
          await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li:nth-child(2) > a')
          await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li:nth-child(2) > a');
          await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input');
          await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input');
          await page.type('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input', OS);
          await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > button');
          await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > div > div > div > app-so-card > mat-card > div.d-flex.flex-row > div.m-auto.pl-2.ng-star-inserted > button')
          await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > div > div > div > app-so-card > mat-card > div.d-flex.flex-row > div.m-auto.pl-2.ng-star-inserted > button')
          await page.waitForTimeout(2000)
          await page.waitForSelector('#messagesCard > mat-card > div > div.row > div:nth-child(3) > app-collapse-button > button')
          await page.click('#messagesCard > mat-card > div > div.row > div:nth-child(3) > app-collapse-button > button')
          console.log('aqui')
          await page.waitForTimeout(10000)
          const spanTexts1 = await page.$$eval('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.msg_history.ng-star-inserted', elements => elements.map(el => el.innerText))
          let nota = spanTexts1[0]
          console.log(nota)
          await page.waitForTimeout(5000)
      
          if(nota.indexOf("Prezados, as peças necessárias para") !== -1   && nota != ('undefined')) {
            console.log('ENCONTROU')
            await teste.updateGatilhoSinistros(arr[i].id);
            console.log('Gatilho alterado')
      
           }else{
            console.log('Não encontrou')
          await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
          await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
          await page.waitForTimeout(8000)
          await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')
          await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')
           
          const input = await page.$('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input');
          await input.click({ clickCount: 3 })
           
           await page.type('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input', `Prezados, as peças necessárias para o reparo estão em transito para a nossa AT, a previsão de chegada é ${AG}, segurado ciente e de acordo.`)
          await page.waitForTimeout(5000)
          await teste.updateGatilhoSinistros(arr[i].id);
          await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
          await page.waitForTimeout(5000)
      //  await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button') // Lançou not
       
       
      }
    
       

          this.listagem(page, browser, arr, ++i)
          return;
        }catch(error){
        console.log(error);
        //return;
        i++
        console.log(i, arr.length)

        if(error == "TypeError: Cannot read properties of undefined (reading 'OS')"){ 
        teste.reset()
        console.log('reset')
        await browser.close()
        }else{
          teste.logando(i);
          await browser.close()
        }
}
}

async carregaOS(){
  const response = await this.acaoModel.manualQuery({
    bd: "servico_bd",
    tabela: "importados_zurich",
    query: `SELECT 
    IZ.id,
    IZ.OS,
    IZ.Sinistro,
    IZ.data,
    @varAG := (SELECT A.A_Data FROM agendamento A WHERE A.A_id_Zurich = IZ.id AND (A.status_id = IZ.status) ORDER BY A.A_id DESC limit 1) as varAG,
    IF(@varAG IS NULL, (SELECT A.A_Data FROM agendamento A WHERE A.A_id_Zurich = IZ.id ORDER BY A.A_id DESC limit 1), @varAG) as AG,
    IZ.status,
    S.sel_nome,
    (SELECT D.desc_descricao FROM descricoes D where D.desc_id_zurich = IZ.id AND D.desc_descricao LIKE CONCAT('%', S.sel_nome, '%') order by D.desc_id desc limit 1) as 'descricao'
  FROM importados_zurich IZ
      left join selects S ON S.sel_id = IZ.status 
  WHERE IZ.id_emp IN (64,71,146)
    AND IZ.gatilho = 0
    AND taxa_flet = 0
    AND IZ.status = 43
  GROUP BY IZ.id`,
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
    setTimeout(teste.logando, 600000)
    console.log('reset')
  }
}

const teste = new PecaEnviada;
teste.logando()