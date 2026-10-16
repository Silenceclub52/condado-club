> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get webhook delivery by id

> Gets a single delivery owned by the organization, with its attempts and the exact  payload that was signed and sent (see the `WebhookEventPayload` schema).



## OpenAPI

````yaml get /webhook-deliveries/{webhookDeliveryId}
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
  /webhook-deliveries/{webhookDeliveryId}:
    get:
      tags:
        - Webhook Deliveries
      description: >-
        Gets a single delivery owned by the organization, with its attempts and
        the exact  payload that was signed and sent (see the
        `WebhookEventPayload` schema).
      parameters:
        - name: webhookDeliveryId
          in: path
          required: true
          schema:
            type: string
          description: Webhook delivery identifier.
          example: wd_4gr63f00xkq01i1d8jh5ohuzaZhvoE
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
                    $ref: '#/components/schemas/WebhookDelivery'
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
                    $ref: '#/components/schemas/WebhookDelivery'
                xml:
                  name: main
        '401':
          description: HTTP Unauthorized
        '403':
          description: HTTP Forbidden
        '404':
          description: HTTP Not Found
        '500':
          description: HTTP Internal Server Error
components:
  schemas:
    WebhookDelivery:
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
        next_retry_at:
          description: Timestamp of the next scheduled retry, if any.
          example: '2026-08-12T10:20:30.000Z'
          type: string
        attempts:
          description: All attempts made for this delivery. Empty array if none yet.
          items:
            $ref: '#/components/schemas/WebhookDeliveryAttempt'
          type: array
        payload:
          description: >-
            Exact external body that was signed and sent (see the
            `WebhookEventPayload` schema). Absent if the originating event no
            longer exists.
          example:
            id: ev4gr63f00xkq01i1d8jh5ohuzaZhvoE
            event: ticket.sold
            resource_type: ticket
            resource_id: ti4gr63f00xkq01i1d8jh5ohuzaZhvoE
            created_at: '2026-08-12T10:15:30.000Z'
          type: object
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