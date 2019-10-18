/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const bcrypt = require('bcryptjs');

const Users = require('./auth-router');

//implement the protected middleware that will check for username and password
// in the headers and if valid, provide access to the endpoint

//removed function protected and created at
//module.exports arrow function

module.exports = (req, res, next) =>{

    const {authenticated} = req.session;

    if(authenticated){
        Users.findBy({username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)){
                next();
            } else {
                res.status(401).json({message: 'Incorrect user information'})
            }
        })
        .catch(error => {
            res.status(500).json({message: 'Unexpected error'}, ...error.stacks);
        });
    } else {
        res.status(400).json({message: 'Please provide credentials'});
    } 
}