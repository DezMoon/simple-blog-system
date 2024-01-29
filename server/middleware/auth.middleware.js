const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa"); // For verifying tokens signed with a public key

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://YOUR_AUTH0_DOMAIN/.well-known/jwks.json`, // Adjust if using a different authentication provider
  }),
  audience: "YOUR_API_IDENTIFIER", // Adjust with your API identifier
  issuer: `https://YOUR_AUTH0_DOMAIN/`, // Adjust if using a different authentication provider
  algorithms: ["RS256"],
});

module.exports = checkJwt;
