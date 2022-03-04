'use strict'

const couchbase = require('couchbase')
const express = require("express");
const app = express();

const endpoint = 'couchbase://cb-example';

async function main() {
  console.log('trying to connect to', endpoint);
  const cluster = await couchbase.connect(`${endpoint}`, {
    username: 'Administrator',
    password: 'password',
  })

  const result = await cluster.ping();
  console.log('did we ping it', result);

  const getVaccinations = async () => {
    try {
      const result = await cluster.query(`
      SELECT * FROM \`tweets\`
      `)
      console.log('Get Result: ')
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }

  app.get("/", (req, res) => {
    let data = await getVaccinations();
    res.send(data)
  })

  app.listen(8080, () => {
    console.log(`Server is up and running on 8080 ...`)
  });
}

main();