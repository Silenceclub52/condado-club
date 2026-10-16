> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Authentication

To authenticate the events sent by the Channel Manager API, you need to verify the signature of the event using the `sign_secret` value you received when you registered your webhook endpoint.

The signature of the event is generated using the HMAC-SHA256 algorithm with the `sign_secret` value as the key and the event payload (stringified) as the input.

Here is an example of how to verify the event signature in Node.js:

```javascript theme={null}
const crypto = require('crypto');

const verifySignature = (payload, signature, signSecret) => {
  const hmac = crypto.createHmac('sha256', signSecret);
  hmac.update(payload);
  const calculatedSignature = hmac.digest('hex');
  return calculatedSignature === signature;
};
```

You can use this function to verify the signature of the event before processing it in your application.

The signature can be found in the `X-Webhook-Signature` HTTP header of the event request. You can use this value to verify the event signature and ensure that the event was sent by the Channel Manager API.

If you are using a body parser middleware in your application, make sure to parse the request body after verifying the signature or stringify the request body before passing it to the `verifySignature` function.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.