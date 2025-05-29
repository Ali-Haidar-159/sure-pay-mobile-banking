// initial code 

"use strict";
console.clear();

// Starts The Main Code : 

// Require All The Modules , Packages And Objects : 

let path = require("path") ;
let passport = require("passport") ;
let bcrypt = require("bcrypt") ;

const connectionPool = require("../config/database.config");

//Controller Code : 

let getMain = function(req,res){

    if(req.isAuthenticated())
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "main.html")) ;
    }
    else
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "loginFirst.html")) ;
    }

}


let getLogout = function(req, res) {
    try {
        req.logout(function(err) {
            if (err) {
                return res.status(500).json({ message: "Logout failed", error: err });
            }

            req.session.destroy(function(err) {
                if (err) {
                    return res.status(500).json({ message: "Session destroy failed", error: err });
                }
                res.clearCookie("connect.sid");
                res.status(200).redirect("/");
            });
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

let getSendMoney = function(req,res){

    res.status(200).sendFile(path.join(__dirname , ".." , "view" , "sendMoney.html")) ;

}

let postSendMoney = async function(req, res) {
    try {
        let { mobile, amount, pin } = req.body;
        let fromUserId = req.user._id;

        // console.log(mobile , amount , pin , fromUserId) ;

        let fUserResult = await connectionPool.query("SELECT * FROM registration_details WHERE _id=$1", [fromUserId]);
        let fromBalanceResult = await connectionPool.query("SELECT * FROM my_balance WHERE _id=$1", [fromUserId]);

        let fromUserBalance = fromBalanceResult.rows[0].balance;
        let fromUserPin = fUserResult.rows[0].pin;

        // // Receiver
        let tUserResult = await connectionPool.query("SELECT * FROM registration_details WHERE _id=$1", [mobile]);
        let toUser = tUserResult.rows[0];

        if (!toUser) {
            return res.status(404).json({ message: "Receiver not found" });
        }

        let toBalanceResult = await connectionPool.query("SELECT * FROM my_balance WHERE _id=$1", [mobile]);
        let toUserBalance = toBalanceResult.rows[0].balance ;

        let isMatched = await bcrypt.compare(pin, fromUserPin);

        // console.log(isMatched) ;

        if (!isMatched) {

            return res.status(400).json({ message: "Invalid Pin" });
        }

        amount = Number(amount) ;

        // console.log(fromUserBalance, amount , mobile , pin) ;
        // console.log(typeof(amount)) ;

        if (fromUserBalance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        let fromUserNewAmount = Number(fromUserBalance) - amount ;
        let toUserNewAmount = Number(toUserBalance) + amount ;

        let updateFromUser = connectionPool.query("UPDATE my_balance SET balance=$1 WHERE _id=$2",[fromUserNewAmount,fromUserId]) ;
        let updateToUser = connectionPool.query("UPDATE my_balance SET balance=$1 WHERE _id=$2",[toUserNewAmount,mobile]) ;

        let history = await connectionPool.query("INSERT INTO history (_id,amount,work,destination) VALUES ($1,$2,$3,$4) RETURNING *",[fromUserId,amount,"send money",mobile]);

        res.status(200).json({ message: "All OK - Money sending successfully complete" });

    } catch (err) {
        console.error(err);
        return  res.status(500).json({
            message: "Error occurred while sending money",
            error: err.message
        });
    }
};


let getCashOut = function(req,res){

    res.status(200).sendFile(path.join(__dirname , ".." , "view" , "cashOut.html")) ;

}

let postCashOut = async function(req,res){

    try {
        let { mobile, amount, pin } = req.body;
        let fromUserId = req.user._id;

        // console.log(mobile , amount , pin , fromUserId) ;

        let fUserResult = await connectionPool.query("SELECT * FROM registration_details WHERE _id=$1", [fromUserId]);
        let fromBalanceResult = await connectionPool.query("SELECT * FROM my_balance WHERE _id=$1", [fromUserId]);

        let fromUserBalance = fromBalanceResult.rows[0].balance;
        let fromUserPin = fUserResult.rows[0].pin;

        // // // Receiver
        let tUserResult = await connectionPool.query("SELECT * FROM agent_login WHERE _id=$1", [mobile]);
        let toUser = tUserResult.rows[0];

        if (!toUser) {
            return res.status(404).json({ message: "Agent not found" });
        }

        let toBalanceResult = await connectionPool.query("SELECT * FROM agent_balance WHERE _id=$1", [mobile]);
        // console.log(toBalanceResult) ;
        let toUserBalance = toBalanceResult.rows[0].balance ;

        let isMatched = await bcrypt.compare(pin, fromUserPin);

        // // console.log(isMatched) ;

        if (!isMatched) {

            return res.status(400).json({ message: "Invalid Pin" });
        }

        amount = Number(amount) ;

        // // console.log(fromUserBalance, amount , mobile , pin) ;
        // // console.log(typeof(amount)) ;

        if (fromUserBalance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        let fromUserNewAmount = Number(fromUserBalance) - amount ;
        let toUserNewAmount = Number(toUserBalance) + amount ;

        let updateFromUser = connectionPool.query("UPDATE my_balance SET balance=$1 WHERE _id=$2",[fromUserNewAmount,fromUserId]) ;
        let updateToUser = connectionPool.query("UPDATE agent_balance SET balance=$1 WHERE _id=$2",[toUserNewAmount,mobile]) ;

        let history = await connectionPool.query("INSERT INTO history (_id,amount,work,destination) VALUES ($1,$2,$3,$4) RETURNING *",[fromUserId,amount,"cash out",mobile]);

        res.status(200).json({ message: "All OK - Money cash-out successfully complete" });

    } catch (err) {
        console.error(err);
        return  res.status(500).json({
            message: "Error occurred while sending money",
            error: err.message
        });
    }

}


let getRecharge = function(req,res){

    res.status(200).sendFile(path.join(__dirname , ".." , "view" , "recharge.html")) ;

}



let postRecharge = async function(req,res){

    try {
        let { mobile, amount, pin } = req.body;
        let fromUserId = req.user._id;

        // console.log(mobile , amount , pin , fromUserId) ;

        let fUserResult = await connectionPool.query("SELECT * FROM registration_details WHERE _id=$1", [fromUserId]);
        let fromBalanceResult = await connectionPool.query("SELECT * FROM my_balance WHERE _id=$1", [fromUserId]);

        let fromUserBalance = fromBalanceResult.rows[0].balance;
        let fromUserPin = fUserResult.rows[0].pin;

        let isMatched = await bcrypt.compare(pin, fromUserPin);

        if (!isMatched) {

            return res.status(400).json({ message: "Invalid Pin" });
        }

        amount = Number(amount) ;

        if (fromUserBalance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        let fromUserNewAmount = Number(fromUserBalance) - amount ;

        let updateFromUser = connectionPool.query("UPDATE my_balance SET balance=$1 WHERE _id=$2",[fromUserNewAmount,fromUserId]) ;

        let history = await connectionPool.query("INSERT INTO history (_id,amount,work,destination) VALUES ($1,$2,$3,$4) RETURNING *",[fromUserId,amount,"Recharge",mobile]);

        res.status(200).json({ message: "All OK - Money recharge successfully complete" });

    } catch (err) {
        console.error(err);
        return  res.status(500).json({
            message: "Error occurred while sending money",
            error: err.message
        });
    }

}


let getPayment = function(req,res){

    res.status(200).sendFile(path.join(__dirname , ".." , "view" , "payment.html")) ;

}

let postPayment = async function(req,res){

    try {
        let { mobile, amount, pin } = req.body;
        let fromUserId = req.user._id;

        // console.log(mobile , amount , pin , fromUserId) ;

        let fUserResult = await connectionPool.query("SELECT * FROM registration_details WHERE _id=$1", [fromUserId]);
        let fromBalanceResult = await connectionPool.query("SELECT * FROM my_balance WHERE _id=$1", [fromUserId]);

        let fromUserBalance = fromBalanceResult.rows[0].balance;
        let fromUserPin = fUserResult.rows[0].pin;

        let isMatched = await bcrypt.compare(pin, fromUserPin);

        if (!isMatched) {

            return res.status(400).json({ message: "Invalid Pin" });
        }

        amount = Number(amount) ;

        if (fromUserBalance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        let fromUserNewAmount = Number(fromUserBalance) - amount ;

        let updateFromUser = connectionPool.query("UPDATE my_balance SET balance=$1 WHERE _id=$2",[fromUserNewAmount,fromUserId]) ;

        let history = await connectionPool.query("INSERT INTO history (_id,amount,work,destination) VALUES ($1,$2,$3,$4) RETURNING *",[fromUserId,amount,"Recharge",mobile]);

        res.status(200).json({ message: "All OK - Payment successfully complete" });

    } catch (err) {
        console.error(err);
        return  res.status(500).json({
            message: "Error occurred while sending money",
            error: err.message
        });
    }

}


let getAddMoney = function(req,res){

    res.status(200).sendFile(path.join(__dirname , ".." , "view" , "addMoney.html")) ;

}

let postAddMoney = async function(req,res){

    try {
        let {bank , amount , mobile , pin , account } = req.body.allDetails;

        account = account.toString().trim().split(/\s+/).join('');
        amount = Number(amount);

        let _id = req.user._id;

        // console.log(mobile,_id) ;

         let user = await connectionPool.query("SELECT * FROM registration_details WHERE _id = $1" , [_id]) ;
        let usersPin = user.rows[0].pin ;

        let userBalance = await connectionPool.query("SELECT * FROM my_balance WHERE _id = $1" , [_id]) ;
        let currentBalance = Number(userBalance.rows[0].balance);

        let isMatched = await bcrypt.compare(pin, usersPin);

        // console.log(usersPin , fullPin , amount , currentBalance) ;

        if(isMatched)
        {
            let account1 = await connectionPool.query("SELECT * FROM bank WHERE account_number=$1",[account]) ;
            let haveAccount = account1.rows[0] ;

            // console.log(account , account1) ;

            if(haveAccount)
            {
                let oldBalanceBank = Number(haveAccount.balance); 

                if(oldBalanceBank >= amount)
                {

                    let newBalanceBank = Number(oldBalanceBank) - amount ;

                    let newBalanceBkash = currentBalance + amount ;

                    let updateBalanceBkash = await connectionPool.query("UPDATE my_balance SET balance=$1 WHERE _id=$2",[newBalanceBkash,_id]);

                    let updateBalanceBank = await connectionPool.query("UPDATE bank SET balance=$1 WHERE account_number=$2",[newBalanceBank,account]);

                    let history = await connectionPool.query("INSERT INTO history (_id,amount,work,destination) VALUES ($1,$2,$3,$4) RETURNING *",[_id,amount,"bank to bkash",`account:${account}`]);


                    res.status(200).json({

                        success : true  ,
                        message : "money transfer success"

                    });

                }
            }
            else
            {
                res.status(200).json({

                    success : false  ,
                    message : "Invalid bank account"

                });
            }

        }
        else
        {
            res.status(200).json({

                    success : false  ,
                    message : "Incorrect Pin or insufficient balance"

                });
        }

    } 
    catch (err) 
    {
        console.error(err);
        return  res.status(500).json({
            message: "Error occurred while adding money",
            error: err.message
        });
    }

}

let getPayBill = function(req,res){

    res.status(200).sendFile(path.join(__dirname , ".." , "view" , "payBills.html")) ;

}

let postPayBill = async function(req,res){

    try {
        let { mobile, amount, pin , month , account } = req.body;
        let fromUserId = req.user._id;

        console.log(mobile , amount , pin , fromUserId , account , month) ;

        let fUserResult = await connectionPool.query("SELECT * FROM registration_details WHERE _id=$1", [fromUserId]);
        let fromBalanceResult = await connectionPool.query("SELECT * FROM my_balance WHERE _id=$1", [fromUserId]);

        let fromUserBalance = fromBalanceResult.rows[0].balance;
        let fromUserPin = fUserResult.rows[0].pin;

        let isMatched = await bcrypt.compare(pin, fromUserPin);

        if (!isMatched) {

            return res.status(400).json({ message: "Invalid Pin" });
        }

        amount = Number(amount) ;

        if (fromUserBalance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        let fromUserNewAmount = Number(fromUserBalance) - amount ;

        let updateFromUser = connectionPool.query("UPDATE my_balance SET balance=$1 WHERE _id=$2",[fromUserNewAmount,fromUserId]) ;

        let work = `pay bill - ${account} - ${month}` ;

        let history = await connectionPool.query("INSERT INTO history (_id,amount,work,destination) VALUES ($1,$2,$3,$4) RETURNING *",[fromUserId,amount,work,mobile]);

        res.status(200).json({ message: "All OK - Payment successfully complete" });

    } catch (err) {
        console.error(err);
        return  res.status(500).json({
            message: "Error occurred while sending money",
            error: err.message
        });
    }

}


let getPayBillHistory = function(req,res){

    res.status(200).sendFile(path.join(__dirname , ".." , "view" , "payBillsHistory.html")) ;

}


let getPayBillReceipt = function(req,res){

    res.status(200).sendFile(path.join(__dirname , ".." , "view" , "payBillsReceipt.html")) ;

}

let getSavings = function(req,res){

    res.status(200).sendFile(path.join(__dirname , ".." , "view" , "savings.html")) ;

}

let postSavings = async function(req,res){

    try
    {

        let {nameOfSavings , type , duration , savingsAmount , bankName , pin} = req.body ;
        let _id = req.user._id ;

        // console.log({nameOfSavings , type , duration , savingsAmount , bankName , pin}) ;

        let user = await connectionPool.query("SELECT * FROM registration_details WHERE _id = $1" , [_id]) ;
        let usersPin = user.rows[0].pin ;

        // console.log(usersPin) ;

        let isMatched = await bcrypt.compare(pin , usersPin) ;

        // console.log({usersPin , pin , isMatched}) ;

        if(isMatched)
        {

            let savingsAccount = await connectionPool.query("INSERT INTO savings(_id,name_of_savings,type,duration,savings_amount,bank_name) VALUES ($1,$2,$3,$4,$5,$6);",[_id , nameOfSavings , type , duration , savingsAmount , bankName]) ;
            res.status(200).json({

                success : true ,
                message : "Savings Account Created Done "

            });
        }
        else
        {
            res.status(200).json({

                success : false ,
                message : "Enter correct PIN !!!"

            });
        }

    }
    catch(error)
    {
        res.status(400).json({

            status : 400 ,
            message : "Find error to savings"

        });
    }

}

let getLoan = function(req,res){

    res.status(200).sendFile(path.join(__dirname , ".." , "view" , "loan.html")) ;

}

let postLoan = async function(req,res){

    try
    {
        // let {data} = req.body ;
        // console.log(data) ;

        let {fullName,mobileNumber,nidNumber,loanAmount,loanDuration,occupation,monthlyIncome,companyName,pin,reference,date} = req.body.data ;
        let _id = req.user._id ;

        let user = await connectionPool.query("SELECT * FROM registration_details WHERE _id = $1" , [_id]) ;
        let usersPin = user.rows[0].pin ;

        // console.log(usersPin) ;

        let isMatched = await bcrypt.compare(pin , usersPin) ;

        // console.log({usersPin , pin , isMatched}) ;

        if(isMatched)
        {
            let newLoan = await connectionPool.query(`INSERT INTO loan (_id, name, nid, occupation, reference, loan_amount, income, mobile, company, date)VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,[_id, fullName, nidNumber, occupation, reference, loanAmount, monthlyIncome, mobileNumber, companyName, date]);
            res.status(200).json({

                success : true ,
                message : "Loan is created"

            });
        }
        else
        {
            res.status(200).json({

                success : false ,
                message : "Pin is incorrect !!!"

            });
        }
        

    }
    catch(error)
    {
        res.status(400).json({

            status : 400 ,
            message : error.message

        });
    }

}

let getBkashtobank = function(req,res){

    res.status(200).sendFile(path.join(__dirname , ".." , "view" , "bkashToBank.html")) ;

}

let postBkashtobank = async function(req,res){

    try
    {

        let {bankName , accountNumber , name , amount , fullPin} = req.body.allDetails ;
        let _id = req.user._id ;
        fullPin = fullPin.toString();
        amount = Number(amount) ;

        // console.log(bankName , accountNumber , name , amount , fullPin) ;

        let user = await connectionPool.query("SELECT * FROM registration_details WHERE _id = $1" , [_id]) ;
        let usersPin = user.rows[0].pin ;

        let userBalance = await connectionPool.query("SELECT * FROM my_balance WHERE _id = $1" , [_id]) ;
        let currentBalance = userBalance.rows[0].balance ;

        let isMatched = await bcrypt.compare(fullPin, usersPin);

        // console.log(usersPin , fullPin , amount , currentBalance) ;

        if(isMatched && currentBalance>amount)
        {
            let account = await connectionPool.query("SELECT * FROM bank WHERE account_number=$1",[accountNumber]) ;
            let haveAccount = account.rows[0] ;

            if(haveAccount)
            {
                let oldBalanceBank = haveAccount.balance ;
                let newBalanceBank = Number(oldBalanceBank) + amount ;

                let newBalanceBkash = currentBalance - amount ;

                let updateBalanceBkash = await connectionPool.query("UPDATE my_balance SET balance=$1 WHERE _id=$2",[newBalanceBkash,_id]);

                let updateBalanceBank = await connectionPool.query("UPDATE bank SET balance=$1 WHERE account_number=$2",[newBalanceBank,accountNumber]);

                let history = await connectionPool.query("INSERT INTO history (_id,amount,work,destination) VALUES ($1,$2,$3,$4) RETURNING *",[_id,amount,"bkash to bank",accountNumber]);


                res.status(200).json({

                    success : true  ,
                    message : "money transfer success"

                });
            }
            else
            {
                res.status(200).json({

                    success : false  ,
                    message : "Invalid bank account"

                });
            }

        }
        else
        {
            res.status(200).json({

                    success : false  ,
                    message : "Incorrect Pin or insufficient balance"

                });
        }


    }
    catch(error)
    {
        res.status(400).json({

            status : 400 ,
            message : error.message

        });
    }

}


// Exports Code :

module.exports = {

    getMain ,

    getSendMoney ,
    postSendMoney ,

    getCashOut ,
    postCashOut ,

    getRecharge ,
    postRecharge ,

    getPayment ,
    postPayment ,

    getAddMoney ,
    postAddMoney ,

    getPayBill ,
    postPayBill ,

    getPayBillHistory,
    getPayBillReceipt,

    getSavings ,
    postSavings ,

    getLoan ,
    postLoan ,

    getBkashtobank ,
    postBkashtobank ,

    getLogout ,


}
