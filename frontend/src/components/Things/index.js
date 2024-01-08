import { useEffect, useState } from 'react'
import { querySparql } from '../../api/sparql'
import { ThingHistory } from '../ThingHistory'
import { ThingLatestValue } from '../ThingLatestValue'
import { ThingEvent } from '../ThingEvent'

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
    ?property td:name ?propertyName .
    ?propertyForm hypermedia:hasOperationType td:readProperty .
    ?propertyForm hypermedia:hasTarget ?propertyTarget .
    ?property iot:recordedBy ?action . 
    ?action td:hasForm ?actionForm .
    ?actionForm hypermedia:hasTarget ?actionTarget 
  }
}`

export function Things ({ onThingSelect }) {
  const accessToken = localStorage.getItem('accessToken')
  const [sparqlResult, setSparqlResult] = useState()

  // const onThingSelect = (event) => {
  //   setSelectedThingHistoryTarget(event.target.value)
  // }

  useEffect(() => {
    const fetchData = async () => {
      setSparqlResult(await querySparql({ accessToken, query: SparqlQuery }))
    }
    fetchData()
  }, [])

  if (sparqlResult === undefined) {
    return null
  }

  return (
    <>
      <p>
        Query all sensors with the capability to monitor power
        (iot:PowerMonitoring)
      </p>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Latest Value</th>
            <th>Current Value (Event)</th>
          </tr>
        </thead>
        <tbody>
          {sparqlResult.results.bindings.map((result, index) => (
            <tr key={result.id.value}>
              <td>
                <input
                  type='radio'
                  name='test'
                  value={result.actionTarget.value}
                  onClick={onThingSelect}
                />
              </td>
              <td>{result.id.value}</td>
              <td>{result.title.value}</td>
              <td>{result.description.value}</td>
              <td>
                <ThingLatestValue target={result.propertyTarget.value} />
              </td>
              <td>
                <ThingEvent
                  thingId={result.id}
                  id={index}
                  propertyName={result.propertyName.value}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <ThingHistory target={selectedThingHistoryTarget} /> */}
    </>
  )
}
