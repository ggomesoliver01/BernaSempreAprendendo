const puppeteer = require('puppeteer');
const axios = require('axios')
var fs = require('fs');
var posts = [];
var dados = [];
const Sequelize = require('sequelize')
const { DateTime } = require('luxon');

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
        console.log("Iniciando importação...");
        const currentHour = DateTime.local().hour; // Obtém a hora atual
        console.log("Hora atual:", currentHour);

        // Verifica se está dentro do horário permitido (das 7:00 às 18:00)
        if (currentHour >= 7 && currentHour < 18) {
            console.log("Dentro do horário permitido para a importação (7:00 às 18:00).");
            const browser = await puppeteer.launch({ headless: true });

            try {
                // Se this.posts for undefined, tente inicializá-lo
                if (!this.posts) {
                    console.log("Inicializando this.posts...");
                    this.posts = await this.carregaOS();
                    console.log("this.posts inicializado:", this.posts);
                }

                // Verifique se this.posts é um array antes de acessar seu comprimento
                if (!Array.isArray(this.posts)) {
                    console.error("this.posts não é um array:", this.posts);
                    return;
                }

                // Se i for maior ou igual ao comprimento do array, finaliza a execução
                if (i >= this.posts.length) {
                    console.log("Processo de importação concluído.");
                    await browser.close();
                    return;
                }

                // Se ainda houver itens para processar, continua
                const page = await browser.newPage();
                await page.setViewport({ width: 1366, height: 768 });

                await page.waitForTimeout(5000);

                await this.listagem(page, browser, this.posts, i);
            } catch (error) {
                console.error("Ocorreu um erro durante a importação:", error);
                await browser.close();
            }
        } else {
            console.log("Fora do horário permitido para a importação (7:00 às 18:00).");
            await browser.close();
        
        }
    
       
        // LOGIN
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768});
        await page.waitForTimeout(5000);
        posts = await teste.carregaOS(); // Assuming the method carregaOS is defined in the Sinistrovalor class
        await teste.listagem(page, browser, posts, i); // Using "this" to refer to the class methods
    }
    
    async listagem(page, browser, arr = [], i = 0) {
        try {
            console.log(arr);
            await page.waitForTimeout(5000);
  
            let osInput = arr[i].OS;
            let AG = arr[i].AG;
            let id = arr[i].id;
            let statusNovo = arr[i].status
            console.log(id)
            console.log(arr.length);
            console.log(i);
            console.log(osInput);
            console.log(AG);
            console.log(statusNovo)
            
  
  await page.waitForTimeout(3000)
        await this.acaoControle.gatilhoStatus(arr[i].id,statusNovo);

      
        await page.waitForTimeout(10000)
        teste.listagem(page, browser, arr, ++i)
      } catch(error) {
        console.log(error);
        i++
        console.log(i, arr.length)
        if (error == "TypeError: Cannot read properties of undefined (reading 'id_webhook')"){
         
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
        query: `SELECT 
        IZ.id,
        IZ.OS,
        IZ.Sinistro,
        IZ.data,
        @varAG := (
            SELECT A.A_Data 
            FROM agendamento A 
            WHERE A.A_id_Zurich = IZ.id 
            AND (A.status_id = IZ.status) 
            AND (
              DATE(STR_TO_DATE(A.A_Data, '%d/%m/%Y')) = DATE_SUB(CURDATE(), INTERVAL 1 DAY) OR 
              DATE(STR_TO_DATE(A.A_Data, '%d/%m/%Y')) = CURDATE() OR 
              DATE(STR_TO_DATE(A.A_Data, '%d/%m/%Y')) = DATE_ADD(CURDATE(), INTERVAL 1 DAY)
                )
                AND status_id = IZ.status
               AND (data_bot is null OR (data_bot != CURDATE() AND data_bot is not null))
            ORDER BY A.A_id DESC 
            LIMIT 1
        ) AS varAG,
        IF(@varAG IS NULL, 
            (
                SELECT A.A_Data 
                FROM agendamento A 
                WHERE A.A_id_Zurich = IZ.id 
                AND (
                  DATE(STR_TO_DATE(A.A_Data, '%d/%m/%Y')) = DATE_SUB(CURDATE(), INTERVAL 1 DAY) OR 
                  DATE(STR_TO_DATE(A.A_Data, '%d/%m/%Y')) = CURDATE() OR 
                  DATE(STR_TO_DATE(A.A_Data, '%d/%m/%Y')) = DATE_ADD(CURDATE(), INTERVAL 1 DAY)
                    )
                    AND status_id = IZ.status
                   AND (data_bot is null OR (data_bot != CURDATE() AND data_bot is not null))
                ORDER BY A.A_id DESC 
                LIMIT 1
            ), 
            @varAG
        ) AS AG,
        IZ.status,
        S.sel_nome,
        (
            SELECT D.desc_descricao 
            FROM descricoes D 
            WHERE D.desc_id_zurich = IZ.id 
            AND taxa_flet = 0 
            AND D.desc_descricao LIKE CONCAT('%', S.sel_nome, '%') 
            ORDER BY D.desc_id DESC 
            LIMIT 1
        ) AS 'descricao'
    FROM importados_zurich IZ
    LEFT JOIN selects S ON S.sel_id = IZ.status 
    WHERE IZ.id_emp IN (64,80,106,146,101,144,145,10,152,1,105,92)
    AND IZ.status in (53,60,135)
    #AND IZ.OS = "4180015"
    GROUP BY IZ.id
    HAVING AG IS NOT NULL;`,
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



  

    async updateStatusSinistros(id) {
        axios.post("https://gsplanaltec.com/consultaBot/",
        {
        sqlQuery:`UPDATE importados_zurich SET status = 53 WHERE id IN (${id})`
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

    async updateGatilhoSinistros(id) {
        axios.post("https://gsplanaltec.com/consultaBot/",
        {
          sqlQuery:`UPDATE importados_zurich SET gatilho = 0 WHERE id IN (${id})`
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
const teste = new Sinistrovalor();
teste.importaZurich();