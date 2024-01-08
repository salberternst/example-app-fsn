export async function fetchApiAccessToken () {
  const response = await fetch('/oauth2/auth')

  if (!response.ok) {
    // user is not authenticated. reload page to trigger the oauth2 dialog from keycloak
    window.location.reload(false)
  } else {
    const accessToken = response.headers.get('x-auth-request-access-token')
    localStorage.setItem('accessToken', accessToken)
    return accessToken
  }
}

export async function fetchThingsboardAccessToken () {
  const accessToken = localStorage.getItem('accessToken')
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username: 'oauth2-token',
      password: accessToken
    })
  })

  if (response.ok) {
    const tokenSet = await response.json()
    localStorage.setItem('thingsboardTokenSet', JSON.stringify(tokenSet))
    return tokenSet
  }

  // todo: throw etc
}
