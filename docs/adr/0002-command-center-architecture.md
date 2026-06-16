# ADR 002 — Command Center Architecture

## Status

Accepted

## Date

2026-06-16

---

## Context

Early TILLA-OS dashboard iterations evolved around individual tools.

The interface gradually became centered around:

- Decision generation
- Forms
- Configuration panels
- Operational widgets

While functional, this structure did not reflect the long-term vision of TILLA-OS as a Brand Operating System.

The dashboard behaved as a collection of tools rather than a unified operating environment.

---

## Decision

The dashboard architecture will adopt a Command Center model.

Primary hierarchy:

Mission Control
↓
Executive Status
↓
System Signals
↓
Workspace System
↓
Current Module
↓
Operational Content

Decision generation is no longer considered the center of the application.

Decision Engine becomes one workspace within the operating system.

---

## Workspace Architecture

Operational Layer:

- Governance
- Audit
- Decision
- Studios
- Marketplace

Knowledge Layer:

- Foundation
- Manifesto

Knowledge modules are separated from operational modules.

---

## Rationale

This architecture:

- Better reflects the Brand Operating System vision.
- Improves executive visibility.
- Reduces dashboard density.
- Separates operational workflows from brand memory.
- Creates a clearer foundation for future authorization and governance layers.

---

## Consequences

Positive:

- Stronger product identity.
- Better information hierarchy.
- More scalable workspace model.
- Improved investor and portfolio presentation.

Trade-offs:

- Additional navigation layer introduced.
- Existing users may require adaptation to the new structure.

---

## Result

TILLA-OS now follows a Command Center architecture instead of a tool-centric dashboard architecture.