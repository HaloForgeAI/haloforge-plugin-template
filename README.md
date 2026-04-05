# HaloForge Plugin Template

A minimal Level 2 plugin template for [HaloForge](https://github.com/HaloForgeAI/HaloForge). Clone this repo to start building your own plugin.

## Quick Start

1. Clone this template:
   ```bash
   git clone https://github.com/HaloForgeAI/haloforge-plugin-template my-plugin
   cd my-plugin
   ```

2. Update identifiers:
   - `manifest.json` — change `id`, `name`, `description`, `author`
   - `backend/Cargo.toml` — change `name`, `description`
   - `backend/src/lib.rs` — update `metadata()` and IPC commands

3. Build the backend:
   ```bash
   cd backend
   cargo build --release
   ```

4. Build the frontend:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

5. Package with `hf-pack`:
   ```bash
   hf-pack .
   ```

## Structure

```
haloforge-plugin-template/
├── backend/
│   ├── Cargo.toml          # Rust crate config
│   └── src/
│       └── lib.rs           # Plugin entry point + IPC commands
├── frontend/
│   ├── package.json         # npm dependencies
│   └── HelloToolbarBadge.tsx # React component for toolbar slot
├── manifest.json             # Plugin manifest
├── LICENSE
└── README.md
```

## What This Template Demonstrates

- **Level 2 slot injection** — injects a component into the `devkit.toolbar` slot
- **IPC command** — registers `hello_greet` backend command callable from frontend
- **`declare_plugin!` macro** — generates FFI entry points for dynamic loading

## Dependencies

| Package | Registry | Purpose |
|---------|----------|---------|
| `haloforge-plugin-api` | [crates.io](https://crates.io/crates/haloforge-plugin-api) | Rust plugin traits and types |
| `@haloforge/plugin-sdk` | [npm](https://www.npmjs.com/package/@haloforge/plugin-sdk) | Frontend SDK (hooks, IPC, registration) |

## Capability Levels

| Level | Type | Description |
|-------|------|-------------|
| 0 | Module | Full sidebar module |
| 1 | Module Feature | Tab inside an existing module |
| 2 | UI Extension | Inject into UI slots (this template) |
| 3 | AI Assistant | Custom AI assistant persona |
| 4 | Service | Workflow step types & background services |

## License

MIT
