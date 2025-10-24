import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Product from "../../../models/Product";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

// Get user from token
const getUserFromToken = async (req: Request) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    await dbConnect();
    const user = await User.findById(decoded.id);
    return user;
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
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const newProduct = await Product.create({
    ...body,
    ownerId: user._id.toString(),
    ownerName: user.name,
    ownerEmail: user.email || "Not provided",
    ownerPhone: user.phone || "Not provided",
    sold: false,
  });

  return NextResponse.json(newProduct);
}

// PUT toggle sold
export async function PUT(req: Request) {
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, sold } = await req.json();
  const product = await Product.findById(id);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (product.ownerId !== user._id.toString())
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const updated = await Product.findByIdAndUpdate(id, { sold }, { new: true });
  return NextResponse.json(updated);
}

// DELETE product
export async function DELETE(req: Request) {
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  const product = await Product.findById(id);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (product.ownerId !== user._id.toString())
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  await Product.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
