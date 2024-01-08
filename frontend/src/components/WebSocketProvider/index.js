import { useState, createContext, useContext, useCallback } from 'react'
import useWebSocket from 'react-use-websocket'

const WebSocketContext = createContext(null)

export const useSharedWebSocket = () => {
  return useContext(WebSocketContext)
}

export const WebSocketProvider = ({ children }) => {
  const [lastMessages, setLastMessages] = useState({})
  const getSocketUrl = useCallback(async () => {
    const tokenSet = JSON.parse(localStorage.getItem('thingsboardTokenSet'))
    const url = new URL('/api/ws/plugins/telemetry', window.location.href)
    url.protocol = url.protocol.replace('http', 'ws')
    url.searchParams.set('token', tokenSet.token)
    return url.href
  }, [])

  const { sendMessage, lastMessage, readyState } = useWebSocket(getSocketUrl, {
    onMessage: (e) => {
      const json = JSON.parse(e.data)
      if(json.errorMsg === null) {
        setLastMessages((prev) => {
          prev[json.subscriptionId] = json
          return prev
        })
      }
    }
  })

  const contextValue = {
    sendMessage,
    lastMessage,
    readyState,
    lastMessages
  }

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  )
}
