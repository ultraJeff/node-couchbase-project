'use strict'

const config = require('./config')(process.env);
const { PORT, BUCKET, USERNAME, PASSWORD, CB_ENDPOINT } = config;
const couchbase = require('couchbase')
const express = require("express");
const app = express();

const endpoint = `couchbase://${CB_ENDPOINT}`;
console.log('Connecting to: ', endpoint);

async function main() {
  const cluster = await couchbase.connect(`${endpoint}`, {
    username: USERNAME,
    password: PASSWORD,
  })

  const pingResults = await cluster.ping();
  console.log('Couchbase up and running', pingResults);

  const selectAllFromBucket = async () => {
    try {
      const result = await cluster.query(`
      SELECT * FROM \`${BUCKET}\`
      `)
      return result;
    } catch (error) {
      console.error(error)
    }
  }
  
  const selectStateFromBucket = async (state) => {
    try {
      const result = await cluster.query(`
      SELECT * FROM \`${BUCKET}\` WHERE Province_State = "${state}"
      `)
      return result;
    } catch (error) {
      console.error(error)
    }
  }

  app.get("/", runAsync(async (req, res) => {
    let data = await selectAllFromBucket();
    res.send(data)
  }))
  
  app.get("/state/:state", runAsync(async (req, res) => {
    let state = req.params.state;
    let data = await selectStateFromBucket(state);
    res.send(data)
  }))

  app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT} ...`)
  });
}

function runAsync (callback) {
  return function (req, res, next) {
    callback(req, res, next)
      .catch(next)
  }
}

main();
