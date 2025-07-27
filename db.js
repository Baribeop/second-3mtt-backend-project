const dotenv  = require('dotenv').config()
const {Client} = require('pg')   

const client = new Client(
    DB_USER = process.env.DB_USER,
    DB_PASSWORD = process.env.DB_PASSWORD,
    DB_NAME = process.env.DB_NAME,
    DB_HOST = process.env.DB_HOST,
    DB_PORT = process.env.DB_PORT

)



client.connect()
.then(()=> console.log('Postgres connected succusfully'))
.catch((err) => console.error())


module.exports = client