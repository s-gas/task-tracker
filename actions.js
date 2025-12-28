export function executeAction(args, tasks) {
    const actions = {
        add: addTask,
        delete: deleteTask,
        update: updateTask,
        "mark-in-progress": markTaskInProgress,
        "mark-done": markTaskDone,
        list: listTasks,
    };
    let action = args[0];
    if (!actions[action]) {
        throw new Error("Invalid action");
    } 
    actions[action](args, tasks);
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
    if (tasks.length == 0) {
        throw new Error("ERROR: Task list is empty");
    } else if (args.length != 2) {
        throw new Error("ERROR: Specify an ID");
    } else if (Number.isNaN(args[1]) == true) {
        throw new Error("ERROR: ID must be a number");
    } else if (args[1] < 1 || args[1] > tasks.length) {
        throw new Error("ERROR: ID is out of bounds");
    }
    const id = args[1];
    const index = id - 1;
    tasks.splice(index, 1);
    updateTaskIds(tasks);
    console.log(`Task removed successfully (ID: ${id})`);
}

function updateTaskIds(tasks) {
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].id = i + 1;
    }
}

function updateTask(args, tasks) {
    if (tasks.length == 0) {
        throw new Error("ERROR: Task list is empty");
    } else if (args.length != 3) {
        throw new Error("ERROR: Specify an ID and a description");
    } else if (Number.isNaN(args[1]) == true) {
        throw new Error("ERROR: ID must be a number");
    } else if (args[1] < 1 || args[1] > tasks.length) {
        throw new Error("ERROR: ID is out of bounds");
    }
    const index = args[1] - 1;
    tasks[index].description = args[2];
    tasks[index].updatedAt = new Date().toLocaleString();
}

function markTaskInProgress(args, tasks) {
    if (tasks.length == 0) {
        throw new Error("ERROR: Task list is empty");
    } else if (args.length != 2) {
        throw new Error("ERROR: Specify an ID");
    } else if (Number.isNaN(args[1]) == true) {
        throw new Error("ERROR: ID must be a number");
    } else if (args[1] < 1 || args[1] > tasks.length) {
        throw new Error("ERROR: ID is out of bounds");
    }
    const index = args[1] -  1;
    tasks[index].status = "in-progress";
    tasks[index].updatedAt = new Date().toLocaleString();
}

function markTaskDone(args, tasks) {
    if (tasks.length == 0) {
        throw new Error("ERROR: Task list is empty");
    } else if (args.length != 2) {
        throw new Error("ERROR: Specify an ID");
    } else if (Number.isNaN(args[1]) == true) {
        throw new Error("ERROR: ID must be a number");
    } else if (args[1] < 1 || args[1] > tasks.length) {
        throw new Error("ERROR: ID is out of bounds");
    }
    const index = args[1] -  1;
    tasks[index].status = "done";
    tasks[index].updatedAt = new Date().toLocaleString();
}

function listTasks(args, tasks) {
    if (args.length == 1) {
        listAll(tasks);
    } else if (args.length == 2) {
        if (args[1] == "done") {
            listDone(tasks);
        } else if (args[1] == "todo") {
            listTodo(tasks);
        } else if (args[1] == "in-progress") {
            listInProgress(tasks);
        } else {
            throw new Error("ERROR: Invalid argument");
        }
    } else {
        throw new Error("ERROR: Invalid number of arguments");
    }
}

function listAll(tasks) {
    let flag = false;
    for (let v of tasks) {
        flag = true;
        console.table(v);
    }
    if (flag == false) {
        console.log("No tasks found");
    }
}

function listDone(tasks) {
    let flag = false;
    for (let v of tasks) {
        if (v.status == "done") {
            flag = true;
            console.table(v);
        }
    }
    if (flag == false) {
        console.log("No tasks found");
    }
}

function listTodo(tasks) {
    let flag = false;
    for (let v of tasks) {
        if (v.status == "todo") {
            flag = true;
            console.table(v);
        }
    }
    if (flag == false) {
        console.log("No tasks found");
    }
}

function listInProgress(tasks) {
    let flag = false;
    for (let v of tasks) {
        if (v.status == "in-progress") {
            flag = true;
            console.table(v);
        }
    }
    if (flag == false) {
        console.log("No tasks found");
    }
}