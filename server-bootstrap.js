const fs = require("fs");
const path = require("path");

const logFile = path.resolve(process.cwd(), "node-errors.log");
function appendLog(msg) {
  try {
    fs.appendFileSync(logFile, `${new Date().toISOString()} - ${msg}\n`);
  } catch (e) {
    // best-effort only
  }
}

appendLog("=== server-bootstrap starting ===");
appendLog(
  `pid=${process.pid} execArgv=${JSON.stringify(process.execArgv)} argv=${JSON.stringify(process.argv)}`,
);

process.on("uncaughtException", (err) => {
  appendLog(
    "uncaughtException: " + (err && err.stack ? err.stack : String(err)),
  );
  // flush and allow process to exit with non-zero code
  try {
    fs.writeSync(
      1,
      `uncaughtException: ${err && err.stack ? err.stack : String(err)}\n`,
    );
  } catch (_) {}
  // do not swallow — exit so supervisor behavior remains unchanged
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  appendLog(
    "unhandledRejection: " +
      (reason && reason.stack ? reason.stack : String(reason)),
  );
  try {
    fs.writeSync(
      1,
      `unhandledRejection: ${reason && reason.stack ? reason.stack : String(reason)}\n`,
    );
  } catch (_) {}
});

// Capture process warnings and multiple resolves to help diagnose intermittent errors
process.on("warning", (warning) => {
  appendLog(
    "warning: " + (warning && warning.stack ? warning.stack : String(warning)),
  );
  try {
    fs.writeSync(
      1,
      `warning: ${warning && warning.stack ? warning.stack : String(warning)}\n`,
    );
  } catch (_) {}
});

process.on("multipleResolves", (type, promise, reason) => {
  appendLog(
    `multipleResolves: type=${type} reason=${reason && reason.stack ? reason.stack : String(reason)}`,
  );
  try {
    fs.writeSync(
      1,
      `multipleResolves: type=${type} reason=${reason && reason.stack ? reason.stack : String(reason)}\n`,
    );
  } catch (_) {}
});

process.on("rejectionHandled", (promise) => {
  appendLog("rejectionHandled: " + String(promise));
});

// Log termination signals so we can correlate with external supervisors
["SIGINT", "SIGTERM", "SIGHUP"].forEach((sig) => {
  process.on(sig, () => {
    appendLog(`signal:${sig} received`);
    try {
      fs.writeSync(1, `signal:${sig} received\n`);
    } catch (_) {}
    // allow default behavior after logging
    process.exit(0);
  });
});

// Forward simple health ping to log at startup
appendLog("bootstrap handlers installed");

// Require the generated standalone server
try {
  require("./.next/standalone/server.js");
} catch (e) {
  appendLog("require server failed: " + (e && e.stack ? e.stack : String(e)));
  throw e;
}
