#!/usr/bin/env node
import { executeAction } from "./actions.js";
import fs from "fs";

let tasks = [];
let args;

try {
    args = getArgs();
} catch (err) {
    console.error(err.message);
    process.exit(1);
}
loadTasks();
try {
    executeAction(args, tasks);
} catch (err) {
    console.error(err.message);
    process.exit(1);
}
saveTasks();

function getArgs() {
    const argv = process.argv;
    if (argv.length < 3) {
        throw new Error("ERROR: Not enough arguments");
    }
    return argv.slice(2);
}

function loadTasks() {
    if (!fs.existsSync("tasks.json")) {
        fs.writeFileSync("tasks.json", JSON.stringify(tasks));
    } else {
        const tasksJSON = fs.readFileSync("tasks.json", "utf-8");
        tasks = JSON.parse(tasksJSON);
    }
}

function saveTasks() {
    fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
}

