> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# What can i do

***

title: "What Can I Do?"
description: "Full map of supported actions and the Integrations API endpoints that back them."
\---Use this page as a quick reference to find the right endpoint for any action you want to automate.

## Events

| Action | Method | Endpoint | Notes |
| - | - | - | - |
| List all events | `GET` | `/integrations/events/` | Supports `start_date`, `end_date` filters |
| Get a single event | `GET` | `/integrations/events/{id}` | By event `_id` |

## Tickets

| Action | Method | Endpoint | Notes |
| - | - | - | - |
| List tickets for an event | `GET` | `/integrations/tickets/` | Requires `event_id`; supports `start_date`, `end_date`, `date_field` |
| Get a ticket by ID | `GET` | `/integrations/tickets/{id}` | — |
| Get a ticket by code (QR) | `GET` | `/integrations/tickets/code/{code}` | Useful at scan time |
| Check in by ID | `PUT` | `/integrations/tickets/{id}/checkin` | Body: `enter`, `entry_date` |
| Check in by code | `PUT` | `/integrations/tickets/code/{code}/checkin` | Body: `enter`, `entry_date` |
| List ticket rates | `GET` | `/integrations/tickets/rates/` | Requires `event_id` |

## Lists (guest lists)

| Action | Method | Endpoint | Notes |
| - | - | - | - |
| List entries for an event | `GET` | `/integrations/lists/` | Requires `event_id` |
| Get a list entry by ID | `GET` | `/integrations/lists/{id}` | — |
| Get a list entry by code | `GET` | `/integrations/lists/code/{code}` | — |
| Check in by ID | `PUT` | `/integrations/lists/{id}/checkin` | Body: `enter`, `entry_date` |
| Check in by code | `PUT` | `/integrations/lists/code/{code}/checkin` | Body: `enter`, `entry_date` |
| List rates for lists | `GET` | `/integrations/lists/rates/` | Requires `event_id` |

## Passes

| Action | Method | Endpoint | Notes |
| - | - | - | - |
| List passes | `GET` | `/integrations/passes/` | Requires `event_id` |
| Get a pass by ID | `GET` | `/integrations/passes/{id}` | — |
| Get a pass by code | `GET` | `/integrations/passes/code/{code}` | — |
| Check in by ID | `PUT` | `/integrations/passes/{id}/checkin` | Body: `enter`, `entry_date` |
| Check in by code | `PUT` | `/integrations/passes/code/{code}/checkin` | Body: `enter`, `entry_date` |
| List pass rates | `GET` | `/integrations/passes/rates/` | Requires `event_id` |

## Bookings

| Action | Method | Endpoint | Notes |
| - | - | - | - |
| List bookings for an event | `GET` | `/integrations/bookings/` | Requires `event_id` and `date` |
| Update booking status | `PUT` | `/integrations/bookings/{id}/status` | — |
| Update booking products | `PUT` | `/integrations/bookings/{id}/products` | — |

## Payments & Refunds

| Action | Method | Endpoint | Notes |
| - | - | - | - |
| List payments | `GET` | `/integrations/payments/` | Filter by `event_id` |
| List refunds | `GET` | `/integrations/refunds/` | Filter by `event_id` |

## Wallet

| Action | Method | Endpoint | Notes |
| - | - | - | - |
| List wallet movements | `GET` | `/integrations/wallet-movements/` | Filter by `event_id` |

## Users & Channels

| Action | Method | Endpoint | Notes |
| - | - | - | - |
| List users | `GET` | `/integrations/users/` | — |
| List channels | `GET` | `/integrations/channels/` | Returns channels associated with your API key |

## Subscriptions

| Action | Method | Endpoint | Notes |
| - | - | - | - |
| Create a subscription | `POST` | `/integrations/subscriptions/` | — |

\---## Limitations

\- **No ticket creation** — ticket sales happen through Fourvenues checkout or the Channel Manager API.
\- **No event creation or editing** — the Integrations API is read-heavy; event management happens in the Fourvenues dashboard.
\- **No refund triggering** — refunds are initiated from the dashboard; the API lets you read them.
\- **Check-in only** — the only write operations on tickets/lists/passes are check-in status updates.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.