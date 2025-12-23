import { Request, Response } from "express";
import prisma from "../prismaClient";

export async function me(req: Request & { user?: any }, res: Response) {
  const user = await prisma.user.findUnique({ where: { id: req.user!.id }, select: { id: true, name: true, email: true, role: true } });
  res.json(user);
}

export async function listUsers(_: any, res: Response) {
  const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true, createdAt: true } });
  res.json(users);
}
