> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Post discount codes import

> Import organization-level discount codes into an event.  All codes must belong to the organization and have a parent reference.  Already imported codes are skipped. Duplicate IDs in the request are ignored.  Fails when a code with the same value already exists in the target event.



## OpenAPI

````yaml post /discount-codes/import
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
  /discount-codes/import:
    post:
      tags:
        - Discount Codes
      description: >-
        Import organization-level discount codes into an event.  All codes must
        belong to the organization and have a parent reference.  Already
        imported codes are skipped. Duplicate IDs in the request are ignored. 
        Fails when a code with the same value already exists in the target
        event.
      requestBody:
        required: true
        description: Discount codes to import and target event.
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/DiscountCodeImportRequest'
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
                    $ref: '#/components/schemas/DiscountCodeImportResult'
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
                    $ref: '#/components/schemas/DiscountCodeImportResult'
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
    DiscountCodeImportRequest:
      properties:
        discount_code_ids:
          description: >-
            Organization-level discount code identifiers to import. Between 1
            and 100 items.
          example:
            - dc4gr63f00xkq01i1d8jh5ohuzaZhvoE
            - dc4gr63f01xkq01i1d8jh5ohuzaZhvoF
          items:
            type: string
          type: array
          minItems: 1
          maxItems: 100
        event_id:
          description: Target event identifier.
          example: el4gr63f00xkq01i1d8jh5ohuzaZhvoE
          type: string
      required:
        - discount_code_ids
        - event_id
      type: object
    DiscountCodeImportResult:
      properties:
        inserted_count:
          description: Number of discount codes imported into the event.
          example: 2
          type: integer
        inserted_ids:
          description: Identifiers of the discount codes created in the event.
          example:
            - dc4gr63f02xkq01i1d8jh5ohuzaZhvoG
            - dc4gr63f03xkq01i1d8jh5ohuzaZhvoH
          items:
            type: string
          type: array
        skipped_ids:
          description: >-
            Requested organization-level ids whose code was already imported
            into the event.
          example:
            - dc4gr63f00xkq01i1d8jh5ohuzaZhvoE
          items:
            type: string
          type: array
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