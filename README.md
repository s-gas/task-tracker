# task-cli

## Description

CLI app to track and manage tasks through a JSON file.

## How to run

*Note: to run this project you need to have [Node.js](https://nodejs.org/en) installed.*

```bash
./task-cli.js <command> [arguments]
```

### Available commands:

- Add a new task:

```bash
add "task description"
```

- Update a task:
```bash
update <task-id> "new description"
```

- Delete a task:
```bash
delete <task-id>
```

- Mark a task as in progress:
```bash
mark-in-progress <task-id>
```

- Mark a task as done:
```bash
mark-done <task-id>
```

- List all tasks, optionally filtered by status:
```bash
list [ todo | in-progress | done ]
```
