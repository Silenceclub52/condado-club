> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Put bookings products

> Update the products of a booking



## OpenAPI

````yaml put /bookings/{bookingId}/products
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
  /bookings/{bookingId}/products:
    put:
      tags:
        - Bookings
      description: Update the products of a booking
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
              $ref: '#/components/schemas/BookingProductsUpdate'
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
    BookingProductsUpdate:
      properties:
        products:
          items:
            $ref: '#/components/schemas/BookingProduct'
          type: array
        payments:
          items:
            $ref: '#/components/schemas/BookingPosPayment'
          type: array
        ticket_total:
          description: Total paid for the products (A discount can be applied).
          example: 100
          type: integer
        pos_total_service_charge:
          description: Total service charge.
          example: 200
          type: number
        pos_total_tips:
          description: Total tips.
          example: 50
          type: number
      type: object
    BookingProduct:
      properties:
        _id:
          description: ID of the product.
          example: ylgla79ll0000fosz51sl31g5q09Adij
          type: string
        amount:
          description: Quantity.
          example: 2
          type: integer
        name:
          description: Name or description of the product.
          example: VIP Bottle 70cl
          type: string
        total_price:
          description: Total price.
          example: 200
          type: number
        unit_price:
          description: Unit price of the product.
          example: 100
          type: number
      type: object
    BookingPosPayment:
      properties:
        amount:
          description: Amount of the payment.
          example: 100
          type: number
        type:
          description: Type of payment.
          example: cash
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