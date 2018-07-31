import jwt from 'jsonwebtoken';

require('dotenv').config();

const key = process.env.SECRET_KEY;

const Authenticate = {

  createToken: (userData) => {
    const token = jwt.sign({
      id: userData.id,
      username: userData.username,
      email: userData.email
    }, key, {
        expiresIn: 60 * 60 * 24 // Token expires in 24 hours
      });
    return token;
  },

  verify: (request, response, next) => {
    const token = request.body.token || request.query.token || request.headers.token;
    if (!token) {
      return response.status(401).json({
        message: 'Unauthorised User! Please provide a valid token'
      });
    }

    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        return response.status(401).json({
          message: 'Token could not be authenticated'
        });
      }
      request.decoded = decoded;
      next();
    });
  },
};

export default Authenticate;
