// initial code 

"use strict";
console.clear();

// Starts The Main Code : 

// Require All The Modules , Packages And Objects : 

let express = require("express") ;
let featureRoute = express.Router() ;

const { getCampaigns, getBusiness, getHelp, getCareer, getIdentity, getStudent } = require("../controller/otherFeature.controller");

//Routing Code : 

featureRoute.get("/campaigns", getCampaigns) ;
featureRoute.get("/business" , getBusiness) ;
featureRoute.get("/help" , getHelp) ;
featureRoute.get("/career" , getCareer) ;
featureRoute.get("/identity" , getIdentity) ;
featureRoute.get("/student" , getStudent) ;

// Exports Code :

module.exports = featureRoute ;
