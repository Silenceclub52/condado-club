> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get list by id

> Get a list by its identifier.



## OpenAPI

````yaml get /lists/{listId}
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
  /lists/{listId}:
    get:
      tags:
        - Lists
      summary: Get list by ID
      description: Get list by ID
      operationId: getListById
      parameters:
        - name: listId
          in: path
          required: true
          description: List id
          schema:
            type: string
          example: abcde12345
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    $ref: '#/components/schemas/ListPrice'
                  success:
                    type: boolean
        '401':
          description: Unauthorized
        '404':
          description: List not found
      security:
        - ApiKey: []
components:
  schemas:
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