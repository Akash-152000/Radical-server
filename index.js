const express = require('express')
const cors = require('cors')
require('dotenv').config({path: './.env'})
const connectToMongo = require('./db')


connectToMongo();
const app = express();

app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hello world')
});

// Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/news',require('./routes/news'))

app.listen(process.env.Port,()=>{
    console.log("Server is connected")
})