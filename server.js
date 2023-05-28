const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({path: '.env.dev'});
const app = express();

const userRoutes = require('./src/api/routes/user-routes');

//used to parse json bodies
app.use(express.json());

app.use('/api/users', userRoutes);

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
