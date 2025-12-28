#!/usr/bin/env node

const fs = require("fs");
let tasks = [];
let args;

try {
    args = getArgs();
} catch (err) {
    console.error(err.message);
    process.exit(1);
}
if (!fs.existsSync("tasks.json")) {
    fs.writeFileSync("tasks.json", JSON.stringify(tasks));
} else {
    const tasksJSON = fs.readFileSync("tasks.json", "utf-8");
    tasks = JSON.parse(tasksJSON);
}
try {
    if (args[0] == "add") {
        addTask(args, tasks);
    } else if (args[0] == "delete") {
        deleteTask(args, tasks);
    }
} catch (err) {
    console.error(err.message);
    process.exit(1);
}
fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));

function getArgs() {
    const argv = process.argv;
    if (argv.length < 3) {
        throw new Error("ERROR: Not enough arguments");
    }
    return argv.slice(2);
}

function addTask(args, tasks) {
    if (args.length != 2) {
        throw new Error("ERROR: Specify a description");
    }
    const id = tasks.length + 1;
    const task = createTask(args, id);
    tasks.push(task);
    console.log(`Task added successfully (ID: ${id})`);
}

function createTask(args, id) {
    return {
        id: id,
        description: args[1],
        status: "todo",
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
    }
}

function deleteTask(args, tasks) {
    if (args.length != 2) {
        throw new Error("ERROR: Specify an ID");
    } else if (Number.isNaN(args[1]) == true) {
        throw new Error("ERROR: ID must be a number");
    } else if (args[1] < 1 || args[1] > tasks.length) {
        throw new Error("ERROR: ID is out of bounds");
    }
    const id = args[1];
    tasks.splice(id - 1, 1);
    updateTasksIds(tasks);
    console.log(`Task removed successfully (ID: ${id})`);
}

function updateTasksIds(tasks) {
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].id = i + 1;
    }
}