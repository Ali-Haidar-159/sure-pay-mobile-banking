let getEducation = function(req,res){

    if(req.isAuthenticated())
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "requestMoney.html")) ;
    }
    else
    {
        res.status(200).sendFile(path.join(__dirname , ".." , "view" , "loginFirst.html")) ;
    }

}

let postEducation = function(req,res){

    try
    {

    }
    catch(error)
    {

    }

}



let pins = document.querySelectorAll("");
let fullPins = "";

  pins.forEach(function(item){
    fullPins += item.value;
  });

  // Use relative URL instead of hardcoded localhost
  fetch("http://localhost:3000/recharge", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      mobile: mobileNum,
      amount: tk,
      pin: fullPins 
    })
  })
  .then(async function(r1){

  const data = await r1.json();

  if(r1.ok) {
    // console.log("Success:", data.message);  
    alert(data.message) ;
  } else {
    alert(data.message) ;
    // console.error("Error:", data.message);  
  }
})
.catch(function(err){
  console.error("Network error:", err);
});








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
		
		
		
		
SELECT * FROM registration_details ;

SELECT * FROM my_balance ;

SELECT * FROM history ;

SELECT * FROM user_full_details ;

SELECT * FROM request_money ;

SELECT * FROM remittance ;

INSERT INTO agent_login(_id,mobile_number,pin)
VALUES ('01718709957' , '01718709957' , '77788') ;

INSERT INTO agent_balance(_id,balance)
VALUES ('01718709957' , 1000) ;

INSERT INTO bank(account_number,balance)
VALUES ('1234567895566' , 1000) ;

SELECT * FROM agent_login ;
SELECT * FROM agent_balance ;

UPDATE my_balance SET balance=5000
WHERE _id='01729148593' ;

TRUNCATE TABLE registration_details;

CREATE TABLE remittance (
    _id VARCHAR(11) NOT NULL ,
    mobile VARCHAR(15) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL
);









/ let userDetails = await connectionPool.query(`INSERT INTO user_full_details (_id, name, address, father, mother, DOB)VALUES ($1, $2, $3, $4, $5, $6)`,[mobile, name, address, fatherName, motherName, dob]);
            // let user = await  connectionPool.query("INSERT INTO registration_details(_id,pin,NID,mobile_number)VALUES ($1 , $2 , $3 ,$4) RETURNING *",[mobile,hash,nid,mobile]) ;
            // let balance = await  connectionPool.query("INSERT INTO my_balance(_id , balance)VALUES ($1 , $2) RETURNING *",[mobile,"5"]) ;