> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get payment by id

> Get a payment by its identifier. (Only using Fourvenues payments gateway).



## OpenAPI

````yaml get /payments/{paymentId}
openapi: 3.0.0
info:
  title: Channel Manager API
  version: 0.2.0
  description: >-
    Official API documentation for Channel Manager. All endpoints are protected
    by an API key.
servers:
  - url: https://channels-service-alpha.fourvenues.com
    description: Test server
  - url: https://channels-service.fourvenues.com
    description: Production server
security: []
paths:
  /payments/{paymentId}:
    get:
      tags:
        - Payments
      summary: Get a payment by id
      description: Get a payment by id
      operationId: getPaymentById
      parameters:
        - name: paymentId
          in: path
          required: true
          description: The id of the payment to retrieve.
          schema:
            type: string
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    $ref: '#/components/schemas/Payment'
                  success:
                    type: boolean
        '400':
          description: Bad Request
        '401':
          description: Unauthorized
        '404':
          description: Not Found
      security:
        - ApiKey: []
components:
  schemas:
    Payment:
      type: object
      properties:
        _id:
          type: string
        status:
          type: string
        rate_id:
          type: string
        organization_id:
          type: string
        event_id:
          type: string
        resource_type:
          type: string
        resource_ids:
          type: array
          items:
            type: string
        total:
          type: object
          properties:
            amount:
              type: number
            fees:
              type: number
          required:
            - amount
            - fees
        metadata: {}
        send_resources:
          type: boolean
        currency:
          type: string
        sale_type:
          type: string
        paid_at:
          type: string
          description: ISO-8601 date-time
        expires_at:
          type: string
          description: ISO-8601 date-time
        gateway_account_id:
          type: string
        is_channel_manager:
          type: boolean
        total_discount:
          type: number
      required:
        - status
        - rate_id
        - organization_id
        - event_id
        - resource_type
        - resource_ids
        - total
        - currency
        - sale_type
        - paid_at
        - expires_at
        - gateway_account_id
        - is_channel_manager
        - total_discount
      description: >-
        The wire contract for a payment, AT THE LATEST VERSION.


        This is the single source of truth: `toPaymentResponse` is annotated to

        return it (so the code cannot drift from it without a compile error),
        and the

        OpenAPI spec + docs + breaking-change gate are all generated from it.


        Dates are ISO-8601 strings — the real wire form `res.json` produces from
        the

        underlying Moment values.


        Nested relations / free-form sub-objects are `unknown` for now; in the
        full

        rollout each gets its own versioned response contract (recursively), at
        which

        point they become typed `$ref`s here.
  securitySchemes:
    ApiKey:
      in: header
      name: X-Api-Key
      type: apiKey

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.