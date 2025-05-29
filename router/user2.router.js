// initial code 

"use strict";
console.clear();

// Starts The Main Code : 

// Require All The Modules , Packages And Objects : 

let express = require("express") ;
let userRoute2 = express.Router() ;

let { getRequestMoney, postRequestMoney, getRemittance, postRemittance, getMicroFinance, postMicroFinance,
    getEducation, postEducation, getDonation, postDonation, getInsurance, postInsurance, 
    getBundle, getWrongPinNum } = require("../controller/user2.controller");

//Routing Code : 

userRoute2.get("/requestmoney" , getRequestMoney) ;
userRoute2.post("/requestmoney" , postRequestMoney) ;

userRoute2.get("/remittance" , getRemittance) ;
userRoute2.post("/remittance" , postRemittance) ;

userRoute2.get("/microfinance" , getMicroFinance) ;
userRoute2.post("/microfinance" , postMicroFinance) ;

userRoute2.get("/education" , getEducation) ;
userRoute2.post("/education" , postEducation) ;

userRoute2.get("/donation" , getDonation) ;
userRoute2.post("/donation" , postDonation) ;

userRoute2.get("/insurance" , getInsurance) ;
userRoute2.post("/insurance" , postInsurance) ;

userRoute2.get("/bundle" , getBundle) ;

userRoute2.get("/wrongPinNum" , getWrongPinNum) ;

// Exports Code :

module.exports = userRoute2 ;
