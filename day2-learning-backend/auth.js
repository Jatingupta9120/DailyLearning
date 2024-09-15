const jwt = require('jsonwebtoken');
const JWT_SECRET = 'jatinGupta'; 

function auth(req, res, next) {
  
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
       
        const decodedData = jwt.verify(token, JWT_SECRET);

        req.userId = decodedData.id;

        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(403).json({ message: 'Invalid token' });
    }
}

module.exports = {
    auth,
    JWT_SECRET
};
