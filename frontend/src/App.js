import { useEffect, useState } from 'react'
import { Things } from './components/Things'
import { ThingHistory } from './components/ThingHistory'
import { fetchApiAccessToken, fetchThingsboardAccessToken } from './api/auth'
import { Backend } from './components/Backend'
import { WebSocketProvider } from './components/WebSocketProvider'

function App () {
  const [authenticated, setAuthenticated] = useState()
  const [selectedThingHistoryTarget, setSelectedThingHistoryTarget] =
    useState()
  const onThingSelect = (event) => {
    setSelectedThingHistoryTarget(event.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchApiAccessToken()
      await fetchThingsboardAccessToken()
      setAuthenticated(true)
    }
    fetchData()
  }, [])

  if (authenticated === undefined) {
    return null
  }

  return (
    <WebSocketProvider>
      <div>
        <h1>Dataspace Example</h1>
        <Things onThingSelect={onThingSelect} />
        <ThingHistory target={selectedThingHistoryTarget} />
        <Backend />
      </div>
    </WebSocketProvider>
  )
}

export default App
