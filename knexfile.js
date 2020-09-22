// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/medswap.db3'
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
      },
    },
    migrations: {
      directory: './database/migrations' 
    },
    seeds: {
      directory: './database/seeds'
    }
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/test-medswap.db3'
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
      },
    },
    migrations: {
      directory: './database/test-migrations' 
    },
    seeds: {
      directory: './database/test-seeds'
    }
  },


  production: {
    client: 'pg',
    useNullAsDefault: true,
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './database/migrations' 
    },
    seeds: {
      directory: './database/seeds'
    }
  }

};