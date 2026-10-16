> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get booking by id

> Get a booking by id



## OpenAPI

````yaml get /bookings/{bookingId}
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
  /bookings/{bookingId}:
    get:
      tags:
        - Bookings
      summary: Get a booking by ID
      description: Get a booking by ID
      operationId: getBookingById
      parameters:
        - name: bookingId
          in: path
          required: true
          description: Booking ID
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
                    $ref: '#/components/schemas/Booking'
                  success:
                    type: boolean
                    example: true
        '404':
          description: Booking not found
      security:
        - ApiKey: []
components:
  schemas:
    Booking:
      type: object
      properties:
        _id:
          type: string
        event_id:
          type: string
        organization_id:
          type: string
        channel_id:
          type: string
        referral_id:
          type: string
        status:
          $ref: '#/components/schemas/BookingStatus'
        zone_slug:
          type: string
        rate_slug:
          type: string
        table_id:
          type: string
        quantity:
          type: number
        full_name:
          type: string
        email:
          type: string
        phone:
          type: string
        deposit:
          type: number
        fee_type:
          $ref: '#/components/schemas/FeeType'
        fee_quantity:
          type: number
        qr_code:
          type: string
        activation_code:
          type: string
        observations_referral:
          type: string
        observations_client:
          type: string
        marketing_consent:
          type: boolean
        payment_id:
          type: string
        payment_url:
          type: string
        birthdate:
          type: string
          description: ISO-8601 date (YYYY-MM-DD)
        billing_info:
          type: object
          properties:
            customer_type:
              type: string
              enum:
                - individual
                - company
            customer_name:
              type: string
            document_type:
              $ref: '#/components/schemas/DocumentType'
            document_number:
              type: string
            address:
              type: string
            city:
              type: string
            postal_code:
              type: string
            country:
              type: string
          required:
            - customer_type
            - customer_name
            - document_type
            - document_number
            - address
            - city
            - postal_code
            - country
      required:
        - _id
        - event_id
        - organization_id
        - channel_id
        - referral_id
        - status
        - zone_slug
        - rate_slug
        - quantity
        - full_name
        - email
        - phone
        - deposit
        - fee_type
        - fee_quantity
        - qr_code
        - activation_code
        - payment_id
      description: >-
        The wire contract for a booking, AT THE LATEST VERSION.


        This is the single source of truth: `toBookingResponse` is annotated to

        return it (so the code cannot drift from it without a compile error),
        and the

        OpenAPI spec + docs + breaking-change gate are all generated from it.


        Dates are ISO-8601 strings — the real wire form `res.json` produces from
        the

        underlying serialized values. Mongo ObjectIds are plain strings.


        Keys produced conditionally by the serializer (spread guards) are
        optional.
    BookingStatus:
      type: string
      enum:
        - pending
        - filled-by-client
        - cancelled-by-client
        - rejected
        - accepted
        - arrived
        - arrived-partial
        - seated
        - seated-partial
        - released
        - not-show
        - to-review
        - not-completed
    FeeType:
      type: string
      enum:
        - percentage
        - fixed
    DocumentType:
      type: string
      enum:
        - dni
        - nie
        - passport
        - other
  securitySchemes:
    ApiKey:
      in: header
      name: X-Api-Key
      type: apiKey

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.