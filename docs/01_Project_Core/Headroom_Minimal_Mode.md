# Headroom Minimal Mode

This project can use Headroom without a heavy install or app-level wiring.

## Recommended path

1. Install only the MCP extras first:

```bash
pip install "headroom-ai[mcp]"
```

2. Register the MCP server for your agent:

```bash
headroom mcp install
headroom mcp status
```

3. Keep the proxy off unless you explicitly need full traffic compression:

```bash
# Optional, only when you want proxy-backed compression
headroom proxy
```

## Why this is the default here

- No repo code changes are required just to use Headroom for retrieval or stats.
- MCP-only setup is the smallest useful install path.
- The proxy is useful, but it adds process overhead and is best treated as optional.
- This keeps the project aligned with the existing rules-first workflow in `.agent/rules/GEMINI.md`.

## When to use the proxy

Use the proxy only if you need:

- automatic compression for all traffic,
- cross-session compression behavior,
- or a full local proxy workflow for a specific agent.

For day-to-day work in this repo, prefer MCP-only setup first.
