import { NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import Product from "../../models/Product";
import jwt from "jsonwebtoken";

// Helper: Get user from Authorization header
const getUserFromToken = (req: Request) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "");
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { id: string; name: string; email: string };
  } catch {
    return null;
  }
};

// GET all products
export async function GET() {
  await dbConnect();
  const products = await Product.find({});
  return NextResponse.json(products);
}

// POST new product
export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const user = getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const newProduct = await Product.create({
    ...body,
    ownerId: user.id,
    ownerName: user.name,
    sold: false,
  });

  return NextResponse.json(newProduct);
}

// PUT toggle sold status
export async function PUT(req: Request) {
  await dbConnect();
  const { id, sold } = await req.json();
  const product = await Product.findById(id);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const user = getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (product.ownerId !== user.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const updated = await Product.findByIdAndUpdate(id, { sold }, { new: true });
  return NextResponse.json(updated);
}

// DELETE product
export async function DELETE(req: Request) {
  await dbConnect();
  const { id } = await req.json();
  const product = await Product.findById(id);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const user = getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (product.ownerId !== user.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  await Product.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
