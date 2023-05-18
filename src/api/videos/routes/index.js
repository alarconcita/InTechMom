import express from 'express';

const videosRouter = express.Router();

import upload from "../controllers/post.js";
import { videosId , allVideos } from "../controllers/get.js";
import videoEdit from "../controllers/patch.js";
import videoDelete from "../controllers/delete.js";

//videos

//Cargar video
videosRouter.post("/upload", upload);

//Consultar videos
videosRouter.get("/videos", allVideos);
videosRouter.get("/videos/:id", videosId);

//Modificar videos
videosRouter.patch("/videos/:id", videoEdit);

//Eliminar videos
videosRouter.delete("/videos/:id", videoDelete);

export default videosRouter;