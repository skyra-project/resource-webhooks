<div align="center">

![Skyra Logo](https://cdn.skyra.pw/gh-assets/skyra_avatar.png)

# Skyra Resource Webhooks

**Webhook scripts to update Skyra Lounge rules**

[![GitHub](https://img.shields.io/github/license/skyra-project/resource-webhooks)](https://github.com/skyra-project/resource-webhooks/blob/main/LICENSE.md)

[![Support Server](https://discord.com/api/guilds/254360814063058944/embed.png?style=banner2)](https://join.skyra.pw)

</div>

---

## About

Each file in `./resources` expects a github webhook in the repositories secrets in the format `WEBHOOK_FILE_NAME`.

Deploying the webhook messages is done manually via [workflow dispatch](https://github.blog/changelog/2020-07-06-github-actions-manual-triggers-with-workflow_dispatch/).

The provided tags are the resource names in discord channel format and separated by the `,` character.  
Example: `rules, useful-servers`

### Adding release announcements

1. Add the file into [`./resources`](/resources). The file name must be `RELEASE_YYYY_MM_DD`, for example, `RELEASE_2021_05_04` for the release of May 4th 2021.
2. Follow steps 2-5 from [Adding content](#adding-content)

### Adding content

1. Add the file into [`./resources`](/resources) (The file name should be derived from the channel the webhook will post to for added verbosity. The channel `foo-bar` becomes `FOO_BAR.md`)
2. Each new paragraph (double newline character) will be posted in a new message. Try to use as few messages as possible (the limit is 2000 characters per message) to avoid rate limiting. You can add a spacer and simulate a new message with `_ _`
3. Adding images to a file can be done through
    1. Adding a folder with the same name as the markdown file name in `./resources/images`.
    2. Adding images in `.png` format and give them ALL CAPITALS names.
    3. Referencing them in the markdown file with `%PNG_IMAGE_FILE_NAME%`.
4. Channel names and other escape sequences should have the format `%FOO_BAR%` and need to be added to the mapping `replacePatterns` in `./src/index.ts`
5. Add a Webhook requirement to `./.github/workflows/deployment.yml`. The repository secret should be prefixed with `WEBHOOK_` for added verbosity. The entry for our example is `FOO_BAR: ${{ secrets.WEBHOOK_FOO_BAR }}`

### Deployment content

Once a document is done for posting it can be deployed with [the GitHub workflow][deployment].

1. Go to [the GitHub workflow][deployment]
2. Click "Run workflow"
3. In the input field add the file name of the file to deploy
4. Confirm with "Run workflow"

#### Testing a `RELEASE` deployment

Releases in particular often need to be verified in Discord before they get published to the announcement channel.
To this end it is possible to replace the `RELEASE` part of the file name with `DRAFT` and it will post to the [`#test`](https://discord.com/channels/541738403230777351/642137151626018818) channel in [`Skyra Development Suite`](https://discord.com/channels/541738403230777351) as opposed to [`#announcements`](https://discord.com/channels/254360814063058944/283965220446273547) in [`Skyra Lounge`](https://discord.com/channels/254360814063058944)

## Buy us some doughnuts

Skyra Project is open source and always will be, even if we don't get donations. That said, we know there are amazing people who
may still want to donate just to show their appreciation. Thanks you very much in advance!

We accept donations through Patreon, BitCoin, Ethereum, and Litecoin. You can use the buttons below to donate through your method of choice.

| Donate With |         QR         |                        Address                         |
| :---------: | :----------------: | :----------------------------------------------------: |
|   Patreon   | ![PatreonImage][]  |                 [Click Here][patreon]                  |
|   PayPal    |  ![PayPalImage][]  |                  [Click Here][paypal]                  |
|   BitCoin   | ![BitcoinImage][]  |     [3JNzCHMTFtxYFWBnVtDM9Tt34zFbKvdwco][bitcoin]      |
|  Ethereum   | ![EthereumImage][] | [0xcB5EDB76Bc9E389514F905D9680589004C00190c][ethereum] |
|  Litecoin   | ![LitecoinImage][] |     [MNVT1keYGMfGp7vWmcYjCS8ntU8LNvjnqM][litecoin]     |

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://favware.tech/"><img src="https://avatars.githubusercontent.com/u/4019718?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jeroen Claassens</b></sub></a><br /><a href="https://github.com/skyra-project/resource-webhooks/commits?author=Favna" title="Code">💻</a> <a href="#content-Favna" title="Content">🖋</a> <a href="https://github.com/skyra-project/resource-webhooks/commits?author=Favna" title="Documentation">📖</a> <a href="#design-Favna" title="Design">🎨</a> <a href="#maintenance-Favna" title="Maintenance">🚧</a> <a href="#projectManagement-Favna" title="Project Management">📆</a></td>
    <td align="center"><a href="https://github.com/almostSouji"><img src="https://avatars.githubusercontent.com/u/26532370?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Souji</b></sub></a><br /><a href="https://github.com/skyra-project/resource-webhooks/commits?author=almostSouji" title="Code">💻</a></td>
    <td align="center"><a href="https://ko-fi.com/crawltogo"><img src="https://avatars.githubusercontent.com/u/20760160?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Noel</b></sub></a><br /><a href="https://github.com/skyra-project/resource-webhooks/commits?author=iCrawl" title="Code">💻</a></td>
    <td align="center"><a href="https://fyko.net/"><img src="https://avatars.githubusercontent.com/u/45381083?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Carter</b></sub></a><br /><a href="https://github.com/skyra-project/resource-webhooks/commits?author=Fyko" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/papaia"><img src="https://avatars.githubusercontent.com/u/43409674?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Papaia</b></sub></a><br /><a href="https://github.com/skyra-project/resource-webhooks/commits?author=papaia" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/anandre"><img src="https://avatars.githubusercontent.com/u/38661761?v=4?s=100" width="100px;" alt=""/><br /><sub><b>anandre</b></sub></a><br /><a href="https://github.com/skyra-project/resource-webhooks/commits?author=anandre" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/NotSugden"><img src="https://avatars.githubusercontent.com/u/28943913?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sugden</b></sub></a><br /><a href="https://github.com/skyra-project/resource-webhooks/commits?author=NotSugden" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/monbrey"><img src="https://avatars.githubusercontent.com/u/5294381?v=4?s=100" width="100px;" alt=""/><br /><sub><b>monbrey</b></sub></a><br /><a href="https://github.com/skyra-project/resource-webhooks/commits?author=monbrey" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/apps/dependabot"><img src="https://avatars.githubusercontent.com/in/29110?v=4?s=100" width="100px;" alt=""/><br /><sub><b>dependabot[bot]</b></sub></a><br /><a href="#maintenance-dependabot[bot]" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

[bitcoin]: bitcoin:3JNzCHMTFtxYFWBnVtDM9Tt34zFbKvdwco?amount=0.01&label=Skyra%20Discord%20Bot
[bitcoinimage]: https://cdn.skyra.pw/gh-assets/bitcoin.png
[ethereum]: ethereum:0xcB5EDB76Bc9E389514F905D9680589004C00190c?amount=0.01&label=Skyra%20Discord%20Bot
[ethereumimage]: https://cdn.skyra.pw/gh-assets/ethereum.png
[litecoin]: litecoin:MNVT1keYGMfGp7vWmcYjCS8ntU8LNvjnqM?amount=0.01&label=Skyra%20Discord%20Bot
[litecoinimage]: https://cdn.skyra.pw/gh-assets/litecoin.png
[patreon]: https://donate.skyra.pw/patreon
[patreonimage]: https://cdn.skyra.pw/gh-assets/patreon.png
[paypal]: https://donate.skyra.pw/paypal
[paypalimage]: https://cdn.skyra.pw/gh-assets/paypal.png
[deployment]: https://github.com/skyra-project/resource-webhooks/actions/workflows/deployment.yml
