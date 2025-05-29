// initial code 

"use strict";
console.clear();

// Starts The Main Code : 

// Require All The Modules , Packages And Objects : 

let express = require("express") ;
let adminRoute = express.Router() ;

const { getAdmin, postInsertMoney } = require("../controller/admin.controller");

//Routing Code : 

adminRoute.get("/login" , getAdmin) ;
adminRoute.post("/insertmoney" , postInsertMoney) ; 

// Exports Code :

module.exports = adminRoute ;
