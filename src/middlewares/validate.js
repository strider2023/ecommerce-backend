const axios = require('axios');

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).send({ error: "Invalid request. Authorization token missing." });
    }
    axios.get(`${process.env.DIRECTUS_URL}/users/me`, { headers: { 'Authorization': token } })
        .then(function (response) {
            console.log(response);
            req.user = response.data.data;
            next();
        })
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    return res.status(401).send({ error: "Invalid token." });
                } else if (error.response.status === 403) {
                    return res.status(403).send({ error: "Token expired. Please login again." });
                } else {
                    return res.status(500).send({ error: "Internal server error. Unable to validate token." });
                }
            }
        });
};

module.exports = verifyToken;