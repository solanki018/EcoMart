import { NextResponse } from "next/server";
import connectDB from "../../../lib/dbConnect";
import Product from "../../../models/Product";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  await connectDB();
  const { id } = context.params;
  const body = await req.json();

  const updated = await Product.findByIdAndUpdate(id, body, { new: true });
  if (!updated) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  return NextResponse.json(updated);
}
