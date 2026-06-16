# Workspace System

## Overview

The Workspace System separates users, brand settings, marketplace activations, and future billing boundaries.

A workspace represents the operational container of a brand or organization.

---

## Responsibilities

The Workspace System is responsible for:

- Workspace creation
- Workspace settings persistence
- Brand setup persistence
- Membership based access
- Workspace scoped marketplace activation
- Future multi-tenant isolation

---

## Core Concepts

### Workspace

Represents a brand, organization, project, or tenant.

A workspace owns:

- Brand setup
- Marketplace activations
- Language configuration
- Output preferences
- Future billing and subscription state

### Membership

Connects a user to a workspace.

A membership defines:

- User access
- Role
- Workspace relationship

### Workspace Settings

Stores workspace-specific configuration.

Current examples:

- Brand setup
- Installed marketplace packages
- Active output package
- Language choices

---

## Workspace Flow

```text
User
    ↓
Membership
    ↓
Workspace
    ↓
Workspace Settings
    ↓
Brand Setup
    ↓
Marketplace Activation
```

---

## Persistence

Current persistence:

```text
Workspace Settings
        ↓
JSON Storage
```

Future persistence:

```text
Workspace Settings
        ↓
Storage Adapter
        ↓
MariaDB
```

---

## Design Purpose

The workspace model exists to prevent the system from becoming a single-brand prototype.

It prepares TILLA-OS for:

- Multiple brands
- Multiple users
- Role based access
- Marketplace personalization
- SaaS productization

---

## Future Roadmap

Planned improvements:

- Workspace invitation flow
- Role based permissions
- Organization level billing
- Workspace switching
- Team collaboration
