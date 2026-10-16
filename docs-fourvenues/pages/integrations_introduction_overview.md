> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

***

title: "Overview"
description: "The Integrations API gives you programmatic access to your own Fourvenues data: events, tickets, lists, payments, refunds and wallet movements."
\---## What is the Integrations API?

The **Integrations API** is designed for **venue owners and operators** who need programmatic access to their own data inside Fourvenues. Use it to build custom tooling on top of your venues — from check-in scanners to finance dashboards.

<Info>
  Looking to sell tickets on behalf of multiple venues as a marketplace? You probably want the [Channel Manager API](/channel-manager/introduction/overview) instead.
</Info>

## Key concepts

| Concept | Description |
| - | - |
| **Ownership** | Your API key only has access to the venues that belong to your account. |
| **Read-heavy** | Most endpoints are read-only. Write operations are limited to check-in actions and booking status updates. |
| **Event-scoped** | Tickets, lists, bookings and passes are always scoped to a specific event. |
| **Alpha / Prod** | Two separate environments with isolated data (see [Requirements](/integrations/introduction/requirements)). |

## Where to start

<CardGroup cols={2}>
  <Card title="Use Cases" icon="map" href="/integrations/introduction/use-cases">
    End-to-end flows: custom check-in, payments report, datawarehouse sync.
  </Card>

  <Card title="What can I do?" icon="list-check" href="/integrations/introduction/what-can-i-do">
    Full map of supported actions and the endpoints that back them.
  </Card>

  <Card title="Requirements" icon="shield-check" href="/integrations/introduction/requirements">
    Auth, environments, rate limits, conditional fields and pagination.
  </Card>

  <Card title="API Reference" icon="code" href="/integrations/api-reference/events/get-events">
    Full endpoint reference with interactive playground.
  </Card>
</CardGroup>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.