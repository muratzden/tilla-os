# ADR-0001: JSON Persistence Before MariaDB

## Status

Accepted

## Date

2026-06-15

---

## Context

TILLA-OS requires persistence for:

* Users
* Sessions
* Workspaces
* Memberships
* Marketplace entitlements
* Brand setup data

A relational database such as MariaDB was considered early in development.

However, introducing a database during the architecture discovery phase would increase deployment complexity and reduce iteration speed.

---

## Decision

The system will initially use JSON persistence through storage adapters.

Business logic must not directly depend on the storage implementation.

All persistence access must be routed through adapter interfaces.

Current implementation:

* AuthStorageAdapter
* JsonAuthStorageAdapter
* Adapter delegation through user-storage

---

## Consequences

### Positive

* Faster development
* Easier local testing
* No database provisioning
* Lower operational complexity
* Storage abstraction validated before database integration

### Negative

* Limited scalability
* No transactional guarantees
* File-based persistence risks
* Concurrency limitations

---

## Future Migration Path

Planned storage evolution:

```text
JSON Storage
        ↓
Storage Adapter Layer
        ↓
MariaDB Adapter
        ↓
Production Persistence
```

The MariaDB adapter must be introduced without changing business logic or API contracts.

---

## Result

The adapter architecture has been validated and the project can migrate to MariaDB in a future sprint with minimal impact on domain logic.
