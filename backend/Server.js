import express from "express";
import dotenv from "dotenv";
import router from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middlerware/errorMiddleware.js";
import connect from "./config.js";
dotenv.config();
connect();
const PORT = process.env.PORT || 8000;

const app = express();
app.use("/api", router);
app.get("/", (req, res) => res.send("Server is ready"));
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
