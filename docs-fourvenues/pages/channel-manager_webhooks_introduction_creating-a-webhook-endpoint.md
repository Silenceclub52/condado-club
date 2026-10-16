> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Creating a webhook endpoint

First of all, in order to receive events from the Channel Manager API, you need to register a webhook endpoint in the Fourvenues API.

If you are in a local environment, you can use a tool like [ngrok](https://ngrok.com/) to expose your local server to the internet.

## Register your webhook endpoint

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


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.