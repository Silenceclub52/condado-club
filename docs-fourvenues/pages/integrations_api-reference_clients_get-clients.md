> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get clients

> Get all the clients



## OpenAPI

````yaml get /clients/
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
  /clients/:
    get:
      tags:
        - Clients
      description: Get all the clients
      parameters:
        - name: start_date
          in: query
          description: Start date
          example: '2024-01-01T00:00:00.000Z'
          schema:
            type: string
        - name: end_date
          in: query
          description: End date
          example: '2024-12-31T23:59:59.999Z'
          schema:
            type: string
        - name: skip
          in: query
          description: Number of clients to skip
          example: '0'
          schema:
            type: string
        - name: limit
          in: query
          description: Number of clients to return
          example: '100'
          schema:
            type: string
        - name: resource_type
          in: query
          description: >-
            Filter the clients that have purchased that resource type. The
            clients are then listed in client id order and, combined with
            start_date/end_date, a page can hold fewer than limit clients: keep
            paging until an empty page.
          example: bookings
          schema:
            type: string
        - name: email
          in: query
          description: >-
            Filter clients by exact email match within the authenticated
            organization.
          example: client@example.com
          schema:
            type: string
        - name: phone
          in: query
          description: >-
            Exact match. Country code + digits only, no separators. URL-encode
            the + as %2B (e.g. %2B34600000000).
          example: '%2B34600000000'
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
                    $ref: '#/components/schemas/Clients'
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
                    $ref: '#/components/schemas/Clients'
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
    Clients:
      description: Array of Client
      items:
        $ref: '#/components/schemas/Client'
      type: array
    Client:
      properties:
        _id:
          description: Unique ID of the client.
          example: ilnnakdkz000338nzbi7x1xho3WQwKHg
          type: string
        user_id:
          description: User ID associated with the client.
          example: plnlp1s0t005301am9ehq3y8iSllAXqD
          type: string
        email:
          description: Email of the client.
          example: jose.garcia@gmail.com
          type: string
        name:
          description: Name of the client.
          example: Jose Garcia
          type: string
        name_normalized:
          description: Normalized name of the client for searching.
          example: jose garcia
          type: string
        gender:
          description: 'Gender of the client (0: female, 1: male, 2: other).'
          example: '0'
          enum:
            - '0'
            - '1'
            - '2'
            - ''
          type: string
        personal_document_number:
          description: Personal identification document number.
          example: 45555555E
          type: string
        personal_document_type:
          description: Type of personal identification document.
          example: dni
          type: string
        address:
          description: Address of the client.
          example: cscdscdscds
          type: string
        birth_date:
          description: Birth date timestamp of the client.
          example: 0
          type: number
        phone:
          description: Phone number of the client.
          example: '+34655555555'
          type: string
        postal_code:
          description: Postal code of the client.
          example: ''
          type: string
        city:
          description: City of the client.
          example: ''
          type: string
        language:
          description: Preferred language of the client.
          example: es
          type: string
        total_bookings:
          description: Total number of bookings made by the client.
          example: 0
          type: number
        total_tickets:
          description: Total number of tickets bought by the client.
          example: 0
          type: number
        created_at:
          type: string
          format: date-time
          description: Creation date
          example: '2024-12-14T18:10:51.052Z'
        updated_at:
          type: string
          format: date-time
          description: Last update date
          example: '2025-04-16T11:02:05.147Z'
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