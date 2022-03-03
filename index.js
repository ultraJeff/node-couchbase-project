'use strict'

const couchbase = require('couchbase')

const express = require("express");
  
const app = express();

app.listen(5000, () => {
  console.log(`Server is up and running on 5000 ...`)
});

const endpoint = 'couchbase://cb-example';

async function main() {
  console.log('trying to connect to', endpoint);
  const cluster = await couchbase.connect(`${endpoint}`, {
    username: 'Administrator',
    password: 'password',
  })

  const result = await cluster.ping();
  console.log('did we ping it', result);

  // get a reference to our bucket
  // const bucket = cluster.bucket('tweets')


  // get a reference to the default collection, required for older Couchbase server versions
  // const collection_default = bucket.defaultCollection()

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

  await getVaccinations

}

app.get("/", (req, res) => {
  let data = main();
  res.send(data)
})
