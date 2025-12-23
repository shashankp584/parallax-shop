import { Request, Response } from "express";
import prisma from "../prismaClient";
import bcrypt from "bcrypt";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt";

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ message: "Email already used" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, passwordHash, role: "USER" },
  });

  const accessToken = signAccessToken({ id: user.id, role: user.role });
  const refreshToken = signRefreshToken({ id: user.id, role: user.role });

  // Optionally store refreshToken in DB
  await prisma.user.update({ where: { id: user.id }, data: { refreshToken } });

  res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, accessToken, refreshToken });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const accessToken = signAccessToken({ id: user.id, role: user.role });
  const refreshToken = signRefreshToken({ id: user.id, role: user.role });

  await prisma.user.update({ where: { id: user.id }, data: { refreshToken } });

  res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, accessToken, refreshToken });
}

export async function refreshToken(req: Request, res: Response) {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: "Missing refresh token" });
  try {
    const payload = verifyRefreshToken(token) as any;
    // optional: validate token matches DB stored token for user
    const user = await prisma.user.findUnique({ where: { id: Number(payload.id) } });
    if (!user || user.refreshToken !== token) return res.status(401).json({ message: "Invalid refresh token" });

    const accessToken = signAccessToken({ id: user.id, role: user.role });
    res.json({ accessToken });
  } catch (err) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
}

export async function logout(req: Request, res: Response) {
  const { token } = req.body;
  if (!token) return res.json({ ok: true });
  try {
    const payload = verifyRefreshToken(token) as any;
    await prisma.user.update({ where: { id: Number(payload.id) }, data: { refreshToken: null } });
    res.json({ ok: true });
  } catch {
    res.json({ ok: true });
  }
}
