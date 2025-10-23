import { NextResponse } from "next/server";
import connectDB from "../../../lib/dbConnect";
import Product from "../../../models/Product";

interface Params {
  params: { id: string };
}

export async function PATCH(req: Request, { params }: Params) {
  await connectDB();
  const { id } = params;
  const body = await req.json();

  const updated = await Product.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}
