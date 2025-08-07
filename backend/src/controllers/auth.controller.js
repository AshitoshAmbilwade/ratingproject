// src/controllers/auth.controller.js
import bcrypt from 'bcrypt';
import prisma from '../config/db.js';
import { signupSchema, loginSchema,updatePasswordSchema } from '../validations/auth.validation.js';
import { generateToken } from '../utils/token.js'; // ✅ Imported from utils

export const signup = async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  const { name, email, password, address, role } = parsed.data;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address,
        role,
      },
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed' });
  }
};

export const login = async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  const { email, password } = parsed.data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // ✅ Use generateToken utility
    const token = generateToken({ id: user.id, role: user.role });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, role: user.role }
    });

  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

export const updatePassword = async (req, res) => {
  const parsed = updatePasswordSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  const { currentPassword, newPassword } = parsed.data;

  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedNewPassword },
    });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Password update error:", err);
    res.status(500).json({ error: "Failed to update password" });
  }
};