/**
 * Plugin entry point — registers the Hello plugin with HaloForge.
 *
 * This file is the IIFE bundle entry. When loaded by the host app it
 * immediately calls registerPlugin() so the component becomes available
 * in the slot system.
 */
import { definePlugin, registerPlugin } from "@haloforge/plugin-sdk";
import { HelloToolbarBadge } from "./HelloToolbarBadge";

const PLUGIN_ID = "dev.haloforge.hello";

const plugin = definePlugin({
  slots: {
    "devkit.toolbar": HelloToolbarBadge,
  },
});

registerPlugin(PLUGIN_ID, plugin);
