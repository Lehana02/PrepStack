import express from 'express'
import isAuth from '../middlewares/isAuth.js'
import { addSubTopic, addTask, changeSubTopicStatus, deleteSubTopic, deleteTask, editSubTopic, editTask, getTaskWithStats } from '../controllers/task.controllers.js'

const taskRouter=express.Router()

taskRouter.get("/get-tasks",isAuth,getTaskWithStats)
taskRouter.post("/add-task",isAuth,addTask)
taskRouter.post("/add-sub-topic",isAuth,addSubTopic)
taskRouter.delete("/delete-sub-topic/:taskId/subTopics/:subTopicId",isAuth,deleteSubTopic)
taskRouter.patch("/edit-sub-topic/:taskId/subTopics/:subTopicId",isAuth,editSubTopic)
taskRouter.patch("/change-status",isAuth,changeSubTopicStatus)
taskRouter.delete("/delete-task/:taskId",isAuth,deleteTask)
taskRouter.patch("/edit-task/:taskId",isAuth,editTask)

export default taskRouter