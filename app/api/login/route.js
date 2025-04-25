"use server";
import { comparePassword } from "@/lib/auth";
import pool from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";

const JWT_TOKEN = process.env.JWT_TOKEN;

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Completa todos los campos" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      "SELECT id, password FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Correo o contraseña incorrectos" },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Correo o contraseña incorrectos" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ userId: user.id, email }, JWT_TOKEN, {
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
      { success: true, token },
      { status: 200 }
    );

    response.headers.set("Set-Cookie", serialized);

    return response;
  } catch (err) {
    console.error("Error en login:", err);
    return NextResponse.json(
      { success: false, message: "Error del servidor" },
      { status: 500 }
    );
  }
}
