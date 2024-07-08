const UserModel = require("../../user/model/UserModel");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.PASSWORD_ENCRYPT_SECRET_KEY;
const bcrypt = require('bcrypt');
const saltRounds = 10;

//login
const login = async (email, password) => {
    try {
            const user = await UserModel.findOne({
                where: {
                    email: email
                }
            });
            
            if (!user) {
                return { message: "User does not exist" }
            }

            //const passwordMatch = await comparePassword(password, user.password);
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return { message: "Password is incorrect" }
            }

            const token = jwt.sign({ email: email, id: user.id, username: user.username, image: user.image}, SECRET_KEY);

            return {
                message: "Login successful",
                token: token
            };
    } catch (error) {
        console.error("Error during login:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};


//signup
const signup = async (name, email, password) => {
    try {
        // Check if the email is already taken
        const existingUserByEmail = await UserModel.findOne({ where: { email: email } });
        if (existingUserByEmail) {
            return { message: "Email already taken" };
        }
        

        const hashedPassword = await hashPassword(password);

        // Generate a unique username
        const username = await generateUniqueUsername(name);

        // Create the user
        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: hashedPassword, 
        });

        const token = jwt.sign({ email: email, id: newUser.id, username: username}, SECRET_KEY);

        return {
            message: "Signup successful",
            token: token
        };
    } catch (error) {
        console.error("Error during signup:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};

//google login
const googleLogin = async (name, email) => {
    try {
        // Check if the email is already taken
        const existingUserByGmail = await UserModel.findOne({ where: { email: email } });
        if (existingUserByGmail) {
            const token = jwt.sign({ email: email, id: existingUserByGmail.id, username: existingUserByGmail.username, image: existingUserByGmail.image}, SECRET_KEY);
            
            return {
                message: "Login successful",
                token: token
            };
        }

        // Generate a unique username
        const username = await generateUniqueUsername(name);

        // Create the user
        const newUser = await UserModel.create({
            username: username,
            email: email,
        });

        const token = jwt.sign({ email: email, id: newUser.id, username: username}, SECRET_KEY);

        return {
            message: "Signup successful",
            token: token
        };
    } catch (error) {
        console.error("Error during signup:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};


//Function to hash the password (you need to implement this based on your chosen library)
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
};


//validate email
const validateEmail = (email) => {
    // Regular expression for basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        return false; // Invalid format
    }

    // Extracting domain from email address
    const domain = email.split('@')[1];

    // Checking if domain has valid DNS records
    return new Promise((resolve, reject) => {
        dns.resolve(domain, 'MX', (err, addresses) => {
            if (err || !addresses || addresses.length === 0) {
                resolve(false); // Domain does not exist or has no MX records
            } else {
                // Verifying if domain has a reachable mail server
                const smtpSocket = net.createConnection(25, addresses[0].exchange);
                smtpSocket.on('connect', () => {
                    smtpSocket.end();
                    resolve(true); // Domain has a reachable mail server
                });
                smtpSocket.on('error', (error) => {
                    smtpSocket.destroy();
                    resolve(false); // Domain does not have a reachable mail server
                });
            }
        });
    });
}

const generateUniqueUsername = async (name) => {
    let username;
    let isUnique = false;

    // Convert the name to lowercase and replace spaces with hyphens
    const formattedName = name.toLowerCase().replace(/\s+/g, '-');

    while (!isUnique) {
        const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
        username = `${formattedName}${randomNumber}`;

        // Check if the username is unique
        const existingUserByUsername = await UserModel.findOne({ where: { username: username } });
        if (!existingUserByUsername) {
            isUnique = true;
        }
    }

    return username;
};

module.exports = {
    login,  
    signup,
    googleLogin,
};
