# tps-reporter

> Task progress sheet reporter

Use this to estimate how far a project is done, and help schedule the rest of the work.

## Usage

```sh
npm install -g rstacruz/tps-reporter.js    # via npm
yarn global add rstacruz/tps-reporter.js   # via yarnpkg.com
```

Usage:

```sh
tps-report --help

tps-report project.tasks --open   # open in browser
tps-report project.tasks          # show in CLI
```

## How it works

Create a project file `project.tasks`. See [Format documentation](docs/format.md) for details.

<details>
<summary>Example file</summary>

```yml
Version 1:

    This file is in TaskPaper format.
    Tabs are used to indent.
    Each task begins with a "- ".
    Projects end with a ":".
    Tags are in the format "@tag_name".
    All other lines (such as these) are considered as notes,
    and are to be ignored.

    - User signup
        - Register for an account
        - Log in @done
        - Forget password

    - Manage users
        - Create users @in_progress
        - Delete users
        - User profile page @40%

    - Blog
        - Creating new posts @done
        - Comments @done
        - Moderating comments @done
```
</details>

## Thanks

**tps-reporter** © 2016-2017, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/tps-reporter/contributors
