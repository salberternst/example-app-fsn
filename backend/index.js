'use strict'

const express = require('express')

const app = express()

const SparqlQuery = `PREFIX iot: <http://iotschema.org/>
PREFIX td: <https://www.w3.org/2019/wot/td#>
PREFIX hypermedia: <https://www.w3.org/2019/wot/hypermedia#>

SELECT * WHERE {
  GRAPH ?g {
    ?id a iot:PowerMonitoring .
    ?id td:hasPropertyAffordance ?property .
    ?id td:title ?title .
    ?id td:description ?description .
    ?property a iot:TotalActivePower .
    ?property td:hasForm ?propertyForm .
    ?propertyForm hypermedia:hasOperationType td:readProperty .
    ?propertyForm hypermedia:hasTarget ?propertyTarget .
  }
}`

async function querySparql ({ accessToken, query }) {
  const response = await fetch('http://oauth2-proxy:4180/api/registry/sparql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: new URLSearchParams({
      query
    })
  })

  if (!response.ok) {
    throw new Error('test')
  }

  return response.json()
}

app.get('/average', async (req, res) => {
  const accessToken = req.headers['x-access-token']
  const queryResults = await querySparql({ accessToken, query: SparqlQuery })
  const fetches = queryResults.results.bindings.map((result) =>
    fetch(result.propertyTarget.value).then((response) => response.json())
  )
  const values = await Promise.all(fetches)

  let average = 0
  let validValues = 0
  for (const value of values) {
    // filter out invalid values
    if(isNaN(value) === false) {
      average += value
      validValues++
    }
  }
  average /= validValues

  res.json({ average })
})

app.listen(3000)
