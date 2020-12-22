const users = [];

// Join user to chat
function userJoin(id, name, room){
    const user = { id, name, room };
    users.push(user);

    return user;
}

// Get current user
function getCurrentUserById(id){
    return users.find(user => user.id === id);
}

module.exports = {
    userJoin,
    getCurrentUserById
}