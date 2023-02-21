const router = require("express").Router();

//Middleware 
const authCheck = (req, res, next)=>{
    if(req.user){
        //User is logged in 
        next();
    }
    else{
        //User is not logged in 
        res.redirect("/auth/login")
    }
}

router.get("/view", authCheck, (req, res)=>{
    
    res.render("profile", {varName : req.user.username, varGoogleId : req.user.googleId})
})


module.exports = router;
