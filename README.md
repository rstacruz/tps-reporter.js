# tps-reporter

> Task progress sheet reporter

Use this to estimate how far a project is done, and help schedule the rest of the work.

## Format

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

See [format documentation](docs/format.md).

## To do

- [x] HTML
- [x] CLI
- [ ] Sprints
- [ ] Notes
- [ ] People
