import { Request, Response } from "express";
import prisma from "../prismaClient";

export async function getProducts(req: Request, res: Response) {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Number(req.query.limit) || 24);
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      skip,
      take: limit,
      include: { images: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count(),
  ]);

  res.json({ items, meta: { page, limit, total } });
}

export async function getProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  const product = await prisma.product.findUnique({ where: { id }, include: { images: true } });
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
}

export async function createProduct(req: Request, res: Response) {
  const { name, slug, description, price, stock, category, images } = req.body;
  try {
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: Number(price),
        stock: Number(stock) || 0,
        category,
        images: { create: (images || []).map((url: string) => ({ url })) },
      },
      include: { images: true },
    });
    res.status(201).json(product);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Failed" });
  }
}

export async function updateProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { name, slug, description, price, stock, category, images } = req.body;
  try {
    await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        price: Number(price),
        stock: Number(stock) || 0,
        category,
      },
    });

    if (images) {
      await prisma.image.deleteMany({ where: { productId: id } });
      if ((images || []).length > 0) {
        await prisma.image.createMany({
          data: (images || []).map((url: string) => ({ url, productId: id })),
        });
      }
    }

    const updated = await prisma.product.findUnique({ where: { id }, include: { images: true } });
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Failed to update" });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    await prisma.image.deleteMany({ where: { productId: id } });
    await prisma.product.delete({ where: { id } });
    res.json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Failed to delete" });
  }
}
