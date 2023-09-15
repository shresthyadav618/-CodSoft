const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const router = require('./Routes');
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: 'image/*' }));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/',router)
mongoose.connect('mongodb+srv://manushresthofficial24669:manuisjod@cluster0.vz44vo0.mongodb.net/test').then(()=>{
    app.listen(port);
console.log('listening to the requests made at the server' , port)
}).catch((err)=>{
    console.log('error while connecting', err);
})