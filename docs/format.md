File format
===========

The tasks file, usually `tasks.taskpaper`, is loosely based off of the [TaskPaper] format. They're simply a hierarchy of projects and tasks.

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

You can nest tasks as deep as you like. Projects and tasks may have sub-projects and tasks.

``` yaml
Version 1:
  Edit users:
    - Register and signup
    - Login and logout
      - Design for the pages
      - Responsive
      - Implement functionality

  Landing pages:
    - Home page
    - Pricing page
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

The following tags are recognized:

 - `@10%` *([task progress](#done))*
 - `@in_progress` *(same as @50%)*
 - `@done` *(same as @100%)*
 - `@0pt` *([points](#points), influences percentage. needs to end in __pt__ or __pts__)*


Done
----

Mark tasks as done by adding a `@done` tag. 
You may also set progress via a percentage like `@50%`. See [§ Tags](#tags) for more information.

``` yaml
Make cake:
  - Get eggs and flour @done
  - Bake the cake
```

Parent projects and tasks have their progress set based on the progress of their subtasks (and their [points](#points)).

``` yaml
Make cake:                          # 50% done
  - Get eggs and flour @done
  - Bake the cake
```

Points
------

Assign points to tasks and projects based on their complexity to monitor progress more accurately.

``` yaml
Make cake:                          # 4 / 5 complete (80%)
  - Get eggs and flour @done @4pts  # 4 / 4 complete
  - Bake the cake                   # 0 / 1 complete
```

By default, every leaf task/project has 1 point. Every parent has the sum of all their childrens points.

``` yaml
Make cake:                          # 5 pts (4 + 1)
  - Get eggs and flour @done @4pts  # 4 pts
  - Bake the cake                   # 1 pt
```

Parent overrides
----------------

You may set points for a parent task. This scales the points of their descendants accordingly. In this example below, *Make cake* project is supposed to be `5pts`. By explicitly setting it to `10pts`, its descendants will have their points multiplied by 2.

``` yaml
Make cake: @10pts                   # 10 pts
  - Get eggs and flour @done @4pts  # becomes 8 pts
  - Bake the cake                   # becomes 2 pts
```

Sprints
-------

You can define sprints to help you see the workload of each sprint. Define your sprints on top of your file like so:

``` yaml
Sprints:
  s1: Sprint 1 (May 1)
  s2: Sprint 2 (May 8)
  s3: Sprint 3 (May 15)
```

The names are arbitrary. `s1`..`s3` is just used here for convention; feel
free to use any string you like. `week1`..`week7` works well for some
projects, for example.

Use the names as tags in projects or tasks (in this case, `@s1`, `@s2`):

``` yaml
Blog:
  - Writing articles @s1
  - Publishing @s2
```

[TaskPaper]: http://www.hogbaysoftware.com/products/taskpaper
