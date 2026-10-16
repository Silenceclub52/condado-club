> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

***

title: "Overview"
description: "The Channel Manager API lets marketplaces and collaborators list events, sell tickets and manage guest lists across multiple Fourvenues venues."
\---## What is the Channel Manager API?

The **Channel Manager API** is designed for **marketplaces, ticket platforms, and multi-venue operators** — anyone who sells or manages services on behalf of Fourvenues venue owners. As a channel, you operate through a partnership established by the venue, which controls what you can access and sell.

<Info>
  Managing your own venue's data directly? You probably want the [Integrations API](/integrations/introduction/overview) instead.
</Info>

## Key concepts

| Concept | Description |
| - | - |
| **Channel** | Your identity in the system — a marketplace or partner entity authorized by one or more venues. |
| **Host** | A Fourvenues venue owner who has granted your channel access to their events. |
| **Ownership** | Your API key only sees events from venues that have added you as a partner. |
| **Read + Write** | Supports reading events/rates and creating tickets, lists and checkout sessions. |
| **Webhooks** | Receive real-time payment confirmations and refund notifications via webhooks. |

## Key difference vs Integrations API

| | Integrations API | Channel Manager API |
| - | - | - |
| **Who uses it** | Venue owners / operators | Marketplaces / collaborators |
| **Data access** | Own venues only | All partner venues (hosts) |
| **Can sell tickets** | No | Yes (via checkout) |
| **Can create lists** | No | Yes |
| **Webhooks** | No | Yes |
| **Base URL** | `api-alpha.fourvenues.com/integrations` | `channels-service-alpha.fourvenues.com` |

## Where to start

<CardGroup cols={2}>
  <Card title="Use Cases" icon="map" href="/channel-manager/introduction/use-cases">
    End-to-end flows: list events, create guest lists, run a checkout.
  </Card>

  <Card title="What can I do?" icon="list-check" href="/channel-manager/introduction/what-can-i-do">
    Full map of supported actions and the endpoints that back them.
  </Card>

  <Card title="Requirements" icon="shield-check" href="/channel-manager/introduction/requirements">
    Auth, environments, conditional fields, webhooks and rate limits.
  </Card>

  <Card title="API Reference" icon="code" href="/channel-manager/api-reference/auth/get-auth-information">
    Full endpoint reference with interactive playground.
  </Card>
</CardGroup>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.