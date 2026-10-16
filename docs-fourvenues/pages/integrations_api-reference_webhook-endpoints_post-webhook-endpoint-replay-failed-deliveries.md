> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Post webhook endpoint replay failed deliveries

> Bulk-replays all failed deliveries of the endpoint. Requires the endpoint to be active.  <br><br>Recovery flow when deliveries start failing: the endpoint is auto-disabled by the webhook-service after  repeated delivery failures (`status: "disabled"`, with `disabled_at` and `disabled_reason`). To recover:  1. fetch the endpoint by id (or the list) to confirm `disabled_at` and `disabled_reason`;  2. fix the destination behind the endpoint URL;  3. call the enable operation to reactivate it;  4. call this operation to bulk-replay everything that failed while it was disabled — rejected with 409 while the  endpoint is still disabled;  5. verify by listing the webhook deliveries with `status=failed` (optionally narrowed by `endpoint_id`) that no  failed deliveries remain.



## OpenAPI

````yaml post /webhook-endpoints/{webhookEndpointId}/replay-failed-deliveries
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
  /webhook-endpoints/{webhookEndpointId}/replay-failed-deliveries:
    post:
      tags:
        - Webhook Endpoints
      description: >-
        Bulk-replays all failed deliveries of the endpoint. Requires the
        endpoint to be active.  <br><br>Recovery flow when deliveries start
        failing: the endpoint is auto-disabled by the webhook-service after 
        repeated delivery failures (`status: "disabled"`, with `disabled_at` and
        `disabled_reason`). To recover:  1. fetch the endpoint by id (or the
        list) to confirm `disabled_at` and `disabled_reason`;  2. fix the
        destination behind the endpoint URL;  3. call the enable operation to
        reactivate it;  4. call this operation to bulk-replay everything that
        failed while it was disabled — rejected with 409 while the  endpoint is
        still disabled;  5. verify by listing the webhook deliveries with
        `status=failed` (optionally narrowed by `endpoint_id`) that no  failed
        deliveries remain.
      parameters:
        - name: webhookEndpointId
          in: path
          required: true
          schema:
            type: string
          description: Webhook endpoint identifier.
          example: we_4gr63f00xkq01i1d8jh5ohuzaZhvoE
      responses:
        '202':
          description: HTTP Accepted
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    $ref: '#/components/schemas/ReplayFailedDeliveriesResult'
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
                    $ref: '#/components/schemas/ReplayFailedDeliveriesResult'
                xml:
                  name: main
        '401':
          description: HTTP Unauthorized
        '403':
          description: HTTP Forbidden
        '404':
          description: HTTP Not Found
        '409':
          description: >-
            Cannot replay deliveries on a disabled endpoint. Enable the endpoint
            first.
        '500':
          description: HTTP Internal Server Error
components:
  schemas:
    ReplayFailedDeliveriesResult:
      properties:
        replayed:
          description: Number of failed deliveries that were replayed.
          example: 4
          type: integer
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