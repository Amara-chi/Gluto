// server/auth.ts
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
import { RequestHandler } from 'express';
import { storage } from './storage';

// const JWT_SECRET = process.env.JWT_SECRET || 'your-strong-secret-key';
// const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Simplified user type
interface AuthUser {
  id: string;
  email: string;
}

export async function createAuthToken(user: AuthUser): Promise<string> {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    return decoded;
  } catch (err) {
    return null;
  }
}

export const authenticate: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const user = await verifyToken(token);
  if (!user) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Attach user to request
  req.user = user;
  next();
};

export async function login(email: string, password: string) {
  // Implement your actual user lookup and password verification
  const user = await storage.getUserByEmail(email);
  
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new Error('Invalid credentials');
  }

  return createAuthToken({
    id: user.id,
    email: user.email
  });
}