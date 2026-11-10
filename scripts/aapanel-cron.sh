#!/usr/bin/env bash
# ==============================================================================
# 2bet - Daily Sports Predictions Refresh Script for aaPanel Cron / Linux Crontab
# ==============================================================================
# Usage in aaPanel:
#   Type of Task : Shell Script
#   Name of Task : 2bet Daily Sports Predictions
#   Execution    : Daily at 00:05 (Asia/Manila time or server local)
#
# Script command in aaPanel:
#   bash /www/wwwroot/YOUR_PROJECT_DIR/scripts/aapanel-cron.sh
# ==============================================================================

set -e

# 1. Resolve project directory (defaults to parent directory of this script)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="${PROJECT_DIR:-$(dirname "$SCRIPT_DIR")}"

cd "$PROJECT_DIR" || {
  echo "[ERROR] Failed to navigate to project directory: $PROJECT_DIR"
  exit 1
}

# 2. Automatically locate the Node.js binary (supports aaPanel Node Manager, NVM, and system Node)
NODE_BIN=""

if [ -n "$NODE_PATH" ] && [ -x "$NODE_PATH" ]; then
  NODE_BIN="$NODE_PATH"
elif command -v node >/dev/null 2>&1; then
  NODE_BIN="$(command -v node)"
else
  # Check aaPanel Node Version Manager paths
  AAPANEL_NODE=$(ls -1d /www/server/nodejs/v*/bin/node 2>/dev/null | sort -V | tail -n 1 || true)
  if [ -n "$AAPANEL_NODE" ] && [ -x "$AAPANEL_NODE" ]; then
    NODE_BIN="$AAPANEL_NODE"
  # Check standard system paths
  elif [ -x "/usr/local/bin/node" ]; then
    NODE_BIN="/usr/local/bin/node"
  elif [ -x "/usr/bin/node" ]; then
    NODE_BIN="/usr/bin/node"
  # Check NVM default installation
  elif [ -s "$HOME/.nvm/nvm.sh" ]; then
    export NVM_DIR="$HOME/.nvm"
    # shellcheck disable=SC1091
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    NODE_BIN="$(command -v node || true)"
  fi
fi

if [ -z "$NODE_BIN" ] || [ ! -x "$NODE_BIN" ]; then
  echo "[ERROR] Node.js binary could not be found! Please specify NODE_PATH or install Node.js."
  echo "Current PATH: $PATH"
  exit 1
fi

# 3. Ensure data directory exists
mkdir -p "$PROJECT_DIR/data"

LOG_FILE="$PROJECT_DIR/data/predictions-cron.log"
TIMESTAMP="$(date '+%Y-%m-%d %H:%M:%S')"

echo "==================================================================" >> "$LOG_FILE"
echo "[$TIMESTAMP] Starting daily predictions refresh..." >> "$LOG_FILE"
echo "Project Dir : $PROJECT_DIR" >> "$LOG_FILE"
echo "Node Binary : $NODE_BIN ($("$NODE_BIN" -v))" >> "$LOG_FILE"
echo "==================================================================" >> "$LOG_FILE"

# 4. Execute the refresh pipeline and pipe output to log file and stdout
"$NODE_BIN" "$PROJECT_DIR/scripts/refresh-daily-predictions.mjs" "$@" 2>&1 | tee -a "$LOG_FILE"
EXIT_CODE=${PIPESTATUS[0]}

FINISHED_TIMESTAMP="$(date '+%Y-%m-%d %H:%M:%S')"
if [ "$EXIT_CODE" -eq 0 ]; then
  echo "[$FINISHED_TIMESTAMP] Daily predictions refresh completed successfully." >> "$LOG_FILE"
else
  echo "[$FINISHED_TIMESTAMP] Daily predictions refresh failed with exit code $EXIT_CODE." >> "$LOG_FILE"
fi

exit "$EXIT_CODE"
