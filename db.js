const { Client } = require('pg');

const client = new Client({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  ssl: Boolean(Number(process.env.POSTGRES_SSL)),
});

(async () => {
  await client.connect();
})();

module.exports = client;
