const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
var dados = [];
var iDados = 0;
var axios = require("axios");

(async () => {
    const downloadPath = __dirname;

    // Inicia o navegador
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const client = await page.target().createCDPSession();
    await client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: downloadPath,
    });

    await page.setViewport({ width: 1366, height: 768 });

    await page.goto('https://saclge.com.br/ascportal/login');

    await page.waitForSelector('#exampleInputEmail');
    await page.click('#exampleInputEmail');
    await page.type('#exampleInputEmail', 'BR022986-S');

    await page.type('input[name="password"]', 'NAXWAdBC');
    await page.click('button[type="submit"]');
    await page.waitForSelector('#so_transfer_pending');
    await page.click('#so_transfer_pending');

    await page.waitForTimeout(5000);
    await page.waitForSelector('#content > div.panel.panel-default.curation-table > div > div > div > div:nth-child(5) > div.col-3.mt-4 > button:nth-child(2) > i');
    await page.click('#content > div.panel.panel-default.curation-table > div > div > div > div:nth-child(5) > div.col-3.mt-4 > button:nth-child(2) > i');

    await page.waitForTimeout(6000);

    // Função para encontrar o arquivo .xlsx na pasta
    function findExcelFile() {
        const files = fs.readdirSync(__dirname);
        const excelFile = files.find(file => file.endsWith('.xlsx'));
        return excelFile;
    }

    // Encontrar o arquivo .xlsx
    const fileName = findExcelFile();

    // Se nenhum arquivo .xlsx for encontrado, encerre o script
    if (!fileName) {
        console.log('Nenhum arquivo .xlsx encontrado na pasta.');
        process.exit(1);
    }

    // Caminho completo do arquivo Excel
    const filePath = path.resolve(__dirname, fileName);

    console.log('Resultados da coluna "RNN" para a data de hoje com indicação "Redirecionar" ou "Atendimento Imediato":');
    // Função para ler a coluna "RNN" para a data de hoje com indicação "Redirecionar" ou "Atendimento Imediato"
    function processExcel(filePath) {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0]; // Considera a primeira planilha
        const worksheet = workbook.Sheets[sheetName];
        const range = xlsx.utils.decode_range(worksheet['!ref']);

        const dateColumnIndex = 'K'.charCodeAt(0) - 65; // 65 é o código ASCII de 'A'
        const responseColumnIndex = 'I'.charCodeAt(0) - 65; // 65 é o código ASCII de 'A'
        const rnnColumnIndex = 'C'.charCodeAt(0) - 65; // 65 é o código ASCII de 'A'

        const today = new Date();
        const todayString = today.toLocaleDateString('pt-BR'); // Formato "DD/MM/YYYY"

        const filteredData = [];
        for (let row = range.s.r + 1; row <= range.e.r; row++) {
            const dateCellAddress = xlsx.utils.encode_cell({ r: row, c: dateColumnIndex });
            const dateCellValue = worksheet[dateCellAddress] ? worksheet[dateCellAddress].v : null;
            if (dateCellValue && dateCellValue === todayString) {
                const responseCellAddress = xlsx.utils.encode_cell({ r: row, c: responseColumnIndex });
                const responseCellValue = worksheet[responseCellAddress] ? worksheet[responseCellAddress].v : null;
                if (responseCellValue && (responseCellValue.startsWith('Redirecionar') || responseCellValue.startsWith('Atendimento Imediato'))) {
                    const daysRegex = /D\+(\d+)/; // Expressão regular para encontrar o número de dias
                    const match = responseCellValue.match(daysRegex);
                    if (match) {
                        const daysToAdd = parseInt(match[1]); // Extrai o número de dias
                        const prevista = new Date(today.getTime() + daysToAdd * 24 * 60 * 60 * 1000); // Calcula a data prevista
                        const previstaString = prevista.toLocaleDateString('pt-BR'); // Formato "DD/MM/YYYY"
                        const rnnCellAddress = xlsx.utils.encode_cell({ r: row, c: rnnColumnIndex });
                        const rnnCellValue = worksheet[rnnCellAddress] ? worksheet[rnnCellAddress].v : null;
                        if (rnnCellValue && rnnCellValue.startsWith('RNN')) {
                            filteredData.push({ rnn: rnnCellValue, prevista: previstaString });
                        }
                    }
                }
            }
        }

        return filteredData;
    }

    const results = processExcel(filePath);
    console.log(results);

        async function processRNNs(page, arrdados, i = 0) {
          if (i >= arrdados.length) {
              console.log('Todos os RNNs foram processados.');
              await browser.close();
              
                  fs.readdirSync('.').forEach(file => {
                    if (file.endsWith('.xlsx')) {
                      fs.unlinkSync(file);
                      console.log(`Arquivo ${file} excluído com sucesso.`);
                    }
                  });
              return;
          }
  
          const rnnData = arrdados[i];
          const rnn = rnnData.rnn; // Aqui estamos acessando a propriedade correta do objeto rnnData
          const prevista = rnnData.prevista;
          console.log(`Processando ${i + 1}/${arrdados.length}: ${rnn}, Data Prevista: ${prevista}`);
        await page.waitForSelector('#os-transfer-table_filter > label > input')
        const inputinicio = await page.$('#os-transfer-table_filter > label > input')
        await inputinicio.click({ clickCount: 3})
        await page.type('#os-transfer-table_filter > label > input', rnn);
        await page.waitForSelector('#os-transfer-table > tbody > tr > td:nth-child(6) > span')
        const spanTexts = await page.$$eval('#os-transfer-table > tbody > tr > td:nth-child(6) > span', elements => elements.map(el => el.innerText))
        garantia = spanTexts[0]
        console.log(garantia)

        const spanTexts1 = await page.$$eval('#os-transfer-table > tbody > tr > td:nth-child(5)', elements => elements.map(el => el.innerText))
        produto = spanTexts1[0]
        console.log(produto)
       
        const spanTexts2 = await page.$$eval('#os-transfer-table > tbody > tr > td:nth-child(8)', elements => elements.map(el => el.innerText))
        cidade = spanTexts2[0]
        console.log(cidade)

        const spanTexts3 = await page.$$eval('#os-transfer-table > tbody > tr > td:nth-child(7)', elements => elements.map(el => el.innerText))
        UF = spanTexts3[0]
        console.log(UF)

        
        
        user = 0 
        
        if (garantia == "Sim"){
          user = 90
        }else 
        user = 91
        
        await page.waitForSelector('#os-transfer-table > tbody > tr > td:nth-child(4) > a')
        await page.click('#os-transfer-table > tbody > tr > td:nth-child(4) > a')
     
       
        await page.waitForTimeout(5000)
        
        
        
        await page.waitForSelector('#osTransferRnnDetailsModal > div > div > div.modal-body.row', { visible: true });
        const cep = await page.$eval('#osTransferRnnDetailsModal > div > div > div.modal-body.row #client_postal_code', input => input.value);
        console.log(cep)
        
          
            await page.waitForSelector('#osTransferRnnDetailsModal > div > div > div.modal-body.row', { visible: true });
            const name = await page.$eval('#osTransferRnnDetailsModal > div > div > div.modal-body.row #client_name', input => input.value);
            console.log(name)

            await page.waitForSelector('#osTransferRnnDetailsModal > div > div > div.modal-body.row', { visible: true });
            const email = await page.$eval('#osTransferRnnDetailsModal > div > div > div.modal-body.row #client_email', input => input.value);
            console.log(email)

            await page.waitForSelector('#osTransferRnnDetailsModal > div > div > div.modal-body.row', { visible: true });
            const cel = await page.$eval('#osTransferRnnDetailsModal > div > div > div.modal-body.row #client_cellphone', input => input.value);
            console.log(cel)

            await page.waitForSelector('#osTransferRnnDetailsModal > div > div > div.modal-body.row', { visible: true });
            const tel = await page.$eval('#osTransferRnnDetailsModal > div > div > div.modal-body.row #client_phone', input => input.value);
            console.log(tel)

            await page.waitForSelector('#osTransferRnnDetailsModal > div > div > div.modal-header > button')
            await page.click('#osTransferRnnDetailsModal > div > div > div.modal-header > button')
           
          


            dados[iDados] = {
                OS: rnn.trim(),
                nome: name.trim(),
                telefone: tel.trim(),
                celular: cel.trim(),
                cidade: cidade.trim(),
                cep: cep.trim(),
                data: prevista,
                IdProduto: '9',
                produto: produto.trim(),
                tipo: "os",
                IdEmpresa: user,
                Empresa: "Lg",
                
              }
              fs.writeFileSync('portal.json', JSON.stringify(dados).trim());
              console.log(dados);
              i++;
              iDados++;

           console.log(' asdasdasdasd')
           await envia()
           console.log(dados)
          await page.waitForTimeout(5000)
          


        // Chama a função recursivamente para o próximo RNN
        processRNNs(page, arrdados, i + 1);
    }

    // Inicia o processamento recursivo dos RNNs
    processRNNs(page, results);
    
 
    

    async function envia() {
        console.log('enviou os dados')
        var content = JSON.parse(fs.readFileSync("portal.json"));
        axios
          .post(
            "https://gsplanaltec.com/GerenciamentoServicos/APIControle/Importacao",
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
    

})();