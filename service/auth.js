//jwt starts here

const jwt=require("jsonwebtoken");
//secret key is used to generate signature
const SECRET_KEY="nadeem@2006"

//removed map state

//this function makes token
function setUser(user){
   //signature
   return jwt.sign(
    {
    //payload
    _id:user._id,
    email:user.email
   }, SECRET_KEY);
};

//now user jwt (token) comeback from browser and jwt verify the token signature using secret key
// and if it is true it returns decoded payload otherwise throw an error
function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token,SECRET_KEY);
    }catch(err){
        return null
    }
   
}

module.exports = {
    setUser,
    getUser,
};