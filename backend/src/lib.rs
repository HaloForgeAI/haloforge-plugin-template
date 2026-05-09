//! Hello World — minimal Level 2 demo plugin.
//!
//! Demonstrates:
//!   - Registering a UI slot injection (Level 2)
//!   - Registering a simple IPC command
//!   - Using the plugin context (logging, settings, db)

use hf_plugin_api::{
    declare_plugin, HaloForgePlugin, IpcRegistrar, LogLevel, PluginContext, PluginError,
    PluginMetadata, PLUGIN_ABI_VERSION,
};
use serde_json::{json, Value};

pub struct HelloPlugin;

impl HelloPlugin {
    pub fn new() -> Self {
        Self
    }
}

impl Default for HelloPlugin {
    fn default() -> Self {
        Self::new()
    }
}

impl HaloForgePlugin for HelloPlugin {
    fn metadata(&self) -> PluginMetadata {
        PluginMetadata {
            id: "dev.haloforge.hello".into(),
            name: "Hello World".into(),
            version: "0.2.0".into(),
            description: "Minimal demo plugin that injects a greeting into the DevKit toolbar with the public SDK.".into(),
            author: "HaloForge Team".into(),
            abi_version: PLUGIN_ABI_VERSION,
        }
    }

    fn on_load(
        &mut self,
        ctx: &dyn PluginContext,
        ipc: &mut dyn IpcRegistrar,
    ) -> Result<(), PluginError> {
        ipc.register(
            "hello_greet",
            Box::new(|args: Value, _ctx: &dyn PluginContext| -> Result<Value, PluginError> {
                let name = args["name"].as_str().unwrap_or("World");
                Ok(json!({ "message": format!("Hello, {name}!") }))
            }),
        )?;

        ctx.log(LogLevel::Info, "Hello World plugin loaded");
        Ok(())
    }

    fn on_unload(&mut self) -> Result<(), PluginError> {
        Ok(())
    }
}

// Required for external plugins — generates the C FFI entry points that
// HaloForge's PluginManager uses to load the dynamic library.
declare_plugin!(HelloPlugin, HelloPlugin::new);
