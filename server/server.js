import dbconnect from "./src/db/dbconnect.js";
import app from "./src/app";
import env from "./config/config.js";

const startServer = () => {
  dbconnect().then(
    app.listen(env.PORT, () => {
      console.log("server is running on port ", env.PORT);
    }),
  );
};
