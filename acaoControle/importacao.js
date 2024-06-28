const Sequelize = require("sequelize")
const _ = require('underscore');
const axios = require("axios");
const { format } = require("date-fns");
var horarioFormatado = "";

module.exports = class Importacao {

    acaoModel = require("../acaoModel/acaoModel");

    constructor() {
        this.acaoModel = new this.acaoModel;
    }
    
    async cadastraOS(ld){
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        if (month < 10){
            month = `0${month}`;
        }
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        let dataBR = day + "/" + month + "/" +  year; 
        let CEP = ld["CEP"];//CEP
        let tecnico = "";
        let logradouro = ld["endereco"].replaceAll('/[^a-zA-Z0-9_ %\[\]\.\(\)%&-]/s', '');//logradouro
        let telefone_1 = ld["telefone"];
        let telefone_2 = ld["celular"];
        let bairro = ld["bairro"];//bairro
        let estado = (ld["estado"]) && ld["estado"].length == 2 ? ld["estado"] : "";
        estado = estado != "Não informado" ? estado : null;
        let cidadeII = await this.CarregaCidadesDosEstado(estado, ld["cidade"].trim());

        let status = 5;
        let Verificacao = await this.reincidenciaReingresso(ld["Cliente"], ld["produto"], estado, ld["cidade"].trim(), ld["CPF"]);
        let data = {
            telefone_1: telefone_1,
            telefone_2: telefone_2,
            CEP: CEP,
            loja: ld["loja"],
            bairro_iz: bairro,
            logradouro: logradouro,
            Sinistro: ld["Sinistro"],
            OS: ld["Sinistro"] ? ld["Sinistro"] : null,
            grupo: null,
            cliente: ld["Cliente"],
            reclamacaoCliente: ld["Reclamacoes"],
            produto:ld["produto"],
            data: dataBR,
            tipo_produto: ld["IdProduto"],
            status_pg: 6,
            status: status ? status : NULL,
            uf: estado,
            cidade: (cidadeII.length != 0)? cidadeII[0].id_cidade : null,
            Usuario: 39,
            cpf: ld["CPF"],	
            marca:  ld["Marca"],
            modelo: ld["Modelo"],
            id_emp: ld["IdEmpresa"],	
            valorNF: ld["valorNF"],
            sistema: ld["Sistema"]
        };
        data["reincidencia"] = Verificacao.reincidencia;
        
        let OS_Inp = await this.carrega_registroWhere({"OS": ld["Sinistro"], "id_emp": ld["IdEmpresa"]}, "importados_zurich");
        let cancelar = false;

        console.log('oi:', OS_Inp, OS_Inp.length)
        
        if(OS_Inp.length > 0){
            cancelar = true;

        console.log('cancelar:', cancelar)
        }
        let chechkSinistro = await this.carrega_registroWhere(data, "importados_zurich")    

        console.log(chechkSinistro.length == 0 && !cancelar)

        if(chechkSinistro.length == 0 && !cancelar) {

            console.log("entrou")

            if(Verificacao.reincidencia == 1)
                tecnico = Verificacao.tecnico;
            else
                tecnico = await this.buscaTecnicosPorDistancia(CEP, ld["produto"], ld["IdEmpresa"]);
            
            data["tecnico"] = tecnico ? tecnico : null;

            let id = await this.gernerateInsert("importados_zurich", data);
            await this.inclusaoOSCP(id);

            if(id && !ld["Sinistro"]){
                await this.atualiza_registros_where({
                        where: {"id": id}, 
                        form: { "OS": id },
                    }, 
                    "importados_zurich"
                );
            }

            this.criarDesc(id, status);
            
        }
    }

    async cadastraOSElectrolux(ld){
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        if (month < 10){
            month = `0${month}`;
        }
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        let dataBR = day + "/" + month + "/" +  year; 
        let CEP = ld["Cep"];//CEP
        let tecnico = "";
        let logradouro = ld["Rua"].replaceAll('/[^a-zA-Z0-9_ %\[\]\.\(\)%&-]/s', '');//logradouro
        let telefone_1 = ld["telefone"];
        let telefone_2 = ld["telefone2"];
        let bairro = ld["Bairro"];//bairro
        let estado = (ld["Estado"]) && ld["Estado"].length == 2 ? ld["Estado"] : "";
        estado = estado != "Não informado" ? estado : null;
        let cidadeII = await this.CarregaCidadesDosEstado(estado, ld["Cidade"].trim());

        let status = ld["status"];
        let Verificacao = await this.reincidenciaReingresso(ld["Nome"], ld["produto"], estado, ld["Cidade"].trim(), ld["Cpf"]);
        let data = {
            telefone_1: telefone_1,
            telefone_2: telefone_2,
            CEP: CEP,
            bairro_iz: bairro,
            logradouro: logradouro,
            Sinistro: ld["Sinistro"],
            OS: ld["Sinistro"] ? ld["Sinistro"] : null,
            grupo: null,
            cliente: ld["Nome"],
            reclamacaoCliente: ld["Defeito"],
            produto:ld["produto"],
            data: dataBR,
            tipo_produto: ld["TipoProduto"],
            status_pg: 6,
            status: status ? status : NULL,
            uf: estado,
            cidade: (cidadeII.length != 0)? cidadeII[0].id_cidade : null,
            Usuario: 39,
            cpf: ld["Cpf"],	
            id_emp: ld["IdEmpresa"],	
        };
        data["reincidencia"] = Verificacao.reincidencia;
        
        let OS_Inp = await this.carrega_registroWhere({"OS": ld["Sinistro"], "id_emp": ld["IdEmpresa"]}, "importados_zurich");
        let cancelar = false;

        console.log('oi:', OS_Inp, OS_Inp.length)
        
        if(OS_Inp.length > 0){
            cancelar = true;

        console.log('cancelar:', cancelar)
        }
        let chechkSinistro = await this.carrega_registroWhere(data, "importados_zurich")    

        console.log(chechkSinistro.length == 0 && !cancelar)

        if(chechkSinistro.length == 0 && !cancelar) {

            console.log("entrou")

            if(Verificacao.reincidencia == 1)
                tecnico = Verificacao.tecnico;
            else
                tecnico = await this.buscaTecnicosPorDistancia(CEP, ld["produto"], ld["IdEmpresa"]);
            
            data["tecnico"] = tecnico ? tecnico : null;

            let id = await this.gernerateInsert("importados_zurich", data);
            await this.inclusaoOSCP(id);

            if(id && !ld["Sinistro"]){
                await this.atualiza_registros_where({
                        where: {"id": id}, 
                        form: { "OS": id },
                    }, 
                    "importados_zurich"
                );
            }

            await this.criarDesc(id, status);
            await this.gatilhoStatus(id, status);
        }
    }

    // async cadastraOSZurich(ld){
    //     let dateObj = new Date();
    //     let month = dateObj.getUTCMonth() + 1; //months from 1-12
    //     if (month < 10){
    //         month = `0${month}`;
    //     }
    //     let day = dateObj.getUTCDate();
    //     let year = dateObj.getUTCFullYear();
    //     let dataBR = day + "/" + month + "/" +  year; 
    //     let CEP = ld["CEP"];//CEP
    //     let tecnico = "";
    //     let logradouro = ld["endereco"];
    //     let telefone_1 = ld["telefone"];
    //     let telefone_2 = ld["celular"];
    //     let bairro = ld["bairro"];//bairro
    //     let estado = (ld["estado"]) && ld["estado"].length == 2 ? ld["estado"] : "";
    //     estado = estado != "Não informado" ? estado : null;
    //     let cidadeII = await this.CarregaCidadesDosEstado(estado, ld["cidade"]);

    //     let status = 5;
    //     let Verificacao = await this.reincidenciaReingresso(ld["Cliente"], ld["produto"], estado, ld["cidade"], ld["CPF"]);
    //     let data = {
    //         telefone_1: telefone_1,
    //         telefone_2: telefone_2,
    //         CEP: CEP,
    //         loja: ld["loja"],
    //         bairro_iz: bairro,
    //         logradouro: logradouro,
    //         Sinistro: ld["Sinistro"],
    //         OS: ld["Sinistro"] ? ld["Sinistro"] : null,
    //         grupo: null,
    //         cliente: ld["Cliente"],
    //         reclamacaoCliente: ld["Reclamacoes"],
    //         produto:ld["produto"],
    //         data: dataBR,
    //         tipo_produto: ld["IdProduto"],
    //         status_pg: 6,
    //         status: status ? status : NULL,
    //         uf: estado,
    //         cidade: (cidadeII.length != 0)? cidadeII[0].id_cidade : null,
    //         Usuario: 39,
    //         cpf: ld["CPF"],	
    //         marca:  ld["Marca"],
    //         modelo: ld["Modelo"],
    //         id_emp: ld["IdEmpresa"],	
    //         valorNF: ld["valorNF"],
    //         sistema: ld["Sistema"]
    //     };
    //     data["reincidencia"] = Verificacao.reincidencia;
        
    //     let OS_Inp = await this.carrega_registroWhere({"OS": ld["Sinistro"], "id_emp": ld["IdEmpresa"]}, "importados_zurich");
    //     let cancelar = false;

    //     console.log('oi:', OS_Inp, OS_Inp.length)
        
    //     if(OS_Inp.length > 0){
    //         cancelar = true;

    //     console.log('cancelar:', cancelar)
    //     }
    //     let chechkSinistro = await this.carrega_registroWhere(data, "importados_zurich")    

    //     console.log(chechkSinistro.length == 0 && !cancelar)

    //     if(chechkSinistro.length == 0 && !cancelar) {

    //         console.log("entrou")

    //         if(Verificacao.reincidencia == 1)
    //             tecnico = Verificacao.tecnico;
    //         else
    //             // tecnico = await this.buscaTecnicosPorDistancia(CEP, ld["produto"], ld["IdEmpresa"]);
            
    //         data["tecnico"] = tecnico ? tecnico : null;

    //         let id = await this.gernerateInsert("importados_zurich", data);
    //         await this.inclusaoOSCP(id);

    //         if(id && !ld["Sinistro"]){
    //             await this.atualiza_registros_where({
    //                     where: {"id": id}, 
    //                     form: { "OS": id },
    //                 }, 
    //                 "importados_zurich"
    //             );
    //         }

    //         this.criarDesc(id, status);
            
    //     }
    // }


    async gatilhoStatusElectrolux(idOS, statusOS){
            try {
                let resposta = await axios.get(`https://gsplanaltec.com/GerenciamentoServicos/UtalkController/troca_status_at_electrolux/${idOS}/${statusOS}`, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    }
                });
                
                console.log(resposta.data)
    
    
            } catch (erro) {
                console.error(erro);
                return 600;
            }
        }


    async gatilhoStatus(id, statusNovo){
        try {
            
            let resposta = await axios.get(`https://gsplanaltec.com/GerenciamentoServicos/UtalkController/visita_cumprida_zlb/${id}/${statusNovo}`, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            });
            
            
            console.log(resposta.data)


        } catch (erro) {
            console.error(erro);
            return 600;
        }
    }
 

    async criarDesc(idZurich, statusAtual, statusAnterior = null){
        let dadosStatusAtual = await this.carrega_registroWhere({'sel_id' : statusAtual}, 'selects');
        let dadosStatusAnterior = await this.carrega_registroWhere({'sel_id' : statusAnterior}, 'selects');
        statusAtual = dadosStatusAtual[0].sel_nome;
        statusAnterior = (dadosStatusAnterior ? dadosStatusAnterior[0].sel_nome : '');

        let desc_descricao = `Mudanças de: suporte - Status Atualizado de '${statusAnterior}' para '${statusAtual}'`;
        let desc_data = new Date;
        let desc_hora = new Date;
        var dataFormatada = format(desc_data, "dd/MM/yyyy");
        var horaAtual = new Date();
        var horas = horaAtual.getHours(); // Adicionando uma hora
        var minutos = horaAtual.getMinutes();
          // Formatação dos minutos para adicionar um zero à esquerda, se necessário
          if (minutos < 10) {
            minutos = "0" + minutos;
          }
          horarioFormatado = horas + ":" + minutos;
        

        let campos = {
            desc_id_zurich: idZurich,
            desc_descricao: desc_descricao, 
            desc_data: dataFormatada,
            desc_hora: horarioFormatado,
        }

        return this.gernerateInsert("descricoes",campos);
    }


    async criarDescAG(idZurich, DataInput,){
        
        let desc_descricao = `Mudanças de: suporte - Data do agendamento atualizado para ${DataInput}`;
        let desc_data = new Date;
        let desc_hora = new Date;
        var dataFormatada = format(desc_data, "dd/MM/yyyy");
        var horaAtual = new Date();
        var horas = horaAtual.getHours(); // Adicionando uma hora
        var minutos = horaAtual.getMinutes();
          // Formatação dos minutos para adicionar um zero à esquerda, se necessário
          if (minutos < 10) {
            minutos = "0" + minutos;
          }
          horarioFormatado = horas + ":" + minutos;
        

        let campos = {
            desc_id_zurich: idZurich,
            desc_descricao: desc_descricao, 
            desc_data: dataFormatada,
            desc_hora: horarioFormatado,
        }

        return this.gernerateInsert("descricoes",campos);
    }


    async criarAG (idZurich,status,DataInput,id_emp){
  
       
        let campos = {
            A_Rota: `${DataInput} - AG: ${idZurich}`,
            A_id_Zurich:idZurich,
            A_Data:DataInput,
            id_emp:id_emp,
            id_user:39,
            status_id:status,
        }

        return this.gernerateInsert("agendamento",campos);
    }

        
    


    async reincidenciaReingresso(nome = '', produto = '', uf = '', cidade = '', cpf = null) {
        let arr_reingresso = [ 50, 17, 83, 87 ];
        let arr_reincidencia = [ 64 ];

        let res = await this.verificaSinistro(nome, produto, uf, null, null, null, cpf);
        // #0 - Novo Atendimento
        // #1 - Reincidncia
        // #2 - Reingresso
        // #3 - Reabertura

        if(res) {
            res.reincidencia = 0;
        } else if(this.array_search(res.status, arr_reincidencia) !== false && res.quantidade_dias <= 90){
            res.reincidencia = 1; //#Reincidência
        }
        else if(this.array_search(res.status, arr_reincidencia) !== false && res.quantidade_dias > 90){
            res.reincidencia = 3; //#Reabertura
        }
        else if(this.array_search(res.status, arr_reingresso) !== false){
            res.reincidencia = 2; //#Reingresso
        }
        else{
            res.reincidencia = 0;
        }
        
        return res;
    }
    
    async CarregaCidadesDosEstado(uf, cidade){
        let sql = ` SELECT E.id AS id_estado, E.nome AS estado, E.sigla AS uf, C.id AS id_cidade, C.nome AS cidade 
        FROM estados E JOIN cidades C ON C.estado_id = E.id WHERE E.sigla = '${uf}' AND C.nome LIKE '${cidade}'`;
        
        const response = await this.acaoModel.manualQuery({
            bd: "servico_bd",
            tabela: "importados_zurich",
            query: sql,
            tipoQuery: { type: Sequelize.SELECT }
        });
            
        return response[0];
        
    }

    async updateNotasExistentes(indice, id){
        //Indice 0 ou 1 
        //ID
        let sql = `UPDATE importados_zurich SET notas_existente = ${indice} WHERE id IN (${id})`;

        const response = await this.acaoModel.manualQuery({
            bd: "servico_bd",
            tabela: "importados_zurich",
            query: sql,
            tipoQuery: { type: Sequelize.SELECT }
        });
            
        return response[0];
    }

    async verificaSinistro(nome, produto, uf, cidade = null, id = null, data = null, cpf = null, idEmp = null){
        let sql = `SELECT IZ.Sinistro, IZ.cliente, IZ.produto, IZ.uf, C.nome, IZ.status, IZ.tecnico, DATEDIFF (" ${( data ? `'${data}'` : "current_date()" )} ", str_to_date(IZ.data, '%d/%m/%Y')) AS quantidade_dias
            FROM importados_zurich IZ 
            LEFT JOIN cidades C ON C.id = IZ.cidade
            WHERE (IZ.cliente = '${nome}' ${(cpf != null && cpf != "" ? ` OR IZ.cpf = '${cpf}' ` : ``)})
            AND IZ.produto = '${produto}'
            AND IZ.uf = '${uf}'
            ${(cidade ? ` AND C.nome = '${cidade}' ` : ``)}
            ${(id ? ` AND IZ.id < 'id' ` : ``)}
            ${(idEmp ? ` AND IZ.id_emp < '${idEmp}' ` : ``)}
            ORDER BY IZ.id DESC`;
        
        const response = await this.acaoModel.manualQuery({
            bd: "servico_bd",
            tabela: "importados_zurich",
            query: sql,
            tipoQuery: { type: Sequelize.SELECT }
          });
              
          return response[0];
        
    }

    async buscaTecnicosPorDistancia(CEP = null, produto, id_emp) {
        console.log("BUSCA TEC POR DISTANCIA");
    
        try {
            let resposta = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${CEP}&sensor=false&key=AIzaSyDRAWI_fhWTmmj6NE3W6XR31nEty6sbeXw`, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            });
    
            let localizacao;
    
            if (resposta.data && resposta.data.results && resposta.data.results.length > 0) {
                localizacao = resposta.data.results[0].geometry.location;
            } else {
                console.error("Resposta inválida ou vazia da API do Google Maps");
                return 600;
            }
    
            
            if (localizacao && localizacao.lat && localizacao.lng) {
                let raio = 30;
                let l = 1;
                let tecnico;
    
                do {
                    tecnico = await this.buscaTecnicosPorDistanciaModel(localizacao.lat, localizacao.lng, produto, id_emp, raio);
                    tecnico = tecnico[0];
    
                    raio += 50;
                    l += 1;
                } while (localizacao && (typeof tecnico === 'undefined') && l <= 3);
    
                if (!tecnico.te_id || !localizacao) {
                    tecnico = {};
                    tecnico.te_id = 600;
                }
    
                console.log("FINAL:");
                return tecnico.te_id;
            } else {
                console.error("Informações de localização inválidas ou ausentes na resposta");
                return 600;
            }
        } catch (erro) {
            console.error(erro);
            return 600;
        }
    }

    async buscaTecnicosPorDistanciaModel(lat_os, lng_os, produto, id_emp, raio = 30){
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() - 2; //months from 1-12
        let year = dateObj.getUTCFullYear();
        let date3meses = year + '-' + month;

        let sql = `SELECT 
        CAST((6371 * acos(
        cos( radians(${lat_os}) )
        * cos( radians( CT.te_lat ) )
        * cos( radians( CT.te_lng ) - radians(${lng_os}) )
        + sin( radians(${lat_os}) )
        * sin( radians( CT.te_lat ) )                                                                           
        )
        ) AS DECIMAL(10,2)) AS distancia,
        (SELECT COUNT(id_emp) FROM importados_zurich IZ WHERE IZ.tecnico = CT.te_id AND dataInclusao >= '${date3meses}' AND IZ.id_emp = ${id_emp}) AS SegComMaisAtendimento,
        CT.te_id,
        CT.te_nome,
        CT.te_profissao,
        CT.te_raio,
        CT.te_lat,
        CT.te_lng,
        GROUP_CONCAT(DISTINCT ET.idAA) as 'Área de Atuação'
    FROM ca_tecnicos CT
        LEFT JOIN espec_tec ET ON ET.idTec = CT.te_id
    WHERE (CT.te_ativo_desativo = 1)#AND CT.dadoAtualizado = 1
        AND ET.idAA IN (SELECT E.idAreaAtuacao FROM especializacoes E LEFT JOIN tags_especializacoes TE ON TE.idEsp = E.idEsp WHERE upper('${produto}') LIKE CONCAT('%', upper(TRIM(TE.nomeTag)), '%'))
        GROUP BY CT.te_id
        HAVING (distancia < ${raio})
        ORDER BY IF(CT.te_status_contabil = 2, 1, IF(CT.te_status_contabil = 4, 1, 0)) DESC, SegComMaisAtendimento DESC, distancia ASC;`;
        
        const response = await this.acaoModel.manualQuery({
            bd: "servico_bd",
            tabela: "ca_tecnicos",
            query: sql,
            tipoQuery: { type: Sequelize.SELECT }
          });
              
          return response[0];
        
    }

    async carrega_registroWhere(objcInsert, tabela){
        let sql = `SELECT * FROM ${tabela}`
        let iRW = 0;

        _.each(objcInsert, function(val,key) {      
            sql += ` ${(iRW == 0)? " WHERE": " AND"} ${key} = '${val}'`  
            
            iRW++;
        });     

        const response = await this.acaoModel.manualQuery({
            bd: "servico_bd",
            tabela: tabela,
            query: sql,
            tipoQuery: { type: Sequelize.SELECT }
        });
            
        return response[0];
       
    } 

    async gernerateInsert(tabela, objcInsert){
        let nomeCampo = "";
        let valorCampo = "";
        let i = 0;
        let sql = "";

        _.each(objcInsert, function(val,key) {      
            nomeCampo += `${(i !== 0)? ", " : ""} ${key}`       
            valorCampo += `${(i !== 0)? ", " : ""} "${val}"`       
            i++;
        });     


        sql = `INSERT INTO ${tabela} (${nomeCampo}) VALUES (${valorCampo});`;

        const response = await this.acaoModel.manualQuery({
            bd: "servico_bd",
            tabela: tabela,
            query: sql,
            tipoQuery: { type: Sequelize.INSERT }
        });
              
          return response[0];
    }
    
    // CRIADOR DE UPDATE WEHRE USADO GLOBALMENTE
    async atualiza_registros_where(objcInsert, tabela){
        // VARIAVEIS DE AMBIENTE
        let setCampo = {
            campo: "",
            valor: ""
        };
        let whereCampo = "";
        let iF = 0;
        let iW = 0;
        let sql = "";
        
        // LOOPING DE UPDATE DOS DADOS
        _.each(objcInsert.form, function(val,key) {      
            val = (typeof val == 'number' ? `${val}` :  `'${val}'`) 

            setCampo["campo"] += (iF !== 0)? `, ${key}` : `${key}`
            setCampo["valor"] += (iF !== 0)? `, ${val}` : `${val}`

            iF++;
        });    

        // LOOPING QUE CRIA O WHERE DO UPDATE
        _.each(objcInsert.where, function(val,key) {      
            val = (typeof val == 'number' ? `${val}` :  `'${val}'`) 

            whereCampo += (iW !== 0)? ` OR ${key} = ${val}` : `${key} = ${val} `
            iW++;
        });     

        // CRIA A QUERY COM BASE NOS 2 LOOPINGS ACIMA
        sql = `UPDATE ${tabela} SET ${setCampo["campo"]} VALUES (${setCampo["valor"]}) WHERE ${whereCampo};`;

        const response = await this.acaoModel.manualQuery({
            bd: "servico_bd",
            tabela: tabela,
            query: sql,
            tipoQuery: { type: Sequelize.UPDATE }
        });
              
        return response[0];
    }

    async inclusaoOSCP(id = null) {
        let idLanc;
        let idCP;
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        let date = year + "-" + month + "-" + day;
        let data = {};
        let data2 = {};
        let res = 0;
        let lancamentoPG = await this.carrega_registroWhere({'idOS':id}, 'lancamento_pg');
        lancamentoPG = lancamentoPG[0];
        let cp = await this.carrega_registroWhere({'idContasPagar': (typeof lancamentoPG === 'undefined') ? 0 : lancamentoPG.idContasPagar, 'Cancelado' : 0}, 'contaspagar');
        cp = cp[0];

        if ((typeof lancamentoPG === 'undefined') || (cp.Cancelado && (typeof cp === 'undefined'))) {

            let dadosOS = await this.carrega_registroWhere({'id':id}, 'importados_zurich');
            dadosOS = dadosOS[0];

            console.log("dados OS:", dadosOS.tecnico)

            if (dadosOS.tecnico == 600) {
                res = 600;
            } else {
                console.log("IOUIAUIUAIRUAI")
                data['idOS'] = id;
                data['tempTec'] = dadosOS.tecnico;
                data['statusPG'] = 20;
                data['valorPag'] = '0.00';
                data['dataPag'] = date;
                data['dataLiberacaoNPS'] = date;
                data['dataLiberacaoPG'] = date;
                data['LiberadoPg'] = 1;
                data['LiberadoNPS'] = 1;
                data['observacaoPag'] = "Inclusão de inicialização";

                console.log("pedrin: ",(typeof lancamentoPG === 'undefined'));

                if ((typeof lancamentoPG === 'undefined'))
                    idLanc = await this.gernerateInsert('lancamento_pg', data);
                else
                    idLanc = lancamentoPG.id;

                data2 = {
                    "Descricao": "Inclusão de inicialização",
                    "Referencia": 1,
                    "TipoCobranca": 1,
                    "recorrente": 2,
                    "vencimento": date,
                    "documento": '',
                    "idTecnico": dadosOS.tecnico,
                    "idEmpresa": dadosOS.id_emp,
                    "identificador": await this.geradorUniqCode(),
                    "fase": 1
                };

                data2["valor"] = '0.00';

                idCP = await this.gernerateInsert('contaspagar', data2);

                data['idContasPagar'] = idCP;
                await this.atualiza_registros_where({
                        where: {'id':idLanc}, 
                        form: data,
                    },
                    'lancamento_pg'
                );

                res = 1;
            }
        }

    }

    async geradorUniqCode(){
        let code = '';
        let verifica;

        do {
            code = await this.uniqid(await this.rand());
            verifica = await this.carrega_registroWhere({'identificador':code}, 'contaspagar');
            console.log(verifica.length)
        } while ( verifica.length != 0 );

        return code;
    }

    uniqid(prefix = "", random = false) {
        const sec = Date.now() * 1000 + Math.random() * 1000;
        const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");

        return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}`:""}`;
    }

    rand(){
        Math.floor((Math.random() * 10) + 1);
    }

    array_search(searchKey, arr) {
        return arr.filter(function(obj) {
            return Object.keys(obj).some(function(key) {
            return obj[key].includes(searchKey);
            })
        });
    }
}