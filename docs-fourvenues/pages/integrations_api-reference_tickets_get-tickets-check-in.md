> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get tickets check in

> Check if a ticket is allowed to be checked in. Its checked against the current event.



## OpenAPI

````yaml get /tickets/check-in/{ticketCode}
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
  /tickets/check-in/{ticketCode}:
    get:
      tags:
        - Tickets
      description: >-
        Check if a ticket is allowed to be checked in. Its checked against the
        current event.
      parameters:
        - name: ticketCode
          in: path
          required: true
          schema:
            type: string
          description: Code of the ticket
          example: ABCDE12345
      responses:
        '200':
          description: HTTP OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    $ref: '#/components/schemas/TicketCheckCheckIn'
                xml:
                  name: main
            application/xml:
              schema:
                type: object
                properties:
                  data:
                    $ref: '#/components/schemas/TicketCheckCheckIn'
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
    TicketCheckCheckIn:
      description: Ticket check Check-in
      properties:
        success:
          description: True if the ticket can be checked in.
          example: true
          type: boolean
        ticket_id:
          description: Id of the ticket
          example: el7yuiyep0006msyw2pri1tem1LpJwSc
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