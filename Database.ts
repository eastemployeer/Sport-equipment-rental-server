import Knex from 'knex';

export * from './DatabasedType';

/**
 * Types of tables are in /types/Knex.d.ts
 */
const Database = Knex({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pwrwypozyczalnia',
  },
  pool: {
    min: 0,
    max: 7,
  },
  log: {
    warn(message: any) {
      console.warn('Knex warn: ', message);
    },
    error(message: any) {
      console.warn('Knex error: ', message);
    },
    deprecate(message: any) {
      console.warn('Knex deprecate: ', message);
    },
    debug(message: any) {
      console.warn('Knex debug: ', message);
    },
  },
});

export default Database;
