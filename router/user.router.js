// initial code 

"use strict";
console.clear();

// Starts The Main Code : 

// Require All The Modules , Packages And Objects : 

let express = require("express") ;
let userRoute = express.Router() ;
const multer = require('multer');
let path = require("path") ;
let bcrypt = require("bcrypt") ;
let passport = require("passport") ;

let { getMain, getLogout, getSendMoney, postSendMoney, getCashOut, postCashOut, getRecharge, postRecharge, getPayment, postPayment, getAddMoney, postAddMoney, getPayBill, postPayBill, getPayBillHistory, getPayBillReceipt, getSavings, postSavings, getLoan, postLoan, getBkashtobank, postBkashtobank } = require("../controller/user.controller");
const connectionPool = require("../config/database.config");

//Router Code : 

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'), // ensure uploads/ folder exists
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

userRoute.post('/register', upload.fields([
    { name: 'nid-front', maxCount: 1 },
    { name: 'nid-back', maxCount: 1 },
    { name: 'frontFaceInput', maxCount: 1 },
    { name: 'leftFaceInput', maxCount: 1 },
    { name: 'rightFaceInput', maxCount: 1 }
    ]),async (req, res) => {
    let {mobile , fullPin , name,fatherName , motherName , dob , nidno , address} = req.body;
    let files = req.files;
    let nid = "123456"
    // console.log({mobile , fullPin , name,fatherName , motherName , dob , address});
    
        let existsUser = await connectionPool.query("SELECT * FROM registration_details WHERE _id=$1",[mobile]) ;
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
                
            // let userDetails = await connectionPool.query(`INSERT INTO user_full_details (_id, name, address, father, mother, DOB)VALUES ($1, $2, $3, $4, $5, $6)`,[mobile, name, address, fatherName, motherName, dob]);
            // let user = await  connectionPool.query("INSERT INTO registration_details(_id,pin,NID,mobile_number)VALUES ($1 , $2 , $3 ,$4) RETURNING *",[mobile,hash,nid,mobile]) ;
            // let balance = await  connectionPool.query("INSERT INTO my_balance(_id , balance)VALUES ($1 , $2) RETURNING *",[mobile,"5"]) ;

            let registerReq = await connectionPool.query(`INSERT INTO pending (_id, mobile, name, father, mother, dob, pin, nid, address)VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [mobile,  mobile,name,fatherName,motherName,dob,hash,"886612",address]);


            res.redirect("/main");

            });
        }



});

userRoute.post('/login',passport.authenticate('for-user', 
    { 
        failureRedirect: '/wrongPinNum' , 
        successRedirect:"/main"
    }
));

userRoute.get("/main", getMain);

userRoute.get("/sendmoney" , getSendMoney) ;
userRoute.post("/sendmoney" , postSendMoney) ;

userRoute.get("/cashout" , getCashOut) ;
userRoute.post("/cashout" , postCashOut) ;

userRoute.get("/recharge" , getRecharge) ;
userRoute.post("/recharge" , postRecharge) ;

userRoute.get("/payment" , getPayment) ;
userRoute.post("/payment" , postPayment) ;

userRoute.get("/addmoney" , getAddMoney) ;
userRoute.post("/addmoney" , postAddMoney) ;

userRoute.get("/paybill" , getPayBill) ;
userRoute.post("/paybill" , postPayBill) ;

userRoute.get("/paybillhistory" , getPayBillHistory) ;
userRoute.get("/paybillreceipt" , getPayBillReceipt) ;

userRoute.get("/savings" , getSavings) ;
userRoute.post("/savings" , postSavings) ;

userRoute.get("/loan" , getLoan) ;
userRoute.post("/loan" , postLoan) ;

userRoute.get("/bkashtobank" , getBkashtobank) ;
userRoute.post("/bkashtobank" , postBkashtobank) ;

userRoute.get("/logout" , getLogout) ;

// Exports Code :

module.exports = userRoute;