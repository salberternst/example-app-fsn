import React, { useEffect, useState } from 'react'
import { fetchThingLatestValue } from '../../api/thing_history'

export function ThingLatestValue ({ target }) {
  const [result, setResult] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchThingLatestValue({
        target
      })
      setResult(result)
    }
    fetchData()
  }, [target])

  if (result === undefined) {
    return null
  }

  return <>{JSON.stringify(result, null, 4)}</>
}
