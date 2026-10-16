> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Webhook event object

When you register a webhook endpoint in the Channel Manager API, you will start receiving events in your webhook endpoint.
These events are sent as HTTP POST requests with a JSON payload that contains information about the event.

The standard structure of the webhook event object is as follows:

* `request.headers['x-webhook-id']`: The unique identifier of the event.
* `request.headers['x-webhook-signature']`: The signature of the event. This value is generated using the `sign_secret` value you received when you registered your webhook endpoint.
* `request.body.id`: The unique identifier of the event.
* `request.body.event`: The name of the event. Example `payment.success`.
* `request.body.payload`: The data related to the event. This can be different for each event type.

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


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.