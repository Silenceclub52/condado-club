> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get lists rates

> Get all the rates of lists given a event.



## OpenAPI

````yaml get /lists-rates/
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
  /lists-rates/:
    get:
      tags:
        - Lists
      description: Get all the rates of lists given a event.
      parameters:
        - name: event_id
          in: query
          description: Event identifier.
          example: el4gr63f00xkq01i1d8jh5ohuzaZhvoE
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
                    $ref: '#/components/schemas/ListsRates'
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
                    $ref: '#/components/schemas/ListsRates'
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
    ListsRates:
      description: Array of lists rates
      items:
        $ref: '#/components/schemas/ListRate'
      type: array
    ListRate:
      properties:
        _id:
          description: Unique ID of the list rate.
          example: plryuiyps0006msyw2pri1tem1LpJwSx
          type: string
        name:
          description: Name of the rate.
          example: General Access
          type: string
        options:
          items:
            $ref: '#/components/schemas/ListRateOption'
          type: array
        slug:
          description: Slug of the rate.
          example: general-access
          type: string
      type: object
    ListRateOption:
      properties:
        _id:
          description: Unique ID of the option rate.
          example: PrbxvjKCVsv9LjzOB4uWE5KfWGrpvxl3
          type: string
        additional_info:
          description: Additional info.
          example: Valid only for erasmus.
          type: string
        age:
          description: Min age of the option.
          example: 18
          minimum: 0
          type: number
        boys:
          description: Valid for boys.
          example: true
          type: boolean
        from:
          description: >-
            Relative seconds from start of the event (start) from the option is
            valid.
          example: 0
          minimum: 0
          type: number
        girls:
          description: Valid for girls.
          example: true
          type: boolean
        price:
          description: Price of the option.
          example: 10
          minimum: 0
          type: number
        until:
          description: >-
            Relative seconds from start of the event (start) until the option is
            valid.
          example: 27000
          minimum: 0
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