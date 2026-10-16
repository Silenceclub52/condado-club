> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get passes rates

> Get all the rates of passes given a event.



## OpenAPI

````yaml get /passes-rates/
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
  /passes-rates/:
    get:
      tags:
        - Passes
      description: Get all the rates of passes given a event.
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
                    $ref: '#/components/schemas/PassesRates'
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
                    $ref: '#/components/schemas/PassesRates'
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
    PassesRates:
      description: Array of passes rates
      items:
        $ref: '#/components/schemas/PassRate'
      type: array
    PassRate:
      properties:
        _id:
          description: Unique ID of the pass rate.
          example: plryuiyps0006msyw2pri1tem1LpJwSx
          type: string
        organizaiton_id:
          description: Unique identifier of the organization.
          example: ajifs2hke000dwemmurwd3kuqN3Kopcx
          type: string
        event_id:
          description: Event identifier.
          example: Mjo4f9o9h01fdjvmmrgn9aoh4s5IBHzX
          type: string
        slug:
          description: Slug of the rate.
          example: general-access
          type: string
        name:
          description: Name of the rate.
          example: General Access
          type: string
        options:
          items:
            $ref: '#/components/schemas/PassRateOption'
          type: array
        beneficiaries:
          description: Number of beneficiaries.
          example: 1
          type: number
        updated_at:
          description: Date of the last update in ISO 8601 format.
          example: '2022-09-15T23:00:00.000Z'
          type: string
        created_at:
          description: Date of creation in ISO 8601 format.
          example: '2022-09-15T23:00:00.000Z'
          type: string
      type: object
    PassRateOption:
      properties:
        _id:
          description: Unique ID of the option rate.
          example: PrbxvjKCVsv9LjzOB4uWE5KfWGrpvxl3
          type: string
        additional_info:
          description: Additional info.
          example: Valid only for erasmus.
          type: string
        price:
          description: Price of the option.
          example: 10
          minimum: 0
          type: number
        content:
          description: Content of the option.
          example: ''
          type: string
        from:
          description: >-
            Relative seconds from start of the event (start) from the option is
            valid.
          example: 0
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