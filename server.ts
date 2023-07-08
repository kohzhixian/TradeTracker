import express from "express";
import mongoose from "mongoose";
import { config } from "./src/config/config";
import userRoutes from "./src/api/routes/user-routes";
import refreshTokenRoutes from "./src/api/routes/refreshToken-routes";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Mthods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/users", userRoutes);
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    app.listen(config.server.port, () => {
      console.log(`Server starting at port ${config.server.port}`)
    })
  })
  .catch((error) => {
    console.log(error);
  });


// app.use('/api/trades', trademgmtRoutes);
// app.use('/api/stocks', stockMgmtRoutes);
app.use('/api/refreshtoken', refreshTokenRoutes);
