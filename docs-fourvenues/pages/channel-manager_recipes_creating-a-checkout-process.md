> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# 💳 Creating a Checkout Process

> Learn how to create a checkout process for your channel.

Creating a checkout process for a ticket can be a little bit tricky, but we're here to help you with that. In this guide, we'll show you how to create a checkout process for your channel.

We will go through the following steps:

* Fetching the events information with the ticket rates and availability.
* Creating a checkout session.
* Creating a webhook endpoint
* Waiting for the payment confirmation via webhook.
* Additionaly, we will show you how to handle the payment confirmation.

## Fetching the events information

The event information is available through the [events](channel-manager/api-reference/events/get-events) endpoint. You can filter the events by date range, location, and organization.

```bash theme={null}
curl --request GET \
  --url 'https://channels-service-alpha.fourvenues.com/events
  ?start_date=2024&end_date=2025' \
  --header 'X-Api-Key: <api-key>'
```

```json theme={null}
{
  "data": [
    {
      "_id": "abcdefghi1234567890",
      "name": "Monday Night",
      "slug": "monday-night",
      "description": "Lorem ipsum",
      "display_date": "2023-12-31T00:00:00.000Z",
      "start_date": "2024-01-01T00:00:00.000Z",
      "end_date": "2024-01-01T06:00:00.000Z",
      "organization_id": "abcdefghi1234567890",
      "age": "18",
      "image_url": "https://somecdn.com/random-hash",
      "outfit": "casual",
      "ambiences": [...],
      "music_genres": [...],
      "artists": [],
      "location_id": "locAbcdefghi1234567890",
      "location": { ,
      "ticket_rates": [...],
      "fields": [...]
    }
  ],
  "success": true
}
```

Now that you have the event information, you can display it on your website or app.

Inside the `ticket_rates` array, you will find the name, prices, current price and availability of this prices.

```json theme={null}
"ticket_rates": [
  {
    "_id": "abcdefghi1234567890",
    "organization_id": "abcdefghi1234567890",
    "event_id": "abcdefghi1234567890",
    "name": "General Access",
    "slug": "general-access",
    "valid_from": "2022-01-01T00:00:00.000Z",
    "complete": true,
    "type": "limited",
    "show_all_prices": true,
    "prices": [
      {
        "_id": "1643064796675",
        "name": "Early Bird",
        "price": 12,
        "valid_until": "2022-01-01T00:00:00.000Z",
        "quantity": 123,
        "fee_type": "percentage",
        "fee_quantity": 10,
        "includes": "1 Drink",
        "additional_info": "Only valid before 2:00 am."
      }
    ],
    "supplements": [
      {
        "_id": "1643064796675",
        "label": "1 Copa",
        "price": 12
      }
    ],
    "available": true,
    "current_price": {
      "_id": "1643064796675",
      "name": "Early Bird",
      "price": 12,
      "valid_until": "2022-01-01T00:00:00.000Z",
      "quantity": 123,
      "fee_type": "percentage",
      "fee_quantity": 10,
      "includes": "1 Drink",
      "additional_info": "Only valid before 2:00 am."
    },
    "warranty": {
      "enabled": true,
      "is_fixed_price": false,
      "fixed_price": 0,
      "percentage": 20,
      "hours": 12
    },
    "availability": {
      "sold": 10,
      "available": 90
    },
    "min": 1,
    "max": 10,
    "questions": [...]
  }
]
```

This information will show you the ticket rates available for the event. You can display the ticket rates on your website or app.

Also, inside a `ticket_rate` object, you will find the `prices` array, which contains the different prices available for the ticket rate. You can just focus on the `current_price` object, which contains the current price available for the ticket rate.

Also, the `ticket_rate` may contain other information like `supplements`, `warranty`, `availability`, `available`, `min`, `max`, `questions` and `fields`.

