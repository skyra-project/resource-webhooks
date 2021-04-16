# Contributing

## Workflow

1. Fork and clone this repository.
2. Create a new branch in your fork based off the **main** branch.
3. Make your changes.
4. Commit your changes, and push them.
5. Submit a Pull Request [here]!

## Contributing to the code

**The issue tracker is only for issue reporting or proposals/suggestions. If you have a question, you can find us in our [Discord Server][discord server]**.

To contribute to this repository, feel free to create a new fork of the repository and
submit a pull request. We highly suggest [ESLint] to be installed
in your text editor or IDE of your choice to ensure builds from GitHub Actions do not fail.

**_Before committing and pushing your changes, please ensure that you do not have any linting errors by running `yarn lint`!_**

### Skyra Resource Webhooks Concept Guidelines

There are a number of guidelines considered when reviewing Pull Requests to be merged. _This is by no means an exhaustive list, but here are some things to consider before/while submitting your ideas._

-   Everything should follow our ESLint rules as closely as possible, and should pass lint tests even if you must disable a rule for a single line.
-   Scripts that are to be ran outside of the scope of the bot should be added to [scripts] directory and should be in the `.mjs` file format.

<!-- Link Dump -->

[discord server]: https://join.skyra.pw
[here]: https://github.com/skyra-project/framework/pulls
[eslint]: https://eslint.org/
[scripts]: /scripts
