const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/user-model");

//endpoint beginning with /api/auth
router.post("/register", (req, res) => {
  const user = req.body;

  //hash the password so it doesn't show up in the sytem
  //and be vulnerable for hackers
  const hash = bcrypt.hashSync(user.password, 8);

  //we override the password with the hash
  user.password = hash;

  Users.add(user)
    .then(saved => {
      console.log(user);
      //this allows the information to be dsiplayed
      //for the users session on the server side
      req.session.username = user.username;
      req.session.department = "admin";
      res.status(200).json({ saved, ...req.session });
    })
    .catch(error => {
      status(500).json(error.stack);
    });
});

router.post('/login', (req, res) => {
    let {username, password} = req.body;

    if(username && password) {
        
        Users.findBy({username})
        .first()
        .then(user => {
            console.log(username, password)
            if(user && bcrypt.compareSync(password, user.password)){
            res.status(200).json({message: `Welcome ${user.username}!`});
        }else{
            res.status(401).json({message: 'Wrong credentials...Please try again'})
        }
    })
    .catch(error => {
        res.status(500).json(error.stack)
    })
    }else{
        res.status(400).json({message: 'please provide credentials'});
    }
});

module.exports = router;