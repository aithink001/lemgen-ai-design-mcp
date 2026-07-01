#!/usr/bin/env sh
if [ -z "$LEMGEN_API_TOKEN" ]; then
  echo "LEMGEN_API_TOKEN is not set. Free LemGen MCP tools still work; generation requires a token from https://lemgen.org."
fi
