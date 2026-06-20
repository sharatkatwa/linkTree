import cookieParser from "cookie-parser";
import e from "express";
import morgan from "morgan";
import cors from "cors";
import allRoutes from "./routes/index.routes.js";

const app = e();

app.use(e.json());
app.use(cookieParser());
app.use(
  cors({
    origin: env.CORS_ORIGIN.split(",").map((origin) => origin.trim()),
    credentials: true,
  }),
);

app.use(morgan("dev"));

app.use("/health", (req, res) => {
  res.status(200).json({ message: "api is in good condition" });
});

app.use("/api", allRoutes);

export default app;
