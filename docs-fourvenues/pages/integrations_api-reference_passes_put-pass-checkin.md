> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Put pass checkin

> Activate a pass.



## OpenAPI

````yaml put /passes/{passId}/checkin
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
  /passes/{passId}/checkin:
    put:
      tags:
        - Passes
      description: Activate a pass.
      parameters:
        - name: passId
          in: path
          required: true
          schema:
            type: string
          description: Pass identifier.
          example: el4gr63f00xkq01i1d8jh5ohuzaZhvoE
        - name: event_id
          in: query
          description: Event identifier.
          example: el4gr63f00xkq01i1d8jh5ohuzaZhvoE
          required: true
          schema:
            type: string
      requestBody:
        required: true
        description: Body of the request
        content:
          application/json:
            schema:
              type: array
              items:
                $ref: '#/components/schemas/PassAccessOption'
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
                    $ref: '#/components/schemas/Pass'
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
                    $ref: '#/components/schemas/Pass'
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
    PassAccessOption:
      description: Pass Access Option
      type: object
      properties:
        _id:
          description: Unique ID of the option (set to <special> if is a custom price).
          example: '1712861139741'
          type: string
        women:
          description: Number of women in the pass option.
          example: 1
          type: number
        men:
          description: Number of men in the pass option.
          example: 1
          type: number
        no_gender:
          description: Number of no gender in the pass option.
          example: 0
          type: number
        price:
          description: Price of the option (if is a custom price).
          example: 10
          type: number
    Pass:
      properties:
        _id:
          description: Unique ID of the pass.
          example: Pl4gr84v20xqu01js0ybj42s6vYtIz1T
          type: string
        channel_id:
          description: >-
            Unique identifier of the channel. (It can be the same or other
            organization).
          example: ajifs2hke000dwemmurwd3kuqN3Kopcx
          type: string
        code:
          description: Access code (QR) of the pass.
          example: P6J21FF2S
          type: string
        email:
          description: Email of the client.
          example: my-client-email@fourvenues.com
          type: string
        enter:
          description: Number of people entered.
          example: 4
          type: integer
        for:
          description: Number of people enlisted.
          example: 7
          type: integer
        name:
          description: Name of the client.
          example: Miguel
          type: string
        raised:
          description: Total amount raised.
          example: 0
          type: number
        rate_name:
          description: Rate name.
          example: Pase Vip
          type: string
        rate_slug:
          description: Rate slug.
          example: pase-vip
          type: string
        referral_id:
          description: PPRR identifier.
          example: ñeifupjvx000rwe2m2zuba1z9FqyR2dSL
          type: string
        status:
          $ref: '#/components/schemas/PassStatus'
      type: object
    PassStatus:
      description: |-
        Pass status:<br><br>
              - Valid: A valid pass. It can be checked in correctly.<br><br>
              - Pending: A pass pending to be accepted by the organizer. It can't be checked in.<br><br>
              - Rejected: A rejected pass by the organizer. It can't be checked in.<br>
              
      example: valid
      items:
        enum:
          - valid
          - pending
          - rejected
        type: string
      type: array
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