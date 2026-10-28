# Changelog

## 0.1.1

- `@types/ws` is now a dependency, so projects that type-check libraries (`skipLibCheck: false`)
  no longer fail on the `ws` types in this package's declarations.
- README: the banner loads on npm in dark mode too, and the note about the LiveKit PR renders as
  plain text on npm.

## 0.1.0

- First release: Finesse text-to-speech for LiveKit Agents in Node.js. Streams the agent's
  reply over the Finesse realtime WebSocket, cancels it on the server when the user interrupts,
  pools connections across replies, and supports 8 kHz telephony output up to 48 kHz.
