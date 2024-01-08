export async function fetchThings (accessToken) {
  const response = await fetch('/api/registry/things', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  return response.json()
}

export async function fetchThing ({ accessToken, id }) {
  const response = await fetch(`/api/registry/things/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  return response.json()
}
