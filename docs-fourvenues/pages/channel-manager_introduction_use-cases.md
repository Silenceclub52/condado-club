> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Use cases

***

title: "Use Cases"
description: "End-to-end integration flows for the Channel Manager API — built for marketplaces and multi-venue operators."
\---The Channel Manager API is scoped to **your channel's partner venues**. The use cases below walk through the most common integration patterns with complete request/response examples.

\---## Use Case 1 — Verify Your Channel & List Partner Venues

**Goal:** Confirm your API key is valid and discover which venues (hosts) have granted your channel access.

### Step 1 — Authenticate

```bash theme={null}
curl --request GET \
  --url 'https://channels-service-alpha.fourvenues.com/auth' \
  --header 'X-Api-Key: <api-key>'
```

```json theme={null}
{
  "success": true,
  "data": {
    "message": "Authed",
    "channel": {
      "_id": "ch_abc123",
      "name": "My Marketplace",
      "slug": "my-marketplace",
      "hosts": [
        {
          "_id": "org_xyz789",
          "name": "Club Razzmatazz",
          "slug": "club-razzmatazz",
          "created_at": "2023-06-01T00:00:00.000Z"
        },
        {
          "_id": "org_def456",
          "name": "Sala Apolo",
          "slug": "sala-apolo",
          "created_at": "2024-01-15T00:00:00.000Z"
        }
      ]
    }
  }
}
```

The `hosts` array lists every venue that has authorized your channel. Use the `_id` values to filter events and resources by organization.

\---## Use Case 2 — Browse Events & Ticket Rates

**Goal:** Display an event catalog to end users with real-time pricing and availability.

### Step 1 — List events across all partner venues

```bash theme={null}
curl --request GET \
  --url 'https://channels-service-alpha.fourvenues.com/events?start_date=2024-09-01&end_date=2024-09-30' \
  --header 'X-Api-Key: <api-key>'
```

```json theme={null}
{
  "success": true,
  "data": [
    {
      "_id": "ev_abc123",
      "name": "Friday Night Sessions",
      "slug": "friday-night-sessions-2024-09-06",
      "description": "Weekly Friday party",
      "display_date": "2024-09-06T00:00:00.000Z",
      "start_date": "2024-09-06T22:00:00.000Z",
      "end_date": "2024-09-07T06:00:00.000Z",
      "organization_id": "org_xyz789",
      "image_url": "https://cdn.fourvenues.com/events/friday-night.jpg",
      "location_id": "loc_123",
      "ticket_rates": [...],
      "age": "18",
      "outfit": "smart casual"
    }
  ]
}
```

You can also filter by organization:

```bash theme={null}
curl --request GET \
  --url 'https://channels-service-alpha.fourvenues.com/events?organization_id=org_xyz789' \
  --header 'X-Api-Key: <api-key>'
```

### Step 2 — Get a specific event with full ticket rate detail

```bash theme={null}
curl --request GET \
  --url 'https://channels-service-alpha.fourvenues.com/events/ev_abc123' \
  --header 'X-Api-Key: <api-key>'
```

Inside the response you'll find `ticket_rates` with pricing and availability:

```json theme={null}
{
  "success": true,
  "data": {
    "_id": "ev_abc123",
    "name": "Friday Night Sessions",
    "ticket_rates": [
      {
        "_id": "tr_111",
        "name": "General Access",
        "slug": "general-access",
        "available": true,
        "min": 1,
        "max": 6,
        "current_price": {
          "_id": "price_early",
          "name": "Early Bird",
          "price": 1200,
          "valid_until": "2024-09-06T20:00:00.000Z",
          "fee_type": "percentage",
          "fee_quantity": 10,
          "includes": "1 Drink"
        },
        "availability": {
          "sold": 45,
          "available": 55
        },
        "supplements": [
          { "_id": "sup_1", "label": "Extra drink token", "price": 500 }
        ],
        "warranty": {
          "enabled": true,
          "percentage": 20,
          "hours": 24
        }
      }
    ]
  }
}
```

