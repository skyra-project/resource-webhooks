<div align="center">

![Skyra Logo](https://cdn.skyra.pw/gh-assets/skyra_avatar.png)

# Skyra Resource Webhooks

**Webhook scripts to update Skyra Lounge rules**

[![GitHub](https://img.shields.io/github/license/skyra-project/resource-webhooks)](https://github.com/skyra-project/resource-webhooks/blob/main/LICENSE.md)
[![Depfu](https://badges.depfu.com/badges/aec2d160513e3052a4691491e16984bd/count.svg)](https://depfu.com/github/skyra-project/resource-webhooks?project_id=24341)

[![Support Server](https://discord.com/api/guilds/254360814063058944/embed.png?style=banner2)](https://join.skyra.pw)

</div>

---

## About

Each file in `./resources` expects a github webhook in the repositories secrets in the format `WEBHOOK_FILE_NAME`.

Deploying the webhook messages is done manually via [workflow dispatch](https://github.blog/changelog/2020-07-06-github-actions-manual-triggers-with-workflow_dispatch/).

The provided tags are the resource names in discord channel format and separated by the `,` character.   
Example: `rules, useful-servers` 

The repository requires the `WEBHOOK_AVATAR` and `WEBHOOK_NAME` repository secrets which control the webhooks avatar and name respectively for all deployed webhook resources.

### Adding content

1. Add the file into `./resources` (The file name should be derived from the channel the webhook will post to for added verbosity. The channel `foo-bar` becomes `FOO_BAR.md`)
2. Each new paragraph (double newline character) will be posted in a new message. Try to use as few messages as possible (the limit is 2000 characters per message) to avoid rate limiting. You can add a spacer and simulate a new message with `_ _`
3. Adding images to a file can be done through
   1. Adding a folder with the same name as the markdown file name in `./resources/images`.
   2. Adding images in `.png` format and give them ALL CAPITALS names.
   3. Referencing them in the markdown file with `%PNG_IMAGE_FILE_NAME%`.
4. Channel names and other escape sequences should have the format `%FOO_BAR%` and need to be added to the mapping `replacePatterns` in `./src/index.ts`
5. Add a Webhook requirement to `./.github/workflows/deployment.yml`. The repository secret should be prefixed with `WEBHOOK_` for added verbosity. The entry for our example is `FOO_BAR: ${{ secrets.WEBHOOK_FOO_BAR }}`
