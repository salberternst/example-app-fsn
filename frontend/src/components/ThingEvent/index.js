import React, { useEffect } from 'react'
import { useSharedWebSocket } from '../WebSocketProvider'

export function ThingEvent ({ thingId, id, propertyName }) {
  const { sendMessage, lastMessages } = useSharedWebSocket()

  useEffect(() => {
    const subscribeMessage = {
      tsSubCmds: [
        {
          entityType: 'DEVICE',
          entityId: thingId.value.replace('uri:uuid:', ''),
          scope: 'LATEST_TELEMETRY',
          cmdId: id
        }
      ],
      historyCmds: [],
      attrSubCmds: []
    }
    sendMessage(JSON.stringify(subscribeMessage))
  }, [sendMessage, thingId, id])

  if (
    lastMessages[id]?.data === undefined ||
    lastMessages[id].data[propertyName] === undefined
  ) {
    return null
  }

  const [[ts, value]] = lastMessages[id].data[propertyName]

  return <>{JSON.stringify(value)}</>
}
