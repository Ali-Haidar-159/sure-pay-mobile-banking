// initial code 

"use strict";
console.clear();

// Starts The Main Code : 

// Require All The Modules , Packages And Objects : 

let path = require("path") ;
let bcrypt = require("bcrypt") ;
let passport = require("passport") ;
let connectionPool = require("../config/database.config") ;

// Controller Code : 

let getRequestMoney = function(req,res){

    if(req.isAuthenticated())
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "requestMoney.html")) ;
    }
    else
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "loginFirst.html")) ;
    }

}

let postRequestMoney = async function(req,res){

    try
    {
        let{name,number,amount,pin} = req.body.allDetails ;
        let _id = req.user._id ;

        let user = await connectionPool.query("SELECT * FROM registration_details WHERE _id = $1" , [_id]) ;
        let usersPin = user.rows[0].pin ;

        let isMatched = await bcrypt.compare(pin, usersPin);


        if(isMatched)
        {
            let request = await connectionPool.query('INSERT INTO request_money (_id, mobile, amount, name) VALUES ($1, $2, $3, $4)',[_id, number, amount, name]);            
        }
        else
        {
            res.status(400).json({

                status : 400 ,
                message : "Incorrect PIN !!!"

            });
        }
        

    }
    catch(error)
    {
        res.status(200).json({

                    success : false  ,
                    message : "Find error to send request !!!"
                    // message : error

                });
    }

}


let getRemittance = function(req,res){

    if(req.isAuthenticated())
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "remittance.html")) ;
    }
    else
    {

        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "loginFirst.html")) ;
    }

}

let postRemittance = async function(req,res){

    try
    {
        let {number , amount , pin} = req.body ;
        let _id = req.user._id ;

        let user = await connectionPool.query("SELECT * FROM registration_details WHERE _id = $1" , [_id]) ;
        let usersPin = user.rows[0].pin ;
        
        let userBalance = await connectionPool.query("SELECT * FROM my_balance WHERE _id=$1",[_id]) ;
        let oldBalance = Number(userBalance.rows[0].balance) ;

        let isMatched = await bcrypt.compare(pin, usersPin);

        console.log(usersPin , pin ,amount , oldBalance) ;


        if(isMatched && oldBalance>amount)
        {
            let newBalance = oldBalance - Number(amount) ;

            let updateBalanceBkash = await connectionPool.query("UPDATE my_balance SET balance=$1 WHERE _id=$2",[newBalance,_id]) ;
            let history = await connectionPool.query("INSERT INTO history(_id,amount,work,destination) VALUES ($1,$2,$3,$4)",[_id,amount,"sending remittance",number]) ;
            let request = await connectionPool.query('INSERT INTO remittance (_id, mobile, amount) VALUES ($1, $2, $3)',[_id, number, amount]);            
        }
        else
        {
            res.status(400).json({

                status : 400 ,
                message : "Incorrect PIN !!!"

            });
        }

    }
    catch(error)
    {
        console.log(error) ;
        console.log("reach err") ;
        res.status(400).json({

            status : 400 ,
            // message : "Find error to send remittance !!!"
            message : error

        });
    }

}

let getMicroFinance = function(req,res){

    if(req.isAuthenticated())
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "microfinance.html")) ;
    }
    else
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "loginFirst.html")) ;
    }

}

let postMicroFinance = async function(req,res){

    try
    {

        let {name , amount , memberNumber , uniqueId , pin} = req.body.allDetails ;
        let _id = req.user._id ;

        let user = await connectionPool.query("SELECT * FROM registration_details WHERE _id = $1" , [_id]) ;
        let usersPin = user.rows[0].pin ;
        
        let userBalance = await connectionPool.query("SELECT * FROM my_balance WHERE _id=$1",[_id]) ;
        let oldBalance = Number(userBalance.rows[0].balance) ;

        let isMatched = await bcrypt.compare(pin, usersPin);

        if(isMatched && oldBalance>amount)
        {
            let newBalance = oldBalance - Number(amount) ;

            let updateBalanceBkash = await connectionPool.query("UPDATE my_balance SET balance=$1 WHERE _id=$2",[newBalance,_id]) ;
            let history = await connectionPool.query("INSERT INTO history(_id,amount,work,destination) VALUES ($1,$2,$3,$4)",[_id,amount,`Micro Finance at ${name}`,`memberId:${memberNumber} , uniqueId:${uniqueId}`]) ;
        }
        else
        {
            res.status(400).json({

                status : 400 ,
                message : "Incorrect PIN or Insufficient balance !!! "

            });
        }


        // console.log(name , amount , memberNumber , uniqueId , pin) ;

    }
    catch(error)
    {
        console.log(error) ;
        console.log("reach err") ;
        res.status(400).json({

            status : 400 ,
            // message : "Find error to send remittance !!!"
            message : error

        });
    }

}


