import { Express, Request, Response} from "express";
import multer from "multer";

import { deletes3handler, gets3handler, creates3handler } from "./controllers/s3.controller";

const upload = multer();
export default function routes(app: Express) {
  app.get("/", getHandler);
  app.post("/addItem", upload.single("file"), creates3handler);
  app.delete("/deleteItem", deletes3handler);
  app.get("/getItem", gets3handler);
}

function getHandler(req: Request, res: Response) {
  res.status(200).json({ message: "api is working." });
}

