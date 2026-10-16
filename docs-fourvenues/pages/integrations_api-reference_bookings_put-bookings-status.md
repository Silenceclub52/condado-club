> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Put bookings status

> Update the status of a booking.



## OpenAPI

````yaml put /bookings/{bookingId}/status
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
  /bookings/{bookingId}/status:
    put:
      tags:
        - Bookings
      description: Update the status of a booking.
      parameters:
        - name: bookingId
          in: path
          required: true
          schema:
            type: string
          description: Id of the booking
          example: El805n9kh0000g3yw94010m5bNvk6za4
      requestBody:
        required: true
        description: Body of the request
        content:
          application/json:
            schema:
              type: object
              properties:
                status:
                  $ref: '#/components/schemas/BookingStatus'
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
                xml:
                  name: main
            application/xml:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
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