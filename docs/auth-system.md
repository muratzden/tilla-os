# Authentication System

## Overview

The Authentication System is responsible for:

* User registration
* User login
* User logout
* Session management
* Current user resolution
* Workspace membership resolution

The current implementation uses adapter-based JSON persistence.

---

## Core Components

### User

Represents an authenticated account.

Responsibilities:

* Identity
* Email ownership
* Authentication credentials

### Session

Represents an active login session.

Responsibilities:

* Session token
* Expiration tracking
* User association

### Membership

Connects users to workspaces.

Responsibilities:

* Workspace access
* Role assignment
* Workspace isolation

---

## Authentication Flow

```text
Register
    ↓
User Created
    ↓
Workspace Created
    ↓
Membership Created
    ↓
Session Created
    ↓
Cookie Issued
```

---

## Session Management

Cookie:

```text
tilla_session
```

The cookie identifies the active session and is resolved through the authentication service.

---

## Storage Architecture

Current implementation:

```text
AuthStorageAdapter
        ↓
JsonAuthStorageAdapter
        ↓
JSON Persistence
```

This allows future migration to MariaDB without modifying business logic.

---

## Security Principles

* Session-based authentication
* Adapter isolation
* Workspace separation
* Expiration validation
* Storage abstraction

---

## Future Roadmap

Planned improvements:

* MariaDB adapter
* Password hashing upgrades
* Password reset flow
* Email verification
* Multi-factor authentication
