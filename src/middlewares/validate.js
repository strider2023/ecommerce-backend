const jwt = require('jsonwebtoken');

const verifyToken = async (token) => {
    try {
        const decoded = await jwt.verify(token, process.env.SECRET);
        return decoded;
    } catch (e) {
        return null;
    }
};

module.exports = {
    verifyToken: verifyToken
};