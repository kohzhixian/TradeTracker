import express from "express";
import mongoose from "mongoose";
import { config } from "./src/config/config";
import userRoutes from "./src/api/routes/user-routes";
import refreshTokenRoutes from "./src/api/routes/refreshToken-routes";
import stockMgmtRoutes from "./src/api/routes/stock-mgmt-routes";
import tradeMgmtRoutes from "./src/api/routes/trade-mgmt-routes";

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

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    app.listen(config.server.port, () => {
      console.log(`Server starting at port ${config.server.port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/users", userRoutes);
app.use("/api/trades", tradeMgmtRoutes);
app.use("/api/stocks", stockMgmtRoutes);
app.use("/api/refreshtoken", refreshTokenRoutes);
