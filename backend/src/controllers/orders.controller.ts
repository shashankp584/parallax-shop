import { Response } from "express";
import prisma from "../prismaClient";
import { AuthRequest } from "../middleware/auth.middleware";

export async function createOrder(req: AuthRequest, res: Response) {
  const { items, shippingAddress } = req.body;
  if (!items || items.length === 0) return res.status(400).json({ message: "No items" });

  // compute total
  const productIds = items.map((i: any) => i.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

  const total = items.reduce((sum: number, it: any) => {
    const p = products.find((x) => x.id === it.productId);
    return sum + (p ? p.price * it.quantity : 0);
  }, 0);

  // TODO: wrap in a transaction: create order, create items, decrement stock atomically
  const order = await prisma.order.create({
    data: {
      userId: req.user!.id,
      totalAmount: total,
      status: "PENDING",
      shippingLine1: shippingAddress.line1,
      shippingLine2: shippingAddress.line2,
      city: shippingAddress.city,
      state: shippingAddress.state,
      postalCode: shippingAddress.postalCode,
      country: shippingAddress.country,
      items: {
        create: items.map((it: any) => ({
          productId: it.productId,
          quantity: it.quantity,
          price: it.price || 0,
        })),
      },
    },
    include: { items: true },
  });

  res.status(201).json(order);
}

export async function listOrders(_: any, res: Response) {
  const orders = await prisma.order.findMany({ include: { items: true, user: true }, orderBy: { createdAt: "desc" } });
  res.json(orders);
}

export async function getOrder(req: AuthRequest, res: Response) {
  const id = Number(req.params.id);
  const order = await prisma.order.findUnique({ where: { id }, include: { items: true, user: true } });
  if (!order) return res.status(404).json({ message: "Not found" });

  // owner or admin check
  if (req.user!.role !== "ADMIN" && order.userId !== req.user!.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  res.json(order);
}

export async function updateOrder(req: any, res: Response) {
  const id = Number(req.params.id);
  const { status } = req.body;
  const order = await prisma.order.update({ where: { id }, data: { status } });
  res.json(order);
}
