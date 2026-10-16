> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Put list checkin

> Checkin a list by its identifier.



## OpenAPI

````yaml put /lists/{listId}/checkin
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
  /lists/{listId}/checkin:
    put:
      tags:
        - Lists
      description: Checkin a list by its identifier.
      parameters:
        - name: listId
          in: path
          required: true
          schema:
            type: string
          description: List identifier.
          example: el4gr63f00xkq01i1d8jh5ohuzaZhvoE
      requestBody:
        required: true
        description: Body of the request
        content:
          application/json:
            schema:
              type: array
              items:
                $ref: '#/components/schemas/ListAccessOption'
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
                    $ref: '#/components/schemas/List'
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
                    $ref: '#/components/schemas/List'
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
    ListAccessOption:
      description: List Access Option
      type: object
      properties:
        _id:
          description: Unique ID of the option (set to <special> if is a custom price).
          example: '1712861139741'
          type: string
        women:
          description: Number of women in the list option.
          example: 1
          type: number
        men:
          description: Number of men in the list option.
          example: 1
          type: number
        no_gender:
          description: Number of no gender in the list option.
          example: 0
          type: number
        price:
          description: Price of the option (if is a custom price).
          example: 10
          type: number
    List:
      properties:
        _id:
          description: Unique ID of the list.
          example: Pl4gr84v20xqu01js0ybj42s6vYtIz1T
          type: string
        channel_id:
          description: >-
            Unique identifier of the channel. (It can be the same or other
            organization).
          example: ajifs2hke000dwemmurwd3kuqN3Kopcx
          type: string
        code:
          description: Access code (QR) of the list.
          example: P6J21FF2S
          type: string
        enter:
          default: 0
          description: Number of people entered.
          example: 4
          type: integer
        event_id:
          description: Event identifier.
          example: Mjo4f9o9h01fdjvmmrgn9aoh4s5IBHzX
          type: string
        for:
          description: Number of people enlisted.
          example: 7
          type: integer
        name:
          description: Name of the guest.
          example: Miguel Román
          type: string
        observations_reception:
          description: Notes that will be shown to hostess.
          example: Birthday
          type: string
        rate_id:
          description: Rate identifier.
          example: Tl4gr63fr0xkr01i1gk354qbrSCMLTwl
          type: string
        rate_name:
          description: Rate name.
          example: General Access
          type: string
        rate_slug:
          description: Rate slug.
          example: general-access
          type: string
        referral_id:
          description: PPRR identifier.
          example: ñeifupjvx000rwe2m2zuba1z9FqyR2dSL
          type: string
        referral:
          type: object
          properties:
            _id:
              description: Unique ID of the referral.
              example: eifupjvx000rwe2m2zuba1z9FqyR2dSL
              type: string
            name:
              description: Name of the referral.
              example: John Appleseed
              type: string
        options:
          items:
            $ref: '#/components/schemas/ListOption'
          type: array
        tags:
          description: Tags of the list.
          example:
            - birthday
            - free-access
          items:
            type: string
          type: array
        removed_at:
          description: Timestamp when the list was removed.
          example: 0
          type: integer
      type: object
    ListOption:
      type: object
      properties:
        _id:
          description: Unique ID of the option.
          example: '1712861139741'
          type: string
        women:
          description: Number of women in the list option.
          example: 1
          type: number
        men:
          description: Number of men in the list option.
          example: 1
          type: number
        no_gender:
          description: Number of no gender in the list option.
          example: 0
          type: number
        price:
          description: Price of the option.
          example: 10
          type: number
        total:
          description: Total of people in the list option.
          example: 2
          type: number
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