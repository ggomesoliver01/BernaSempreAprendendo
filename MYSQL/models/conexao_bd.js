const Sequelize = require('sequelize');

module.exports = class conexao {
    // lista variaveis que receberão a Conexão
    conexao = { servico_bd: null, bd_gschat: null };

    async iniciaConexao (){
        
        // conecta com o banco de dados servico_bd 
        this.conexao.servico_bd = await new Sequelize('servico_bd', 'automacao', 'automacao@2023', {
            dialect: 'mysql',
            host: 'banco-1.cdrombjcg0ul.sa-east-1.rds.amazonaws.com',
            port: 3306,
            define: {
                freezeTableName: true,
                timestamps: false
            }
        });

        return true;
    }

}