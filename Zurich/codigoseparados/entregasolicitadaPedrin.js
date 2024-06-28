const puppeteer = require("puppeteer");
const axios = require("axios");
const Sequelize = require("sequelize")
var posts = [];
class Entregasolicitada {

  acaoModel = require("../../MYSQL/models/acaoModel");
  constructor() {
      this.acaoModel = new this.acaoModel;
  }

  
  async logandoNovo(i = 0, arr = []) {
    const browser = await puppeteer.launch({
      headless: true,
      // executablePath:
      //   "C:\\Users\\user\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe",
    });

    console.log("login");
    const page = await browser.newPage();
    //this.tomaOK(page)
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto("https://zews.zurich.com.br/PortalPrestador/auth/login");
    await page.waitForTimeout(3000);
    await page.click(
      "body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input"
    );
    await page.type(
      "body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input",
      "pvdsuporte02"
    );
    await page.waitForTimeout(3000);
    await page.click(
      "body > app-root > app-loading > div > app-login > mat-card > app-loading > app-password-input > div > div > input"
    );
    await page.type(
      "body > app-root > app-loading > div > app-login > mat-card > app-loading > app-password-input > div > div > input",
      "suPo{t8I"
    );
    await page.waitForTimeout(3000);
    await page.click(
      "body > app-root > app-loading > div > app-login > mat-card > app-loading > button"
    );

    posts = arr.length > 0 ? arr : await teste.carregaOS();
    await teste.listagemNovo(page, browser, posts, i);
    return;
  }

  async listagemNovo(page, browser, arr = [], i = 0) {
    try {
      console.log(arr);
      await page.waitForTimeout(10000);

      let OS = arr[i].OS;
      let AG = arr[i].AG;
      var date = new Date(AG.split("/").reverse().join("/"));
      var novaData = new Date();
      //console.log(AG)
      console.log(date); //data do AG
      console.log(novaData); // data de hj
      const data = new Date();
      const dias = 2;
      function addDays(date, days) {
        date.setDate(date.getDate() + days);

        return date.toISOString().slice(0, 10).split("-").reverse().join("-");
      }
      const novadata = addDays(data, dias).split("-").join("/");
      console.log(novadata);
      console.log("verificando");

      if (AG > novaData || AG != "") {
        console.log("entrou aqui");
        await page.waitForTimeout(5000);
        await page.waitForSelector(
          "body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li:nth-child(2) > a"
        );
        await page.click(
          "body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li:nth-child(2) > a"
        );
        await page.waitForTimeout(3000);
        await page.click(
          "body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input",
          { clickCount: 2 }
        );        
        await page.waitForTimeout(3000);
        console.log(OS);
        console.log("Entrando no sinistro");
        await page.type(
          "body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input",
          OS
        );
        try{
        await page.waitForTimeout(3000);
        await page.waitForSelector(
          "body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > button"
        );
        await page.click(
          "body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > button"
        );
        await page.waitForTimeout(7000);
        let sinistrogo = await page.$x(`/html/body/app-root/app-navigation/mat-sidenav-container/mat-sidenav-content/div/div/app-loading/app-so-list/app-loading/div/span`);
          var value = await page.evaluate(element => element.textContent, sinistrogo[0]); 
          value = value.trim()
          //Retorna o valor do sinistro
          console.log(value);
          if(value == "No order service found" || "Nenhuma ordem de serviço encontrada"){
            // i++;
           console.log("Nenhuma ordem de serviço encontrada!")
           this.listagemNovo(page, browser, arr, ++i);
           return;
           }
          }catch(error){
            await page.click(
              "body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > div > div > div > app-so-card > mat-card > div.d-flex.flex-row > div.m-auto.pl-2.ng-star-inserted > button"
            );
            await page.waitForTimeout(3000);
            await page.click(
              "#messagesCard > mat-card > div > div.row > div:nth-child(3) > app-collapse-button > button"
            );
            await page.waitForTimeout(5000);
            await page.click("#dropdownMenuButton");
            console.log("Alimentando informações do atendimento");
            await page.waitForTimeout(3000);
            await page.click(
              "#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)"
            );
            await page.waitForTimeout(3000);
            await page.click(
              "#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input"
            );
            await page.waitForTimeout(3000);
            await page.type(
              "#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input",
              `Prezados, a previsão para a entrega do produto para o nosso posto de AT é para o dia ${novadata}`
            );
            await teste.updateGatilhoSinistros(arr[i].id);
            console.log("Gatilho alterado!");
            await page.waitForTimeout(10000);
            await page.waitForSelector(
              "#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button"
            );
            await page.click(
              "#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button"
            );
            await page.waitForTimeout(10000);
            teste.listagemNovo(page, browser, arr, ++i);
            return;
          }

        await page.click(
          "body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > div > div > div > app-so-card > mat-card > div.d-flex.flex-row > div.m-auto.pl-2.ng-star-inserted > button"
        );
        await page.waitForTimeout(3000);
        await page.click(
          "#messagesCard > mat-card > div > div.row > div:nth-child(3) > app-collapse-button > button"
        );
        await page.waitForTimeout(5000);
        await page.click("#dropdownMenuButton");
        console.log("Alimentando informações do atendimento");
        await page.waitForTimeout(3000);
        await page.click(
          "#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)"
        );
        await page.waitForTimeout(3000);
        await page.click(
          "#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input"
        );
        await page.waitForTimeout(3000);
        await page.type(
          "#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input",
          `Prezados, a previsão para a entrega do produto para o nosso posto de AT é para o dia ${novadata}`
        );
        await teste.updateGatilhoSinistros(arr[i].id);
        console.log("Gatilho alterado!");
        await page.waitForTimeout(10000);
        await page.waitForSelector(
          "#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button"
        );
        await page.click(
          "#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button"
        );
        await page.waitForTimeout(10000);
      }

      teste.listagemNovo(page, browser, arr, ++i);
      return;
    } catch (error) {
      console.log(error);
      //return;
      i++;
      console.log(i, arr.length);
      if (
        error == "TypeError: Cannot read properties of undefined (reading 'OS')"
      ) {
        // teste.reset();
        console.log("Resetando... indo para o login antigo!");
        await browser.close();
        await teste.logando(i);
        return;
      } else {
        // teste.importaZurich(i);
        await browser.close();
        console.log("Resetando... indo para o login antigo!");
        await teste.logando(i);
        return;
      }
    }
  }

