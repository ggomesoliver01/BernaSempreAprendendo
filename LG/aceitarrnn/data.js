const puppeteer = require("puppeteer");
const path = require("path");
const { ALL, reverse } = require("dns");
var axios = require("axios");
var fs = require("fs");
var posts = [];
var dados = [];
var iDados = 0;
const { ImapFlow } = require("imapflow");
const XLSX = require("xlsx");
var INF = [];
const imapS = require('imap');
const {simpleParser} = require('mailparser');
const XlsxPopulate = require('xlsx-populate');
const { Keyboard } = require("puppeteer-core");


console.log(path.resolve(__dirname));


function fromDir(startPath, filter) {
  if (!fs.existsSync(startPath)) {
      console.log("no dir ", startPath);
      return;
  }

  var files = fs.readdirSync(startPath);

  for (var i = 0; i < files.length; i++) {
      var filename = path.join(startPath, files[i]);
    
      var stat = fs.lstatSync(filename);
      if (stat.isDirectory()) {
          fromDir(filename, filter); //recurse
      } else if (filename.endsWith(filter)) {
        return filename;
      }
  }
}

class importacao {
    importaLG(i = 0) {
    (async () => {
      const browser = await puppeteer.launch({
        headless: false,
        // executablePath:
        //   "C:\\Users\\Micro\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe",
     
      });
     
      const page = await browser.newPage();
      const client = await page.target().createCDPSession();
      await client.send("Page.setDownloadBehavior", {
          behavior: "allow",
          downloadPath: path.resolve(__dirname),
        });
        await page.setViewport({ width: 1366, height: 768 });
        this.fvckBerna(page)
        await page.goto("https:gsfsplus-america.lge.com/nxui/index.html");
        enviaOs();
      await page.waitForTimeout(5000);
      await page.click(
        "#MainFrame_mainVframeset_loginFrame_form_divLogin_edtUserId_input"
      );
      await page.waitForTimeout(2000);
      await page.type(
        "#MainFrame_mainVframeset_loginFrame_form_divLogin_edtUserId_input",
        "BR022986_TI"
      );
      await page.waitForTimeout(2000);
      await page.click(
        "#MainFrame_mainVframeset_loginFrame_form_divLogin_edtPass"
      );
      await page.waitForTimeout(1000);
      await page.type(
        "#MainFrame_mainVframeset_loginFrame_form_divLogin_edtPass_input",
        "Planaltec2675##"
      );

      await page.waitForSelector('#MainFrame_mainVframeset_loginFrame_form_divLogin_btnTempPwTextBoxElement > div')
      await page.click('#MainFrame_mainVframeset_loginFrame_form_divLogin_btnTempPwTextBoxElement > div')
      
      await page.waitForSelector('#MainFrame_mainVframeset_loginFrame_TemporaryPasswordRequest_form_edtPass_input')
      await page.type('#MainFrame_mainVframeset_loginFrame_TemporaryPasswordRequest_form_edtPass_input', "Planaltec2675##")
      
      await page.waitForSelector('#MainFrame_mainVframeset_loginFrame_TemporaryPasswordRequest_form_btnAuthTextBoxElement > div')
      await page.click('#MainFrame_mainVframeset_loginFrame_TemporaryPasswordRequest_form_btnAuthTextBoxElement > div')
      await page.waitForTimeout(5000)
      await page.waitForSelector('#MainFrame_mainVframeset_loginFrame_TemporaryPasswordRequest_form_btnTempTextBoxElement > div')
      await page.click('#MainFrame_mainVframeset_loginFrame_TemporaryPasswordRequest_form_btnTempTextBoxElement > div')
      await page.waitForTimeout(5000)
      await page.waitForSelector('#MainFrame_mainVframeset_loginFrame_TemporaryPasswordRequest_titlebar_closebuttonAlignImageElement')
      await page.click('#MainFrame_mainVframeset_loginFrame_TemporaryPasswordRequest_titlebar_closebuttonAlignImageElement')
      await page.waitForTimeout(8000)
      console.log('OTP')
      await page.waitForTimeout(8000)



      var teste;
const client2 = new ImapFlow({
  host: "outlook.office365.com",
  port: 993,
  secure: true,
  auth: {
    user: "planalbot@outlook.com",
    pass: "Planaltec@2675TI",
  },
  logger: false, 
});


const main = async () => {
  
    await client2.connect();

    
    let lock = await client2.getMailboxLock('INBOX');
    try {
        let message = await client2.fetchOne(client2.mailbox.exists, { source: true });
        teste = message.source.toString().split("<br>")
        console.log(teste[6])

        teste[6] = teste[6].toString().replace("Temporary Password : ", "");
        teste[6] = teste[6].toString().replace(" ", "");
    } finally {
       
        lock.release();
    }

    await client2.logout();
};

main().catch(err => console.error(err));

   
      //LOGUIN
      await page.goto("https:gsfsplus-america.lge.com/nxui/index.html");
      await page.waitForTimeout(5000);
      await page.click(
        "#MainFrame_mainVframeset_loginFrame_form_divLogin_edtUserId_input"
      );
      await page.waitForTimeout(2000);
      await page.type(
        "#MainFrame_mainVframeset_loginFrame_form_divLogin_edtUserId_input",
        "BR022986_TI"
      );
      await page.waitForTimeout(2000);
      await page.click(
        "#MainFrame_mainVframeset_loginFrame_form_divLogin_edtPass"
      );
      await page.waitForTimeout(1000);
      await page.type(
        "#MainFrame_mainVframeset_loginFrame_form_divLogin_edtPass_input",
        "Planaltec2675##"
      );
      await page.waitForTimeout(2000);
      await page.click(
        "#MainFrame_mainVframeset_loginFrame_form_divLogin_edtOTPAnswer_input"
      );
      await page.waitForSelector('#MainFrame_mainVframeset_loginFrame_form_divLogin_edtOTPAnswer_input')
      await page.type(
        "#MainFrame_mainVframeset_loginFrame_form_divLogin_edtOTPAnswer_input",
        `${teste[6]}`
      );
      await page.waitForTimeout(2000);
      await page.click(
        "#MainFrame_mainVframeset_loginFrame_form_divLogin_btnLoginTextBoxElement > div",
        "middle"
      );
    await page.waitForTimeout(5000);
    await page.click(
      "#MainFrame_mainVframeset_workVframeset_topFrame_form_mnuMain_MNU00002TextBoxElement > div"
    );
    await page.click(
      "#MainFrame_mainVframeset_workVframeset_topFrame_form_mnuMain_popupmenu_MNU00052TextBoxElement > div"
    );
    await page.waitForTimeout(10000);
    await page.click(
      "#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceListInfo_divSearch_cobSerTechnician_btnSelect"
      );
      await page.click(
        "#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceListInfo_divSearch_cobSerTechnician_pdvPopupCombo_grdExtCombo_body_gridrow_0_cell_0_0GridCellTextContainerElement > div"
    );
    await page.click(
      "#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceListInfo_divSearch_cobSearchConditonName_dropbutton > div"
    );
    await page.click(
      "#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceListInfo_divSearch_cobSearchConditonName_combolist_itemTextBoxElement > div"
    );

      await page.waitForSelector('#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceListInfo_divSearch_cobSearchDate_dropbutton')
      await page.click('#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceListInfo_divSearch_cobSearchDate_dropbutton')
      await page.waitForTimeout(5000)
      
      //await page.waitForSelector('#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceListInfo_divSearch_cobSearchDate_combolist_itemTextBoxElement > div')
     
   

      const textoProcurado = 'Data de Transferência';

      try {
        const xpath = `//*[text()='${textoProcurado}']`;
        const elemento = await page.waitForXPath(xpath);
      
        if (elemento) {
          await elemento.click();
          console.log(`Clique realizado com sucesso no elemento contendo o texto: ${textoProcurado}`);
        } else {
          console.log(`Elemento com o texto "${textoProcurado}" não encontrado.`);
        }
      } catch (error) {
        console.error('Erro ao clicar no elemento:', error);
      }
      var date = new Date().toISOString().slice(0, 10).split('-').reverse().join('/');
      console.log(date)
      await page.waitForSelector('#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceListInfo_divSearch_calSerDateFromTo__edtFrom_calendaredit_input')
      await page.click('#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceListInfo_divSearch_calSerDateFromTo__edtFrom_calendaredit_input', {clickCount: 3 })
      await page.type('#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceListInfo_divSearch_calSerDateFromTo__edtFrom_calendaredit_input',date)
      console.log('mudar data')
      await page.waitForTimeout(15000)
      
      
      await page.waitForSelector('#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceListInfo_divSearch_btnInquiry')
      await page.click('#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceListInfo_divSearch_btnInquiry')

     await page.waitForTimeout(6000)
      await page.click('#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceListInfo_gridServiceList_head_gridrow_-1_cell_-1_0_controlcheckbox_chkimg > div')
      await page.waitForTimeout(5000)
      await page.click('#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divTitle_btnExportExcel > div')
      await page.waitForTimeout(5000)
      await page.click('#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divGridList_grdGridList_body_gridrow_0_cell_0_0_controlcheckbox_chkimg > div')      
      await page.waitForTimeout(5000)
      await page.click('#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divGridList_btnOkTextBoxElement')
      await page.waitForTimeout(5000)
      await page.type('#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_ExcelPwdReasonP_form_divWork_txtPwd_input','##LG12345678')
      await page.waitForTimeout(5000)
      await page.click('#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_ExcelPwdReasonP_form_divWork_txtReasonTextAreaElement')
      await page.type('#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_ExcelPwdReasonP_form_divWork_txtReasonTextAreaElement','##LG12345678')
      await page.waitForTimeout(5000)
      await page.click('#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_ExcelPwdReasonP_form_btnSaveTextBoxElement')
      console.log('aqui aqui')
     


      await page.waitForTimeout(30000)
      
  var planilha = fromDir('./', '.xlsx');
var teste = await XlsxPopulate.fromFileAsync(planilha, {password: '##LG12345678'}).then(async workbook => {
  await workbook.toFileAsync("./planilhaSemSenha.xlsx")
  return true;
});

if(teste) {
  var workbook = XLSX.readFile('planilhaSemSenha.xlsx');
  
}

  console.log("LOGUIN FEITO");

  const carregaExcel = XLSX.readFile(path.resolve("planilhaSemSenha.xlsx"));

  const SheetName = carregaExcel.SheetNames;

  const dadosBrutos = XLSX.utils.sheet_to_csv(
    carregaExcel.Sheets[SheetName[0]]
  );

  const dados = dadosBrutos.split("\n");

  const dadosTamanho = dados.length;

  const dadosclean = dados.slice(1, dadosTamanho);

  let arrdados = [];
  dadosclean.map((res) => {
    let dataBuild = res.split(",");
    let rnn = dataBuild[8];
    let dadosdousuario = { rnn };
    //if (!rnn& !''){}

    // else {

   console.log(dadosdousuario)
      arrdados.push(dadosdousuario);
      //}
    
    });
    
    
    //LOGUIN
    
    await page.waitForTimeout(8000);


  listagem(page, arrdados);
  
})();

function listagem(page, arrdados, i = 0) {
  (async () => {
    for (let loop = 0; loop < arrdados.length; loop++) {
      console.log(loop);
      console.log(arrdados.length);
      
      console.log(arrdados[loop].rnn)
      await page.waitForTimeout(5000)

    
 
     if (arrdados[i].rnn != '' && arrdados[i].rnn != undefined){
      // await page.waitForTimeout(10000)
      // #MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceListInfo_divSearch_cobSearchDate_dropbuttonImageElement > img
      // #MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceListInfo_divSearch_cobSearchDate_dropbutton
      await page.click(
        "#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceListInfo_divSearch_edtSearchCondition_input"
      );
      await page.waitForTimeout(5000)
      await page.type(
        "#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceListInfo_divSearch_edtSearchCondition_input",
        arrdados[i].rnn
      )
      await page.click(
        "#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceListInfo_divSearch_btnInquiryTextBoxElement > div"
      );
    
      //await page.click("#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceRepair_btnRepairResultEntry")
      
      await page.waitForTimeout(8000);
      
      const rnnDois = await page.$eval(
        "#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceRepair_edtServiceReceiptNo_input",
        ({ value }) => value
      );
      

      const nome = await page.$eval(
        "#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceRepair_edtCustomerName_input",
        ({ value }) => value
      );
     

      const telefone = await page.$eval(
        "#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceRepair_edtSerSvccenterName01_input",
        ({ value }) => value
      );
     

      const celular = await page.$eval(
        "#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceRepair_edtCellularNo_input",
        ({ value }) => value
      );
     
      console.log('@@@@@@')
      const modelo = await page.$eval(
        "#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceRepair_edtModel_input",
        ({ value }) => value
      );
      

      const endereço = await page.$eval(
        "#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceRepair_edtAddress_input",
        ({ value }) => value
      );
      

      const cidade = await page.$eval(
        "#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceRepair_edtCityName_input",
        ({ value }) => value
      );
      //console.log(cidade)

      const cep = await page.$eval(
        "#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceRepair_edtPostalCode_input",
        ({ value }) => value
      );
      //console.log(cep)

      const produto = await page.$eval(
        "#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceRepair_edtSvcProduct_input",
        ({ value }) => value
     );
      
      const DR = await page.$eval(
        "#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceRepair_edtSpecialInstruction_textarea",
        ({ value }) => value
      );

      const garantia = await page.$eval(
        "#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceRepair_cobWarranty_comboedit_input",
        ({ value }) => value
      );
     
     console.log(garantia)
     
     
     
     console.log(produto)
     
     var user = 0
     if (garantia == "Fora de Garantia") {
       
       user = 91
      } else {
        user = 90
      }
      
      console.log(user)
      
   
      
    if (produto == 'CargaFrontal'|| produto == 'Split parede (com aquecedor)'){
      
      INF[iDados] = {
        OS: rnnDois.trim(),
        nome: nome.trim(),
        modelo: modelo.trim(),
        telefone: telefone.trim(),
        celular: celular.trim(),
        end: endereço.trim(),
        cidade: cidade.trim(),
        cep: cep.trim(),
        IdProduto: '9',
        produto: produto.trim(),
        defeitoreclamado: DR.trim(),
        tipo: "os",
        IdEmpresa: user,
        Empresa: "Lg",
      };
      iDados++;
    } else {
      
      INF[iDados] = {
        OS: rnnDois.trim(),
        nome: nome.trim(),
        modelo:modelo.trim(),
        telefone: telefone.trim(),
        celular: celular.trim(),
        end: endereço.trim(),
        cidade: cidade.trim(),
        cep: cep.trim(),
        IdProduto: '52',
        produto: produto.trim(),
        defeitoreclamado: DR.trim(),
        tipo: "os",
        IdEmpresa: user,
        Empresa: "Lg",
      };
      iDados++;
      console.log(INF)
    }
    fs.writeFileSync("dadosgarantia.json", JSON.stringify(INF).trim());
    console.log(INF);
     }
    i++;
  }
      //})();// Fim Async

    
     //Fim função
     enviaOs();


  })();
}

async function enviaOs(){
  console.log("enviou os dados")
  //return;
  var content = JSON.parse(fs.readFileSync("data.json"));
  
  await loopEnvia(content);
}

async function loopEnvia(content, i = 0, tentativas = 1) {
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
    await loopEnvia(content, i, tentativas);
  else
    console.log('Finalizou tudo!');

    fs.readdirSync('.').forEach(file => {
      if (file.endsWith('.xlsx')) {
        fs.unlinkSync(file);
        console.log(`Arquivo ${file} excluído com sucesso.`);
      }
    });
 
    
}


  }


async fvckBerna(page){ 
  page.on('dialog', async dialog => {
    //get alert message
    console.log(dialog.message());
    //accept alert
    await dialog.accept();
  });
  }
}

const teste = new importacao();
teste.importaLG();

  
    