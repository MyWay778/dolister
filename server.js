const http = require("http")
const express = require("express")
const bodyParser = require("body-parser")
const port = 3000

const app = express()
app.use(express.static(__dirname+"/public"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

http.createServer(app).listen(port)