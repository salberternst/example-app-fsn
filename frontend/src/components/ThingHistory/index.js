import React, { useEffect, useState } from 'react'
import { fetchThingHistory } from '../../api/thing_history'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

export function ThingHistory ({ target }) {
  const [result, setResult] = useState([])
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true)
      const result = await fetchThingHistory({
        target
      })
      setResult(result)
      setIsFetching(false)
    }
    if (target !== undefined) {
      fetchData()
    }
    setResult([])
  }, [target])

  if(isFetching) {
    return <h2>Fetching data...</h2>
  }

  return (
    <>
      {target && <h2>History data from {target}</h2>}
      {!target && <h2>Please select thing</h2>}
      {result.length === 0 && target && <p>No data points!</p>}
      {result.length > 0 && (
        <ResponsiveContainer width='100%' height={256}>
          <AreaChart key={target} data={result}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='ts' />
            <YAxis />
            <Tooltip />
            <Area type='monotone' dataKey='power' />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </>
  )
}
