> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# 🔊 Listening to Webhooks

> Learn how to listen to webhooks and handle the events.

Webhooks are a powerful way to listen to events that happen in your integration. You can use webhooks to listen events us `payment.success` or `ticket.request_refund` and handle them in your application.

In this guide, we'll show you how to listen to webhooks and handle the events.

## Creating a webhook endpoint in your app

To create a webhook endpoint, you need to create a new endpoint in your application that will listen to the events. You can use any programming language or framework to create this endpoint.

You will need to expose this endpoint to the internet, so the Fourvenues API can send the events to it. Let's see an example of how to create a webhook endpoint in Node.js using Express:

```javascript theme={null}
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const event = req.body;
  console.log('Received event:', event);
  res.status(200).send();
});
```

## Register your webhook endpoint

To register your webhook endpoint, you need to send a request to the \[webhook endpoints]channel-manager//api-reference/webhooks/create-a-new-webhook-endpoint) with the URL of your endpoint and the events you want to listen to. If you are in a local environment, you can use a tool like [ngrok](https://ngrok.com/) to expose your local server to the internet.

```bash theme={null}
curl --request POST \
  --url https://channels-service-alpha.fourvenues.com/webhooks/endpoints \
  --header 'Content-Type: application/json' \
  --data '{
  "name": "<string>",
  "url": "<string>"
}'
```

Response example:

```json theme={null}
{
  "_id": "<string>",
  "name": "<string>",
  "url": "<string>",
  "sign_secret": "<string>"
}
```

Save the `sign_secret` value, you will need it to verify the events.

## Listening to the events

Now that you have your webhook endpoint registered, you can start listening to the events. When an event happens, the Fourvenues API will send a POST request to your endpoint with the event data.

Let's see the example of `payment.success` event:

```json theme={null}
{
  "id": "5f7b1b3b-7b7b-4b7b-8b7b-9b7b1b3b7b7b",
  "event": "payment.success",
  "payload": {
    "payment_id": "5f7b1b3b-7b7b-4b7b-8b7b-9b7b1b3b7b7b",
    "resource_type": "ticket",
    "resource_ids": [
      "5f7b1b3b-7b7b-4b7b-8b7b-9b7b1b3b7b7b"
    ],
    "metadata": {
      "internal_id": "random-internal-id",
    },
    "send_resources": true
  }
}
```

* `id`: The unique identifier of the webhook event.
* `event`: The name of the event.
* `payload`: The data of the event.

This looks good for now, but is it secure? Not really. Let's see how to verify the events.

## Verifying the events

To verify the events, you need to use the `sign_secret` value that you received when you registered the webhook endpoint. You can use this value to verify the signature of the event.

Here is an example of how to verify the event in Node.js:

```javascript theme={null}
const crypto = require('crypto');

const hmacSha256 = (input: string, key: string) => {
  const hmac = crypto.createHmac('sha256', key);
  hmac.update(input);
  return hmac.digest('hex');
};

const middlewareFourvenuesEvents = (req, res, next) => {
  const signSecret = 'your-sign-secret';
  const signature = req.headers['X-Webhook-Signature'];
  const body = JSON.stringify(req.body);

  if (signature !== hmacSha256(body, signSecret)) {
    // return 403 Forbidden if the signature is invalid.
    // Also we recommend logging the event to investigate who is trying to send fake events. 
    return res.status(403).send('Invalid signature');
  }

  next();
};
```

## Retries and backoff

Sometimes, the Fourvenues API may not receive a response from your webhook endpoint. In this case, the Fourvenues API will retry sending the event.
Fourvenues use the following retry strategy:

```typescript theme={null}
public static calculateDelay(retries: number): number {
  const jitter = Math.random() * 1000;
  return Math.round(Math.pow(retries, 1.5) * 1000) + jitter;
}
```

The max number of retries is 40. If the Fourvenues API doesn't receive a response after 40 retries, the event will be marked as failed.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.