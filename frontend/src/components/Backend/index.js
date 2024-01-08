import { useEffect, useState } from 'react'

export function Backend () {
  const [average, setAverage] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/backend/average')
      const json = await response.json()
      setAverage(json.average)
    }
    fetchData()
  }, [])

  if (average === undefined) {
    return null
  }

  return (
    <>
      <h2>Backend Average Calculation: {average}</h2>
    </>
  )
}
