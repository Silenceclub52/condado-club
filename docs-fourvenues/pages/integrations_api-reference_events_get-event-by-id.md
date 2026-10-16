> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get event by id

> Get an event by its identifier.



## OpenAPI

````yaml get /events/{eventId}
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
  /events/{eventId}:
    get:
      tags:
        - Events
      summary: Get an event by id
      description: Get an event by id
      operationId: getEventById
      parameters:
        - name: eventId
          in: path
          required: true
          description: The id of the event to retrieve.
          schema:
            type: string
        - name: populate
          in: query
          required: false
          description: >-
            Populates the event with additional options separated by comma.


            Default response already includes location, artists, preregister
            status (`is_preregistered`) and preregister configuration
            (`preregister`).


            Populate options:

            - `*`: All populators

            - `ticket-rates`: Ticket Rates

            - `list-rates`: List Rates

            - `event-groups`: Event Groups

            - `preregister`: Preregister status and configuration
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
                    $ref: '#/components/schemas/Event'
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
    Event:
      type: object
      properties:
        _id:
          type: string
        name:
          type: string
        slug:
          type: string
        description:
          type: string
        display_date:
          type: string
          description: ISO-8601 date-time
        start_date:
          type: string
          description: ISO-8601 date-time
        end_date:
          type: string
          description: ISO-8601 date-time
        code:
          type: string
        age:
          type: number
        image_url:
          type: string
        outfit:
          type: string
        ambiences:
          type: array
          items:
            type: string
        music_genres:
          type: array
          items:
            type: string
        artists:
          type: array
          items:
            type: object
            properties:
              name:
                type: string
              image_url:
                type: string
            required:
              - name
              - image_url
        organization_id:
          type: string
        location_id:
          type: string
        ticket_rates:
          type: array
          items:
            $ref: '#/components/schemas/TicketRate'
        list_rates:
          type: array
          items:
            $ref: '#/components/schemas/ListRate'
        location:
          $ref: '#/components/schemas/Location'
        event_group:
          $ref: '#/components/schemas/EventGroup'
        iframe:
          type: object
          properties:
            tag_url:
              type: string
            script_url:
              type: string
          required:
            - tag_url
            - script_url
        currency:
          type: string
        is_until_late:
          type: boolean
        is_preregistered:
          type: boolean
        is_upselling_enabled:
          type: boolean
        preregister:
          type: object
          properties:
            id:
              type: string
            end_date:
              type: number
              nullable: true
              description: Unix timestamp (seconds), or null when open-ended
            fields:
              type: array
              items:
                type: object
                properties:
                  key:
                    type: string
                  is_required:
                    type: boolean
                  options:
                    type: array
                    items:
                      type: string
                    nullable: true
                required:
                  - key
                  - is_required
                  - options
            is_active:
              type: boolean
          required:
            - id
            - end_date
            - fields
            - is_active
          nullable: true
      required:
        - _id
        - name
        - slug
        - description
        - display_date
        - start_date
        - end_date
        - code
        - age
        - image_url
        - outfit
        - ambiences
        - music_genres
        - artists
        - organization_id
        - location_id
        - iframe
        - currency
        - is_until_late
        - is_upselling_enabled
      description: >-
        The wire contract for an event, AT THE LATEST VERSION.


        This is the single source of truth: `toEventResponse` is annotated to

        return it (so the code cannot drift from it without a compile error),
        and the

        OpenAPI spec + docs + breaking-change gate are all generated from it.


        Dates are ISO-8601 strings — the real wire form `res.json` produces from
        the

        underlying Moment values.


        Nested relations are typed precisely: `ticket_rates`, `list_rates`,

        `location` and `event_group` reuse their own versioned response
        contracts

        (`$ref`s in the OpenAPI spec); `artists`, `iframe` and `preregister` are

        event-owned shapes typed inline to match exactly what the mapper emits.
    TicketRate:
      type: object
      properties:
        _id:
          type: string
        organization_id:
          type: string
        event_id:
          type: string
        name:
          type: string
        slug:
          type: string
        valid_from:
          type: string
          description: ISO-8601 date-time
        complete:
          type: boolean
        type:
          type: string
        show_all_prices:
          type: boolean
        prices:
          type: array
          items:
            $ref: '#/components/schemas/TicketRatePrice'
        warranty:
          type: object
          properties:
            enabled:
              type: boolean
            is_fixed:
              type: boolean
            fixed_price:
              type: number
            percentage:
              type: number
            hours:
              type: number
          required:
            - enabled
        supplements:
          type: array
          items:
            type: object
            properties:
              _id:
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
              product_quantity:
                type: number
              purchase_limit:
                type: object
                properties:
                  min_quantity:
                    type: number
                  max_quantity:
                    type: number
                    nullable: true
                  is_unlimited:
                    type: boolean
                required:
                  - min_quantity
                  - max_quantity
                  - is_unlimited
              redemption_deadline:
                type: object
                properties:
                  is_expiration_enabled:
                    type: boolean
                  expiration_deadline:
                    type: number
                required:
                  - is_expiration_enabled
              service_charge_amount:
                type: number
              service_charge_type:
                type: string
                enum:
                  - fixed
                  - percentage
            required:
              - _id
              - label
              - price
              - has_fake_price
              - fake_price
        min:
          type: number
        max:
          type: number
        nominative:
          type: boolean
        available:
          type: boolean
        current_price:
          $ref: '#/components/schemas/TicketRatePrice'
        availability:
          type: object
          properties:
            sold:
              type: number
            available:
              type: number
          required:
            - sold
            - available
        fields:
          type: array
          items:
            type: object
            properties:
              slug:
                type: string
              type:
                type: string
              label:
                type: string
              required:
                type: boolean
              options:
                type: array
                items:
                  type: object
                  properties:
                    text:
                      type: string
                    value:
                      type: string
                  required:
                    - text
                    - value
            required:
              - slug
              - type
        questions:
          type: array
          items:
            type: object
            properties:
              _id:
                type: string
              label:
                type: string
              type:
                type: string
                enum:
                  - text
                  - dropdown
              items:
                type: array
                items:
                  type: string
              required:
                type: boolean
            required:
              - _id
              - label
              - type
              - items
              - required
        has_discount_codes_enabled:
          type: boolean
      required:
        - _id
        - organization_id
        - event_id
        - name
        - slug
        - valid_from
        - complete
        - type
        - prices
        - supplements
        - min
        - max
        - nominative
        - fields
        - questions
        - has_discount_codes_enabled
      description: >-
        The wire contract for a ticket rate, AT THE LATEST VERSION.


        This is the single source of truth: `toTicketRateResponse` is annotated
        to

        return it (so the code cannot drift from it without a compile error),
        and the

        OpenAPI spec + docs + breaking-change gate are all generated from it.


        Dates are ISO-8601 strings — the real wire form `res.json` produces from
        the

        underlying Moment values.


        Nested relations are typed inline (or via a shared `$ref` for prices) to

        match exactly what the mappers emit:
         - `prices` / `current_price` reuse `PriceTicketRateResponse`
           (`toPriceTicketRateResponse`).
         - `warranty` mirrors `toWarrantyResponse`: `enabled` is always present and
           the remaining fields are only emitted when `enabled` is `true`.
         - `supplements` mirrors `toSupplementResponse` (with `purchase_limit` /
           `redemption_deadline` coming from their `toMongoDocument()` shapes).
         - `questions` mirrors `toTicketRateQuestionResponse`.
         - `fields` mirrors `TicketRate.translateFieldsFromMongoDBToTicketRateFields`,
           a list of form-field descriptors.
    ListRate:
      type: object
      properties:
        _id:
          type: string
        organization_id:
          type: string
        event_id:
          type: string
        name:
          type: string
        slug:
          type: string
        valid_from:
          type: string
          description: ISO-8601 date-time
        valid_until:
          type: string
          description: ISO-8601 date-time
        complete:
          type: boolean
        type:
          type: string
        prices:
          type: array
          items:
            $ref: '#/components/schemas/ListPrice'
        max:
          type: number
        nominative:
          type: boolean
        available:
          type: boolean
        availability:
          type: object
          properties:
            sold:
              type: number
            available:
              type: number
          required:
            - sold
            - available
      required:
        - _id
        - organization_id
        - event_id
        - name
        - slug
        - valid_from
        - valid_until
        - complete
        - type
        - prices
        - max
        - nominative
      description: >-
        The wire contract for a list rate, AT THE LATEST VERSION.


        This is the single source of truth: `toListRateResponse` is annotated to

        return it (so the code cannot drift from it without a compile error),
        and the

        OpenAPI spec + docs + breaking-change gate are all generated from it.


        Dates are ISO-8601 strings — the real wire form `res.json` produces from
        the

        underlying Moment values.


        Nested relations carry their own versioned response contract where one

        exists (`prices`); otherwise they are `unknown` for now and become typed

        `$ref`s in the full rollout.
    Location:
      type: object
      properties:
        unic_id:
          type: string
        location_id:
          type: string
        organization_id:
          type: string
        name:
          type: string
        address:
          type: string
        number:
          type: string
        city:
          type: string
        country:
          type: string
        full_address:
          type: string
        latitude:
          type: number
        longitude:
          type: number
        timezone:
          type: string
      required:
        - unic_id
        - location_id
        - organization_id
        - name
        - address
        - number
        - city
        - country
        - full_address
        - latitude
        - longitude
        - timezone
      description: >-
        The wire contract for a location, AT THE LATEST VERSION.


        This is the single source of truth: `toLocationResponse` is annotated to

        return it (so the code cannot drift from it without a compile error),
        and the

        OpenAPI spec + docs + breaking-change gate are all generated from it.


        Identifiers are plain strings — the real wire form `res.json` produces
        from

        the underlying ObjectId values.


        Nested relations are `unknown` for now; in the full rollout each gets
        its own

        versioned response contract (recursively), at which point they become
        typed

        `$ref`s here.
    EventGroup:
      type: object
      properties:
        _id:
          type: string
        organization_id:
          type: string
        name:
          type: string
        description:
          type: string
          nullable: true
        event_ids:
          type: array
          items:
            type: string
      required:
        - _id
        - organization_id
        - name
        - description
        - event_ids
      description: >-
        The wire contract for an event group, AT THE LATEST VERSION.


        This is the single source of truth: `toEventGroupResponse` is annotated
        to

        return it (so the code cannot drift from it without a compile error),
        and the

        OpenAPI spec + docs + breaking-change gate are all generated from it.


        Dates are ISO-8601 strings — the real wire form `res.json` produces from
        the

        underlying Moment values.


        Nested relations are `unknown` for now; in the full rollout each gets
        its own

        versioned response contract (recursively), at which point they become
        typed

        `$ref`s here.
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
    ListPrice:
      type: object
      properties:
        _id:
          type: string
        valid_from:
          type: string
          description: ISO-8601 date-time
        valid_until:
          type: string
          description: ISO-8601 date-time
        men:
          type: boolean
        women:
          type: boolean
        price:
          type: number
        includes:
          type: string
        additional_info:
          type: string
        available:
          type: boolean
        age:
          type: number
      required:
        - _id
        - men
        - women
        - price
        - includes
        - additional_info
        - age
      description: >-
        The wire contract for a price of a list rate, AT THE LATEST VERSION.


        This is the single source of truth: `toPriceListRateResponse` is
        annotated

        to return it (so the code cannot drift from it without a compile error),
        and

        the OpenAPI spec + docs + breaking-change gate are all generated from
        it.


        Dates are ISO-8601 strings — the real wire form `res.json` produces from
        the

        underlying Moment values.
  securitySchemes:
    ApiKey:
      in: header
      name: X-Api-Key
      type: apiKey

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.