## Description
CLI app to track and manage tasks through a JSON file.

This project is part of the recommended backend projects from [Roadmap.sh](https://roadmap.sh/projects/task-tracker).

## How to run

Adding a new task

`./task-cli.js add "Buy groceries"`

Updating and deleting tasks

`./task-cli.js update 1 "Buy groceries and cook dinner"`

`./task-cli.js delete 1`

Marking a task as in progress or done

`./task-cli.js mark-in-progress 1`

`./task-cli.js mark-done 1`

Listing all tasks

`./task-cli.js list`

Listing tasks by status

`./task-cli.js list done`

`./task-cli.js list todo`

`./task-cli.js list in-progress`
