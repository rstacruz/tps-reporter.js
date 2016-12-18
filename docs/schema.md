# Schema

The schema is the same as Taskpaper.js ([see reference] (https://github.com/rstacruz/taskpaper.js#ast-format)) with a few modifications.

## Document

Has these additional fields.

### sprints
> `Sprint[]`

List of sprints.

## Item/project

Has these additional fields.

### sprintIds
> `String[]`

List of sprint names. This should actually be called `sprints`, but Document already has a `sprints` field which means something else.

### exSprintIds (TBI)
> `String[]`

Explicit list of sprints ("explicit sprints").

### infSprintIds (TBI)
> `String[]`

Sprints of the descendants ("inferred sprints").

### points
> `Number`

The actual number of points. If `exPoints` is available, `points` is equal to that (scaled to the parent if possible). Otherwise, it's equal to `infPoints` (also scaled to parent).

### exPoints
> `Number?`

Explicit number of points ("explicit points").

### infPoints
> `Number`

Inferred number of points ("inferred points").

### progress
> `Number`

Progress from `0`...`1`.

### infProgress
> `Number`

Inferred progress.

### exProgress
> `Number?`

Explicit progress.

## Sprint

A `Sprint` is a new type of node as seen in `document.sprints`.

### title
> `String`

The sprint name.

### id
> `String`

The sprint ID.
