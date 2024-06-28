const puppeteer = require('puppeteer');
var posts = [];
const axios = require('axios')
const Sequelize = require('sequelize')

class statusremarcado{
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
    // const page = await browser.newPage();
    // await page.setViewport({ width: 1366, height: 768});
    // await page.goto('https://zews.zurich.com.br/PortalPrestador/auth/login');
    // await page.waitForSelector('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input')
    // await page.type("body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input", 'pvdsuporte02');
    // await page.type("body > app-root > app-loading > div > app-login > mat-card > app-loading > app-password-input > div > div > input",'suPo{t8I');
    // await page.waitForTimeout(2500)
    // await page.click('body > app-root > app-loading > div > app-login > mat-card > app-loading > button');
    // await page.waitForTimeout(2500)


    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768});
    await page.goto('https://zews.zurich.com.br/PortalPrestador/auth/login');
    await page.waitForSelector('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input')
    await page.type("body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input", 'pvdsupl');
    await page.type("body > app-root > app-loading > div > app-login > mat-card > app-loading > app-password-input > div > div > input",'suPo!t0L');
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
          let descricao = arr[i].descricao
          console.log(arr.length);
          console.log(i);
          console.log(OS)


          if(descricao != null){


            const texto = descricao;

            // Expressão regular para extrair o que está entre o hífen e os dois "||"
            const regexx = /- (.*?) \|\|/;
            const match = texto.match(regexx);

            // Verifique se houve correspondência e imprima o resultado
            if (match) {
              var enderecoDoTecnico = match[1].trim();  // Trim para remover espaços em branco
              console.log(enderecoDoTecnico);
            } else {
              console.log('Padrão não encontrado no texto.');
            }


          
          const stringOriginal = descricao

          // Expressão regular para encontrar o conteúdo entre '||'
          const regex = /\|\|(.*?)\|\|/;
          
          // Executa a expressão regular na string original
          const matches = stringOriginal.match(regex);
          
          // Verifica se houve correspondência e extrai o conteúdo
          const mensagem = matches ? matches[1].trim() : ' ';
          
          console.log(mensagem);


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
      
          if(nota.indexOf("Produto se encontra no endereço") !== -1   && nota != ('undefined')) {
            console.log('ENCONTROU')
            await rep.updateGatilhoSinistros(arr[i].id);
            console.log('Gatilho alterado')
      
           }else{
            console.log('Não encontrou')
          await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
          await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
          await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')
          await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')
           

                           

                   
                             if(enderecoDoTecnico == 'Endereço do técnico:'){
                            await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input')
                            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input')
                            await page.type('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input', `Prezados, produto se encontra no endereço do técnico: ${mensagem}`)
                            await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
                            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
                            await rep.updateGatilhoSinistros(arr[i].id);
                            console.log('Gatilho alterado')
                             await page.waitForTimeout(3000)
                         
                             } else{
                             //Prezados, produto se encontra na residência do segurado
                              await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input')
                              await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input')
                              await page.type('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input', "Prezados, produto se encontra na residência do segurado")
                              await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
                              await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
                              await rep.updateGatilhoSinistros(arr[i].id);
                              console.log('Gatilho alterado')
                             }
                             
                             
                            

           }
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
    
  async carregaOS(){
    const response = await this.acaoModel.manualQuery({
      bd: "servico_bd",
      tabela: "importados_zurich",
      query: `SELECT 
      IZ.id,
      IZ.OS,
      IZ.Sinistro,
      IZ.prod_recolhido,
      IZ.data,
      @varAG := (SELECT A.A_Data FROM agendamento A WHERE A.A_id_Zurich = IZ.id AND (A.status_id = IZ.status) ORDER BY A.A_id DESC limit 1) as varAG,
      IF(@varAG IS NULL, (SELECT A.A_Data FROM agendamento A WHERE A.A_id_Zurich = IZ.id ORDER BY A.A_id DESC limit 1), @varAG) as AG,
      IZ.status,
      S.sel_nome,
    (SELECT D.desc_descricao FROM descricoes D where D.desc_id_zurich = IZ.id AND (D.desc_descricao LIKE CONCAT('%', 'Endereço do técnico', '%') OR D.desc_descricao LIKE CONCAT('%', 'Produto se encontra no endereço do cliente.', '%')) order by D.desc_id desc limit 1) as 'descricao'
    FROM importados_zurich IZ
      left join selects S ON S.sel_id = IZ.status 
    WHERE IZ.id_emp IN (64,71,111,146,1)
    #AND CHAR_LENGTH(IZ.OS) < 9
      #AND taxa_flet = 0
      AND gatilho = 0
      AND IZ.status = 72
      AND CHAR_LENGTH(IZ.OS) < 9
    GROUP BY IZ.id;
    `,
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
  //         IZ.prod_recolhido,
  //         IZ.data,
  //         @varAG := (SELECT A.A_Data FROM agendamento A WHERE A.A_id_Zurich = IZ.id AND (A.status_id = IZ.status) ORDER BY A.A_id DESC limit 1) as varAG,
  //         IF(@varAG IS NULL, (SELECT A.A_Data FROM agendamento A WHERE A.A_id_Zurich = IZ.id ORDER BY A.A_id DESC limit 1), @varAG) as AG,
  //         IZ.status,
  //         S.sel_nome,
  //       (SELECT D.desc_descricao FROM descricoes D where D.desc_id_zurich = IZ.id AND (D.desc_descricao LIKE CONCAT('%', 'Endereço do técnico', '%') OR D.desc_descricao LIKE CONCAT('%', 'Produto se encontra no endereço do cliente.', '%')) order by D.desc_id desc limit 1) as 'descricao'
  //       FROM importados_zurich IZ
  //         left join selects S ON S.sel_id = IZ.status 
  //       WHERE IZ.id_emp IN (64,71,111)
  //       #AND CHAR_LENGTH(IZ.OS) < 9
  //         #AND taxa_flet = 0
  //         AND gatilho = 0
  //         AND IZ.status = 72
  //         AND CHAR_LENGTH(IZ.OS) < 9
  //       GROUP BY IZ.id;
  //       ` //AND IZ.OS = '3503693'
            
  //                   },
  //       {  //AND IZ.OS = '3736377'
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
const rep = new statusremarcado;
rep.importaZurich();