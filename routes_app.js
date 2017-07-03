var express = require("express");

var router = express.Router();

router.get("/", function(req,res){
  
  res.render("app/home")
    });

    //REST
router.get("/conta/new",function(req,res){
 res.render("app/conta/new"); 
    });
router.get("/conta/:id/edit",function(req,res){

    });

router.route("/conta/:id")
.get(function(req,res){

    })
.put(function(req,res){

    })
.delete(function(req,res){

    });
//coleccion
router.route("/conta")
.get(function(req,res){

    })
.post(function(req,res){

    })

module.exports = router;
