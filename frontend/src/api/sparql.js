export async function querySparql ({ accessToken, query }) {
  const response = await fetch('/api/registry/sparql', {
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
