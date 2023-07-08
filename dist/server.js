"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./src/config/config");
const user_routes_1 = __importDefault(require("./src/api/routes/user-routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Mthods", "GET, POST, PATCH, DELETE");
    next();
});
app.use("/api/users", user_routes_1.default);
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
    app.listen(config_1.config.server.port, () => {
        console.log(`Server starting at port ${config_1.config.server.port}`);
    });
})
    .catch((error) => {
    console.log(error);
});
// app.use('/api/trades', trademgmtRoutes);
// app.use('/api/stocks', stockMgmtRoutes);
// app.use('/api/refreshtoken', refreshTokenRoutes);
