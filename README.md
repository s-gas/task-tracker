## Description
CLI app to track and manage tasks through a JSON file.

This project is part of the recommended backend projects from [Roadmap.sh](https://roadmap.sh/projects/task-tracker).

## How to run

`./task-cli [action] [arguments]`

Adding a new task
`task-cli add "Buy groceries"`

Updating and deleting tasks
`task-cli update 1 "Buy groceries and cook dinner"`
`task-cli delete 1`

Marking a task as in progress or done
`task-cli mark-in-progress 1`
`task-cli mark-done 1`

Listing all tasks
`task-cli list`

Listing tasks by status
`task-cli list done`
`task-cli list todo`
`task-cli list in-progress`
