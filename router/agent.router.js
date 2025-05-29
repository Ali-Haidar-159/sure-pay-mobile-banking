// initial code 

"use strict";
console.clear();

// Starts The Main Code : 

// Require All The Modules , Packages And Objects : 

let express = require("express") ;
let agentRoute = express.Router() ;
let passport = require("passport") ;

const { postAgentRegister, getAgentMain, getCashIn, postCashIn, getSpToSpTransfer, postSpToSpTransfer, getSpToSpRequest, postSpToSpRequest } = require("../controller/agent.controller");

//Routing Code : 

agentRoute.post('/login', passport.authenticate('for-agent', {
    successRedirect: '/agent/main', 
    failureRedirect: '/wrongPinNum'
}));


agentRoute.post("/register" , postAgentRegister) ;
agentRoute.get("/main" , getAgentMain) ;

agentRoute.get("/cashin" , getCashIn) ;
agentRoute.post("/cashin" , postCashIn) ;

agentRoute.get("/sptosptransfer" , getSpToSpTransfer) ;
agentRoute.post("/sptosptransfer" , postSpToSpTransfer) ;

agentRoute.get("/sptosprequest" , getSpToSpRequest) ;
agentRoute.post("/sptosprequest" , postSpToSpRequest) ;

// Exports Code :

module.exports = agentRoute ;
