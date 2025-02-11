import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createUser, getUserByEmail } from "@/queries/users";

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey"; // Store this in .env

// REGISTER USER
export async function POST(req) {
  try {
    const body = await req.json();
    const existingUser = await getUserByEmail(body.email);

    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const newUser = await createUser(body);

    // Create JWT Token
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET_KEY, { expiresIn: "7d" });

    return NextResponse.json({ user: newUser, token }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server error", details: error.message }, { status: 500 });
  }
}

// LOGIN USER
export async function PUT(req) {
  try {
    const body = await req.json();
    const user = await getUserByEmail(body.email);

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(body.password, user.password_hash);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Create JWT Token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "7d" });

    return NextResponse.json({ user, token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error", details: error.message }, { status: 500 });
  }
}
