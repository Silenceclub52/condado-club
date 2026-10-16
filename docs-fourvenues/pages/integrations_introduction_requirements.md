> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Requirements

***

title: "Requirements & Constraints"
description: "Authentication, environments, pagination, rate limits and conditional fields for the Integrations API."
\---## Authentication

All requests must include your API key in the `X-Api-Key` HTTP header:

```bash theme={null}
curl --request GET \
  --url 'https://api-alpha.fourvenues.com/integrations/events/' \
  --header 'X-Api-Key: YOUR_API_KEY_HERE'
```

### Getting an API key

API keys are provisioned by the Fourvenues team. To request one, contact [integrations@fourvenues.com](mailto:integrations@fourvenues.com) and include:

\- Your venue name(s) and Fourvenues account email
\- The integration you are building (e.g. "custom check-in scanner", "BI dashboard")
\- The endpoints you need access to

<Warning>
  API keys are **scoped**: they only grant access to the specific endpoints requested. If you need additional access later, contact the team to update your key's permissions.
</Warning>

### Key lifecycle

| Property | Detail |
| - | - |
| **Expiry** | Keys have a limited lifespan and must be rotated before expiry. |
| **Revocation** | Keys can be revoked immediately if misused. |
| **Scope** | Each key is tied to specific endpoints and your account's venues only. |

\---## Environments

| Environment | Base URL | Purpose |
| - | - | - |
| **Alpha** | `https://api-alpha.fourvenues.com/integrations` | Development & testing — uses isolated data, no real payments |
| **Production** | `https://api.fourvenues.com/integrations` | Live data — use only when your integration is fully tested |

<Warning>
  The alpha environment contains **test data only**. Events, tickets and payments created there do not appear in production and vice versa. Always validate your integration against alpha before switching to production.
</Warning>

You can verify your API key is working against the correct environment by calling the channels endpoint:

```bash theme={null}
curl --request GET \
  --url 'https://api-alpha.fourvenues.com/integrations/channels/' \
  --header 'X-Api-Key: YOUR_API_KEY_HERE'
```

A successful response returns the channels associated with your key:

```json theme={null}
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

\---## Pagination

Most list endpoints return paginated results. Common query parameters:

| Parameter | Type | Description |
| - | - | - |
| `page` | integer | Page number, starting at `1` |
| `limit` | integer | Number of results per page (default varies per endpoint) |
| `start_date` | string (`YYYY-MM-DD`) | Filter records created/updated after this date |
| `end_date` | string (`YYYY-MM-DD`) | Filter records created/updated before this date |
| `date_field` | string | Which date field to filter on: `created_at` or `updated_at` |

<Tip>
  For incremental syncs, always use `date_field=updated_at` together with a narrow `start_date`/`end_date` window to avoid re-fetching unchanged records.
</Tip>

\---## Conditional required fields

Some endpoints have fields that become required depending on context.

### Check-in endpoint (`PUT /integrations/tickets/{id}/checkin`)

| Field | Required? | Notes |
| - | - | - |
| `enter` | **Always required** | `1` to mark as entered, `0` to revert |
| `entry_date` | Required when `enter: 1` | ISO 8601 datetime string (e.g. `2024-09-28T23:00:00.000Z`) |

### Bookings (`GET /integrations/bookings/`)

| Field | Required? | Notes |
| - | - | - |
| `event_id` | **Required** | The event to query bookings for |
| `date` | **Required** | The event date in `YYYY-MM-DD` format |

\---## Rate limits

The Integrations API does not publish explicit rate limit values, but the following guidelines apply:

\- **Polling intervals:** Do not poll any endpoint more than once per minute. For check-in pre-loading, every 5 minutes is recommended.
\- **Burst requests:** Avoid sending more than 10 requests per second from a single key.
\- **429 responses:** If you receive a `429 Too Many Requests`, implement exponential backoff before retrying.

\---## Common errors

| HTTP Status | `success` | Cause | Fix |
| - | - | - | - |
| `401 Unauthorized` | `false` | Missing or invalid `X-Api-Key` | Check the header name and key value |
| `403 Forbidden` | `false` | Key does not have access to this endpoint | Contact the Fourvenues team to update key scope |
| `404 Not Found` | `false` | Resource does not exist or belongs to another account | Verify the `_id` or `code` |
| `422 Unprocessable Entity` | `false` | Missing required field or invalid value | Check the request body against the API reference |
| `429 Too Many Requests` | `false` | Rate limit exceeded | Implement exponential backoff |
| `500 Internal Server Error` | `false` | Unexpected server error | Retry once; if persistent, contact support |

\---## Security considerations

\- **Never expose your API key in client-side code** (browser JavaScript, mobile apps). Always route requests through your backend.
\- **Rotate keys regularly** — contact the team to issue a new key and invalidate the old one.
\- **Use HTTPS** — all API endpoints require HTTPS. HTTP requests will be rejected.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.