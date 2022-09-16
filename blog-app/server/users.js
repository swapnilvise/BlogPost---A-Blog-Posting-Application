const users = {};

function getUserData(username) {
    return users[username];
}

function setUserData(username, email, createDate, updateDate) {
    users[username] = {email, createDate, updateDate};
}

function deleteUserDate(username) {
    delete users[username];
}

function getUsers() {
    return users;
}

module.exports = {
    getUserData,
    setUserData,
    deleteUserDate,
    getUsers
}