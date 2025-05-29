// initial code 

"use strict";
console.clear();

// Starts The Main Code : 

// Require All The Modules , Packages And Objects : 

let path = require("path") ;
const connectionPool = require("../config/database.config");

//Controller Code : 

let getAdmin = function(req,res){

    res.status(200).sendFile(path.join(__dirname , ".." , "view" , "admin.html")) ;    

}

let postInsertMoney = async function(req,res){

    try
    {
        let {mobile , amount} = req.body.allDetails ;

        let agent = await connectionPool.query("SELECT * FROM agent_balance WHERE _id = $1" , [mobile]) ;
        agent = agent.rows ;
        
        if(agent)
        {

            let insertMoney = await connectionPool.query("UPDATE agent_balance SET balance=$1 WHERE _id=$2;",[amount,mobile]) ;

            res.status(200).json({

                message : "Successfully updated amount of agent"

            });
        }
        else
        {
            res.status(200).json({

                message : "Agent not found"

            });
        }


    }
    catch(error)
    {
        console.log(error) ;
        res.status(400).json({


            status : 400 ,
            message : "Find error to insert money on the agent account !!!"

        });
    }

}

// Exports Code :

module.exports = {

    getAdmin ,
    postInsertMoney,

}
