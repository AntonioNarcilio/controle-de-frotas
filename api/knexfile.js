// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'Defina o host do banco no arquivo .env',
      port: process.env.DB_PORT || 'Defina a porta do banco no arquivo .env',
      database: process.env.DB_NAME || 'Defina o nome do banco no arquivo .env',
      user: process.env.DB_USER || 'Defina o usuário do banco no arquivo .env',
      password: process.env.DB_PASSWORD || 'Defina a senha do banco no arquivo .env'
    },
  },


};
