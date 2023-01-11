const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
    const {authorization} = req.headers;

    if(!authorization) res.status(401).json({error: 'auth failed'});
    else {
        const token =  authorization.replace('Bearer ', '');
        jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
            if(err) res.status(401).json({error: 'auth failed'});
            else {
                const user_id = jwt.verify(token, process.env.JWT_KEY);
                next();
            }
        })
    }

};
module.exports = auth;