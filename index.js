require('dotenv').config();
const cookieParser = require('cookie-parser')
const { restrictToLoggedinUserOnly, checkAuth }= require("./middlewares/auth")
const express = require('express');
const path= require('path');

// database connection
const { connectToMongoDB }= require("./connect");

const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const urlRoute = require("./routes/url");

const app= express();
const URL=require("./models/url");
const PORT= process.env.PORT || 8000;
 
connectToMongoDB(process.env.MONGO_URI)
.then(() => console.log('Mongodb connected'))
.catch(err => console.error('MongoDB connection error:', err));
//telling express to set ejs view engine
app.set("view engine", "ejs")
app.set("views", path.resolve("./views")); //ejs files are stored in views

app.use(express.json());//middleware
app.use(express.urlencoded({extended:true})); //to get data from form in home.ejs   
app.use(cookieParser());

// public route for short url redirection
app.get("/url/:shortId", async (req,res,next) => {
    try {
        const shortId =  req.params.shortId;
        const entry = await URL.findOneAndUpdate({
            shortId
        }, {
            $push: {
            visitHistory : {
               timestamp:Date.now(), 
            },
        },
    });
    if(!entry){
        return res.status(404).send("URL not found");
    }
    res.redirect(entry.redirectURL);
    } catch (err) {
        next(err);
    }
});

//for every request whose path starts with /url first run Restric and then continue to url route
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute)
app.use("/", checkAuth,staticRoute); 

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

app.listen(PORT,()=> console.log(`Server Started at Port: ${PORT}`));



// "scripts": { instead of writing node index.js we change script and use npm start
//     "start": "nodemon index.js" 
//   },


//npm i express
//npm i mongoose
//npm i nodemon
//npm init
//npm i nanoid ->not working
// npm i shortid
//npm i ejs
//npm i cookie parser
