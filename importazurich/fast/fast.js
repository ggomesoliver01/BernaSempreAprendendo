const puppeteer = require("puppeteer");
const path = require('path');
const XLSX  = require("xlsx"); 
const axios = require("axios");
const { timeStamp, Console } = require("console");
const filePath = process.argv.slice(2)[0];
var posts = [];
var post = {};
var dados = [];
var iDados = 0;
var isFound = false;
const fs = require('fs')

console.log(path.resolve(__dirname));

class importacaoconserto {
  //constructor(obj){}
  importaZurich(dadosTerminal) {
    //return;
    (async () => {
      const browser = await puppeteer.launch(
        { 
          headless: true,
          // executablePath: 'C:\\Users\\Micro\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe' 
        }
      );
      
                                   //  LOGUIN
      const page = await browser.newPage();

      const client = await page.target().createCDPSession();
      await client .send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: path.resolve(__dirname),
      });

      await page.setViewport({ width: 1366, height: 768});

      await page.goto("http://zews.zurich.com.br/PortalPrestador/auth/login");
       
      //Login's
      await page.waitForSelector(
        "body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input"
      );
      await page.type(
        "body > app-root > app-loading > div > app-login > mat-card > app-loading > app-email-input > div > input",
        "pvdsupl"
      );
      
      await page.type(
        "body > app-root > app-loading > div > app-login > mat-card > app-loading > app-password-input > div > div > input",
        "suPo!t0L"
      );
      await page.click(
        "body > app-root > app-loading > div > app-login > mat-card > app-loading > button"
      );
   

      await page.waitForTimeout(10000)

           // DOWNLOAD
            await page.goto('http://zews.zurich.com.br/PortalPrestador/service-orders?service=25&periodCreated=1')
            await page.waitForTimeout(30000)
            console.log('time 1')
            await page.waitForTimeout(30000)
            console.log('time 2')
            await page.waitForTimeout(30000)
            console.log('time 3')
            await page.waitForTimeout(30000)
            console.log('time 4')
            await page.waitForTimeout(30000)
            console.log('time 5')
            await page.waitForTimeout(30000)
            
            await page.waitForSelector('#dropdownMenuButton > i')
            await page.click('#dropdownMenuButton > i')
            await page.waitForSelector('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > div > app-so-options-bar > div > div > a.dropdown-item.pointer')
            await page.click('body > app-root > app-navigation > mat-sidenav-container > mat-sidenav-content > div > div > app-loading > app-so-list > app-loading > app-filter-bar > div > div > div > div > app-so-options-bar > div > div > a.dropdown-item.pointer')
             console.log('download feito')
            await page.waitForTimeout(30000)
            console.log('carrega excel ')
            await page.waitForTimeout(30000)
            console.log('1')
            await page.waitForTimeout(30000)
            console.log('2')
            await page.waitForTimeout(30000)
            console.log('3')
            await page.waitForTimeout(30000)
            console.log('4')
            await page.waitForTimeout(30000)
            console.log('5')
            await page.waitForTimeout(30000)
      
            await teste.carregaExcel(); 

            console.log('carregou')
            
            await teste.enviaOs();
            await browser.close()
           
            
            
    })()
  };
  
  

  carregaExcel(dadosTerminal){
    var XLSX = require('xlsx')
    var workbook = XLSX.readFile('service-orders-all.xls');
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    var conteudoXls;
    let colunas = {};

    xlData.forEach(element => {
      conteudoXls = []

      Object.keys(element).forEach(function(key) {
        //Primeira Coluna
       
        if(key == 'Nº Sinistro'){
          colunas.Sinistro = element[key];
        } else

        // Demais Colunas
        if(key == 'Nº da OS'){
          colunas.NdaOS  = element[key];
        } else
        
        if(key == 'Nome do Produto'){
          colunas.NomedoProduto = element[key].replace(/"/g, '');
        } else

        
        if(key == 'Defeito Reclamado'){
          colunas.DefeitoReclamado = element[key];
        } else
        
        if(key == 'Nome'){
          colunas.Nome = element[key];
        } else
        
       if(key == 'Data criacão OS'){
          colunas.DatacriacaoOS = element[key];
        } else


        if(key == 'CPF'){
          colunas.CPF = element[key];
        } else

       
        if(key == 'Rua'){
          colunas.Rua = element[key];
        } else

        if(key == 'Número'){
          colunas.Numero = element[key];
        } else

        if(key == 'Complemento'){
          colunas.Complemento = element[key];
        } else

        if(key == 'Bairro'){
          colunas.Bairro = element[key];
        } else

        if(key == 'CEP'){
          colunas.CEP = element[key];
        } else

        if(key == 'Cidade'){
          colunas.Cidade = element[key].replace(/'/g, '`')
         
        } else

        if(key == 'UF'){
          colunas.UF = element[key];
        } else

        if(key == 'Telefone'){
          colunas.Telefone = element[key];
        } else

        if(key == 'Celular'){
          colunas.Celular = element[key];
        } else

        if(key == 'Email'){
          colunas.Email = element[key];
        } else
         
        if(key == 'Valor de NF do Produto'){
          colunas.ValordeNFdoProduto = parseFloat(element[key]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
          colunas.ValordeNFdoProduto = colunas.ValordeNFdoProduto.toString().replace(",", "");
        } else

        if(key == 'Data de aviso do sinistro'){
          colunas.Datadeavisodosinistro = element[key];
        } else

        // Ultima Coluna
        if(key == 'Tipo de Reincidência'){
          colunas.TipoReicidencia = element[key];
          colunas.IdEmpresa = 71;
          colunas.Empresa = "Zurich";
          colunas.tipo = "os";
          colunas.TipoProduto = 9;
          colunas.taxa_flet = 0

          conteudoXls.push(colunas);
          colunas = {};
        }
          
    });

      dados.push(conteudoXls[0]);
    });
    fs.writeFileSync('fast.json', JSON.stringify(dados).trim());
        console.log(dados);

       

    
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
    var content = JSON.parse(fs.readFileSync("fast.json"));
    
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
      fs.unlinkSync("service-orders-all.xls")
      teste.reset()
    }
      

  }
  reset(){
    setTimeout(teste.importaZurich, 1800000)
    console.log('reset')

  }
}
  
const teste = new importacaoconserto();
 teste.importaZurich();
