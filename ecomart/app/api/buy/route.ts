import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "../../lib/mailer";
import User from "../../models/User";
import Product from "../../models/Product";

export async function POST(req: NextRequest) {
  try {
    const { buyerName, buyerEmail, productId, productTitle, message, ownerId } = await req.json();

    if (!buyerName || !buyerEmail || !productId || !productTitle || !ownerId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Fetch owner email from DB
    const owner = await User.findById(ownerId);
    if (!owner) return NextResponse.json({ error: "Owner not found" }, { status: 404 });

    await sendMail({
      to: owner.email,
      subject: `${buyerName} wants to buy product ${productTitle}`,
      text: `Buyer: ${buyerName}\nEmail: ${buyerEmail}\nMessage: ${message || "N/A"}`,
      html: `<p><strong>Buyer:</strong> ${buyerName}</p>
             <p><strong>Email:</strong> ${buyerEmail}</p>
             <p><strong>Message:</strong> ${message || "N/A"}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
