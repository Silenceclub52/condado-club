> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Post bookings walk in

> Create a walk-in booking



## OpenAPI

````yaml post /bookings/walk-in
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
  /bookings/walk-in:
    post:
      tags:
        - Bookings
      description: Create a walk-in booking
      requestBody:
        required: true
        description: Body of the request
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/WalkInBooking'
      responses:
        '200':
          description: HTTP OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Booking'
            application/xml:
              schema:
                $ref: '#/components/schemas/Booking'
        '400':
          description: Bad request
        '401':
          description: HTTP Unauthorized
        '404':
          description: HTTP Not Found
components:
  schemas:
    WalkInBooking:
      properties:
        created_at:
          description: >-
            Booking creation instant (ISO 8601). If omitted, the server uses the
            current time.
          example: '2024-06-01T18:30:00.000Z'
          type: string
          format: date-time
        event_id:
          description: Event identifier.
          example: nl830t4mw0001cwrxbbg0226j4MgmEUG
          type: string
        space_names:
          description: Space names for the reservation. Separated by commas.
          example: 1, 2, 3
          type: string
        for:
          description: Number of people in the reservation.
          example: 5
          type: integer
        price:
          description: >-
            Reservation price. Required for a discount_code to apply (the
            discount is computed over this amount).
          example: 20
          type: number
        discount_code:
          description: >-
            Discount code (bookings type) to apply to the reservation. Requires
            price; the discount is subtracted from it. Sending it without price
            returns 400.
          example: BOOKDESC
          type: string
      type: object
    Booking:
      properties:
        _id:
          description: Unique ID of the reservation.
          example: jl830v6km000pcwrxge2757vyrfpqEsq
          type: string
        channel_id:
          description: >-
            Unique identifier of the channel. (It can be the same or other
            organization).
          example: ajifs2hke000dwemmurwd3kuqN3Kopcx
          type: string
        code:
          description: Access code (QR) of the reservation.
          example: XLLF3W73D
          type: string
        commentary_client:
          description: Observations sent by the client.
          example: I want the biggest VIP table.
          type: string
        commentary_reserve:
          description: Observations made by the organization.
          example: Preferred table for that client is 10.
          type: string
        date:
          description: Reservation date in ISO 8601 format.
          example: '2022-09-15T23:00:00.000Z'
          format: date-time
          type: string
        deposit:
          default: 0
          description: Value of the reservation advance.
          example: 0
          type: number
        deposit_method:
          default: online
          description: Reservation payment method.
          enum:
            - online
            - cash
          example: online
          type: string
        deposit_paid:
          default: 0
          description: >-
            Value of the advance payment of the reservation already paid in the
            currency of the organization.
          example: 0
          type: number
        discount_code_name:
          description: >-
            Code of the discount applied to the reservation, or null if none was
            applied.
          example: BOOKDESC
          type: string
          nullable: true
        discount_code_id:
          description: >-
            Unique identifier of the discount code applied to the reservation,
            or null if none was applied.
          example: dc4gr63f00xkq01i1d8jh5ohuzaZhvoE
          type: string
          nullable: true
        discount_quantity_subtract:
          default: 0
          description: Total amount of the discount subtracted from the reservation price.
          example: 0
          type: number
        duration:
          default: 0
          description: >-
            Estimated reservation duration in seconds. If the configuration zone
            does not support duration, the default value will be 0.
          example: 7200
          type: integer
        enter:
          description: Number of people received from the reservation.
          example: 0
          type: integer
        event_id:
          description: Event identifier.
          example: nl830t4mw0001cwrxbbg0226j4MgmEUG
          type: string
        event_name:
          description: >-
            Reservation event name. Empty if it is a reservation by calendar,
            not associated with an event but with a date.
          example: Saturday Night
          type: string
        for:
          description: Number of people in the reservation.
          example: 5
          type: integer
        gender_group:
          description: Gender of reservation attendees.
          enum:
            - mixed
            - boys
            - girls
          example: boys
          type: string
        hour:
          default: ''
          description: >-
            Time in “HH:mm” format of the reservation. If there is no time
            indicated, the field will be empty.
          example: '2:00'
          type: string
        name:
          description: Reservation name.
          example: Sergio Centeno Pérez
          type: string
        phone:
          description: Phone number of the client.
          example: '+34666666666'
          type: string
        price:
          description: >-
            Reservation price. It does not have to coincide with the advance.
            Ex: a reservation of €100 can have an advance of €50, the remaining
            €50 would be paid on the premises, if the advance (deposit_paid) is
            paid.
          example: 0
          type: number
        rate_slug:
          description: Identifier of the rate used by the reservation.
          example: ''
          type: string
        referral_id:
          description: PPRR identifier.
          example: ñeifupjvx000rwe2m2zuba1z9FqyR2dSL
          type: string
        refunded:
          default: 0
          description: >-
            Amount refunded from the online advance, in the currency of the
            organization.
          example: 0
          type: number
        space_id:
          description: Reservation space identifier.
          example: ''
          type: integer
        space_name:
          description: Name of the space where the reservation is located.
          example: S1
          type: string
        status:
          $ref: '#/components/schemas/BookingStatus'
        walkin:
          default: false
          description: True if the reservation is entered as a walking, false otherwise.
          example: true
          type: boolean
        zone_name:
          description: Name of the area where the reservation is located.
          example: Terraza
          type: string
        zone_slug:
          description: >-
            Zone identifier. The same zone for two different days (or events)
            has the same zone_slug but different id.
          example: '1658138633506'
          type: integer
        normalized_zone_name:
          description: Normalized zone name.
          example: terraza
          type: string
        email:
          description: Email of the client.
          example: example@example.com
          type: string
        invoice_reference:
          description: Invoice reference.
          example: EV24T-TOX2-0000215
          type: string
        corrective_invoice_references:
          description: Corrective invoice references.
          example:
            - EV24T-COR-H58Z-0000002
            - EV24T-COR-H58Z-0000003
          items:
            type: string
          type: array
        created_at:
          description: Creation timestamp.
          example: '2024-11-19T09:59:53.763Z'
          type: string
        currency:
          description: Currency of the organization.
          example: EUR
          type: string
        state:
          description: State of the reservation.
          example: accepted
          type: string
        updated_at:
          description: Last update timestamp.
          example: '2024-11-19T09:59:53.763Z'
          type: string
        local_date:
          description: Local creation date of the reservation.
          example: '2025-05-19 10:59:53'
          type: string
        client_id:
          description: Client ID.
          example: kfnwkjbjkwb1jbr4bkhb5334
          type: string
        billing_info:
          description: Billing information.
          type: object
          properties:
            customer_type:
              description: Customer type.
              example: individual
              type: string
            customer_name:
              description: Customer name.
              example: John Doe
              type: string
            document_type:
              description: Document type.
              example: dni
              type: string
            document_number:
              description: Document number.
              example: '1234567890'
              type: string
            address:
              description: Address.
              example: 123 Main St, City, Country
              type: string
            city:
              description: City.
              example: City
              type: string
            postal_code:
              description: Postal code.
              example: '12345'
              type: string
            country:
              description: Country.
              example: Spain
              type: string
        external_payments:
          items:
            $ref: '#/components/schemas/BookingExternalPayment'
          type: array
        refunds:
          items:
            $ref: '#/components/schemas/BookingRefund'
          type: array
        payments:
          items:
            $ref: '#/components/schemas/BookingPayment'
          type: array
        pos_payments:
          items:
            $ref: '#/components/schemas/BookingPosPayment'
          type: array
        source:
          description: Source of the reservation.
          enum:
            - web
            - pro
          example: web
          type: string
        pos_total_service_charge:
          description: Total service charge.
          example: 200
          type: number
        pos_total_tips:
          description: Total tips.
          example: 50
          type: number
        pos_ticket_total:
          description: Pos Ticket Total
          example: 400
          type: number
        pos_products:
          items:
            $ref: '#/components/schemas/BookingPosProducts'
          type: array
      type: object
    BookingStatus:
      description: |-
        Reservation status:<br><br>
              - <b>Pending</b>: If a reservation is in pending status, a verification is necessary in order to be accepted. This verification can be done manually for the users of Fourvenues Pro. In case of an automatic verification, the reservation must have an advance included.<br><br>
              - Accepted: A reservation is considered as accepted when there is no additional action by the organizer. This reservation is prepared to be attended on the event day.<br><br>
              - Rejected: In order to classify the reservation as rejected, a manual action is necessary from Fourvenues Pro. When a reservation is in this status, it will not record the whole amount nor the advance paid by cash. In case of a confirmed advance paid by card and no reimbursement, it will be recorded on event dashboard.<br><br>
              - Arrival: The arrival status can be used when the clients arrive at the venue. It is possible to use this status in case that the clients don’t get a seat and they are waiting to be seated.<br><br>
              - Sitting: With the sitting status, the clients have an assigned place.<br><br>
              - Released: The last status of a reservation is when the clients leave the venue. This status leaves the place vacant and it is possible to sell the place again.<br>
              
      example: accepted
      items:
        enum:
          - pending
          - accepted
          - rejected
          - arrival
          - sitting
          - released
        type: string
      type: array
    BookingExternalPayment:
      properties:
        _id:
          description: Unique ID of the payment.
          example: im4r8ntp6000c4ko6d3yt8ui0To87UQp
          type: string
        amount:
          description: Amount of the payment.
          example: 50
          type: number
        currency:
          description: Currency of the payment.
          example: EUR
          type: string
        description:
          description: Description of the payment.
          example: 123456abc
          type: string
        method:
          description: Payment method.
          example: card
          type: string
        payment_method_slug:
          description: >-
            Card brand when applicable (from external payment subcategory):
            visa, mastercard, or amex.
          example: visa
          type: string
          nullable: true
        created_at:
          description: Date of creation in ISO 8601 format.
          example: '2024-12-16T16:17:54.714Z'
          format: date-time
          type: string
        created_by:
          description: User who created the payment.
          example: plnlp1s0t005301am9ehq3y8iSllAXqD
          type: string
    BookingRefund:
      properties:
        _id:
          description: Unique ID of the refund.
          example: el7yuiyep0006msyw2pri1tem1LpJwSc
          type: string
        amount:
          description: Amount of the refund.
          example: 10
          type: number
        currency:
          description: Currency of the refund.
          example: EUR
          type: string
        payment_id:
          description: Payment identifier.
          example: Cl7yuiyhy0007msyw4vfl5ai6YF4WZRn
          type: string
        payment_method:
          description: Payment method.
          example: amex
          type: string
        created_at:
          description: Date of creation in ISO 8601 format.
          example: '2022-09-15T23:00:00.000Z'
          format: date-time
          type: string
        created_by:
          description: User who created the refund.
          example: gwrgkwinbgwnbwip23iongw
          type: string
    BookingPayment:
      properties:
        _id:
          description: Unique ID of the payment.
          example: el7yuiyep0006msyw2pri1tem1LpJwSc
          type: string
        amount:
          description: Amount of the payment.
          example: 10
          type: number
        currency:
          description: Currency of the payment.
          example: EUR
          type: string
        payment_method:
          description: Payment method.
          example: amex
          type: string
        method_last4:
          description: Last 4 digits of the card. Null if not available.
          example: '1234'
          nullable: true
          type: string
        card_type:
          description: >-
            Card type (funding source) reported by the payment provider.
            Possible values include CREDIT, DEBIT or PREPAID. Null if not
            available.
          example: CREDIT
          nullable: true
          type: string
        co_branded_with:
          description: Card scheme the card is co-branded with. Null if not available.
          example: visa
          nullable: true
          type: string
        issuer_name:
          description: Name of the bank that issued the card. Null if not available.
          example: Banco Santander
          nullable: true
          type: string
        card_bin:
          description: >-
            Bank Identification Number (first digits of the card) reported by
            the payment provider. Null if not available.
          example: '411111'
          nullable: true
          type: string
        issuer_country:
          description: Issuer country.
          example: GB
          type: string
        shopper_country:
          description: Shopper country.
          example: ES
          type: string
        created_at:
          description: Date of creation in ISO 8601 format.
          example: '2022-09-15T23:00:00.000Z'
          format: date-time
          type: string
        created_by:
          description: User who created the payment.
          example: gwrgkwinbgwnbwip23iongw
          type: string
        fees:
          description: Total fees charged for this payment.
          example: 1.5
          type: number
        customer_custom_fee_amount:
          description: Custom fee amount applied to the customer for this payment.
          example: 0.5
          type: number
        tips:
          description: Tip amount included in this payment.
          example: 2
          type: number
    BookingPosPayment:
      properties:
        amount:
          description: Amount of the payment.
          example: 100
          type: number
        type:
          description: Type of payment.
          example: cash
          type: string
      type: object
    BookingPosProducts:
      properties:
        _id:
          description: Id of the product.
          example: '1675456037'
          type: string
        name:
          description: Name of the product.
          example: Water bottle
          type: string
        amount:
          description: Number of units of the products consumed.
          example: 2
          type: number
        unit_price:
          description: Price of the unit.
          example: 50
          type: number
        total_price:
          description: Total price.
          example: 100
          type: number
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