#!/usr/bin/env node

import('../dist/index.js').catch((error) => {
  console.error('LemGen MCP failed to start:', error);
  process.exit(1);
});
