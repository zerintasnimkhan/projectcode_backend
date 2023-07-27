const express = require('express')
const app = express()
const path = require('path');
const port = 3000; // You can choose any available port you like
const cors = require('cors');

const messageRoute = require('./route/message')

//To parse the body of the request
app.use(express.json());
app.use(cors());


app.use('/test',express.static("../../client"))
app.use(express.static("../../client"))

//For message handeling
app.use("/api/v1", messageRoute);



app.listen(port, () => {
    console.log('server is running')
    }
)
