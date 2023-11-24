const { createCustomError } = require('../errors/custom-error');

const taskData = [
    {
        id: 1,
        title: "complete modejs project",
        description: "complete on time",
        isComplete: false,
        priority: "low",
        createdDate: new Date(2022, 1, 24)
    }
]

/* --------------------------------------------- get all tasks -------------------------------------------- */

const getAllTasks = (req, res) => {
    const query = req.query;

    if (query.isComplete) {
        if (query.isComplete == "true") {
            return res.status(200).json({
                sucess: true,
                result: taskData.filter((res) => res.isComplete == true)
            })
        } else {
            return res.status(200).json({
                sucess: true,
                result: taskData.filter((res) => res.isComplete == false)
            })
        }
    }

    if (query.sortByDate) {
        if (query.sortByDate == "asc") {
            const sortedAsc = taskData.sort((objA, objB) => Number(objA.createdDate) - Number(objB.createdDate))

            return res.status(200).json({
                sucess: true,
                result: sortedAsc
            })
        } else {
            const sortedDes = taskData.sort((objA, objB) => Number(objB.createdDate) - Number(objA.createdDate))

            return res.status(200).json({
                sucess: true,
                result: sortedDes
            })
        }
    }

    return res.status(200).json({
        sucess: true,
        result: taskData
    })
}

const createTask = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const isComplete = req.body.isComplete;
    const priority = req.body.priority;
    const todayDate = new Date();

    if (title == "" || description == "" || priority == "" || typeof isComplete != "boolean") {
        return next(createCustomError("Value should not be empty and iscomplete should be in boolean", 500))
    }

    let data = {
        id: Math.floor(Math.random() * 100 + 1),
        title: title,
        description: description,
        isComplete: isComplete,
        priority: priority,
        createdDate: todayDate
    }

    taskData.push(data);

    return res.status(201).json({
        sucess: true,
        result: data
    })
}

/* -------------------------------------------- get task by id -------------------------------------------- */

const getTask = (req, res, next) => {
    const { id: taskId } = req.params;

    const task = taskData.find((res) => {
        return res.id == taskId
    })

    if (!task) {
        return next(createCustomError(`No task with id : ${taskId}`, 404))
    }

    return res.status(200).json({
        sucess: true,
        message: task
    })

}

/* -------------------------------------------- update the task ------------------------------------------- */

const updateTask = (req, res, next) => {
    const { id: taskId } = req.params;

    const task = taskData.find((res) => {
        return res.id == taskId
    })

    /* -------------------------------- check this id task is there or not -------------------------------- */

    if (!task) {
        return next(createCustomError(`No task with id : ${taskId}`, 404))
    }

    const title = req.body.title;
    const description = req.body.description;
    const isComplete = req.body.isComplete;
    const priority = req.body.priority;
    const todayDate = new Date();

    if (title == "" || description == "" || priority == "" || typeof isComplete != "boolean") {
        return next(createCustomError("Value should not be empty and iscomplete should be in boolean", 500))
    }

    taskData.forEach((item) => {
        if (item.id == taskId) {
            item.title = title;
            item.description = description;
            item.isComplete = isComplete;
            item.priority = priority;
            item.createdDate = todayDate;
        }
    })



    return res.status(200).json({
        sucess: true,
        message: `task with id ${taskId} has been updated`
    })
}


/* -------------------------------------------- delete the task ------------------------------------------- */


const deleteTask = (req, res, next) => {
    const { id: taskId } = req.params;

    const task = taskData.find((res) => {
        return res.id == taskId
    })

    if (!task) {
        return next(createCustomError(`No task with id : ${taskId}`, 404))
    }

    let findIndex = taskData.findIndex((res) => res.id == taskId);
    taskData.splice(findIndex, 1)

    return res.status(200).json({
        sucess: true,
        message: `task with id ${taskId} has been deleted`
    })
}


/* ---------------------------------------- based on priority level --------------------------------------- */

const getTaskBasedOnPriority = (req, res, next) => {
    const { level: priorityLevel } = req.params;

    if (priorityLevel == "low") {
        return res.status(200).json({
            sucess: true,
            result: taskData.filter((res) => res.priority == "low")
        })
    } else if (priorityLevel == "medium") {
        return res.status(200).json({
            sucess: true,
            result: taskData.filter((res) => res.priority == "medium")
        })
    } else {
        return res.status(200).json({
            sucess: true,
            result: taskData.filter((res) => res.priority == "high")
        })
    }
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    getTaskBasedOnPriority
};
