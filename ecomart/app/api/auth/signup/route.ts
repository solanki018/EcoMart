import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import { sendMail } from "../../../lib/sendMail";

const tempOTPStore = new Map(); // Temporary in-memory store (can use Redis later)

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

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Temporarily store user info + otp (for 5 min)
    tempOTPStore.set(email, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
      userData: { name, email, phone, password: hashedPassword, entryNumber },
    });

    // Send email with OTP
    await sendMail({
      to: email,
      subject: "EcoMart Signup OTP Verification",
      html: `<h2>Your OTP for EcoMart Signup</h2>
             <p><b>${otp}</b></p>
             <p>This OTP is valid for 5 minutes.</p>`,
    });

    return NextResponse.json(
      { message: "OTP sent to your email. Please verify.", email },
      { status: 200 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}

// helper to export for verify-otp route
export { tempOTPStore };
