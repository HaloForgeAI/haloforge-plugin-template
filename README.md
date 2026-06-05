# HaloForge Plugin Template

A minimal Level 2 plugin template for [HaloForge](https://github.com/HaloForgeAI/HaloForge). Clone this repo to start building your own plugin with the public Rust crate, public frontend SDK, and black-box-friendly host hooks.

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

5. Validate and package with the public packager:
   ```bash
   npx @haloforge/plugin-pack@0.2.13 check .
   npx @haloforge/plugin-pack@0.2.13 pack . --release
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
- **Public host hooks** — demonstrates `useHostNavigation()` and `useHostTheme()`
- **IPC command** — registers `hello_greet` backend command callable from frontend
- **`declare_plugin!` macro** — generates FFI entry points for dynamic loading

## Public host API

This template intentionally avoids private HaloForge bridge access such as `window.__HF_HOST` or hard-coded host IPC commands.

Instead it uses:

- `invokePlugin()` for plugin backend IPC
- `useHostNavigation()` for opening HaloForge settings
- `useHostTheme()` for reading the active host theme

The template manifest also declares:

- `compatibility.min_host_api_version`
- `host_capabilities`
- explicit host permissions for every public host hook it consumes

If your plugin opens plugin routes from deep links, files, or other host surfaces, add a `window` block to the manifest. Use `document_handlers` only when the frontend can really consume the routed resource, for example `/open?path=...`; otherwise leave it out until that route exists.

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
