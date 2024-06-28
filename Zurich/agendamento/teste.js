const puppeteer = require('puppeteer');
var posts = [];
const axios = require('axios')
const Sequelize = require('sequelize')
var fs = require('fs');
var dados = [];
var iDados = 0


class statusreparo{
  acaoModel = require("../../MYSQL/models/acaoModel"); //Altere para o caminho correto

  constructor() {
      this.acaoModel = new this.acaoModel;
  }
 async importaZurich(i = 0, arr = []) {
    const browser = await puppeteer.launch(
      { 
        headless: false,
        // executablePath: 'C:\\Users\\Micro\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe' 
      }
    );
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768});
    await page.goto('https://zews.zurich.com.br/PortalPrestador/auth/login');
    await page.waitForSelector('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input')
    await page.type("body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input", 'pvdsuporte02');
    await page.type("body > app-root > app-loading > div > app-login > mat-card > app-loading > app-password-input > div > div > input",'suPo{t8I');
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
          
          let SinistroInput = arr[i].OS;
          let AG = arr[i].data_desc;
          let id_emp = arr[i].id_emp
          let status = arr[i].status
          let recolhido = arr[i].prod_recolhido
          let descricao = arr[i].descricao
          console.log(arr.length);
          console.log(i);
          console.log (status)

   
      await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li:nth-child(2) > a')
      await page.waitForTimeout(10000)
      const input = await page.$('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input');
      await input.click({ clickCount: 3 })
      await page.type('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input', SinistroInput)
      await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > button')
      await page.waitForTimeout(5000)
      
      const spanTexts = await page.$$eval('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > div > div > div > app-so-card > mat-card > div.d-flex.flex-row > div.flex-grow-1 > div > div.row > div.col-12.col-md-6.col-xl-3.order-1.order-xl-1.bottom-border.bottom-border-xl.left-border-xl > div > app-so-info-field > app-heading > span:nth-child(2)', elements => elements.map(el => el.innerText))
      let valor = spanTexts[0]
      
      const spanTexts2 = await page.$$eval('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > div > div > div > app-so-card > mat-card > div.d-flex.flex-row > div.flex-grow-1 > div > div.row > div.col-12.col-md-6.col-xl-3.order-2.order-xl-2.bottom-border.bottom-border-xl.left-border-md.left-border-xl > div > app-so-info-field > app-heading > span:nth-child(2)', elements => elements.map(el => el.innerText))
      let valor2 = spanTexts2[0]
      await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > div > div > div > app-so-card > mat-card > div.d-flex.flex-row > div.m-auto.pl-2.ng-star-inserted > button')
      await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > div > div > div > app-so-card > mat-card > div.d-flex.flex-row > div.m-auto.pl-2.ng-star-inserted > button')
      // await page.waitForSelector('#cardBudget > mat-card > div > div.row > div.col-md-1.col-2 > app-collapse-button > button')
      // await page.click('#cardBudget > mat-card > div > div.row > div.col-md-1.col-2 > app-collapse-button > button')
      // await page.waitForTimeout(5000)
      // const spanTexts3 = await page.$$eval('#collapseTechnicalBudget > app-loading > div.card-alignment.ng-star-inserted > div > div.col-12.pl-0 > app-so-technical-budget-list-items > app-loading > div.row.mt-2.ng-star-inserted > div > div', elements => elements.map(el => el.innerText))
      // let valor3 = spanTexts3[0]
      await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-service-order-management > app-loading > div > app-so-info > mat-card > div > div.row > div.col-md-1.col-2 > app-collapse-button > button')
      await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-service-order-management > app-loading > div > app-so-info > mat-card > div > div.row > div.col-md-1.col-2 > app-collapse-button > button')
      await page.waitForTimeout(6000)
      
      const data = await page.$$eval('#cardBudget > mat-card > div > div.row > div.col-md-9.col-7 > mat-card-subtitle', elements => elements.map(el =>el.innerText))
      let dataorc = data[0]
      console.log(dataorc)

      // console.log(valor3)
      console.log(valor)
      console.log(valor2)
      // console.log(SinistroInput)

      // valor3 = valor3.toString().replace("R$", "");
      // valor3 = valor3.toString().replace("Total","");// dados[iDados].OrcApv = dados[iDados].OrcApv.toString().replace("R$", "");
      // valor3 = valor3.toString().replace(".", "");  //dados[iDados].OrcApv = dados[iDados].OrcApv.toString().replace(",", ".") ;dados[iDados].OrcApv = dados[iDados].OrcApv.toString().replace(",", ".");
      // valor3 = valor3.toString().replace(",", ".");
      
      // dados[iDados] = {
      //     OS: SinistroInput.trim(),
      //     OrcApv: valor3.trim(),
      //     tipo: "orcamento",
      //     IdEmpresa:64,
      //     Empresa:"Zurich"
          
      //   }
      //   fs.writeFileSync('indexfinalizacao.json', JSON.stringify(dados).trim());
      //   console.log(dados);

      //   rep.envia()
      //   console.log('Enviado valor')



      // const data = await page.$$eval('#cardBudget > mat-card > div > div.row > div.col-md-9.col-7 > mat-card-subtitle', elements => elements.map(el =>el.innerText))
      // let dataorc = data[0]
      // console.log(dataorc)
 
          switch (status) {


            case 79: //NÃO COBERTO


                console.log("NÃO COBERTO")
                await page.waitForTimeout(5000)


                if (valor == 'Negada' && valor2 == 'Iniciar Reparo') {
                    await rep.updateStatusSinistros79(arr[i].id);
                      await rep.insetDescStatusSinistro79(arr[i].id);
                   
            
                  }if (valor == 'Negada' && valor2 == 'Agendar Devolução') {
                    await rep.updateStatusSinistros79(arr[i].id);
                    await rep.insetDescStatusSinistro79(arr[i].id);
            
                      
                     }if (valor == 'Despesas Aprovadas' && valor2 == 'Iniciar Reparo') {
                        await rep.updateStatusSinistros79(arr[i].id);
                        await rep.insetDescStatusSinistro79(arr[i].id);
            
                     }if (valor == 'Despesas Aprovadas' && valor2 == 'Agendar Devolução') {
            
                        await rep.updateStatusSinistros79(arr[i].id);
                        await rep.insetDescStatusSinistro79(arr[i].id);
            
                    }if (valor == 'Negada' && valor2 == 'Análise do orçamento') {
            
                      await rep.updateStatusSinistros79(arr[i].id);
                      await rep.insetDescStatusSinistro79(arr[i].id);
             
                  }
                break;

                case 18: //REPARO EFETUADO
              


                var Datetoday = new Date().toISOString().slice(0, 10)
                var todayDate = Datetoday.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3/$2/$1');
                console.log(todayDate)
                await page.waitForTimeout(5000)
                if (valor == 'Assinada'){
                 console.log('mudar status')
                 await rep.insetDescStatusSinistro18(arr[i].id);
                 await page.waitForTimeout(3000)
                 await rep.updateStatusSinistros18(arr[i].id);
                 
         
              }
         
              if (valor == 'Concluída'){
                  console.log('entrou aqui')
                  if (valor2 == 'Informar Consumidor'){
                  
                   await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-service-order-management > app-loading > div > app-so-info > mat-card > div > div.row > div.col-md-1.col-2 > app-collapse-button > button')
                   await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-service-order-management > app-loading > div > app-so-info > mat-card > div > div.row > div.col-md-1.col-2 > app-collapse-button > button')
                   await page.waitForTimeout(6000)
                   const spanTexts2 = await page.$$eval('#collapseInfo > app-loading > div.card-alignment.ng-star-inserted > div:nth-child(3) > div.col-12.col-sm-6.col-md-6.col-lg-4.cell.first-cell.bordered-cell.n-oc > app-info-field > div > div:nth-child(2) > span', elements => elements.map (el => el.innerText))
                   let Nome = spanTexts2[0]
                   console.log(Nome) 
         
                   const spanTexts3 = await page.$$eval('#collapseInfo > app-loading > div.card-alignment.ng-star-inserted > div:nth-child(5) > div.col-12.col-lg-3.cell.bordered-cell.last-cell > app-info-field > div > div:nth-child(2) > span', elements => elements.map (el => el.innerText))
                   let CEP = spanTexts3[0]
                   console.log(CEP) 
                   
                   const spanTexts4 = await page.$$eval('#collapseInfo > app-loading > div.card-alignment.ng-star-inserted > div:nth-child(4) > div > div > div.col-12.col-sm-6.col-md-6.col-lg-2.cell.first-cell.bordered-cell.n-oc.border-bottom > app-info-field > div > div:nth-child(2) > span', elements => elements.map (el => el.innerText))
                   let TEL = spanTexts4[0]
                   console.log(TEL)
                   
                   const spanTexts5 = await page.$$eval('#collapseInfo > app-loading > div.card-alignment.ng-star-inserted > div:nth-child(5) > div.col-12.col-sm-5.col-md-5.col-lg-3.cell.first-cell.bordered-cell > app-info-field > div > div:nth-child(2) > span', elements => elements.map (el => el.innerText))
                   let RUA = spanTexts5[0]
                   console.log(RUA)
         
                   const spanTexts6 = await page.$$eval('#collapseInfo > app-loading > div.card-alignment.ng-star-inserted > div:nth-child(5) > div.col-12.col-sm-2.col-md-2.col-lg-2.cell.bordered-cell > app-info-field > div > div:nth-child(2) > span', elements => elements.map (el => el.innerText))
                   let N = spanTexts6[0]
                   console.log(N)
         
                   const spanTexts7 = await page.$$eval('#collapseInfo > app-loading > div.card-alignment.ng-star-inserted > div:nth-child(6) > div.col-12.col-sm-6.col-md-6.col-lg-2.cell.first-cell.bordered-cell.border-bottom > app-info-field > div > div:nth-child(2) > span', elements => elements.map (el => el.innerText))
                   let BAIRRO = spanTexts7[0]
                   console.log(BAIRRO)
         
         
         
         
         
                   await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div.col-md-6.col-sm-12.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group > input')
                     await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div.col-md-6.col-sm-12.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group > input')
                     await page.waitForTimeout(6000)
                     await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div.col-md-6.col-sm-12.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group', dataorc)
                     await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
                     await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
                     await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a')
                     await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a')
                     await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(3) > div > div > button')
                     await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(3) > div > div > button')
                     
                     await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(2) > div > app-boolean-dropdown-field > div.btn-group.d-flex.flex-column')
                     await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(2) > div > app-boolean-dropdown-field > div.btn-group.d-flex.flex-column')
                     await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(2) > div > app-boolean-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(1)')
                     await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(2) > div > app-boolean-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(1)')
                     await page.waitForTimeout(2000)
                     await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > div > div:nth-child(1) > app-text-input-field > div.form-group > input')
                     await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > div > div:nth-child(1) > app-text-input-field > div.form-group > input')
                     await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > div > div:nth-child(1) > app-text-input-field > div.form-group > input', Nome)
                     await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group > input')
                     await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group > input')
                       await page.waitForTimeout(2000)
                       await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group > input', dataorc)
                      
                       await page.waitForTimeout(2000)
                       await page.keyboard.down('Tab')
                       await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group > input', '80')
                       
                       
                       await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(1) > div:nth-child(1) > div.form-group > input')
                       const input = await page.$('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(1) > div:nth-child(1) > div.form-group > input');
                       await input.click({ clickCount: 3 })
                       await page.waitForTimeout(2000)
                       await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(1) > div:nth-child(1) > div.form-group > input', CEP)
                       
                       const input1 = await page.$('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(1) > div.col-12.col-sm-12.col-md-4.col-lg-4.offset-md-4.offset-lg-4.value > div.form-group > input');
                       await input1.click({ clickCount: 3 })
                       await page.waitForTimeout(2000)
                       await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(1) > div.col-12.col-sm-12.col-md-4.col-lg-4.offset-md-4.offset-lg-4.value > div.form-group > input', TEL)
                       
                       const input2 = await page.$('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(2) > div.col-12.col-sm-12.col-md-8.col-lg-8.value > div > app-text-input-field:nth-child(1) > div.form-group > input');
                       await input2.click({ clickCount: 3 })
                       await page.waitForTimeout(2000)
                       await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(2) > div.col-12.col-sm-12.col-md-8.col-lg-8.value > div > app-text-input-field:nth-child(1) > div.form-group > input', RUA)
                       
                       const input3 = await page.$('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(2) > div.col-12.col-sm-12.col-md-8.col-lg-8.value > div > app-text-input-field:nth-child(3)');
                       await input3.click({ clickCount: 3 })
                       await page.waitForTimeout(2000)
                       await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(2) > div.col-12.col-sm-12.col-md-8.col-lg-8.value > div > app-text-input-field:nth-child(3)', N)
                       const input4 = await page.$('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(2) > div.col-12.col-sm-12.col-md-4.col-lg-4.value > app-text-input-field > div.form-group > input');
                       await input4.click({ clickCount: 3 })
                       await page.waitForTimeout(2000)
                       await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(2) > div.col-12.col-sm-12.col-md-4.col-lg-4.value > app-text-input-field > div.form-group > input', BAIRRO)
                       
                       await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(3) > div > div > button')
                       await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(3) > div > div > button')
                       await page.waitForTimeout(5000)
         
                         await rep.insetDescStatusSinistro18(arr[i].id);
                         await page.waitForTimeout(3000)
                         await rep.updateStatusSinistros18(arr[i].id);
                    
         
                  }
                  if (valor2 == 'Assinar OS'){
                   console.log('Assinar OS')
                 await page.waitForSelector('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input')
                 await page.click('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input')
                 await page.type('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input', dataorc) 
                 await page.waitForSelector('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
                 await page.click('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
                 await page.waitForSelector('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a')
                 await page.click('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a')
                 await page.waitForSelector('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.value.d-flex.justify-content-end.ng-star-inserted > button')
                 await page.click('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.value.d-flex.justify-content-end.ng-star-inserted > button')
                 await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-service-order-management > app-loading > div > app-so-info > mat-card > div > div.row > div.col-md-1.col-2 > app-collapse-button > button')
                 await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-service-order-management > app-loading > div > app-so-info > mat-card > div > div.row > div.col-md-1.col-2 > app-collapse-button > button')
                 await page.waitForTimeout(6000)
                 const spanTexts2 = await page.$$eval('#collapseInfo > app-loading > div.card-alignment.ng-star-inserted > div:nth-child(3) > div.col-12.col-sm-6.col-md-6.col-lg-4.cell.first-cell.bordered-cell.n-oc > app-info-field > div > div:nth-child(2) > span', elements => elements.map (el => el.innerText))
                 let Nome = spanTexts2[0]
                 console.log(Nome) 
         
                 const spanTexts3 = await page.$$eval('#collapseInfo > app-loading > div.card-alignment.ng-star-inserted > div:nth-child(5) > div.col-12.col-lg-3.cell.bordered-cell.last-cell > app-info-field > div > div:nth-child(2) > span', elements => elements.map (el => el.innerText))
                 let CEP = spanTexts3[0]
                 console.log(CEP) 
                 
                 const spanTexts4 = await page.$$eval('#collapseInfo > app-loading > div.card-alignment.ng-star-inserted > div:nth-child(4) > div > div > div.col-12.col-sm-6.col-md-6.col-lg-2.cell.first-cell.bordered-cell.n-oc.border-bottom > app-info-field > div > div:nth-child(2) > span', elements => elements.map (el => el.innerText))
                 let TEL = spanTexts4[0]
                 console.log(TEL)
                 
                 const spanTexts5 = await page.$$eval('#collapseInfo > app-loading > div.card-alignment.ng-star-inserted > div:nth-child(5) > div.col-12.col-sm-5.col-md-5.col-lg-3.cell.first-cell.bordered-cell > app-info-field > div > div:nth-child(2) > span', elements => elements.map (el => el.innerText))
                 let RUA = spanTexts5[0]
                 console.log(RUA)
         
                 const spanTexts6 = await page.$$eval('#collapseInfo > app-loading > div.card-alignment.ng-star-inserted > div:nth-child(5) > div.col-12.col-sm-2.col-md-2.col-lg-2.cell.bordered-cell > app-info-field > div > div:nth-child(2) > span', elements => elements.map (el => el.innerText))
                 let N = spanTexts6[0]
                 console.log(N)
         
                 const spanTexts7 = await page.$$eval('#collapseInfo > app-loading > div.card-alignment.ng-star-inserted > div:nth-child(6) > div.col-12.col-sm-6.col-md-6.col-lg-2.cell.first-cell.bordered-cell.border-bottom > app-info-field > div > div:nth-child(2) > span', elements => elements.map (el => el.innerText))
                 let BAIRRO = spanTexts7[0]
                 console.log(BAIRRO)
         
         
         
         
         
                 await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div.col-md-6.col-sm-12.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group > input')
                   await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div.col-md-6.col-sm-12.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group > input')
                   await page.waitForTimeout(6000)
                   await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div.col-md-6.col-sm-12.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group', dataorc)
                   await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
                   await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
                   await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a')
                   await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a')
                   await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(3) > div > div > button')
                   await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(3) > div > div > button')
                   
                   await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(2) > div > app-boolean-dropdown-field > div.btn-group.d-flex.flex-column')
                   await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(2) > div > app-boolean-dropdown-field > div.btn-group.d-flex.flex-column')
                   await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(2) > div > app-boolean-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(1)')
                   await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(2) > div > app-boolean-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(1)')
                   await page.waitForTimeout(2000)
                   await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > div > div:nth-child(1) > app-text-input-field > div.form-group > input')
                   await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > div > div:nth-child(1) > app-text-input-field > div.form-group > input')
                   await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > div > div:nth-child(1) > app-text-input-field > div.form-group > input', Nome)
                   await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group > input')
                   await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group > input')
                     await page.waitForTimeout(2000)
                     await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group > input', dataorc)
                    
                     await page.waitForTimeout(2000)
                     await page.keyboard.down('Tab')
                     await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group > input', '80')
                     
                     
                     await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(1) > div:nth-child(1) > div.form-group > input')
                     const input = await page.$('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(1) > div:nth-child(1) > div.form-group > input');
                     await input.click({ clickCount: 3 })
                     await page.waitForTimeout(2000)
                     await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(1) > div:nth-child(1) > div.form-group > input', CEP)
                     
                     const input1 = await page.$('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(1) > div.col-12.col-sm-12.col-md-4.col-lg-4.offset-md-4.offset-lg-4.value > div.form-group > input');
                     await input1.click({ clickCount: 3 })
                     await page.waitForTimeout(2000)
                     await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(1) > div.col-12.col-sm-12.col-md-4.col-lg-4.offset-md-4.offset-lg-4.value > div.form-group > input', TEL)
                     
                     const input2 = await page.$('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(2) > div.col-12.col-sm-12.col-md-8.col-lg-8.value > div > app-text-input-field:nth-child(1) > div.form-group > input');
                     await input2.click({ clickCount: 3 })
                     await page.waitForTimeout(2000)
                     await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(2) > div.col-12.col-sm-12.col-md-8.col-lg-8.value > div > app-text-input-field:nth-child(1) > div.form-group > input', RUA)
                     
                     const input3 = await page.$('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(2) > div.col-12.col-sm-12.col-md-8.col-lg-8.value > div > app-text-input-field:nth-child(3)');
                     await input3.click({ clickCount: 3 })
                     await page.waitForTimeout(2000)
                     await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(2) > div.col-12.col-sm-12.col-md-8.col-lg-8.value > div > app-text-input-field:nth-child(3)', N)
                     const input4 = await page.$('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(2) > div.col-12.col-sm-12.col-md-4.col-lg-4.value > app-text-input-field > div.form-group > input');
                     await input4.click({ clickCount: 3 })
                     await page.waitForTimeout(2000)
                     await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(2) > div.col-12.col-sm-12.col-md-4.col-lg-4.value > app-text-input-field > div.form-group > input', BAIRRO)
                     
                     await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(3) > div > div > button')
                     await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(3) > div > div > button')
                     await page.waitForTimeout(5000)
             
               
               
         
                     await rep.insetDescStatusSinistro18(arr[i].id);
                     await page.waitForTimeout(3000)
                     await rep.updateStatusSinistros18(arr[i].id);
                  
           }else {
                 
               
               console.log('entrou no else')
               
                 await page.waitForSelector('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input')
                 await page.click('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input') 
                 await page.type('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input', dataorc)

                 await page.waitForSelector('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
                 await page.click('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
                 await page.waitForSelector('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a')
                 await page.click('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a')
                 await page.waitForSelector('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.value.d-flex.justify-content-end.ng-star-inserted > button')
                 await page.click('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.value.d-flex.justify-content-end.ng-star-inserted > button')
                 await page.setCacheEnabled(false);
                 await page.reload({waitUntil: 'networkidle2'});
                 
                 console.log('INFORMAR CONSUMIDOR')
         
         
         
                 
                 await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-service-order-management > app-loading > div > app-so-info > mat-card > div > div.row > div.col-md-1.col-2 > app-collapse-button > button')
                 await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-service-order-management > app-loading > div > app-so-info > mat-card > div > div.row > div.col-md-1.col-2 > app-collapse-button > button')
                 await page.waitForTimeout(6000)
                 const spanTexts2 = await page.$$eval('#collapseInfo > app-loading > div.card-alignment.ng-star-inserted > div:nth-child(3) > div.col-12.col-sm-6.col-md-6.col-lg-4.cell.first-cell.bordered-cell.n-oc > app-info-field > div > div:nth-child(2) > span', elements => elements.map (el => el.innerText))
                 let Nome = spanTexts2[0]
                 console.log(Nome) 
         
                 const spanTexts3 = await page.$$eval('#collapseInfo > app-loading > div.card-alignment.ng-star-inserted > div:nth-child(5) > div.col-12.col-lg-3.cell.bordered-cell.last-cell > app-info-field > div > div:nth-child(2) > span', elements => elements.map (el => el.innerText))
                 let CEP = spanTexts3[0]
                 console.log(CEP) 
                 
                 const spanTexts4 = await page.$$eval('#collapseInfo > app-loading > div.card-alignment.ng-star-inserted > div:nth-child(4) > div > div > div.col-12.col-sm-6.col-md-6.col-lg-2.cell.first-cell.bordered-cell.n-oc.border-bottom > app-info-field > div > div:nth-child(2) > span', elements => elements.map (el => el.innerText))
                 let TEL = spanTexts4[0]
                 console.log(TEL)
                 
                 const spanTexts5 = await page.$$eval('#collapseInfo > app-loading > div.card-alignment.ng-star-inserted > div:nth-child(5) > div.col-12.col-sm-5.col-md-5.col-lg-3.cell.first-cell.bordered-cell > app-info-field > div > div:nth-child(2) > span', elements => elements.map (el => el.innerText))
                 let RUA = spanTexts5[0]
                 console.log(RUA)
         
                 const spanTexts6 = await page.$$eval('#collapseInfo > app-loading > div.card-alignment.ng-star-inserted > div:nth-child(5) > div.col-12.col-sm-2.col-md-2.col-lg-2.cell.bordered-cell > app-info-field > div > div:nth-child(2) > span', elements => elements.map (el => el.innerText))
                 let N = spanTexts6[0]
                 console.log(N)
         
                 const spanTexts7 = await page.$$eval('#collapseInfo > app-loading > div.card-alignment.ng-star-inserted > div:nth-child(6) > div.col-12.col-sm-6.col-md-6.col-lg-2.cell.first-cell.bordered-cell.border-bottom > app-info-field > div > div:nth-child(2) > span', elements => elements.map (el => el.innerText))
                 let BAIRRO = spanTexts7[0]
                 console.log(BAIRRO)
         
         
         
         
         
                 await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div.col-md-6.col-sm-12.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group > input')
                   await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div.col-md-6.col-sm-12.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group > input')
                   await page.waitForTimeout(6000)
                   await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div.col-md-6.col-sm-12.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group', dataorc)
                   await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
                   await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
                   await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a')
                   await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a')
                   await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(3) > div > div > button')
                   await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(3) > div > div > button')
                   
                   await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(2) > div > app-boolean-dropdown-field > div.btn-group.d-flex.flex-column')
                   await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(2) > div > app-boolean-dropdown-field > div.btn-group.d-flex.flex-column')
                   await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(2) > div > app-boolean-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(1)')
                   await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(2) > div > app-boolean-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(1)')
                   await page.waitForTimeout(2000)
                   await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > div > div:nth-child(1) > app-text-input-field > div.form-group > input')
                   await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > div > div:nth-child(1) > app-text-input-field > div.form-group > input')
                   await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > div > div:nth-child(1) > app-text-input-field > div.form-group > input', Nome)
                   await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group > input')
                   await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group > input')
                     await page.waitForTimeout(2000)
                     await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group > input', dataorc)
                    
                     await page.waitForTimeout(2000)
                     await page.keyboard.down('Tab')
                     await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group > input', '80')
                     
                     
                     await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(1) > div:nth-child(1) > div.form-group > input')
                     const input = await page.$('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(1) > div:nth-child(1) > div.form-group > input');
                     await input.click({ clickCount: 3 })
                     await page.waitForTimeout(2000)
                     await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(1) > div:nth-child(1) > div.form-group > input', CEP)
                     
                     const input1 = await page.$('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(1) > div.col-12.col-sm-12.col-md-4.col-lg-4.offset-md-4.offset-lg-4.value > div.form-group > input');
                     await input1.click({ clickCount: 3 })
                     await page.waitForTimeout(2000)
                     await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(1) > div.col-12.col-sm-12.col-md-4.col-lg-4.offset-md-4.offset-lg-4.value > div.form-group > input', TEL)
                     
                     const input2 = await page.$('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(2) > div.col-12.col-sm-12.col-md-8.col-lg-8.value > div > app-text-input-field:nth-child(1) > div.form-group > input');
                     await input2.click({ clickCount: 3 })
                     await page.waitForTimeout(2000)
                     await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(2) > div.col-12.col-sm-12.col-md-8.col-lg-8.value > div > app-text-input-field:nth-child(1) > div.form-group > input', RUA)
                     
                     const input3 = await page.$('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(2) > div.col-12.col-sm-12.col-md-8.col-lg-8.value > div > app-text-input-field:nth-child(3)');
                     await input3.click({ clickCount: 3 })
                     await page.waitForTimeout(2000)
                     await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(2) > div.col-12.col-sm-12.col-md-8.col-lg-8.value > div > app-text-input-field:nth-child(3)', N)
                     const input4 = await page.$('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(2) > div.col-12.col-sm-12.col-md-4.col-lg-4.value > app-text-input-field > div.form-group > input');
                     await input4.click({ clickCount: 3 })
                     await page.waitForTimeout(2000)
                     await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > app-so-scheduling-address > div:nth-child(2) > div.col-12.col-sm-12.col-md-4.col-lg-4.value > app-text-input-field > div.form-group > input', BAIRRO)
                     
                     await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(3) > div > div > button')
                     await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(3) > div > div > button')
                     await page.waitForTimeout(5000)
             
               
               
         
                     await rep.insetDescStatusSinistro18(arr[i].id);
                     await page.waitForTimeout(3000)
                     await rep.updateStatusSinistros18(arr[i].id);
                  }
             
             }
              
             
               if (valor == 'Em Execução') {
                 await page.waitForSelector('#collapseStartRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.value.d-flex.justify-content-end.ng-star-inserted > button')
                 await page.click ('#collapseStartRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.value.d-flex.justify-content-end.ng-star-inserted > button')
                 await page.waitForSelector('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input')
                 await page.click('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input') 
                 await page.type('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input', dataorc)
                 await page.waitForSelector('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
                 await page.click('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
                 await page.waitForTimeout(2000)
                 await page.waitForSelector('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a')
                 await page.click('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a')
                 await page.waitForSelector('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.value.d-flex.justify-content-end.ng-star-inserted > button')
                 await page.click('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.value.d-flex.justify-content-end.ng-star-inserted > button')
                 await page.waitForTimeout(5000)
                 await page.setCacheEnabled(false);
                 await page.reload({waitUntil: 'networkidle2'});
                 await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(3) > div > div > button')
                 await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(3) > div > div > button')
                 await page.waitForSelector('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input')
                 await page.click('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input') 
                 await page.type('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input', dataorc)
                 await page.click('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
                 await page.waitForSelector('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a')
                 await page.click('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a')
                 await page.waitForSelector('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.value.d-flex.justify-content-end.ng-star-inserted > button')
                 await page.click('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.value.d-flex.justify-content-end.ng-star-inserted > button')
                 
                 await page.waitForTimeout(2000)
                 
                   await rep.insetDescStatusSinistro18(arr[i].id);
                   await page.waitForTimeout(3000)
                   await rep.updateStatusSinistros18(arr[i].id);
                   console.log('finalizou')
             
               }
                 break;

            case 78: //SEM DEFEITO
                        console.log("SEM DEFEITO")


                        if (valor == 'Despesas Aprovadas' && valor2 == 'Agendar Devolução') {
                            await rep.updateStatusSinistros78(arr[i].id);
                            await rep.insetDescStatusSinistro78(arr[i].id);
                      
                           } else if (valor == 'Em Execução') {
                            await page.waitForTimeout(3000)
                            const data = await page.$$eval('#cardDiagnosis > mat-card > div > div.row > div.col-md-9.col-7 > mat-card-subtitle', elements => elements.map(el =>el.innerText))
                            let dataorc = data[0]
                            console.log(dataorc)
                            await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > div > div > div > app-so-card > mat-card > div.d-flex.flex-row > div.m-auto.pl-2.ng-star-inserted > button')
                            await page.waitForSelector('#collapseStartRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.value.d-flex.justify-content-end.ng-star-inserted > button')
                            await page.click ('#collapseStartRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.value.d-flex.justify-content-end.ng-star-inserted > button')
                            await page.waitForSelector('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input')
                            await page.click('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input') 
                            await page.type('#collapseConclusion > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input', dataorc)
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
                            await page.type('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column > app-date-input-field > div > div > div.input-group.form-group > input', dataorc)
                            await page.click('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
                            await page.waitForSelector('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(2)')
                            await page.click('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(2)')
                            await page.waitForSelector('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.value.d-flex.justify-content-end.ng-star-inserted > button')
                            await page.click('#collapseFinishRepair > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div > div > div.col-12.value.d-flex.justify-content-end.ng-star-inserted > button')
                            await page.waitForTimeout(3000)
                            await rep.updateStatusSinistros78(arr[i].id);
                            await rep.insetDescStatusSinistro78(arr[i].id);
                        
                          }
                break;
           

        }                   
    rep.listagem(page, browser, arr, ++i)
    } catch(error) {
      console.log(error);
      //return;
      i++
      console.log(i, arr.length)
      if(error == "TypeError: Cannot read properties of undefined (reading 'OS')"){ 
        rep.reset()
        console.log('reset')
        await browser.close()
      }else{
        rep.importaZurich(i)
        await browser.close()
      }
    }
  }



  envia() {
    console.log('enviou os dados')
    var content = JSON.parse(fs.readFileSync("indexfinalizacao.json"));
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
      query: `SELECT 
      IZ.id,
      IZ.OS,
      IZ.id_emp,
      IZ.Sinistro,
      IZ.data,
      AG.status_id,
      IZ.status,
      IZ.prod_recolhido,
      (select desc_descricao from descricoes where desc_id_zurich = IZ.id and desc_descricao like '% Data do agendamento%' order by desc_id desc limit 1) as data_desc,
      COALESCE(MAX(A.A_Data), MAX(AG.A_Data)) as varAG,
      S.sel_nome,
      (SELECT D.desc_descricao 
       FROM descricoes D 
       WHERE D.desc_id_zurich = IZ.id 
         AND (D.desc_descricao LIKE CONCAT('%', 'Endereço do técnico', '%') OR D.desc_descricao LIKE CONCAT('%', 'Produto se encontra no endereço do cliente.', '%')) 
       ORDER BY D.desc_id DESC 
       LIMIT 1) as 'descricao'
  FROM importados_zurich IZ
  LEFT JOIN selects S ON S.sel_id = IZ.status 
  LEFT JOIN agendamento AG ON AG.A_id_Zurich = IZ.id AND AG.status_id = IZ.status
  LEFT JOIN agendamento A ON A.A_id_Zurich = IZ.id
  WHERE IZ.id_emp IN (64,71,111,146,1)
        AND taxa_flet = 1
        AND IZ.status IN (18)
        AND CHAR_LENGTH(IZ.OS) < 9
       GROUP BY IZ.id;
    `,
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
    
      async insetDescStatusSinistro79(id) {
        axios.post("https://gsplanaltec.com/GerenciamentoServicos/APIControle/insereDescStatusAtualizado", { id: id, status: 87 }, {
          headers: { "Content-Type": "application/json; charset=UTF-8" },
        }).then(function(response) {
          var retorno =  response.data;
          console.log(retorno)
        }).catch(function (error) {
          console.error(error);
        });
      }
    
      async updateStatusSinistros79(id) {
        axios.post("https://gsplanaltec.com/consultaBot/",
        {
          sqlQuery:`UPDATE importados_zurich SET status = 87, AtivoInativo = 4 WHERE id IN (${id})`
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

      async insetDescStatusSinistro18(id) {
        axios.post("https://gsplanaltec.com/GerenciamentoServicos/APIControle/insereDescStatusAtualizado", { id: id, status: 64 }, {
          headers: { "Content-Type": "application/json; charset=UTF-8" },
        }).then(function(response) {
          var retorno =  response.data;
          console.log(retorno)
        }).catch(function (error) {
          console.error(error);
        });
      }
    
      async updateStatusSinistros18(id) {
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

      async insetDescStatusSinistro78(id) {
        axios.post("https://gsplanaltec.com/GerenciamentoServicos/APIControle/insereDescStatusAtualizado", { id: id, status: 83 }, {
          headers: { "Content-Type": "application/json; charset=UTF-8" },
        }).then(function(response) {
          var retorno =  response.data;
          console.log(retorno)
        }).catch(function (error) {
          console.error(error);
        });
      }
      
      async updateStatusSinistros78(id) {
        axios.post("https://gsplanaltec.com/consultaBot/",
        {
          sqlQuery:`UPDATE importados_zurich SET status = 83, AtivoInativo = 4 WHERE id IN (${id})`
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
        setTimeout(rep.importaZurich, 3000)
        console.log('reset')
      }
      
    }
const rep = new statusreparo;
rep.importaZurich();