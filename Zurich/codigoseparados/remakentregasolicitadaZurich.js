const puppeteer = require('puppeteer');
const axios = require('axios');
var posts = [];
class Entregasolicitada{
    async logando(i = 0, arr = []){
        const browser = await puppeteer.launch({
            headless: true,
            // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
        }); 
        
        console.log('Login')
        const page = await browser.newPage();
        await page.setViewport({width: 1920, height: 1080}); 
        await page.goto('https://zews.zurich.com.br/PortalPrestador/auth/login')
        await page.waitForTimeout(2000)
        await page.click('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input')
        await page.type('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input', 'pvdguro03' )
        await page.waitForTimeout(2000)
        await page.click('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-password-input > div > div > input')
        await page.type('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-password-input > div > div > input', 'Guiihba123')
        await page.waitForTimeout(2000)
        await page.click('body > app-root > app-loading > div > app-login > mat-card > app-loading > button')
        await page.waitForTimeout(4000)


        posts = arr.length > 0 ? arr : await teste.carregaOS(); 
        await teste.listagem(page, browser, posts, i);
        return;
    }



    async listagem(page,browser, arr = [], i = 0){
        try{
          console.log(arr);
          await page.waitForTimeout(5000)
          
          let OS = arr[i].OS;
          let AG = arr[i].AG;
          var date = new Date(AG.split('/').reverse().join('/'));
          var novaData = new Date();
          //console.log(AG)
          console.log(date)//data do AG
          console.log(novaData)// data de hj 


        if(AG > novaData && AG != '' )  {
        console.log('entrou aqui')
        await page.waitForTimeout(4000)
        await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li:nth-child(2) > a')
        await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input')
        await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input')
        await page.click('#mat-select-value-7')
        await page.waitForTimeout(5000)
        await page.click('#mat-option-11 > span')
        console.log('Buscando o sinistro...')
        await page.waitForTimeout(5000)
        await page.type('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input', OS)
        await page.waitForTimeout(4000)
        await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > button')
        console.log('Sinistro localizado! Entrando...')
        await page.waitForTimeout(6000)
        await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > div > div > div > app-so-card > mat-card > div.d-flex.flex-row > div.m-auto.pl-2.ng-star-inserted > button')
        console.log('Estamos dentro do sinistro! Lançando nota...' )
        await page.waitForTimeout(5000)
        await page.click('#messagesCard > mat-card > div > div.row > div:nth-child(3) > app-collapse-button > button')
        await page.waitForTimeout(4000)
        await page.click('#dropdownMenuButton')
        await page.waitForTimeout(3000)
        await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')
        await page.waitForTimeout(3000)
        await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input')
        await page.waitForTimeout(2000)
        await page.type('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input', 'Prezados, a previsão para a entrega do produto para o nosso posto de AT é para o dia (Colocar Data)')
        await teste.updateGatilhoSinistros(arr[i].id)
        console.log('Gatilho alterado!')
        // await page.waitForTimeout(10000)
        // await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
        //console.log('Nota lançada! Iniciando looping...)

    }
    teste.listagem(page, browser, arr, ++i)
    return;
    } catch(error) {
      console.log(error);
      //return;
      i++
      console.log(i, arr.length)
      if(error == "TypeError: Cannot read properties of undefined (reading 'OS')"){ 
        teste.reset()
        console.log('reset')
        await browser.close()
        return;
      }else{
        teste.importaZurich(i)
        await browser.close()
        return;
      }
    }
  }

  async carregaOS(){

    var response = await axios
        .post('http://26.199.139.75:8010/consultaBot/', {
          sqlQuery:   "SELECT IZ.id, IZ.OS, IZ.Sinistro, IZ.data, AG.A_Data as AG, S.sel_nome, (SELECT D.desc_descricao FROM descricoes D where D.desc_id_zurich = IZ.id AND D.desc_descricao LIKE CONCAT('%', S.sel_nome, '%') order by D.desc_id desc limit 1) as 'descricao'FROM importados_zurich IZ JOIN agendamento AG ON AG.A_id_Zurich = IZ.id left join selects S ON S.sel_id = IZ.status WHERE IZ.id_emp IN (64) AND gatilho = 0 AND status = 60 AND (STR_TO_DATE(IZ.data,'%d/%m/%Y') >= '2022-12-01' AND STR_TO_DATE(IZ.data,'%d/%m/%Y') <= '2030-12-30')  group by IZ.id;" //AND IZ.OS = '3769744'
        },
        {  //AND IZ.OS = '3713772'
          headers:{                                                       
            'Content-Type' : 'application/json; charset=UTF-8',
          }
        }).then(function(response) {
          return response.data;
        }).catch(function (error) {
          console.error(error);
        });
        
    return response;
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
    axios.post("http://26.199.139.75:8010/consultaBot/",
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
}


const teste = new Entregasolicitada;
teste.logando();