let getEducation = function(req,res){

    if(req.isAuthenticated())
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "education.html")) ;
    }
    else
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "loginFirst.html")) ;
    }

}

let postEducation =async function(req,res){

    try
    {
        let {amount , pin , student_id} = req.body.allDetails ;
        let payment_type = req.body.allDetails.payment_type || "null" ;
        let month = req.body.allDetails.month || "null" ;
        let year = req.body.allDetails.year || "null" ;

        // console.log(amount , pin , student_id,payment_type,month,year) ;

        let _id = req.user._id ;

        let user = await connectionPool.query("SELECT * FROM registration_details WHERE _id = $1" , [_id]) ;
        let usersPin = user.rows[0].pin ;

        let userBalance = await connectionPool.query("SELECT * FROM my_balance WHERE _id=$1",[_id]) ;
        let oldBalance = Number(userBalance.rows[0].balance) ;

        let isMatched = await bcrypt.compare(pin, usersPin);


        if(isMatched && oldBalance>amount)
        {
            let newBalance = oldBalance - Number(amount) ;

            let updateBalanceBkash = await connectionPool.query("UPDATE my_balance SET balance=$1 WHERE _id=$2",[newBalance,_id]) ;
            let eduFee = await connectionPool.query('INSERT INTO education (_id, student_id, month, year, payment_type , amount) VALUES ($1, $2, $3, $4,$5,$6)',[_id,student_id, month,year,payment_type, amount]);            
            let history = await connectionPool.query("INSERT INTO history(_id,amount,work,destination) VALUES ($1,$2,$3,$4)",[_id,amount,`Student Fee ${amount}tk`,`studentId:${student_id}`]) ;

        }
        else
        {
            res.status(400).json({

                status : 400 ,
                message : "Incorrect PIN or insufficient balance !!!"

            });
        }

        

    }
    catch(error)
    {
        console.log(error) ;
        console.log("reach err") ;
        res.status(400).json({

            status : 400 ,
            // message : "Find error to send remittance !!!"
            message : error

        });
    }

}


let getDonation = function(req,res){

    if(req.isAuthenticated())
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "donation.html")) ;
    }
    else
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "loginFirst.html")) ;
    }

}

let postDonation = async function(req,res){

    try
    {   
        let {organization,amount,pin} = req.body.allDetails ;
        let donar = req.body.allDetails.donar || "null" ;
        let email = req.body.allDetails.email || "null" ;

        // console.log(organization,amount,pin,donar,email) ;

        let _id = req.user._id ;

        let user = await connectionPool.query("SELECT * FROM registration_details WHERE _id = $1" , [_id]) ;
        let usersPin = user.rows[0].pin ;

        let userBalance = await connectionPool.query("SELECT * FROM my_balance WHERE _id=$1",[_id]) ;
        let oldBalance = Number(userBalance.rows[0].balance) ;

        let isMatched = await bcrypt.compare(pin, usersPin);


        if(isMatched && oldBalance>amount)
        {
            let newBalance = oldBalance - Number(amount) ;

            let updateBalanceBkash = await connectionPool.query("UPDATE my_balance SET balance=$1 WHERE _id=$2",[newBalance,_id]) ;
            let donationFee = await connectionPool.query('INSERT INTO donation (_id, organazation, amount, donar, email) VALUES ($1, $2, $3, $4,$5)',[_id,organization, amount,donar,email]);            
            let history = await connectionPool.query("INSERT INTO history(_id,amount,work,destination) VALUES ($1,$2,$3,$4)",[_id,amount,`Donation Fee`,organization]) ;

        }
        else
        {
            res.status(400).json({

                status : 400 ,
                message : "Incorrect PIN or insufficient balance !!!"

            });
        }
    }
    catch(error)
    {
        console.log(error) ;
        console.log("reach err") ;
        res.status(400).json({

            status : 400 ,
            // message : "Find error to send remittance !!!"
            message : error

        });
    }

}


let getInsurance = function(req,res){

    if(req.isAuthenticated())
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "insurance.html")) ;
    }
    else
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "loginFirst.html")) ;
    }

}

let postInsurance = function(req,res){

    try
    {

    }
    catch(error)
    {

    }

}


let getBundle = function(req,res){

    if(req.isAuthenticated())
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "bkashBundle.html")) ;
    }
    else
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "loginFirst.html")) ;
    }

}

let getWrongPinNum = function(req,res){

    res.status(200).sendFile((path.join(__dirname , ".." , "view" , "wrongPinNum.html"))) ;

}


// Exports Code :

module.exports = {

    getRequestMoney ,
    postRequestMoney ,

    getRemittance ,
    postRemittance ,

    getMicroFinance ,
    postMicroFinance ,

    getEducation ,
    postEducation ,

    getDonation ,
    postDonation ,

    getInsurance ,
    postInsurance ,

    getBundle ,
    
    getWrongPinNum ,

}
