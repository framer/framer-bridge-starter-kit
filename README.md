# Framer Bridge Starter Kit

Framer Bridge is a suite of tools:

- That allows you to automatically publish and distribute components to designers with [Framer](https://framer.com) and the [Framer Store](https://store.framer.com).
- Import in production components built by your engineers. It’s an automatic and continually synced workflow, one that is customizable to your existing development workflow.

This repository links together [folder backed Framer projects](https://framer.gitbook.io/teams/integrations#folder-projects) with the [Framer CLI](https://www.npmjs.com/package/framer-cli) and [GitHub actions](https://github.com/framer/PublishAction)/[CircleCI](https://circleci.com/integrations/github/) for an easy package publication flow.

## 🏁 Getting started

**Important: This project uses Shared Colors, a feature only available in Framer X26 or higher.**

#### Cloning

1. [Fork this repository](https://help.github.com/en/articles/fork-a-repo).
1. [Clone the forked repository](https://help.github.com/en/articles/cloning-a-repository) locally
1. Run `yarn` to install dependencies

Inside the repository directory, you will find two key folders:

- **[`design-system`](/design-system):** contains example production components. Typically, this design system is consumed by multiple projects.
- **[`design-system.framerfx`](/design-system.framerfx):** a [folder backed project](https://framer.gitbook.io/teams/integrations#folder-projects) that imports the components from [`design-system`](/design-system) and (optionally) adds [interface properties](https://www.framer.com/api/property-controls/) to use in Framer. This is the project that gets published to the [Framer store](https://store.framer.com).

#### Editing

From here, you can continue modifying the existing [`design-system.framerfx`](/design-system.framerfx) file. If you edit any of the components in [`design-system`](/design-system), they will automatically get updated in Framer too.

If you want to import your own design system, you can replace both files with your own. Make sure that your Framer project is [folder backed](https://framer.gitbook.io/teams/integrations#folder-projects).

#### Publishing

1. From the terminal, run:
   ```sh
   npx framer-cli authenticate <your-framer-account-email>
   ```
1. **If the package has not been previously published to the store**, publish the package for the first time by running
   ```sh
   env FRAMER_TOKEN=<token> npx framer-cli publish <package-name.framerfx> --new="<Display Name>"
   ```

## 🤖 Using GitHub actions

If you have access to the [GitHub actions beta](https://github.com/features/actions), you can use this repository to automate the deployment of your Framer package to the store without needing any external services.

1. Modify the `args` property in the `Build` and `Publish` actions inside [`.github/main.workflow`](/.github/main.workflow) with the path of your Framer package, eg:

   ```sh
    action "Build" {
      uses = "framer/bridge@master"
      args = ["build", <your-project-path.framerfx>]
    }

    action "Publish Filter" {
      needs = ["Build"]
      uses = "actions/bin/filter@master"
      args = "branch master"
    }

    action "Publish" {
      uses = "framer/bridge@master"
      args = ["publish", <your-project-path.framerfx>, "--yes"]
      needs = ["Build", "Publish Filter"]
      secrets = ["FRAMER_TOKEN"]
    }
   ```

1. In GitHub, navigate to the forked repository and set the `FRAMER_TOKEN` via the GitHub UI for the [`.github/main.workflow`](/.github/main.workflow) publish step (accessible by navigating the file structure on the homepage of the repository).
1. Push a commit to the `master` branch and watch as the GitHub actions pick up the commit, build the package, publish it to the [Framer Store](https://store.framer.com).

## 🚚 Using CI

As an example of integrating `framer-cli` with an external CI service, there is a small [CircleCI configuration](https://circleci.com/docs/2.0/configuration-reference) included in this repository that publishes the given package to the [Framer store](https://store.framer.com) every time a commit is made to the `master` branch.

To integrate with CircleCI:

1. [Connect your repository with CircleCI](https://circleci.com/integrations/github/).
1. Add the `FRAMER_TOKEN` environment variable in the [CI project settings](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project).
1. Update the [`.circleci/config.yml`](/.circleci/config.yml) with your project path, e.g.:

   ```yml
   # Javascript Node CircleCI 2.0 configuration file
   #
   # Check https://circleci.com/docs/2.0/language-javascript/ for more details
   #
   version: 2
   jobs:
     publish:
       docker:
         - image: circleci/node:10

       working_directory: ~/repo

       steps:
         - checkout
         - run: yarn
         - run: npx framer-cli publish <your-project-path.framerfx> --yes

   workflows:
     version: 2
     publish:
       jobs:
         - build
         - publish:
             filters:
               branches:
                 only: master
   ```

1. Publish a brand new version of your package to the [Framer store](https://store.framer.com) by pushing a commit on the `master` branch.
