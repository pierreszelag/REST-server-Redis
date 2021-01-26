const jwt = require('jsonwebtoken')

function readCall(req, res) {

    const token = req.header('Authorization').replace('Bearer ', '')

    try{
        const payload = jwt.verify(token, process.env.JWT_TOKEN)
        console.log("answer to the call")
    } catch(error) {
        console.error("token error")
    }
    
}

module.exports.read = readCall;
