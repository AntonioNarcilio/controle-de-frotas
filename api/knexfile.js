// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: '0.0.0.0',
      port: '5432',
      database: 'controle_de_frotas',
      user: 'postgres',
      password: '691984'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds` 
    }
  },


};
