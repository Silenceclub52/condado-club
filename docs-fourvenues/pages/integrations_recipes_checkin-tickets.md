> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# ✅ Custom Check-in System

> Learn how to mark tickets as checked in using the Integrations API.

In this recipe, you will learn how to mark tickets as checked in using the Integrations API. This is useful when you have a custom system as a POS or custom check-in system and you want to mark the tickets as checked in in Fourvenues.

We will go through the following steps:

* Retriving events information.
* Retriving tickets of an event every 5 minutes.
* Falling back if not found.
* Mark the ticket as checked in when the ticket is found.

## Retriving events information

To start, you need to retrieve the events information. You can use the [events](/integrations/api-reference/events/get-events) endpoints to retrieve the events information.

```bash theme={null}
curl --request GET \
  --url https://api-alpha.fourvenues.com/integrations/events/ \
  --header 'x-api-key: <api-key>'
  
{
  "success": true,
  "data": [
    {
      "_id": "Pl4gr84v20xqu01js0ybj42s6vYtIz1T",
      "flyer": "https://www.your-domain.com/flyer.jpg",
      "name": "Saturday Night",
      "slug": "saturday-night-26-09-2022",
      "url": "https://www.fourvenues.com/gengis-kan/events/saturday-night-26-09-2022",
      "description": "This event takes place every Thursday",
      ...
    }
  ]
}
```

Now, with that information show the events to the user and ask for the event to check-in.

## Retriving tickets of an event every 5 minutes

In order to make the check-in process more efficient, you can retrieve the tickets of an event every 5 minutes and save it in your own database. This way, the check-in process will be faster and you will not need to make a request to the Fourvenues API every time you want to check-in a ticket.

You can use the [tickets](/integrations/api-reference/tickets/get-tickets) endpoint to retrieve the tickets of an event.

```bash theme={null}
curl --request GET \
  --url 'https://api-alpha.fourvenues.com/integrations/tickets/?event_id=int-event-id' \
  --header 'x-api-key: <api-key>'

{
  "success": true,
  "data": [
    {
      "_id": "el7yuiyep0006msyw2pri1tem1LpJwSc",
      "code": "P6J21FF2S",
      "email": "my-client-email@fourvenues.com",
      "enter": 0,
      "entry_date": 123,
      "event_id": "Mjo4f9o9h01fdjvmmrgn9aoh4s5IBHzX",
      "name": "Miguel Román",
      "payment_id": "Cl7yuiyhy0007msyw4vfl5ai6YF4WZRn",
      "phone": "+34666666666",
      ...
    }
  ]
}
```

Now, you can recall this endpoint every 5 minuts passing the `start_date` as the last `created_at` of the last ticket retrieved.

## Falling back if not found

It may be that during the check-in process, the ticket is not found in your database due that has been sold after the last request. In this case, you can make a request to the [tickets](/integrations/api-reference/tickets/get-ticket-by-id) endpoint to retrieve the ticket information.

```bash theme={null}
curl --request GET \
  --url 'https://api-alpha.fourvenues.com/integrations/tickets/int-ticket-id' \
  --header 'x-api-key: <api-key>'

{
  "success": true,
  "data": {
    "_id": "el7yuiyep0006msyw2pri1tem1LpJwSc",
    "code": "P6J21FF2S",
    "email": "my-client-email@fourvenues.com",
    "enter": 0,
    "entry_date": 123,
    "event_id": "Mjo4f9o9h01fdjvmmrgn9aoh4s5IBHzX",
    "name": "Miguel Román",
    "payment_id": "Cl7yuiyhy0007msyw4vfl5ai6YF4WZRn",
    "phone": "+34666666666",
    ...
  }
}
```

## Mark the ticket as checked in when the ticket is found

Finally, when you have the ticket information, you can send a request to the [checkin](/integrations/api-reference/tickets/checkin-ticket) endpoint to mark the ticket as checked in.

```bash theme={null}
curl --request PUT \
  --url https://api-alpha.fourvenues.com/integrations/tickets/int-ticket-id/checkin \
  --header 'secret: <api-key>' \
  --header 'x-api-key: <api-key>' \
  --data '{
  "enter": 1,
  "entry_date": "2022-09-15T23:00:00.000Z",
  "quality": 2
}'

{
  "success": true
}
```

If the request is successful, the ticket will be marked as checked in in the Fourvenues system.

If the request is not successful, it means that the ticket has already been checked in and the customer will not be able to enter the event again.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.