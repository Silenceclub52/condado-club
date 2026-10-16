> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get clients marketing preferences

> Get marketing preferences for a list of clients by their emails



## OpenAPI

````yaml get /clients/marketing-preferences
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
  /clients/marketing-preferences:
    get:
      tags:
        - Clients
      description: Get marketing preferences for a list of clients by their emails
      parameters:
        - name: emails
          in: query
          description: Array of client emails
          required: true
          schema:
            type: object
            properties:
              type:
                type: string
                example: array
              items:
                type: object
                properties:
                  type:
                    type: string
                    example: string
                  format:
                    type: string
                    example: email
          example:
            - client1@example.com
            - client2@example.com
      responses:
        '200':
          description: Marketing preferences retrieved successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    type: array
                    items:
                      type: object
                      properties:
                        email:
                          type: string
                          example: client2@example.com
                        remarketing:
                          type: boolean
                          example: false
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
                    type: array
                    items:
                      type: object
                      properties:
                        email:
                          type: string
                          example: client2@example.com
                        remarketing:
                          type: boolean
                          example: false
                xml:
                  name: main
        '400':
          description: Bad request - Invalid email format
        '401':
          description: Unauthorized - Missing or invalid credentials
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