<Info>
  `price` is always in **cents** (e.g. `1200` = €12.00). Use `current_price` as the active price to show users — it reflects the currently valid pricing tier.
</Info>

\---## Use Case 3 — Create a Guest List Entry

**Goal:** Add a contact to a guest list on behalf of a partner venue.

### Step 1 — Get list rates for the event

```bash theme={null}
curl --request GET \
  --url 'https://channels-service-alpha.fourvenues.com/list-rates?event_id=ev_abc123' \
  --header 'X-Api-Key: <api-key>'
```

```json theme={null}
{
  "success": true,
  "data": [
    {
      "_id": "lr_888",
      "name": "Free Entry List",
      "event_id": "ev_abc123",
      "requires_full_name": true,
      "requires_email": true,
      "requires_phone": false,
      "for": 2,
      "available": true
    }
  ]
}
```

<Warning>
  **Conditional required fields:** The fields `full_name`, `email` and `phone` are required or optional depending on the list rate configuration (`requires_full_name`, `requires_email`, `requires_phone`). Always check these flags before building your form — submitting missing required fields returns a `422` error.
</Warning>

### Step 2 — Create the list entry

```bash theme={null}
curl --request POST \
  --url 'https://channels-service-alpha.fourvenues.com/lists' \
  --header 'X-Api-Key: <api-key>' \
  --header 'Content-Type: application/json' \
  --data '{
    "rate_id": "lr_888",
    "event_id": "ev_abc123",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "for": 2
  }'
```

```json theme={null}
{
  "success": true,
  "data": {
    "_id": "li_999abc",
    "code": "JDOE2024",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "rate_id": "lr_888",
    "event_id": "ev_abc123",
    "for": 2,
    "enter": 0,
    "created_at": "2024-09-05T10:30:00.000Z"
  }
}
```

The `code` field is the unique identifier for check-in at the door.

\---## Use Case 4 — Full Ticket Checkout Flow

**Goal:** Let users purchase tickets through your marketplace, receive payment confirmation and handle refunds.

See the complete step-by-step guide in the [Creating a Checkout Process](/channel-manager/recipes/creating-a-checkout-process) recipe. Here is a summary of the steps:

1\. **Fetch events + ticket rates** — `GET /events`
2\. **Create checkout session** — `POST /tickets/checkout` with `redirect_url`, `error_url`, ticket data and optional `discount_code`
3\. **Redirect user** to `payment_url` from the response
4\. **Receive webhook** — Fourvenues sends a `payment.success` event to your endpoint when payment completes
5\. **Verify webhook signature** — see [Webhook Authentication](/channel-manager/webhooks/introduction/authentication)
6\. **Issue refund** (if needed) — `POST /tickets/{id}/refund`

### Minimal checkout request

```bash theme={null}
curl --request POST \
  --url 'https://channels-service-alpha.fourvenues.com/tickets/checkout' \
  --header 'X-Api-Key: <api-key>' \
  --header 'Content-Type: application/json' \
  --data '{
    "redirect_url": "https://myapp.com/payment/success",
    "error_url": "https://myapp.com/payment/error",
    "send_resources": true,
    "ticket_rate_id": "tr_111",
    "tickets": [
      {
        "email": "buyer@example.com",
        "full_name": "John Smith",
        "price_id": "price_early"
      }
    ]
  }'
```

```json theme={null}
{
  "success": true,
  "data": {
    "payment_id": "pay_xyz",
    "payment_url": "https://pay.fourvenues.com/pay_xyz",
    "conditions_changed": false,
    "tickets": [
      {
        "_id": "tkt_abc",
        "qr_code": "generated-qr-code"
      }
    ]
  }
}
```

<Info>
  If `conditions_changed: true` in the response, the price shown to the user no longer matches the active price. Display an updated summary before redirecting to payment.
</Info>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.