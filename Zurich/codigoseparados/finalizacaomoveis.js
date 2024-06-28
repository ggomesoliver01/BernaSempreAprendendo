const puppeteer = require('puppeteer');
const axios = require('axios')
var fs = require('fs');
var posts = [];
var dados = [];
var iDados = 0;
const Sequelize = require('sequelize')




class Sinistrovalor {
  acaoModel = require("../../MYSQL/models/acaoModel"); //Altere para o caminho correto

  constructor() {
      this.acaoModel = new this.acaoModel;
  }
  async importaZurich(i = 0) {
    const browser = await puppeteer.launch(
      { 
        headless: true,
        // executablePath: 'C:\\Users\\Micro\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe' 
      }
    );

  // LOGUIN
  const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768});
    await page.goto('https://zews.zurich.com.br/PortalPrestador/auth/login');
    await page.waitForSelector('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input')
    await page.type("body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input", 'pvdsupl01');
    await page.type("body > app-root > app-loading > div > app-login > mat-card > app-loading > app-password-input > div > div > input",'suPo&t4L');
    await page.waitForTimeout(2500)
    await page.click('body > app-root > app-loading > div > app-login > mat-card > app-loading > button');
    await page.waitForTimeout(2500)
    

  await page.waitForTimeout(15000)
  posts = await teste.carregaOS(); 

  teste.listagem(page, browser, posts, i)
  
}
  

