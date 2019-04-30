const mongoose = require('./connection.js');

let AdminSchema = mongoose.Schema({
    name: String
  });

let AdminCollection = mongoose.model('Admin', AdminSchema);

function createAdmin(newAdmin) {
    return AdminCollection.create(newAdmin);
}

function getAdmins() {
  return AdminCollection.find();
}

function getAdmin(adminId) {
  return AdminCollection.findById(adminId);
}

function deleteAdmin(adminId) {
  return AdminCollection.deleteOne({_id: adminId});
}

module.exports = {
    createAdmin,
    getAdmins,
    getAdmin,
    deleteAdmin
  }