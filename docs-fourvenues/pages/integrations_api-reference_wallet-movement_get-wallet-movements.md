> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get wallet movements

> Get all the wallet movements in your organization.



## OpenAPI

````yaml get /wallet-movements/
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
  /wallet-movements/:
    get:
      tags:
        - Wallet Movement
      description: Get all the wallet movements in your organization.
      parameters:
        - name: order
          in: query
          description: Order of wallet movements.
          example: desc
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
                  - asc
                  - desc
                items:
                  type: string
        - name: limit
          in: query
          description: Limit of wallet movements.
          example: 10
          required: false
          schema:
            type: string
        - name: offset
          in: query
          description: Offset of wallet movements.
          example: 0
          required: false
          schema:
            type: string
        - name: category
          in: query
          description: Category of wallet movements.
          example: all
          required: false
          schema:
            type: string
        - name: subcategory
          in: query
          description: Subcategory of wallet movements.
          example: all
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
                    $ref: '#/components/schemas/WalletMovements'
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
                    $ref: '#/components/schemas/WalletMovements'
                xml:
                  name: main
        '400':
          description: Bad request
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: false
                  message:
                    type: string
                    example: 'Invalid category: ${invalidCategory}'
                xml:
                  name: main
            application/xml:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: false
                  message:
                    type: string
                    example: 'Invalid category: ${invalidCategory}'
                xml:
                  name: main
components:
  schemas:
    WalletMovements:
      description: Array of Wallet Movements
      items:
        $ref: '#/components/schemas/WalletMovement'
      type: array
    WalletMovement:
      properties:
        _id:
          description: Unique ID of the movement.
          example: aJ0vphh0acfytM4yWdAAXZcNPwDRDFpq
          type: string
        value_date:
          description: Value date of the movement.
          example: '2025-01-07'
          format: date
          type: string
        operation_date:
          description: Operation date of the movement.
          example: '2025-01-06'
          format: date
          type: string
        previous_amount:
          description: Previous amount of the wallet.
          example: 100
          type: number
        operation_amount:
          description: Operation amount of the wallet.
          example: 10
          type: number
        final_amount:
          description: Final amount of the wallet.
          example: 90
          type: number
        category:
          description: Category of the movement.
          example: payment-gateway
          type: string
          enum:
            - plans
            - subscriptions
            - payment-gateway
            - sales-services
            - marketing
            - withdrawal
            - returns
            - transfer
            - income
            - other-services
        subcategory:
          description: Subcategory of the movement.
          example: tickets
          type: string
          enum:
            - plans
            - tpv
            - consulting
            - payment-gateway
            - management-expenses
            - name-changes
            - returns
            - tickets
            - reservations
            - emails
            - smss
            - whatsapp
            - transfer
            - direct-debit
            - card
            - warranty
            - commissions
            - others
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