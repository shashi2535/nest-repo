// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '.env' });

const dbName = process.env.DB_DATABASE;
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DILECT;
const dbPassword = process.env.DB_PASSWORD;
const dbUser = process.env.DB_USERNAME;
module.exports = {
  development: {
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    dialect: dbDriver,
  },
};
