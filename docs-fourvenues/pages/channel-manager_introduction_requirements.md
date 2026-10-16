> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Requirements

***

title: "Requirements & Constraints"
description: "Authentication, environments, webhook security, pagination, rate limits and conditional fields for the Channel Manager API."
\---## Authentication

All requests must include your API key in the `X-Api-Key` HTTP header:

```bash theme={null}
curl --request GET \
  --url 'https://channels-service-alpha.fourvenues.com/auth' \
  --header 'X-Api-Key: YOUR_API_KEY_HERE'
```

### Getting an API key

API keys are provisioned by the Fourvenues team. To request one, contact [integrations@fourvenues.com](mailto:integrations@fourvenues.com) and include:

\- Your marketplace/channel name and company details
\- The venues (hosts) you have or plan to have partnerships with
\- The integration you are building (e.g. "ticket marketplace", "event aggregator")
\- The endpoints you need access to

<Warning>
  API keys are **channel-scoped**: they grant access only to venues that have explicitly added your channel as a partner. If a venue removes you as a partner, events from that venue will no longer appear in your API responses.
</Warning>

### Key lifecycle

| Property | Detail |
| - | - |
| **Expiry** | Keys have a limited lifespan and must be rotated before expiry. |
| **Revocation** | Keys can be revoked immediately if misused. |
| **Scope** | Each key is tied to a specific channel and its partner venues. |

\---## Environments

| Environment | Base URL | Purpose |
| - | - | - |
| **Alpha** | `https://channels-service-alpha.fourvenues.com` | Development & testing — isolated data, no real payments |
| **Production** | `https://channels-service.fourvenues.com` | Live data — use only when fully tested |

<Warning>
  The alpha environment contains **test data only**. Always validate your integration end-to-end (including the webhook flow) in alpha before switching to production keys.
</Warning>

To verify connectivity:

```bash theme={null}
curl --request GET \
  --url 'https://channels-service-alpha.fourvenues.com/auth' \
  --header 'X-Api-Key: YOUR_API_KEY_HERE'
```

A valid response includes your channel identity and all authorized host venues.

\---## Conditional required fields

### List creation (`POST /lists`)

The fields required when creating a guest list entry depend on the **list rate configuration**. Always fetch the list rate first and check:

| Flag on list rate | Meaning |
| - | - |
| `requires_full_name: true` | `name` is **required** in the request body |
| `requires_email: true` | `email` is **required** in the request body |
| `requires_phone: true` | `phone` is **required** in the request body |

Example — list rate with email + name required (phone optional):

```json theme={null}
{
  "rate_id": "lr_888",
  "event_id": "ev_abc123",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "for": 2
}
```

Submitting without a required field returns `422 Unprocessable Entity`.

### Ticket checkout (`POST /tickets/checkout`)

| Field | Required? | Notes |
| - | - | - |
| `redirect_url` | **Required** | URL the user lands on after successful payment |
| `error_url` | **Required** | URL the user lands on after failed payment |
| `ticket_rate_id` | **Required** | The rate the user is purchasing |
| `tickets` | **Required** | Array with at least one ticket object |
| `tickets[].email` | Depends on `fields` config of the rate | — |
| `tickets[].full_name` | Depends on `fields` config of the rate | — |
| `tickets[].price_id` | Optional | ID of the price you displayed; returns `conditions_changed` flag |
| `tickets[].supplements` | Optional | Array of supplement IDs |
| `tickets[].warranty` | Required only if rate has warranty enabled | Boolean |
| `discount_code` | Optional | Applied to all tickets in the session |
| `send_resources` | Optional | If `true`, Fourvenues sends ticket by email/SMS/WhatsApp |
| `metadata` | Optional | Free-form JSON object, max 1 KB — useful for your internal IDs |

\---## Webhooks

Webhooks allow you to receive real-time notifications when payments complete or refunds are requested. See the full guide at [Webhook Introduction](/channel-manager/webhooks/introduction/introduction).

### Setting up a webhook endpoint

```bash theme={null}
curl --request POST \
  --url 'https://channels-service-alpha.fourvenues.com/webhooks' \
  --header 'X-Api-Key: <api-key>' \
  --header 'Content-Type: application/json' \
  --data '{
    "url": "https://myapp.com/webhooks/fourvenues",
    "events": ["payment.success", "ticket.refund_request"]
  }'
```

### Verifying webhook signatures

Each webhook delivery includes a signature header so you can confirm the request is genuinely from Fourvenues. See [Webhook Authentication](/channel-manager/webhooks/introduction/authentication) for the verification algorithm.

<Warning>
  **Never process a webhook without verifying its signature.** Always validate the signature before updating your database or fulfilling orders.
</Warning>

### Available webhook events

| Event | Triggered when |
| - | - |
| `payment.success` | A buyer completes payment for a checkout session |
| `ticket.refund_request` | A buyer requests a refund for their ticket |

\---## Pagination

| Parameter | Type | Description |
| - | - | - |
| `page` | integer | Page number starting at `1` |
| `limit` | integer | Results per page (default varies per endpoint) |
| `start_date` | string (`YYYY-MM-DD` or ISO 8601) | Start of date range filter |
| `end_date` | string (`YYYY-MM-DD` or ISO 8601) | End of date range filter |
| `organization_id` | string | Filter events by a specific host organization |
| `location_id` | string | Filter events by venue location |

\---## Rate limits

\- **Burst requests:** Avoid more than 10 requests per second from a single API key.
\- **429 responses:** If you receive `429 Too Many Requests`, implement exponential backoff before retrying.
\- **Webhook retries:** If your endpoint returns a non-2xx status, Fourvenues will retry the delivery with backoff. Ensure your endpoint responds quickly (\< 5 seconds) and processes asynchronously.

\---## Common errors

| HTTP Status | Cause | Fix |
| - | - | - |
| `401 Unauthorized` | Missing or invalid `X-Api-Key` | Check the header name and key value |
| `403 Forbidden` | Key doesn't have access to this endpoint or venue | Contact the Fourvenues team to update your key scope, or verify the venue has added your channel |
| `404 Not Found` | Resource doesn't exist or is not accessible to your channel | Verify the `_id` or `slug`; confirm the venue is a partner |
| `422 Unprocessable Entity` | Missing required field or invalid value | Check the request body against the list rate's `requires_*` flags and the API reference |
| `429 Too Many Requests` | Rate limit exceeded | Implement exponential backoff |
| `500 Internal Server Error` | Unexpected server error | Retry once; if persistent, contact support |

\---## Security considerations

\- **Never expose your API key client-side** — all requests must go through your backend.
\- **Validate webhook signatures** before acting on any webhook payload.
\- **Rotate keys regularly** — contact the Fourvenues team to issue a new key.
\- **Use HTTPS only** — HTTP requests are rejected at the infrastructure level.
\- **Store `metadata` wisely** — the metadata field is not encrypted; do not store sensitive PII there.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.