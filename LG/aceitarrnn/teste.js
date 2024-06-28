const puppeteer = require("puppeteer");
var axios = require("axios");
const path = require("path");
const XLSX = require("xlsx");
const fs = require("fs");
var INF = [];
var iDados = 0;
const XlsxPopulate = require('xlsx-populate');



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


  await page.goto("https:gsfsplus-america.lge.com/nxui/index.html");

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
  await page.click("#MainFrame_mainVframeset_loginFrame_form_divLogin_edtPass");
  await page.waitForTimeout(1000);
  await page.type(
    "#MainFrame_mainVframeset_loginFrame_form_divLogin_edtPass_input",
    "Planaltec2675##"
  );
  await page.waitForTimeout(2000);
  await page.click(
    "#MainFrame_mainVframeset_loginFrame_form_divLogin_edtOTPAnswer_input"
  );
  await page.waitForTimeout(2000);
  await page.type(
    "#MainFrame_mainVframeset_loginFrame_form_divLogin_edtOTPAnswer_input",
    "cvwpri2647"
  );
  await page.waitForTimeout(2000);
  await page.click(
    "#MainFrame_mainVframeset_loginFrame_form_divLogin_btnLoginTextBoxElement > div",
    "middle"
  );
  await page.waitForTimeout(5000);

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
  let rnn; // Declarando a variável rnn fora do loop
  
  dadosclean.map((res) => {
    let dataBuild = res.split(",");
    rnn = dataBuild[8]; // Atribuindo o valor a rnn
    dadosdousuario = { rnn };
    console.log(dadosdousuario);
  });
  

  
  

  //LOGUIN

  await page.waitForTimeout(8000);

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

  listagem(page, dadosdousuario);
 
  function listagem(page, dadosdousuario, i = 0) {
    (async () => {
      
      console.log('entrou aqui')
      // for (let i = 0; i < dadosdousuario.length; i++) {
      //     let valorRnn = dadosdousuario[i].rnn;
    
      //   console.log(dadosdousuario.length);
      //   console.log(rnn)

      // await page.click(
      //   "#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceListInfo_divSearch_edtSearchCondition_input"
      // );
      // await page.waitForTimeout(10000)
      // await page.type(
      //   "#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceListInfo_divSearch_edtSearchCondition_input",
      //   dadosdousuario[i].rnn
      // )


      await page.waitForTimeout(30000)
      await page.click(
        "#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceListInfo_divSearch_btnInquiryTextBoxElement > div"
      );
      await page.waitForTimeout(5000);

      //await page.click("#MainFrame_mainVframeset_workVframeset_mdiFrameset_MENU00000_form_divMain_divWork_divServiceRepair_btnRepairResultEntry")

      await page.waitForTimeout(5000);

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
                
                console.log(produto)
                
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
        IdEmpresa: 90,
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
        IdEmpresa: 90,
        Empresa: "Lg",
      };
      iDados++;
    }
      //})();// Fim Async
      fs.writeFileSync("dadosgarantia.json", JSON.stringify(INF).trim());
      console.log(INF);
      
      i++;
     //Fim função

    // enviaOs();

  })();
}

  })();
async function enviaOs(){
  console.log("enviou os dados")
  //return;
  var content = JSON.parse(fs.readFileSync("dadosgarantia.json"));
  
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
}



