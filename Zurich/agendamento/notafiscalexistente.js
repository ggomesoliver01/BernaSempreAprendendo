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
        const browser = await puppeteer.launch({ 
            headless:  true,
            // executablePath: 'C:\\Users\\Micro\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe' 
        });

        // LOGIN
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768});
        await page.goto('https://zews.zurich.com.br/PortalPrestador/auth/login');
        await page.waitForSelector('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input')
        await page.type("body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input", 'pvdsuporte02');
        await page.type("body > app-root > app-loading > div > app-login > mat-card > app-loading > app-password-input > div > div > input",'suPo{t8I');
        await page.waitForTimeout(2500)
        await page.click('body > app-root > app-loading > div > app-login > mat-card > app-loading > button');
    
        
        await page.waitForTimeout(5000);
        await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li.nav-item.ng-star-inserted > a')
        await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li.nav-item.ng-star-inserted > a')            
        await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-bo-list > app-loading > app-filter-bar > div > div > div.desktop-only > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > app-search-type-select')
        await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-bo-list > app-loading > app-filter-bar > div > div > div.desktop-only > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > app-search-type-select')
        await page.waitForTimeout(5000)
    
        var O = await page.$x('/html/body/div[2]/div[2]/div/div/div/mat-option[2]');
        if (O.length > 0) {
            await O[0].click();
            console.log('Elemento clicado com sucesso.');
        } else {
            console.log('Elemento não encontrado.');
        }
        posts = await teste.carregaOS(); // Assuming the method carregaOS is defined in the Sinistrovalor class
        await teste.listagem(page, browser, posts, i); // Using "this" to refer to the class methods
    }
    
    async listagem(page, browser, arr = [], i = 0) {
        try {
            console.log(arr);
            await page.waitForTimeout(5000);
  
            let osInput = arr[i].OS;
            let id = arr[i].id;
            
            console.log(id)
            console.log(arr.length);
            console.log(i);
            console.log(osInput);
            var indice =  0


            
   
             console.log (id, indice)




            //  await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-bo-list > app-loading > app-filter-bar > div > div > div.desktop-only > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input')
            //  await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-bo-list > app-loading > app-filter-bar > div > div > div.desktop-only > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input')
             const input = await page.$('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-bo-list > app-loading > app-filter-bar > div > div > div.desktop-only > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input');
             await input.click({ clickCount: 3 })
             await page.type('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-bo-list > app-loading > app-filter-bar > div > div > div.desktop-only > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input', osInput)
             await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-bo-list > app-loading > app-filter-bar > div > div > div.desktop-only > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > button')
             await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-bo-list > app-loading > app-filter-bar > div > div > div.desktop-only > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > button')
            await page.waitForTimeout(3000)
             const spanTexts = await page.$$eval('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-bo-list > app-loading > div > div > span', elements => elements.map(el => el.innerText))
             let valor = spanTexts[0]
             console.log(valor)

             if(valor =='Nenhuma ordem de cobrança encontrada' ){
                 
                indice = 2
                console.log('foi 2 ')
           
            }else {
                 indice = 1
                console.log('foi 1')
             }


      
      
         await this.acaoControle.updateNotasExistentes(indice,id)
         await page.waitForTimeout(2000)
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
        IZ.id_emp,
        IZ.notas_existente,
        STR_TO_DATE(IZ.data, '%d/%m/%Y') as data,
        STR_TO_DATE((SELECT DC.desc_data FROM descricoes DC WHERE DC.desc_id_zurich = IZ.id 
                AND (DC.desc_descricao LIKE CONCAT('%para ''', S.sel_nome, '''%'))
                      ORDER BY DC.desc_id desc LIMIT 1), '%d/%m/%Y') as dataDesc					
    FROM importados_zurich IZ
        LEFT JOIN selects S ON S.sel_id = IZ.status
        LEFT JOIN empresas E ON E.id = IZ.id_emp
        LEFT JOIN lancamento_pg LP ON LP.idOS = IZ.id
    WHERE ( IZ.id_emp IN (64,71,111,146) AND S.sel_id IN (64,83,87,70,17,50) )
      AND ((LP.LiberadoPg != 0 AND LP.statusPG = 19 OR LP.LiberadoPg != 0 AND LP.statusPG = 20 AND LP.LiberadoNPS != 0) OR LP.id is null)
      AND notas_existente in(0,2) 
      AND taxa_flet = 1
      GROUP BY IZ.id
      HAVING (dataDesc >= '2023-11-01' AND dataDesc <= '2025-11-30');`,
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
   
   
      
    reset(){
        setTimeout(teste.importaZurich, 1200000)
    }
}
const teste = new Sinistrovalor();
teste.importaZurich();