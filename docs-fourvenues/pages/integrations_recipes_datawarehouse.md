> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# 💾 Create Datawarehouse

> Learn how to generate custom Datawarehouse

We will go through the following steps:

* Retriving events information.
* Retriving bookings, lists and tickets related to events.
* Retriving latest status of bookings, lists and tickets related to events.

## Retriving events information

Request [Events](/integrations/api-reference/events/get-events):

```bash theme={null}
curl --request GET \
--url https: //api-alpha.fourvenues.com/integrations/events/ \
--header 'x-api-key: <api-key>'

{
  "success": true,
  "data": [
    {
      "_id": "wl7j9fejp1b3e01ao2j7sh9cdx3LWYPV", # Event ID
            "name": "Viernes",
      "slug": "viernes-16-09-20227",
      "url": "http://localhost:8000/gengis-kan/events/viernes-16-09-20227",
      "start": 1663365600,
      "end": 1663392600,
      "date": 1737586800, # Format ISO_8601
            ...
    }
  ]
}
```

## Retriving bookings, lists and tickets related to events

You need convert 'date' property of event to lcoal timezone

```bash theme={null}
`date -r 1737586800 "+%Y-%m-%d"` # Output 2025-01-23
```

Get bookings by Event ID and Event Date:

```bash theme={null}
curl --request GET \
--url https: //api-alpha.fourvenues.com/integrations/bookings/availability?event_id=EVENT_IDA&date=EVENT_DATE \
--header 'x-api-key: <api-key>'

{
  "success": true,
  "data": [
      {
          "_id": "nm650et24001a1aqu29o58m85yNSoxGL",
          "email": "username@fourvenues.com",
          "walkin": false,
          "refunded": 0,
          "created_at": "2025-01-20T12:15:25.852Z",
          "updated_at": "2025-01-20T12:15:41.907Z",
          "currency": "EUR",
          "hour": "",
          "invoice_references": [],
          "corrective_invoice_references": [],
          "payments": [
              {
                  "_id": "gm650et2u001b1aquhruhbqdgyd9rPhC",
                  "amount": 108,
                  "currency": "EUR",
                  "payment_method": "amex",
                  "created_at": "2025-01-20T12:15:25.878Z",
                  "created_by": ""
              }
          ],
          "event_id": "gm650c38b00321bo02rvq8psdAtW1WYA",
          ...
      }
    ]      
}     
```

### Retriving Tickets information by Event ID

```bash theme={null}
curl --request GET \
--url https: //api-alpha.fourvenues.com/integrations/tickets?event_id=EVENT_ID' \
--header 'x-api-key:  <api-key>'


{
  "success": true,
  "data": [
    {
      "_id": "cm60p0mqw00291ypebpps5x0mqb7hfxF",
      "remarketing": false,
      "email": "username@xxxx.com",
      "refunded": 0,
      "updated_at": 1737114362837,
            ....
    }
  ]
}
```

### Retriving Lists information by Event ID

```bash theme={null}
curl --request GET \
--url https: //api-alpha.fourvenues.com/integrations/lists/?event_id=EVENT_ID&date_field=updated_at \
--header 'x-api-key:  <api-key>'

{
  "success": true,
  "data": [
    {
      "_id": "wm66l7bwq000018qu45839mwmQLY86i8",
      "event_id": "gm650c38b00321bo02rvq8psdAtW1WYA",
      "rate_id": "fm66l5z5h000c1ao0c8qa373r25jtkwf",
      "channel_id": "ym5gm2jtm000118n4do0gbhvo5m9XMSC",
      "name": "nombre cliente",
      "for": 1,
      ...
    }
  ]
}
```

## Retriving latest status of bookings, lists and tickets related to events

Update bookings, lists and tickets information with previus day, for example start\_date: `2025-01-21`and end\_date:`2025-01-22`:

Request [Bookings](/integrations/api-reference/bookings/get-bookings):

```bash theme={null}
curl --request GET \
--url https: //api-alpha.fourvenues.com/integrations/lists/?event_id=EVENT_ID&date=EVENT_DATE&date_field=updated_at&start_date=2025-01-21&end_date=2025-01-22' \
--header 'x-api-key:  <api-key>'
```

Request [Lists](/integrations/api-reference/lists/get-lists):

```bash theme={null}
curl --request GET \
--url https: //api-alpha.fourvenues.com/integrations/lists/?event_id=EVENT_ID&start_date=2025-01-21&end_date=2025-01-22&date_field=updated_at \
--header 'x-api-key:  <api-key>'
```

Request [Tickets](/integrations/api-reference/tickets/get-tickets):

```bash theme={null}
curl --request GET \
--url https: //api-alpha.fourvenues.com/integrations/tickets?event_id=EVENT_ID&start_date=2025-01-21&end_date=2025-01-22&date_field=updated_at \
--header 'x-api-key:  <api-key>'
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.