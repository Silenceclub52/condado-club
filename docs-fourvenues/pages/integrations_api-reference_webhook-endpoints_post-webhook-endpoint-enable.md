> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Post webhook endpoint enable

> Reactivates a disabled webhook endpoint. Idempotent if it is already active.



## OpenAPI

````yaml post /webhook-endpoints/{webhookEndpointId}/enable
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
  /webhook-endpoints/{webhookEndpointId}/enable:
    post:
      tags:
        - Webhook Endpoints
      description: >-
        Reactivates a disabled webhook endpoint. Idempotent if it is already
        active.
      parameters:
        - name: webhookEndpointId
          in: path
          required: true
          schema:
            type: string
          description: Webhook endpoint identifier.
          example: we_4gr63f00xkq01i1d8jh5ohuzaZhvoE
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
                    type: object
                    properties:
                      id:
                        type: string
                        example: we_4gr63f00xkq01i1d8jh5ohuzaZhvoE
                      status:
                        type: string
                        example: active
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
                    type: object
                    properties:
                      id:
                        type: string
                        example: we_4gr63f00xkq01i1d8jh5ohuzaZhvoE
                      status:
                        type: string
                        example: active
                xml:
                  name: main
        '401':
          description: HTTP Unauthorized
        '403':
          description: HTTP Forbidden
        '404':
          description: HTTP Not Found
        '500':
          description: HTTP Internal Server Error
components:
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