import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { password } = await req.json();
    const storedHash = process.env.ADMIN_PASSWORD_HASH || "";

    // Debug
    const newHash = await bcrypt.hash(password, 10);
    console.log("Generated new hash (you can copy this into your .env):", newHash);

    const isValid = await bcrypt.compare(password, storedHash);

    if (!isValid) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = jwt.sign(
        { role: "admin" }, 
        process.env.JWT_SECRET!,
        { algorithm: "HS256", expiresIn: "1d" }
    );

    const response = NextResponse.json({ message: "Logged in" });
    response.cookies.set("auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, 
    });

    return response;
}
