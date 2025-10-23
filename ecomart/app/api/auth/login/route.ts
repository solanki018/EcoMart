import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required." }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
