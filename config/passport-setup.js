const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys")
//Import Mongo Schema
const User = require("../models/user-model")

//Serialize users 
passport.serializeUser((user, done)=>{
    done(null, user.id)
})

passport.deserializeUser((id, done)=>{
    User.findById(id).then((user)=>{
        console.log(user)
        done(null, user)
    });
})



passport.use(new GoogleStrategy({
     //Options for the google strategy
     //From - https://console.cloud.google.com/apis/credentials

     // Solved the error here - https://stackoverflow.com/a/55741883/19887674
     callbackURL : "http://localhost:8000/auth/google/redirect",
     clientID : keys.google.clientID,
     clientSecret : keys.google.clientSecret

}, (accessToken, refreshToken, profile, done)=>{
    //Passport Callback function
    User.findOne({googleId: profile.id}).then((currentUser)=>{
        if(currentUser){
            //Aready there is an user for the associated GoogleID
            console.log("User already Signed", currentUser)

            // Next step is to serialize the user
            done(null, currentUser)
        }
        else{
            // Create new user in our DB
            new User({
                //From google 
                username: profile.displayName,
                googleId: profile.id, 
            }).save().then(
                (newUser)=>{
                    console.log("Saved to DB ", newUser)
                    done(null, newUser)

                })
            
        }
    })

})
);