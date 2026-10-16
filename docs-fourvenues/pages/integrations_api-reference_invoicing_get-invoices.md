> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get invoices

> Get all the invoices for an organization



## OpenAPI

````yaml get /invoicing/invoices
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
  /invoicing/invoices:
    get:
      tags:
        - Invoicing
      description: Get all the invoices for an organization
      parameters:
        - name: start_date
          in: query
          description: The start date
          example: '2024-05-01 00:00:00'
          required: true
          schema:
            type: string
        - name: end_date
          in: query
          description: The end date
          example: '2024-05-31 23:59:59'
          required: true
          schema:
            type: string
        - name: cursor
          in: query
          description: The cursor. Last invoice number of the previous page
          required: false
          schema:
            type: string
        - name: limit
          in: query
          description: The limit
          example: 100
          required: false
          schema:
            type: number
      responses:
        '200':
          description: The invoices
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/InvoiceHydrated'
components:
  schemas:
    InvoiceHydrated:
      type: object
      properties:
        id:
          type: string
          format: uuid
          description: Invoice ID
        invoice_number:
          type: string
          description: Invoice number
        url:
          type: string
          description: Invoice URL
        invoice_type_name:
          type: string
          description: Invoice type name
        invoice_type_code:
          type: string
          description: Invoice type code
        organization_system_id:
          type: string
          format: uuid
          description: Organization system ID
        organization_id:
          type: string
          format: uuid
          description: Organization ID
        invoice_type_id:
          type: string
          format: uuid
          description: Invoice type ID
        serie_id:
          type: string
          format: uuid
          description: Serie ID
        status:
          type: string
          description: Invoice status
        issue_date:
          type: string
          format: date-time
          description: Invoice issue date
        due_date:
          type: string
          format: date-time
          description: Invoice due date
        total_amount:
          type: number
          description: Total amount
        currency:
          type: string
          description: Currency code
        total_tax_amount:
          type: number
          description: Total tax amount
        created_at:
          type: string
          format: date-time
          description: Creation date
        updated_at:
          type: string
          format: date-time
          description: Last update date
        supplier_legal_info:
          $ref: '#/components/schemas/InvoiceLegalInfo'
        customer_legal_info:
          $ref: '#/components/schemas/InvoiceLegalInfo'
        organization_system_info:
          type: object
          properties:
            id:
              type: string
              format: uuid
              description: Organization system ID
            regime_id:
              type: string
              format: uuid
              description: Regime ID
            regime_code:
              type: string
              description: Regime code
            regime_name:
              type: string
              description: Regime name
            country_code:
              type: string
              description: Country code
            country_code_alpha3:
              type: string
              description: Country code alpha 3
        invoice_relations:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
                format: uuid
                description: Relation ID
              type:
                type: string
                description: Relation type
              related_invoice_id:
                type: string
                format: uuid
                description: Related invoice ID
        invoice_entities:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
                format: uuid
                description: Entity ID
              type:
                type: string
                description: Entity type
        invoice_lines:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
                format: uuid
                description: Invoice line ID
              description:
                type: string
                description: Line description
              quantity:
                type: number
                description: Line quantity
              unit_price:
                type: number
                description: Unit price
              total_amount:
                type: number
                description: Total amount
              line_taxes:
                type: array
                items:
                  type: object
                  properties:
                    id:
                      type: string
                      format: uuid
                      description: Line tax ID
                    tax_type:
                      type: string
                      description: Tax type
                    tax_rate:
                      type: number
                      description: Tax rate
                    tax_exemption_code:
                      type: string
                      description: Tax exemption code
              line_entities:
                type: array
                description: Entities associated with the invoice line
                items:
                  type: object
                  properties:
                    type:
                      type: string
                      description: Entity type
                      example: TICKET
                    entity_id:
                      type: string
                      description: Entity ID
                      example: sdgdv5uonig2p7va15hk8znmmln6e83k
    InvoiceLegalInfo:
      type: object
      properties:
        legal_tax_id:
          type: string
          description: Legal tax ID
        legal_name:
          type: string
          description: Legal name
        commercial_name:
          type: string
          description: Commercial name
        address:
          type: string
          description: Address
        postal_code:
          type: string
          description: Postal code
        city:
          type: string
          description: City
        email:
          type: string
          description: Email
        phone:
          type: string
          description: Phone
        mercantile_register:
          type: string
          description: Mercantile register
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