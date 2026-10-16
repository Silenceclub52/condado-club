> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get v2 pass by id

> Get a pass by its identifier with usage information for every event assigned to its pass type.



## OpenAPI

````yaml get /v2/passes/by-id/{passId}
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
  /v2/passes/by-id/{passId}:
    get:
      tags:
        - Passes v2
      description: >-
        Get a pass by its identifier with usage information for every event
        assigned to its pass type.
      parameters:
        - name: passId
          in: path
          required: true
          schema:
            type: string
          description: Pass identifier.
          example: Pl4gr84v20xqu01js0ybj42s6vYtIz1T
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
                    $ref: '#/components/schemas/PassV2'
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
                    $ref: '#/components/schemas/PassV2'
                xml:
                  name: main
        '400':
          description: Bad request
        '401':
          description: HTTP Unauthorized
        '403':
          description: HTTP Forbidden
        '404':
          description: HTTP Not Found
components:
  schemas:
    PassV2:
      properties:
        _id:
          description: Unique ID of the pass.
          example: Pl4gr84v20xqu01js0ybj42s6vYtIz1T
          type: string
        organization_id:
          description: Organization identifier.
          example: or4gr63f00xkq01i1d8jh5ohuzaZhvoE
          type: string
        code:
          description: Access code (QR) of the pass.
          example: P6J21FF2S
          type: string
        customer_id:
          description: Customer identifier.
          example: cl4gr63f00xkq01i1d8jh5ohuzaZhvoE
          type: string
        customer_fullname:
          description: Customer full name.
          example: Miguel Perez
          type: string
        customer_email:
          description: Customer email.
          example: my-client-email@fourvenues.com
          type: string
        customer_phone:
          description: Customer phone.
          example: '+34600000000'
          type: string
        type_id:
          description: Pass type identifier.
          example: ty4gr63f00xkq01i1d8jh5ohuzaZhvoE
          type: string
        type_name:
          description: Pass type name.
          example: Premium 7 dias
          type: string
        purchase_date:
          description: Unix timestamp when the pass was purchased.
          example: 1712861139
          type: number
        purchase_price:
          description: Purchase price of the pass.
          example: 35
          type: number
        state:
          $ref: '#/components/schemas/PassStateV2'
        archived:
          description: Indicates whether the pass is archived.
          example: false
          type: boolean
        passes_usages:
          description: Usage information for every event assigned to the pass type.
          items:
            $ref: '#/components/schemas/PassUsageV2'
          type: array
      type: object
    PassStateV2:
      description: |-
        Pass state v2:<br><br>
              - activated: A valid pass. It can be checked in correctly.<br><br>
              - cancelled: A cancelled pass. It can't be checked in.<br><br>
              - pending_fillment: A pass pending customer completion. It can't be checked in.<br><br>
              - pending_payment: A pass pending payment. It can't be checked in.<br>
              
      example: activated
      items:
        enum:
          - activated
          - cancelled
          - pending_fillment
          - pending_payment
        type: string
      type: array
    PassUsageV2:
      properties:
        _id:
          description: Unique ID of the pass usage when a check-in record exists.
          example: pux4gr84v20xqu01js0ybj42s6vYtIz1T
          type: string
        organization_id:
          description: Organization identifier.
          example: or4gr63f00xkq01i1d8jh5ohuzaZhvoE
          type: string
        event_id:
          description: Event identifier where the pass has been checked in.
          example: el4gr63f00xkq01i1d8jh5ohuzaZhvoE
          type: string
        pass_id:
          description: Pass identifier.
          example: Pl4gr84v20xqu01js0ybj42s6vYtIz1T
          type: string
        usage_price:
          description: Purchase price associated to the pass usage.
          example: 35
          type: number
        usage_revenue:
          description: Revenue associated to the pass usage.
          example: 0
          type: number
        usage_time:
          description: Unix timestamp of the pass check-in.
          example: 1712861139
          type: number
        usage_beneficiaries:
          description: Number of beneficiaries used in the check-in.
          example: 1
          type: number
        usage_males:
          description: Number of male beneficiaries used in the check-in.
          example: 0
          type: number
        usage_females:
          description: Number of female beneficiaries used in the check-in.
          example: 1
          type: number
        usage_others:
          description: Number of other beneficiaries used in the check-in.
          example: 0
          type: number
        beneficiaries:
          description: Number of beneficiaries allowed for the pass usage.
          example: 1
          type: number
        checked_in:
          description: Indicates whether the pass has been checked in for that event.
          example: true
          type: boolean
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