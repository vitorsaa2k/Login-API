require('dotenv').config()
require('./config/db')
const cors = require('cors')

const profileRouter = require('./api/routes/Profile')

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())



app.use('/', profileRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server on port ${process.env.PORT}`)
})