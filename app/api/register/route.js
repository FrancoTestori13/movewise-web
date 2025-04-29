"use server";
import { hashPassword } from "@/lib/auth";
import pool from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";

const JWT_TOKEN = process.env.JWT_TOKEN;

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

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

    const userId = result.rows[0].id;

    const token = jwt.sign({ userId, email }, JWT_TOKEN, {
      expiresIn: "7d",
    });

    const serialized = cookie.serialize("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "Strict",
      maxAge: 60 * 60 * 24 * 7, 
      path: "/",
    });
    
    const response = NextResponse.json(
      { success: true, userId, token },
      { status: 200 }
    );

    response.headers.set("Set-Cookie", serialized);

    return response;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return NextResponse.json(
      { success: false, message: "Error del servidor" },
      { status: 500 }
    );
  }
}
