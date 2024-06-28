const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const axios = require("axios");

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

    await page.waitForTimeout(10000);

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

    // Função para processar cada item da lista
    async function processItem(page, item) {
        const rnn = item.rnn;
        const prevista = item.prevista;

        // Executar as ações para o item atual
        console.log(`Processando RNN: ${rnn}, Data Prevista: ${prevista}`);
        await page.waitForTimeout(5000);

        // Clicar no link
        await page.waitForSelector('#os-transfer-table > tbody > tr > td:nth-child(4) > a');
        await page.click('#os-transfer-table > tbody > tr > td:nth-child(4) > a');
        await page.waitForTimeout(5000);

        // Extrair informações do modal
        const cep = await page.$eval('#osTransferRnnDetailsModal > div > div > div.modal-body.row #client_postal_code', input => input.value);
        console.log(cep);

        const name = await page.$eval('#osTransferRnnDetailsModal > div > div > div.modal-body.row #client_name', input => input.value);
        console.log(name);

        const email = await page.$eval('#osTransferRnnDetailsModal > div > div > div.modal-body.row #client_email', input => input.value);
        console.log(email);

        const cel = await page.$eval('#osTransferRnnDetailsModal > div > div > div.modal-body.row #client_cellphone', input => input.value);
        console.log(cel);

        // Enviar dados para algum lugar (exemplo: API)
        const dataToSend = {
            OS: rnn.trim(),
            nome: name.trim(),
            telefone: cel.trim(),
            cep: cep.trim(),
            data: prevista
            // Adicione outras informações conforme necessário
        };

        await sendDataToAPI(dataToSend);

        // Voltar à lista de itens e prosseguir para o próximo
        await page.goBack();
        await page.waitForTimeout(5000);
    }

    // Função para enviar os dados para uma API
    async function sendDataToAPI(data) {
        try {
            const response = await axios.post('https://exemplo.com/api', data);
            console.log('Dados enviados com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    }

    // Iterar sobre a lista de itens e processar cada um
    for (let i = 0; i < results.length; i++) {
        await processItem(page, results[i]);
    }


   
})();
