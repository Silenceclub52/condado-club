> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

> Welcome to the Reseller API Documentation site! Here you'll be able to find all the information regarding the Reseller API.

The Reseller API allows you to integrate your reseller system with Fourvenues to do a secure resell.

It has two parts, and they serve different moments of the same flow:

* **Swap operations** — `validate` and `swap` — resolve a ticket from its barcode: whether it can be resold, and the exchange itself.
* **Version 2** is read-only and gives you the catalogue around that flow: the organizations your key covers, their events on sale with rates and stock, and the tickets a buyer holds.

Version 2 lives under `/resellers/v2`. The swap operations keep their own paths and are not versioned.

## Conventions

* **Envelope.** Every response is `{ "data": ..., "success": true }`. Paginated listings add `has_more`.
* **Pagination.** `limit` (1–100, default 50) and `offset` (default 0). `has_more: true` means another page follows.
* **Dates.** ISO 8601 in UTC, for example `2026-10-03T21:00:00.000Z`.
* **Query parameters.** Only the documented ones are accepted; anything else answers `400`.
* **Errors.** HTTP status plus a JSON body carrying the reason.
* **Evolution.** Changes within v2 are always additive. Ignore the fields you do not use.

## What the catalogue does not include

There is no endpoint that lists every ticket of your authorized organizations. Two reasons: it would expose
buyers who take no part in the resale, and the volume — hundreds of thousands of records per organization —
is not something to serve or keep in sync by polling. Access to tickets is always bounded: the holder brings
them in [Tickets of a buyer](/reseller/api-reference/v2/get-v2-tickets), which requires their email, or they
are resolved one at a time.

To know whether a ticket you already published is still valid — not cancelled, not refunded, not scanned —
use [Validate reseller barcode](/reseller/api-reference/validate-reseller-barcode) with its barcode. It is the
precise source, because it also evaluates every rule that would block the swap. Do not re-run the buyer search
for that check.

<Note>
  A ticket cancellation webhook is coming, so you will be told the moment a ticket is cancelled or refunded
  instead of asking. Until then, checking your published tickets periodically with `validate` covers the case.
</Note>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.