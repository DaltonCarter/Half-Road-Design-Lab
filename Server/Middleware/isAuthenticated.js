require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {


    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')

//My Comment: below is an if statement that is checking to see if something is returned to headerToken from the Authorization end point.
// This if statement will only trigger if the headerToken returns invalid, or falsy, and send back an appropriate error, and post a 
//console log.
// Code 401 is telling the user that the request was not completed because the authentication was invalid.
        if (!headerToken) {
            console.log('ERROR IN auth middleware')              
            res.sendStatus(401)
        }

        //My Comment: Below is a statement telling the variable to ATTEMPT set it's value to the result of the JWT verify method,
        //with the authenticated header token, and the SECRET passed in for processing. If something should be wrong with both or either
        //of those, or if the method fails, the throw statement will trigger sending the error to the .catch method, which will then
        //set the appropriate status code.
        // Code 500 is a generic code that is sent when no other code is sutible. It informs the user that there was some kind
        //of server error that prevented the request from going through.

        let token

        try {

            //My Comment: Ok all of my searching tells me that jwt.verify is a method that will return a decoded payload if 
            //the signiture is valid. if the signiture and optional expiration, audience, or issuer is valid. If it returns 
            //invalid it will throw an error. Also to be noted that if a call back is not supplied this function will act synchronously.

            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        //My Comment: in the event that the verify method doesn't throw an error, the below if statement will check to make sure
        //that token has a valid value,  if token does not have a valid value, it will throw an error once again telling the
        //user that the authentication has failed. 

        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }


        //My Comment: Well I'm making this comment because I need to make 5. Now, unless I am mistaken
        // the invoked function below is doing as it's name advertises, in the event that authentication is successful
        //this will execute allowing everything to move on to the NEXT step of matters.
        next()
    }
}