  async logando(i = 0, arr = []) {
    const browser = await puppeteer.launch({
      headless: false,
      executablePath:
        "C:\\Users\\user\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe",
    });

    console.log("login");
    const page = await browser.newPage();
    //this.tomaOK(page)
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto("https://zews.zurich.com.br/PortalPrestador/auth/login");
    await page.waitForTimeout(3000);
    await page.click(
      "body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input"
    );
    await page.type(
      "body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input",
      "pvdsupl"
    );
    await page.waitForTimeout(3000);
    await page.click(
      "body > app-root > app-loading > div > app-login > mat-card > app-loading > app-password-input > div > div > input"
    );
    await page.type(
      "body > app-root > app-loading > div > app-login > mat-card > app-loading > app-password-input > div > div > input",
      "suPo!t0L"
    );
    await page.waitForTimeout(3000);
    await page.click(
      "body > app-root > app-loading > div > app-login > mat-card > app-loading > button"
    );

    posts = arr.length > 0 ? arr : await teste.carregaOS();
    await teste.listagem(page, browser, posts, i);
    return;
  }

  async listagem(page, browser, arr = [], i = 0) {
    try {
      console.log(arr);
      await page.waitForTimeout(10000);

      let OS = arr[i].OS;
      let AG = arr[i].AG;
      console.log(arr.length);
      console.log(i);
      var date = new Date(AG.split("/").reverse().join("/"));
      var novaData = new Date();
      //console.log(AG)
      console.log(date); //data do AG
      console.log(novaData); // data de hj
      const data = new Date();
      const dias = 2;
      function addDays(date, days) {
        date.setDate(date.getDate() + days);
        return date.toISOString().slice(0, 10).split("-").reverse().join("-");
      }
      const novadata = addDays(date, dias).split('-').join('/');
      console.log(novadata);
      console.log("verificando");

      if (AG > novaData || AG != "") {
        console.log("entrou aqui");
        await page.waitForTimeout(5000);
        await page.waitForSelector(
          "body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li:nth-child(2) > a"
        );
        await page.click(
          "body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li:nth-child(2) > a"
        );
        await page.waitForTimeout(3000);
        await page.click(
          "body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input",
          { clickCount: 2 } // Defina clickCount como 2 para clicar duas vezes
        );
        
        await page.waitForTimeout(3000);
        //await page.waitForSelector('#mat-option-11 > span > span')
        console.log(OS);
        console.log("Entrando no sinistro");
        await page.type(
          "body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input",
          OS
        );
        await page.waitForTimeout(3000);
        await page.waitForSelector(
          "body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > button"
        );
        await page.click(
          "body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > button"
        );
        await page.waitForTimeout(7000);
            await page.click(
              "body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > div > div > div > app-so-card > mat-card > div.d-flex.flex-row > div.m-auto.pl-2.ng-star-inserted > button"
            );
            await page.waitForTimeout(3000);
            await page.click(
              "#messagesCard > mat-card > div > div.row > div:nth-child(3) > app-collapse-button > button"
            );
            await page.waitForTimeout(5000);
            await page.click("#dropdownMenuButton");
            console.log("Alimentando informações do atendimento");
            await page.waitForTimeout(3000);
            await page.click(
              "#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)"
            );
            await page.waitForTimeout(3000);
            await page.click(
              "#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input"
            );
            await page.waitForTimeout(3000);
            await page.type(
              "#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input",
              `Prezados, a previsão para a entrega do produto para o nosso posto de AT é para o dia ${novadata}`
            );
            await teste.updateGatilhoSinistros(arr[i].id);
            console.log("Gatilho alterado!");
            await page.waitForTimeout(10000);
            await page.waitForSelector(
              "#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button"
            );
            await page.click(
              "#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button"
            );
            await page.waitForTimeout(10000);
            teste.listagem(page, browser, arr, ++i);
            return;
      }

      teste.listagem(page, browser, arr, ++i);
      return;
    } catch (error) {
      console.log(error);
      //return;
      i++;
      console.log(i, arr.length);
      if (
        error == "TypeError: Cannot read properties of undefined (reading 'OS')"
      ) {
        teste.reset();
        console.log("reset");
        await browser.close();
        return;
      } else {
        teste.logando(i);
        await browser.close()
        return;
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
      WHERE IZ.id_emp IN (64, 146)
      AND IZ.gatilho = 0
      AND CHAR_LENGTH(IZ.OS) < 9
      AND IZ.status = 60
      AND taxa_flet = 1
      GROUP BY IZ.id`,
      tipoQuery: { type: Sequelize.SELECT }
    });
        
    return response[0];
  }

  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }
  reset() {
    setTimeout(teste.logandoNovo, 600000);
    console.log("reset");
  }

  async updateGatilhoSinistros(id) {
    axios
      .post(
        "https://gsplanaltec.com/consultaBot/",
        {
          sqlQuery: `UPDATE importados_zurich SET gatilho = 1 WHERE id IN (${id})`,
        },
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      )
      .then(function (response) {
        var retorno = response.data;
        console.log(retorno);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}

const teste = new Entregasolicitada();
teste.logandoNovo();
