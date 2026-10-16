> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Patch v2 pass check in by code

> Check in a pass by its code if it belongs to the event and the current time is within the event range.



## OpenAPI

````yaml patch /v2/passes/check-in/by-code/{passCode}
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
  /v2/passes/check-in/by-code/{passCode}:
    patch:
      tags:
        - Passes v2
      description: >-
        Check in a pass by its code if it belongs to the event and the current
        time is within the event range.
      parameters:
        - name: passCode
          in: path
          required: true
          schema:
            type: string
          description: Pass code.
          example: P6J21FF2S
        - name: event_id
          in: query
          description: Event identifier.
          example: el4gr63f00xkq01i1d8jh5ohuzaZhvoE
          required: true
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
                    type: object
                    properties:
                      checked_in:
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
                  data:
                    type: object
                    properties:
                      checked_in:
                        type: boolean
                        example: true
                xml:
                  name: main
        '400':
          description: >-
            Bad request. Possible errors: outside-event-date,
            pass-usage-limit-reached.
        '401':
          description: HTTP Unauthorized
        '403':
          description: 'HTTP Forbidden. Example: pass-does-not-belong-to-organization.'
        '404':
          description: HTTP Not Found
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