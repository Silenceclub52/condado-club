> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get ticket by id

> Get ticket by id.



## OpenAPI

````yaml get /tickets/{ticketId}
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
  /tickets/{ticketId}:
    get:
      tags:
        - Tickets
      summary: Get ticket by id
      description: Get tickets given certains query parameters
      operationId: getTicketById
      parameters:
        - name: ticketId
          in: path
          required: true
          description: Ticket id
          schema:
            type: string
        - name: populate
          in: query
          required: false
          description: |-
            Populate ticket with the options given separated by comma.

            Populate options:
            - `*`: All populators
            - `payments`: Payments
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
                    type: array
                    items:
                      $ref: '#/components/schemas/Ticket'
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
    Ticket:
      type: object
      properties:
        _id:
          type: string
        event_id:
          type: string
        ticket_rate_id:
          type: string
        qr_code:
          type: string
        status:
          type: string
        price:
          $ref: '#/components/schemas/TicketRatePrice'
        payment_currency:
          type: string
        channel_id:
          type: string
        fees:
          type: object
          properties:
            organization:
              type: number
            discocil:
              type: number
          required:
            - organization
            - discocil
        full_name:
          type: string
        phone:
          type: string
        email:
          type: string
        gender:
          type: string
        birthday:
          type: string
          description: ISO-8601 date (YYYY-MM-DD)
        address:
          type: string
        postal_code:
          type: string
        country_code:
          type: string
        personal_document_type:
          type: string
        personal_document_number:
          type: string
        answers:
          type: array
          items:
            type: object
            properties:
              questionId:
                type: string
              answer:
                type: string
            required:
              - questionId
              - answer
        supplements:
          type: array
          items:
            type: object
            properties:
              _id:
                type: string
              supplementId:
                type: string
              label:
                type: string
              price:
                type: number
              has_fake_price:
                type: boolean
              fake_price:
                type: number
              description:
                type: string
              total_price:
                type: number
              supplement_units:
                type: number
              product_quantity:
                type: number
              redemption_deadline_value:
                type: number
            required:
              - _id
              - supplementId
              - label
              - price
              - has_fake_price
              - fake_price
              - description
              - total_price
              - supplement_units
              - product_quantity
              - redemption_deadline_value
        refunded:
          type: number
        refunded_at:
          type: string
          description: ISO-8601 date-time
        refunds:
          type: array
          items:
            $ref: '#/components/schemas/RefundTicket'
        for:
          type: number
        enter:
          type: number
        entry_time:
          type: string
          description: ISO-8601 date-time
        total_supplements:
          type: number
        total_fees:
          type: number
        total_price:
          type: number
        activation_date:
          type: string
          description: ISO-8601 date-time
        payment_id:
          type: string
        supplements_service_charge_total:
          type: number
        discount_code:
          type: object
          properties:
            id:
              type: string
            code:
              type: string
            amount:
              type: number
          required:
            - id
            - code
            - amount
        remaining_breakdown:
          type: object
          properties:
            price:
              type: number
            warranty:
              type: number
            suplements:
              type: number
            ggdd:
              type: number
            surcharge:
              type: number
            suplements_upselling:
              type: number
            ggdd_upselling:
              type: number
          required:
            - price
            - warranty
            - suplements
            - ggdd
        ticket_original:
          type: object
          properties:
            total_price:
              type: number
            price:
              type: number
          required:
            - total_price
            - price
        surcharge:
          type: object
          properties:
            amount:
              type: number
          required:
            - amount
        warranty:
          type: object
          properties:
            total:
              type: number
            hours:
              type: number
            cost:
              type: number
          required:
            - total
            - hours
        payment:
          $ref: '#/components/schemas/Payment'
      required:
        - _id
        - event_id
        - ticket_rate_id
        - status
        - price
        - payment_currency
        - channel_id
        - supplements
        - refunds
        - total_supplements
        - total_fees
        - total_price
      description: >-
        The wire contract for a ticket, AT THE LATEST VERSION.


        This is the single source of truth: `toTicketResponse` is annotated to

        return it (so the code cannot drift from it without a compile error),
        and the

        OpenAPI spec + docs + breaking-change gate are all generated from it.


        Dates are ISO-8601 strings — the real wire form `res.json` produces from
        the

        underlying Moment values.


        Nested relations now carry precise types derived from the mappers:
        `price`

        reuses the shared `TicketRatePrice` contract, `payment` reuses
        `Payment`,

        `refunds` references `RefundTicket`, and the remaining nested objects

        (fees, supplements, answers, discount_code, remaining_breakdown,

        ticket_original, surcharge, warranty) are typed inline to match the
        exact

        shapes emitted by `toTicketResponse`.
    TicketRatePrice:
      type: object
      properties:
        _id:
          type: string
        name:
          type: string
          nullable: true
        price:
          type: number
        valid_until:
          type: string
        fee_type:
          type: string
          enum:
            - fixed
            - percentage
        fee_quantity:
          type: number
        includes:
          type: string
        additional_info:
          type: string
        quantity:
          type: number
        used:
          type: number
      required:
        - _id
        - name
        - price
        - fee_type
        - fee_quantity
        - includes
        - additional_info
        - quantity
      description: |-
        The wire contract for a ticket-rate price tier, AT THE LATEST VERSION.

        Mirrors `toPriceTicketRateResponse`. Shared by `Ticket.price`,
        `TicketRate.prices[]` and `TicketRate.current_price`.

        `valid_until` is an ISO-8601 date-time string, emitted only when set.
        `used` is only present for organizer-scoped responses.
    RefundTicket:
      type: object
      properties:
        channel_id:
          type: string
        amount:
          type: number
        at:
          type: string
          description: ISO-8601 date-time
      required:
        - channel_id
        - amount
        - at
      description: |-
        The wire contract for a single ticket refund entry.

        Derived from `toRefundTicketResponse`, which emits
        `{ channel_id, amount, at }` where `at` is an ISO-8601 date-time string.
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