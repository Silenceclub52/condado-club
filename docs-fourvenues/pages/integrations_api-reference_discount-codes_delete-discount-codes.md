> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete discount codes

> Delete one or more discount codes by id (scoped to the organization).  Already-deleted or non-existing ids are ignored. The codes are also detached from any rate that references them.



## OpenAPI

````yaml delete /discount-codes/
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
  /discount-codes/:
    delete:
      tags:
        - Discount Codes
      description: >-
        Delete one or more discount codes by id (scoped to the organization). 
        Already-deleted or non-existing ids are ignored. The codes are also
        detached from any rate that references them.
      requestBody:
        required: true
        description: Discount code ids to delete.
        content:
          application/json:
            schema:
              type: object
              required:
                - discount_code_ids
              properties:
                discount_code_ids:
                  type: array
                  description: Discount code ids to delete. Between 1 and 100 items.
                  items:
                    type: string
                  minItems: 1
                  maxItems: 100
                  example:
                    - dc4gr63f00xkq01i1d8jh5ohuzaZhvoE
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
                      deleted_count:
                        type: number
                        example: 1
                      deleted_ids:
                        type: array
                        example:
                          - dc4gr63f00xkq01i1d8jh5ohuzaZhvoE
                        items:
                          type: string
                      not_found_ids:
                        type: array
                        example:
                          - dc4gr63f01xkq01i1d8jh5ohuzaZhvoF
                        items:
                          type: string
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
                      deleted_count:
                        type: number
                        example: 1
                      deleted_ids:
                        type: array
                        example:
                          - dc4gr63f00xkq01i1d8jh5ohuzaZhvoE
                        items:
                          type: string
                      not_found_ids:
                        type: array
                        example:
                          - dc4gr63f01xkq01i1d8jh5ohuzaZhvoF
                        items:
                          type: string
                xml:
                  name: main
        '400':
          description: Bad request
        '401':
          description: HTTP Unauthorized
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