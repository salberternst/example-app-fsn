# Example App

This example app showcases the interaction with the dataspace. It consists of a frontend and a backend part while using oauth2-proxy for secure authentication and authorization via keycloak.

The frontend, developed with React and created with `create-react-app`, shows how to get a valid access token from the logged in user. Further the example uses the SPARQL endpoint of the thing registry to find all things with power monitoring capability and history data. Using the result from the query, the history data is fetched and visualized in a simple graph as well as the current power consumption.

The backend is a very simple express based nodejs app that shows how to get the access token from the incoming request. Using the access token a SPARQL query is sent to the corresponding endpoint of the thing registry. The result contains all power monitoring things in the dataspace as well as the endpoint information to their current values. Using that information, the backend calculates the average power consumption at the time of the request. The information is also visualized in the frontend.

## How to run?

Valid client credentials are supplied via the .env file in the repository. Just run `docker compose up` (or `docker-compose up`).

## Setup own client

In order to run the example the following environment variables (e.g. in the form of an .env file) need to be provided:

```
COOKIE_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
DATASPACE_URL=http://mvp-ds.test-prd01.fsn.iotx.materna.work
ISSUER_URL=https://mvp-ds.test-prd01.fsn.iotx.materna.work/realms/dataspace
CLIENT_ID=example-app
CLIENT_SECRET=xxxxxxxxxxxxxxxx
```

A valid `COOKIE_SECRET` can be created using ```dd if=/dev/urandom bs=32 count=1 2>/dev/null | base64 | tr -d -- '\n' | tr -- '+/' '-_'; echo```

Valid `CLIENT_ID` and `CLIENT_SECRET` parameters are provided.

## Authors 

Sebastian Alberternst <sebastian.alberternst@dfki.de>