const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");


mongoose.connect(keys.mongoURI);

const app = express();
app.use(
    session({
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
        resave: false,
        saveUninitialized: false,
        secret: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);