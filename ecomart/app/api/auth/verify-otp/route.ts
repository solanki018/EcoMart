import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import { tempOTPStore } from "../signup/route";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    const record = tempOTPStore.get(email);

    if (!record) {
      return NextResponse.json({ message: "OTP expired or not found." }, { status: 400 });
    }

    if (record.expiresAt < Date.now()) {
      tempOTPStore.delete(email);
      return NextResponse.json({ message: "OTP expired. Try signing up again." }, { status: 400 });
    }

    if (record.otp !== otp) {
      return NextResponse.json({ message: "Invalid OTP." }, { status: 400 });
    }

    await dbConnect();
    const { name, phone, password, entryNumber } = record.userData;

    const user = await User.create({ name, email, phone, password, entryNumber });

    tempOTPStore.delete(email); // cleanup after success

    return NextResponse.json({ message: "Signup successful!", userId: user._id }, { status: 201 });
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
