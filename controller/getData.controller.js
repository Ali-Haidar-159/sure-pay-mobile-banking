// initial code 

"use strict";
console.clear();

// Starts The Main Code : 

// Require All The Modules , Packages And Objects : 

let path = require("path") ;
let passport = require("passport") ;
let connectionPool = require("../config/database.config") ;

//Controller Code : 

let getComingRequest = async function(req,res){

    try
    {
        let _id = req.user._id ;

        let requests = await connectionPool.query("SELECT * FROM request_money WHERE mobile=$1",[_id]) ;
        let allRequests = requests.rows ;

        // console.log(allRequests) ;
        // console.log("reach req") ;

        res.status(200).json({

            status : 200 ,
            message : allRequests 

        });

    }
    catch(error)
    {
        res.status(400).json({

            status : 400 ,
            message : "Find error to get all requests !!!"

        });
    }

}


let getHistory = async function(req,res){

    try
    {
        let _id = req.user._id ;

        let history = await connectionPool.query("SELECT * FROM history WHERE _id=$1",[_id]) ;
        history = history.rows ;

        res.status(200).json({

            success : true ,
            data : history 

        });

    }
    catch(error)
    {
        res.status(400).json({

            status : 400 ,
            message : "Find error to get history !!!"

        });
    }

}


let getFullDetails = async function(req,res){

    try
    {
        let _id = req.user._id ;

        let fDetails = await connectionPool.query("SELECT * FROM my_balance AS mb INNER JOIN user_full_details AS ufd ON mb._id = ufd._id WHERE mb._id = $1",[_id]);
        fDetails = fDetails.rows ;

        res.status(200).json({

            success : true ,
            data : fDetails 

        });
    }
    catch(error)
    {
        res.status(400).json({

            status : 400 ,
            message : "Find error to get full details !!!"

        });
    }

}


let getAgentDetails = async function(req,res){

    try
    {
        let _id = req.user._id ;

        let fDetails = await connectionPool.query("SELECT * FROM agent_balance AS ab INNER JOIN agent_full_details AS afd ON ab._id = afd._id WHERE ab._id = $1",[_id]);
        fDetails = fDetails.rows ;

        res.status(200).json({

            success : true ,
            data : fDetails 

        });
    }
    catch(error)
    {
        res.status(400).json({

            status : 400 ,
            message : "Find error to get full details of agent !!!"

        });
    }

}


let getAllAgentDetails = async function(req,res){

    try
    {

        let fDetails = await connectionPool.query("SELECT * FROM agent_balance AS ab INNER JOIN agent_full_details AS afd ON ab._id = afd._id");
        fDetails = fDetails.rows ;

        res.status(200).json({

            success : true ,
            data : fDetails 

        });
    }
    catch(error)
    {
        res.status(400).json({

            status : 400 ,
            message : "Find error to get full details of agent !!!"

        });
    }

}


let getPendingReg = async function(req,res){

    try
    {
        let fDetails = await connectionPool.query("SELECT * FROM pending;");
        fDetails = fDetails.rows ;

        res.status(200).json({

            success : true ,
            data : fDetails 

        });
    }
    catch(err)
    {
        res.status(400).json({

            status : 400 ,
            message : "Find error to get pending requests !!!"

        });
    }

}


let postApproveReq = async function(req,res){

    try
    {
        let id = req.body.id ;

        let fDetails = await connectionPool.query("SELECT * FROM pending WHERE _id=$1;",[id]);
        let {_id,name,mobile,address,father,mother,dob,pin} = fDetails.rows[0] ;
        let nid = "336699" ;

        // console.log(_id,name,mobile,address,father,mother,dob,pin) ;

        let userDetails = await connectionPool.query(`INSERT INTO user_full_details (_id, name, address, father, mother, DOB)VALUES ($1, $2, $3, $4, $5, $6)`,[mobile, name, address, father, mother, dob]);
        let user = await  connectionPool.query("INSERT INTO registration_details(_id,pin,NID,mobile_number)VALUES ($1 , $2 , $3 ,$4) RETURNING *",[mobile,pin,nid,mobile]) ;
        let balance = await  connectionPool.query("INSERT INTO my_balance(_id , balance)VALUES ($1 , $2) RETURNING *",[mobile,"5"]) ;

        let approvedReq = await connectionPool.query(`INSERT INTO approved (_id, mobile, name, father, mother, dob, pin, nid, address)VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [mobile,  mobile,name,father,mother,dob,pin,"886612",address]);
        
        let deletedReq = await connectionPool.query("DELETE FROM pending WHERE _id=$1;",[id]) ;

        res.status(200).json({

            message : "successfully added user !"

        });

    }
    catch(error)
    {
        console.log(error) ;
        res.status(400).json({


            status : 400 ,
            message : error

        });
    }

}


let getApprovedReq = async function(req,res){

    try
    {

        let fDetails = await connectionPool.query("SELECT * FROM approved;");
        fDetails = fDetails.rows ;

        res.status(200).json({

            success : true ,
            data : fDetails 

        });

    }
    catch(error)
    {
        console.log(error) ;
        res.status(400).json({


            status : 400 ,
            message : "find error to get approved requests !!!"

        });
    }

}


let postRejectReq = async function(req,res){

    try
    {
        let id = req.body.id ;
        let reason = req.body.reason ;

        let fDetails = await connectionPool.query("SELECT * FROM pending WHERE _id=$1;",[id]);
        let {_id,name,mobile,address,father,mother,dob,pin} = fDetails.rows[0] ;
        let nid = "336699" ;

        // console.log(_id,name,mobile,address,father,mother,dob,pin) ;

        let approvedReq = await connectionPool.query(`INSERT INTO rejected (_id, mobile, name, father, mother, dob, pin, nid, address , reason)VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 , $10)`, [mobile,  mobile,name,father,mother,dob,pin,"886612",address,reason]);
        
        let deletedReq = await connectionPool.query("DELETE FROM pending WHERE _id=$1;",[id]) ;

        res.status(200).json({

            message : "successfully rejected user !"

        });

    }
    catch(error)
    {
        console.log(error) ;
        res.status(400).json({


            status : 400 ,
            message : "find error to insert data on reject table"

        });
    }

}


let getRejectedReq = async function(req,res){

    try
    {

        let fDetails = await connectionPool.query("SELECT * FROM rejected;");
        fDetails = fDetails.rows ;

        res.status(200).json({

            success : true ,
            data : fDetails 

        });

    }
    catch(error)
    {
        console.log(error) ;
        res.status(400).json({


            status : 400 ,
            message : "find error to get rejected requests !!!"

        });
    }

}



// Exports Code :

module.exports = {

    getComingRequest ,
    getHistory ,
    getFullDetails ,

    getAgentDetails ,
    getAllAgentDetails,

    getPendingReg ,

    getApprovedReq,
    postApproveReq ,

    getRejectedReq ,
    postRejectReq ,

}
