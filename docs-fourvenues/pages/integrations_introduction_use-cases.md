> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Use cases

***

title: "Use Cases"
description: "End-to-end integration flows for the Integrations API — built for venue owners and operators."
\---The Integrations API is scoped to **your own venues**. The use cases below cover the most common integration patterns, each with a complete request/response flow.

\---## Use Case 1 — Custom Check-in System

**Goal:** Build your own scanner or POS that checks in tickets without using the Fourvenues app.

### Step 1 — List your events

Fetch the events to show the operator a picker:

```bash theme={null}
curl --request GET \
  --url 'https://api-alpha.fourvenues.com/integrations/events/' \
  --header 'X-Api-Key: <api-key>'
```

```json theme={null}
{
  "success": true,
  "data": [
    {
      "_id": "Pl4gr84v20xqu01js0ybj42s6vYtIz1T",
      "name": "Saturday Night",
      "slug": "saturday-night-2024-09-28",
      "start": 1727474400,
      "end": 1727503200,
      "date": 1727474400
    }
  ]
}
```

### Step 2 — Pre-load tickets for the selected event

Poll this endpoint every 5 minutes and cache the result locally. This avoids a round-trip on every scan:

```bash theme={null}
curl --request GET \
  --url 'https://api-alpha.fourvenues.com/integrations/tickets/?event_id=Pl4gr84v20xqu01js0ybj42s6vYtIz1T' \
  --header 'X-Api-Key: <api-key>'
```

```json theme={null}
{
  "success": true,
  "data": [
    {
      "_id": "el7yuiyep0006msyw2pri1tem1LpJwSc",
      "code": "P6J21FF2S",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "phone": "+34666000111",
      "enter": 0,
      "entry_date": null,
      "event_id": "Pl4gr84v20xqu01js0ybj42s6vYtIz1T",
      "payment_id": "Cl7yuiyhy0007msyw4vfl5ai6YF4WZRn"
    }
  ]
}
```

<Tip>
  Pass `start_date` equal to the `created_at` of the last ticket you received to only fetch new tickets on each poll, reducing response size significantly.
</Tip>

### Step 3 — Fallback: look up by code at scan time

If a scanned code is not found in your local cache (ticket bought after the last poll), look it up directly:

```bash theme={null}
curl --request GET \
  --url 'https://api-alpha.fourvenues.com/integrations/tickets/code/P6J21FF2S' \
  --header 'X-Api-Key: <api-key>'
```

```json theme={null}
{
  "success": true,
  "data": {
    "_id": "el7yuiyep0006msyw2pri1tem1LpJwSc",
    "code": "P6J21FF2S",
    "name": "Jane Doe",
    "enter": 0
  }
}
```

### Step 4 — Mark the ticket as checked in

Use the ticket `_id` to submit the check-in. `enter: 1` marks as entered, `enter: 0` reverts:

```bash theme={null}
curl --request PUT \
  --url 'https://api-alpha.fourvenues.com/integrations/tickets/el7yuiyep0006msyw2pri1tem1LpJwSc/checkin' \
  --header 'X-Api-Key: <api-key>' \
  --header 'Content-Type: application/json' \
  --data '{
    "enter": 1,
    "entry_date": "2024-09-28T23:00:00.000Z"
  }'
```

```json theme={null}
{
  "success": true
}
```

<Warning>
  If the ticket has already been checked in (`enter: 1`), the API will return an error. Always check the current `enter` value before attempting a check-in.
</Warning>

**Same flow works for Lists** using `/integrations/lists/{id}/checkin` and for Passes using `/integrations/passes/{id}/checkin`.

\---## Use Case 2 — Payments & Refunds Report

**Goal:** Export all payments and refunds for your events into a finance system or spreadsheet.

### Step 1 — List events in a date range

```bash theme={null}
curl --request GET \
  --url 'https://api-alpha.fourvenues.com/integrations/events/?start_date=2024-01-01&end_date=2024-03-31' \
  --header 'X-Api-Key: <api-key>'
```

Save the `_id` of each event you want to report on.

### Step 2 — Fetch payments for each event

