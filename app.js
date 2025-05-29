// initial code 

"use strict";
console.clear();

// Starts The Main Code : 

// Require All The Modules , Packages And Objects : 

let express = require("express") ;
let app = express() ;

// let http = require("http") ;
let https = require("https") ;
let path = require("path") ;
let fs = require("fs") ;
let morgan = require("morgan") ;
let cors = require("cors") ;
let ejs = require("ejs") ;

const userRoute = require("./router/user.router");
const userRoute2 = require("./router/user2.router");
const getDataRoute = require("./router/getData.router");
const agentRoute = require("./router/agent.router");
const featureRoute = require("./router/otherFeature.router");
const adminRoute = require("./router/admin.router");

let passport = require("passport") ;
let session = require("express-session") ;
require("./config/passport.config");


//Creating Server : 

let myServer = https.createServer({

    key : fs.readFileSync(path.join(__dirname , "SSL" , "key.pem")) ,
    cert : fs.readFileSync(path.join(__dirname , "SSL" , "cert.pem"))
    

},app) ;

// Connect With Server : 

app.use(express.urlencoded({extended:true})) ;
app.use(express.json()) ;
app.use(express.static(path.join(__dirname , "resources"))) ;
app.use('/uploads', express.static('uploads'));

app.set("view engine" , "ejs") ;
app.set("views" , path.join(__dirname , "View")) ; 

app.use(morgan("dev")) ;
app.use(cors()) ;

// Passport Code :

app.set("trust proxy" , 1) ;
app.use(session({
    secret : "keyboard cat" ,
    resave : false ,
    saveUninitialized : true
})) ;

app.use(passport.initialize()) ;
app.use(passport.session()) ;

app.use(userRoute) ;
app.use(userRoute2) ;
app.use("/agent" , agentRoute) ;
app.use( "/data" , getDataRoute) ;
app.use(featureRoute) ;
app.use("/admin" , adminRoute) ;

// Request-Response-Cycle : 

app.get("/" , function(req,res){

    // console.log(__dirname);

    res.status(200).sendFile(path.join(__dirname , "View" , "index.html")) ;

}) ;

// Handle The Route Error 

app.use(function(req,res,next){

    res.status(404).sendFile(path.join(__dirname , "view" , "pageNot.html")) ;

});

// Handle The Server Error 

app.use(function(err,req,res,next){

    res.status(500).json({
        
        status : 500 ,
        message : err.message ,
        error : err

    });

});

// Exports Code :

module.exports = myServer ;
