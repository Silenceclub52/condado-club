> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Post discount codes bookings

> Create a booking (reservas) discount code at organization or event level.  Booking codes validate at event level only: no rate association and no quantity/sales limits.



## OpenAPI

````yaml post /discount-codes/bookings
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
  /discount-codes/bookings:
    post:
      tags:
        - Discount Codes
      description: >-
        Create a booking (reservas) discount code at organization or event
        level.  Booking codes validate at event level only: no rate association
        and no quantity/sales limits.
      requestBody:
        required: true
        description: Booking discount code to create.
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/BookingDiscountCodeCreate'
      responses:
        '201':
          description: HTTP Created
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    $ref: '#/components/schemas/DiscountCode'
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
                    $ref: '#/components/schemas/DiscountCode'
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
    BookingDiscountCodeCreate:
      properties:
        code:
          description: >-
            Discount code value. Trimmed and normalized to uppercase before
            saving (codes are case-insensitive). Must not contain "/". Maximum
            50 characters. Optional: when omitted, a unique code is
            auto-generated.
          example: SUMMER20
          type: string
        description:
          description: Discount code description.
          example: Summer promotion
          type: string
        active:
          description: Whether the discount code is active. Defaults to true.
          example: true
          type: boolean
        fixed_amount:
          description: Fixed discount amount. Defaults to 0.
          example: 0
          type: number
        percentage:
          description: >-
            Percentage discount between 0 and 100. Defaults to 0. Cannot be
            greater than 0 when fixed_amount is greater than 0.
          example: 20
          type: number
          minimum: 0
          maximum: 100
        min_amount:
          description: Minimum booking price required to apply the discount. Defaults to 0.
          example: 0
          type: number
        max_uses:
          description: >-
            Maximum number of times (transactions) the discount code can be
            used. Defaults to 0.
          example: 0
          type: integer
        event_id:
          description: >-
            Event identifier. When omitted, the discount code is created at
            organization level.
          example: el4gr63f00xkq01i1d8jh5ohuzaZhvoE
          type: string
        single_use:
          description: >-
            Convenience flag. When true, forces max_uses to 1 (single
            redemption). Defaults to false.
          example: false
          type: boolean
        expires_at:
          description: >-
            Expiration date in ISO 8601 format. Must be a valid future date.
            Optional; when omitted the discount code does not expire.
          example: '2026-12-31T23:59:59.000Z'
          format: date-time
          type: string
      type: object
    DiscountCode:
      properties:
        _id:
          description: Unique ID of the discount code.
          example: dc4gr63f00xkq01i1d8jh5ohuzaZhvoE
          type: string
        organization_id:
          description: Organization identifier.
          example: or4gr63f00xkq01i1d8jh5ohuzaZhvoE
          type: string
        event_id:
          description: Event identifier. Null for organization-level discount codes.
          example: el4gr63f00xkq01i1d8jh5ohuzaZhvoE
          type: string
          nullable: true
        code:
          description: Discount code value.
          example: SUMMER20
          type: string
        description:
          description: Discount code description.
          example: Summer promotion
          type: string
        type:
          description: Discount code type.
          example: tickets
          type: string
          enum:
            - tickets
            - bookings
        active:
          description: Whether the discount code is active.
          example: true
          type: boolean
        fixed_amount:
          description: Fixed discount amount.
          example: 0
          type: number
        percentage:
          description: >-
            Percentage discount between 0 and 100. Cannot be greater than 0 when
            fixed_amount is greater than 0.
          example: 20
          type: number
          minimum: 0
          maximum: 100
        min_amount:
          description: Minimum amount constraint.
          example: 0
          type: number
        min_quantity:
          description: Minimum quantity constraint.
          example: 0
          type: integer
        max_quantity:
          description: >-
            Maximum quantity constraint. Must be greater than or equal to
            min_quantity when both are provided.
          example: 0
          type: integer
        max_uses:
          description: >-
            Maximum number of times (transactions) the discount code can be
            used.
          example: 0
          type: integer
        max_products:
          description: >-
            Maximum number of products that can be discounted with this code
            across all purchases.
          example: 0
          type: integer
        expires_at:
          description: >-
            Expiration date in ISO 8601 format. Null when the discount code does
            not expire.
          example: '2026-12-31T23:59:59.000Z'
          format: date-time
          type: string
          nullable: true
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