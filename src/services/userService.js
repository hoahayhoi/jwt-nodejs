const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10; 

const createUserService = async ( name, email, password) => {
    // hash user password
    const hashPassword = await bcrypt.hash(password, saltRounds)
    // save user to database 
    try {
        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword, 
            role: "minhhoa"
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const loginService = async (email, password) => {
    try {
        // fetch user by email 
        const user = await User.findOne({email: email}); 

        if (user) {
            // compare password
            const isMatchPassword = await bcrypt.compare(password, user.password);
            if (!isMatchPassword) {
                return {
                    EC: 2, 
                    EM: "Email/Password không hợp lệ"
                }
            } else {
                // create an access token 
                return "create an access token "
            }
        } else {
            return {
                EC: 1, 
                EM: "Email/Password không hợp lệ"
            }
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createUserService,
    loginService
}