```bash theme={null}
curl --request GET \
  --url 'https://api-alpha.fourvenues.com/integrations/payments/?event_id=Pl4gr84v20xqu01js0ybj42s6vYtIz1T' \
  --header 'X-Api-Key: <api-key>'
```

```json theme={null}
{
  "success": true,
  "data": [
    {
      "_id": "pm9abc123def4567890",
      "amount": 2500,
      "currency": "EUR",
      "payment_method": "card",
      "status": "paid",
      "created_at": "2024-09-28T21:15:00.000Z",
      "event_id": "Pl4gr84v20xqu01js0ybj42s6vYtIz1T"
    }
  ]
}
```

<Info>
  `amount` is always expressed in **cents** (e.g. `2500` = €25.00).
</Info>

### Step 3 — Fetch refunds for each event

```bash theme={null}
curl --request GET \
  --url 'https://api-alpha.fourvenues.com/integrations/refunds/?event_id=Pl4gr84v20xqu01js0ybj42s6vYtIz1T' \
  --header 'X-Api-Key: <api-key>'
```

```json theme={null}
{
  "success": true,
  "data": [
    {
      "_id": "rf9abc123def4567890",
      "amount": 2500,
      "currency": "EUR",
      "reason": "customer_request",
      "created_at": "2024-09-29T10:00:00.000Z",
      "payment_id": "pm9abc123def4567890",
      "event_id": "Pl4gr84v20xqu01js0ybj42s6vYtIz1T"
    }
  ]
}
```

### Step 4 — Fetch wallet movements (optional)

If your venues use the Fourvenues wallet, you can pull movement history:

```bash theme={null}
curl --request GET \
  --url 'https://api-alpha.fourvenues.com/integrations/wallet-movements/?event_id=Pl4gr84v20xqu01js0ybj42s6vYtIz1T' \
  --header 'X-Api-Key: <api-key>'
```

```json theme={null}
{
  "success": true,
  "data": [
    {
      "_id": "wm9abc123def4567890",
      "amount": 1000,
      "currency": "EUR",
      "type": "credit",
      "description": "Drink token redeemed",
      "created_at": "2024-09-28T23:45:00.000Z"
    }
  ]
}
```

\---## Use Case 3 — Datawarehouse / Incremental Sync

**Goal:** Keep an external database in sync with Fourvenues data, updated daily.

### Initial load

On the first run, pull all events and for each event pull tickets, lists and bookings:

```bash theme={null}
# Events
curl --request GET \
  --url 'https://api-alpha.fourvenues.com/integrations/events/' \
  --header 'X-Api-Key: <api-key>'

# Tickets for a specific event
curl --request GET \
  --url 'https://api-alpha.fourvenues.com/integrations/tickets/?event_id=EVENT_ID' \
  --header 'X-Api-Key: <api-key>'

# Lists for a specific event
curl --request GET \
  --url 'https://api-alpha.fourvenues.com/integrations/lists/?event_id=EVENT_ID' \
  --header 'X-Api-Key: <api-key>'

# Bookings for a specific event + date
curl --request GET \
  --url 'https://api-alpha.fourvenues.com/integrations/bookings/?event_id=EVENT_ID&date=2024-09-28' \
  --header 'X-Api-Key: <api-key>'
```

<Tip>
  Convert the event's `date` Unix timestamp to a `YYYY-MM-DD` string before using it as the `date` parameter for bookings:

  ```bash theme={null}
  date -r 1727474400 "+%Y-%m-%d"  # → 2024-09-28
  ```
</Tip>

### Incremental updates (daily)

Use `start_date` / `end_date` together with `date_field=updated_at` to fetch only records that changed in the last 24 hours:

```bash theme={null}
# Tickets updated yesterday
curl --request GET \
  --url 'https://api-alpha.fourvenues.com/integrations/tickets/?event_id=EVENT_ID&start_date=2024-09-27&end_date=2024-09-28&date_field=updated_at' \
  --header 'X-Api-Key: <api-key>'

# Lists updated yesterday
curl --request GET \
  --url 'https://api-alpha.fourvenues.com/integrations/lists/?event_id=EVENT_ID&start_date=2024-09-27&end_date=2024-09-28&date_field=updated_at' \
  --header 'X-Api-Key: <api-key>'
```

Upsert the returned records into your warehouse using `_id` as the primary key.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.