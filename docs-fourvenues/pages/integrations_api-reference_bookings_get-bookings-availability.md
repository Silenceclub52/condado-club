> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get bookings availability

> Get an event booking\'s availability



## OpenAPI

````yaml get /bookings/availability
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
  /bookings/availability:
    get:
      tags:
        - Bookings
      summary: Get bookings availability for an event
      description: Get bookings availability for an event
      operationId: getBookingsAvailabilityByEvent
      parameters:
        - name: event_id
          in: query
          required: true
          description: Event ID
          schema:
            type: string
        - name: quantity
          in: query
          required: false
          description: Quantity of people to get availability for
          schema:
            type: number
      responses:
        '200':
          description: Bookings for an event
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Zone'
                  success:
                    type: boolean
                    example: true
        '404':
          description: Event not found
      security:
        - ApiKey: []
components:
  schemas:
    Zone:
      type: object
      properties:
        _id:
          type: string
        available:
          type: boolean
        slug:
          type: string
        name:
          type: string
        normalized_name:
          type: string
        can_select_client:
          type: boolean
        is_full:
          type: boolean
        background_image:
          type: string
        spaces:
          type: array
          items:
            $ref: '#/components/schemas/Table'
        rates:
          type: array
          items:
            $ref: '#/components/schemas/TableRate'
        has_discount_codes_enabled:
          type: boolean
      required:
        - _id
        - available
        - slug
        - name
        - normalized_name
        - can_select_client
        - is_full
        - background_image
        - has_discount_codes_enabled
      description: >-
        The wire contract for a booking zone, AT THE LATEST VERSION.


        This is the single source of truth: `toZoneResponse` is annotated to

        return it (so the code cannot drift from it without a compile error),
        and the

        OpenAPI spec + docs + breaking-change gate are all generated from it.


        `_id` is the ObjectId serialized to a string.


        Nested relations resolve to their own versioned response contracts:

        `spaces` -> Table and `rates` -> TableRate, emitted as typed `$ref`s.
    Table:
      type: object
      properties:
        _id:
          type: string
        name:
          type: string
        normalized_name:
          type: string
        capacity:
          type: number
        minimum:
          type: number
        position:
          type: object
          properties:
            x:
              type: number
            'y':
              type: number
            scale:
              type: number
            rotation:
              type: number
            radius:
              type: number
          required:
            - x
            - 'y'
            - scale
            - rotation
            - radius
        blocked:
          type: boolean
        hidden:
          type: boolean
        available:
          type: boolean
        rates:
          type: array
          items:
            $ref: '#/components/schemas/TableRate'
        combination_table_ids:
          type: array
          items:
            type: string
      required:
        - _id
        - name
        - normalized_name
        - capacity
        - minimum
        - position
        - blocked
        - hidden
        - available
        - rates
      description: >-
        The wire contract for a table (a "space" within a zone), AT THE LATEST

        VERSION.


        This is the single source of truth: `toTableResponse` is annotated to
        return

        it (so the code cannot drift from it without a compile error), and the

        OpenAPI spec + docs are generated from it.


        `_id` is the ObjectId serialized to a string.
    TableRate:
      type: object
      properties:
        _id:
          type: string
        color:
          type: array
          items:
            type: number
        slug:
          type: string
        name:
          type: string
        content:
          type: string
        conditions:
          type: string
        price:
          type: number
        included_persons:
          type: number
        supplement_persons:
          type: number
        supplement_price:
          type: number
        fee_type:
          $ref: '#/components/schemas/FeeType'
        fee_quantity:
          type: number
        internal_description:
          type: string
        deposit:
          type: object
          properties:
            type:
              $ref: '#/components/schemas/DepositType'
            value:
              type: number
            calculated_amount:
              type: number
          required:
            - type
            - value
        full_payment:
          type: boolean
        whatsapp_contact_enabled:
          type: boolean
        whatsapp_contact_phone_number:
          type: string
      required:
        - _id
        - color
        - slug
        - name
        - content
        - conditions
        - price
        - included_persons
        - supplement_persons
        - supplement_price
        - fee_type
        - fee_quantity
        - internal_description
        - deposit
        - full_payment
        - whatsapp_contact_enabled
      description: >-
        The wire contract for a table rate, AT THE LATEST VERSION.


        This is the single source of truth: `toTableRateResponse` is annotated
        to

        return it (so the code cannot drift from it without a compile error),
        and the

        OpenAPI spec + docs are generated from it.


        `_id` is the ObjectId serialized to a string.
    FeeType:
      type: string
      enum:
        - percentage
        - fixed
    DepositType:
      type: string
      enum:
        - none
        - percentage
        - fixed
  securitySchemes:
    ApiKey:
      in: header
      name: X-Api-Key
      type: apiKey

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.