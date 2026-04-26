import Task from "../models/task.model.js"
import User from "../models/user.model.js"
import { calculateTaskStats, updateTaskStatus } from "../utils/taskCalculator.js"

export const getTaskWithStats = async (req, res) => {
  try {
    const userId = req.userId
    const tasks = await Task.find({ userId }).lean()

    const result = tasks.map((task) => {
      const stats = calculateTaskStats(task)
      return {
        ...task,
        stats
      }
    })
    return res.status(200).json({ tasks: result })
  } catch (error) {
    return res.status(500).json({ message: `Fetch error tasks ${error}` })
  }
}

export const addTask = async (req, res) => {
  try {
    const { title, deadline, subTopics } = req.body

    if (!title || !deadline || !subTopics) {
      return res.status(400).json({ message: "All fields are required" })
    }
    const newTask = new Task({
      userId: req.userId,
      title,
      deadline,
      subTopics
    })

    const stats = calculateTaskStats(newTask)
    newTask.status = updateTaskStatus(newTask)

    await newTask.save()
    const user = await User.findById(req.userId).select("socketId")
    const io = req.app.get('io')
    if (io) {
      if (user?.socketId) {
        console.log("send")
        io.to(user.socketId).emit('newTask', {
          taskId: newTask._id,
          userId:req.userId,
          task: { ...newTask.toObject(), stats }
        })
      }

    }
    return res.status(201).json({ task: { ...newTask.toObject(), stats } })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `Creating task error ${error}` })
  }
}

export const addSubTopic = async (req, res) => {
  try {
    const { taskId, name, durationDays, hoursPerDay } = req.body;

    if (!taskId || !name || durationDays == null || hoursPerDay == null) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (task.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const newSubTopic = {
      name,
      durationDays,
      hoursPerDay
    };

    task.subTopics.push(newSubTopic);

    const stats = calculateTaskStats(task)
    task.status = updateTaskStatus(task)

    await task.save();


    res.status(200).json({
      message: "Subtopic added successfully",
      task,
      stats
    });

  } catch (error) {
    res.status(500).json({
      message: "Error adding subtopic",
      error: error.message,
    });
  }
};

export const editSubTopic = async (req, res) => {
  try {
    const { name, durationDays, hoursPerDay } = req.body;
    const { taskId, subTopicId } = req.params

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (task.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const subTopic = task.subTopics.id(subTopicId);

    if (!subTopic) {
      return res.status(404).json({
        message: "Subtopic not found",
      });
    }

    if (name) subTopic.name = name;
    if (durationDays) subTopic.durationDays = durationDays;
    if (hoursPerDay) subTopic.hoursPerDay = hoursPerDay;

    const stats = calculateTaskStats(task)
    task.status = updateTaskStatus(task)
    await task.save();

    res.status(200).json({
      message: "Subtopic updated successfully",
      task,
      stats
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating subtopic",
      error: error.message,
    });
  }
};

export const deleteSubTopic = async (req, res) => {
  try {
    const { taskId, subTopicId } = req.params;

    if (!taskId || !subTopicId) {
      return res.status(400).json({
        message: "taskId and subTopicId are required",
      });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (task.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    task.subTopics = task.subTopics.filter(
      (t) => t._id.toString() !== subTopicId
    );

    task.status = updateTaskStatus(task)
    await task.save();

    const stats = calculateTaskStats(task);

    res.status(200).json({
      message: "Subtopic deleted successfully",
      task: {
        ...task.toObject(),
        stats,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting subtopic",
      error: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (task.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "Not authorized to delete this task",
      });
    }

    await Task.findByIdAndDelete(taskId);

    res.status(200).json({
      message: "Task deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting task",
      error: error.message,
    });
  }
};

export const changeSubTopicStatus = async (req, res) => {
  try {
    const { taskId, subTopicId, status } = req.body;

    if (!taskId || !subTopicId || !status) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const validStatus = ["pending", "half", "done"];
    if (!validStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (task.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const subTopic = task.subTopics.id(subTopicId);

    if (!subTopic) {
      return res.status(404).json({
        message: "Subtopic not found",
      });
    }

    subTopic.status = status;

    task.status = updateTaskStatus(task)

    await task.save();

    const stats = calculateTaskStats(task);

    res.status(200).json({
      message: "Status updated successfully",
      task: {
        ...task.toObject(),
        stats,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating status",
      error: error.message,
    });
  }
};

export const editTask = async (req, res) => {
  try {
    const { title, deadline } = req.body;
    const { taskId } = req.params

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (title) task.title = title;
    if (deadline) task.deadline = deadline;

    const stats = calculateTaskStats(task)
    task.status = updateTaskStatus(task)

    await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      task: {
        ...task.toObject(),
        stats
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating task",
      error: error.message,
    });
  }
};
