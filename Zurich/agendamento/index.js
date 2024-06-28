const puppeteer = require('puppeteer');
var posts = [];
const axios = require('axios')
const Sequelize = require('sequelize')

class statusreparo {
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
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto('https://zews.zurich.com.br/PortalPrestador/auth/login');
    await page.waitForSelector('body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input')
    await page.type("body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input", 'pvdsuporte02');
    await page.type("body > app-root > app-loading > div > app-login > mat-card > app-loading > app-password-input > div > div > input", 'suPo{t8I');
    await page.waitForTimeout(2500)
    await page.click('body > app-root > app-loading > div > app-login > mat-card > app-loading > button');
    await page.waitForTimeout(2500)

    posts = arr.length > 0 ? arr : await rep.carregaOS();
    await rep.listagem(page, browser, posts, i)

  }
  async listagem(page, browser, arr = [], i = 0) {
    try {
      console.log(arr);
      await page.waitForTimeout(5000)

      let OS = arr[i].OS;
      let AG = arr[i].data_desc;
      let id_emp = arr[i].id_emp
      let status = arr[i].status
      let recolhido = arr[i].prod_recolhido
      let descricao = arr[i].descricao
      console.log(arr.length);
      console.log(i);
      console.log(status)


      await page.waitForTimeout(5000);
      await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li:nth-child(2) > a');
      await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li:nth-child(2) > a');
      await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input');
      await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input');
      await page.type('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > input', OS);
      await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > app-search-bar > div > div.exclude-phone > div > div.flex-grow-1.my-auto > div > button');
      await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > div > div > div > app-so-card > mat-card > div.d-flex.flex-row > div.m-auto.pl-2.ng-star-inserted > button');
      await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > div > div > div > app-so-card > mat-card > div.d-flex.flex-row > div.m-auto.pl-2.ng-star-inserted > button');
      await page.waitForTimeout(2000);
      await page.waitForSelector('#messagesCard > mat-card > div > div.row > div:nth-child(3) > app-collapse-button > button');
      await page.click('#messagesCard > mat-card > div > div.row > div:nth-child(3) > app-collapse-button > button');
      console.log('aqui');
      await page.waitForTimeout(10000);

      const spanTexts1 = await page.$$eval('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.msg_history.ng-star-inserted', elements => elements.map(el => el.innerText));
      let nota = spanTexts1[0];
      console.log(nota);
      await page.waitForTimeout(5000);

      switch (status) {

        case 84: //Aguardando peça Tec
          await page.waitForTimeout(5000);
          const divSelector = "#messagesCard > mat-card > div";

          const divContent = await page.evaluate((selector) => {
            const div = document.querySelector(selector);
            return div ? div.innerText : null;
          }, divSelector);

          // Verificar se o conteúdo foi encontrado ou não
          if (divContent !== null) {
            const searchTerm =
              "estamos no aguardo da chegada das peças para que possamos concluir o reparo. Previsão até o dia";
            const indexOfTerm = divContent.indexOf(searchTerm);
            if (indexOfTerm !== -1) {
              console.log(
                `Nota "${searchTerm}" foi encontrada na posição ${indexOfTerm}.`
              );
              await rep.updateGatilhoSinistros(arr[i].id);
              await page.waitForSelector(
                "body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li:nth-child(2) > a"
              );
              await page.click(
                "body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li:nth-child(2) > a"
              );
              await page.waitForTimeout(5000)
            } else {
              console.log(`Nota "${searchTerm}" não foi encontrada na div.`);
            }
          }

          await page.waitForTimeout(5000);
          await page.click("#dropdownMenuButton"); // Selecionando o tipo de mensagem das notas
          await page.waitForTimeout(5000);
          await page.click(
            "#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)"
          ); // Selecionou 'Informação' no tipo de mensagem
          await page.waitForSelector(
            "#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input"
          );
          await page.click(
            "#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input"
          ); // Seleciou barra para lançar nota
          await page.type(
            "#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input",
            `Prezados, estamos no aguardo da chegada das peças para que possamos concluir o reparo. Previsão até o dia ${AG}, segurado ciente e de acordo.`
          ); // Descrevendo nota que será lançada
          await page.waitForTimeout(5000);
          await page.waitForSelector(
            "#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button"
          );
          await page.click(
            "#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button"
          ); // Lançou nota
          await rep.updateGatilhoSinistros(arr[i].id);
          console.log("Gatilho alterado!");
          await page.waitForTimeout(2000);
          await page.waitForSelector(
            "body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li:nth-child(2) > a"
          );
          await page.click(
            "body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > app-top-bar > nav > div > div.w-100.desktop-only > div > div.flex-grow-1.bottom-border-5 > div > div:nth-child(2) > div.flex-grow-1 > ul > li:nth-child(2) > a"
          );
          await page.waitForTimeout(5000)
          break;

        case 43: //Peça Enviada

          if (nota.indexOf("Prezados, as peças necessárias para") !== -1) {
            console.log('ENCONTROU')
            await rep.updateGatilhoSinistros(arr[i].id);
            console.log('Gatilho alterado')
          } else {
            console.log('Não encontrou')
            await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
            await page.waitForTimeout(8000)
            await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')

            const input = await page.$('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input');
            await input.click({ clickCount: 3 })

            await page.type('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input', `Prezados, as peças necessárias para o reparo estão em transito para a nossa AT, a previsão de chegada é ${AG}, segurado ciente e de acordo.`)
            await page.waitForTimeout(5000)
            await rep.updateGatilhoSinistros(arr[i].id);
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
            await page.waitForTimeout(5000)
            //  await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
          }
          break;

        case 137: //Peça Entregue

          if (nota.indexOf("Prezados, peças chegaram ao nosso posto de atendimento. Produto se encontra em reparo,") !== -1 && nota != ('undefined')) {
            console.log('ENCONTROU')
            await rep.updateGatilhoSinistros(arr[i].id);
            console.log('Gatilho alterado')
          } else {
            console.log('Não encontrou')
            await page.waitForTimeout(5000)
            await page.click('#dropdownMenuButton') // Selecionando o tipo de mensagem das notas
            await page.waitForTimeout(3000)
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)') // Selecionou 'Informação' no tipo de mensagem
            await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input')
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input') // Seleciou barra para lançar nota
            await page.type('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input', `Prezados, peças chegaram ao nosso posto de atendimento. Produto se encontra em reparo, prazo máximo para finalização será dia ${AG}, com grande possibilidade de antecipação.`) // Descrevendo nota que será lançada
            await rep.updateGatilhoSinistros(arr[i].id)
            console.log('Gatilho alterado!')
            await page.waitForTimeout(10000)
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button') // Lançou nota

          }
          break;

        case 60: //Entrega Solicitada
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
            `Prezados, a previsão para a entrega do produto para o nosso posto de AT é para o dia ${AG}`
          );
          await rep.updateGatilhoSinistros(arr[i].id);
          console.log("Gatilho alterado!");
          await page.waitForTimeout(10000);
          await page.waitForSelector(
            "#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button"
          );
          await page.click(
            "#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button"
          );
          await page.waitForTimeout(10000);
          break;

        case 25:  //SERVIÇO PENDENTE


          console.log("SERVIÇO PENDENTE")
          await page.waitForTimeout(5000)


          var dataservicopendente = new Date();

          // Obtenha o dia, mês e ano
          var dia = dataservicopendente.getDate();
          var mes = dataservicopendente.getMonth() + 1; // Adicione 1 porque os meses começam do zero
          var ano = dataservicopendente.getFullYear();

          // Formate a data como DD/MM/YYYY
          var dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;


          const partes = AG.split(' ');


          const ultimaParte = partes[partes.length - 1];

          console.log(dataFormatada);
          console.log(ultimaParte);

          await page.waitForTimeout(5000)



          var dateString1 = ultimaParte;
          var dateString2 = dataFormatada;

          // Função para converter a string de data para um objeto de data
          function parseDateString(dateString) {
            var parts = dateString.split("/");
            var day = parseInt(parts[0], 10);
            var month = parseInt(parts[1], 10) - 1;
            var year = parseInt(parts[2], 10);
            return new Date(year, month, day);
          }

          // Criando objetos de data
          var date1 = parseDateString(dateString1);
          var date2 = parseDateString(dateString2);
          if (date1 >= date2) {
            console.log("entrou aqui")


            await page.waitForTimeout(10000)
            var indice = (id_emp === '111') ? 4 : 5;



            if (nota.indexOf("Prezados, produto se encontra em reparo, prazo máximo para finalizar está previsto para até o dia") !== -1 && nota !== 'undefined') {
              console.log('ENCONTROU');
              await rep.updateGatilhoSinistros(arr[i].id);
              console.log('Gatilho alterado');
              await page.waitForTimeout(5000)

            } else {
              console.log('Não encontrou');
              await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column');
              await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column');
              await page.waitForTimeout(8000);
              await page.waitForSelector(`#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(${indice})`);
              await page.click(`#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(${indice})`);

              const input = await page.$('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input');
              await input.click({ clickCount: 3 });

              await page.type('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input', `Prezados, produto se encontra em reparo, prazo máximo para finalizar está previsto para até o dia ${ultimaParte}, com grande possibilidade de antecipação`);
              await page.waitForTimeout(5000);
              await rep.updateGatilhoSinistros(arr[i].id);
              await page.waitForTimeout(5000)
              await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button');
              await page.waitForTimeout(5000);
              console.log('Gatilho alterado');
            }
          }
          break;

        case 16:  //PENDÊNCIA DE PEÇA
          ("PENDENCIA DE PEÇA")
          await page.waitForTimeout(5000)
          var indice = (id_emp == '111') ? 4 : 5;



          if (nota.indexOf("Prezados, estamos realizando a cotação das peças com o fabricante, em breve informamos previsão de chegada das peças") !== -1 && nota !== 'undefined') {
            console.log('ENCONTROU');
            await rep.updateGatilhoSinistros(arr[i].id);
            console.log('Gatilho alterado');
            await page.waitForTimeout(5000)
          } else {
            console.log('Não encontrou');
            await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column');
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column');
            await page.waitForTimeout(8000);
            await page.waitForSelector(`#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(${indice})`);
            await page.click(`#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(${indice})`);

            const input = await page.$('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input');
            await input.click({ clickCount: 3 });

            await page.type('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input', 'Prezados, estamos realizando a cotação das peças com o fabricante, em breve informamos previsão de chegada das peças, segurado ciente.');
            await page.waitForTimeout(3000);
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button');
            await page.waitForTimeout(5000);

            await rep.updateGatilhoSinistros(arr[i].id);
            console.log('Gatilho alterado');
          }
          break;

        case 167: //VISTORIA REMOTA REALIZADA
          console.log("VISTORIA REMOTA REALIZADA")


          var datavistoriaremota = new Date();
          var outraData = new Date();
          outraData.setDate(data.getDate() + 3);
          await page.waitForTimeout(5000)
          if (nota == undefined) {

            await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
            await page.waitForTimeout(8000)
            await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')

            const input = await page.$('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input');
            await input.click({ clickCount: 3 })

            await page.type('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input', `Prezados, vistoria remota realizada. Fotos e orçamentos até o dia ${outraData.toISOString().substr(0, 10).split('-').reverse().join('/')}.`)
            await rep.updateGatilhoSinistros(arr[i].id);
            await page.waitForTimeout(3000)
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
            await page.waitForTimeout(5000)

            console.log('Gatilho alterado')

          }
          else {
            if (nota.indexOf("Prezados, vistoria remota realizada") !== -1) {

              console.log('ENCONTROU')
              await rep.updateGatilhoSinistros(arr[i].id);
              console.log('Gatilho alterado')
              await page.waitForTimeout(5000)
            } else {

              await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
              await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
              await page.waitForTimeout(8000)
              await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')
              await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')

              const input = await page.$('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input');
              await input.click({ clickCount: 3 })

              await page.type('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input', `Prezados, vistoria remota realizada. Fotos e orçamentos até o dia ${outraData.toISOString().substr(0, 10).split('-').reverse().join('/')}.`)
              await rep.updateGatilhoSinistros(arr[i].id);
              await page.waitForTimeout(3000)
              await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
              await page.waitForTimeout(5000)

              console.log('Gatilho alterado')
            }
            await page.waitForTimeout(5000)
          }
          break;

        case 53:  //AGENDADO
          var dataservicopendente = new Date();

          // Obtenha o dia, mês e ano
          var dia = dataservicopendente.getDate();
          var mes = dataservicopendente.getMonth() + 1; // Adicione 1 porque os meses começam do zero
          var ano = dataservicopendente.getFullYear();

          // Formate a data como DD/MM/YYYY
          var dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;


          const partesagendado = AG.split(' ');


          const ultimaParteagendado = partesagendado[partesagendado.length - 1];

          console.log(dataFormatada);
          console.log(ultimaParteagendado);

          await page.waitForTimeout(5000)

          if (ultimaParteagendado >= dataFormatada) {

            console.log("AGENDADO")
            var indice = (id_emp == '111') ? 4 : 5;
            await page.waitForTimeout(5000)
            if (nota == undefined) {

              await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
              await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
              await page.waitForSelector(`#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(${indice})`)
              await page.click(`#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(${indice})`)

              const input = await page.$('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input');
              await input.click({ clickCount: 3 })


              await page.waitForTimeout(3000)

              await page.type('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input', `Prezados, visita agendada para o dia ${ultimaParteagendado}.`)
              await rep.updateGatilhoSinistros(arr[i].id);
              await page.waitForTimeout(5000)
              await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
              await page.waitForTimeout(5000)


              console.log('Gatilho alterado')
            } else {

              if (nota.indexOf("Prezados, visita agendada para o dia") !== -1) {

                console.log('ENCONTROU')
                await rep.updateGatilhoSinistros(arr[i].id);
                console.log('Gatilho alterado')
                await page.waitForTimeout(5000)
              } else {
                console.log('nao encontrou')
                await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column');
                await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column');
                await page.waitForTimeout(8000);
                await page.waitForSelector(`#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(${indice})`);
                await page.click(`#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(${indice})`);

                const input = await page.$('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input');
                await input.click({ clickCount: 3 })


                await page.waitForTimeout(3000)

                await page.type('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input', `Prezados, visita agendada para o dia ${ultimaParteagendado}.`)
                await rep.updateGatilhoSinistros(arr[i].id);
                await page.waitForTimeout(5000)
                await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
                await page.waitForTimeout(5000)


                console.log('Gatilho alterado')

              }

            }
          }
          break

        case 69: //VISITA CUMPRIDA

          const data = new Date();
          const dias = 3;

          function isDiaUtil(date) {
            const diaDaSemana = date.getDay(); // 0 para domingo, 1 para segunda, etc.
            return diaDaSemana !== 0 && diaDaSemana !== 6; // Retorna true se não for domingo (0) ou sábado (6).
          }

          function addDiasUteis(date, days) {
            let diasAdicionados = 0;

            while (diasAdicionados < days) {
              date.setDate(date.getDate() + 1);

              if (isDiaUtil(date)) {
                diasAdicionados++;
              }
            }

            return date.toISOString().slice(0, 10).split('-').reverse().join('/');
          }
          var indice = (id_emp == '111') ? 4 : 5;

          const novaData = addDiasUteis(data, dias);

          console.log(novaData);





          var dataAG = AG == null ? novaData : AG


          console.log('VISITA CUMPRIDA')
          await page.waitForTimeout(5000)
          if (nota.indexOf("Prezados, visita realizada, produto ") !== -1) {
            console.log('ENCONTROU')
            await rep.updateGatilhoSinistros(arr[i].id);
            console.log('Gatilho alterado')
            await page.waitForTimeout(5000)
          } else {
            console.log('Não encontrou')
            await page.waitForTimeout(2000)
            await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
            await page.waitForTimeout(8000)
            await page.waitForSelector(`#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(${indice})`)
            await page.click(`#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(${indice})`)

            const input = await page.$('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input');
            await input.click({ clickCount: 3 })

            if (recolhido == "1") {
              console.log('1')
              await page.waitForTimeout(2000)
              await page.type('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input', `Prezados, visita realizada, produto se encontra na residência do segurado e estamos realizando a cotação de peças para encaminhar o laudo. Fotos e orçamentos até o dia ${novaData}.`)
              await page.waitForTimeout(3000)
              await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
              await page.waitForTimeout(5000)

              await rep.updateGatilhoSinistros(arr[i].id);
              console.log('Gatilho alterado')
            }

            if (recolhido == "0") {
              console.log('0')
              await page.waitForTimeout(2000)
              await page.type('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input', `Prezados, visita realizada, produto foi recolhido para análise e rep em nossa AT, fotos e orçamento serão lançados até o dia ${novaData}.`)
              await page.waitForTimeout(3000)
              await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
              await page.waitForTimeout(5000)

              await rep.updateGatilhoSinistros(arr[i].id);
              console.log('Gatilho alterado')
            }

          }
          break

        case 72:  //TROCA
          console.log("TROCA")
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

          const stringOriginal = descricao;

          // Expressão regular para encontrar o conteúdo entre '||'
          const regex = /\|\|(.*?)\|\|/;

          // Executa a expressão regular na string original
          const matches = stringOriginal.match(regex);

          // Verifica se houve correspondência e extrai o conteúdo
          const mensagem = matches ? matches[1].trim() : ' ';

          console.log(mensagem);


          if (nota.indexOf("Produto se encontra no endereço") !== -1 && nota != ('undefined')) {
            console.log('ENCONTROU')
            await rep.updateGatilhoSinistros(arr[i].id);
            console.log('Gatilho alterado');

          } else {
            console.log('Não encontrou')
            await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
            await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')

            if (enderecoDoTecnico == 'Endereço do técnico:') {
              await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input')
              await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input')
              await page.type('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input', `Prezados, produto se encontra no endereço do técnico: ${mensagem}`)
              await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
              await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
              await rep.updateGatilhoSinistros(arr[i].id);
              console.log('Gatilho alterado')
              await page.waitForTimeout(3000);

            } else {
              // Prezados, produto se encontra na residência do segurado
              await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input')
              await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input')
              await page.type('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input', "Prezados, produto se encontra na residência do segurado")
              await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
              await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
              await rep.updateGatilhoSinistros(arr[i].id);
              console.log('Gatilho alterado');
            }
          }

          break;

        case 173: //ORÇAMENTO

          if (nota.indexOf("Prezados, orçamento enviado") !== -1 && nota != ('undefined')) {
            console.log('ENCONTROU')
            await rep.updateGatilhoSinistros(arr[i].id);
            console.log('Gatilho alterado')

          } else {
            console.log('Não encontrou')

            await page.waitForTimeout(2000)
            await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
            await page.waitForTimeout(8000)
            await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')

            const input = await page.$('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input');
            await input.click({ clickCount: 3 })

            await page.type('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input', 'Prezados, orçamento enviado.')
            await page.waitForTimeout(2000)
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
            await page.waitForTimeout(5000)

            await rep.updateGatilhoSinistros(arr[i].id);
            console.log('Gatilho alterado')
          }
          break;


        case 5:
        case 75: //NÃO ENVIADO
        case 12: //NÃO ENVIADO
        case 161://NÃO ENVIADO
          console.log("Não Enviado")

          const datanaoenviado = new Date();
          const diasnaoenviado = 2;

          function addBusinessDays(date, days) {
            const weekdays = [1, 2, 3, 4, 5]; // Dias úteis (de segunda a sexta-feira)

            for (let i = 0; i < days; i++) {
              date.setDate(date.getDate() + 1);

              while (!weekdays.includes(date.getDay())) {
                date.setDate(date.getDate() + 1);
              }
            }

            return date.toISOString().slice(0, 10).split('-').reverse().join('/');
          }

          const novaDatanaoenviado = addBusinessDays(datanaoenviado, diasnaoenviado);

          console.log(novaDatanaoenviado);

          if (nota == undefined) {

            await page.waitForTimeout(5000)
            await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
            await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')
            const input = await page.$('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input');
            await input.click({ clickCount: 3 })
            await page.type('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input', `Prezados, atendimento recebido, estaremos entrando em contato com segurado para agendar a visita técnica. Previsão de atendimento ${novaDatanaoenviado}.`)
            await page.waitForTimeout(3000)
            await rep.updateGatilhoSinistros(arr[i].id);
            console.log('Gatilho alterado')
            await page.waitForTimeout(5000)
            await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')

          } else {

            if (nota.indexOf("Prezados, atendimento recebido") !== -1) {
              console.log("Nota encontrada: Prezados, atendimento recebido");
              await page.waitForTimeout(3000)
              await rep.updateGatilhoSinistros(arr[i].id);
            } else if (nota.indexOf("Prezados, visita agendada") !== -1) {
              console.log("Nota encontrada: Prezados, visita agendada");
              await page.waitForTimeout(3000)
              await rep.updateGatilhoSinistros(arr[i].id);
            } else if (nota.indexOf("Prezados, falta de contato") !== -1) {
              console.log("Nota encontrada: Prezados, falta de contato");

              await page.waitForTimeout(3000)
              await rep.updateGatilhoSinistros(arr[i].id);

            } else {
              console.log('Nota não encontrada')


              await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
              await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
              await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')
              await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')

              const input = await page.$('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input');
              await input.click({ clickCount: 3 })
              await page.type('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input', `Prezados, atendimento recebido, estaremos entrando em contato com segurado para agendar a visita técnica. Previsão de atendimento ${novaDatanaoenviado}.`)
              await rep.updateGatilhoSinistros(arr[i].id);
              console.log('Gatilho alterado')

              await page.waitForTimeout(5000)
              await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
              await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')

            }
          }

          break

        case 18:  //REPARO EFETURADO
          console.log('REPARO EFETUADO')
          if (nota.indexOf("Prezados, reparo concluído") !== -1 && nota != ('undefined')) {
            console.log('ENCONTROU')
            await rep.updateGatilhoSinistros(arr[i].id);
            console.log('Gatilho alterado')

          } else {
            console.log('Não encontrou')

            await page.waitForTimeout(2000)
            await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
            await page.waitForTimeout(8000)
            await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')

            const input = await page.$('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input');
            await input.click({ clickCount: 3 })

            await page.type('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input', 'Prezados, reparo concluído.')
            await page.waitForTimeout(2000)
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
            await page.waitForTimeout(5000)

            await rep.updateGatilhoSinistros(arr[i].id);
            console.log('Gatilho alterado')
          }

          break

          case 135: //REMARCADO
          console.log('REMARCADO')
          console.log(descricaoremarcado)



          await page.waitForTimeout(30000)
          const textoremarcado = descricao
          const conteudo = textoremarcado.split("|")[1].trim().replace("</b>", "").replace("<b>", "")

          console.log(OS)
          console.log(conteudo);
          await page.waitForTimeout(5000)


          if (nota.trim().indexOf(conteudo.trim()) !== -1) {
            console.log('ENCONTROU')
            await rep.updateGatilhoSinistros(arr[i].id);
            console.log('Gatilho alterado')

          } else {
            console.log('Não encontrou')
            await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column')
            await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > app-dropdown-field > div.btn-group.d-flex.flex-column.show > div > a:nth-child(5)')

            const input = await page.$('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input');
            await input.click({ clickCount: 3 })
            await page.type('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > input', conteudo)
            await rep.updateGatilhoSinistros(arr[i].id);
            await page.waitForSelector('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
            await page.click('#collapseMessage > app-loading > div.content.ng-star-inserted > div > div > div > div > div.type_msg > div > div > button')
            await page.waitForTimeout(5000)

          }

          break

        case 60:  // ENTREGA SOLICITADA

          console.log('Entrega Solicitada')




          break

      }
      rep.listagem(page, browser, arr, ++i)
    } catch (error) {
      console.log(error);
      //return;
      i++
      console.log(i, arr.length)
      if (error == "TypeError: Cannot read properties of undefined (reading 'OS')") {
        rep.reset()
        console.log('reset')
        await browser.close()
      } else {
        rep.importaZurich(i)
        await browser.close()
      }
    }
  }

  async carregaOS() {
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
        AND gatilho = 0
        AND IZ.status IN (16,18,25,53,69,167,173,5,12,161,72,137,43,84,60) 
        AND CHAR_LENGTH(IZ.OS) < 9
       GROUP BY IZ.id;
    `,
      tipoQuery: { type: Sequelize.SELECT }
    });

    return response[0];
  }
  //16,18,25,53,69,167,173,5,12,161,72
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

  async updateGatilhoSinistros(id) {
    axios.post("https://gsplanaltec.com/consultaBot/",
      {
        sqlQuery: `UPDATE importados_zurich SET gatilho = 1 WHERE id IN (${id})`
      },
      {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }).then(function (response) {
        var retorno = response.data;
        console.log(retorno)
      }).catch(function (error) {
        console.error(error);
      });
  }

  reset() {
    setTimeout(rep.importaZurich, 3000)
    console.log('reset')
  }

}
const rep = new statusreparo;
rep.importaZurich();