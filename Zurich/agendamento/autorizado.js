const puppeteer = require('puppeteer');
const axios = require('axios')
var fs = require('fs');
var posts = [];
var dados = [];
const Sequelize = require('sequelize')




class Sinistrovalor {
  acaoControle = require("./../../acaoControle/importacao");
  acaoModel = require("../../MYSQL/models/acaoModel"); //Altere para o caminho correto

  constructor() {
      this.acaoModel = new this.acaoModel;
      this.acaoControle = new this.acaoControle;
  }
  async importaZurich(i = 0) {
    const browser = await puppeteer.launch(
      { 
        headless: true,
        // executablePath: 'C:\\Users\\Micro\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe' 
      }
    );

  // LOGUIN
//   const page = await browser.newPage();
//     await page.setViewport({ width: 1366, height: 768});
//     await page.goto('https://zews.zurich.com.br/PortalPrestador/auth/login');
//     await page.waitForSelector('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input')
//     await page.type("body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input", 'pvdsupl');
//     await page.type("body > app-root > app-loading > div > app-login > mat-card > app-loading > app-password-input > div > div > input",'suPo!t0L');
//     await page.waitForTimeout(2500)
//     await page.click('body > app-root > app-loading > div > app-login > mat-card > app-loading > button');
//     await page.waitForTimeout(2500)

    const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768});
  await page.goto('https://zews.zurich.com.br/PortalPrestador/auth/login');
  await page.waitForSelector('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input')
  await page.type("body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input", 'pvdsuporte02');
  await page.type("body > app-root > app-loading > div > app-login > mat-card > app-loading > app-password-input > div > div > input",'suPo{t8I');
  await page.waitForTimeout(2500)
  await page.click('body > app-root > app-loading > div > app-login > mat-card > app-loading > button');
  await page.waitForTimeout(2500)

  
  posts = await teste.carregaOS(); 

  teste.listagem(page, browser, posts, i)
  
}
  

async listagem(page,browser, arr = [], i = 0){
  try{
    console.log(arr);
    await page.waitForTimeout(5000)
    let SinistroInput = arr[i].OS;
    let id = arr[i].id
    let statusNovo = 28
    let statusNovo1= 14
    let status = arr[i].status;
    // for(let loop = 0; loop < 250;) {
      console.log(arr.length);
      console.log(i);
     
      console.log(SinistroInput)
  
      await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li:nth-child(2) > a')
      await page.waitForTimeout(10000)
      const input = await page.$('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input');
      await input.click({ clickCount: 3 })
      await page.type('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input', SinistroInput)
      await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > button')
      await page.waitForTimeout(5000)
      await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > div > div > div > app-so-card > mat-card > div.d-flex.flex-row > div.m-auto.pl-2.ng-star-inserted > button')
      await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > div > div > div > app-so-card > mat-card > div.d-flex.flex-row > div.m-auto.pl-2.ng-star-inserted > button')

      await page.waitForSelector('#cardBudget > mat-card > div > div.row > div.col-md-9.col-7 > mat-card-title > strong > span')

      const spanTexts = await page.$$eval('#cardBudget > mat-card > div > div.row > div.col-md-9.col-7 > mat-card-title > strong > span', elements => elements.map(el => el.innerText))
      let valor = spanTexts[0]
       console.log(valor)
      



       
    
      if(valor == 'Aprovado' || valor == 'Parcialmente aprovado'){
        await teste.updateStatusSinistros(arr[i].id);
       // await this.acaoControle.criarDesc(id,statusNovo,status)
        await teste.insetDescStatusSinistro(arr[i].id);
        console.log(SinistroInput)
        await page.waitForTimeout(5000)
        
      }

      
      if(valor == 'Cancelado com despesas'){
        await teste.updateStatusSinistros1(arr[i].id);
        //await this.acaoControle.criarDesc(id,statusNovo1,status)
        await teste.insetDescStatusSinistro1(arr[i].id);
        console.log(SinistroInput)
        await page.waitForTimeout(5000)
        
      }

     

      
    
    // }s

    teste.listagem(page, browser, arr, ++i)
  } catch(error) {
    console.log(error);
    i++
    console.log(i, arr.length)
    if (error == "TypeError: Cannot read properties of undefined (reading 'OS')"){
      teste.reset()
      await browser.close()
    }else {
    teste.importaZurich(i);
    await browser.close()  
  } 
}
}

