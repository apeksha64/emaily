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

if (process.env.NODE_ENV === "production") {
    //express will serve up production assets like our main.js or main.css file
    app.use(express.static("client/build"));
    //express will index.html if it doesnt recognize the route
    const path = require("path");
    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);