> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get tickets

> Get all tickets for an event. Supports filtering by date range on created_at or updated_at. Each ticket includes created_at and updated_at in ISO 8601 format.



## OpenAPI

````yaml get /tickets/
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
  /tickets/:
    get:
      tags:
        - Tickets
      description: >-
        Get all tickets for an event. Supports filtering by date range on
        created_at or updated_at. Each ticket includes created_at and updated_at
        in ISO 8601 format.
      parameters:
        - name: event_id
          in: query
          description: Event identifier.
          example: el4gr63f00xkq01i1d8jh5ohuzaZhvoE
          required: true
          schema:
            type: string
        - name: start_date
          in: query
          description: Start date.
          example: '2021-09-01T00:00:00.000Z'
          required: false
          schema:
            type: string
        - name: end_date
          in: query
          description: End date.
          example: '2021-09-01T00:00:00.000Z'
          required: false
          schema:
            type: string
        - name: date_field
          in: query
          description: >-
            Field used for start_date/end_date filtering and sorting. Defaults
            to created_at.
          example: created_at
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
                  - created_at
                  - updated_at
                items:
                  type: string
        - name: limit
          in: query
          description: Maximum number of tickets to return (1-500). Defaults to 500.
          example: 500
          required: false
          schema:
            type: object
            properties:
              type:
                type: string
                example: integer
              minimum:
                type: number
                example: 1
              maximum:
                type: number
                example: 500
              default:
                type: number
                example: 500
        - name: offset
          in: query
          description: Offset of tickets.
          example: 0
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
                    $ref: '#/components/schemas/Tickets'
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
                    $ref: '#/components/schemas/Tickets'
                xml:
                  name: main
        '400':
          description: Bad request
        '401':
          description: HTTP Unauthorized
        '404':
          description: HTTP Not Found
