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
const PORT= 8000;
 
connectToMongoDB('mongodb://127.0.0.1:27017/short-url')  //short-url is database name
.then(() => console.log('Mongodb connected')
);
//telling express to set ejs view engine
app.set("view engine", "ejs")
app.set("views", path.resolve("./views")); //ejs files are stored in views

app.use(express.json());//middleware
app.use(express.urlencoded({extended:true})); //to get data from form in home.ejs   
app.use(cookieParser());

//for every request whose path starts with /url first run Restric and then continue to url route
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute)
app.use("/", checkAuth,staticRoute); 

app.get("/url/:shortId", async (req,res) => {
    const shortId =  req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
        visitHistory : {
           timestamp:Date.now(), 
        },
    },
}
);
if(!entry){
    return res.status(404).send("URL not found");
}
res.redirect(entry.redirectURL);
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
