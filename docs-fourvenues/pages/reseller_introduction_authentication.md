> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Authentication

> To get started using the Reseller API, you'll need to authenticate your requests.

Currently, API Keys can only be created by the Fourvenues team. If you need one,
contact us at [integrations@fourvenues.com](mailto:integrations@fourvenues.com) and we'll be happy to help you.

API Keys have a limited lifespan and can be revoked at any time if they are misused.
Also, they have capabilities to access only the endpoints that are necessary for your integration.

Api Keys must be included in the `Authorization` HTTP header, raw, with no scheme in front of them:

```http theme={null}
Authorization: rs_live_xxxxxxxxxxxxxxxx
```

Keys prefixed `rs_test_` operate against the test environment; `rs_live_` ones against production.
The same key serves both version 2 and the swap operations.

A key reaches only the organizations Fourvenues authorized on it. Asking for one outside that set answers
`403 ORGANIZATION_NOT_ALLOWED`, and an event outside it answers `404`, so an organization you cannot see is
indistinguishable from one that does not exist. [List reseller organizations](/reseller/api-reference/v2/get-v2-organizations)
tells you which ones your key covers at any moment, including the ones activated after it was issued.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.