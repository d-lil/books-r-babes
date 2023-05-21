const jwt = require('jsonwebtoken');
const secret = "mysecretsshhhhh";
const expiration = "2h";
// const secret = process.env.REACT_APP_SECRET;
// const expiration = process.env.REACT_APP_EXPIRES_IN;

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      // const { data } = jwt.verify(token, `${process.env.REACT_APP_SECRET}`, { maxAge: `${process.env.REACT_APP_EXPIRES_IN}` });
      req.user = data;
    } catch {
      console.log('Invalid token');
      
    }

    // send to next endpoint
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    // return jwt.sign({ data: payload }, `${process.env.REACT_APP_SECRET}`, { expiresIn: `${process.env.REACT_APP_EXPIRES_IN}` });
  },
};
