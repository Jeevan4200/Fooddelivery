import express from 'express'
import { addFood } from '../controllers/foodController.js'
import multer from 'multer';
import { listfood } from '../controllers/foodController.js';
import { removefood } from '../controllers/foodController.js';
const foodRouter = express.Router();
//image storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Folder to save the files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
  });
  
  const upload = multer({ storage: storage });
foodRouter.post('/add',upload.single('image'),addFood);
foodRouter.get("/list",listfood)
foodRouter.post("/remove",removefood)
export default foodRouter;