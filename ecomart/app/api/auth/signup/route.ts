import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, password, entryNumber } = body;

    if (!name || !email || !phone || !password || !entryNumber) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists with this email." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      entryNumber,
    });

    return NextResponse.json({ message: "Signup successful!", userId: user._id }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
