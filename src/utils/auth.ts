import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const createToken = (
	payload: Record<string, unknown>,
	secret: Secret,
	options: Record<string, unknown>
): string => {
	return jwt.sign(payload, secret, options);
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
	return jwt.verify(token, secret) as JwtPayload;
};
// Generate Password Reset Token
const generatePasswordResetToken = (userId: string): string => {
  const payload = { userId };
  const secret = process.env.JWT_SECRET as string;

  // Set token to expire in 1 hour (3600 seconds)
  const options = { expiresIn: '1h' };

  return jwtHelpers.createToken(payload, secret, options);
};
// Verify the Reset Token
const verifyResetToken = (token: string) => {
	try {
	  const secret = process.env.JWT_SECRET as string;
	  const decodedToken = jwtHelpers.verifyToken(token, secret);
  
	  // Return the payload if the token is valid
	  return decodedToken;
	} catch (error) {
	  throw new Error('Invalid or expired reset token');
	}
  };

export const jwtHelpers = {
	createToken,
	verifyToken,
	generatePasswordResetToken,
	verifyResetToken
	
};
