import express from "express";
import mongoose from "mongoose";
import { config } from "./src/config/config";
import userRoutes from "./src/api/routes/user-routes";
import refreshTokenRoutes from "./src/api/routes/refreshToken-routes";
import stockMgmtRoutes from "./src/api/routes/stock-mgmt-routes";
import tradeMgmtRoutes from "./src/api/routes/trade-mgmt-routes";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

// Handle CORS
// Create a whitelist of allowed origins
dotenv.config({ path: ".env.dev" });
const whitelist = process.env.CORS_WHITELIST!.split(",");

// Set up CORS middleware to check incoming requests against the whitelist
const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (whitelist && origin && whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Use CORS with the options
app.use(cors(corsOptions));

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
