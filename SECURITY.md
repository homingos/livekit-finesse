# Security

## Reporting a vulnerability

Please don't open a public issue for a security problem. Report it privately through GitHub
instead: open the repository's **Security** tab and choose **Report a vulnerability**. Only the
maintainers can see the report.

Include what you found, how to reproduce it, and the plugin version (`import { VERSION } from
"@flamai/livekit-plugin-finesse"`). We'll confirm we received it and keep you updated while we
fix it.

## Supported versions

Fixes go into the latest release. Upgrade to it to get them.

## API keys

If you think a Finesse API key has leaked, revoke it on the
[API keys page](https://finesse.flamapp.ai/dashboard/settings?tab=api-keys) of the Finesse
dashboard and create a new one.
