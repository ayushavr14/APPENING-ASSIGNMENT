// MAKING EXPRESS SERVER

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json())


//DATA BASE CONNECTION
const {createConnection} = require("./db/connection")

const user = require('./routers/user.routes');

app.use('/',user)

createConnection();
app.listen(PORT,() => { console.log("listen on port 3000"); });
