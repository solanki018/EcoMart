import { NextResponse, NextRequest } from "next/server";
import connectDB from "../../../lib/dbConnect";
import Product from "../../../models/Product";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // <- note the Promise here
) {
  const { params } = context;
  const { id } = await params; // await the params promise
  await connectDB();
  const body = await req.json();

  const updated = await Product.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}
