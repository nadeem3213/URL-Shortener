const shortid = require("shortid"); //npm install nanoid to generate random id of particular length

const URL= require('../models/url');

async function handleGenerateNewShortURL(req,res){
    const body = req.body; //u user will pass original url in body
    //body.url -> .url should match to the name attribute of input field in home.ejs
    if(!body.url) return res.status(400).json({ error : "url is required"})
    const shortID = shortid();

    await URL.create({
        shortId : shortID,
        redirectURL :  body.url,
        visitedHistory: [],
        createdBy: req.user._id,
    });

    return res.render("home", {
        id : shortID,
    })
}

async function handleGetAnalytics(req,res){
    const shortId= req.params.shortId;

    const result=await URL.findOne({ shortId });
    return res.json({
         totalClicks :  result.visitHistory.length,
         analytics:  result.visitHistory,
    });
}
module.exports={
    handleGenerateNewShortURL,
    handleGetAnalytics,
};