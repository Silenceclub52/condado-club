> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Authentication

***

title: "Authentication"
description: To get started using the Integrations API, you'll need to authenticate your requests.
\---API Keys can be requested through your organization portal under **Settings > Developer Portal**.

API Keys have a limited lifespan and can be revoked at any time if they are misused.
Also, they have capabilities to access only the endpoints that are necessary for your integration.

Api Keys must be included in the `X-Api-Key` HTTP header.

Test everything is working correctly using the [auth](integrations/api-reference/auth/get-auth-information)
endpoint and curl:

```bash theme={null}
$ curl -H "X-Api-Key: [apiKey]" https://api-alpha.fourvenues.com/integrations/channels

{
  "success": true,
  "data": [
    {
      "_id": "pw2gra4r20xlu02js0ybj42s6vYpAzeX",
      "name": "My team",
      "slug": "my-team"
    }
  ]
}
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.