components:
  schemas:
    Tickets:
      description: Array of Ticket
      items:
        $ref: '#/components/schemas/Ticket'
      type: array
    Ticket:
      properties:
        _id:
          description: Unique ID of the ticket.
          example: el7yuiyep0006msyw2pri1tem1LpJwSc
          type: string
        activation_date:
          description: >-
            Date when the ticket was activated (Paid or activated via SMS) in
            ISO 8601 format..
          example: '2022-09-15T23:00:00.000Z'
          format: date-time
          type: string
        channel_id:
          description: >-
            Unique identifier of the channel. (It can be the same or other
            organization).
          example: ajifs2hke000dwemmurwd3kuqN3Kopcx
          type: string
        code:
          description: Access code (QR) of the ticket.
          example: P6J21FF2S
          type: string
        discount_quantity_subtract:
          default: 0
          description: >-
            Total amount of discount code that will be subtracted from the final
            price.
          example: 0
          type: number
        discount_code_name:
          description: >-
            Code of the discount applied to the ticket, or null if none was
            applied.
          example: SUMMER20
          type: string
          nullable: true
        discount_code_id:
          description: >-
            Unique identifier of the discount code applied to the ticket, or
            null if none was applied.
          example: dc4gr63f00xkq01i1d8jh5ohuzaZhvoE
          type: string
          nullable: true
        email:
          description: Email filled with the ticket.
          example: my-client-email@fourvenues.com
          type: string
        gender:
          description: 'Gender: female, male, other.'
          example: female
          type: string
        address:
          description: Address filled with the ticket.
          example: Calle de la Rosa 1
          type: string
        language:
          description: Language of the client.
          example: es
          type: string
        country:
          description: Country filled with the ticket.
          example: ES
          type: string
        postal_code:
          description: Postal code filled with the ticket.
          example: '28001'
          type: string
        enter:
          default: 0
          description: Number of people entered.
          example: 0
          maximum: 1
          minimum: 0
          type: integer
        entry_date:
          description: Date when the ticket was checked in (unix).
          example: 0
          type: number
        event_id:
          description: Event identifier.
          example: Mjo4f9o9h01fdjvmmrgn9aoh4s5IBHzX
          type: string
        for:
          description: Number of people enlisted.
          example: 1
          maximum: 1
          minimum: 1
          type: integer
        name:
          description: Name filled with the ticket.
          example: Miguel Román
          type: string
        payment_id:
          description: Payment identifier.
          example: Cl7yuiyhy0007msyw4vfl5ai6YF4WZRn
          type: string
        payment:
          description: >-
            Online payment details. Null when the ticket has no associated
            payment (e.g. cash or free tickets).
          nullable: true
          type: object
          properties:
            _id:
              description: Payment identifier.
              example: Cl7yuiyhy0007msyw4vfl5ai6YF4WZRn
              type: string
            issuer_country:
              description: ISO 3166-1 alpha-2 country of the card issuer.
              example: ES
              type: string
              nullable: true
            payment_method:
              description: Payment method used.
              example: visa_applepay
              type: string
              nullable: true
            shopper_country:
              description: ISO 3166-1 alpha-2 country of the shopper.
              example: ES
              type: string
              nullable: true
            method_last4:
              description: Last 4 digits of the card.
              example: '6491'
              type: string
              nullable: true
            card_type:
              description: Card funding source (CREDIT, DEBIT, PREPAID).
              example: CREDIT
              type: string
              nullable: true
            co_branded_with:
              description: Co-branded scheme of the card, if any.
              example: visa
              type: string
              nullable: true
            issuer_name:
              description: Name of the card issuing bank.
              example: CaixaBank
              type: string
              nullable: true
            card_bin:
              description: >-
                Bank Identification Number (first digits of the card). Null if
                not available.
              example: '411111'
              type: string
              nullable: true
        phone:
          description: Phone number filled with the ticket.
          example: '+34666666666'
          type: string
        price:
          description: Base rate price.
          example: 10
          type: number
        raised:
          description: Total amount raised.
          example: 0
          type: number
        rate_id:
          description: Rate identifier.
          example: Tl4gr63fr0xkr01i1gk354qbrSCMLTwl
          type: string
        rate_name:
          description: Rate name.
          example: General Access
          type: string
        rate_slug:
          description: Rate slug.
          example: general-access
          type: string
        referral_id:
          description: PPRR identifier.
          example: ñeifupjvx000rwe2m2zuba1z9FqyR2dSL
          type: string
        refunded:
          default: 0
          description: Refunded amount.
          example: 0
          type: number
        refunded_at:
          description: >-
            Date of the last refund in ISO 8601 format. Null if the ticket has
            never been refunded.
          example: '2026-08-12T10:15:30.000Z'
          nullable: true
          type: string
        refunds:
          description: History of refunds applied to the ticket.
          items:
            properties:
              amount:
                description: Amount refunded.
                example: 25
                type: number
              at:
                description: Date of the refund in ISO 8601 format.
                example: '2026-08-12T10:15:30.000Z'
                type: string
              user_id:
                description: >-
                  Identifier of the user that executed the refund. Null for
                  refunds executed by an integration.
                example: seifupjvx000rwe2m2zuba1z9FqyR2dSL
                nullable: true
                type: string
            type: object
          type: array
        sale_type:
          description: Sale type.
          enum:
            - online
            - sms
            - imported
            - invitation
            - paylink
            - print
            - box-office
          example: online
          type: string
        is_integrations_api:
          default: false
          description: >-
            Whether the ticket was created through the Fourvenues Integrations
            API. Always present: false for tickets originated in any other
            channel. Not to be confused with sale_type 'imported', which refers
            to tickets bulk-imported from the Fourvenues back office.
          example: true
          type: boolean
        price_info:
          properties:
            _id:
              description: Unique ID of the price info.
              example: '1712861139741'
              type: string
            price:
              description: Price of the ticket.
              example: 10
              type: number
            age:
              description: Min age of the ticket.
              example: 18
              type: number
            content:
              description: Content of the ticket.
              example: ''
              type: string
            additional_info:
              description: Additional info of the ticket.
              example: ''
              type: string
          type: object
        supplements:
          items:
            $ref: '#/components/schemas/TicketSupplement'
          type: array
        status:
          $ref: '#/components/schemas/TicketStatus'
        total_extras:
          description: 'Amount paid for the extras. (Example: 2€ for Fast pass).'
          example: 2
          type: number
        total_fees:
          description: 'Amount paid for the fees. (Example: 10%)'
          example: 1.2
          type: number
        total_paid:
          description: Total amount paid (Base price + Extras + Fees - Discount).
          example: 13.2
          type: number
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
          description: Date of creation in ISO 8601 format.
          example: '2022-09-15T23:00:00.000Z'
          format: date-time
          type: string
        updated_at:
          description: Date of the last update in ISO 8601 format.
          example: '2022-09-16T10:30:00.000Z'
          format: date-time
          type: string
        date:
          description: Date of the event YYYY-MM-DD.
          example: '2025-03-15'
          type: string
        surcharge_total:
          description: Total amount paid as surcharge
          example: 10
          type: number
        surcharge:
          properties:
            amount:
              description: Total amount paid as surcharge
              example: 10
              type: number
            payment_method:
              description: Payment method
              example: card
              type: string
            payment_id:
              description: Payment Id of the surcharge
              example: ojvfnwbvebru23ung34
              type: string
            state:
              description: State of the surcharge
              example: completed
              type: string
            created_at:
              description: Date of the creation of the surcharge
              example: '2025-05-09T23:03:21.000Z'
              type: string
            user_id:
              description: Id of the user that created the surcharge
              example: ivnrewiujbgw2983b9ubgbo2
              type: string
          type: object
        supplements_service_charge_total:
          description: Sum of all the supplements service charge
          example: 2
          type: number
        total_warranty:
          description: Amount paid as warranty by the client
          example: 10
          type: number
      type: object
    TicketSupplement:
      properties:
        _id:
          description: Unique ID of the supplement.
          example: '1712861146044'
          type: string
        price:
          description: Price of the supplement.
          example: 2
          type: number
        label:
          description: Label of the supplement.
          example: Bus
          type: string
        normalized_label:
          description: Normalized label of the supplement.
          example: bus
          type: string
        description:
          description: Description of the supplement.
          example: Bus from the city center to the venue.
          type: string
        has_fake_price:
          description: True if the supplement has a fake price.
          example: false
          type: boolean
        fake_price:
          description: Fake price of the supplement.
          example: 0
          type: number
        product_quantity:
          description: Quantity of the supplement.
          example: 1
          type: number
        product_quantity_used:
          description: Quantity of the supplement used.
          example: 1
          type: number
        service_charge_amount:
          description: Amount set as service charge for the supplement
          example: 2
          type: number
        service_charge_type:
          description: >-
            Type of the service charge (fixed/percentage) over the supplement
            price
          example: fixed
          type: string
      type: object
    TicketStatus:
      description: |-
        Ticket status:<br><br>
              - Activated: A ticket is activated when it is filled and already paid. It can be checked in correctly.<br><br>
              - Cancelled: The ticket is cancelled and the system will raise an error if is checked in.<br><br>
              - Filling client: The SMS has been sent, and the client has to fill the data in order to activate the ticket.<br>
              
      example: activated
      items:
        enum:
          - activated
          - cancelled
          - filling_client
        type: string
      type: array
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