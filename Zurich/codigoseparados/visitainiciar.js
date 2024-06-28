const puppeteer = require('puppeteer');
const axios = require('axios')
var fs = require('fs');
var posts = [];
var dados = [];
const Sequelize = require('sequelize')

class visita {
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
    // LOGIN
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768});
    await page.goto('https://zews.zurich.com.br/PortalPrestador/auth/login');
    await page.waitForSelector('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input')
    await page.type("body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input", 'pvdsupl');
    await page.type("body > app-root > app-loading > div > app-login > mat-card > app-loading > app-password-input > div > div > input",'suPo!t0L');
    await page.waitForTimeout(2500)
    await page.click('body > app-root > app-loading > div > app-login > mat-card > app-loading > button');
    await page.waitForTimeout(2500)
        
    await page.waitForTimeout(5000)
    posts = await teste.carregaOS();
    await teste.listagem(page, browser, posts, i)
    }
    
    async listagem(page,browser, arr = [], i = 0){
    try{
        console.log(arr);
        await page.waitForTimeout(5000)
  
        let osInput = arr[i].OS
        let DataInput =arr[i].AG
    
      
        console.log(arr.length);
        console.log(i);
        console.log(osInput);
        console.log(DataInput)
       
        
        await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li:nth-child(2) > a')
        await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li:nth-child(2) > a')
        await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input')
            const inputinicio = await page.$('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input')
            await inputinicio.click({ clickCount: 3})
        
            await page.type('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input', osInput);
            await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > button')
            await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > button');
           
            await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > div > div > div > app-so-card > mat-card > div.d-flex.flex-row > div.m-auto.pl-2.ng-star-inserted > button')
            await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > div > div > div > app-so-card > mat-card > div.d-flex.flex-row > div.m-auto.pl-2.ng-star-inserted > button')

            await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-service-order-management > app-loading > div > app-so-card > mat-card > div > div.flex-grow-1 > div > div.row > div.col-12.col-md-6.col-xl-3.order-2.order-xl-2.bottom-border.bottom-border-xl.left-border-md.left-border-xl > div > app-so-info-field > app-heading > span:nth-child(2)')
            const spanTexts = await page.$$eval('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-service-order-management > app-loading > div > app-so-card > mat-card > div > div.flex-grow-1 > div > div.row > div.col-12.col-md-6.col-xl-3.order-2.order-xl-2.bottom-border.bottom-border-xl.left-border-md.left-border-xl > div > app-so-info-field > app-heading > span:nth-child(2)', elements => elements.map (el => el.innerText))
            let Etapa = spanTexts[0]
            console.log(Etapa)
        
            const spanTexts1 = await page.$$eval('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-service-order-management > app-loading > div > app-so-card > mat-card > div > div.flex-grow-1 > div > div.row > div.col-12.col-md-6.col-xl-3.order-1.order-xl-1.bottom-border.bottom-border-xl.left-border-xl > div > app-so-info-field > app-heading > span:nth-child(2)', elements => elements.map (el => el.innerText))
            let Status = spanTexts1[0]
            console.log(Status)

            var Datetoday = new Date().toISOString().slice(0, 10)
            var todayDate = Datetoday.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3/$2/$1');
            console.log(todayDate)
            
            if(Status == 'Nova' && Etapa == 'Iniciar OS') {
               
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
                                 //inciciar OS
              await page.waitForSelector('#collapseStartAdd > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > app-start-add > div > div > div > div:nth-child(4) > app-dropdown-field > div.btn-group.d-flex.flex-column')
              await page.click('#collapseStartAdd > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > app-start-add > div > div > div > div:nth-child(4) > app-dropdown-field > div.btn-group.d-flex.flex-column')
              await page.waitForSelector('#collapseStartAdd > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > app-start-add > div > div > div > div:nth-child(4) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(2)')
              await page.click('#collapseStartAdd > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > app-start-add > div > div > div > div:nth-child(4) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(2)')
              await page.waitForSelector('#collapseStartAdd > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > app-start-add > div > div > div > div.col-12.value.d-flex.justify-content-end.ng-star-inserted > button')
              await page.click('#collapseStartAdd > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > app-start-add > div > div > div > div.col-12.value.d-flex.justify-content-end.ng-star-inserted > button')
         
              await page.waitForTimeout(5000) 

                                    //agendar retirada
             console.log('agendar retirada')
         
             await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div.col-md-6.col-sm-12.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group > input')
             await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div.col-md-6.col-sm-12.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group > input')
             await page.waitForTimeout(6000)
             await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div.col-md-6.col-sm-12.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group', todayDate)
             await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
             await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
             await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(2)')
             await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(2)')
                 console.log('passou')
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
               await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group > input', todayDate )
              
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
               await page.waitForSelector('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column.ng-star-inserted > app-date-input-field > div > div')
               await page.click('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column.ng-star-inserted > app-date-input-field > div > div')
               await page.type('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column.ng-star-inserted > app-date-input-field > div > div', todayDate)
               await page.waitForSelector('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
               await page.click('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
               await page.waitForSelector('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(2)')
               await page.click('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(2)')
               await page.waitForSelector('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(4) > app-text-input-field > div.form-group > input')
               await page.click('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(4) > app-text-input-field > div.form-group > input')
               await page.type('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(4) > app-text-input-field > div.form-group > input', '000')
               await page.waitForTimeout(2000)
               await page.waitForSelector('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div.col-md-6.col-sm-12.ng-star-inserted > div > div > button:nth-child(2)')
               await page.click('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div.col-md-6.col-sm-12.ng-star-inserted > div > div > button:nth-child(2)')
               console.log('feito')
               await page.waitForTimeout(5000)
             //  
               
            
              

           console.log('@@@@@')
           await page.waitForTimeout(5000)

               
                               
                  
            }

            if(Status == 'Nova'  && Etapa == 'Agendar Retirada'){ 

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
          await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div.col-md-6.col-sm-12.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group', todayDate)
          await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
          await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
          await page.waitForSelector('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(2)')
          await page.click('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(2)')
              console.log('passou')
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
            await page.type('#collapseScheduling > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div:nth-child(2) > div > app-so-scheduling-with-contact > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.mb-sm-16 > app-date-input-field > div > div > div.input-group.form-group > input', todayDate )
           
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


                ///RETIRAR PRODUTO

                await page.waitForSelector('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column.ng-star-inserted > app-date-input-field > div > div')
                await page.click('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column.ng-star-inserted > app-date-input-field > div > div')
                await page.type('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column.ng-star-inserted > app-date-input-field > div > div', todayDate)
                await page.waitForSelector('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
                await page.click('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
                await page.waitForSelector('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(2)')
                await page.click('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(2)')
                await page.waitForSelector('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(4) > app-text-input-field > div.form-group > input')
                await page.click('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(4) > app-text-input-field > div.form-group > input')
                await page.type('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(4) > app-text-input-field > div.form-group > input', '000')
                await page.waitForTimeout(2000)
                await page.waitForSelector('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div.col-md-6.col-sm-12.ng-star-inserted > div > div > button:nth-child(2)')
                await page.click('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div.col-md-6.col-sm-12.ng-star-inserted > div > div > button:nth-child(2)')
                console.log('feito')
                await page.waitForTimeout(5000)
              //  
                
            
               
               

            console.log('@@@@@')
            await page.waitForTimeout(5000)
          }

          if(Status == 'Nova'  && Etapa == 'Retirar Produto'){

              await page.waitForSelector('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column.ng-star-inserted > app-date-input-field > div > div')
              await page.click('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column.ng-star-inserted > app-date-input-field > div > div')
              await page.type('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column.ng-star-inserted > app-date-input-field > div > div', todayDate)
              await page.waitForSelector('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
              await page.click('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
              await page.waitForSelector('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(2)')
              await page.click('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(2)')
              await page.waitForTimeout(2000)
              await page.waitForSelector('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(4) > app-text-input-field > div.form-group > input')
              await page.click('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(4) > app-text-input-field > div.form-group > input')
              await page.type('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(4) > app-text-input-field > div.form-group > input', '000')
              await page.waitForTimeout(2000)
              await page.waitForSelector('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div.col-md-6.col-sm-12.ng-star-inserted > div > div > button:nth-child(2)')
              await page.click('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div.col-md-6.col-sm-12.ng-star-inserted > div > div > button:nth-child(2)')
              console.log('feito')
              await page.waitForSelector('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div.col-md-6.col-sm-12.ng-star-inserted > div > div > button:nth-child(2)')
              await page.click('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div.col-md-6.col-sm-12.ng-star-inserted > div > div > button:nth-child(2)')
              
              await page.waitForTimeout(10000)
            
              if (Status == 'Nova' && Etapa == 'Receber Produto'){
                await page.waitForSelector('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column.ng-star-inserted > app-date-input-field > div > div')
                await page.click('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column.ng-star-inserted > app-date-input-field > div > div')
                await page.type('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div.col-12.col-sm-12.col-md-6.col-lg-6.value.d-flex.flex-column.ng-star-inserted > app-date-input-field > div > div', todayDate)
                await page.waitForSelector('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
                await page.click('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column')
                await page.waitForSelector('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(2)')
                await page.click('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(2) > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(2)')
                await page.waitForTimeout(2000)
                await page.waitForSelector('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(4) > app-text-input-field > div.form-group > input')
                await page.click('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(4) > app-text-input-field > div.form-group > input')
                await page.type('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div:nth-child(1) > div > div:nth-child(4) > app-text-input-field > div.form-group > input', '000')
                await page.waitForTimeout(2000)
                await page.waitForSelector('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div.col-md-6.col-sm-12.ng-star-inserted > div > div > button:nth-child(2)')
                await page.click('#collapseProductWithdraw > app-loading > div.colored-card-background.card-alignment.ng-star-inserted > div > div.col-md-6.col-sm-12.ng-star-inserted > div > div > button:nth-child(2)')

              }
      
             
          }
      await page.waitForTimeout(10000)
      teste.listagem(page, browser, arr, ++i)
    } catch(error) {
        console.log(error);
        //return;
        i++
        console.log(i, arr.length)
        if(error == "TypeError: Cannot read properties of undefined (reading 'OS')"){ 
        teste.reset()
        console.log('reset')
        await browser.close()
    }else{
        this.importaZurich(i)
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
      WHERE IZ.id_emp IN (64,71,111,146,1)
      AND taxa_flet = 0
      AND CHAR_LENGTH(IZ.OS) < 9
        AND IZ.status in (69,167,15)
      GROUP BY IZ.id`,
        tipoQuery: { type: Sequelize.SELECT }
      });
          
      return response[0];
    }

    // async carregaOS(){
    //   var response = await axios
    //       .post('https://gsplanaltec.com/consultaBot/', {
    //         sqlQuery: `SELECT 
    //         IZ.id,
    //         IZ.OS,
    //         IZ.Sinistro,
    //         IZ.data,
    //         @varAG := (SELECT A.A_Data FROM agendamento A WHERE A.A_id_Zurich = IZ.id AND (A.status_id = IZ.status) ORDER BY A.A_id DESC limit 1) as varAG,
    //         IF(@varAG IS NULL, (SELECT A.A_Data FROM agendamento A WHERE A.A_id_Zurich = IZ.id ORDER BY A.A_id DESC limit 1), @varAG) as AG,
    //         IZ.status,
    //         S.sel_nome,
    //         (SELECT D.desc_descricao FROM descricoes D where D.desc_id_zurich = IZ.id AND D.desc_descricao LIKE CONCAT('%', S.sel_nome, '%') order by D.desc_id desc limit 1) as 'descricao'
    //       FROM importados_zurich IZ
    //           left join selects S ON S.sel_id = IZ.status 
    //       WHERE IZ.id_emp IN (64,71,111)
    //       taxa_flet = 0
    //         AND IZ.status in (69,167,15)
    //         AND CHAR_LENGTH(IZ.OS) < 9
    //       GROUP BY IZ.id` //AND IZ.OS = '3798240'
  
    //       },
    //       {  //AND IZ.OS = '3720680'
    //         headers:{                                                       
    //           'Content-Type' : 'application/json; charset=UTF-8',
    //         }
    //       }).then(function(response) {
    //         return response.data;
    //       }).catch(function (error) {
    //         console.error(error);
    //       });
          
    //   return response;
    
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

   

    reset(){
        setTimeout(teste.importaZurich, 1200000)
    }
}
const teste = new visita();
teste.importaZurich();