'use strict'

const couchbase = require('couchbase')
const express = require("express");
const app = express();

const endpoint = 'couchbase://cb-example';
console.log('Connecting to: ', endpoint);

async function main() {
  const cluster = await couchbase.connect(`${endpoint}`, {
    username: 'Administrator',
    password: 'password',
  })

  const pingResults = await cluster.ping();
  console.log('Couchbase up and running', pingResults);

  const getVaccinations = async () => {
    try {
      // const result = 'hello'
      const result = await cluster.query(`
      SELECT * FROM \`tweets\`
      `)
      console.log('Get Results: ', result)
      return result;
    } catch (error) {
      console.error(error)
    }
  }

  app.get("/", runAsync(async (req, res) => {
    let data = await getVaccinations();
    res.send(data)
  }))

  app.listen(8080, () => {
    console.log(`Server is up and running on 8080 ...`)
  });
}

function runAsync (callback) {
  return function (req, res, next) {
    callback(req, res, next)
      .catch(next)
  }
}

main();