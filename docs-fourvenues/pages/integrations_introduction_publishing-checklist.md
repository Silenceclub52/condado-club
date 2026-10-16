> ## Documentation Index
> Fetch the complete documentation index at: https://docs.fourvenues.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Publishing Checklist

> Minimum quality validation before merging documentation changes to the Integrations API or Channel Manager API docs.

Use this checklist before submitting a pull/merge request with documentation changes. Each item must be checked (or explicitly waived with a justification) before the PR can be merged.

## 1. Content accuracy

* [ ] All endpoint paths match the actual API (verify against the OpenAPI spec or a real request).
* [ ] Base URLs are correct for both alpha and production environments.
* [ ] HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) match the actual API.
* [ ] Request/response examples have been manually tested against the alpha environment.
* [ ] No placeholder values left in examples (e.g. `YOUR_TOKEN`, `REPLACE_ME`, `TODO`).

## 2. Required & optional fields

* [ ] Required fields are clearly marked as required in text or in the API reference parameter tables.
* [ ] Conditional required fields are explicitly documented (e.g. list entry fields depend on list rate config; `entry_date` required when `enter: 1`).
* [ ] Optional fields include their default value where applicable.

## 3. Examples

* [ ] Every new endpoint or flow includes at least one request example (`curl` or equivalent).
* [ ] Every request example has a matching response example.
* [ ] Responses show realistic (non-trivial) data — not empty arrays or single-field objects.
* [ ] Amounts in examples are expressed in cents and include a note clarifying the unit.

## 4. Environments

* [ ] Alpha URLs (`api-alpha.fourvenues.com` / `channels-service-alpha.fourvenues.com`) are used in all examples.
* [ ] A callout or note explains the difference between alpha and production where relevant.
* [ ] No production API keys or real credentials appear anywhere in the docs.

## 5. Authentication

* [ ] Every example includes the `X-Api-Key` header.
* [ ] There is a clear explanation of how to obtain an API key (contact email or process).
* [ ] Scoping limitations are documented (own venues only / partner venues only).

## 6. Links & navigation

* [ ] All internal links (`/integrations/...`, `/channel-manager/...`) resolve correctly in the local Mintlify preview.
* [ ] New pages are registered in `docs.json` under the correct navigation group.
* [ ] No broken or 404 links (run `mintlify broken-links` or check manually).

## 7. Mintlify formatting

* [ ] MDX frontmatter includes `title` and `description` for every new file.
* [ ] No unclosed MDX component tags (`<Card>`, `<Info>`, `<Warning>`, etc.).
* [ ] Code blocks include the correct language tag (`bash`, `json`).
* [ ] Tables render correctly (no broken pipe characters or missing headers).

## 8. Use cases & flows

* [ ] At least 2 complete end-to-end flows exist for the Integrations API.
* [ ] At least 1 complete end-to-end flow exists for the Channel Manager API.
* [ ] Each flow follows the same format: context → numbered steps → request → response → notes.

## 9. Errors & edge cases

* [ ] Common error codes (401, 403, 404, 422, 429, 500) are documented with their cause and fix.
* [ ] Conditional logic is explained with a warning/note callout (not buried in prose).
* [ ] Rate limiting guidance is present in the Requirements page of each API.

## 10. Review sign-off

* [ ] At least one person who did **not** write the docs has read through the changes.
* [ ] The reviewer has attempted to follow a use-case flow using only the documentation (no prior knowledge assumed).
* [ ] Any outstanding TODOs or open questions are tracked as issues — not left as inline comments in the docs.

<Info>
  If you waive any checklist item, add a comment to the PR explaining why and when it will be addressed.
</Info>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.