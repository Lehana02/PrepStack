import express from 'express'
import isAuth from '../middlewares/isAuth.js'
import { upload } from '../middlewares/multer.js'
import { download, getBooks, getNotes, getPyqs, uploadFile } from '../controllers/resources.controllers.js'
import isAdmin from '../middlewares/isAdmin.js'

const resourceRouter=express.Router()

resourceRouter.post("/upload",isAuth,isAdmin,upload.single("pdf"),uploadFile)
resourceRouter.get("/get-pyqs",getPyqs)
resourceRouter.get("/get-notes",getNotes)
resourceRouter.get("/get-books",getBooks)
resourceRouter.post("/download",isAuth,download)

export default resourceRouter