/**
 * Hello plugin — DevKit toolbar badge (Level 2 slot: devkit.toolbar).
 *
 * Clicking it calls the hello_greet IPC command and shows a 3-second popup.
 */
import { useState } from "react";
import { invokePlugin } from "@haloforge/plugin-sdk";

export function HelloToolbarBadge() {
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    <div className="relative flex items-center">
      <button
        onClick={handleClick}
        disabled={loading}
        title="Hello plugin — click me!"
        className="flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors disabled:opacity-50 select-none"
      >
        <span>Hello</span>
      </button>
      {msg && (
        <div className="absolute top-full left-0 mt-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-foreground shadow-lg whitespace-nowrap z-50">
          {msg}
        </div>
      )}
    </div>
  );
}
