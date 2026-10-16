> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Post webhook endpoints

> Creates a webhook subscription for the organization. `events` is deduplicated automatically.  `sign_secret` is shown only once — store it now, it cannot be retrieved later. There is no rotation: if you lose it,  create a new endpoint.  <br><br>Outbound webhook contract: every webhook is an HTTP POST to the endpoint URL with a minimal, stable JSON body  (`id`, `event`, `resource_type`, `resource_id`, `created_at` — see the `WebhookEventPayload` schema). It is a change  ping: fetch the resource details from this API using `resource_id`.  <br><br>Signature: each request carries `X-Webhook-Id` (the delivery id) and  `X-Webhook-Signature: t=<unix seconds>,v1=<hex>`, where `<hex>` is the HMAC-SHA256 of `"<t>.<raw body>"` keyed with  `sign_secret`. Recompute it over the raw body and compare with a constant-time equality check; reject stale  timestamps to prevent replays.  <br><br>Delivery semantics: any 2xx acknowledges the delivery (10 s timeout, redirects are not followed). Anything  else is retried with exponential backoff and jitter, up to 20 attempts over ~72 h. Delivery is at-least-once and  unordered: deduplicate by payload `id`.



## OpenAPI

````yaml post /webhook-endpoints/
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
  /webhook-endpoints/:
    post:
      tags:
        - Webhook Endpoints
      description: >-
        Creates a webhook subscription for the organization. `events` is
        deduplicated automatically.  `sign_secret` is shown only once — store it
        now, it cannot be retrieved later. There is no rotation: if you lose
        it,  create a new endpoint.  <br><br>Outbound webhook contract: every
        webhook is an HTTP POST to the endpoint URL with a minimal, stable JSON
        body  (`id`, `event`, `resource_type`, `resource_id`, `created_at` — see
        the `WebhookEventPayload` schema). It is a change  ping: fetch the
        resource details from this API using `resource_id`.  <br><br>Signature:
        each request carries `X-Webhook-Id` (the delivery id) and 
        `X-Webhook-Signature: t=<unix seconds>,v1=<hex>`, where `<hex>` is the
        HMAC-SHA256 of `"<t>.<raw body>"` keyed with  `sign_secret`. Recompute
        it over the raw body and compare with a constant-time equality check;
        reject stale  timestamps to prevent replays.  <br><br>Delivery
        semantics: any 2xx acknowledges the delivery (10 s timeout, redirects
        are not followed). Anything  else is retried with exponential backoff
        and jitter, up to 20 attempts over ~72 h. Delivery is at-least-once and 
        unordered: deduplicate by payload `id`.
      requestBody:
        required: true
        description: Webhook endpoint to create.
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/WebhookEndpointCreate'
      responses:
        '201':
          description: HTTP Created
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
                      id:
                        type: string
                        example: we_4gr63f00xkq01i1d8jh5ohuzaZhvoE
                      organization_id:
                        type: string
                        example: org_4gr63f00xkq01i1d8jh5ohuzaZhvoE
                      name:
                        type: string
                        example: Production endpoint
                      url:
                        type: string
                        example: https://example.com/webhooks/fourvenues
                      events:
                        type: array
                        example:
                          - ticket.sold
                          - booking.created
                        items:
                          type: string
                      status:
                        type: string
                        example: active
                      sign_secret:
                        type: string
                        example: whsec_9f1c2a7e4b6d4a0e8c3f2d1b5a6e7c8d
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
                      id:
                        type: string
                        example: we_4gr63f00xkq01i1d8jh5ohuzaZhvoE
                      organization_id:
                        type: string
                        example: org_4gr63f00xkq01i1d8jh5ohuzaZhvoE
                      name:
                        type: string
                        example: Production endpoint
                      url:
                        type: string
                        example: https://example.com/webhooks/fourvenues
                      events:
                        type: array
                        example:
                          - ticket.sold
                          - booking.created
                        items:
                          type: string
                      status:
                        type: string
                        example: active
                      sign_secret:
                        type: string
                        example: whsec_9f1c2a7e4b6d4a0e8c3f2d1b5a6e7c8d
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
    WebhookEndpointCreate:
      properties:
        name:
          description: Name of the webhook endpoint.
          example: Production endpoint
          type: string
        url:
          description: HTTPS destination URL of the webhook endpoint.
          example: https://example.com/webhooks/fourvenues
          type: string
        events:
          description: >-
            Event types to subscribe to. Deduplicated automatically. At least 1
            required.
          example:
            - ticket.sold
            - booking.created
          items:
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
          type: array
          minItems: 1
      required:
        - name
        - url
        - events
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