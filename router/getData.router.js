// initial code 

"use strict";
console.clear();

// Starts The Main Code : 

// Require All The Modules , Packages And Objects : 

let express = require("express") ;
let getDataRoute = express.Router() ;

const { getComingRequest, getHistory, getFullDetails, getAgentDetails, getPendingReg, postApproveReq,
        getApprovedReq, postRejectReq, 
        getRejectedReq,
        getAllAgentDetails} = require("../controller/getData.controller");

//Routing Code : 

getDataRoute.get("/coming-request" , getComingRequest) ;
getDataRoute.get("/history" , getHistory) ;
getDataRoute.get("/fulldetails" , getFullDetails) ;

getDataRoute.get("/agentdetails" , getAgentDetails) ;
getDataRoute.get("/allagentdetails" , getAllAgentDetails) ;


getDataRoute.get("/pendingreq" , getPendingReg) ; 

getDataRoute.get("/approvereq" , getApprovedReq) ; 
getDataRoute.post("/approvereq" , postApproveReq) ;

getDataRoute.get("/rejectreq" , getRejectedReq) ; 
getDataRoute.post("/rejectreq" , postRejectReq) ; 


// Exports Code :

module.exports = getDataRoute ;