async listagem(page,browser, arr = [], i = 0){
  try{
    console.log(arr);
    await page.waitForTimeout(5000)
    let SinistroInput = arr[i].OS;
  
    // for(let loop = 0; loop < 250;) {
      console.log(arr.length);
      console.log(i);
      SinistroInput = arr[i].OS;
  
      await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li:nth-child(2) > a')
      await page.waitForTimeout(5000)
      const input = await page.$('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input');
        await input.click({ clickCount: 3 })
      await page.type('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input', SinistroInput)
      await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > button')
      await page.waitForTimeout(5000)

      const spanTexts = await page.$$eval('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > div > div > div > app-so-card > mat-card > div.d-flex.flex-row > div.flex-grow-1 > div > div.row > div.col-12.col-md-6.col-xl-3.order-1.order-xl-1.bottom-border.bottom-border-xl.left-border-xl > div > app-so-info-field > app-heading > span:nth-child(2)', elements => elements.map(el => el.innerText))
      let valor = spanTexts[0]
      var Datetoday = new Date().toISOString().slice(0, 10)
      var todayDate = Datetoday.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3/$2/$1');
      console.log(todayDate)
      
      await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > div > div > div > app-so-card > mat-card > div.d-flex.flex-row > div.m-auto.pl-2.ng-star-inserted > button')
      await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > div > div > div > app-so-card > mat-card > div.d-flex.flex-row > div.m-auto.pl-2.ng-star-inserted > button')
      
      await page.waitForSelector('#cardBudget > mat-card > div > div.row > div.col-md-1.col-2 > app-collapse-button > button')
      await page.click('#cardBudget > mat-card > div > div.row > div.col-md-1.col-2 > app-collapse-button > button')
      await page.waitForTimeout(5000)
      const spanTexts2 = await page.$$eval('#collapseTechnicalBudget > app-loading > div.card-alignment.ng-star-inserted > div > div.col-12.pl-0 > app-so-technical-budget-list-items > app-loading > div.row.mt-2.ng-star-inserted > div > div', elements => elements.map(el => el.innerText))
      let valor2 = spanTexts2[0]
      console.log(valor2)

      
      valor2 = valor2.toString().replace("R$", "");
      valor2 = valor2.toString().replace("Total","");// dados[iDados].OrcApv = dados[iDados].OrcApv.toString().replace("R$", "");
      valor2 = valor2.toString().replace(".", "");  //dados[iDados].OrcApv = dados[iDados].OrcApv.toString().replace(",", ".") ;dados[iDados].OrcApv = dados[iDados].OrcApv.toString().replace(",", ".");
      valor2 = valor2.toString().replace(",", ".");
      
      dados[iDados] = {
          OS: SinistroInput.trim(),
          OrcApv: valor2.trim(),
          tipo: "orcamento",
          IdEmpresa:1,
          Empresa:"Zurich"
          
        }
        fs.writeFileSync('finalizacaomoveis.json', JSON.stringify(dados).trim());
        console.log(dados);

        teste.envia()
        console.log('Enviado valor')
     

      if (valor == 'Assinada'){
        console.log('mudar status')
                await this.updateStatusSinistros(arr[i].id);
                await this.insetDescStatusSinistro(arr[i].id);
  
       }

       if (valor == 'Concluída'){
        console.log('concluida')
        
        
        await page.waitForSelector('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input')
          await page.click('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input') 
          await page.type('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input', todayDate)
          
          await page.click('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
          await page.waitForSelector('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(2)')
          await page.click('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(2)')
          await page.waitForSelector('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.value.d-flex.justify-content-end.ng-star-inserted > button')
          await page.click('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.value.d-flex.justify-content-end.ng-star-inserted > button')
        
        await page.waitForTimeout(10000)
        
  
          await teste.updateStatusSinistros(arr[i].id);
          await teste.insetDescStatusSinistro(arr[i].id);
    
        
      }

      if (valor == 'Em Execução') {
        console.log('execuçao')
        
        await page.waitForSelector('#collapseStartRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.value.d-flex.justify-content-end.ng-star-inserted > button')
        await page.click ('#collapseStartRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.value.d-flex.justify-content-end.ng-star-inserted > button')
        await page.waitForSelector('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input')
        await page.click('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input') 
        await page.type('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input', todayDate)
        await page.click('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
        await page.waitForSelector('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(2)')
        await page.click('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(2)')
        await page.waitForSelector('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.value.d-flex.justify-content-end.ng-star-inserted > button')
        await page.click('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.value.d-flex.justify-content-end.ng-star-inserted > button')
        await page.waitForTimeout(5000)
        await page.setCacheEnabled(false);
        await page.reload({waitUntil: 'networkidle2'});
        await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(3) > div > div > button')
        await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(3) > div > div > button')
        await page.waitForSelector('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input')
        await page.click('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input') 
        await page.type('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input', todayDate)
        await page.click('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
        await page.waitForSelector('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(2)')
        await page.click('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(2)')
        await page.waitForSelector('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.value.d-flex.justify-content-end.ng-star-inserted > button')
        await page.click('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.value.d-flex.justify-content-end.ng-star-inserted > button')
        await page.waitForTimeout(10000)
        
        
          await teste.updateStatusSinistros(arr[i].id);
          await teste.insetDescStatusSinistro(arr[i].id);
    
        
      }
    // }

    teste.listagem(page, browser, arr, ++i)
  } catch(error) {
    console.log(error);
    //return;
    i++
    console.log(i, arr.length)
    if(error == "TypeError: Cannot read properties of undefined (reading 'OS')"){ 
      teste.reset()
      await browser.close()
  }else{
    teste.importaZurich(i)
    await browser.close()
      }
    }
  }


  envia() {
    console.log('enviou os dados')
    var content = JSON.parse(fs.readFileSync("finalizacaoTaxa.json"));
    axios
      .post(
        "https://gsplanaltec.com/GerenciamentoServicos/APIControle/Importacao2",
        content,
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      )
      .then(function (response) {
        // response = JSON.parse(response);
        return(response);
        
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async carregaOS(){
    const response = await this.acaoModel.manualQuery({
      bd: "servico_bd",
      tabela: "importados_zurich",
      query: "SELECT IZ.id, IZ.Sinistro, IZ.OS FROM importados_zurich IZ LEFT JOIN descricoes D ON D.desc_id_zurich = IZ.id LEFT JOIN selects S ON S.sel_id = IZ.status LEFT JOIN empresas E ON E.id = IZ.id_emp LEFT JOIN cidades C ON C.id = IZ.cidade LEFT JOIN lancamento_pg LP ON LP.idOS = IZ.id WHERE ( (IZ.id_emp IN (1) AND S.sel_id IN (18)) ) AND ((LP.LiberadoPg != 0 AND LP.statusPG = 19 OR LP.LiberadoPg != 0 AND LP.statusPG = 20 AND LP.LiberadoNPS != 0) OR LP.id is null) AND (STR_TO_DATE(D.desc_data, '%d/%m/%Y') >= '2020-01-01' AND STR_TO_DATE(D.desc_data, '%d/%m/%Y') <= '2030-12-26')  GROUP BY IZ.id",
      tipoQuery: { type: Sequelize.SELECT }
    });
        
    return response[0];
  }

// async carregaOS(){
//   var response = await axios.post('https://gsplanaltec.com/consultaBot/', {sqlQuery:  "SELECT IZ.id, IZ.Sinistro, IZ.OS FROM importados_zurich IZ LEFT JOIN descricoes D ON D.desc_id_zurich = IZ.id LEFT JOIN selects S ON S.sel_id = IZ.status LEFT JOIN empresas E ON E.id = IZ.id_emp LEFT JOIN cidades C ON C.id = IZ.cidade LEFT JOIN lancamento_pg LP ON LP.idOS = IZ.id WHERE ( (IZ.id_emp IN (1) AND S.sel_id IN (18)) ) AND ((LP.LiberadoPg != 0 AND LP.statusPG = 19 OR LP.LiberadoPg != 0 AND LP.statusPG = 20 AND LP.LiberadoNPS != 0) OR LP.id is null) AND (STR_TO_DATE(D.desc_data, '%d/%m/%Y') >= '2020-01-01' AND STR_TO_DATE(D.desc_data, '%d/%m/%Y') <= '2030-12-26')  GROUP BY IZ.id"}, {
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
    axios.post("https://gsplanaltec.com/GerenciamentoServicos/APIControle/insereDescStatusAtualizado", { id: id, status: 64 }, {
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
      sqlQuery:`UPDATE importados_zurich SET status = 64, AtivoInativo = 4 WHERE id IN (${id})`
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
