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
        tasks.push(addTask(args, tasks));
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
        throw new Error("ERROR: 1 task required");
    }
    const id = tasks.length + 1;
    console.log(`Task added successfully (ID: ${id})`);
    return {
        id: id,
        description: args[1],
        status: "todo",
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
    }
}