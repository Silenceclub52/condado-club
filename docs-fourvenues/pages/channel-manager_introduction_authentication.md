> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Authentication

***

title: "Authentication"
description: To get started using the Channel Manager API, you'll need to authenticate your requests.
\---API Keys can be requested through your organization portal under **Settings > Developer Portal**.

API Keys have a limited lifespan and can be revoked at any time if they are misused.
Also, they have capabilities to access only the endpoints that are necessary for your integration.

Api Keys must be included in the `X-Api-Key` HTTP header.

Test everything is working correctly using the [auth](channel-manager/api-reference/auth/get-auth-information)
endpoint and curl:

```bash theme={null}
$ curl -H "X-Api-Key: [apiKey]" https://channels-service.fourvenues.com/auth

{
  "data": {
    "message": "Authed",
    "channel": {
      "_id": "org_channel_123",
      "name": "My Channel",
      "slug": "my-channel",
      "hosts": [
        {
          "_id": "org123",
          "name": "My organization.",
          "slug": "my-organization.",
          "created_at": "2022-01-01T00:00:00Z"
        }
      ],
      "created_at": "2024-10-01T00:00:00Z"
    }
  },
  "success": true
}
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.