async carregaOS(){
  const response = await this.acaoModel.manualQuery({
    bd: "servico_bd",
    tabela: "importados_zurich",
    query: "SELECT IZ.id, IZ.Sinistro, IZ.OS, IZ.valorNF, IZ.orcamento, IZ.reincidencia, IZ.uf, IZ.Desconto, IZ.ValorAprovado, IZ.id_emp, E.nome_emp, STR_TO_DATE(IZ.data, '%d/%m/%Y') as data, STR_TO_DATE(D.desc_data, '%d/%m/%Y') as dataDesc FROM importados_zurich IZ LEFT JOIN descricoes D ON D.desc_id_zurich = IZ.id LEFT JOIN selects S ON S.sel_id = IZ.status LEFT JOIN empresas E ON E.id = IZ.id_emp LEFT JOIN cidades C ON C.id = IZ.cidade WHERE ( (IZ.id_emp IN (64 ,71,111,146) AND taxa_flet = 1 AND CHAR_LENGTH(IZ.OS) < 9 AND S.sel_id IN (173)) ) AND (STR_TO_DATE(D.desc_data, '%d/%m/%Y') >= '2020-08-01' AND STR_TO_DATE(D.desc_data, '%d/%m/%Y') <= '2030-12-23')GROUP BY IZ.id",
    tipoQuery: { type: Sequelize.SELECT }
  });
      
  return response[0];
}

// async carregaOS(){
  

//   var response = await axios.post('https://gsplanaltec.com/consultaBot/', {sqlQuery:  "SELECT IZ.id, IZ.Sinistro, IZ.OS, IZ.valorNF, IZ.orcamento, IZ.reincidencia, IZ.uf, IZ.Desconto, IZ.ValorAprovado, IZ.id_emp, E.nome_emp, STR_TO_DATE(IZ.data, '%d/%m/%Y') as data, STR_TO_DATE(D.desc_data, '%d/%m/%Y') as dataDesc FROM importados_zurich IZ LEFT JOIN descricoes D ON D.desc_id_zurich = IZ.id LEFT JOIN selects S ON S.sel_id = IZ.status LEFT JOIN empresas E ON E.id = IZ.id_emp LEFT JOIN cidades C ON C.id = IZ.cidade WHERE ( (IZ.id_emp IN (64 ,71,111) AND taxa_flet = 1 AND CHAR_LENGTH(IZ.OS) < 9 AND S.sel_id IN (173)) ) AND (STR_TO_DATE(D.desc_data, '%d/%m/%Y') >= '2020-08-01' AND STR_TO_DATE(D.desc_data, '%d/%m/%Y') <= '2030-12-23')GROUP BY IZ.id"}, {
//       headers:{
//           'Content-Type' : 'application/json; charset=UTF-8',
//       }
//   });

//   return response.data;
// }

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

  async insetDescStatusSinistro(id) {
    axios.post("https://gsplanaltec.com/GerenciamentoServicos/APIControle/insereDescStatusAtualizado", { id: id, status: 28 }, {
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    }).then(function(response) {
      var retorno =  response.data;
      console.log(retorno)
    }).catch(function (error) {
      console.error(error);
    });
  }

  async updateStatusSinistros(id) {
    axios.post("https://gsplanaltec.com/consultaBot/",
    {
      sqlQuery:`UPDATE importados_zurich SET status = 28 WHERE id IN (${id})`
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


  async insetDescStatusSinistro1(id) {
    axios.post("https://gsplanaltec.com/GerenciamentoServicos/APIControle/insereDescStatusAtualizado", { id: id, status: 14 }, {
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    }).then(function(response) {
      var retorno =  response.data;
      console.log(retorno)
    }).catch(function (error) {
      console.error(error);
    });
  }

  async updateStatusSinistros1(id) {
    axios.post("https://gsplanaltec.com/consultaBot/",
    {
      sqlQuery:`UPDATE importados_zurich SET status = 14 WHERE id IN (${id})`
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
    setTimeout(teste.importaZurich, 200000)
    console.log('reset')

  }
  
}
  

const teste = new Sinistrovalor();
teste.importaZurich();