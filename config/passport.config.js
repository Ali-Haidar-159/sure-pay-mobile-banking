// initial code 

"use strict";
console.clear();

// Starts The Main Code : 

// Require All The Modules , Packages And Objects : 

let bcrypt = require("bcrypt") ;
let connectionPool = require("./database.config") ;
let passport = require("passport") ;
let LocalStrategy = require("passport-local").Strategy ;

//Passport Configuration : 

passport.use( "for-user" , new LocalStrategy({usernameField: 'mobile',passwordField: 'pin'},
    async function(mobile, pin, done) {

        try
        {

            let userResult = await connectionPool.query("SELECT * FROM registration_details WHERE mobile_number=$1",[mobile]);
            let user = userResult.rows[0] ;

            if (!user)
            {
                return done(null, false); 
            }

            let isMatched = await bcrypt.compare(pin , user.pin) ;
            console.log(isMatched) ;
            console.log("isMatched") ;

            if(isMatched)
            {
                return done(null , user) ;
            }
            else
            {
                return done(null , false) ;
            }

        }
        catch(error)
        {
            return done(error);
        }

}));




passport.use( "for-agent" , new LocalStrategy({usernameField: 'mobile',passwordField: 'pin'},
    async function(mobile, pin, done) {

        try
        {

            let userResult = await connectionPool.query("SELECT * FROM agent_login WHERE mobile=$1",[mobile]);
            let user = userResult.rows[0] ;

            if (!user)
            {
                return done(null, false); 
            }

            let isMatched = await bcrypt.compare(pin , user.pin) ;
            // console.log(isMatched) ;
            // console.log("isMatched") ;

            if(isMatched)
            {
                return done(null , user) ;
            }
            else
            {
                return done(null , false) ;
            }

        }
        catch(error)
        {
            return done(error);
        }

}));





passport.serializeUser(function(user , done){

    return done(null , { _id: user._id, role: user.role || 'user' }) ;
    

}) ;

passport.deserializeUser(async function(data , done){

    try
    {
        const { _id, role } = data;
        let user ;

        if (role === 'agent')
        {
            let userResult = await connectionPool.query("SELECT * FROM agent_login WHERE _id=$1" , [_id]) ;
            user = userResult.rows[0] ;
        }
        else
        {
            let userResult = await connectionPool.query("SELECT * FROM registration_details WHERE _id=$1" , [_id]) ;
            user = userResult.rows[0] ;
        }
        
        return done(null, user) ;

    }
    catch(error)
    {
        done(error) ;
    }

})

// Exports Code :





