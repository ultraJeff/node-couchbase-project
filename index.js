'use strict'

const couchbase = require('couchbase')

const endpoint = 'cb-example-srv.openshift-operators.srv.cluster.local';

async function main() {
  console.log('trying to connect to', endpoint);
  const cluster = await couchbase.connect('couchbase://' +endpoint+'?console_log_level=5', {username: 'Administrator', password: 'password'});

  const result = await cluster.ping();
  console.log('did we ping it', result);

  // get a reference to our bucket
  const bucket = cluster.bucket('tweets')


  // get a reference to the default collection, required for older Couchbase server versions
  const collection_default = bucket.defaultCollection()

  const getVaccinationsByKey = async (key) => {
    try {
      const result = await bucket.get(key)
      console.log('Get Result: ')
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }

  await getVaccinationsByKey('Province_State')
}

// Run the main function
main()
  .catch((err) => {
    console.log('ERR:', err)
    process.exit(1)
  })
  .then(process.exit)
