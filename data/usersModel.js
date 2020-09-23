const db = require("./dbConfig")

module.exports = {
    getUsers, 
    getUser,
    addUser,
    getUsername, 
    getDepartment
}

function getUsers() {
    return db("users")
}

function getUser(id) {
    return db("users")
    .where({id}).first()
}

function getDepartment(department) {
    return db("users")
    .where({department})
}

function getUsername(username) {
    return db("users")
    .where({username}).first()
}

function addUser(newUser) {
    return db("users")
    .insert(newUser)
    .then((id) => getUser(id[0]));
}

