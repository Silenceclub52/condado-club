> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Put bookings update fields

> Update booking information



## OpenAPI

````yaml put /bookings/{bookingId}/update-fields
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
  /bookings/{bookingId}/update-fields:
    put:
      tags:
        - Bookings
      description: Update booking information
      parameters:
        - name: bookingId
          in: path
          required: true
          schema:
            type: string
          description: Id of the booking
          example: El805n9kh0000g3yw94010m5bNvk6za4
      requestBody:
        required: true
        description: Body of the request
        content:
          application/json:
            schema:
              type: object
              properties:
                name:
                  type: string
                  example: John Doe Updated
                email:
                  type: string
                  example: john.updated@example.com
                phone:
                  type: string
                  example: '+34666123456'
                for:
                  type: integer
                  example: 6
                status:
                  type: string
                  example: confirmed
                price:
                  type: number
                  example: 2000
                pos_ticket_total:
                  type: number
                  example: 25
                pos_total_service_charge:
                  type: number
                  example: 0
                pos_total_tips:
                  type: number
                  example: 0
                commentary_reserve:
                  type: string
                  example: Cumpleaños
                commentary_client:
                  type: string
                  example: ''
                deposit_paid:
                  type: number
                  example: 30
                walkin:
                  type: boolean
                  example: false
                duration:
                  type: number
                  example: 0
                enter:
                  type: integer
                  example: 6
                date:
                  type: string
                  format: date-time
                  example: '2025-08-14T22:00:00.000Z'
                pos_products:
                  type: array
                  items:
                    type: object
                    properties:
                      _id:
                        type: string
                      name:
                        type: string
                      amount:
                        type: number
                      unit_price:
                        type: number
                      total_price:
                        type: number
                pos_payments:
                  type: array
                  items:
                    type: object
                    properties:
                      type:
                        type: string
                      amount:
                        type: number
      responses:
        '200':
          description: HTTP OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  type:
                    type: string
                    example: object
                  properties:
                    type: object
                    properties:
                      success:
                        type: object
                        properties:
                          type:
                            type: string
                            example: boolean
                      data:
                        type: object
                        properties:
                          type:
                            type: string
                            example: object
                          properties:
                            type: object
                            properties:
                              updated:
                                type: object
                                properties:
                                  type:
                                    type: string
                                    example: boolean
                              changes_count:
                                type: object
                                properties:
                                  type:
                                    type: string
                                    example: integer
                              state_changed:
                                type: object
                                properties:
                                  type:
                                    type: string
                                    example: boolean
                              changes:
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
                xml:
                  name: main
            application/xml:
              schema:
                type: object
                properties:
                  type:
                    type: string
                    example: object
                  properties:
                    type: object
                    properties:
                      success:
                        type: object
                        properties:
                          type:
                            type: string
                            example: boolean
                      data:
                        type: object
                        properties:
                          type:
                            type: string
                            example: object
                          properties:
                            type: object
                            properties:
                              updated:
                                type: object
                                properties:
                                  type:
                                    type: string
                                    example: boolean
                              changes_count:
                                type: object
                                properties:
                                  type:
                                    type: string
                                    example: integer
                              state_changed:
                                type: object
                                properties:
                                  type:
                                    type: string
                                    example: boolean
                              changes:
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
                xml:
                  name: main
        '400':
          description: Bad request
        '401':
          description: HTTP Unauthorized
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