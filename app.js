var express = require("express");

var app = express();
var file='xml/1.xml'
var leerXml= require('./models/leerXml').leerXml;

console.log(leerXml(file));
app.set("view engine", "jade");

app.get("/", function(req,res){
  res.render("hola", {hola: "Hola Luis Angel"})

    });
app.listen(8080);
