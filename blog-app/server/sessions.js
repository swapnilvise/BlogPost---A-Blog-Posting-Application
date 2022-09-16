const sessions = {};

function setUserSession(sessionId, username) {
    sessions[sessionId] = username;
}

function getUserSession(sessionId) {
    return sessions[sessionId];
}

module.exports = {
    setUserSession,
    getUserSession
}