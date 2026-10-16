> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get refunds

> Get all the refunds given a event or a date range. (Only using Fourvenues payments gateway).



## OpenAPI

````yaml get /refunds/
openapi: 3.0.0
info:
  version: 1.0.0
  title: Integrations
  description: >-
    To make any API request you have to use (secret, integration_id) given by
    the organization. <br>
servers:
  - url: https://api-alpha.fourvenues.com/integrations
    description: Alpha
  - url: https://api.fourvenues.com/integrations
    description: Production
security:
  - integration_id: []
    secret: []
    xApiKey: []
tags:
  - name: Events
  - name: Bookings
  - name: Bookings Events
  - name: Channels
  - name: Clients
  - name: Lists
  - name: Passes
  - name: Subscriptions
  - name: Tickets
  - name: Discount Codes
  - name: TicketsRates
  - name: Users
  - name: Payments
  - name: Refunds
  - name: Wallet Movement
  - name: External Payments
  - name: Invoicing
  - name: Passes v2
  - name: Webhook Endpoints
  - name: Webhook Deliveries
paths:
  /refunds/:
    get:
      tags:
        - Refunds
      description: >-
        Get all the refunds given a event or a date range. (Only using
        Fourvenues payments gateway).
      parameters:
        - name: event_id
          in: query
          description: Event identifier.
          example: el4gr63f00xkq01i1d8jh5ohuzaZhvoE
          schema:
            type: string
        - name: start_date
          in: query
          description: Start date for the range.
          example: '2021-01-01'
          schema:
            type: string
        - name: end_date
          in: query
          description: End date for the range.
          example: '2021-12-31'
          schema:
            type: string
        - name: resource_type
          in: query
          description: Resource type. (bookings, tickets, name_changes)
          example: tickets
          schema:
            type: string
        - name: limit
          in: query
          description: Limit of results.
          example: 10
          schema:
            type: string
        - name: offset
          in: query
          description: Offset of results.
          example: 0
          schema:
            type: string
        - name: resource_id
          in: query
          description: Filters the refunds matching that resource_id.
          example: tl4gr63f0057q01i1d8jh5ohuzaZhvoX
          schema:
            type: string
      responses:
        '200':
          description: HTTP OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    $ref: '#/components/schemas/Refunds'
                xml:
                  name: main
            application/xml:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    $ref: '#/components/schemas/Refunds'
                xml:
                  name: main
        '400':
          description: Bad request
        '401':
          description: HTTP Unauthorized
        '404':
          description: HTTP Not Found
components:
  schemas:
    Refunds:
      description: Array of Refunds
      items:
        $ref: '#/components/schemas/Refund'
      type: array
    Refund:
      properties:
        venue_id:
          description: Venue identifier.
          example: fJ0vphh0acfytM4yWdAAXZcNPwDRDFpq
          type: string
        venue_slug:
          description: Venue slug.
          example: pacha
          type: string
        type_id:
          description: Type identifier.
          example: TCDu2yVBgwCHbBfHZH56HVdzn2vYcjcn
          type: string
        type_slug:
          description: Type slug.
          example: general-admission
          type: string
        event_id:
          description: Event identifier.
          example: xhL6F5eYyeLvc40E2MKmnBQZYf2nU7zT
          type: string
        event_slug:
          description: Event slug.
          example: saturday-night-26-09-2022
          type: string
        event_date:
          description: Event date.
          example: '2022-09-26'
          format: date
          type: string
        channel_id:
          description: Channel identifier.
          example: 6RKUYneVbpbx6g4uBh8QgAe9xrrZq2mb
          type: string
        channel_slug:
          description: Channel slug.
          example: my-channel
          type: string
        user_id:
          description: User identifier.
          example: ueC9A79zeLHMaNSY1hLw94zLu3knNhHT
          type: string
        artists:
          description: Artists of the event.
          example:
            - David Guetta
            - Martin Garrix
          items:
            type: string
          type: array
        day:
          description: Day of the refund.
          example: 26
          type: number
        month:
          description: Month of the refund.
          example: 9
          type: number
        year:
          description: Year of the refund.
          example: 2022
          type: number
        at:
          description: Date of the refund.
          example: '2022-09-15T23:00:00.000Z'
          format: date-time
          type: string
        resource_type:
          description: Resource type.
          example: tickets
          type: string
        n_resources:
          description: Number of resources.
          example: 2
          type: number
        resources_ids:
          description: Resources identifiers.
          example:
            - ANShQaGXdrYpiDVNAqdzX2u7u6yQBKvf
            - GYnAwwrBX7ATNWX9tiXQbHZ4720uUjKQ
          items:
            type: string
          type: array
        resource_id:
          description: Identifier of the refunded resource
          example: ANShQaGXdrYpiDVNAqdzX2u7u6yQBKvf
          type: string
        total_amount:
          description: Total amount.
          example: 20
          type: number
        payment_method:
          description: Payment method.
          example: amex
          type: string
        refunded:
          description: Refunded amount.
          example: 0
          type: number
        sale_type:
          description: Sale type.
          example: online
          type: string
        corrective_invoice_reference:
          description: Corrective invoice reference.
          example: EV24T-COR-H58Z-0000002
          type: string
        client_id:
          description: Client identifier.
          example: ilnnakdkz000338nzbi7x1xho3WQwKHg
          type: string
        payment_id:
          description: Id of the original payment associated with this refund.
          example: tshnakdkz000338nzbi7x1xho3WQwCVI
          type: string
      type: object
  securitySchemes:
    integration_id:
      type: apiKey
      in: header
      name: integration_id
      description: Identifier of the integration (Auth v1)
    secret:
      type: apiKey
      in: header
      name: secret
      description: Secret of the organization (Auth v1)
    xApiKey:
      type: apiKey
      in: header
      name: x-api-key
      description: API key (Auth v2)

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.