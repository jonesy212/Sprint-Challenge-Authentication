const router = require('express').Router();

const Users = require('./user-model')
const restricted = require('../auth/restricted-middleware')


router.get('/', restricted, (req, res) =>{
    Users.find()
    .then(users => {
        res.json(users);
    })
    .catch(error => res.send(error.stack))
});

router.get('/hash', (req, res) => {
    //read a password from the Authorization header
    const password = req.headers.authorization;

    if(password){
        //that 8 is how we slow don attackers tryingto pre-generate hashes
        const hash = bcrypt.hashSync(password, 10); //the 8 is the number of round 2^8
        //a good starting value is 14 on the  server

        res.status(200).json({hash});
        //retun an object with the password hashed hashed using bcryptjs
    // { hash: '970(&(:OHKJHIY*HJKH(*^)*&YLKJBLKJGHIUGH(*P' }

    }else{
        res.status(400).json({message: 'please provide credentials'});
    }
});

module.exports = router;