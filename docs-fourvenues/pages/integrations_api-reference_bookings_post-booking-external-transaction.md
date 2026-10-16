> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Post booking external transaction

> Create an external payment for a booking



## OpenAPI

````yaml post /bookings/{bookingId}/external-transaction
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
  /bookings/{bookingId}/external-transaction:
    post:
      tags:
        - Bookings
      description: Create an external payment for a booking
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
              type: object
              required:
                - transaction_type
                - amount
                - method
              properties:
                transaction_type:
                  type: string
                  enum:
                    - payment
                  example: payment
                amount:
                  type: number
                  example: 50
                method:
                  type: string
                  enum:
                    - transfer
                    - cash
                    - external-card
                    - external-online
                    - check
                    - other
                  example: cash
                payment_method_slug:
                  type: string
                  enum:
                    - visa
                    - mastercard
                    - amex
                  example: visa
                description:
                  type: string
                  example: External payment
                send_resources:
                  type: boolean
                  description: >-
                    Whether the resources should be delivered to the customer
                    once this payment confirms the booking. Defaults to true.
                  example: true
                tip_information:
                  type: object
                  description: >-
                    Tip applied to this payment. The tip amount does not count
                    toward the deposit.
                  required:
                    - tip_rate_id
                    - total
                  properties:
                    tip_rate_id:
                      type: string
                      description: Id of the tip rate applied (must be an active rate).
                      example: El805n9kh0000g3yw94010m5bNvk6za4
                    total:
                      description: Tip amount.
                      example: 3
                      type: number
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
                    $ref: >-
                      #/components/schemas/BookingExternalTransactionPaymentResponse
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
                    $ref: >-
                      #/components/schemas/BookingExternalTransactionPaymentResponse
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
    BookingExternalTransactionPaymentResponse:
      properties:
        _id:
          description: Unique ID of the created external payment.
          example: ld9o8tpo7tyld79qxdk6sgikl5i4xjpj
          type: string
        booking_id:
          description: Booking identifier.
          example: gxwts76a2qpoxf2rdtxy35etfk6xyd1m
          type: string
        transaction_type:
          description: Transaction type.
          example: payment
          type: string
          enum:
            - payment
        amount:
          description: Base amount of the external payment, without the tip.
          example: 50
          type: number
        total_amount:
          description: 'Total charged amount: base amount plus the tip.'
          example: 53
          type: number
        currency:
          description: Currency of the external payment.
          example: EUR
          type: string
        method:
          description: External payment method.
          example: cash
          type: string
        payment_method_slug:
          description: Card brand when applicable.
          example: visa
          type: string
          nullable: true
        description:
          description: Optional payment description.
          example: External payment
          type: string
          nullable: true
        original_external_payment_id:
          description: Always null for payment transactions.
          example: null
          type: string
          nullable: true
        tip_information:
          description: Tip information of the external payment. Null when not provided.
          type: object
          nullable: true
          properties:
            tip_rate_id:
              description: Identifier of the tip rate.
              example: El805n9kh0000g3yw94010m5bNvk6za4
              type: string
            total:
              description: Tip amount.
              example: 3
              type: number
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