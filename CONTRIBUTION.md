# CONTRIBUTING

## Table of Contents

- [CONTRIBUTING](#contributing)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Development](#development)
    - [Commit changes](#commit-changes)
    - [With Git-Flow](#with-git-flow)
    - [Without Git-Flow](#without-git-flow)
    - [Open a Pull Request](#open-a-pull-request)
  - [Running the project](#running-the-project)
  - [Running Tests](#running-tests)

## Installation

1. Clone this repository
2. CD into the project folder
3. Run `npm install` or `yarn install` to install the dependecies needed for the project

## Development

Create a new branch. For this project it was chosen to use the following standard

### Commit changes

We use a few libraries to standardize the commit messages and lint the code before pushing it.

Once you finish working on your feature, go to you terminal and type:

```shell
git commit
```

A CLI is going to open with options to choose from with a brief explanation of each type. A more extensive explanation of each type can be found in this repository [conventional-changelog-metahub](https://github.com/pvdlg/conventional-changelog-metahub#commit-types)

### With Git-Flow

Make sure your project is updated with the latest changes by running

```shell
git pull origin master
```

Then go to this page and follow the instructions to install [Git-Flow](https://danielkummer.github.io/git-flow-cheatsheet/index.html)

To create a branch use the following command. It is going to create your working branch and automatically switch to it.

```shell
git flow feature start <TASK_ID>
```

Read the [Commit changes](#commit-changes) section for instructions on how to commit your code.

To push your changes use the command

```shel
git flow feature publish <TASK_ID>
```

### Without Git-Flow

Make sure your project is updated with the latest changes by running

```shell
git pull origin master
```

Then run the following command to create a new branch

```shell
git checkout -b feature/<TASK_ID> master
```

Read the [Commit changes](#commit-changes) section for instructions on how to commit your code.

To push your changes run the command

```shell
git push origin feature/<TASK_ID>
```

### Open a Pull Request

After pushing your changes to the repository, follow the link that was shown in the pthe appropriate branch (in this case it is the `master`).

## Running the project

Currently to run the project we use the following command to open the Storybook

```shell
yarn storybook
```

Or if you are using npm

```shell
npm run storybook
```

## Running Tests

The project uses [Jest](https://jestjs.io/) and [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro) to run the tests.

Run either of these commands to run the tests. Test files must follow the standard below

- Be placed in the following path `./lib/__tests__/MyComponent`
- The file name must follow this structure `myComponent.test.js`

```shell
yarn test
```

Or if are using npm

```shell
npm run test
```

[Back to top](#contributing)
