const puppeteer = require('puppeteer');
const Sequelize = require('sequelize');
const axios = require('axios')
class Sinistrovalor {
    acaoControle = require("./../../acaoControle/importacao");
    acaoModel = require("../../MYSQL/models/acaoModel");

    constructor() {
        this.acaoModel = new this.acaoModel();
        this.acaoControle = new this.acaoControle();
    }

    async importaZurich(i = 0) {
        const browser = await puppeteer.launch({ 
            headless:  true,
            // executablePath: 'C:\\Users\\Micro\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe' 
        });

        // LOGIN
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768});

        await page.waitForTimeout(5000);
        const posts = await this.carregaOS(); // Corrigido para usar "this"
        await this.listagem(page, browser, posts, i); // Corrigido para usar "this"
    }

    async listagem(page, browser, arr = [], i = 0) {
        if (i >= arr.length) {
            console.log("Processo finalizado.");
            await browser.close();
            return; // Encerra a função
        }
    
        console.log('foii');
        try {
            console.log(arr);
            await page.waitForTimeout(5000);
    
            let id_webhook = arr[i].id_webhook;
            let date_init = arr[i].date_init;
            console.log(id_webhook);
    
            console.log(date_init);
            console.log(arr.length);
            console.log(`${i + 1}\n${arr.length}`);
            await page.waitForTimeout(3000);
            await this.updateStatusSinistros(arr[i].id_webhook);
            await page.waitForTimeout(3000);
            await this.listagem(page, browser, arr, ++i);
        } catch (error) {
            console.log(error);
            i++;
            console.log(i, arr.length);
            if (error == "TypeError: Cannot read properties of undefined (reading 'OS')") {
                teste.reset();
                await browser.close();
            } else {
                await this.importaZurich(i);
                await browser.close();
            }
        }
    }
    

    async carregaOS() {
        const response = await this.acaoModel.manualQuery({
            bd: "servico_bd",
            tabela: "importados_zurich",
            query: `SELECT id_webhook,date_init FROM utalk_webhook_status WHERE status = 0`,
            tipoQuery: { type: Sequelize.SELECT }
        });

        return response[0];
    }
    async updateStatusSinistros(id_webhook) {
        axios.post(`https://gsplanaltec.com/GerenciamentoServicos/UtalkController/verifica_webhook_expirado/${id_webhook}`,
{},
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
        setTimeout(teste.importaZurich, 300000)
        console.log('reset')
      }
}

const teste = new Sinistrovalor();
teste.importaZurich();