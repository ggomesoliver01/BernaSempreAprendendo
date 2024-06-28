const puppeteer = require('puppeteer');
var posts = [];
const axios = require('axios')

class statusnaoenviado{
  async importaZurich(i = 0, arr = []) {
    const browser = await puppeteer.launch(
      { 
        headless:  false,
        // executablePath: 'C:\\Users\\Micro\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe' 
      }
      );
      const page = await browser.newPage();
      await page.setViewport({ width: 1366, height: 768});
      await page.goto('https://www.assurantclaims.com.br/index.jsp');
      posts = arr.length > 0 ? arr : await rep.carregaOS(); 
      
      await page.waitForSelector('#formulario\\:usuario')
      await page.click('#formulario\\:usuario')
      await page.type('#formulario\\:usuario',"MGC033")
      await page.waitForSelector('#formulario\\:senha')
      await page.click('#formulario\\:senha')
      await page.type('#formulario\\:senha',"w9cc6BjP")
      await page.waitForSelector('#btnLogin')
      await page.click('#btnLogin')
// LOGUIN FEIT

await rep.listagem(page, browser, posts, i)

    }
    async listagem(page,browser, arr = [], i = 0){
        try{
          console.log(arr);
          await page.waitForTimeout(5000)
          
          let OS = arr[i].OS;
          let AG = arr[i].AG
          console.log(arr.length);
          console.log(i);
          console.log(AG)

          var date = new Date(AG.split('/').reverse().join('/'));
          var novaData = new Date();

          console.log(date)
          console.log(novaData)

          if (AG != 'null' && date >= novaData){ 
 
          await page.waitForSelector("#assistenciaSelect");
          await page.select('#assistenciaSelect', "MGC036");
          
          await page.waitForSelector('#iconformularioMenu\\:menuAtendimento')
          await page.click('#iconformularioMenu\\:menuAtendimento')
          await page.waitForSelector('#iconformularioMenu\\:sinistroEmAberto')
          await page.click('#iconformularioMenu\\:sinistroEmAberto')
          
          await page.waitForSelector('#formularioMenu\\:j_id16_body > table:nth-child(1) > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(3) > input[type=text]')
          await page.click('#formularioMenu\\:j_id16_body > table:nth-child(1) > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(3) > input[type=text]')
          await page.type('#formularioMenu\\:j_id16_body > table:nth-child(1) > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(3) > input[type=text]',OS)
          await page.waitForSelector('#formularioMenu\\:btnIniciarAtendimento')
          await page.click('#formularioMenu\\:btnIniciarAtendimento')
          await page.waitForTimeout(5000)
          const spanTexts = await page.$$eval('#formularioMenu\\:mensagensErro > dt > span', elements =>elements.map(el=> el.innerText))
          let aviso = spanTexts[0]
          console.log(aviso)
          
      
          if(aviso == "Senha de atendimento não confere ou não esta aberta."){
             
              await page.waitForSelector("#assistenciaSelect");
              await page.select('#assistenciaSelect', "MGC035");
              await page.waitForSelector('#iconformularioMenu\\:menuAtendimento')
              await page.click('#iconformularioMenu\\:menuAtendimento')
              await page.waitForSelector('#iconformularioMenu\\:sinistroEmAberto')
              await page.click('#iconformularioMenu\\:sinistroEmAberto')
          
              await page.waitForSelector('#formularioMenu\\:j_id16_body > table:nth-child(1) > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(3) > input[type=text]')
              await page.click('#formularioMenu\\:j_id16_body > table:nth-child(1) > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(3) > input[type=text]')
              await page.type('#formularioMenu\\:j_id16_body > table:nth-child(1) > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(3) > input[type=text]',OS)
              await page.waitForSelector('#formularioMenu\\:btnIniciarAtendimento')
              await page.click('#formularioMenu\\:btnIniciarAtendimento')
              await page.waitForSelector('#formularioMenu\\:panelComment_body')
              
              
              const spanTexts1 = await page.$$eval('#formularioMenu\\:panelComment_body', elements =>elements.map(el=> el.innerText))
              let nota = spanTexts1[0]
              console.log(nota)
      
      
              if(nota.indexOf("Prezados, reparo realizado. Produto será entregue") !== -1) {
                  console.log('ENCONTROU')
                  await rep.updateGatilhoSinistros(arr[i].id);
                  console.log('Gatilho alterado')
              }else{
                  console.log('nao encontrou')
                  await page.waitForSelector('#formularioMenu\\:panelComment_body > table > tbody > tr:nth-child(1) > td:nth-child(1) > textarea')
                  await page.click('#formularioMenu\\:panelComment_body > table > tbody > tr:nth-child(1) > td:nth-child(1) > textarea')
                  await page.type('#formularioMenu\\:panelComment_body > table > tbody > tr:nth-child(1) > td:nth-child(1) > textarea',`Prezados, reparo realizado. Produto será entregue na data: ${AG}`)
                  await rep.updateGatilhoSinistros(arr[i].id);
                  await page.waitForTimeout(10000)
                  await page.waitForSelector('#formularioMenu\\:j_id237')
                  await page.click('#formularioMenu\\:j_id237')
              
                  
              }
      
          }else{
      
         console.log('Serviços 2')
         await page.waitForSelector('#formularioMenu\\:panelComment_body')
              
              
              const spanTexts1 = await page.$$eval('#formularioMenu\\:panelComment_body', elements =>elements.map(el=> el.innerText))
              let nota = spanTexts1[0]
              console.log(nota)
      
      
              if(nota.indexOf("Prezados, reparo realizado. Produto será entregue") !== -1) {
                  console.log('ENCONTROU')
                  await rep.updateGatilhoSinistros(arr[i].id);
                  console.log('Gatilho alterado')
              }else{
                  console.log('nao encontrou')
                  await page.waitForSelector('#formularioMenu\\:panelComment_body > table > tbody > tr:nth-child(1) > td:nth-child(1) > textarea')
                  await page.click('#formularioMenu\\:panelComment_body > table > tbody > tr:nth-child(1) > td:nth-child(1) > textarea')
                  await page.type('#formularioMenu\\:panelComment_body > table > tbody > tr:nth-child(1) > td:nth-child(1) > textarea',`Prezados, reparo realizado. Produto será entregue na data: ${AG}`)
                  await rep.updateGatilhoSinistros(arr[i].id);
                  await page.waitForTimeout(10000)
                  await page.waitForSelector('#formularioMenu\\:j_id237')
                  await page.click('#formularioMenu\\:j_id237')
              
                  
              }
          }
                        
          
   
await page.waitForTimeout(8000)
        }
 

    rep.listagem(page, browser, arr, ++i)
     
  // }
    // rep.listagem(page, browser, arr, ++i)
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
    var response = await axios
        .post('https://gsplanaltec.com/consultaBot/', {
          sqlQuery: `SELECT 
                      IZ.id,
                      IZ.OS,
                      IZ.Sinistro,
                      IZ.data,
                      AG.A_Data as AG,
                      AG.status_id,
                      IZ.status,
                      S.sel_nome,
                      (SELECT D.desc_descricao FROM descricoes D where D.desc_id_zurich = IZ.id AND D.desc_descricao LIKE CONCAT('%', S.sel_nome, '%') order by D.desc_id desc limit 1) as 'descricao'
                  FROM importados_zurich IZ
                    JOIN agendamento AG ON AG.A_id_Zurich = IZ.id 
                      left join selects S ON S.sel_id = IZ.status 
                  WHERE IZ.id_emp IN (89)
                    AND IZ.gatilho = 0
                      AND IZ.status = 77
                      AND AG.status_id = IZ.status
                      AND (STR_TO_DATE(IZ.data,'%d/%m/%Y') >= '2022-12-13' AND STR_TO_DATE(IZ.data,'%d/%m/%Y') <= '2030-12-30') 
                      
                      GROUP BY IZ.id` //AND IZ.OS = '3778940'
        },
        {  //AND IZ.OS = '3811525'
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