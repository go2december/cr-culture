---
description: Use Headroom with the repo's Ponytail rules in the lightest possible mode.
---

# /headroom - Headroom Minimal Mode

$ARGUMENTS

---

## Task

Use Headroom together with the repo's Ponytail overlay without adding heavy runtime wiring.

## Default Behavior

1. Read the repo rules first:
   - `.agent/rules/GEMINI.md`
   - `docs/01_Project_Core/Headroom_Minimal_Mode.md`
2. Prefer MCP-only setup.
3. Keep the proxy optional unless full traffic compression is explicitly needed.
4. Do not add app code or runtime dependencies just to enable Headroom.

## Recommended Commands

```bash
pip install "headroom-ai[mcp]"
headroom mcp install
headroom mcp status
```

## Optional Proxy Mode

Use only when required for full traffic compression:

```bash
headroom proxy
```

If the proxy is used, keep it external and ephemeral. Do not wire it into the app unless the task specifically needs that behavior.

## Output

Respond with:

- whether MCP-only is enough,
- whether the proxy is actually needed,
- and the smallest next step.
