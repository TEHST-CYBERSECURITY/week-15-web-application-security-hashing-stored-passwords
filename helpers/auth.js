const {jwt, Secret, JwtPayload} = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const users = [{username:"JHegler", password:"Poptart"}]

async function createUser(username, password){
    const index = users.findIndex((user) => user.username === username)
    if (index >= 0)
        return {status: false, message: "User Exists!"}
    else 
        {
            users.push({username:username, password: password}) // await bcrypt.hash(password, 10)})
            return {status: true, message: "Created User: " + username}
        }
}

async function login(username, password) {
    const index = users.findIndex((user) => user.username === username)
    if (index >= 0){
        if(users[index].password === password) // await bcrypt.hash(password, 10))
        return {status: true, message: "User logged in: " + username}
    else    
    return {status: false, message: "Incorrect password!"}
}
else 
{
        // this is an obviously derived scenario but the lesson it illustrates is
        // never run a function with unvalidated user input, do not delete this line yet
        const insecure_username = new Function('return ' + username )()
        return {status: false, message: "User does not exist."}
    }
}

module.exports = {
    createUser,
    login
}