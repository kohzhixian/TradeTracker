const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({path: '.env.dev'});
const app = express();

const userRoutes = require('./src/api/routes/user-routes');
const trademgmtRoutes = require('./src/api/routes/trade-mgmt-routes');
const stockMgmtRoutes = require('./src/api/routes/stock-mgmt-routes');
const refreshTokenRoutes = require('./src/api/routes/refreshToken-routes');
//used to parse json bodies
app.use(express.json());


//prevent CORS error
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Mthods", "GET, POST, PATCH, DELETE");
  next();
})

app.use('/api/users', userRoutes);
app.use('/api/trades', trademgmtRoutes);
app.use('/api/stocks', stockMgmtRoutes);
app.use('/api/refreshtoken', refreshTokenRoutes);

const port = process.env.PORT || 4000;
const dbUrl = process.env.MONGODB_URL;


mongoose
  .connect(dbUrl, {
    // avoid Deprecation Warning
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server starting at port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
