#!/usr/bin/env node

let tasks = [];
let args;

try {
    args = getArgs();
    if (args[0] == "add") {
        tasks = addTask(args, tasks);
    }
} catch (err) {
    console.error(err.message);
    process.exit(1);
}

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