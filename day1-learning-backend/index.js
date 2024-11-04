const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

let users = [];
const JWT_TOKEN = 'JatinGupta';

// Sign Up Endpoint
app.post('/signUp', function(req, res) {
    const userName = req.body.userName;
    const password = req.body.password;

    if (userName.length < 5 || password.length < 7) {
        return res.json({
            message: "username or password is very small"
        });
    }

    users.push({
        userName: userName,
        password: password
    });
    res.json({
        message: 'User created successfully'
    });
});

// Login Endpoint
app.post('/login', function(req, res) {
    const userName = req.body.userName;
    const password = req.body.password;

    const user = users.find(i => i.userName === userName && i.password === password);
    if (user) {
        const token = jwt.sign({
            userName: userName
        }, JWT_TOKEN);
        user.token=token
        res.json({
            token: token
        });
        console.log(user, "User logged in");
    } else {
        res.status(403).send({
            message: "Invalid username and password"
        });
    }
});

// Get User Info Endpoint
app.get('/me', function(req, res) {
    // Extract token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({
            message: "No token provided"
        });
    }

    const token = authHeader.split(' ')[1]; // Extract the token part after "Bearer"
    
    try {
        const decodedInfo = jwt.verify(token, JWT_TOKEN);
        const userName = decodedInfo.userName;

        const user = users.find(i => i.userName === userName);
        if (user) {
            res.json({
                userName: user.userName,
                password: user.password
            });
        } else {
            res.status(403).send({
                message: "User not found"
            });
        }
    } catch (error) {
        res.status(403).send({
            message: "Invalid token"
        });
    }
});

// Server Setup
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
