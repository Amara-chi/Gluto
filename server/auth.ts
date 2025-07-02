// server/auth.ts
import bcrypt from 'bcryptjs';
import { RequestHandler } from 'express';
import { storage } from './storage';

interface AuthUser {
  id: string;
  email: string;
  isAdmin?: boolean;
  firstName?: string;
  lastName?: string;
}

export async function login(email: string, password: string) {
  const user = await storage.getUserByEmail(email);

  if (!user) {
    throw new Error('User not found');
  }

  const passwordValid = await bcrypt.compare(password, user.passwordHash);
  if (!passwordValid) {
    throw new Error('Invalid password');
  }

  if (!user.isAdmin) {
    throw new Error('Admin access required');
  }

  return {
    id: user._id.toString(), // ✅ use _id
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    isAdmin: user.isAdmin,
  };
}

export async function register(email: string, password: string) {
  const existing = await storage.getUserByEmail(email);
  if (existing) {
    throw new Error('User already exists');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await storage.createUser({
    email,
    passwordHash,
    isAdmin: true,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  return {
    id: user._id.toString(), // ✅ use _id
    email: user.email,
    isAdmin: user.isAdmin,
  };
}

// In-memory mock session (dev only)
let currentUser: AuthUser | null = null;

export const authenticate: RequestHandler = (req, res, next) => {
  if (!currentUser) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  req.user = currentUser;
  next();
};

export const setCurrentUser = (user: AuthUser) => {
  currentUser = user;
};

export const getCurrentUser = () => currentUser;
