const User=require('../models/user')
const {v4: uuidv4}= require("uuid")
const {setUser}= require("../service/auth")
async function handleUserSignup(req,res){
    const {name , email, password}=req.body;

    await User.create({
        name,
        email,
        password,
    });

    return res.redirect("/");
}

async function handleUserLogin(req,res){
    const {email, password}=req.body;

    // Step 1: check if email exists at all
    const existingUser = await User.findOne({ email });
    if(!existingUser) return res.render("login",{
        error: "You have not signed up yet. Please sign up first.",
    });

    // Step 2: check if password matches
    const user = await User.findOne({ email, password });
    if(!user) return res.render("login",{
        error: "Invalid password. Please try again.",
    });

    const sessionId=uuidv4();
    //jwt token
    const token=setUser(user);
    //putting jwt token in cookie
    //browser now stores jwt token in place of uid to verify the user based on it
    res.cookie("uid", token);
    return res.redirect("/");
}

module.exports={
    handleUserSignup,
    handleUserLogin,
}