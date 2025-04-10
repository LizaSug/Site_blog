import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors'
import { registerValidation, loginValidation, PostCreateValidation } from './validations/validations.js';
import {checkAuth, handleValidationErrors }from './utils/index.js';
import * as UserController from './controllers/UserController.js'
import * as postController from './controllers/PostController.js'

mongoose
  .connect(
    "mongodb+srv://admin:$$$$$$@cluster0.hl9hg.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Db oK"))
  .catch((err) => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))


app.post("/auth/login", loginValidation, handleValidationErrors,  UserController.login);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors, UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})

app.get('/tags', postController.getLastTags)
app.get('/posts', postController.getAll)
app.get('/posts/:id', postController.getOne)
app.get("/posts/tags", postControllSer.getLastTags);
app.post(
  "/posts",
  checkAuth,
  PostCreateValidation,
  handleValidationErrors,
  postController.create
);
app.delete("/posts/:id", checkAuth, postController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  PostCreateValidation,
  handleValidationErrors,
  postController.update
);
app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  
  console.log('Server OK');
})