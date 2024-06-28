const XLSX = require('xlsx');
const fs = require("fs");
const puppeteer = require("puppeteer");
const axios = require("axios");
const path = require('path');
const { timingSafeEqual } = require('crypto');


var iDados = 0;
let dados = [];
let json = {};

class Vinculacao {
    async logando(i = 1, listagem = 1) {
    const browser = await puppeteer.launch({
        headless: true,
    });

    console.log("login");
    const page = await browser.newPage();
    const client = await page.target().createCDPSession();
      await client .send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: path.resolve(__dirname),
      });
    await page.setViewport({ width: 1366, height: 768 });

    await page.goto(
        "https://www.assurantclaims.com.br/index.jsp"
    );
    await page.waitForTimeout(3000);
    await page.click("#formulario\\:usuario")
    await page.waitForTimeout(1000)
    //Login
    await page.type("#formulario\\:usuario", "MGC028")
    await page.waitForTimeout(2000)
    await page.click("#formulario\\:senha")
    await page.waitForTimeout(1000)
    //Senha (Manutenções nessa senha)
    await page.type("#formulario\\:senha", "N3i4pJao")
    await page.waitForTimeout(2000)
    await page.click("#btnLogin")
    await page.waitForTimeout(3000)
    await page.waitForSelector("#assistenciaSelect");
    await page.select('#assistenciaSelect', "MGC0299");
    console.log("Assistencia selecionada!")
    await page.waitForTimeout(5000)
    var alertaMensagens = await page.$x(
      "/html/body/div[3]/div[2]/div/div[2]/table/tbody/tr[2]/td/table[2]/tbody/tr/td/input"
    );
    console.log(alertaMensagens);
    if (alertaMensagens == "") {
      await page.waitForTimeout(2000);
      console.log("Sem alerta");
    } else if (alertaMensagens) {
      await page.waitForTimeout(2000);
      await page.click("#j_id34");
      await page.waitForTimeout(2000);
    }
    await page.waitForSelector('#iconformularioMenu\\:menuAtendimento')
    await page.click('#iconformularioMenu\\:menuAtendimento')
    await page.waitForTimeout(3000)
    await page.waitForSelector('#iconformularioMenu\\:sinistroEmAberto')
    await page.click('#iconformularioMenu\\:sinistroEmAberto')


    await page.waitForTimeout(6000)
    var alerta = await page.$x(
        "/html/body/div[3]/div[2]/div/div[2]/table/tbody/tr[1]/td/div"
    );
    console.log(alerta);

    if (alerta == "") {
        await page.waitForTimeout(2000);
        console.log("Sem alerta")
    } else if (alerta) {
        await page.waitForTimeout(2000);
        await page.click("#j_id34")
        await page.waitForTimeout(2000);
    }
    await page.waitForTimeout(8000)
    const baixaPlanilha = await page.$x(
        "/html/body/form[1]/table/tbody/tr[1]/td[2]/div[3]/div/table[1]/tbody/tr/td[3]/table/tbody/tr/td/a/img"
    );
    await baixaPlanilha[0].click();
    console.log("Realizando o Donwload da planilha!")
    await page.waitForTimeout(5000)
    teste.exportaPlanilha();
    return;
}

    async exportaPlanilha(linha = 1, coluna, ) {
        const allArqExcel = XLSX.readFile('sinistros_em_aberto.xlsx')
        const sheetName = allArqExcel.SheetNames[0]; // Assumindo que você deseja processar apenas a primeira planilha

        const worksheet = allArqExcel.Sheets[sheetName];
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        
        let dadosclean = [];
        let currentRow = [];
        for (let R = range.s.r; R <= range.e.r; R++) {
            let row = [];
            for (let C = range.s.c; C <= range.e.c; C++) {
                const cellAddress = { r: R, c: C };
                const cellRef = XLSX.utils.encode_cell(cellAddress);
                const cell = worksheet[cellRef];
                const cellValue = cell ? cell.v : null;
                row.push(cellValue);
                if (XLSX.utils.encode_col(C) === 'AA') {
                    currentRow = row.slice();
                }
            }
            dadosclean.push(currentRow);
        }
        
        let dadosCliente = dadosclean[linha];
        console.log(dadosCliente);
        if (dadosCliente === undefined){
            this.enviaOs();
            return;
        }
        var coluna26 = dadosCliente[26]
        var taxaflet = 0

        if(coluna26.includes("MERCADO LIVRE")){
          console.log("Atendimento em mercado livre!")
          taxaflet = 1;
        }
        
        let sinistro = dadosCliente[0]; // A segunda coluna (Coluna 2) está no índice 1
        let nomeDoCliente = dadosCliente[2]; // A primeira coluna (Coluna 1) está no índice 0
        let status = dadosCliente[5];
        let cpf = dadosCliente[3];
        let enderecoCliente = dadosCliente[13];
        let bairroCliente = dadosCliente[14];
        let estadoCliente = dadosCliente[16];
        let cidadesinistro = dadosCliente[15];
        let lojaCliente = '';
        let cep = dadosCliente[17];
        let produtosinistro = dadosCliente[7];
        let valorNFsinistro = dadosCliente[8];
        let telefonesinistro = dadosCliente[18];
        let celularsinistro = dadosCliente[19];
        let marca = dadosCliente[10];
        let modelo = '';
        let reclamacoes = dadosCliente[11];

        //Consoles para verificação
        console.log('Numero:', sinistro);
        console.log('Nome do cliente:', nomeDoCliente);
        console.log('Status:', status);
        console.log('Cpf:', cpf);
        console.log('Endereço:', enderecoCliente);
        console.log('Bairro:', bairroCliente);
        console.log('Estado:', estadoCliente);
        console.log('Cidade:', cidadesinistro);
        console.log('Cep:', cep);
        console.log('Produto', produtosinistro);
        console.log('Valor NF:', valorNFsinistro);
        console.log('Telefone:', telefonesinistro);
        console.log('Celular:', celularsinistro);
        console.log('Marca:', marca);
        console.log('Modelo:', modelo)
        console.log('OS:', sinistro)
        console.log('Defeito:', reclamacoes)

        dados[iDados] = {
            Sinistro: sinistro,
            Status: status,
            Cliente: nomeDoCliente,
            CPF: cpf,
            endereco: enderecoCliente,
            bairro: bairroCliente,
            estado: estadoCliente,
            loja: lojaCliente,
            CEP: cep,
            produto: produtosinistro,
            valorNF: valorNFsinistro,
            cidade: cidadesinistro,
            telefone: telefonesinistro,
            celular: celularsinistro,
            Marca: marca,
            Modelo: modelo,
            OS: sinistro,
            Reclamacoes: reclamacoes,
            taxa_flet: taxaflet,
            Empresa: "Assurant",
            Sistema: "1",
            tipo: "os",
            IdEmpresa: "114",
            IdProduto: "101",
        }
        dados[iDados].valorNF = dados[iDados].valorNF.replace("R$ ", "");
        dados[iDados].Cliente = dados[iDados].Cliente.replace("  ", "");
        dados[iDados].Cliente = dados[iDados].Cliente.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        dados[iDados].valorNF = dados[iDados].valorNF.replace(".", "");
        dados[iDados].valorNF = dados[iDados].valorNF.replace(",", ".");
        dados[iDados].valorNF = Number(dados[iDados].valorNF)
        dados[iDados].Reclamacoes = dados[iDados].Reclamacoes.replace(/[\n\t]/g, '');
        dados[iDados].produto = dados[iDados].produto.replace(/\\/g, '');
        dados[iDados].produto = dados[iDados].produto.replace("'", "");
        dados[iDados].produto = dados[iDados].produto.replace("\"", "");
        dados[iDados].produto = dados[iDados].produto.replace("/", "");
        dados[iDados].produto = dados[iDados].produto.replace('"', "");
        dados[iDados].endereco = dados[iDados].endereco.replace(",", "");
        dados[iDados].cidade = dados[iDados].cidade.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        dados[iDados].endereco = dados[iDados].endereco.replace("º", "");
        dados[iDados].endereco = dados[iDados].endereco.replace("°", "");
        dados[iDados].endereco = dados[iDados].endereco.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        dados[iDados].produto = dados[iDados].produto.replace("/", "");
        dados[iDados].endereco = dados[iDados].endereco.replace("  ", "");

        iDados++;

        fs.writeFileSync("dadosmerli.json", JSON.stringify(dados).trim());
        console.log(dados);
        linha++;
        await this.exportaPlanilha(linha);
        return;
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
          //this.enviaOs
    
      }

      async enviaOs(){
        console.log("enviou os dados")
        //return;
        var content = JSON.parse(fs.readFileSync("dadosmerli.json"));
        
        await teste.loopEnvia(content);
      }
    
      async loopEnvia(content, i = 0, tentativas = 1) {
        try {
          await axios.post('https://gsplanaltec.com/GerenciamentoServicos/APIControle/Importacao', [ content[i] ], {
            headers:{
                    'Content-Type' : 'application/json; charset=UTF-8',
                }
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.error(error);
            });
    
            tentativas = 1;
            i++;
        } catch(e) {
          if(tentativas == 4) {
            tentativas = 1;
            i++;
          } else
            tentativas += 1;
            
          console.log(e, 'tentativa:' + tentativas);
        }
    
        if(i <= content.length -1)
          await teste.loopEnvia(content, i, tentativas);
        else{
          console.log('Finalizou tudo!');
          fs.unlinkSync("sinistros_em_aberto.xlsx")
          teste.reset()
        }
          
    
      }
      reset(){
        setTimeout(teste.logando, 600000)
        console.log('reset')
    
      }
}

module.exports = { Vinculacao };

const teste = new Vinculacao();
teste.logando();
