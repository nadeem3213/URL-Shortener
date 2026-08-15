const User=require('../models/user')
const bcrypt = require('bcrypt');
const {setUser}= require("../service/auth")
async function handleUserSignup(req,res,next){
    try {
        const {name , email, password}=req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.redirect("/");
    } catch (err) {
        next(err);
    }
}

async function handleUserLogin(req,res,next){
    try {
        const {email, password}=req.body;

        // Step 1: check if email exists at all
        const existingUser = await User.findOne({ email });
        if(!existingUser) return res.render("login",{
            error: "You have not signed up yet. Please sign up first.",
        });

        // Step 2: check if password matches
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch) return res.render("login",{
            error: "Invalid password. Please try again.",
        });

        //jwt token
        const token=setUser(existingUser);
        //putting jwt token in cookie
        //browser now stores jwt token in place of uid to verify the user based on it
        res.cookie("uid", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        return res.redirect("/");
    } catch (err) {
        next(err);
    }
}

async function handleUserLogout(req,res){
    res.clearCookie("uid");
    return res.redirect("/");
}

module.exports={
    handleUserSignup,
    handleUserLogin,
    handleUserLogout,
}