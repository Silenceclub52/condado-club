> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get webhook deliveries

> Lists delivery attempts of the organization, optionally filtered by endpoint and/or status.



## OpenAPI

````yaml get /webhook-deliveries/
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
  /webhook-deliveries/:
    get:
      tags:
        - Webhook Deliveries
      description: >-
        Lists delivery attempts of the organization, optionally filtered by
        endpoint and/or status.
      parameters:
        - name: endpoint_id
          in: query
          description: Webhook endpoint identifier to filter by.
          example: we_4gr63f00xkq01i1d8jh5ohuzaZhvoE
          required: false
          schema:
            type: string
        - name: status
          in: query
          description: Delivery status to filter by.
          example: failed
          required: false
          schema:
            type: object
            properties:
              type:
                type: string
                example: string
              enum:
                type: array
                example:
                  - pending
                  - retrying
                  - success
                  - failed
                items:
                  type: string
        - name: limit
          in: query
          description: Maximum number of deliveries to return. Defaults to 50, maximum 200.
          example: 50
          required: false
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
                    $ref: '#/components/schemas/WebhookDeliveries'
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
                    $ref: '#/components/schemas/WebhookDeliveries'
                xml:
                  name: main
        '400':
          description: Bad request
        '401':
          description: HTTP Unauthorized
        '403':
          description: HTTP Forbidden
        '500':
          description: HTTP Internal Server Error
components:
  schemas:
    WebhookDeliveries:
      description: Array of Webhook Delivery list items
      items:
        $ref: '#/components/schemas/WebhookDeliveryListItem'
      type: array
    WebhookDeliveryListItem:
      properties:
        id:
          description: Unique ID of the delivery.
          example: wd_4gr63f00xkq01i1d8jh5ohuzaZhvoE
          type: string
        event_id:
          description: Identifier of the domain event that originated the delivery.
          example: ev4gr63f00xkq01i1d8jh5ohuzaZhvoE
          type: string
        endpoint_id:
          description: Identifier of the webhook endpoint the delivery belongs to.
          example: we_4gr63f00xkq01i1d8jh5ohuzaZhvoE
          type: string
        event:
          description: Event type of the delivery.
          example: ticket.sold
          type: string
          enum:
            - ticket.sold
            - ticket.refunded
            - ticket.cancelled
            - ticket.created
            - payment.completed
            - booking.created
            - booking.changed
            - booking.cancelled
            - booking.payment_received
        status:
          description: Current status of the delivery.
          example: failed
          type: string
          enum:
            - pending
            - retrying
            - success
            - failed
        attempts_count:
          description: Number of attempts made so far.
          example: 3
          type: integer
        next_retry_at:
          description: Timestamp of the next scheduled retry, if any.
          example: '2026-08-12T10:20:30.000Z'
          type: string
        last_attempt:
          $ref: '#/components/schemas/WebhookDeliveryAttempt'
      type: object
    WebhookDeliveryAttempt:
      properties:
        number:
          description: Attempt sequence number.
          example: 1
          type: integer
        requested_at:
          description: Timestamp when the attempt was requested.
          example: '2026-08-12T10:15:30.000Z'
          type: string
        duration_ms:
          description: Duration of the attempt in milliseconds.
          example: 320
          type: integer
        status_code:
          description: HTTP status code received from the destination, if any.
          example: 500
          type: integer
        error_message:
          description: Error message of the attempt, if any.
          example: connect ETIMEDOUT
          type: string
        response_body:
          description: >-
            Raw response body received from the destination. Only present in the
            delivery detail.
          example: '{"error":"internal error"}'
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