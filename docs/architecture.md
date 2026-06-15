# TILLA-OS Architecture

TILLA-OS is structured as a layered brand operating system.

## Core Flow

```text
User
↓
Authentication
↓
Workspace
↓
Marketplace Entitlements
↓
Brand Setup
↓
Manifesto Intelligence
↓
Constitution Governance
↓
Decision Engine
↓
Memory and Consistency
↓
Output Generation
```

## Main Layers

### 1. Authentication Layer

Handles user registration, login, logout, session cookies, and current user resolution.

### 2. Workspace Layer

Connects users to workspaces through memberships and stores workspace-specific settings.

### 3. Marketplace Layer

Manages package availability, entitlements, installation, activation, and package resolution.

### 4. Brand Foundation Layer

Stores brand setup, profile, principles, archetypes, worlds, scenes, and manifesto data.

### 5. Governance Layer

Prevents brand decisions that conflict with locked principles and forbidden directions.

### 6. Decision Intelligence Layer

Generates brand decisions using context, scoring, reasoning, confidence, and rejected alternatives.

### 7. Memory Layer

Tracks previous decisions, consistency, distribution patterns, and long-term brand direction.

### 8. Output Layer

Produces localized and brand-aligned outputs through language packs, output packs, and renderers.

## Current Persistence Strategy

The current version uses JSON persistence through storage adapters.

The architecture is intentionally adapter-based so the storage layer can later move to MariaDB without rewriting the business logic.

## Design Goals

* Type-safe domain modeling
* Workspace isolation
* Marketplace extensibility
* Governance before generation
* Long-term brand memory
* Replaceable persistence layer
