/* 
    Autor: Ronald Tadeu Alve Pinto Filho
    Organização: Planaltec Brasil
    Função: Modulo para fazer as conexões do banco de Dados
    data: 11/05/2023
*/

// Inicia os Modulos necessarios para as conexões
const Sequelize = require('sequelize');
var conexao_bd = require('./conexao_bd')
conexao_bd = new conexao_bd

// // Inicia a Conexão
conexao_bd.iniciaConexao();
// Classe que contem as Funções
module.exports = class acaoModel{

    // Função que Lista os dados de forma Generica
    async listaDado(parametros){
        parametros.formulario = (parametros.formulario == undefined)? "" : parametros.formulario;

         // Carrega a query
        const query = conexao_bd.conexao[parametros.bd].define(parametros.tabela, parametros.campo, {freezeTableName: true});

        // retorno
        return query.findAll(parametros.formulario);
    }

    // Função que Cadastra os dados de forma Generica
    async insereDado(parametros){
         // Carrega a query
        const query = conexao_bd.conexao[parametros.bd].define(parametros.tabela, parametros.campo, {freezeTableName: true});

        console.log(parametros.formulario);
        // retorno
        return query.create(parametros.formulario);
    }

    // Função que Cadastra os dados de forma Generica
    async alteraDado(parametros){
         // Carrega a query
        const query = conexao_bd.conexao[parametros.bd].define(parametros.tabela, parametros.campo, {freezeTableName: true});

        // retorno
        return query.update(parametros.formulario.dado, parametros.formulario.condicao);
    }

    async excluirDado(parametros){
         // Carrega a query
        const query = conexao_bd.conexao[parametros.bd].define(parametros.tabela, parametros.campo, {freezeTableName: true});

        // retorno
        return query.destroy(parametros.formulario);
    }


    // Função que carrega os Usuarios com suas respectivas Regiões
    async carregaUsuario(){
        // Carrega a query
        const query = conexao_bd.conexao["servico_bd"].define('pa_usuario',{
            id: {
                type: Sequelize.INTEGER(2),
                autoIncrement: true,
                allowNull: true,
                primaryKey: true
            },
            usuario: {
                type: Sequelize.STRING(80),
                allowNull: true
            },
            log_emp: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
        }, {freezeTableName: true});

        // Define o Join 
        const joinRegiao = this.conexao_bd.define('regiao_user', {
            id_ru: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            id_cidade: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            id_user: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
        });

         // Executa o Join entre as tabelas
        query.belongsTo(joinRegiao, {
            constraint: true,
            foreignKey: 'id',
             allowNull: true
        })
        
         // retorno
        return await query.findByPk(id, { include: regiao });

    }

    async manualQuery(parametros){
        // Carrega a query
       const query = await conexao_bd.conexao[parametros.bd].query(parametros.query, { raw: true });

       // retorno
       return query;
    }
    
}