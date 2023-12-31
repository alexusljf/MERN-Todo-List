import express from "express";
import cors from "cors";
import "./loadEnvironment.js";
import records from "./routes/record.js";

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/record", records);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
