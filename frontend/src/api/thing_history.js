export async function fetchThingHistory ({
  target,
  from = Date.now() - 60 * 60 * 1000,
  to = Date.now()
}) {
  const response = await fetch(`${target}?from=${from}&to=${to}`, {
    headers: {
      Accept: 'application/json'
    }
  })

  return response.json()
}

export async function fetchThingLatestValue ({ target }) {
  const response = await fetch(target, {
    headers: {
      Accept: 'application/json'
    }
  })

  return response.json()
}
