import cookieParser from "cookie-parser";
import e from "express";
import morgan from "morgan";
import cors from "cors";
import allRoutes from "./routes/index.routes.js";
import env from "../config/config.js";

const app = e();

app.use(e.json());
app.use(cookieParser());
app.set("trust proxy", true);


app.use(
  cors({
    origin: env.CORS_ORIGIN.split(",").map((origin) => origin.trim()),
    credentials: true,
  }),
);

app.use(morgan("dev"));

app.use(e.static('public'))

app.use("/health", (req, res) => {
  res.status(200).json({ message: "api is in good condition" });
});

app.use("/api", allRoutes);

// app.get('/*name',(req,res)=>{})

export default app;
