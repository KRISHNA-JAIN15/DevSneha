const JWT = require("jsonwebtoken")

const secret = "$uperMan12#";

function createToken(user){
    const payload = {
        _id: user.id,
        email: user.email,
        name: user.name,
        role : user.role,
        phone: user.phone,
    }
    const token = JWT.sign(payload , secret);
    return token;
}

function validateToken(token){
    const payload = JWT.verify(token , secret);
    return payload;
}

module.exports = {
    createToken,
    validateToken
}