const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser')
const fileupload = require('express-fileupload');
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3001;
const authRoute = require('./_api/routes/auth');
const createItemRoute = require('./_api/routes/shop-item')
const uploadImageRoute = require('./_api/routes/upload-image');
const getShopsDetailsRoute = require('./_api/routes/shop-details');
const mongoose = require('mongoose');
require('./utils/connection');

// Middlewares =>
app.use(cors())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.urlencoded({extended: true}))
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(fileupload({useTempFiles: true}))

app.get('/', (req, res) => {
  res.send('Hello, world!');
});
//end-points =>
app.use('/', authRoute);
app.use('/shop', createItemRoute);
app.use('/upload_image', uploadImageRoute);
app.use('/get-shops-details', getShopsDetailsRoute);



app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`))






















// let ip;
// function getIpv4(setIp) {
//   const nets = networkInterfaces();
//   const result = []
//   for(const name of Object.keys(nets)){
//     for(const net of nets[name]){
//       if(net.family === 'IPv4'){
//         result.push(net.address);
//       }
//     }
//   }
//   ip = result;

//   console.log("ip:::;;;;;", ip)
// }


