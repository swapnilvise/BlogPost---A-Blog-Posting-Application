const userAbout = {};

function getUserAboutData(username) {
    return userAbout[username];
}

function setUserAboutData(username, about) {
    userAbout[username] = about;
}

function getUserAbout() {
    return userAbout;
}

module.exports = {
    getUserAboutData,
    setUserAboutData,
    getUserAbout
}