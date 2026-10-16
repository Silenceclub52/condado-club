> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Patch booking deposit

> Update the deposit (fianza) and deposit paid (fianza_pagada) of a booking.



## OpenAPI

````yaml patch /bookings/{bookingId}/deposit
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
  /bookings/{bookingId}/deposit:
    patch:
      tags:
        - Bookings
      description: >-
        Update the deposit (fianza) and deposit paid (fianza_pagada) of a
        booking.
      parameters:
        - name: bookingId
          in: path
          required: true
          schema:
            type: string
          description: Id of the booking
          example: El805n9kh0000g3yw94010m5bNvk6za4
      requestBody:
        required: true
        description: Body of the request
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/BookingDeposit'
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
                xml:
                  name: main
            application/xml:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
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
    BookingDeposit:
      properties:
        deposit:
          description: Deposit amount for the reservation
          example: 50
          type: number
        deposit_paid:
          description: Amount of deposit paid
          example: 50
          type: number
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