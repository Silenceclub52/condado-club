> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get external payments

> Get all the external payments given an event or a date range.



## OpenAPI

````yaml get /external-payments/
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
  /external-payments/:
    get:
      tags:
        - External Payments
      description: Get all the external payments given an event or a date range.
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
        - name: resource_type
          in: query
          description: Resource type. (bookings)
          example: bookings
          schema:
            type: string
        - name: resource_id
          in: query
          description: Filters the external payments matching that resource_id.
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
                    $ref: '#/components/schemas/ExternalPayments'
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
                    $ref: '#/components/schemas/ExternalPayments'
                xml:
                  name: main
components:
  schemas:
    ExternalPayments:
      description: Array of External Payments
      type: array
      items:
        $ref: '#/components/schemas/ExternalPayment'
    ExternalPayment:
      properties:
        _id:
          description: Unique ID of the external payment.
          example: ep4gr63f00xkq01i1d8jh5ohuzaZhvoE
          type: string
        organization_id:
          description: Organization identifier.
          example: or4gr63f00xkq01i1d8jh5ohuzaZhvoE
          type: string
        organization_slug:
          description: Organization slug.
          example: my-organization
          type: string
        event_id:
          description: Event identifier.
          example: ev4gr63f00xkq01i1d8jh5ohuzaZhvoE
          type: string
        event_slug:
          description: Event slug.
          example: my-event
          type: string
        event_date:
          description: Event date.
          example: '2021-01-01'
          type: string
          format: date
        day:
          description: Day of the payment.
          example: 1
          type: number
        month:
          description: Month of the payment.
          example: 1
          type: number
        year:
          description: Year of the payment.
          example: 2021
          type: number
        at:
          description: Payment timestamp.
          example: '2021-01-01T00:00:00.000Z'
          type: string
          format: date-time
        resource_type:
          description: Type of resource.
          example: tickets
          type: string
          enum:
            - tickets
            - bookings
            - reservations
            - plans
            - name_changes
            - passes
            - lists
        resources_ids:
          description: Array of resource IDs.
          example:
            - rs4gr63f00xkq01i1d8jh5ohuzaZhvoE
          type: array
          items:
            type: string
        amount:
          description: Payment amount.
          example: 100
          type: number
        currency:
          description: Payment currency.
          example: EUR
          type: string
        description:
          description: Payment description.
          example: Payment for tickets
          type: string
        method:
          description: Payment method.
          example: card
          type: string
        client_id:
          description: Client identifier.
          example: cl4gr63f00xkq01i1d8jh5ohuzaZhvoE
          type: string
        created_by:
          description: User who created the payment.
          example: us4gr63f00xkq01i1d8jh5ohuzaZhvoE
          type: string
        created_at:
          description: Payment creation date.
          example: '2021-01-01T00:00:00.000Z'
          type: string
          format: date-time
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