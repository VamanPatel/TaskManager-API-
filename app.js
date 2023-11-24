const express = require('express');
const app = express();
require('dotenv').config();

const bodyParser = require("body-parser");
const morgan = require('morgan');

const tasks = require('./routes/task');
const errorHandlerMiddleware = require('./errors/error-handler');

/* ---------------------------------------------- middlerware --------------------------------------------- */

app.use(bodyParser.json());
app.use(morgan('dev'));

/* ------------------------------------------------ routes ------------------------------------------------ */

app.use("/api/v1/tasks", tasks)

app.use(errorHandlerMiddleware);


/* --------------------------------------------- server start --------------------------------------------- */

const port = process.env.PORT || 5000;

const start = async()=>{
    try {
        app.listen(port,()=>{
            console.log(`Server is listening on port ${port}...`);
        })
        
    } catch (error) {
        console.log(error);
    }
}

start();