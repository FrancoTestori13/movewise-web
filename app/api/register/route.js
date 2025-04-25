"use server";
import { hashPassword } from "@/lib/auth";
import pool from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_TOKEN = process.env.JWT_TOKEN || "clave-muy-secreta";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Completa todos los campos" },
        { status: 400 }
      );
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { success: false, message: "El email ya está registrado" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      "INSERT INTO users (username, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id",
      [username, email, hashedPassword]
    );

    const token = jwt.sign({ userId: result.rows[0].id }, JWT_TOKEN, {
      expiresIn: "7d",
    });

    return NextResponse.json({ success: true, userId: result.rows[0].id, token });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return NextResponse.json(
      { success: false, message: "Error del servidor" },
      { status: 500 }
    );
  }
}
