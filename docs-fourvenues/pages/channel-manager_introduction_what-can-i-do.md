> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# What can i do

***

title: "What Can I Do?"
description: "Full map of supported actions and the Channel Manager API endpoints that back them."
\---Use this page as a quick reference to find the right endpoint for any action you want to build in your marketplace or channel integration.

## Authentication & Channel Info

| Action | Method | Endpoint | Notes |
| - | - | - | - |
| Verify API key + list partner venues | `GET` | `/auth` | Returns your channel profile and all authorized hosts |

## Events

| Action | Method | Endpoint | Notes |
| - | - | - | - |
| List all events | `GET` | `/events` | Filter by `start_date`, `end_date`, `organization_id`, `location_id` |
| Get event by ID | `GET` | `/events/{id}` | Includes `ticket_rates` with pricing |
| Get event by slug | `GET` | `/events/slug/{slug}` | Useful when you store slugs in your DB |

## Ticket Rates

| Action | Method | Endpoint | Notes |
| - | - | - | - |
| List all ticket rates | `GET` | `/ticket-rates` | Filter by `event_id` |
| Get ticket rate by ID | `GET` | `/ticket-rates/{id}` | — |
| Get ticket rate by slug | `GET` | `/ticket-rates/slug/{slug}` | — |
| Get pricing info for a quantity | `GET` | `/ticket-rates/{id}/pricing?quantity=N` | Returns total price including fees |

## Tickets

| Action | Method | Endpoint | Notes |
| - | - | - | - |
| List tickets | `GET` | `/tickets` | Filter by `event_id` |
| Create a ticket (without checkout) | `POST` | `/tickets` | For cases where payment is handled externally |
| Checkout — create payment session | `POST` | `/tickets/checkout` | Redirects user to Fourvenues payment page |
| Get ticket by ID | `GET` | `/tickets/{id}` | — |
| Get ticket by code | `GET` | `/tickets/code/{code}` | — |
| Refund a ticket | `POST` | `/tickets/{id}/refund` | Triggers partial or full refund |

## List Rates (guest lists)

| Action | Method | Endpoint | Notes |
| - | - | - | - |
| List all list rates | `GET` | `/list-rates` | Filter by `event_id` |
| Get list rate by ID | `GET` | `/list-rates/{id}` | Includes `requires_full_name`, `requires_email`, `requires_phone` flags |
| Get list rate by slug | `GET` | `/list-rates/slug/{slug}` | — |

## Lists (guest list entries)

| Action | Method | Endpoint | Notes |
| - | - | - | - |
| List entries | `GET` | `/lists` | Filter by `event_id` |
| Create a list entry | `POST` | `/lists` | Required fields depend on the list rate config |
| Get list entry by ID | `GET` | `/lists/{id}` | — |
| Get list entry by code | `GET` | `/lists/code/{code}` | — |

## Locations

| Action | Method | Endpoint | Notes |
| - | - | - | - |
| List all locations | `GET` | `/locations` | All locations accessible to your channel |
| Get a location | `GET` | `/locations/{id}` | — |

## Organizations

| Action | Method | Endpoint | Notes |
| - | - | - | - |
| List all organizations | `GET` | `/organizations` | All venues (hosts) partnered with your channel |
| Get organization by ID | `GET` | `/organizations/{id}` | — |
| Get organization by slug | `GET` | `/organizations/slug/{slug}` | — |

## Payments

| Action | Method | Endpoint | Notes |
| - | - | - | - |
| List payments | `GET` | `/payments` | Payments from your channel's transactions |
| Get payment by ID | `GET` | `/payments/{id}` | — |

## Webhooks

| Action | Method | Endpoint | Notes |
| - | - | - | - |
| List webhook endpoints | `GET` | `/webhooks` | — |
| Create a webhook endpoint | `POST` | `/webhooks` | Subscribe to `payment.success`, `ticket.refund_request`, etc. |
| Delete a webhook endpoint | `DELETE` | `/webhooks/{id}` | — |

\---## Limitations

\- **No check-in** — check-in operations are handled by the venue via the Integrations API or the Fourvenues app. Your channel can read ticket/list status but cannot mark entries.
\- **No event creation** — venue owners manage events through the Fourvenues dashboard.
\- **Scoped to partners only** — you can only see events from venues that have explicitly added your channel as a partner.
\- **Ticket creation vs checkout** — `POST /tickets` creates a ticket without a payment flow. Use `POST /tickets/checkout` for buyer-facing purchase flows that require payment processing.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.