const puppeteer = require('puppeteer');
var posts = [];
const axios = require('axios')

class Zurich {
  async Zurichmoveis(i = 0, arr = []) {
    const browser = await puppeteer.launch(
      {
        headless: true,
        // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      }
    );
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 1200 });
    await page.goto('https://zews.zurich.com.br/PortalPrestador/auth/login');
    await page.waitForSelector('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input')
    await page.click('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input')
    await page.type('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input', 'pvdscpo07')
    await page.waitForSelector('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-password-input > div > div > input')
    await page.click('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-password-input > div > div > input')
    await page.type('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-password-input > div > div > input', 'Planaltec@2675')
    await page.waitForSelector('body > app-root > app-loading > div > app-login > mat-card > app-loading > button')
    await page.click('body > app-root > app-loading > div > app-login > mat-card > app-loading > button')
    await page.waitForTimeout(2000)
    await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li:nth-child(2) > a')
    await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li:nth-child(2) > a')
    await page.waitForTimeout(5000)
    console.log('aqui')
    await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input')
    await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input')


    posts = arr.length > 0 ? arr : await rep.carregaOS();
    await rep.listagem(page, browser, posts, i)
    return;
  }
  async listagem(page, browser, arr = [], i = 0) {
    try {
      console.log(arr);
      await page.waitForTimeout(5000)

      let OS = arr[i].OS;
      let AG = arr[i].AG;
      console.log(AG)
      console.log(arr.length);
      console.log(i);
      // await page.waitForSelector('#mat-select-6 > div > div.mat-select-arrow-wrapper.ng-tns-c74-4')
      // await page.click('#mat-select-6 > div > div.mat-select-arrow-wrapper.ng-tns-c74-4')
      // await page.waitForTimeout(2000)
      // await page.waitForSelector('#mat-option-11 > span > span')
      // await page.click('#mat-option-11 > span > span')
      await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input')
      await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input', { clickCount: 3 })
      await page.type('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input', OS)
      await page.waitForTimeout(2000)
      console.log('oiii')
      await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > button')
      await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > button')
      console.log('oioi')
      await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > div > div > div > app-so-card > mat-card > div.d-flex.flex-row > div.m-auto.pl-2.ng-star-inserted > button')
      await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > div > div > div > app-so-card > mat-card > div.d-flex.flex-row > div.m-auto.pl-2.ng-star-inserted > button')
      await page.waitForTimeout(2000)
      await page.waitForSelector('#messagesCard > mat-card > div > div.row > div:nth-child(3) > app-collapse-button > button')
      await page.click('#messagesCard > mat-card > div > div.row > div:nth-child(3) > app-collapse-button > button')
      await page.waitForTimeout(2000)
      await page.waitForSelector('#dropdownMenuButton')
      await page.click('#dropdownMenuButton')
      await page.waitForTimeout(2000)
      await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')
      await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')
      await page.waitForTimeout(2000)
      const data = new Date();
      const dias = 7;
      const novadata = this.addDays(data, dias)
      console.log(novadata)
      console.log('apertando o ok ou não')
      await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input')
      await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input')
      await page.waitForTimeout(2000)
      await page.type('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input', `Prezados, produto recolhido para reparo. Previsão de entrega até o dia ${novadata}.`)
      await page.waitForTimeout(2000)
      await rep.updateGatilhoSinistros(arr[i].id);
      console.log('Gatilho alterado')
      await page.waitForTimeout(10000)
      await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li.bold-blue.nav-item > a')
      await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li.bold-blue.nav-item > a')
      // await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
      // await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
      
      rep.listagem(page, browser, arr, ++i)    
      return;  
      
    } catch (error) {
      console.log(error);
      //return;
      i++
      console.log(i, arr.length)
      if (error == "TypeError: Cannot read properties of undefined (reading 'OS')") {
        rep.reset()
        console.log('reset')
        return;
      } else {
        rep.Zurichmoveis(i)
        browser.close();
        this.reset();
        return;
        // rep.listagem(page, browser, arr = [], i = 0);
      }
      
    }
  }
  
  async carregaOS() {
    var response = await axios
    .post('http://26.50.179.158:8010/consultaBot/', {
      sqlQuery: "SELECT IZ.id,IZ.OS,IZ.Sinistro,IZ.data,@varAG := (SELECT A.A_Data FROM agendamento A WHERE A.A_id_Zurich = IZ.id AND (A.status_id = IZ.status) ORDER BY A.A_id DESC limit 1) as varAG,IF(@varAG IS NULL,(SELECT A.A_Data FROM agendamento A WHERE A.A_id_Zurich = IZ.id ORDER BY A.A_id DESC limit 1),@varAG) as AG,AG.status_id,IZ.status,S.sel_nome,(SELECT D.desc_descricao FROM descricoes D where D.desc_id_zurich = IZ.id AND D.desc_descricao LIKE CONCAT('%', S.sel_nome, '%') order by D.desc_id desc limit 1) as 'descricao' FROM importados_zurich IZ JOIN agendamento AG ON AG.A_id_Zurich = IZ.id left join selects S ON S.sel_id = IZ.status WHERE IZ.id_emp IN (1) AND IZ.gatilho = 0 AND IZ.status = 24 AND AG.status_id = IZ.status AND (STR_TO_DATE(IZ.data,'%d/%m/%Y') >= '2022-12-13' AND STR_TO_DATE(IZ.data,'%d/%m/%Y') <= '2030-12-30') GROUP BY IZ.id; " //AND IZ.OS = '3656032'
    },
    {  //AND IZ.OS = '3679197'
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    }).then(function (response) {
      return response.data;  
    }).catch(function (error) {
      console.error(error);
      
      
    });
    
    return response;
    
  }
  addDays (date,days){
    date.setDate(date.getDate()+days);
    return date.toISOString().slice(0,10).split('-').reverse().join('-')
  }
  
  
  async updateGatilhoSinistros(id) {
    axios.post("http://26.50.179.158:8010/consultaBot/",
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
    setTimeout(this.listagem, 120000)
    console.log('reset')
    
  }
}
const rep = new Zurich();
rep.Zurichmoveis();