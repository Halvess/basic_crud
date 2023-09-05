const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  })

pool.on('error', err => {console.log(err)})
pool.on('connect', () => {
  console.log('DB Connected');
});

const query = async (text, params) => {
  const start = Date.now()
  const res = await pool.query(text, params)
  const duration = Date.now() - start
  console.log(`Query: ${text} | Rows Found: ${res.rowCount} | Time: ${duration}ms`)
  return res
}

const getClient = async () => {
  const client = await pool.connect()
  const query = client.query
  const release = client.release
  const timeout = setTimeout(() => {
    console.error('A client has been checked out for more than 5 seconds!')
    console.error(`The last executed query on this client was: ${client.lastQuery}`)
  }, 5000)
  client.query = (...args) => {
    client.lastQuery = args
    return query.apply(client, args)
  }
  client.release = () => {
    clearTimeout(timeout)
    client.query = query
    client.release = release
    return release.apply(client)
  }
  return client
}

module.exports = {query, getClient}