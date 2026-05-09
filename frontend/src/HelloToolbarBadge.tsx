/**
 * Hello plugin — DevKit toolbar badge (Level 2 slot: devkit.toolbar).
 *
 * Clicking it calls the hello_greet IPC command and shows a 3-second popup.
 * It also demonstrates the public host navigation + theme hooks.
 */
import { useState } from "react";
import { invokePlugin, useHostNavigation, useHostTheme } from "@haloforge/plugin-sdk";

export function HelloToolbarBadge() {
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { activeModule, openSettingsTab } = useHostNavigation();
  const { theme } = useHostTheme();
  const isDark = theme.type === "dark";

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await invokePlugin<{ message: string }>("hello_greet", {
        name: "HaloForge",
      });
      setMsg(res.message);
      setTimeout(() => setMsg(null), 3000);
    } catch (err) {
      console.error("[HelloPlugin] IPC error:", err);
      setMsg(`IPC Error: ${err instanceof Error ? err.message : String(err)}`);
      setTimeout(() => setMsg(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center gap-1.5">
      <button
        onClick={handleClick}
        disabled={loading}
        title={`Hello plugin — active module: ${activeModule}`}
        className={`flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-medium border transition-colors disabled:opacity-50 select-none ${
          isDark
            ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
            : "bg-primary/15 text-primary border-primary/30 hover:bg-primary/25"
        }`}
      >
        <span>Hello</span>
        <span className="opacity-70">{activeModule}</span>
      </button>
      <button
        onClick={() => openSettingsTab("plugins")}
        title="Open plugin settings"
        className="rounded border border-border px-1.5 py-0.5 text-[10px] text-foreground-secondary transition-colors hover:bg-surface hover:text-foreground"
      >
        Settings
      </button>
      {msg && (
        <div className="absolute top-full left-0 mt-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-foreground shadow-lg whitespace-nowrap z-50">
          {msg}
        </div>
      )}
    </div>
  );
}
