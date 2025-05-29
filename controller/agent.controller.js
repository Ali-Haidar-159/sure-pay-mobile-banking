// initial code 

"use strict";
console.clear();

// Starts The Main Code : 

// Require All The Modules , Packages And Objects : 

let path = require("path") ;
let bcrypt = require("bcrypt") ;
let passport = require("passport") ;
let connectionPool = require("../config/database.config") ;

//Controller Code : 

let postAgentRegister = async function(req,res){

    try
    {
        let {name,address,district,upazila,thanaMarket, agentThanaMarket,phone,email,dob,
                agreedToCertificate,fullPin} = req.body.allDetails ;
        let mobile = phone ;

        // console.log(allDetails) ;

        let existsUser = await connectionPool.query("SELECT * FROM agent_login WHERE _id=$1",[mobile]) ;
        let existsUser2 = existsUser.rows[0] ;


        if(existsUser2)
        {
            res.json({
                message : "Use another mobile number . There is an account using this mobile number !"
            });
        }
        else
        {
            let saltRounds = 10 ;

            bcrypt.hash(fullPin , saltRounds ,async function(err,hash){

            let agent = await  connectionPool.query("INSERT INTO agent_login(_id , mobile ,pin)VALUES ($1 , $2 , $3) RETURNING *",[mobile,mobile,hash]) ;
            let user = await  connectionPool.query("INSERT INTO agent_full_details(_id,name,district,city,mobile_number,dob,email)VALUES ($1 , $2 , $3 ,$4,$5,$6,$7) RETURNING *",[mobile,name,district,address,mobile,dob,email]) ;
            let balance = await  connectionPool.query("INSERT INTO agent_balance(_id , balance)VALUES ($1 , $2) RETURNING *",[mobile,"100"]) ;

            res.redirect("/main");

            });
        }


    }
    catch(error)
    {
        console.log(error) ;

        res.status(400).json({

            status : 400 ,
            message : "find error to register a agent !!!" ,

        });
    }

}

let getAgentMain = function(req,res){

    if(req.isAuthenticated())
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "agent.html")) ;
    }
    else
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "loginFirst.html")) ;
    }

}


let getCashIn = function(req,res){

    if(req.isAuthenticated())
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "cashIn.html")) ;
    }
    else
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "loginFirst.html")) ;
    }

}

let postCashIn = async function(req,res){

    try
    {
        let {mobile , amount} = req.body.allDetails ;
        let _id = req.user._id ;

        let fromBalanceResult = await connectionPool.query("SELECT * FROM agent_balance WHERE _id=$1", [_id]);
        let fromUserBalance = fromBalanceResult.rows[0].balance;

        let tUserResult = await connectionPool.query("SELECT * FROM registration_details WHERE _id=$1", [mobile]);
        let toUser = tUserResult.rows[0];

        if (!toUser) {
            return res.status(404).json({ message: "Receiver not found" });
        }

        let toBalanceResult = await connectionPool.query("SELECT * FROM my_balance WHERE _id=$1", [mobile]);
        let toUserBalance = toBalanceResult.rows[0].balance ;

        amount = Number(amount) ;

        if (fromUserBalance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }


        let fromUserNewAmount = Number(fromUserBalance) - amount ;
        let toUserNewAmount = Number(toUserBalance) + amount ;

        let updateFromUser = connectionPool.query("UPDATE agent_balance SET balance=$1 WHERE _id=$2",[fromUserNewAmount,_id]) ;
        let updateToUser = connectionPool.query("UPDATE my_balance SET balance=$1 WHERE _id=$2",[toUserNewAmount,mobile]) ;

        let history = await connectionPool.query("INSERT INTO history (_id,amount,work,destination) VALUES ($1,$2,$3,$4) RETURNING *",[_id,amount,"cash in",mobile]);

        res.status(200).json({ message: "All OK - Money sending successfully complete" });
    }
    catch(error)
    {
        console.log(error) ;

        res.status(400).json({

            status : 400 ,
            message : "find error to cash In !!!" ,

        });
    }

}

let getSpToSpTransfer = function(req,res){

    if(req.isAuthenticated())
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "SPToSPTransfer.html")) ;
    }
    else
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "loginFirst.html")) ;
    }

}

let postSpToSpTransfer = async function(req,res){

    try
    {
        let {mobile,amount,pin} = req.body.allDetails ;

        // console.log(allDetails) ;

        let _id = req.user._id ;

        let user = await connectionPool.query("SELECT * FROM agent_login WHERE _id = $1" , [_id]) ;
        let usersPin = user.rows[0].pin ;

        let isMatched = await bcrypt.compare(pin, usersPin);

        if(isMatched)
        {
            let fromBalanceResult = await connectionPool.query("SELECT * FROM agent_balance WHERE _id=$1", [_id]);
            let fromUserBalance = fromBalanceResult.rows[0].balance;

            let tUserResult = await connectionPool.query("SELECT * FROM registration_details WHERE _id=$1", [mobile]);
            let toUser = tUserResult.rows[0];

            if (!toUser) {
                return res.status(404).json({ message: "Receiver not found" });
            }

            let toBalanceResult = await connectionPool.query("SELECT * FROM my_balance WHERE _id=$1", [mobile]);
            let toUserBalance = toBalanceResult.rows[0].balance ;

            amount = Number(amount) ;

            if (fromUserBalance < amount) {
                return res.status(400).json({ message: "Insufficient balance" });
            }


            let fromUserNewAmount = Number(fromUserBalance) - amount ;
            let toUserNewAmount = Number(toUserBalance) + amount ;

            let updateFromUser = connectionPool.query("UPDATE agent_balance SET balance=$1 WHERE _id=$2",[fromUserNewAmount,_id]) ;
            let updateToUser = connectionPool.query("UPDATE my_balance SET balance=$1 WHERE _id=$2",[toUserNewAmount,mobile]) ;

            let history = await connectionPool.query("INSERT INTO history (_id,amount,work,destination) VALUES ($1,$2,$3,$4) RETURNING *",[_id,amount,"money transfer",mobile]);

            res.status(200).json({ message: "All OK - Money sending successfully complete" });
        }
        else
        {
            return res.status(404).json({ message: "Invalid Pin" });
        }


    }
    catch(error)
    {
        console.log(error) ;

        res.status(400).json({

            status : 400 ,
            message : "find error to cash In !!!" ,

        });
    }

}


let getSpToSpRequest = function(req,res){

    if(req.isAuthenticated())
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "SPToSPRequest.html")) ;
    }
    else
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "loginFirst.html")) ;
    }

}

let postSpToSpRequest = function(req,res){

    try
    {

    }
    catch(error)
    {

    }

}


// Exports Code :

module.exports = {

    postAgentRegister ,
    getAgentMain ,

    getCashIn ,
    postCashIn ,

    getSpToSpTransfer ,
    postSpToSpTransfer ,

    getSpToSpRequest,
    postSpToSpRequest

}