* `fields` are the fieds that the user can or must fill before buying the ticket rate. It can be a text field or a select field.
* `min` and `max` are the minimum and maximum number of tickets that can be bought in a unic checkout session.
* `questions` are the questions that the user can or must answer before buying the ticket depending if the `question` is required or not.
* `warranty` is the warranty information for the ticket rate. It can be bought or not depending on the `enabled` field. Also, it contains the `percentage` and `hours` that the warranty is available.
* `available` shows if the ticket rate is available or not.
* `availability.available` shows the number of tickets available.
* `availability.sold` shows the number of tickets sold.
* `supplements` are additional items that can be bought with the ticket rate. It can only be bought one item of each supplement.

## Creating a checkout session

Ones the user selects the ticket rate and the quantity of tickets, you can create a checkout session with the [checkout](channel-manager/api-reference/checkout/create-checkout-session) endpoint.

Also, to recive the payment confirmation you will need to create a [webhook endpoint](channel-manager/api-reference/webhooks/create-a-new-webhook-endpoint). If you need to go deeper on how to handle webhook events you can check the [Listening to Webhooks](channel-manager/recipes/listening-to-webhooks) recipe.

In order to create the checkout session, you will need to send a POST request to the [tickets checkout](channel-manager/api-reference/checkout/create-checkout-session) endpoint with the following information:

* `redirect_url`: The URL where the user will be redirected after the payment confirmation.
* `error_url`: The URL where the Fourvenues API will send the payment confirmation.
* 'send\_resources': If you want Fourvenues to send the ticekt via email, SMS or / and WhatsApp(r) after the payment confirmation.
* `metadata`: Free format object value object that you can use to store any information you want. Max 1kb.
* `ticket_rate_id`: The ticket rate id that the user wants to buy.
* `discount_code`: (Optional) The discount code that the user wants to use.
* `tickets`: An array of objects with the ticket information.
* `tickets[].email  ... tickets[].full_name`: The ticket information that is required as shown in the `fields` array of the ticket rate object.
* `tickets[].qr_code`: (Optional) The QR code that will be used to validate the ticket. If not provided, Fourvenues will generate one.
* `tickets[].price_id`: (Optional) The price id of the current\_price you have shown to the user. If not provided, Fourvenues will use the current\_price of the ticket rate. If provided, it will return a flag in the response to show if the price with what the checkout session has been generated is the same as the one you have shown to the user. Flag name: `conditions_changed`.
* `tickets[].supplements`: (Optional) An array of objects with the supplement information.
* `tickets[].supplements[].supplement_id`: The supplement id.
* `tickets[].warranty`: (Optional if the ticket rate has warranty) A boolean value that shows if the user wants to buy the warranty or not.

```bash theme={null}
curl --request POST \
  --url https://channels-service-alpha.fourvenues.com/tickets/checkout \
  --header 'Content-Type: application/json' \
  --header 'X-Api-Key: <api-key>' \
  --data '{
    "redirect_url": "https://mywebsite.com/redirect",
    "error_url": "https://mywebsite.com/error",
    "send_resources": true,
    "metadata": {
      "internal_id": "random-internal-id",
    },
    "ticket_rate_id": "abcdefghi1234567890",
    "discount_code": "DISCOUNT_CODE",
    "tickets": [
      {
        "email": "example@fourvenues.com",
        "full_name": "John Doe",
        "qr_code": "random-qr-code",
        "price_id": "abcdefghi1234567890",
        "supplements": [
          {
            "supplement_id": "abcdefghi1234567890"
          }
        ],
        "warranty": true
      }
    ]
  }'
```

Response example:

```json theme={null}
{
  "data": {
    "payment_id": "1234567890",
    "payment_url": "https://payment.yourwebpage.com/1234567890",
    "tickets": [
      {
        "_id": "1234567890",
        "qr_code": "random-qr-code",
        "price_id": "abcdefghi1234567890",
        ...
      },
      ...
    ]
    "conditions_changed": false
  },
  "success": true
}
```

Now, you can redirect the user to the `payment_url` to complete the payment.

## Waiting for the payment confirmation via webhook

After the user completes the payment, the Fourvenues API will send a webhook to your backend with the payment confirmation. You can check the [Listening to Webhooks](channel-manager/recipes/listening-to-webhooks) recipe to learn how to handle the webhook events.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.