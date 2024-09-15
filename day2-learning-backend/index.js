const express = require('express');
const { UserModel, TodoModel } = require('./entity.js');
const jwt = require('jsonwebtoken');
const { auth, JWT_SECRET } = require('./auth.js');
const { logger } = require('./logger.js');
const bcrypt = require('bcryptjs');
const { connectMongoose } = require('./db.js');
// Create Express application
const app = express();

// Connect to MongoDB
connectMongoose();

// Middleware
app.use(express.json());

// Login endpoint
app.post('/login', async function (req, res) {
    const { email, password } = req.body;

    try {
        // Find the user
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or username' });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

    
        const token = jwt.sign(
            { id: user._id.toString() },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            message: 'Login successful',
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/signUp', async function (req, res) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordMinLength = 8;
    const { email, password } = req.body;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate password
    if (!password || password.length < passwordMinLength) {
        return res.status(400).json({ message: `Password must be at least ${passwordMinLength} characters long` });
    }
    try {
        // Check if the email is already in use
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password and create the user
        const hashPassword = await bcrypt.hash(password, 10);
        await UserModel.create({
            email,
            password: hashPassword  
        });

        res.status(201).json({
            message: 'User has successfully registered'
        });

    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// Create todo endpoint
app.post('/todo', auth, logger, async function (req, res) {
    const userId = req.userId; 
    console.log(userId) 
    const { title, done } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID not found' });
    }

    try {
        // Attempt to create a new todo
        await TodoModel.create({
            title,
            userId,
            done
        });
        res.json({
            message: 'Todo created'
        });
    } catch (error) {
        // Check if the error is due to a unique constraint violation
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Todo title must be unique' });
        }

        console.error('Error creating todo:', error);
        res.status(500).json({ message: 'Error creating todo' });
    }
});


// Get todos endpoint
app.get('/todos', auth, logger, async function (req, res) {
    const userId = req.userId;

    try {
        const todos = await TodoModel.find({ userId });
        res.json({
            todos
        });
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ message: 'Error fetching todos' });
    }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
