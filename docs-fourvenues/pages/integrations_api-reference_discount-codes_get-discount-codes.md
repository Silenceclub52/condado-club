> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get discount codes

> Get discount codes for the organization.  Without event_id returns organization-level codes.  With event_id returns codes scoped to that event.



## OpenAPI

````yaml get /discount-codes/
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
  /discount-codes/:
    get:
      tags:
        - Discount Codes
      description: >-
        Get discount codes for the organization.  Without event_id returns
        organization-level codes.  With event_id returns codes scoped to that
        event.
      parameters:
        - name: event_id
          in: query
          description: >-
            Event identifier. When provided, only discount codes for that event
            are returned.
          example: el4gr63f00xkq01i1d8jh5ohuzaZhvoE
          required: false
          schema:
            type: string
        - name: type
          in: query
          description: Discount code type.
          example: tickets
          required: false
          schema:
            type: object
            properties:
              type:
                type: string
                example: string
              enum:
                type: array
                example:
                  - tickets
                  - bookings
                items:
                  type: string
        - name: limit
          in: query
          description: >-
            Maximum number of discount codes to return. Defaults to 100, maximum
            500.
          example: 100
          required: false
          schema:
            type: string
        - name: skip
          in: query
          description: Number of discount codes to skip for pagination. Defaults to 0.
          example: 0
          required: false
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
                    $ref: '#/components/schemas/DiscountCodes'
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
                    $ref: '#/components/schemas/DiscountCodes'
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
    DiscountCodes:
      description: Array of Discount Code
      items:
        $ref: '#/components/schemas/DiscountCode'
      type: array
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