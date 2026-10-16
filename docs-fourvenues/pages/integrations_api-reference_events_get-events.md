> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get events

> Get all the events given a date.



## OpenAPI

````yaml get /events/
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
  /events/:
    get:
      tags:
        - Events
      description: Get all the events given a date.
      parameters:
        - name: start
          in: query
          description: Date of event (ISO 8601).
          example: '2022-09-16'
          schema:
            type: string
        - name: end
          in: query
          description: Date of event (ISO 8601).
          example: '2022-09-16'
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
                    $ref: '#/components/schemas/Events'
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
                    $ref: '#/components/schemas/Events'
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
    Events:
      description: Array of Event
      items:
        $ref: '#/components/schemas/Event'
      type: array
    Event:
      properties:
        _id:
          description: Unique ID of the event.
          example: Pl4gr84v20xqu01js0ybj42s6vYtIz1T
          type: string
        date:
          description: Start of the day of the event (unix).
          example: 1664143200
          type: integer
        end:
          description: End date of the event (unix).
          example: 1663911000
          type: integer
        flyer:
          description: Flyer.
          example: https://www.your-domain.com/flyer.jpg
          type: string
        name:
          description: Name of the event.
          example: Saturday Night
          type: string
        slug:
          description: Slug.
          example: saturday-night-26-09-2022
          type: string
        start:
          description: Start date of the event (unix).
          example: 1663884000
          type: integer
        url:
          description: URL of the event.
          example: >-
            https://web.fourvenues.com/gengis-kan/events/saturday-night-26-09-2022
          type: string
        description:
          description: Description of the event.
          example: This event takes place every Thursday
          type: string
        age:
          description: Min age of the event.
          example: 18
          type: number
        music_genres:
          description: Event music genres.
          enum:
            - hits
            - urban
            - pop
            - rock
            - remember
            - techno
            - house
            - edm
            - trap
            - reggaeton
            - latin
            - salsa
            - bachata
            - kizomba
            - r&b
            - dance
            - indie
            - afrobeat
            - minimal
            - underground
            - tech-house
            - drum-and-bass
            - acid-house
            - chill
            - hard-techno
            - melodic-techno
            - hip-hop
            - reggae
            - disco
            - sing-along
            - acoustic
            - trance
            - classical
            - soul
            - blues
            - jazz
            - metal
            - old-school
          example: techno
          type: string
        outfit:
          description: Outfit of the event.
          enum:
            - free
            - casual
            - half-label
            - label
            - fixed-up
          example: casual
          type: string
        location_town:
          description: Town where the event will take place.
          example: Madrid
          type: string
        artists:
          description: Artists of the event.
          example:
            - David Guetta
            - Martin Garrix
          items:
            type: string
          type: array
        active:
          description: If the event is active.
          example: true
          type: boolean
        visible:
          description: If the event is visible.
          example: true
          type: boolean
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