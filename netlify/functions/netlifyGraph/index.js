// GENERATED VIA NETLIFY AUTOMATED DEV TOOLS, EDIT WITH CAUTION!
import https from "https"
import crypto from "crypto"

export const verifySignature = (input) => {
  const secret = input.secret
  const body = input.body
  const signature = input.signature

  if (!signature) {
    console.error('Missing signature')
    return false
  }

  const sig = {}
  for (const pair of signature.split(',')) {
    const [k, v] = pair.split('=')
    sig[k] = v
  }

  if (!sig.t || !sig.hmac_sha256) {
    console.error('Invalid signature header')
    return false
  }

  const hash = crypto
    .createHmac('sha256', secret)
    .update(sig.t)
    .update('.')
    .update(body)
    .digest('hex')

  if (
    !crypto.timingSafeEqual(
      Buffer.from(hash, 'hex'),
      Buffer.from(sig.hmac_sha256, 'hex')
    )
  ) {
    console.error('Invalid signature')
    return false
  }

  if (parseInt(sig.t, 10) < Date.now() / 1000 - 300 /* 5 minutes */) {
    console.error('Request is too old')
    return false
  }

  return true
}

const operationsDoc = `query ExampleQuery @netlify(id: "7645749f-8f1e-40b0-b066-3e1497876af6", doc: "An empty query to start from") {
  gitHub {
    repository(name: "netlify-graph-test", owner: "localden") {
      contactLinks {
        about
        name
        url
      }
      diskUsage
      forkCount
      discussionCategories(after: "1212")
    }
  }
}

query ExampleQuery @netlify(id: "f1a7c30e-3b11-4fc8-88c0-d51ef3a57901", doc: "An example query to start with.") {
  __typename
}`


const fetch = (appId, options) => {
  var reqBody = options.body || null
  const userHeaders = options.headers || {}
  const headers = {
    ...userHeaders,
    'Content-Type': 'application/json',
    'Content-Length': reqBody.length,
  }

  var reqOptions = {
    method: 'POST',
    headers: headers,
    timeout: 30000,
  }

  const url = 'https://serve.onegraph.com/graphql?app_id=' + appId

  const respBody = []

  return new Promise((resolve, reject) => {
    var req = https.request(url, reqOptions, (res) => {
      if (res.statusCode < 200 || res.statusCode > 299) {
        return reject(
          new Error(
            "Netlify OneGraph return non - OK HTTP status code" + res.statusCode,
          ),
        )
      }

      res.on('data', (chunk) => respBody.push(chunk))

      res.on('end', () => {
        const resString = Buffer.concat(respBody).toString()
        resolve(resString)
      })
    })

    req.on('error', (e) => {
      console.error('Error making request to Netlify OneGraph: ', e)
    })

    req.on('timeout', () => {
      req.destroy()
      reject(new Error('Request to Netlify OneGraph timed out'))
    })

    req.write(reqBody)
    req.end()
  })
}

const fetchOneGraphPersisted = async function fetchOneGraphPersisted(
  accessToken,
  docId,
  operationName,
  variables,
) {
  const payload = {
    doc_id: docId,
    variables: variables,
    operationName: operationName,
  }

  const result = await fetch(
    process.env.SITE_ID,
    {
      method: 'POST',
      headers: {
        Authorization: accessToken ? "Bearer " + accessToken : '',
      },
      body: JSON.stringify(payload),
    },
  )

  // @ts-ignore
  return JSON.parse(result)
}

const fetchOneGraph = async function fetchOneGraph(
  accessToken,
  query,
  operationName,
  variables,
) {
  const payload = {
    query: query,
    variables: variables,
    operationName: operationName,
  }

  const result = await fetch(
    process.env.SITE_ID,
    {
      method: 'POST',
      headers: {
        Authorization: accessToken ? "Bearer " + accessToken : '',
      },
      body: JSON.stringify(payload),
    },
  )

  // @ts-ignore
  return JSON.parse(result)
}


export const verifyRequestSignature = (request) => {
  const event = request.event
  const secret = process.env.NETLIFY_GRAPH_WEBHOOK_SECRET
  const signature = event.headers['x-onegraph-signature']
  const body = event.body

  if (!secret) {
    console.error(
      'NETLIFY_GRAPH_WEBHOOK_SECRET is not set, cannot verify incoming webhook request'
    )
    return false
  }

  return verifySignature({ secret, signature, body: body || '' })
}

export const fetchExampleQuery = (
  variables,
  accessToken,
) => {
  return fetchOneGraph(accessToken, operationsDoc, "ExampleQuery", variables)
}



export const fetchExampleQuery = (
  variables,
  accessToken,
) => {
  return fetchOneGraph(accessToken, operationsDoc, "ExampleQuery", variables)
}


  
/**
 * The generated NetlifyGraph library with your operations
 */
const functions = {
  /**
  * An empty query to start from
  */
  fetchExampleQuery: fetchExampleQuery,
  /**
  * An example query to start with.
  */
  fetchExampleQuery: fetchExampleQuery
}

export default functions

export const handler = async (event, context) => {
  // return a 401 json response
  return {
    statusCode: 401,
    body: JSON.stringify({
      message: 'Unauthorized',
    }),
  }
}