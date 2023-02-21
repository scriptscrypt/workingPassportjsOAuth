//Creating router instance 
const router = require("express").Router();
//Import passport
const passport = require("passport")

// 21Feb2023

router.get("/login", (req, res)=>{
    res.render("login");
})


//Auth for Logout
router.get("/logout", (req,res)=>{
    
    //handle with passport
    // res.send("Logging out")
    req.logOut();
    res.redirect("/")
})

//Auth with Google 
router.get("/google", passport.authenticate("google", {
    scope: ['profile']
}));    
// GET template for redirect
// Middleware - To extract the code and exchange data - passport.authenticate("google")

router.get("/google/redirect", passport.authenticate('google'), (req, res)=>{
    // res.send(req.user)
    // res.render("profile", {varName : req.user.username, varGoogleId : req.user.googleId})
    res.redirect("/profile/view")
}) 

router.get("/profile", (req, res)=>{   
    res.render("profile", {varName : req.user, varGoogleId : req.user})
})

//Export router instance
module.exports = router;
