const db = require("../database/dbConfig");
const bcrypt = require('bcrypt')

module.exports = {
  addUser,
  findById,
};

function addUser(user) {
  const { username, password } = user;

  if (username && password) {
      console.log(user)
    const hash = bcrypt.hashSync(password, 8);
    user.password = hash;

    return db("users")
    .insert(user)
    .then(id=>findById(id))
  }
}

function findById([id]){

    return db('users as u')
    .select('u.user, u.id')
    .where({id})
    .first()
}