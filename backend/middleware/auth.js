const { CognitoJwtVerifier } = require('aws-jwt-verify');

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: 'id',
  clientId: process.env.COGNITO_CLIENT_ID
});

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = await verifier.verify(token);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
};
