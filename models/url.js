const mongoose = require('mongoose');


// defining schema
const urlSchema =new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true,
    },

    redirectURL :{
        type: String,
        required: true,
    },

    visitHistory : [{timestamp : {type : Number}}],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
},
 { timestamps: true}
);

// model to interact with database
const URL= mongoose.model('url',urlSchema); //url -> model name automatically gets convereted into urls

module.exports=URL;
