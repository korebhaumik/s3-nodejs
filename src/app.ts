import express from "express";
import routes from "./routes";
import cors from "cors";
import { connectToDb } from "./utils/connect";
export const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

routes(app);

(async () => {
  try {
    await connectToDb();
    app.listen(1337, () => {
      console.log("Server is running on port 1337.");
    });
  } catch (err) {
    console.log(err);
  }
})();
