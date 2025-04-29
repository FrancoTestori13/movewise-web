import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";
import pool from "@/lib/db";

const JWT_TOKEN = process.env.JWT_TOKEN;

export async function POST(req) {
  const header = req.headers.get("cookie") || "";
  const { token } = cookie.parse(header);
  if (!token) {
    return NextResponse.json(
      { success: false, error: "No autorizado" },
      { status: 401 }
    );
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_TOKEN);
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Token invalido" },
      { status: 401 }
    );
  }

  const { name, description, user_zone_id } = await req.json();
  if (!name) {
    return NextResponse.json(
      { success: false, error: "Ingresar nombre de la caja" },
      { status: 400 }
    );
  }
  if (!user_zone_id) {
    return NextResponse.json(
      { success: false, error: "Seleccionar zona de la caja" },
      { status: 400 }
    );
  }

  try {
    const result = await pool.query(
      `INSERT INTO boxes (user_id, user_zone_id, name, description)
       VALUES ($1, $2, $3, $4)
       RETURNING id, user_zone_id, name, description, created_at, updated_at`,
      [payload.userId, user_zone_id, name, description || null]
    );
    const box = result.rows[0];
    return NextResponse.json({ success: true, box }, { status: 201 });
  } catch (err) {
    console.error("Error al insertar en la DB:", err);
    return NextResponse.json(
      { success: false, error: "Error de servidor" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const header = req.headers.get("cookie") || "";
  const { token } = cookie.parse(header);
  if (!token) {
    return NextResponse.json(
      { success: false, error: "No autorizado" },
      { status: 401 }
    );
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_TOKEN);
  } catch {
    return NextResponse.json(
      { success: false, error: "Token invalido" },
      { status: 401 }
    );
  }

  try {
    const result = await pool.query(
      `SELECT id, user_zone_id, name, description, created_at, updated_at
       FROM boxes
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [payload.userId]
    );
    return NextResponse.json(
      { success: true, boxes: result.rows },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error listando cajas:", err);
    return NextResponse.json(
      { success: false, error: "Error de servidor" },
      { status: 500 }
    );
  }
}
