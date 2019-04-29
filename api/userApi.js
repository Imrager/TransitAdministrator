const mongoose = require('./connection.js');

let UserSchema = mongoose.Schema({
    name: String,
    cards: [{
        type:objectId,
        ref:Card
    }]
  });

function createUser(newUser) {
    return UserCollection.create(newUser);
}

function getUsers() {
  return UserCollection.find();
}

function getUser(userId) {
  return UserCollection.findById(userId);
}

function deleteUser(userId) {
  return UserCollection.deleteOne({_id: userId});
}

module.exports = {
  createUser,
  getUser,
  getUser,
  deleteUser
}