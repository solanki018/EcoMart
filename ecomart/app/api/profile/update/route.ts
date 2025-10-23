import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

const getUserFromToken = (req: Request) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return null;

  const token = authHeader.replace("Bearer ", "");
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { id: string; email: string; name: string };
  } catch {
    return null;
  }
};

export async function POST(req: Request) {
  await dbConnect();

  const user = getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const allowedFields = ["name", "phone", "location", "bio", "profileImage"];
  const updateData: any = {};
  allowedFields.forEach((field) => {
    if (body[field] !== undefined) updateData[field] = body[field];
  });

  const updatedUser = await User.findByIdAndUpdate(user.id, updateData, { new: true }).lean();
  if (!updatedUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(updatedUser);
}
