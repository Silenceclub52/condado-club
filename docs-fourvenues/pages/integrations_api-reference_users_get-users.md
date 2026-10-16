> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get users

> Get all the users.



## OpenAPI

````yaml get /users/
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
  /users/:
    get:
      tags:
        - Users
      description: Get all the users.
      parameters:
        - name: id
          in: query
          description: User id to filter the request.
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
                    $ref: '#/components/schemas/Users'
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
                    $ref: '#/components/schemas/Users'
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
    Users:
      description: Array of Users
      items:
        $ref: '#/components/schemas/User'
      type: array
    User:
      properties:
        _id:
          description: Unique ID of the user.
          example: Pl4gr84v20xqu01js0ybj42s6vYtIz1T
          type: string
        external_id:
          description: >-
            Identifier of this user in the external channel, when an
            `external_channel_identifiers` row exists for the organization with
            `type` user and `internal_id` equal to this user’s `_id`. Omitted if
            none is configured.
          example: partner-user-8821
          type: string
        email:
          description: Email of the user.
          example: miguel@example.com
          type: string
        last_name:
          description: Last name of the user.
          example: Lopez
          type: string
        name:
          description: Name of the user.
          example: Miguel
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