'use strict'

const couchbase = require('couchbase')

async function main() {
  const cluster = await couchbase.connect('couchbase://cb-example-ui-openshift-operators.apps.cluster-btzr5.btzr5.sandbox1554.opentlc.com', {
    username: 'Administrator',
    password: 'password',
  })

  // get a reference to our bucket
  const bucket = cluster.bucket('tweets')


  // get a reference to the default collection, required for older Couchbase server versions
  const collection_default = bucket.defaultCollection()

//   const airline = {
//     type: 'airline',
//     id: 8091,
//     callsign: 'CBS',
//     iata: 'IATA',
//     icao: 'ICAO',
//     name: 'Couchbase Airways',
//   }

//   const upsertDocument = async (doc) => {
//     try {
//       // key will equal: "airline_8091"
//       const key = `${doc.type}_${doc.id}`
//       const result = await collection.upsert(key, doc)
//       console.log('Upsert Result: ')
//       console.log(result)
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   await upsertDocument(airline)

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