File format
===========

The tasks file, usually `tasks.taskpaper`, is loosely based off of the [TaskPaper] format.

They're simply a hierarchy of projects and tasks. Projects are lines that end with `:`, and tasks are lines that begin with `- `, with indentation.

- Tabs (or spaces!) are used to indent.
- Each task begins with a `- `.
- Projects end with a `:`.
- Tags are in the format `@tag_name`.
- All other lines are considered as notes.

``` yaml
Edit users:
  - Register and signup
  - Login and logout
```

Nesting
-------

You can nest tasks as deep as you like.

``` yaml
Edit users:
  - Register and signup
  - Login and logout
    - Design for the pages
    - Responsive
    - Implement functionality
```

Tagging
-------

You can tag some projects or tasks using `@`. For projects, you may put the tags after the colon.

``` yaml
Facebook connect:
  - Register via Facebook @done
  - Capture email

Manage employees: @done
  - Create user
  - Edit user
```

Done
----

Mark tasks as done by adding a `@done` tag.

``` yaml
Make cake:
  - Get eggs and flour @done
  - Bake the cake
```

You may also use `x` instead of `-` to mark a task as done. (This is not standard [TaskPaper] behavior.)

``` yaml
Manage user records:
  - Create user
  x Edit user
  x Delete user
  - Update user
```

Tags
----

The following tags are recognized:

 - `@0pt` *(points; influences percentage. needs to end in __pt__ or __pts__)*
 - `@10%` *(task progress)*
 - `@in_progress` *(same as @50%)*
 - `@done` *(same as @100%)*

Example:

``` yaml
Employee management:
  - Creating employees @40%
  - Editing employees @done @2pts
```

Sprints
-------

You can define sprints to help you see the workload of each sprint. First, 
define your sprints on top of your file like so (this is a TaskPaper project 
with notes):

``` yaml
Sprints:
  s1: Sprint 1 (May 1)
  s2: Sprint 2 (May 8)
  s3: Sprint 3 (May 15)
```

The names are all arbitrary; `s1`..`s3` is just used here for convention; feel
free to use any string you like. (say, `week1`..`week7` works well for some
projects.)

Then use the names as tags (in this case, `@s1`, `@s2`):

``` yaml
Blog:
  - Writing articles @s1
  - Publishing @s2
```

[TaskPaper]: http://www.hogbaysoftware.com/products/taskpaper
