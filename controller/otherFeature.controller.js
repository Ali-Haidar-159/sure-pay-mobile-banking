// initial code 

"use strict";
console.clear();

// Starts The Main Code : 

// Require All The Modules , Packages And Objects : 

let path = require("path") ;

//Controller Code : 

let getCampaigns = function(req,res){

    res.status(200).sendFile(path.join(__dirname , ".." , "view" , "campaigns.html")) ;

}

let getBusiness = function(req,res){

    res.status(200).sendFile(path.join(__dirname , ".." , "view" , "business.html")) ;

}

let getHelp = function(req,res){

    res.status(200).sendFile(path.join(__dirname , ".." , "view" , "help.html")) ;

}

let getCareer = function(req,res){

    res.status(200).sendFile(path.join(__dirname , ".." , "view" , "career.html")) ;

}


let getIdentity = function(req,res){

    res.status(200).sendFile(path.join(__dirname , ".." , "view" , "identity.html")) ;

}


let getStudent = function(req,res){

    res.status(200).sendFile(path.join(__dirname , ".." , "view" , "student.html")) ;

}



// Exports Code :

module.exports = {

    getCampaigns ,
    getBusiness ,
    getHelp ,
    getCareer ,
    getIdentity ,
    getStudent ,
}
